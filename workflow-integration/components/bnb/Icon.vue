<template>
  <UIcon
    :style="[
      isNaN(size as number) ? '' : `width: ${size}px`,
      isNaN(size as number) ? '' : `height: ${size}px`,
    ]"
  />
</template>

<script setup lang="ts">
  defineProps<{ size: number | string }>();
</script>
