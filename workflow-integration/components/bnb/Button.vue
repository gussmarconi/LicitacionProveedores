<template>
  <UButton :ui="{ rounded: 'rounded-lg rounded-tl-none rounded-br-none', ...ui  }">
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name"></slot>
    </template>
  </UButton>
</template>

<script setup lang="ts">
  defineProps<{
    ui?: any
  }>();
</script>
