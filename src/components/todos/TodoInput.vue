<script setup>
import { ref } from "vue";
import axios from "axios";

const newTodo = ref("");

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

const addTodo = async () => {
  const token = getCookie("hexschoolTodo");
  if (!newTodo.value || !token) return;

  try {
    await axios.post(
      "https://todolist-api.hexschool.io/todos",
      { content: newTodo.value },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("成功新增待辦事項：" + newTodo.value);
    newTodo.value = ""; // 清空輸入欄位
    // 在此處可以調用更新待辦事項列表的函數
  } catch (error) {
    console.error(
      "新增待辦事項失敗:",
      error.response?.data?.message || error.message
    );
  }
};
</script>

<template>
  <div class="inputBox">
    <input type="text" placeholder="請輸入待辦事項" v-model="newTodo" />
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
