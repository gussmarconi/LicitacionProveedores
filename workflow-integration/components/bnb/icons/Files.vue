<template>
  <img
    v-if="!disabled"
    src="@/assets/bnb/icoFiles.png"
    :style="{
      height: height,
      width: width,
    }"
    alt="Archivos"
  />
  <img
    v-if="disabled"
    src="@/assets/bnb/icoFilesDisabled.png"
    :style="{
      height: height,
      width: width,
    }"
    alt="Archivos"
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
