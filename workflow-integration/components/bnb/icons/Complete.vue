<template>
  <img
    v-if="!disabled"
    src="@/assets/bnb/icoComplete.png"
    :style="{
      height: height,
      width: width,
    }"
    alt="Completar"
  />
  <img
    v-if="disabled"
    src="@/assets/bnb/icoCompleteDisabled.png"
    :style="{
      height: height,
      width: width,
    }"
    alt="Completar"
  />
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  disabled?: boolean;
  width?: string;
  height?: string;
}>(), {
  disabled: true,
  width: "40px",
  height: "40px",
});
</script>
