<script setup>
import TodoInput from "./TodoInput.vue";
import TodoListItem from "./TodoListItem.vue";
import TodoNoItem from "./TodoNoItem.vue";
</script>

<template>
  <main class="todoList_Content">
    <TodoInput />
    <TodoListItem />
    <TodoNoItem />
  </main>
</template>

<style scoped>
.todoList_Content {
  max-width: 500px;
  margin: 0 auto;
}
</style>
