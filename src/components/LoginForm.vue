<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();

const email = ref("");
const password = ref("");
const emailError = ref(false);
const passwordError = ref(false);

const handleInput = (field) => {
  if (field === "email") {
    emailError.value = !email.value;
  } else if (field === "password") {
    passwordError.value = !password.value;
  }
};

const handleSubmit = async () => {
  emailError.value = !email.value;
  passwordError.value = !password.value;

  if (!emailError.value && !passwordError.value) {
    try {
      const response = await axios.post(
        "https://todolist-api.hexschool.io/users/sign_in",
        {
          email: email.value,
          password: password.value,
        }
      );
      Swal.fire({
        title: "登入成功！",
        icon: "success",
        confirmButtonText: "水喔💯，帶我去待辦事項清單吧～",
      }).then(() => {
        router.push("/todos");
      });
    } catch (error) {
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
  <form class="formControls" @submit.prevent="handleSubmit">
    <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
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
    <input
      class="formControls_btnSubmit"
      type="button"
      value="登入"
      @click="handleSubmit" />
    <RouterLink to="/register" class="formControls_btnLink"
      >註冊帳號</RouterLink
    >
  </form>
</template>

<style scoped>
@import url("/src/assets/css/LoginFormStyle.css");
</style>
