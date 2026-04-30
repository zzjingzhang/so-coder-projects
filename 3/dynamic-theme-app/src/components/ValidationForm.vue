<template>
  <el-card class="theme-transition">
    <template #header>
      <div class="flex items-center gap-2">
        <el-icon><Document /></el-icon>
        <span class="font-semibold">验证表单</span>
      </div>
    </template>
    
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入姓名"
          clearable
        />
      </el-form-item>
      
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="formData.email"
          placeholder="请输入邮箱"
          clearable
        />
      </el-form-item>
      
      <el-form-item label="项目" prop="project">
        <el-select
          v-model="formData.project"
          placeholder="请选择项目"
          style="width: 100%"
          clearable
        >
          <el-option label="网站开发" value="web" />
          <el-option label="移动应用" value="mobile" />
          <el-option label="桌面应用" value="desktop" />
          <el-option label="数据分析" value="data" />
        </el-select>
      </el-form-item>
      
      <el-form-item>
        <div class="flex flex-wrap gap-2">
          <el-button type="primary" @click="validateForm">
            <el-icon class="mr-1"><Check /></el-icon>
            验证
          </el-button>
          <el-button @click="resetForm">
            <el-icon class="mr-1"><RefreshRight /></el-icon>
            重置
          </el-button>
          <el-button @click="resetValidation">
            <el-icon class="mr-1"><CircleClose /></el-icon>
            重置验证
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, reactive } from 'vue'

const formRef = ref(null)

const formData = reactive({
  name: '',
  email: '',
  project: ''
})

const validateName = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入姓名'))
  } else if (value.length < 2) {
    callback(new Error('姓名至少2个字符'))
  } else {
    callback()
  }
}

const validateEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入邮箱'))
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      callback(new Error('请输入有效的邮箱地址'))
    } else {
      callback()
    }
  }
}

const rules = {
  name: [
    { required: true, validator: validateName, trigger: 'blur' }
  ],
  email: [
    { required: true, validator: validateEmail, trigger: 'blur' }
  ],
  project: [
    { required: true, message: '请选择项目', trigger: 'change' }
  ]
}

const validateForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('表单验证通过！')
    }
  })
}

const resetForm = () => {
  formRef.value.resetFields()
  ElMessage.info('表单已重置')
}

const resetValidation = () => {
  formRef.value.clearValidate()
  ElMessage.info('验证状态已重置')
}

import { ElMessage } from 'element-plus'
</script>
