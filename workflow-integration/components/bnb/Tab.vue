<template>
  <button
    class="border border-b-0 rounded-t-lg p-3 pb-2 mr-1"
    :class="{
      'text-secondary bg-white fill-secondary': isActive && color == 'secondary' && !disabled,
      'text-primary bg-white fill-primary': isActive && color != 'secondary' && !disabled,
      'text-gray-500 bg-gray-100 fill-gray-500 border-gray-100': !isActive && !disabled,
      'text-gray-300 bg-gray-200 fill-gray-400 border-gray-100 cursor-not-allowed': !!disabled,
    }"
    type="button"
    @click="!disabled && emit('select')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  index?: number;
  isActive?: boolean;
  disabled?: boolean;
  color?: "primary" | "secondary";
}>(), {
  isActive: false,
  color: "primary",
});

const emit = defineEmits<{
  (e: "select"): void
}>();
</script>
