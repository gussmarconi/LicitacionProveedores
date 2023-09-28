<template>
  <img
    v-if="!disabled"
    src="@/assets/bnb/icoAbout.png"
    :style="{
      height: height,
      width: width,
    }"
    alt="Acerca de"
  />
  <img
    v-if="disabled"
    src="@/assets/bnb/icoAboutDisabled.png"
    :style="{
      height: height,
      width: width,
    }"
    alt="Acerca de"
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
