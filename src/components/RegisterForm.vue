<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <form class="formControls">
    <h2 class="formControls_txt">註冊帳號</h2>
    <label class="formControls_label" for="email">Email</label>
    <input
      class="formControls_input"
      type="email"
      name="email"
      placeholder="請輸入 email"
      required />
    <label class="formControls_label" for="nickname">您的暱稱</label>
    <input
      class="formControls_input"
      type="text"
      name="nickname"
      placeholder="請輸入您的暱稱"
      required />
    <label class="formControls_label" for="password">密碼</label>
    <input
      class="formControls_input"
      type="password"
      name="password"
      id="password"
      placeholder="請輸入密碼"
      required />
    <label class="formControls_label" for="check-password">再次輸入密碼</label>
    <input
      class="formControls_input"
      type="password"
      name="check-password"
      id="check-password"
      placeholder="請再次輸入密碼"
      required />
    <input class="formControls_btnSubmit" type="button" value="註冊帳號" />
    <RouterLink to="/" class="formControls_btnLink">登入</RouterLink>
  </form>
</template>

<style scoped>
@import url("/src/assets/css/RegisterFormStyle.css");
</style>
