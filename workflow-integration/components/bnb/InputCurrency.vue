<template>
  <UFormGroup
    :label="label"
    :error="errorMessage"
    :ui="{ error: 'mt-1 text-sm text-red-500 dark:text-red-400' }"
  >
    <UInput
      ref="inputRef"
      v-bind="$attrs"
      v-model="value"
      variant="none"
      class="bg-white shadow-sm border-2 border-gray-200 rounded-md flex justify-between !ring-0 hover:border-primary-500 hover:drop-shadow focus:border-primary-500 focus:drop-shadow text-black font-medium disabled:bg-gray-200"
      :class="[errorMessage && 'border-red-500']"
    >
      <template v-for="(index, name) in $slots" v-slot:[name]>
        <slot :name="name"></slot>
      </template>
    </UInput>
  </UFormGroup>
</template>
<script lang="ts" setup>
import { useField, GenericValidateFunction } from "vee-validate";
import { CurrencyDisplay, useCurrencyInput } from "vue-currency-input";

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    label?: string;
    precision?: number;
    rules?: GenericValidateFunction[];
  }>(),
  {
    precision: 2,
    rules: () => [],
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", modelValue?: string | number): void;
  (event: "change", e: Event): void;
}>();

const { inputRef, setValue } = useCurrencyInput({
  currency: "BOB",
  locale: "es-US",
  currencyDisplay: CurrencyDisplay.hidden,
  precision: props.precision,
});

const fieldName = "currency_" + Math.random().toString().replace("0.", "");
const { value, errorMessage } = useField<string | number>(fieldName, props.rules);

watch(() => props.modelValue, (val: any) => {
  setValue(val as number);
  value.value = val;
});
watch(value, () => {
  emit("update:modelValue", value.value);
});
onMounted(() => { if (props.modelValue) value.value = props.modelValue });
</script>
