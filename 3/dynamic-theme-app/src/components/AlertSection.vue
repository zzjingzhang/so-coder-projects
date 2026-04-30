<template>
  <el-card class="theme-transition h-full">
    <template #header>
      <div class="flex items-center gap-2">
        <el-icon><Bell /></el-icon>
        <span class="font-semibold">警报提示</span>
      </div>
    </template>
    
    <div class="space-y-4">
      <el-alert
        title="警告提示"
        type="warning"
        :closable="true"
        show-icon
      >
        <template #default>
          这是一个警告信息，请注意查看详情。
        </template>
      </el-alert>
      
      <el-alert
        title="信息提示"
        type="info"
        :closable="true"
        show-icon
      >
        <template #default>
          这是一条普通的信息提示，用于展示一般性内容。
        </template>
      </el-alert>
      
      <el-alert
        title="成功提示"
        type="success"
        :closable="true"
        show-icon
      >
        <template #default>
          操作已成功完成！您的更改已保存。
        </template>
      </el-alert>
      
      <el-alert
        title="错误提示"
        type="error"
        :closable="true"
        show-icon
      >
        <template #default>
          发生了错误，请检查您的输入并重试。
        </template>
      </el-alert>
    </div>
  </el-card>
</template>

<script setup>
</script>
