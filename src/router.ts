import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./stores/auth.store";
import auth from "./pages/auth.vue";
import index from "./pages/index.vue";


const routes = [
  { path: "/auth", component: auth },
  { path: "/", component: index },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
