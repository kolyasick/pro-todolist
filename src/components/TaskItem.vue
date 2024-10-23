<script setup lang="ts">
import { formatDate, monthNames } from "@/utils/calendarUtils";
import type { IDayItem } from "@/types/date.type";
import { computed, ref } from "vue";
import CreateTaskForm from "./CreateTaskForm.vue";
import TaskToDoItem from "./TaskToDoItem.vue";
import { useUserStore } from "@/stores/user.store";

const props = defineProps<{
  date: IDayItem;
}>();
const authStore = useUserStore();

const isHover = ref<boolean>(false);
const isFormOpen = ref<boolean>(false);

const filteredTasks = computed(() => {
  if (!authStore.user?.tasks) return [];

  return authStore.user?.tasks.filter((task) => {
    const taskDate = new Date(task.date);
    return (
      taskDate.getDate() === props.date.date.getDate() &&
      taskDate.getMonth() === props.date.date.getMonth() &&
      taskDate.getFullYear() === props.date.date.getFullYear()
    );
  });
});

const isTodayOrTomorrow = () => {
  const today = new Date();
  const thisDate = formatDate(props.date.date);

  if (
    thisDate.day === today.getDate() &&
    thisDate.month === monthNames[today.getMonth()] &&
    thisDate.year === today.getFullYear()
  ) {
    return "Сегодня ‧";
  } else if (
    thisDate.day === today.getDate() + 1 &&
    thisDate.month === monthNames[today.getMonth()] &&
    thisDate.year === today.getFullYear()
  ) {
    return "Завтра ‧";
  } else {
    return "";
  }
};

const openForm = () => {
  isFormOpen.value = true;
  isHover.value = false;
};

const date = computed(() => formatDate(props.date.date));
</script>

<template>
  <div
    :id="
      date.day + '-' + (monthNames.indexOf(date.month) + 1) + '-' + date.year
    "
  >
    <div
      class="font-bold pb-1"
      :class="[
        {
          'border-b': !isFormOpen,
          'text-[#000000]': isTodayOrTomorrow() === 'Сегодня ‧',
        },
      ]"
    >
      {{ date.day }} {{ date.month }} ‧ {{ isTodayOrTomorrow() }}
      {{ date.dayOfWeek }}
    </div>

    <div class="flex flex-col gap-4 my-4">
      <TaskToDoItem
        v-for="(task, index) in filteredTasks"
        :task="task"
        :key="index"
      />
    </div>

    <div v-if="!isFormOpen">
      <button
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
        @click="openForm"
        class="mt-3 flex items-center gap-3 hover:text-[#DC4C3E]"
      >
        <div
          class="border rounded-full p-1"
          :class="isHover ? 'bg-[#DC4C3E]' : ''"
        >
          <svg width="13" height="13">
            <path
              :fill="isHover ? '#fff' : '#DC4C3E'"
              fill-rule="evenodd"
              d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
            ></path>
          </svg>
        </div>
        <span>Добавить задачу</span>
      </button>
    </div>

    <CreateTaskForm
      :date="props.date"
      v-else
      @close-form="isFormOpen = false"
    />
  </div>
</template>
