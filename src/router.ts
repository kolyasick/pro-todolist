// router.ts
import { createRouter, createWebHistory } from "vue-router";
import auth from "./pages/auth.vue";
import index from "./pages/index.vue";

const routes = [
  { path: "/auth", component: auth },
  { path: "/upcoming", component: index },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isLoggedIn =
    localStorage.getItem("sb-hbybmfsifmxbzwtakvac-auth-token") ?? false;

  if (to.path !== "/auth" && !isLoggedIn) {
    next("/auth");
  } else if (to.path === "/auth" && isLoggedIn) {
    next("/upcoming");
  } else {
    next();
  }
});

export default router;
