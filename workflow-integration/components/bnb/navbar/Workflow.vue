<template>
  <div class="flex h-full">
    <button
      class="h-full w-[75px] mx-1 flex justify-center items-center flex-col rounded"
      :class="events.enableComplete ? 'hover:bg-slate-100' : ''"
      :disabled="!events.enableComplete"
      @click="attrs.onComplete"
    >
      <bnb-icons-complete :disabled="!events.enableComplete"/>
      <small class="text-[.65rem] font-semibold" :class="events.enableComplete ? 'text-gray-600' : 'text-gray-400'">Completar</small>
    </button>
    <button
      class="h-full w-[75px] mx-1 flex justify-center items-center flex-col rounded"
      :class="events.enableClean ? 'hover:bg-slate-100' : ''"
      :disabled="!events.enableClean"
      @click="attrs.onClean"
    >
      <bnb-icons-clean :disabled="!events.enableClean"/>
      <small class="text-[.65rem] font-semibold" :class="events.enableClean ? 'text-gray-600' : 'text-gray-400'">Limpiar</small>
    </button>
    <div class="h-full border-r"></div>
    <button
      class="h-full w-[75px] mx-1 flex justify-center items-center flex-col rounded"
      :class="events.enableFiles ? 'hover:bg-slate-100' : ''"
      :disabled="!events.enableFiles"
      @click="attrs.onFiles"
    >
      <bnb-icons-files :disabled="!events.enableFiles"/>
      <small class="text-[.65rem] font-semibold" :class="events.enableFiles ? 'text-gray-600' : 'text-gray-400'">Archivos</small>
    </button>
    <button
      class="h-full w-[75px] mx-1 flex justify-center items-center flex-col rounded"
      :class="events.enableViews ? 'hover:bg-slate-100' : ''"
      :disabled="!events.enableViews"
      @click="attrs.onViews"
    >
      <bnb-icons-views :disabled="!events.enableViews"/>
      <small class="text-[.65rem] font-semibold" :class="events.enableViews ? 'text-gray-600' : 'text-gray-400'">Vistas</small>
    </button>
    <button
      class="h-full w-[75px] mx-1 flex justify-center items-center flex-col rounded"
      :class="events.enableReview ? 'hover:bg-slate-100' : ''"
      :disabled="!events.enableReview"
      @click="attrs.onReview"
    >
      <bnb-icons-review :disabled="!events.enableReview"/>
      <small class="text-[.65rem] font-semibold" :class="events.enableReview ? 'text-gray-600' : 'text-gray-400'">On Base</small>
    </button>
    <button
      class="h-full w-[75px] mx-1 flex justify-center items-center flex-col rounded"
      :class="events.enableReplaceTask ? 'hover:bg-slate-100' : ''"
      :disabled="!events.enableReplaceTask"
      @click="attrs.onReplaceTask"
    >
      <bnb-icons-replace-task :disabled="!events.enableReplaceTask"/>
      <small class="text-[.65rem] font-semibold" :class="events.enableReplaceTask ? 'text-gray-600' : 'text-gray-400'">Reasignar</small>
    </button>
    <div class="h-full border-r"></div>
    <button
      class="h-full w-[75px] mx-1 flex justify-center items-center flex-col rounded"
      :class="events.enableAbout ? 'hover:bg-slate-100' : ''"
      :disabled="!events.enableAbout"
      @click="attrs.onAbout"
    >
      <bnb-icons-about :disabled="!events.enableAbout"/>
      <small class="text-[.65rem] font-semibold" :class="events.enableAbout ? 'text-gray-600' : 'text-gray-400'">Acerca de</small>
    </button>
  </div>
</template>

<script lang="ts" setup>
const attrs = useAttrs(); setTimeout(() => console.log(attrs), 1000);

const events = computed(() => ({
  enableComplete: !!attrs.onComplete,
  enableClean: !!attrs.onClean,
  enableFiles: !!attrs.onFiles,
  enableViews: !!attrs.onViews,
  enableReview: !!attrs.onReview,
  enableReplaceTask: !!attrs.onReplaceTask,
  enableAbout: !!attrs.onAbout,
}))
</script>
