<script setup lang="ts">
import type { IDayItem } from "@/types/date.type";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user.store";

const authStore = useUserStore();

const props = defineProps<{
  date: IDayItem;
}>();
const taskInput = ref<HTMLInputElement | null>(null);

const title = ref<string>("");
const description = ref<string>("");

const emit = defineEmits<{
  (e: "close-form"): void;
}>();

const closeForm = () => {
  emit("close-form");
};

const addTask = async () => {
  if (!title.value) return;

  let newTitle = title.value;
  let newDescription = description.value;

  title.value = "";
  description.value = "";

  emit("close-form");
  await authStore.addTask(newTitle, newDescription, props.date.date);
};
onMounted(() => {
  if (taskInput.value) {
    taskInput.value.focus();
  }
});
</script>

<template>
  <div class="border border-gray-300 p-4 rounded-lg shadow-sm">
    <div>
      <input
        @keyup.enter="addTask"
        ref="taskInput"
        type="text"
        v-model="title"
        placeholder="Название задачи"
        class="w-full text-black text-lg border-b-2 pb-2 border-gray-200 focus:outline-none focus:border-gray-400 placeholder:text-[#808080]"
      />
    </div>

    <div class="mt-2">
      <input
        @keyup.enter="addTask"
        type="text"
        v-model="description"
        placeholder="Описание"
        class="w-full text-sm pb-2 border-b-2 border-gray-200 focus:outline-none focus:border-gray-400 placeholder:text-[#808080]"
      />
    </div>

    <div class="mt-4 flex justify-end items-center">
      <div class="flex gap-2">
        <button
          @click="closeForm"
          class="text-gray-500 px-4 py-2 rounded-md border border-gray-300"
        >
          Отмена
        </button>
        <button
          :disabled="!title"
          @click.prevent="addTask"
          class="bg-[#DC4C3E] text-white px-4 py-2 rounded-md disabled:bg-[#EDA59E]"
        >
          Добавить задачу
        </button>
      </div>
    </div>
  </div>
</template>
