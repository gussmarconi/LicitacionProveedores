<template>
  <img
    v-if="!disabled"
    src="@/assets/bnb/icoReplaceTask.png"
    :style="{
      height: height,
      width: width,
    }"
    alt="Reasignar"
  />
  <img
    v-if="disabled"
    src="@/assets/bnb/icoReplaceTaskDisabled.png"
    :style="{
      height: height,
      width: width,
    }"
    alt="Reasignar"
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
