<template>
  <img
    v-if="!disabled"
    src="@/assets/bnb/icoClean.png"
    :style="{
      height: height,
      width: width,
    }"
    alt="Limpiar"
  />
  <img
    v-if="disabled"
    src="@/assets/bnb/icoCleanDisabled.png"
    :style="{
      height: height,
      width: width,
    }"
    alt="Limpiar"
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
