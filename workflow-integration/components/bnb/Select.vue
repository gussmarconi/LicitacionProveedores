<template>
  <UFormGroup
    :label="label"
    :error="errorMessage"
    :ui="{ error: 'mt-1 text-sn text-red-500 dark:text-red-400 text-sm' }"
  >
    <USelectMenu
      v-model="value"
      :options="options"
      option-attribute="text"
      value-attribute="value"
      searchable-placeholder="Buscar..."
      :disabled="disabled"
      v-bind="$attrs"
    >
      <template #option-empty="{ query }">
        No se encontraron resultados para "{{ query }}".
      </template>

      <template #option="{ option, active, selected }">
        <UIcon v-if="option.icon" :name="option.icon" aria-hidden="true" />
        <UAvatar
          v-else-if="option.avatar"
          v-bind="{ size: uiMenu.option.avatar.size, ...option.avatar }"
          :class="uiMenu.option.avatar.base"
          aria-hidden="true"
        />
        <span v-else-if="option.chip" :class="uiMenu.option.chip.base" :style="{ background: `#${option.chip}` }" />

        <span>{{ typeof option === 'string' ? option : option.text }}</span>
      </template>

      <template #default="{ open }">
        <UButton
          color="white"
          block
          class="border-2 border-gray-200 flex justify-between !ring-0 hover:border-primary-500 hover:drop-shadow focus:border-primary-500 focus:drop-shadow"
          :class="[
            open && 'border-primary-500 drop-shadow',
            errorMessage && 'border-red-500'
          ]"
          :disabled="disabled"
        >
          <span class="overflow-hidden whitespace-nowrap overflow-ellipsis">{{ selectedLabel }}</span>
          <span class="flex align-middle">
            <UButton
              v-if="clearable && selected"
              icon="i-majesticons-close-line"
              color="secondary"
              variant="ghost"
              :padded="false"
              :ui="{ rounded: 'rounded-full' }"
              @click.stop="value = ''"
            ></UButton>
            <UIcon name="i-heroicons-chevron-down-20-solid" class="w-5 h-5 transition-transform" :class="[open && 'transform rotate-180']" />
          </span>
        </UButton>
      </template>
    </USelectMenu>
  </UFormGroup>
</template>

<script setup lang="ts">
  import { useField } from "vee-validate";

  const props = defineProps<{
    modelValue?: any;
    label?: string;
    options?: any[];
    rules?: any;
    clearable?: boolean;
    disabled?: boolean;
  }>();

  const emit = defineEmits<{
    (event: "update:modelValue", modelValue?: any): void;
  }>();

  const fieldName = "select_" + Math.random().toString().replace("0.", "");
  const { value, errorMessage } = useField<any>(fieldName, props.rules);

  watch(() => props.modelValue, (v: any) => value.value = v);
  watch(value, (v: any) => emit("update:modelValue", v));
  onMounted(() => { if (props.modelValue || props.modelValue === false) value.value = props.modelValue });

  // Auxiliar variables
  const selectedLabel = computed(() => props.options?.find(v => v.value == value.value)?.text || "- Seleccione -");
  const selected = computed(() => !!props.options?.find(v => v.value == value.value));
</script>
