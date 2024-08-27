<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import axios from "axios";

import TodoInput from "./TodoInput.vue";
import TodoListItem from "./TodoListItem.vue";
import TodoNoItem from "./TodoNoItem.vue";

// 定義待辦事項列表的 ref 變數，將待辦事項儲存在此變數中
const todos = ref([]);

// 檢查是否有待辦事項，並將其結果儲存在 todos 變數中
const checkTodos = async () => {
  try {
    const response = await axios.get("https://todolist-api.hexschool.io/todos");
    todos.value = response.data.data; // 將待辦事項列表儲存在 todos 中
    console.log("已檢查待辦事項列表");
  } catch (error) {
    console.error("無法檢查待辦事項列表:", error.message);
  }
};

// 計算是否有待辦事項，返回 true 或 false
const hasTodos = computed(() => todos.value.length > 0);

// 使用 ref 來引用 TodoListItem 元件，以便觸發其內部方法
const todoListItemRef = ref(null);

// 當接收到 TodoInput 發出的事件時，觸發 TodoListItem 的 getTodos 方法
const handleTodoAdded = () => {
  if (todoListItemRef.value) {
    todoListItemRef.value.getTodos(); // 觸發 TodoListItem 元件內的 getTodos 方法
  }
};

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
    <!-- 透過 todo-added emit 來觸發 handleTodoAdded 方法 -->
    <TodoInput @todo-added="handleTodoAdded" />
    <!-- 根據 hasTodos 計算屬性動態顯示 TodoListItem 或 TodoNoItem -->
    <!-- 將 TodoListItem 綁定到 todoListItemRef，以便能夠觸發其方法 -->
    <TodoListItem v-if="hasTodos" ref="todoListItemRef" />
    <TodoNoItem v-else />
  </main>
</template>

<style scoped>
.todoList_Content {
  max-width: 500px;
  margin: 0 auto;
}
</style>
