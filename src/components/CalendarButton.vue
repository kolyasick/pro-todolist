<script setup lang="ts">
defineProps<{
  month: string;
  year: number;
  isDayPast: boolean;
}>();

const emit = defineEmits<{
  (e: "prevWeek"): void;
  (e: "nextWeek"): void;
}>();

const emitPrevWeek = () => {
  emit("prevWeek");
};

const emitNextWeek = () => {
  emit("nextWeek");
};
</script>

<template>
  <div class="mt-4 flex items-center justify-between">
    <button class="flex items-center">
      <span class="font-semibold mr-2">{{ month }}</span>
      {{ year }}
      <div class="ml-1">
        <img src="/arrow.svg" alt="Arrow-down" />
      </div>
    </button>
    <div class="flex items-center gap-2 border-t border-b">
      <button
        @click="emitPrevWeek"
        :disabled="isDayPast"
        class="disabled:opacity-40"
      >
        <img class="rotate-90" src="/arrow.svg" alt="Arrow-left" />
      </button>
      <p>Сегодня</p>

      <button @click="emitNextWeek">
        <img class="-rotate-90" src="/arrow.svg" alt="Arrow-right" />
      </button>
    </div>
  </div>
</template>

<style></style>
