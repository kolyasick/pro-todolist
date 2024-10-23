<script setup lang="ts">
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user.store";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const route = useRoute();
const user = computed(() => userStore.user);

const isUpcoming = computed(() => route.path === "/upcoming");
const isInbox = computed(() => route.path === "/inbox");
const isToday = computed(() => route.path === "/today");
</script>

<template>
  <section class="flex flex-col gap-2 p-5 sticky top-0">
    <div class="flex items-center justify-between gap-3">
      <span class="flex items-center gap-2">
        <img
          width="30"
          class="rounded-full"
          :src="user?.user_metadata.avatar"
          alt=""
        />
        <p class="font-semibold">{{ user?.user_metadata.username }}</p>
      </span>
      <button @click="userStore.logout()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          aria-hidden="true"
        >
          <g fill="none" fill-rule="evenodd">
            <path
              stroke="currentColor"
              d="M6.5 8.3V5.63c0-1.17.9-2.13 2-2.13h7c1.1 0 2 .95 2 2.13v11.74c0 1.17-.9 2.13-2 2.13h-7c-1.1 0-2-.95-2-2.13V14.7"
            ></path>
            <path
              fill="currentColor"
              d="m12.8 11-2.15-2.15a.5.5 0 1 1 .7-.7L14 10.79a1 1 0 0 1 0 1.42l-2.65 2.64a.5.5 0 0 1-.7-.7L12.79 12H4.5a.5.5 0 0 1 0-1h8.3z"
            ></path>
          </g>
        </svg>
      </button>
    </div>
    <button class="my-3 flex items-center gap-3 hover:text-[#DC4C3E]">
      <div class="border rounded-full p-1 bg-[#DC4C3E]">
        <svg width="13" height="13">
          <path
            fill="#fff"
            fill-rule="evenodd"
            d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
          ></path>
        </svg>
      </div>
      <span class="text-[#DC4C3E] font-semibold">Добавить задачу</span>
    </button>
    <nav>
      <ul class="flex flex-col">
        <li class="flex ga-2">
          <button class="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M16.29 15.584a7 7 0 1 0-.707.707l3.563 3.563a.5.5 0 0 0 .708-.707l-3.563-3.563ZM11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Поиск
          </button>
        </li>
        <li
          class="flex gap-2"
          :class="[{ 'bg-[#FFEFE5] text-[#DC4C3E]': isInbox }]"
        >
          <router-link to="/inbox" class="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M8.062 4h7.876a2 2 0 0 1 1.94 1.515l2.062 8.246c.04.159.06.322.06.486V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3.754a2 2 0 0 1 .06-.485L6.12 5.515A2 2 0 0 1 8.061 4Zm0 1a1 1 0 0 0-.97.758L5.03 14.004a1 1 0 0 0-.03.242V18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.754a.997.997 0 0 0-.03-.242L16.91 5.758a1 1 0 0 0-.97-.758H8.061Zm6.643 10a2.75 2.75 0 0 1-5.41 0H7a.5.5 0 1 1 0-1h2.75a.5.5 0 0 1 .5.5 1.75 1.75 0 1 0 3.5 0 .5.5 0 0 1 .5-.5H17a.5.5 0 0 1 0 1h-2.295Z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Входящие
          </router-link>
        </li>
        <li
          class="flex ga-2"
          :class="[{ 'bg-[#FFEFE5] text-[#DC4C3E]': isToday }]"
        >
          <router-link class="flex gap-2" to="/today">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <g fill="currentColor" fill-rule="evenodd">
                <path
                  fill-rule="nonzero"
                  d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                ></path>
                <text
                  font-family="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                  font-size="9"
                  transform="translate(4 2)"
                  font-weight="500"
                >
                  <tspan x="8" y="15" text-anchor="middle">23</tspan>
                </text>
              </g>
            </svg>
            Сегодня
          </router-link>
        </li>
        <li
          class="flex ga-2"
          :class="[{ 'bg-[#FFEFE5] text-[#DC4C3E]': isUpcoming }]"
        >
          <router-link class="flex gap-2" to="/upcoming">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6Zm10 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7 8a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1H7Z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Предстоящее
          </router-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<style scoped>
li {
  @apply py-2;
  @apply rounded-lg;
}
</style>
