<template>
  <div class="todoList_list">
    <ul class="todoList_tab">
      <li><a href="#" class="active">全部</a></li>
      <li><a href="#">待完成</a></li>
      <li><a href="#">已完成</a></li>
    </ul>
    <div class="todoList_items">
      <ul class="todoList_item">
        <li>
          <label class="todoList_label">
            <input class="todoList_input" type="checkbox" value="true" />
            <span>把冰箱發霉的檸檬拿去丟</span>
          </label>
          <img src="/src/assets/icons/delete.svg" />
        </li>
      </ul>
      <div class="todoList_statistics">
        <p>1 個已完成項目</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("/src/assets/css/TodoListItemStyle.css");
</style>
