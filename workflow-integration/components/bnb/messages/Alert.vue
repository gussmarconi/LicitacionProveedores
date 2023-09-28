<template>
  <transition
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <dialog
      v-if="state.show"
      ref="alertMainDialog"
      class="bg-white bg-opacity-80 w-screen h-screen z-[2000] flex justify-center items-center fixed top-0 left-0 transition-all"
      tabindex="0"
      @keyup.enter="state.show = false"
      @keyup.esc="state.show = false"
    >
      <div
        ref="alertContainer"
        class="bg-white border border-gray-300 rounded-lg drop-shadow-md max-w-[500px] w-full"
      >
        <h2 v-if="state.type == 'INFO'" class="text-primary-500 fill-primary-500 px-3 py-2 text-xl font-semibold flex items-center">
          <bnb-icon name="i-pajamas-information-o" size="24" class="mr-2" />
          <span class="ml-1">Aviso</span>
        </h2>
        <h2 v-if="state.type == 'ERROR'" class="text-secondary-500 fill-secondary-500 px-3 py-2 text-xl font-semibold flex items-center">
          <bnb-icon name="i-lucide-x-octagon" size="24" class="mr-2" />
          <span class="ml-1">Aviso</span>
        </h2>
        <div class="w-full border-b border-b-gray-100"></div>
        <div class="text-center p-8">
          {{  state.message }}
        </div>
        <div class="w-full border-b border-b-gray-100"></div>
        <div class="px-3 py-2 flex">
          <div class="grow"></div>
          <bnb-button color="primary" @click="state.show = false">Aceptar</bnb-button>
        </div>
      </div>
    </dialog>
  </transition>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { useFocus } from "@vueuse/core";

const alertContainer = ref();

const state = useState("bnb-alert", () => ({ show: false, message: "", type: "INFO" }));

onClickOutside(alertContainer, () => {
  if (enableBackdrop.value) state.value.show = false;
});

const alertMainDialog = ref(null);
const enableBackdrop = ref(false);

const { focused } = useFocus(alertMainDialog);

watch(() => state.value.show, (val) => {
  if (val) {
    setTimeout(() => {
      focused.value = true;
      enableBackdrop.value = true;
    }, 200);
  } else {
    enableBackdrop.value = false;
  }
});
</script>
