<template>
  <Card title="个人信息" :bordered="false" class="shadow-sm">
    <Form :model="formData" layout="vertical">
      <Row :gutter="16">
        <Col :span="24" :md="16">
          <FormItem label="姓名">
            <Input v-model:value="formData.name" placeholder="请输入姓名" />
          </FormItem>
        </Col>
        <Col :span="24" :md="8">
          <FormItem label="头像">
            <div class="flex items-center gap-4">
              <Avatar
                :size="64"
                :src="formData.avatar || undefined"
                :style="{ backgroundColor: 'var(--primary-color)', fontSize: '24px' }"
              >
                {{ formData.name ? formData.name.charAt(0) : '?' }}
              </Avatar>
              <Upload
                :show-upload-list="false"
                :before-upload="handleBeforeUpload"
                :custom-request="handleCustomUpload"
              >
                <Button type="primary" :loading="uploading">
                  <UploadOutlined class="mr-1" />
                  上传头像
                </Button>
              </Upload>
            </div>
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="16">
        <Col :span="24" :md="12">
          <FormItem label="邮箱">
            <Input v-model:value="formData.email" placeholder="请输入邮箱" type="email" />
          </FormItem>
        </Col>
        <Col :span="24" :md="12">
          <FormItem label="电话">
            <Input v-model:value="formData.phone" placeholder="请输入电话" />
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="16">
        <Col :span="24" :md="8">
          <FormItem label="所在城市">
            <Input v-model:value="formData.location" placeholder="请输入所在城市" />
          </FormItem>
        </Col>
        <Col :span="24" :md="8">
          <FormItem label="GitHub">
            <Input v-model:value="formData.github" placeholder="https://github.com/username" />
          </FormItem>
        </Col>
        <Col :span="24" :md="8">
          <FormItem label="LinkedIn">
            <Input v-model:value="formData.linkedin" placeholder="https://linkedin.com/in/username" />
          </FormItem>
        </Col>
      </Row>

      <FormItem label="个人网站">
        <Input v-model:value="formData.website" placeholder="https://your-website.com" />
      </FormItem>

      <FormItem label="个人简介">
        <TextArea
          v-model:value="formData.summary"
          :rows="4"
          placeholder="请简要介绍您的职业背景、核心优势和职业目标..."
          :show-count="true"
          :maxlength="500"
        />
      </FormItem>
    </Form>
  </Card>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import {
  Card,
  Form,
  FormItem,
  Input,
  Button,
  Upload,
  Avatar,
  Row,
  Col
} from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import type { PersonalInfo } from '@/types'
import { useStore } from '@/store'
import { apiClient } from '@/api/client'

const { updatePersonalInfo, addToast, setLoading } = useStore()

const uploading = ref(false)

const formData = ref<PersonalInfo>({
  name: '',
  email: '',
  phone: '',
  avatar: '',
  location: '',
  github: '',
  linkedin: '',
  website: '',
  summary: ''
})

const TextArea = Input.TextArea

const handleBeforeUpload = (file: File) => {
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    addToast('error', '只能上传图片文件！')
    return false
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    addToast('error', '图片大小不能超过 2MB！')
    return false
  }
  return true
}

const handleCustomUpload = async (options: any) => {
  const { file } = options
  uploading.value = true
  setLoading(true)

  try {
    const url = await apiClient.uploadFile(file, (progress) => {
      console.log('Upload progress:', progress)
    })
    
    formData.value.avatar = url
    addToast('success', '头像上传成功！')
  } catch (error) {
    console.error('Upload failed:', error)
    addToast('error', '头像上传失败，请稍后重试')
  } finally {
    uploading.value = false
    setLoading(false)
  }
}

watch(
  () => formData.value,
  (newData) => {
    updatePersonalInfo(newData)
  },
  { deep: true }
)
</script>
