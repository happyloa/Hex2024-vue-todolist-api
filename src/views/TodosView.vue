<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const router = useRouter();
const tokenSignOut = ref("");
const nickname = ref("");

// 讀取 Cookie 的函數
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

// 處理登出邏輯
const handleLogout = async () => {
  try {
    tokenSignOut.value = getCookie("hexschoolTodo"); // 從 Cookie 中讀取 Token
    const response = await axios.post(
      "https://todolist-api.hexschool.io/users/sign_out",
      {},
      {
        headers: {
          Authorization: tokenSignOut.value,
        },
      }
    );
    console.log(response.data); // 顯示登出回應
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

// 在元件掛載後取得用戶暱稱
onMounted(() => {
  nickname.value = getCookie("nickname"); // 從 Cookie 中讀取暱稱
});
</script>

<template>
  <section class="container">
    <nav class="navbar">
      <img src="/src/assets/images/logo.webp" alt="網站 Logo" class="logo" />
      <ul class="user-name-and-logout">
        <li class="user-name">{{ nickname }}的代辦</li>
        <!-- 使用動態的暱稱 -->
        <li class="logout" @click="handleLogout">登出</li>
      </ul>
    </nav>
  </section>
</template>

<style scoped>
@import url("/src/assets/css/TodoNavStyle.css");
</style>
