import cronstrue from 'cronstrue';

var activeMode = true;

const cronRegex = /(@(annually|yearly|monthly|weekly|daily|hourly|reboot))|(@every (\d+(ns|us|µs|ms|s|m|h))+)|((((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7})/;

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
		for (const node of mutation.addedNodes) {
			if(activeMode) {
				replaceCron(node);
			}
		}
	}
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	replaceCron(document.body);
	sendResponse({ success: true });
});

async function init() {
	const result = await chrome.storage.local.get("mode");

	if (typeof result.mode === "boolean") {
		activeMode = result.mode;
	}

	if(activeMode) {
		replaceCron(document.body);
	}
}

function replaceCron(node) {
    if (node.nodeType !== Node.TEXT_NODE) {
		node.childNodes.forEach(replaceCron);
		return;
    }

	if (node.parentElement?.closest('code, pre, textarea')) {
		return;
	}

	const original = node.nodeValue;
	const replaced = original.replace(cronRegex, (match) => {
		try {
			const human = cronstrue.toString(match);
			return ` ${match} → ${human} `;
		} catch {
			return match;
		}
	});

	if (replaced !== original) {
		node.nodeValue = replaced;
	}
}

init();

observer.observe(document.body, {
    childList: true,
    subtree: true
});