import { createRouter, createWebHashHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import TodosView from "../views/TodosView.vue";

const router = createRouter({
  // 使用 Hash Mode
  history: createWebHashHistory(),
  routes: [
    {
      path: "/:catchAll(.*)", // 捕捉所有未定義的路徑
      redirect: "/login", // 重定向到登入畫面
    },
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
