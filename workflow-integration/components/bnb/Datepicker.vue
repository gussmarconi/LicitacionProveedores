<template>
  <Datepicker
    v-model="value"
    auto-apply
    position="left"
    format="dd/MM/yyyy"
    text-input
    utc
    :enable-time-picker="false"
    locale="es-BO"
  >
    <template #clear-icon="{ clear }">
      <slot name="clear-icon" :clear="clear"></slot>
    </template>
    <template #dp-input="{ value, onInput, onEnter, onTab, onBlur, onClear }">
      <BnbInputText
        v-mask="'##/##/####'"
        :label="label"
        :rules="rules"
        :model-value="value"
        icon="i-ion-calendar-outline"
        trailing
        @input="(e: any) => (!!e.target.value) ? onInput(e) : onClear()"
        @blur="onBlur"
        @keydown.enter="onEnter"
        @keydown.tab="onTab"
      />
    </template>
  </Datepicker>
</template>
<script lang="ts" setup>
  import { GenericValidateFunction } from "vee-validate";
  import dayjs from "dayjs";
  import Datepicker from "@vuepic/vue-datepicker";
  import { mask as vMask } from "vue-the-mask";
  import "@vuepic/vue-datepicker/dist/main.css";

  const props = withDefaults(
    defineProps<{
      modelValue?: string | null;
      label?: string;
      rules?: GenericValidateFunction[];
    }>(),
    {
      rules: () => [],
    }
  );

  const emit = defineEmits<{
    (event: "update:modelValue", modelValue?: number | string | null): void;
  }>();

  const value = ref("");

  watch(() => props.modelValue, (v: any) => value.value = v);
  watch(value, (v: any) => emit("update:modelValue", v ? dayjs(v).format("YYYY-MM-DD[T]00:00:00") : ""));
  onMounted(() => { if (props.modelValue) value.value = props.modelValue });
</script>

<style>
  .dp__main {
    font-family: "Work Sans", "Open Sans", sans-serif;
  }
</style>
