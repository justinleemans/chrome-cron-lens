<template>
    <a class="text-primary transition duration-300 ease-in-out hover:text-secondary" :href="props.supportLink" target="_blank">Support this project</a>
</template>

<script setup>
    const props = defineProps({
        supportLink: {
            type: String,
            default: "https://buymeacoffee.com/justinleemans"
        }
    });
</script>