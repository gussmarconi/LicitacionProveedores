<template>
  <transition
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <dialog
      v-if="value"
      class="bg-white bg-opacity-80 w-screen h-screen z-50 flex justify-center items-center fixed top-0 left-0 transition-all"
      :style="{
        zIndex: props.zIndex
      }"
    >
      <slot></slot>
    </dialog>
  </transition>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  modelValue?: boolean;
  zIndex?: number;
}>(), {
  modelValue: false,
  zIndex: 1000
});

const emit = defineEmits<{
  (e: "update:modelValue", val: boolean): void
}>();

const value = computed({
  get () { return props.modelValue },
  set (val) { emit("update:modelValue", val) }
});
</script>
