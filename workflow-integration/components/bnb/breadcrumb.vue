<template>
  <div class="flex items-center">
    <span>&gt;</span>

    <span v-for="(step, index) in list.slice(0, -1)" :key="index">
      <UButton
        color="secondary"
        variant="link"
        :to="step.route"
        size="xl"
      >
        {{ step.label }}
      </UButton>
      <span>/</span>
    </span>
    
    <span class="text-secondary-500 px-3.5 py-[8.75px]">
      {{ list[list.length - 1].label }}
    </span>
  </div>
</template>

<script setup lang="ts">
  interface IStep {
    label: string;
    route?: string;
  }

  defineProps<{
    list: IStep[];
  }>();
</script>
