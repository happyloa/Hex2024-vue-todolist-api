<template>
  <section class="container">
    <nav class="navbar">
      <img src="/src/assets/images/logo.webp" alt="網站 Logo" class="logo" />
      <ul class="user-name-and-logout">
        <li class="user-name">王小明的代辦</li>
        <li class="logout">登出</li>
      </ul>
    </nav>
  </section>
</template>

<style scoped>
.container {
  background-image: linear-gradient(175deg, #ffd370 60%, #fff 40%);
  height: 100vh;
  padding: 16px 34px 0;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  width: 240px;
}

.user-name-and-logout {
  display: flex;
  gap: 24px;
}

.user-name-and-logout .user-name {
  font-weight: 700;
}

.user-name-and-logout .logout {
  cursor: pointer;
}

@media (max-width: 576px) {
  .container {
    background-color: #ffd370;
    background-image: none;
    padding: 16px 32px 36px;
  }

  .user-name-and-logout .user-name {
    display: none;
  }

  .user-name-and-logout .logout {
    font-size: 14px;
  }
}
</style>
