<script setup lang="ts">
import { useUserStore } from "@/stores/user.store";
import { ref } from "vue";

const authStore = useUserStore();

const name = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
</script>
<template>
  <div class="divide-y divide-gray-200">
    <div
      class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
    >
      <div class="relative">
        <input
          @input="authStore.clearErrors()"
          v-model="name"
          id="name"
          type="text"
          :class="authStore.errors.name ? 'border-red-500' : ''"
          class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
          placeholder="Name"
        />
        <label
          for="name"
          class="absolute cursor-text left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
          >Name</label
        >
        <p v-if="authStore.errors.name" class="text-red-500">
          {{ authStore.errors.name }}
        </p>
      </div>
      <div class="relative">
        <input
          @input="authStore.clearErrors()"
          v-model="email"
          id="email"
          type="text"
          :class="authStore.errors.email ? 'border-red-500' : ''"
          class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
          placeholder="Email address"
        />
        <label
          for="email"
          class="absolute cursor-text left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
          >Email Address</label
        >
        <p v-if="authStore.errors.email" class="text-red-500">
          {{ authStore.errors.email }}
        </p>
      </div>
      <div class="relative">
        <input
          @input="authStore.clearErrors()"
          v-model="password"
          id="password"
          type="password"
          :class="authStore.errors.password ? 'border-red-500' : ''"
          class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
          placeholder="Password"
        />
        <label
          for="password"
          class="absolute cursor-text left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
          >Password</label
        >
        <p v-if="authStore.errors.password" class="text-red-500">
          {{ authStore.errors.password }}
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <button
          @click="authStore.register(email, password, name)"
          class="bg-[#C3392C] text-white rounded-md px-2 py-3 w-full"
        >
          Register
        </button>
        <span v-if="authStore.errors.other" class="text-red-500">
          {{ authStore.errors.other }}
        </span>
      </div>
    </div>
  </div>
</template>

<style></style>
