<template>
  <transition
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="state.show"
      class="bg-white bg-opacity-90 w-screen h-screen z-[3000] flex justify-center items-center fixed top-0 left-0 transition-all flex-col"
    >
      <lazy-bnb-messages-loading-landing v-if="!bnbConfig.isWorkflow" />
      <lazy-bnb-messages-loading-workflow v-if="bnbConfig.isWorkflow" :message="state.message" />
    </div>
  </transition>
</template>

<script lang="ts" setup>
import bnbConfig from "@/bnb.config";

const state = useState("bnb-loading", () => ({ show: false, message: "Cargando..." }));
</script>
