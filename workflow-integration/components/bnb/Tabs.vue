<template>
  <component
    v-for="(tab, index) in (slots.default ? slots.default()[0].children : [])"
    :key="index"
    :is="tab"
    :index="index"
    :is-active="index == valueText"
    :color="props.color"
    @select="valueText = (index as number)"
  ></component>
</template>

<script lang="ts" setup>
const slots = useSlots();

console.log(slots.default ? slots.default()[0].children : []);

const props = defineProps<{
  modelValue: number,
  color?: "primary" | "secondary",
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: number): void
}>();

const valueText = computed({
  get() { return props.modelValue ?? -1 },
  set(value) { emit("update:modelValue", value) },
});
</script>
