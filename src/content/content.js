import cronstrue from 'cronstrue';

var activeMode = true;
var militaryTime = false;

const cronRegex = /(@(annually|yearly|monthly|weekly|daily|hourly|reboot))|(@every (\d+(ns|us|µs|ms|s|m|h))+)|((((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7})/;

const observer = new MutationObserver((mutations) => {
    if(activeMode) {
		for (const mutation of mutations) {
			for (const node of mutation.addedNodes) {
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
	const settings = await chrome.storage.local.get();

	if (typeof settings.activeMode === "boolean") {
		activeMode = settings.activeMode;
	}

	if (typeof settings.militaryTime === "boolean") {
		militaryTime = settings.militaryTime;
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
	const replaced = original.replace(cronRegex, function(match, ...args) {
		const offset = args[args.length - 2];
		const string = args[args.length - 1];
		const afterMatch = string.slice(offset + match.length);

		if (/^\s*→/.test(afterMatch)) {
			return match;
		}

		try {
			const human = cronstrue.toString(match, { use24HourTimeFormat: militaryTime });
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