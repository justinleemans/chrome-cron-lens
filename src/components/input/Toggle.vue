<template>
    <label class="inline-flex items-center cursor-pointer">
        <span v-if="props.leftLabel" class="select-none text-sm font-medium text-heading">{{ props.leftLabel }}</span>
        <input type="checkbox" class="sr-only peer" :checked="modelValue" @change="onChange">
        <div class="relative mx-3 w-9 h-5 bg-secondary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
        <span v-if="props.rightLabel" class="select-none text-sm font-medium text-heading">{{ props.rightLabel }}</span>
    </label>
</template>

<script setup>
    const props = defineProps({
        leftLabel: { type: String },
        rightLabel: { type: String },
        modelValue: { type: Boolean }
    });

    const emit = defineEmits(["update:modelValue"]);

    const onChange = (event) => {
        emit("update:modelValue", event.target.checked);
    }
</script>