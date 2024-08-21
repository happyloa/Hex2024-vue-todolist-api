<script setup>
// 匯入必要的 Vue、axios、Vue Router 和 SweetAlert2 模組
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

// 初始化 Vue Router 來進行路由跳轉
const router = useRouter();

// 定義用來儲存 email、nickname、password 和 checkPassword 的 ref 變數
const email = ref("");
const nickname = ref("");
const password = ref("");
const checkPassword = ref("");

// 定義用來檢查各欄位錯誤狀態的 ref 變數
const emailError = ref(false);
const nicknameError = ref(false);
const passwordError = ref(false);
const checkPasswordError = ref("");

// 處理 input 事件，根據欄位是否為空或不一致設定錯誤狀態
const handleInput = (field) => {
  switch (field) {
    case "email":
      emailError.value = !email.value;
      break;
    case "nickname":
      nicknameError.value = !nickname.value;
      break;
    case "password":
      passwordError.value = !password.value;
      checkPasswordError.value =
        checkPassword.value && checkPassword.value !== password.value
          ? "與輸入的密碼不符合"
          : !checkPassword.value
          ? "此欄位不可留空"
          : "";
      break;
    case "checkPassword":
      checkPasswordError.value = !checkPassword.value
        ? "此欄位不可留空"
        : checkPassword.value !== password.value
        ? "與輸入的密碼不符合"
        : "";
      break;
  }
};

// 處理提交表單邏輯
const handleSubmit = async () => {
  // 驗證各欄位是否為空或不一致
  emailError.value = !email.value;
  nicknameError.value = !nickname.value;
  passwordError.value = !password.value;
  checkPasswordError.value = !checkPassword.value
    ? "此欄位不可留空" // 如果 `checkPassword` 為空，顯示「此欄位不可留空」
    : checkPassword.value !== password.value
    ? "與輸入的密碼不符合" // 如果 `checkPassword` 與 `password` 不一致，顯示「與輸入的密碼不符合」
    : ""; // 如果 `checkPassword` 填寫且與 `password` 一致，則錯誤訊息為空

  // 如果沒有錯誤，則進行註冊請求
  if (
    !emailError.value &&
    !nicknameError.value &&
    !passwordError.value &&
    !checkPasswordError.value
  ) {
    try {
      // 發送 POST 請求到註冊端點
      const response = await axios.post(
        "https://todolist-api.hexschool.io/users/sign_up",
        {
          email: email.value,
          password: password.value,
          nickname: nickname.value,
        }
      );
      // 註冊成功顯示提示訊息並跳轉至登入頁面
      Swal.fire({
        title: "恭喜您完成註冊😁",
        icon: "success",
        confirmButtonText: "Ya～帶我去登入畫面",
      }).then(() => {
        router.push("/");
      });
    } catch (error) {
      // 處理錯誤並顯示錯誤訊息
      Swal.fire({
        title: "註冊失敗😭😭",
        icon: "error",
        text: error.response?.data?.message || error.message,
        confirmButtonText: "我真的會謝",
      });
    }
  }
};
</script>

<template>
  <!-- 註冊表單模板 -->
  <form class="formControls" @submit.prevent="handleSubmit">
    <h2 class="formControls_txt">註冊帳號</h2>

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

    <!-- 暱稱輸入框 -->
    <label class="formControls_label" for="nickname">您的暱稱</label>
    <input
      class="formControls_input"
      type="text"
      name="nickname"
      v-model="nickname"
      @input="handleInput('nickname')"
      placeholder="請輸入您的暱稱"
      required />
    <span v-if="nicknameError">此欄位不可留空</span>

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

    <!-- 再次輸入密碼框 -->
    <label class="formControls_label" for="check-password">再次輸入密碼</label>
    <input
      class="formControls_input"
      type="password"
      name="check-password"
      v-model="checkPassword"
      @input="handleInput('checkPassword')"
      placeholder="請再次輸入密碼"
      required />
    <span v-if="checkPasswordError">{{ checkPasswordError }}</span>

    <!-- 註冊按鈕 -->
    <input
      class="formControls_btnSubmit"
      type="button"
      value="註冊帳號"
      @click="handleSubmit" />

    <!-- 跳轉到登入頁面 -->
    <RouterLink to="/" class="formControls_btnLink">登入</RouterLink>
  </form>
</template>

<style scoped>
@import url("/src/assets/css/FormStyle.css");
</style>
