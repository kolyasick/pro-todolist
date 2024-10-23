<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useUserStore } from "@/stores/user.store";
import { useRouter } from "vue-router";
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";

const authStore = useUserStore();
const router = useRouter();
const loginForm = ref<boolean>(true);
</script>

<template>
  <div
    class="min-h-[calc(100vh-64px)] bg-gray-100 py-6 flex flex-col justify-center sm:py-12 text-[#202020]"
  >
    <div class="relative py-3 sm:max-w-xl sm:mx-auto w-full">
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#c37169] to-[#C3392C] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
      ></div>
      <div
        class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
      >
        <div class="max-w-md mx-auto">
          <div>
            <h1 class="text-3xl font-bold">
              {{ loginForm ? "Login" : "Register" }}
            </h1>
          </div>

          <LoginForm v-if="loginForm" />

          <RegisterForm v-else />

          <span class="text-lg"
            >{{
              loginForm
                ? "Don't have an account yet?"
                : "Already have an account?"
            }}
            <button @click="loginForm = !loginForm" class="underline">
              {{ loginForm ? "Register" : "Login" }}
            </button></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
