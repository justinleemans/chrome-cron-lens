<template>
	<div class="flex flex-col gap-4 items-stretch mb-[1.5em]">
		<Toggle leftLabel="Passive" rightLabel="Active" v-model="activeMode" @update:model-value="toggleActiveMode"/>
		<Button v-if="!activeMode" :action="replaceCron">Replace</Button>
		<Foldout closedLabel="more settings" openLabel="less settings">
			<Toggle leftLabel="12h" rightLabel="24h" v-model="militaryTime" @update:model-value="toggleMilitaryTime"/>
		</Foldout>
	</div>
	<Footer/>
</template>

<script setup>
	import Button from "../components/input/Button.vue";
	import Foldout from "../components/foldout/Foldout.vue";
	import Footer from "../components/footer/Footer.vue";
	import Toggle from "../components/input/Toggle.vue";

	import { ref, onMounted } from "vue";

	const activeMode = ref(true);
	const militaryTime = ref(false);

	onMounted(async () => {
        const storedActiveMode = await chrome.storage.local.get("activeMode");

        if (typeof storedActiveMode.activeMode === "boolean") {
            activeMode.value = storedActiveMode.activeMode;
        }

        const storedMilitaryTime = await chrome.storage.local.get("militaryTime");

        if (typeof storedMilitaryTime.militaryTime === "boolean") {
            militaryTime.value = storedMilitaryTime.militaryTime;
        }
    });

    async function toggleActiveMode() {
        await chrome.storage.local.set({ activeMode: activeMode.value });

        if (activeMode.value) {
            await replaceCron();
        }
    }

    async function toggleMilitaryTime() {
        await chrome.storage.local.set({ militaryTime: militaryTime.value });
    }

    async function replaceCron() {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const response = await chrome.tabs.sendMessage(tab.id, { type: "replace-cron" });
    }
</script>