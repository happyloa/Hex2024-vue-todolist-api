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
.formControls {
  display: flex;
  flex-direction: column;
}

.formControls_txt {
  align-self: flex-start;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 24px;
}

.formControls_label {
  font-size: 0.875rem;
  font-weight: bold;
  margin: 16px 0 4px 0;
}

.formControls_input {
  font-weight: normal;
  border: none;
  border-radius: 10px;
  width: 304px;
  padding: 12px 16px;
  margin: 4px 0;
  transition: all 0.3s ease-in-out;
}

.formControls_input:focus {
  outline: 3px solid #fff;
}

.formControls span {
  margin: 4px 0 16px 0;
  color: #d87355;
  font-size: 0.875rem;
}

.formControls_btnSubmit {
  align-self: center;
  border-radius: 10px;
  background: #333333;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  padding: 12px 48px;
  margin: 24px 0;
}

.formControls_btnLink {
  color: #333333;
  font-weight: bold;
  text-align: center;
}

@media (max-width: 576px) {
  .formControls_txt {
    align-self: center;
  }
}
</style>
