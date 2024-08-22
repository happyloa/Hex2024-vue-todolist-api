<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

import TodoListContent from "@/components/todos/TodoListContent.vue";

const router = useRouter(); // 使用 Vue Router 進行路由跳轉
const tokenSignOut = ref(""); // 保存從 Cookie 中讀取的 Token
const nickname = ref(""); // 保存從 Cookie 中讀取的用戶暱稱

// 讀取 Cookie 中指定名稱的值
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

// 刪除所有 Cookie
const deleteAllCookies = () => {
  const cookies = document.cookie.split(";");
  cookies.forEach((cookie) => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  });
};

// 處理登出邏輯
const handleLogout = async () => {
  try {
    tokenSignOut.value = getCookie("hexschoolTodo"); // 從 Cookie 中讀取 Token
    const response = await axios.post(
      "https://todolist-api.hexschool.io/users/sign_out",
      {},
      {
        headers: {
          Authorization: tokenSignOut.value, // 使用 Token 進行身份驗證
        },
      }
    );
    console.log(response.data.message); // 顯示登出回應
    deleteAllCookies(); // 刪除所有 Cookie
    Swal.fire({
      title: "已成功登出，下次再見👋",
      icon: "success",
      confirmButtonText: "ㄅㄅ👋👋",
    }).then(() => {
      router.push("/login"); // 登出後跳轉至登入畫面
    });
  } catch (error) {
    Swal.fire({
      title: "登出失敗",
      icon: "error",
      text: error.response?.data?.message || "請稍後再試",
      confirmButtonText: "OK",
    });
  }
};

// 在元件掛載後檢查 Token，並取得用戶暱稱
onMounted(() => {
  tokenSignOut.value = getCookie("hexschoolTodo"); // 檢查是否有 Token

  if (!tokenSignOut.value) {
    // 如果沒有 Token，顯示警告並跳轉至登入頁面
    Swal.fire({
      title: "抓到！",
      icon: "warning",
      text: "沒登入還想進來啊？下去吧！滾！",
      confirmButtonText: "被抓到惹ㄎㄎ",
    }).then(() => {
      router.push("/login");
    });
  } else {
    nickname.value = getCookie("nickname"); // 從 Cookie 中讀取暱稱
  }
});
</script>

<template>
  <section class="container">
    <nav class="navbar">
      <img src="/src/assets/images/logo.webp" alt="網站 Logo" class="logo" />
      <ul class="user-name-and-logout">
        <li class="user-name">{{ nickname }}的待辦清單</li>
        <!-- 使用動態的暱稱 -->
        <li class="logout" @click="handleLogout">登出</li>
      </ul>
    </nav>
    <TodoListContent />
    <!-- 待辦事項清單內容 -->
  </section>
</template>

<style scoped>
@import url("/src/assets/css/TodoNavStyle.css");
</style>
