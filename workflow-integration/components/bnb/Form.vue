<template>
  <form autocomplete="off">
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";

const { validate, resetForm } = useForm();

defineExpose({ validate, resetForm });
</script>
