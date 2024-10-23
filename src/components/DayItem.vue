<script setup lang="ts">
import { formatDate, monthNames } from "@/utils/calendarUtils";
import type { IDayItem } from "@/types/date.type";
import { computed } from "vue";

const props = defineProps<{
  date: IDayItem;
  isCurrentDay: boolean;
}>();

const date = computed(() => formatDate(props.date.date));
</script>

<template>
  <li
    class="text-center text-[#585858]"
    :class="[{ 'font-bold text-black': isCurrentDay }]"
  >
    <a
      :href="
        '#' +
        date.day +
        '-' +
        (monthNames.indexOf(date.month) + 1) +
        '-' +
        date.year
      "
    >
      {{ date.dayOfWeekShort }}
      <span
        class="mr-1 rounded px-1"
        :class="isCurrentDay && 'bg-[#DC4C3E] text-white'"
      >
        {{ date.day }}
      </span>
    </a>
  </li>
</template>
