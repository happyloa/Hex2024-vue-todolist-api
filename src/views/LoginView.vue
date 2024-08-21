<script setup>
import LogoAndDecoImage from "@/components/LogoAndDecoImage.vue";
import LoginForm from "@/components/LoginForm.vue";
</script>

<template>
  <section class="container">
    <LogoAndDecoImage />
    <LoginForm />
  </section>
</template>

<style scoped>
.container {
  background-color: #ffd370;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 106px;
  height: 100vh;
  padding: 0 30px;
}

@media (max-width: 576px) {
  .container {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
