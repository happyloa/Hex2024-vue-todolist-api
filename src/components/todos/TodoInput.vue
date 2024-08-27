<script setup>
import { ref } from "vue";
import axios from "axios";

// 定義一個 ref 來綁定新待辦事項的輸入值
const newTodo = ref("");

// 使用 `emit` 函數來觸發事件，讓父元件能夠接收到此事件
const emit = defineEmits(["todo-added"]);

// 新增待辦事項的函數
const addTodo = async () => {
  if (!newTodo.value) return; // 若輸入為空則不執行

  try {
    // 發送 POST 請求來新增待辦事項
    await axios.post("https://todolist-api.hexschool.io/todos", {
      content: newTodo.value,
    });
    console.log("成功新增待辦事項：" + newTodo.value);
    newTodo.value = ""; // 清空輸入欄位

    // 觸發自定義事件，通知父元件
    emit("todo-added");
  } catch (error) {
    // 錯誤處理
    console.error(
      "新增待辦事項失敗:",
      error.response?.data?.message || error.message
    );
  }
};
</script>

<template>
  <div class="inputBox">
    <!-- 綁定輸入欄位到 newTodo -->
    <input type="text" placeholder="新增待辦事項" v-model="newTodo" />
    <!-- 點擊按鈕時觸發 addTodo 方法 -->
    <a href="#" @click.prevent="addTodo">
      <img src="/src/assets/icons/plus.svg" />
    </a>
  </div>
</template>

<style scoped>
.inputBox {
  border-radius: 10px;
  position: relative;
  margin-bottom: 16px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
}

.inputBox input {
  background: #fff;
  border: none;
  border-radius: 10px;
  position: relative;
  width: 100%;
  font-size: 16px;
  padding: 12px 0 12px 16px;
}

.inputBox a {
  display: block;
  width: 40px;
  height: 40px;
  position: absolute;
  background: #333333;
  border-radius: 10px;
  top: 4px;
  right: 4px;
  padding: 10px;
}
</style>
