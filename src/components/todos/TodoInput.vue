<script setup>
import { ref } from "vue";
import axios from "axios";

// 定義一個 ref 來綁定新待辦事項的輸入值
const newTodo = ref("");

// 讀取 Cookie 中指定名稱的 Token
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

// 新增待辦事項的函數
const addTodo = async () => {
  const token = getCookie("hexschoolTodo"); // 從 Cookie 中讀取 Token
  if (!newTodo.value || !token) return; // 若輸入為空或無 Token 則不執行

  try {
    // 發送 POST 請求來新增待辦事項
    await axios.post(
      "https://todolist-api.hexschool.io/todos",
      { content: newTodo.value },
      {
        headers: {
          Authorization: token, // 使用 Token 進行身份驗證
        },
      }
    );
    console.log("成功新增待辦事項：" + newTodo.value);
    newTodo.value = ""; // 清空輸入欄位
    location.reload(); // 重新整理頁面
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
    <!-- 點擊按鈕時觸發 addTodo 方法，並重新整理頁面 -->
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