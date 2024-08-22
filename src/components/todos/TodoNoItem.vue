<template>
  <div class="no-item">
    <h2>目前尚無待辦事項</h2>
    <img src="/src/assets/images/empty-deco.webp" />
  </div>
</template>

<style scoped>
.no-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin: 44px 0 0;
}

.no-item h2 {
  color: #333333;
  font-size: 24px;
  font-weight: 700;
}

.no-item img {
  max-width: 240px;
}
</style>
