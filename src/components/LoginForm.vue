<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <form class="formControls">
    <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
    <label class="formControls_label" for="email">Email</label>
    <input
      class="formControls_input"
      type="email"
      name="email"
      placeholder="請輸入 email"
      required />
    <span>此欄位不可留空</span>
    <label class="formControls_label" for="password">密碼</label>
    <input
      class="formControls_input"
      type="password"
      name="password"
      id="password"
      placeholder="請輸入密碼"
      required />
    <input class="formControls_btnSubmit" type="button" value="登入" />
    <RouterLink to="/register" class="formControls_btnLink"
      >註冊帳號</RouterLink
    >
  </form>
</template>

<style scoped>
@import url("/src/assets/css/LoginFormStyle.css");
</style>
