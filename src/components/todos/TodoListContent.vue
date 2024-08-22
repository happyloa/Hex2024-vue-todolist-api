<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

import TodoInput from "./TodoInput.vue";
import TodoListItem from "./TodoListItem.vue";
import TodoNoItem from "./TodoNoItem.vue";

// 定義待辦事項列表
const todos = ref([]);

// 讀取 Cookie 中的 Token
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

// 檢查是否有待辦事項
const checkTodos = async () => {
  const token = getCookie("hexschoolTodo");
  try {
    const response = await axios.get(
      "https://todolist-api.hexschool.io/todos",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    todos.value = response.data.data;
    console.log("已檢查待辦事項列表");
  } catch (error) {
    console.error("無法檢查待辦事項列表:", error.message);
  }
};

// 計算是否有待辦事項
const hasTodos = computed(() => todos.value.length > 0);

// 元件掛載後，初次檢查待辦事項
onMounted(() => {
  checkTodos();
});
</script>

<template>
  <main class="todoList_Content">
    <TodoInput />
    <!-- 當有待辦事項時顯示 TodoListItem，否則顯示 TodoNoItem -->
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
