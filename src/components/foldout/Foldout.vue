<template>
    <button @click="open = !open" type="button" class="flex items-center justify-center cursor-pointer">
        <span v-if="!open" class="mr-1">{{ closedLabel }}</span>
        <ChevronDownIcon v-if="!open" class="size-3" />
        <span v-if="open" class="mr-1">{{ openLabel }}</span>
        <ChevronUpIcon v-if="open" class="size-3" />
    </button>
    <div v-if="open">
        <slot />
    </div>
</template>

<script setup>
    import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/solid";
    
    import { ref } from "vue";
    
    const props = defineProps({
        closedLabel: { type: String },
        openLabel: { type: String }
    });

    const open = ref(false);
</script>