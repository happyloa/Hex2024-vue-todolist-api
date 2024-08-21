<script setup>
import { ref } from "vue";

const email = ref("");
const nickname = ref("");
const password = ref("");
const checkPassword = ref("");

const emailError = ref(false);
const nicknameError = ref(false);
const passwordError = ref(false);
const checkPasswordError = ref(false);

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
      break;
    case "checkPassword":
      checkPasswordError.value = !checkPassword.value;
      break;
  }
};

const handleSubmit = () => {
  emailError.value = !email.value;
  nicknameError.value = !nickname.value;
  passwordError.value = !password.value;
  checkPasswordError.value = !checkPassword.value;

  if (
    !emailError.value &&
    !nicknameError.value &&
    !passwordError.value &&
    !checkPasswordError.value
  ) {
    // 處理註冊邏輯
  }
};
</script>

<template>
  <form class="formControls" @submit.prevent="handleSubmit">
    <h2 class="formControls_txt">註冊帳號</h2>
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

    <label class="formControls_label" for="check-password">再次輸入密碼</label>
    <input
      class="formControls_input"
      type="password"
      name="check-password"
      v-model="checkPassword"
      @input="handleInput('checkPassword')"
      placeholder="請再次輸入密碼"
      required />
    <span v-if="checkPasswordError">此欄位不可留空</span>

    <input
      class="formControls_btnSubmit"
      type="button"
      value="註冊帳號"
      @click="handleSubmit" />
    <RouterLink to="/" class="formControls_btnLink">登入</RouterLink>
  </form>
</template>

<style scoped>
@import url("/src/assets/css/RegisterFormStyle.css");
</style>
