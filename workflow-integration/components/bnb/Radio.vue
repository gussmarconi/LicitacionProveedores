<template>
  <label class="flex items-center">
    <div class="relative w-[36px] h-[36px]">
      <input
        class="outline-none p-1.5 flex-grow disabled:bg-gray-50 w-full h-full opacity-0"
        type="radio"
        v-model="valueText"
        :id="props.id"
        :disabled="props.disabled"
        :name="name"
        :value="checkValue"
      />
      <div
        class="absolute top-0 left-0 w-full h-full rounded-full flex justify-center items-center"
        :class="{
          'cursor-pointer': !props.disabled,
          'focus:bg-primary-50 hover:bg-primary-50': props.color == 'primary' && !props.disabled,
          'text-primary-500 fill-primary-500': props.color == 'primary' && valueText == checkValue,
          'focus:bg-secondary-50 hover:bg-secondary-50': props.color == 'secondary' && !props.disabled,
          'text-secondary-500 fill-secondary-500': props.color == 'secondary' && valueText == checkValue,
        }"
      >
        <bnb-icon
          :size="iconSize"
          name="i-fluent-radio-button-16-filled"
          v-show="valueText == checkValue"
          :class="iconClass"
        />
        <bnb-icon
          :size="iconSize"
          name="i-fluent-radio-button-16-regular"
          v-show="valueText != checkValue"
          :class="iconClass"
        />
      </div>
    </div>
    <div class="font-semibold text-gray-600">
      {{ props.label }}
    </div>
  </label>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      modelValue?: boolean | number | string;
      id?: string;
      label?: string;
      color?: "primary" | "secondary";
      disabled?: boolean;
      name?: string;
      value?: string | number | boolean;
      iconSize?: number | string;
      iconClass?: string | any[] | object;
    }>(),
    {
      color: "primary",
      type: "text",
      disabled: false,
      name: "generic",
      value: "",
      iconSize: "27",
      iconClass: "",
      rules: () => [],
    }
  );

  const emit = defineEmits<{
    (event: "update:modelValue", modelValue?: boolean | number | string): void;
  }>();

  const valueText = computed({
    get() {
      if (typeof props.modelValue == "boolean")
        return props.modelValue ? 1 : 2;
      else
        return props.modelValue
    },
    set(val) {
      if (typeof props.value == "boolean")
        emit("update:modelValue", val == 1);
      else
        emit("update:modelValue", val)
    },
  });

  const checkValue = computed(() => {
    if (typeof props.value == "boolean")
      return props.value ? 1 : 2;
    else
      return props.value;
  });
</script>
