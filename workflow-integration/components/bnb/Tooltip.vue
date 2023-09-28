<template>
  <span ref="objectBase">
    <slot name="activator"></slot>
  </span>
  <div
    v-show="isHovered"
    ref="objectTooltip"
    class="px-2 py-1 bg-gray-500 text-white text-xs rounded arrow-container z-[300]"
    :style="{
      top: `${tooltipY ?? 0}px`,
      left: `${tooltipX ?? 0}px`,
      position: tooltipStrategy,
    }"
  >
    <slot></slot>
    <div
      ref="objectArrow"
      :style="{
        [invertPosition]: `${(tooltipMiddleware?.arrow?.y ?? 0) - 10}px`,
        left: `${tooltipMiddleware?.arrow?.x ?? 0}px`,
        position: tooltipStrategy,
      }"
      class="absolute w-[10px] h-[10px] border-transparent border-[5px]"
      :class="{
        'border-b-gray-500': invertPosition == 'top',
        'border-t-gray-500': invertPosition == 'bottom',
        'border-l-gray-500': invertPosition == 'right',
        'border-r-gray-500': invertPosition == 'left',
      }"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { 
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  arrow,
} from "@floating-ui/vue";

import { useElementHover } from "@vueuse/core";

const objectBase = ref();
const objectTooltip = ref();

const objectArrow = ref();

const {
  x: tooltipX,
  y: tooltipY,
  strategy: tooltipStrategy,
  middlewareData: tooltipMiddleware,
  placement: tooltipPlacement,
} = useFloating(objectBase, objectTooltip, {
  placement: "bottom",
  middleware: [offset(7), flip(), shift(), arrow({ element: objectArrow })],
  whileElementsMounted: autoUpdate,
});

const isHovered = useElementHover(objectBase);


const invertPosition = computed(() => ({
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
})[tooltipPlacement.value.split("-")[0]] || "top");

</script>
