<template>
  <div class="bnb-table-container">
    <table
      class="bnb-table w-full text-center border-collapse border-spacing-0"
      :class="color"
    >
      <slot></slot>
    </table>
  </div>
</template>

<script lang="ts" setup>
  withDefaults(defineProps<{
    color?: "primary" | "secondary"
  }>(), {
    color: "primary",
  });
</script>

<style lang="postcss" scoped>
  .bnb-table-container {
    @apply block overflow-x-auto w-full;
  }

  .bnb-table.primary :deep(thead) {
    @apply bg-primary-500 text-white;
  }

  .bnb-table.secondary :deep(thead) {
    @apply bg-secondary-500 text-white;
  }

  .bnb-table :deep(tr th) {
    @apply p-3 text-sm;

    &:first-child {
      @apply rounded-l-2xl;
    }

    &:last-child {
      @apply rounded-r-2xl;
    }
  }

  .bnb-table :deep(tbody tr) {
    td {
      @apply p-2 border-b text-gray-600 text-sm;
    }

    &:hover {
      @apply bg-gray-100;
    }
  }
</style>
