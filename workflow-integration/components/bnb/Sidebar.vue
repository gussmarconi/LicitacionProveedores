<template>
  <section>
    <div class="text-4xl text-secondary text-center">
      <button @click="showMenu = !showMenu">
        <bnb-icon name="i-mdi-menu" size="32" class="fill-secondary" />
      </button>
    </div>
    <transition
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="showMenu"
        class="z-30 bg-white bg-opacity-70 opa w-screen fixed left-0 transition-all duration-300"
        :style="{
          height: !top ? (hasNavbar ? 'calc(100vh - 75px)' : '100vh') : `calc(100vh - ${top})`,
          top: !top ? (hasNavbar ? '75px' : '0px') : top,
        }"
      ></div>
    </transition>
    <nav
      ref="navigationContent"
      class="bg-white drop-shadow-lg border-r border-r-gray-200 w-screen p-2 max-w-[370px] fixed z-30 left-0 transition-all duration-300"
      :class="{
        'left-[-375px]': !showMenu
      }"
      :style="{
        height: !top ? (hasNavbar ? 'calc(100vh - 75px)' : '100vh') : `calc(100vh - ${top})`,
        top: !top ? (hasNavbar ? '75px' : '0px') : top,
      }"
    >
      <div class="flex justify-end text-4xl text-secondary">
        <button @click="showMenu = !showMenu">
          <bnb-icon name="i-mdi-close" size="32" class="fill-secondary" />
        </button>
      </div>
      <slot></slot>
    </nav>
  </section>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";

withDefaults(defineProps<{
  hasNavbar?: boolean,
  top?: string
}>(),
{
  hasNavbar: false,
  top: ""
});

const showMenu = ref(false);
const navigationContent = ref();

onClickOutside(navigationContent, () => showMenu.value = false);
</script>
