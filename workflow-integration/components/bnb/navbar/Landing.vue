<template>
  <div class="flex justify-between mx-2 sm:mx-4 my-2.5 w-full">
    <bnb-make-valores height="50"></bnb-make-valores>
    <slot>
      <a
        :href="href"
        target="_blank"
        class="hidden text-gray-600 mt-3 fill-gray-600 hover:text-gray-400 focus:text-gray-400 hover:fill-gray-400 focus:fill-gray-400 sm:flex"
      >
        <bnb-icon name="i-icon-park-code-computer" size="25" />
        <span class="ml-3">Ir al portal</span>
      </a>
    </slot>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  href?: string;
}>(), {
  href: "http://www.bnb.com.bo/"
});
</script>
