<template>
  <div>
    <div class="flex justify-center items-center">
      <div class="line-dummy"></div>
      <template
        v-for="(_, index) in steps"
        :key="index"
      >
        <div
          v-if="index > 0"
          class="line bg-gray-300"
          :class="{
            '!bg-primary-500': index < step,
            '!bg-secondary-500': index == step,
          }"
        ></div>
        <div
          class="step"
          :class="{
            '!bg-primary-500': index < step,
            '!bg-secondary-500': index == step,
          }"
        >
          <bnb-icon
            v-if="index < step"
            size="12"
            name="i-mingcute-check-fill"
            class="bg-white"
          />
        </div>
      </template>
      <div class="line-dummy"></div>
    </div>
    <div class="flex text-center break-words mt-2">
      <div
        v-for="(current, index) in steps"
        :key="index"
        class="flex-1 w-0"
        :class="{
          'text-secondary-500 font-semibold': index == step,
          'text-primary-700': index < step,
        }"
      >
        {{ current }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    steps: string[];
    step: number;
  }>();
</script>

<style scoped lang="postcss">
  .step {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #aaa;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    padding: 2px;
  }

  .line {
    flex: 1;
    height: 2px;
    background-color: #aaa;
  }

  .line-dummy {
    flex: .5;
  }
</style>
