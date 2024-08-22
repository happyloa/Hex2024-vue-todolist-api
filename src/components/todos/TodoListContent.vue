<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import axios from "axios";

import TodoListItem from "./TodoListItem.vue";
import TodoNoItem from "./TodoNoItem.vue";

// 定義待辦事項列表的 ref 變數，將待辦事項儲存在此變數中
const todos = ref([]);

// 讀取 Cookie 中的 Token，通過名稱查找對應的 Cookie 值
const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// 檢查是否有待辦事項，並將其結果儲存在 todos 變數中
const checkTodos = async () => {
  const token = getCookie("hexschoolTodo"); // 從 Cookie 中獲取 Token
  try {
    const response = await axios.get(
      "https://todolist-api.hexschool.io/todos",
      {
        headers: {
          Authorization: token, // 在請求標頭中附加 Token
        },
      }
    );
    todos.value = response.data.data; // 將待辦事項列表儲存在 todos 中
    console.log("已檢查待辦事項列表");
  } catch (error) {
    console.error("無法檢查待辦事項列表:", error.message);
  }
};

// 計算是否有待辦事項，返回 true 或 false
const hasTodos = computed(() => todos.value.length > 0);

// 設定定時器，每 1.5 秒檢查一次待辦事項
onMounted(() => {
  checkTodos(); // 初次檢查待辦事項
  const interval = setInterval(checkTodos, 1500); // 每 1.5 秒檢查一次

  // 在元件卸載時清除定時器，避免內存洩漏
  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>

<template>
  <main class="todoList_Content">
    <!-- 根據 hasTodos 計算屬性動態顯示 TodoListItem 或 TodoNoItem -->
    <TodoListItem v-if="hasTodos" />
    <TodoNoItem v-else />
  </main>
</template>

<style scoped>
.todoList_Content {
  max-width: 500px;
  margin: 0 auto;
}
</style>
