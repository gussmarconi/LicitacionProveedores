<template>
  <section>
    <nav
      class="bg-white border-b border-gray-300 w-full z-10 h-[75px] flex items-center"
      :class="{ 'shadow-md fixed': y > 0 }"
    >

      <lazy-bnb-navbar-landing
        v-if="!bnbConfig.isWorkflow"
        :href="href"
      ></lazy-bnb-navbar-landing>

      <lazy-bnb-navbar-workflow
        v-if="bnbConfig.isWorkflow"
        @complete="complete"
        @clean="() => {}"
      ></lazy-bnb-navbar-workflow>

    </nav>
    <div v-show="y > 0" class="dummy"></div>
  </section>
</template>

<script lang="ts" setup>
import { useWindowScroll } from "@vueuse/core";
import bnbConfig from "~~/bnb.config";

const { y } = useWindowScroll();

const complete = () => {
  console.log("COMPLETED");
}

withDefaults(
  defineProps<{
    href?: string;
  }>(),
  {
    href: "https://www.bnb.com.bo/",
  }
);
</script>

<style scope lang="scss">
.dummy {
  height: 75px;
}
</style>
