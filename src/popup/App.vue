<template>
	<div class="flex flex-col gap-4 items-stretch mb-[1.5em]">
		<Toggle leftLabel="Passive" rightLabel="Active" v-model="activeMode" @update:model-value="toggleActiveMode"/>
		<Button v-if="!activeMode" :action="replaceCronOnPage">Replace</Button>
	</div>
	<Footer/>
</template>

<script setup>
    import { ref, onMounted } from "vue";

	import Button from "../components/input/Button.vue";
	import Footer from "../components/footer/Footer.vue";
	import Toggle from "../components/input/Toggle.vue";

	import { replaceCronOnPage } from "../content/content.js";

	const activeMode = ref(true);

	onMounted(async () => {
		const result = await chrome.storage.local.get("mode");

		if (typeof result.mode === "boolean") {
			activeMode.value = result.mode;
		}
	});

	async function toggleActiveMode() {
		await chrome.storage.local.set({mode: activeMode.value});
	}
</script>