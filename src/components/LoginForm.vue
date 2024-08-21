<script setup>
// 匯入必要的 Vue、axios、Vue Router 和 SweetAlert2 模組
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

// 初始化 Vue Router 來進行路由跳轉
const router = useRouter();

// 定義用來儲存 email 和 password 的 ref 變數
const email = ref("");
const password = ref("");

// 定義用來檢查 email 和 password 欄位錯誤狀態的 ref 變數
const emailError = ref(false);
const passwordError = ref(false);

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
      // 登入成功顯示提示訊息並跳轉至 /todos
      Swal.fire({
        title: "登入成功！",
        icon: "success",
        confirmButtonText: "水喔💯，帶我去待辦事項清單吧～",
      }).then(() => {
        router.push("/todos");
      });
    } catch (error) {
      // 處理錯誤並顯示錯誤訊息
      const errorMessage =
        error.response?.data?.message || "登入失敗，請稍後再試";
      Swal.fire({
        title: "錯誤🥲",
        icon: "error",
        text: errorMessage,
        confirmButtonText: "QQ好喔",
      });
    }
  }
};
</script>

<template>
  <!-- 登入表單模板 -->
  <form class="formControls" @submit.prevent="handleSubmit">
    <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
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
    <RouterLink to="/register" class="formControls_btnLink"
      >註冊帳號</RouterLink
    >
  </form>
</template>

<style scoped>
@import url("/src/assets/css/LoginFormStyle.css");
</style>
