<template>
  <div class="app-container">
    <el-container>
      <el-header class="app-header">
        <h1 class="app-title">🚿 管道连接益智游戏</h1>
        <p class="app-subtitle">连接管道，将水从喷泉引导到池塘</p>
      </el-header>
      <el-main class="app-main">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-container {
  width: 100%;
  min-height: 100vh;
}

.app-header {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.app-title {
  font-size: 2rem;
  color: #409eff;
  margin: 0 0 10px 0;
  font-weight: bold;
  white-space: nowrap;
  overflow: visible;
  text-overflow: clip;
  width: 100%;
  text-align: center;
}

.app-subtitle {
  font-size: 1rem;
  color: #666;
  margin: 0;
}

.app-main {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

@media (max-width: 768px) {
  .app-title {
    font-size: 1.5rem;
    white-space: normal;
  }

  .app-header {
    padding: 15px 10px;
  }
}

@media (max-width: 480px) {
  .app-title {
    font-size: 1.2rem;
  }
}
</style>
