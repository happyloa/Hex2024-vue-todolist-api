<script setup>
// 匯入必要的 Vue、axios、Vue Router 套件
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import showAlert from "./showAlert.js"; // 匯入自定義的 showAlert 函數

// 初始化 Vue Router 來進行路由跳轉
const router = useRouter();

// 定義用來儲存 email 和 password 的 ref 變數
const email = ref("");
const password = ref("");

// 定義用來檢查 email 和 password 欄位錯誤狀態的 ref 變數
const emailError = ref(false);
const passwordError = ref(false);

// 設定 Cookie 的函數
const setCookie = (name, value, days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

// 處理 input 事件，根據欄位是否為空設定錯誤狀態
const handleInput = (field) => {
  if (field === "email") {
    emailError.value = !email.value;
  } else if (field === "password") {
    passwordError.value = !password.value;
  }
};

// 處理提交表單邏輯
const handleSubmit = async () => {
  // 驗證 email 和 password 欄位是否為空
  emailError.value = !email.value;
  passwordError.value = !password.value;

  // 如果沒有錯誤，則進行登入請求
  if (!emailError.value && !passwordError.value) {
    try {
      // 發送 POST 請求到登入端點
      const response = await axios.post(
        "https://todolist-api.hexschool.io/users/sign_in",
        {
          email: email.value,
          password: password.value,
        }
      );

      // 從登入回應中獲取 Token 與 nickname（暱稱），並保存到 Cookie 中，且顯示在 console 上
      const token = response.data.token;
      const nickname = response.data.nickname;

      // console.log("取得的 Token:", token);
      // console.log("取得的暱稱:", nickname);

      setCookie("hexschoolTodo", token, 1); // 將 Token 存入 cookie
      setCookie("nickname", nickname, 1); // 將暱稱存入 cookie

      // 登入成功顯示提示訊息並跳轉至 /todos
      showAlert(
        "登入成功！",
        "",
        "success",
        "水喔💯，帶我去待辦事項清單吧～"
      ).then(() => {
        router.push("/todos");
      });
    } catch (error) {
      // 處理錯誤並顯示錯誤訊息
      showAlert(
        "錯誤🥲",
        error.response?.data?.message || "登入失敗，請稍後再試",
        "error",
        "QQ好喔"
      );
    }
  }
};
</script>

<template>
  <!-- 登入表單模板 -->
  <form class="formControls" @submit.prevent="handleSubmit">
    <h2 class="formControls_txt">最實用的線上待辦事項服務</h2>
    <!-- Email 輸入框 -->
    <label class="formControls_label" for="email">Email</label>
    <input
      class="formControls_input"
      type="email"
      name="email"
      v-model="email"
      @input="handleInput('email')"
      placeholder="請輸入 email"
      required />
    <span v-if="emailError">此欄位不可留空</span>

    <!-- 密碼輸入框 -->
    <label class="formControls_label" for="password">密碼</label>
    <input
      class="formControls_input"
      type="password"
      name="password"
      v-model="password"
      @input="handleInput('password')"
      placeholder="請輸入密碼"
      required />
    <span v-if="passwordError">此欄位不可留空</span>

    <!-- 登入按鈕 -->
    <input
      class="formControls_btnSubmit"
      type="button"
      value="登入"
      @click="handleSubmit" />

    <!-- 跳轉到註冊帳號頁面 -->
    <RouterLink to="/register" class="formControls_btnLink link-underlined"
      >註冊帳號</RouterLink
    >
  </form>
</template>

<style scoped>
@import url("/src/assets/css/FormStyle.css");
</style>
