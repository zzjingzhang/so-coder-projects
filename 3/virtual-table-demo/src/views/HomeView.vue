<template>
  <div class="home-view">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card elevation="4" class="mb-8">
          <v-card-title class="text-h4 font-weight-bold text-center pa-8">
            <v-icon icon="mdi-table-large" size="x-large" color="primary" class="mr-4"></v-icon>
            虚拟滚动表格演示项目
          </v-card-title>
          <v-card-text class="text-center px-8 pb-8">
            <p class="text-body-1 mb-4">
              欢迎使用高性能虚拟滚动表格演示项目。本项目展示了如何在 Vue 3 中实现支持大数据量的表格组件，
              即使在 10万+ 行数据的情况下也能保持流畅滚动。
            </p>
            <v-btn color="primary" size="large" to="/demo">
              <v-icon icon="mdi-play-circle" class="mr-2"></v-icon>
              开始演示
            </v-btn>
          </v-card-text>
        </v-card>

        <v-row>
          <v-col cols="12" md="4">
            <v-card elevation="2" class="text-center h-100">
              <v-card-title class="justify-center">
                <v-icon icon="mdi-rocket-launch" size="large" color="primary"></v-icon>
              </v-card-title>
              <v-card-title class="text-h6 font-weight-bold">高性能</v-card-title>
              <v-card-text>
                虚拟滚动技术确保只渲染可见区域的 DOM 元素，支持 10万+ 行数据流畅滚动。
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card elevation="2" class="text-center h-100">
              <v-card-title class="justify-center">
                <v-icon icon="mdi-axis-arrow" size="large" color="success"></v-icon>
              </v-card-title>
              <v-card-title class="text-h6 font-weight-bold">动态高度</v-card-title>
              <v-card-text>
                支持不同行高的动态内容，自动测量并缓存行高，确保滚动平滑无跳动。
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card elevation="2" class="text-center h-100">
              <v-card-title class="justify-center">
                <v-icon icon="mdi-cog-outline" size="large" color="info"></v-icon>
              </v-card-title>
              <v-card-title class="text-h6 font-weight-bold">可配置</v-card-title>
              <v-card-text>
                灵活的配置选项：自定义行高、容器高度、缓冲区大小，满足各种场景需求。
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-card elevation="2" class="mt-8">
          <v-card-title class="text-h6 font-weight-bold">
            <v-icon icon="mdi-lightbulb-on" color="warning" class="mr-2"></v-icon>
            技术特性
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item prepend-avatar>
                <template #prepend>
                  <v-icon icon="mdi-check-circle" color="success"></v-icon>
                </template>
                <v-list-item-title>Vue 3 Composition API</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-avatar>
                <template #prepend>
                  <v-icon icon="mdi-check-circle" color="success"></v-icon>
                </template>
                <v-list-item-title>TypeScript 类型支持</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-avatar>
                <template #prepend>
                  <v-icon icon="mdi-check-circle" color="success"></v-icon>
                </template>
                <v-list-item-title>Vuetify 3 组件库</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-avatar>
                <template #prepend>
                  <v-icon icon="mdi-check-circle" color="success"></v-icon>
                </template>
                <v-list-item-title>Tailwind CSS 样式</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-avatar>
                <template #prepend>
                  <v-icon icon="mdi-check-circle" color="success"></v-icon>
                </template>
                <v-list-item-title>Vue Router 路由</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-avatar>
                <template #prepend>
                  <v-icon icon="mdi-check-circle" color="success"></v-icon>
                </template>
                <v-list-item-title>Vite 构建工具</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home-view {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
