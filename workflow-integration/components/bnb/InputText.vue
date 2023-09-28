<template>
  <UFormGroup
    :label="label"
    :error="errorMessage"
    :ui="{ error: 'mt-1 text-sm text-red-500 dark:text-red-400' }"
  >
    <div class="flex items-center">
      <slot name="leading-out"></slot>
      <UInput
        ref="inputElement"
        v-bind="$attrs"
        v-model="value"
        variant="none"
        class="bg-white grow shadow-sm border-2 border-gray-200 rounded-md flex justify-between !ring-0 hover:border-primary-500 hover:drop-shadow focus:border-primary-500 focus:drop-shadow text-black font-medium disabled:bg-gray-200"
        :class="[errorMessage && 'border-red-500']"
        @blur="(e: any) => emit('blur', e)"
      >
        <template v-for="(index, name) in $slots" v-slot:[name]>
          <slot :name="name"></slot>
        </template>
      </UInput>
    </div>
  </UFormGroup>
</template>

<script setup lang="ts">
  import { useField } from "vee-validate";

  const props = defineProps<{
    modelValue?: string | number;
    label?: string;
    rules?: any;
    validation?: (val: string | number) => string | number;
  }>();

  const emit = defineEmits<{
    (event: "update:modelValue", modelValue?: string | number): void;
    (event: "blur", e: any): void;
  }>();

  const fieldName = "input_" + Math.random().toString().replace("0.", "");
  const { value, errorMessage } = useField<string | number>(fieldName, props.rules);
  
  // Validations
  const inputElement = ref();

  watch(() => props.modelValue, (v: any) => value.value = v);
  watch(value, () => {
    if (props.validation && typeof props.validation === "function") {
      const start = inputElement.value.input.selectionStart;
      const end = inputElement.value.input.selectionEnd;

      value.value = props.validation(value.value as string | number);

      nextTick(() => {
        inputElement.value.input.setSelectionRange(start, end);
      });
    }

    emit("update:modelValue", value.value as any)
  });
  onMounted(() => { if (props.modelValue) value.value = props.modelValue });
</script>
