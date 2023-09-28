<template>
  <section
    v-for="(tabContent, index) in (slots.default ? slots.default()[0].children : [])"
    :key="index"
  >
    <component v-show="props.modelValue == index" :is="tabContent"></component>
  </section>
</template>

<script lang="ts" setup>
const slots = useSlots();

const props = defineProps<{
  modelValue: number
}>();
</script>
