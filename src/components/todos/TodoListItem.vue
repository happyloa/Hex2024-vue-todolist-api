<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// 定義一個 ref 來保存待辦事項列表
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

// 從 API 獲取待辦事項列表
const getTodos = async () => {
  const token = getCookie("hexschoolTodo"); // 從 Cookie 中讀取 Token
  try {
    const response = await axios.get(
      "https://todolist-api.hexschool.io/todos",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    todos.value = response.data.data; // 將回應的待辦事項列表保存到 ref
  } catch (error) {
    console.error("無法獲取待辦事項列表:", error.message);
  }
};

// 元件掛載後立即獲取待辦事項列表
onMounted(() => {
  getTodos();
});
</script>

<template>
  <div class="todoList_list">
    <ul class="todoList_tab">
      <li><a href="#" class="active">全部</a></li>
      <li><a href="#">待完成</a></li>
      <li><a href="#">已完成</a></li>
    </ul>
    <div class="todoList_items">
      <ul class="todoList_item">
        <!-- 使用 v-for 迭代待辦事項列表，顯示每個待辦事項 -->
        <li v-for="todo in todos" :key="todo.id">
          <label class="todoList_label">
            <input
              class="todoList_input"
              type="checkbox"
              :checked="todo.status" />
            <span>{{ todo.content }}</span>
          </label>
          <img src="/src/assets/icons/delete.svg" />
        </li>
      </ul>
      <div class="todoList_statistics">
        <p>{{ todos.filter((todo) => todo.status).length }} 個已完成項目</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("/src/assets/css/TodoListItemStyle.css");
</style>
