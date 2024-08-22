<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

// 定義待辦事項相關的 refs
const todos = ref([]);
const todoEdit = ref({});
const editingId = ref(null); // 追踪正在編輯的待辦事項 ID
const activeTab = ref("all"); // 定義當前選取的 tab

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

// 獲取待辦事項列表
const getTodos = async () => {
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
    console.log("已獲取待辦事項清單");
  } catch (error) {
    console.error("無法獲取待辦事項列表:", error.message);
  }
};

// 刪除待辦事項
const deleteTodo = async (id) => {
  const token = getCookie("hexschoolTodo");
  const todoToDelete = todos.value.find((todo) => todo.id === id);
  await axios.delete(`https://todolist-api.hexschool.io/todos/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  console.log(`已刪除待辦事項：${todoToDelete.content}`);
  getTodos();
};

// 更新待辦事項
const updateTodo = async (id) => {
  const token = getCookie("hexschoolTodo");
  const todo = todos.value.find((todo) => todo.id === id);
  const oldContent = todo.content;
  todo.content = todoEdit.value[id];
  await axios.put(`https://todolist-api.hexschool.io/todos/${id}`, todo, {
    headers: {
      Authorization: token,
    },
  });
  console.log(`已更新待辦事項：${oldContent} > ${todo.content}`);
  getTodos();
  todoEdit.value[id] = ""; // 清空更新值
  editingId.value = null; // 結束編輯模式
};

// 切換待辦事項的完成狀態
const toggleStatus = async (id) => {
  const token = getCookie("hexschoolTodo");
  const todoToToggle = todos.value.find((todo) => todo.id === id);
  await axios.patch(
    `https://todolist-api.hexschool.io/todos/${id}/toggle`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  console.log(`待辦事項：「${todoToToggle.content}」已切換狀態`);
  getTodos();
};

// 選取 tab 來過濾待辦事項
const filteredTodos = computed(() => {
  if (activeTab.value === "all") {
    return todos.value;
  } else if (activeTab.value === "pending") {
    return todos.value.filter((todo) => !todo.status);
  } else if (activeTab.value === "completed") {
    return todos.value.filter((todo) => todo.status);
  }
});

// 元件掛載後取得待辦事項列表
onMounted(() => {
  getTodos();
});
</script>

<template>
  <div class="todoList_list">
    <ul class="todoList_tab">
      <li>
        <a
          href="#"
          :class="{ active: activeTab === 'all' }"
          @click.prevent="activeTab = 'all'"
          >全部</a
        >
      </li>
      <li>
        <a
          href="#"
          :class="{ active: activeTab === 'pending' }"
          @click.prevent="activeTab = 'pending'"
          >待完成</a
        >
      </li>
      <li>
        <a
          href="#"
          :class="{ active: activeTab === 'completed' }"
          @click.prevent="activeTab = 'completed'"
          >已完成</a
        >
      </li>
    </ul>
    <div class="todoList_items">
      <ul class="todoList_item">
        <!-- 使用 v-for 迭代並顯示過濾後的待辦事項 -->
        <li v-for="todo in filteredTodos" :key="todo.id">
          <label class="todoList_label">
            <input
              class="todoList_input"
              type="checkbox"
              :checked="todo.status"
              @change="toggleStatus(todo.id)" />
            <span
              v-if="editingId !== todo.id"
              @dblclick="enableEdit(todo.id, todo.content)">
              {{ todo.content }}
            </span>
            <input
              v-else
              type="text"
              v-model="todoEdit[todo.id]"
              @blur="updateTodo(todo.id)"
              @keydown="handleKeydown($event, todo.id)" />
          </label>
          <img
            src="/src/assets/icons/delete.svg"
            @click="deleteTodo(todo.id)" />
        </li>
      </ul>
      <div class="todoList_statistics">
        <p>
          {{ filteredTodos.filter((todo) => todo.status).length }} 個已完成項目
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("/src/assets/css/TodoListItemStyle.css");
</style>
