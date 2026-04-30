<template>
  <div class="h-screen flex flex-col">
    <header class="bg-white border-b px-6 py-3 flex items-center justify-between">
      <h1 class="text-xl font-bold">可视化表单构建器</h1>
      <div class="flex gap-3">
        <router-link to="/" class="px-4 py-2 rounded hover:bg-gray-100">编辑</router-link>
        <router-link to="/preview" class="px-4 py-2 rounded hover:bg-gray-100">预览</router-link>
      </div>
    </header>
    <div class="flex-1 overflow-hidden">
      <slot />
    </div>
  </div>
</template>
