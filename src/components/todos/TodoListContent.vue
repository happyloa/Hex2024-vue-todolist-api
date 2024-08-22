<script setup>
import TodoInput from "./TodoInput.vue";
</script>

<template>
  <main class="todoList_Content">
    <TodoInput />
  </main>
</template>

<style scoped>
.todoList_Content {
  max-width: 500px;
  margin: 0 auto;
}
</style>
