<script setup lang="ts">
import { useUserStore } from "@/stores/user.store";

const authStore = useUserStore();

authStore.getUser();
</script>

<template>
  <div
    class="flex items-center justify-center h-screen z-0"
    v-if="authStore.isLoading"
  >
    <img class="w-20" src="/loader.svg" alt="" />
  </div>
  <section v-else class="p-5">
    <RouterView />
  </section>
</template>

<style scoped></style>
