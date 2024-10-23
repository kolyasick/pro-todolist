<script setup lang="ts">
import { useUserStore } from "@/stores/user.store";
import SideNavMenu from "./components/SideNavMenu.vue";

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

  <main v-else :class="[authStore.status ? 'flex' : '']">
    <section :class="[authStore.status ? 'w-1/6 bg-[#FCFAF8]' : 'w-full']">
      <SideNavMenu v-if="authStore.status" />
    </section>
    <section :class="[authStore.status ? 'w-5/6' : 'w-full']">
      <RouterView />
    </section>
  </main>
</template>

<style scoped></style>
