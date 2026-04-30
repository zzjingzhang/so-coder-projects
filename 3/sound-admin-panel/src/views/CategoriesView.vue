<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useCategoriesStore } from '@/stores/categories'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import type { Category } from '@/types'

const categoriesStore = useCategoriesStore()
const toast = useToast()
const confirm = useConfirm()

const imageInputRef = ref<HTMLInputElement | null>(null)

const dialogVisible = ref(false)
const isEditing = ref(false)

const selectedFile = ref<File | null>(null)
const imagePreview = ref<string | null>(null)

const form = reactive<Partial<Category>>({
  name: '',
  description: '',
  imageUrl: ''
})

const errors = reactive({
  name: '',
  description: ''
})

const isSubmitting = computed(() => categoriesStore.isLoading)

const validateForm = () => {
  let isValid = true
  
  if (!form.name?.trim()) {
    errors.name = '请输入类别名称'
    isValid = false
  } else {
    errors.name = ''
  }
  
  if (!form.description?.trim()) {
    errors.description = '请输入类别描述'
    isValid = false
  } else {
    errors.description = ''
  }
  
  return isValid
}

const openCreateDialog = () => {
  isEditing.value = false
  form.name = ''
  form.description = ''
  form.imageUrl = ''
  selectedFile.value = null
  imagePreview.value = null
  errors.name = ''
  errors.description = ''
  dialogVisible.value = true
}

const openEditDialog = (category: Category) => {
  isEditing.value = true
  form.id = category.id
  form.name = category.name
  form.description = category.description
  form.imageUrl = category.imageUrl
  imagePreview.value = category.imageUrl
  selectedFile.value = null
  errors.name = ''
  errors.description = ''
  dialogVisible.value = true
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    const file = input.files[0]
    if (file.type.startsWith('image/')) {
      selectedFile.value = file
      
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreview.value = e.target?.result as string
        form.imageUrl = e.target?.result as string
      }
      reader.readAsDataURL(file)
    } else {
      toast.show({
        severity: 'error',
        summary: '文件类型错误',
        detail: '请选择图片文件',
        life: 3000
      })
    }
  }
}

const handleImageUploadClick = () => {
  if (imageInputRef.value) {
    imageInputRef.value.click()
  }
}

const removeImage = () => {
  selectedFile.value = null
  imagePreview.value = null
  form.imageUrl = ''
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  if (!form.imageUrl) {
    form.imageUrl = 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop'
  }

  if (isEditing.value && form.id) {
    const result = await categoriesStore.updateCategory(form.id, {
      name: form.name!,
      description: form.description!,
      imageUrl: form.imageUrl
    })

    if (result.success) {
      toast.show({
        severity: 'success',
        summary: '更新成功',
        detail: result.message,
        life: 3000
      })
      dialogVisible.value = false
    } else {
      toast.show({
        severity: 'error',
        summary: '更新失败',
        detail: result.message,
        life: 5000
      })
    }
  } else {
    const result = await categoriesStore.createCategory({
      name: form.name!,
      description: form.description!,
      imageUrl: form.imageUrl
    })

    if (result.success) {
      toast.show({
        severity: 'success',
        summary: '创建成功',
        detail: result.message,
        life: 3000
      })
      dialogVisible.value = false
    } else {
      toast.show({
        severity: 'error',
        summary: '创建失败',
        detail: result.message,
        life: 5000
      })
    }
  }
}

