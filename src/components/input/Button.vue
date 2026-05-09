<template>
    <button @click="props.action" type="button" class="p-2 bg-linear-135 from-primary to-secondary rounded-full outline-white transition duration-300 ease-in-out hover:bg-linear-135 hover:from-secondary hover:to-primary hover:ring-4 hover:ring-brand-soft">
        <slot />
    </button>
</template>

<script setup>
    const props = defineProps({
        action: Function
    });
</script>