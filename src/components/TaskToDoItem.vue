<script setup lang="ts">
import type { ITask } from "@/date.interface";
import { ref } from "vue";
import { useUserStore } from "@/stores/user.store";

interface Props {
  task: ITask;
}

const authStore = useUserStore();

const isHover = ref<boolean>(false);
const props = defineProps<Props>();

const clickSound = new Audio("/public/done-sound.mp3");

const updateTask = () => {
  clickSound.play();
  authStore.updateTask(props.task);
};
</script>

<template>
  <button
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    @click="updateTask"
    class="flex items-start gap-3 border border-gray-400 p-3 rounded-lg"
  >
    <span
      class="w-5 h-5 border border-[#4b4848] rounded-full flex items-center justify-center mt-1"
    >
      <svg
        :class="[{ block: isHover }, { hidden: !isHover }]"
        width="11"
        height="9"
        viewBox="0 0 11 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.29999 1.2L3.79999 6.7L1.29999 4.2"
          stroke="#4B4848"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <div>
      <div class="text-black text-[17px] text-start">
        {{ props.task.title }}
      </div>
      <p class="text-[14px] text-start">{{ props.task.description }}</p>
    </div>
  </button>
</template>

<style></style>
