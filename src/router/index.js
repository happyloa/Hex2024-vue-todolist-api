import { createRouter, createWebHashHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import TodosView from "../views/TodosView.vue";

const router = createRouter({
  // 使用 Hash Mode
  history: createWebHashHistory(),
  routes: [
    // 當來到 / 路徑時，直接導向到 /login
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/todos",
      name: "todos",
      component: TodosView,
    },
  ],
});

export default router;
