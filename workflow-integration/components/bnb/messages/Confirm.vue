<template>
  <transition
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <dialog
      v-if="state.show"
      class="bg-white bg-opacity-80 w-screen h-screen z-[1000] flex justify-center items-center fixed top-0 left-0 transition-all"
      @keydown.esc="state.show = false"
    >
      <div class="bg-white border border-gray-300 rounded-lg drop-shadow-md max-w-[500px] w-full">
        <h2 class="text-secondary-500 fill-secondary-500 px-3 py-2 text-xl font-semibold flex items-center">
          <bnb-icon name="i-ci-circle-help" size="26" class="mr-2" />
          <span class="ml-1">Confirmación</span>
        </h2>
        <div class="w-full border-b border-b-gray-100"></div>
        <div class="text-center p-8">
          {{  state.message }}
        </div>
        <div class="w-full border-b border-b-gray-100"></div>
        <div class="px-3 py-2 flex">
          <div class="grow"></div>
          <bnb-button color="primary" class="mr-2" @click="acceptAction">Aceptar</bnb-button>
          <bnb-button color="secondary" @click="cancelAction">Cancelar</bnb-button>
        </div>
      </div>
    </dialog>
  </transition>
</template>

<script lang="ts" setup>
const state = useState("bnb-confirm", () => ({ show: false, message: "" }));
const confirmCallbackState = useState<boolean>("bnb-confirm-callback");


const acceptAction = () => {
  confirmCallbackState.value = true;
  state.value.show = false;
}

const cancelAction = () => {
  confirmCallbackState.value = false;
  state.value.show = false;
}
</script>
