<template>
  <UFormGroup
    :label="label"
    :error="errorMessage"
    :ui="{ error: 'mt-1 text-sm text-red-500 dark:text-red-400' }"
  >
    <div :class="{ 'border-2 border-red-500 rounded-lg': errorMessage }">
      <slot></slot>
    </div>
  </UFormGroup>
</template>

<script setup lang="ts">
  import { useField } from "vee-validate";

  const props = defineProps<{
    modelValue?: string | number | boolean;
    label?: string;
    rules?: any;
  }>();

  const fieldName = "hidden_" + Math.random().toString().replace("0.", "");
  const { value, errorMessage } = useField<string | number | boolean | undefined>(fieldName, props.rules);
  
  watch(() => props.modelValue, (v) => value.value = v);
  onMounted(() => { if (typeof props.modelValue == "boolean") value.value = props.modelValue });
</script>
