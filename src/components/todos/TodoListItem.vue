<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

// 定義待辦事項列表的 ref 變數
const todos = ref([]);

// 定義當前選取的 tab，用於過濾待辦事項（'all', 'pending', 'completed'）
const activeTab = ref("all");

// 從 Cookie 中讀取指定名稱的 Token
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

// 獲取待辦事項列表，並將其存儲在 todos ref 中
const getTodos = async () => {
  const token = getCookie("hexschoolTodo"); // 從 Cookie 中獲取 Token
  try {
    const response = await axios.get(
      "https://todolist-api.hexschool.io/todos",
      {
        headers: {
          Authorization: token, // 將 Token 附加到請求標頭中
        },
      }
    );
    todos.value = response.data.data; // 將返回的待辦事項列表存入 todos 中
    console.log("已獲取待辦事項清單");
  } catch (error) {
    console.error("無法獲取待辦事項列表:", error.message);
  }
};

// 使用 expose 來將 getTodos 方法暴露給父元件，以便可以從外部調用
defineExpose({
  getTodos,
});

// 刪除指定 ID 的待辦事項，然後重新獲取待辦事項列表
const deleteTodo = async (id) => {
  const token = getCookie("hexschoolTodo");
  const todoToDelete = todos.value.find((todo) => todo.id === id); // 找到待刪除的待辦事項
  await axios.delete(`https://todolist-api.hexschool.io/todos/${id}`, {
    headers: {
      Authorization: token, // 在請求中附加 Token
    },
  });
  console.log(`已刪除待辦事項：${todoToDelete.content}，ID 為：${todoToDelete.id}`);
  getTodos(); // 刪除後重新獲取待辦事項列表
};

// 切換指定 ID 的待辦事項的完成狀態，然後重新獲取待辦事項列表
const toggleStatus = async (id) => {
  const token = getCookie("hexschoolTodo");
  const todoToToggle = todos.value.find((todo) => todo.id === id); // 找到待切換狀態的待辦事項
  await axios.patch(
    `https://todolist-api.hexschool.io/todos/${id}/toggle`,
    {},
    {
      headers: {
        Authorization: token, // 在請求中附加 Token
      },
    }
  );
  console.log(`待辦事項：「${todoToToggle.content}」已切換狀態`);
  getTodos(); // 切換狀態後重新獲取待辦事項列表
};

// 根據選取的 tab 過濾待辦事項列表
const filteredTodos = computed(() => {
  if (activeTab.value === "all") {
    return todos.value; // 返回全部待辦事項
  } else if (activeTab.value === "pending") {
    return todos.value.filter((todo) => !todo.status); // 返回未完成的待辦事項
  } else if (activeTab.value === "completed") {
    return todos.value.filter((todo) => todo.status); // 返回已完成的待辦事項
  }
});

// 計算待完成的待辦事項數量
const pendingTodosCount = computed(() => {
  return todos.value.filter((todo) => !todo.status).length;
});

// 計算已完成的待辦事項數量
const completedTodosCount = computed(() => {
  return todos.value.filter((todo) => todo.status).length; // 計算並返回已完成的待辦事項數量
});

// 元件掛載後，初次獲取待辦事項列表
onMounted(() => {
  getTodos();
});
</script>

<template>
  <div class="todoList_list">
    <ul class="todoList_tab">
      <!-- 根據 activeTab 動態添加 active class，並切換 tab -->
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
            <span>{{ todo.content }}</span>
          </label>
          <img
            src="/src/assets/icons/delete.svg"
            @click="deleteTodo(todo.id)" />
        </li>
      </ul>
      <div class="todoList_statistics">
        <!-- 顯示待完成與已完成的待辦事項數量 -->
        <p>
          {{ pendingTodosCount }} 個待完成項目 |
          {{ completedTodosCount }} 個已完成項目
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("/src/assets/css/TodoListItemStyle.css");
</style>
