<template>
  <img
    v-if="!disabled"
    src="@/assets/bnb/icoReview.png"
    :style="{
      height: height,
      width: width,
    }"
    alt="Revisar"
  />
  <img
    v-if="disabled"
    src="@/assets/bnb/icoReviewDisabled.png"
    :style="{
      height: height,
      width: width,
    }"
    alt="Revisar"
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
