<template>
  <section class="flex flex-col items-center">
    <bnb-make-principal animate width="300" />
    <div class="text-center mt-3 text-gray-600 font-semibold">{{ message }}</div>
  </section>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  message?: string;
}>(), {
  message: "Cargando..."
})
</script>
