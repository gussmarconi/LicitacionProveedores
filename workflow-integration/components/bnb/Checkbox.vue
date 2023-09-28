<template>
  <UCheckbox
    :name="'chk_' + Math.random().toString().replace('0.', '')"
    class="cursor-pointer"
    :ui="{
      label: 'font-medium text-gray-700 dark:text-gray-200 cursor-pointer',
      border: 'border border-gray-300 border-2 dark:border-gray-700 hover:border-primary-500',
    }"
  />
</template>
