<script setup lang="ts">
import { useDateStore } from "@/stores/date.store";
import { useUserStore } from "@/stores/user.store";
import { useRouter } from "vue-router";
import { ref, computed, watchEffect, onMounted } from "vue";

import CalendarButton from "@/components/CalendarButton.vue";
import DayItem from "@/components/DayItem.vue";
import TaskItem from "@/components/TaskItem.vue";

import { monthNames } from "@/utils/calendarUtils";
import type { IDayItem } from "@/date.interface";

const dateStore = useDateStore();
const authStore = useUserStore();
const router = useRouter();

const weekOffset = ref(0);

const currentYear = computed(() => {
  const startDate = new Date(dateStore.today);
  startDate.setDate(startDate.getDate() + weekOffset.value);
  return startDate.getFullYear();
});

const currentMonth = computed(() => {
  const startDate = new Date(dateStore.today);
  startDate.setDate(startDate.getDate() + weekOffset.value);
  return monthNames[startDate.getMonth()];
});

const limitedDays = computed(() => {
  const days = dateStore.getDays(7);
  days.forEach((day, index) => {
    const tempDate = new Date(dateStore.today);
    tempDate.setDate(tempDate.getDate() + weekOffset.value + index);
    day.date = tempDate;
  });

  return days;
});

const allDays = computed(() => dateStore.getDays(300));

const nextWeek = () => {
  weekOffset.value += 7;
};

const prevWeek = () => {
  if (weekOffset.value >= 7) {
    weekOffset.value -= 7;
  }
};

const isCurrentDay = (day: IDayItem) => {
  return (
    day.date.getDate() === dateStore.today.getDate() &&
    day.date.getMonth() === dateStore.today.getMonth() &&
    day.date.getFullYear() === dateStore.today.getFullYear()
  );
};

const isDayPast = computed(() => {
  return weekOffset.value === 0;
});
</script>

<template>
  <div class="max-w-4xl mx-auto mt-14 z-10">
    <header class="sticky top-0 bg-white">
      <div>
        <h1 class="font-bold text-3xl">Предстоящее</h1>
      </div>
      <CalendarButton
        :month="currentMonth"
        :year="currentYear"
        :isDayPast="isDayPast"
        @prevWeek="prevWeek"
        @nextWeek="nextWeek"
      />
      <div class="mt-5 border-b pb-1">
        <ul class="grid grid-cols-7 gap-1">
          <DayItem
            v-for="(day, index) in limitedDays"
            :key="index"
            :date="day"
            :isCurrentDay="isCurrentDay(day)"
          />
        </ul>
      </div>
    </header>
    <section class="mt-10 flex flex-col gap-12 text-[#808080]">
      <TaskItem v-for="(day, index) in allDays" :key="index" :date="day" />
    </section>
  </div>
</template>

<style scoped></style>
