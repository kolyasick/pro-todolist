<script setup lang="ts">
import { formatDate, monthNames } from "@/utils/calendarUtils";
import type { IDayItem } from "@/date.interface";
import { computed } from "vue";

interface Props {
  date: IDayItem;
  isCurrentDay: boolean;
}
const props = defineProps<Props>();

const date = computed(() => formatDate(props.date.date));
</script>

<template>
  <li
    class="text-center text-[#585858]"
    :class="[{ 'font-bold text-black': isCurrentDay }]"
  >
    <a
      :href="
        '#' + date.day + '-' + monthNames.indexOf(date.month) + '-' + date.year
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
