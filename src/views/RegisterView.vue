<script setup>
import LogoAndDecoImage from "@/components/LogoAndDecoImage.vue";
import RegisterForm from "@/components/RegisterForm.vue";
</script>

<template>
  <section class="container">
    <LogoAndDecoImage />
    <RegisterForm />
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
    gap: 26px;
  }
}
</style>