const handleDelete = (category: Category) => {
  confirm.require({
    message: `确定要删除类别 "${category.name}" 吗？`,
    header: '确认删除',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: '删除',
    rejectLabel: '取消',
    acceptClass: 'p-button-danger',
    accept: async () => {
      const result = await categoriesStore.deleteCategory(category.id)
      if (result.success) {
        toast.show({
          severity: 'success',
          summary: '删除成功',
          detail: result.message,
          life: 3000
        })
      } else {
        toast.show({
          severity: 'error',
          summary: '删除失败',
          detail: result.message,
          life: 5000
        })
      }
    }
  })
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(async () => {
  if (categoriesStore.categories.length === 0) {
    await categoriesStore.fetchCategories()
  }
})
</script>

<template>
  <div class="space-y-6">
    <Card>
      <template #header>
        <div class="p-4 flex items-center justify-between">
          <div>
            <h3 class="font-semibold text-lg">类别管理</h3>
            <p class="text-sm opacity-70 mt-1">管理声音类别</p>
          </div>
          <Button 
            label="新建类别" 
            icon="pi pi-plus" 
            @click="openCreateDialog"
            style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none;"
          />
        </div>
      </template>

      <div v-if="categoriesStore.isLoading" class="space-y-3 p-4">
        <Skeleton height="2rem" class="mb-2" />
        <Skeleton height="5rem" />
        <Skeleton height="5rem" />
        <Skeleton height="5rem" />
      </div>

      <DataTable 
        v-else
        :value="categoriesStore.categories" 
        :paginator="true" 
        :rows="10"
        stripedRows
        responsiveLayout="scroll"
      >
        <Column field="name" header="类别名称" style="min-width: 18rem">
          <template #body="slotProps">
            <div class="flex items-center gap-3">
              <Avatar 
                :image="slotProps.data.imageUrl" 
                shape="circle"
                size="large"
              />
              <div>
                <p class="font-medium">{{ slotProps.data.name }}</p>
                <p class="text-sm opacity-70 truncate max-w-xs">{{ slotProps.data.description }}</p>
              </div>
            </div>
          </template>
        </Column>
        <Column field="soundCount" header="声音数量" style="min-width: 10rem">
          <template #body="slotProps">
            <Badge 
              :value="slotProps.data.soundCount" 
              :severity="slotProps.data.soundCount > 0 ? 'success' : 'secondary'"
            />
          </template>
        </Column>
        <Column field="createdAt" header="创建时间" style="min-width: 12rem">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.createdAt) }}
          </template>
        </Column>
        <Column field="updatedAt" header="更新时间" style="min-width: 12rem">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.updatedAt) }}
          </template>
        </Column>
        <Column header="操作" style="min-width: 12rem" :frozen="true" alignFrozen="right">
          <template #body="slotProps">
            <div class="flex gap-2">
              <Button 
                icon="pi pi-pencil" 
                text 
                rounded 
                severity="info"
                @click="openEditDialog(slotProps.data)"
                tooltip="编辑"
              />
              <Button 
                icon="pi pi-trash" 
                text 
                rounded 
                severity="danger"
                @click="handleDelete(slotProps.data)"
                :disabled="slotProps.data.soundCount > 0"
                tooltip="删除"
                :tooltipOptions="{ position: 'top' }"
              />
            </div>
          </template>
        </Column>
      </DataTable>

      <Message 
        v-if="categoriesStore.categories.length === 0 && !categoriesStore.isLoading"
        severity="info" 
        class="mt-4"
      >
        <div class="flex items-center gap-2">
          <i class="pi pi-info-circle"></i>
          <span>暂无类别数据，点击"新建类别"按钮添加</span>
        </div>
      </Message>
    </Card>

    <Dialog
      v-model:visible="dialogVisible"
      :header="isEditing ? '编辑类别' : '新建类别'"
      :modal="true"
      :closable="true"
      :closeOnEscape="true"
      :dismissableMask="true"
      :style="{ width: '500px' }"
    >
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div :class="{ 'field-error': errors.name }">
          <label class="block font-medium mb-2">
            类别名称
            <span class="text-red-500">*</span>
          </label>
          <InputText
            v-model="form.name"
            placeholder="请输入类别名称"
            class="w-full"
            :class="{ 'p-invalid': errors.name }"
          />
          <InlineMessage 
            v-if="errors.name" 
            severity="error" 
            class="mt-1"
          >
            {{ errors.name }}
          </InlineMessage>
        </div>

        <div :class="{ 'field-error': errors.description }">
          <label class="block font-medium mb-2">
            类别描述
            <span class="text-red-500">*</span>
          </label>
          <Textarea
            v-model="form.description"
            placeholder="请输入类别描述"
            class="w-full"
            :class="{ 'p-invalid': errors.description }"
            :rows="3"
          />
          <InlineMessage 
            v-if="errors.description" 
            severity="error" 
            class="mt-1"
          >
            {{ errors.description }}
          </InlineMessage>
        </div>

        <div>
          <label class="block font-medium mb-2">
            类别图片
          </label>
          
          <div 
            v-if="!imagePreview"
            class="file-upload-area cursor-pointer"
            @click="handleImageUploadClick"
          >
            <input 
              ref="imageInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileSelect"
            />
            <i class="pi pi-upload text-3xl opacity-50 mb-2"></i>
            <p class="opacity-70">点击或拖拽上传图片</p>
            <p class="text-sm opacity-50 mt-1">支持 JPG、PNG、GIF 格式</p>
          </div>

          <div 
            v-else 
            class="relative inline-block"
          >
            <img 
              :src="imagePreview" 
              alt="预览" 
              class="w-32 h-32 object-cover rounded-lg"
            />
            <Button
              icon="pi pi-times"
              text
              rounded
              severity="danger"
              class="absolute -top-2 -right-2 p-1"
              @click="removeImage"
            />
          </div>
        </div>
      </form>

      <template #footer>
        <div class="flex justify-end gap-2">
          <Button 
            label="取消" 
            icon="pi pi-times" 
            text 
            @click="dialogVisible = false"
          />
          <Button 
            :label="isEditing ? '保存' : '创建'" 
            icon="pi pi-check" 
            :loading="isSubmitting"
            @click="handleSubmit"
            style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none;"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>
