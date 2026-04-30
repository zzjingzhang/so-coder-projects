<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useSoundsStore } from '@/stores/sounds'
import { useCategoriesStore } from '@/stores/categories'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import type { Sound } from '@/types'

const soundsStore = useSoundsStore()
const categoriesStore = useCategoriesStore()
const toast = useToast()
const confirm = useConfirm()

const dialogVisible = ref(false)
const isEditing = ref(false)

const selectedFile = ref<File | null>(null)
const soundFileInputRef = ref<HTMLInputElement | null>(null)

const form = reactive<Partial<Sound>>({
  name: '',
  description: '',
  categoryId: '',
  fileUrl: '',
  duration: 0,
  format: 'MP3',
  size: 0,
  status: 'active'
})

const errors = reactive({
  name: '',
  description: '',
  categoryId: ''
})

const isSubmitting = computed(() => soundsStore.isLoading)

const validateForm = () => {
  let isValid = true
  
  if (!form.name?.trim()) {
    errors.name = '请输入声音名称'
    isValid = false
  } else {
    errors.name = ''
  }
  
  if (!form.description?.trim()) {
    errors.description = '请输入声音描述'
    isValid = false
  } else {
    errors.description = ''
  }
  
  if (!form.categoryId) {
    errors.categoryId = '请选择类别'
    isValid = false
  } else {
    errors.categoryId = ''
  }
  
  if (!isEditing.value && !selectedFile.value) {
    toast.show({
      severity: 'error',
      summary: '缺少文件',
      detail: '请选择MP3文件',
      life: 3000
    })
    isValid = false
  }
  
  return isValid
}

const openCreateDialog = () => {
  isEditing.value = false
  form.name = ''
  form.description = ''
  form.categoryId = ''
  form.fileUrl = ''
  form.duration = 0
  form.format = 'MP3'
  form.size = 0
  form.status = 'active'
  selectedFile.value = null
  errors.name = ''
  errors.description = ''
  errors.categoryId = ''
  dialogVisible.value = true
}

const openEditDialog = (sound: Sound) => {
  isEditing.value = true
  form.id = sound.id
  form.name = sound.name
  form.description = sound.description
  form.categoryId = sound.categoryId
  form.fileUrl = sound.fileUrl
  form.duration = sound.duration
  form.format = sound.format
  form.size = sound.size
  form.status = sound.status
  selectedFile.value = null
  errors.name = ''
  errors.description = ''
  errors.categoryId = ''
  dialogVisible.value = true
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    const file = input.files[0]
    if (file.type === 'audio/mpeg' || file.name.toLowerCase().endsWith('.mp3')) {
      selectedFile.value = file
      form.size = Math.round(file.size / 1024 / 1024 * 100) / 100
      form.fileUrl = `/sounds/${file.name}`
      
      const audio = new Audio()
      audio.onloadedmetadata = () => {
        form.duration = Math.round(audio.duration)
      }
      audio.src = URL.createObjectURL(file)
    } else {
      toast.show({
        severity: 'error',
        summary: '文件类型错误',
        detail: '请选择MP3文件',
        life: 3000
      })
    }
  }
}

const handleFileUploadClick = () => {
  if (soundFileInputRef.value) {
    soundFileInputRef.value.click()
  }
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  if (isEditing.value && form.id) {
    const result = await soundsStore.updateSound(form.id, {
      name: form.name!,
      description: form.description!,
      categoryId: form.categoryId!,
      fileUrl: form.fileUrl!,
      duration: form.duration!,
      format: form.format!,
      size: form.size!,
      status: form.status as 'active' | 'inactive'
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
    const result = await soundsStore.createSound({
      name: form.name!,
      description: form.description!,
      categoryId: form.categoryId!,
      fileUrl: form.fileUrl!,
      duration: form.duration!,
      format: form.format!,
      size: form.size!,
      status: form.status as 'active' | 'inactive'
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

const handleDelete = (sound: Sound) => {
  confirm.require({
    message: `确定要删除声音 "${sound.name}" 吗？`,
    header: '确认删除',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: '删除',
    rejectLabel: '取消',
    acceptClass: 'p-button-danger',
    accept: async () => {
      const result = await soundsStore.deleteSound(sound.id)
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

const handleToggleStatus = async (sound: Sound) => {
  const result = await soundsStore.toggleStatus(sound.id)
  if (result.success) {
    toast.show({
      severity: 'success',
      summary: '状态已更新',
      detail: result.message,
      life: 3000
    })
  }
}

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(async () => {
  if (categoriesStore.categories.length === 0) {
    await categoriesStore.fetchCategories()
  }
  if (soundsStore.sounds.length === 0) {
    await soundsStore.fetchSounds()
  }
})
</script>

<template>
  <div class="space-y-6">
    <Card>
      <template #header>
        <div class="p-4 flex items-center justify-between">
          <div>
            <h3 class="font-semibold text-lg">声音管理</h3>
            <p class="text-sm opacity-70 mt-1">管理声音文件</p>
          </div>
          <Button 
            label="新建声音" 
            icon="pi pi-plus" 
            @click="openCreateDialog"
            style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none;"
            :disabled="categoriesStore.totalCategories === 0"
          />
        </div>
      </template>

      <Message 
        v-if="categoriesStore.totalCategories === 0"
        severity="warn" 
        class="mb-4"
      >
        <div class="flex items-center gap-2">
          <i class="pi pi-exclamation-triangle"></i>
          <span>请先创建类别，然后才能添加声音</span>
        </div>
      </Message>

      <div v-if="soundsStore.isLoading" class="space-y-3 p-4">
        <Skeleton height="2rem" class="mb-2" />
        <Skeleton height="5rem" />
        <Skeleton height="5rem" />
        <Skeleton height="5rem" />
      </div>

      <DataTable 
        v-else
        :value="soundsStore.sounds" 
        :paginator="true" 
        :rows="10"
        stripedRows
        responsiveLayout="scroll"
      >
        <Column field="name" header="声音名称" style="min-width: 18rem">
          <template #body="slotProps">
            <div class="flex items-center gap-3">
              <Avatar 
                style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
                icon="pi pi-volume-up"
                shape="circle"
              />
              <div>
                <p class="font-medium">{{ slotProps.data.name }}</p>
                <p class="text-sm opacity-70 truncate max-w-xs">{{ slotProps.data.description }}</p>
              </div>
            </div>
          </template>
        </Column>
        <Column field="categoryName" header="类别" style="min-width: 10rem">
          <template #body="slotProps">
            <Tag :value="slotProps.data.categoryName" severity="secondary" />
          </template>
        </Column>
        <Column field="duration" header="时长" style="min-width: 8rem">
          <template #body="slotProps">
            <div class="flex items-center gap-1">
              <i class="pi pi-clock opacity-70"></i>
              <span>{{ formatDuration(slotProps.data.duration) }}</span>
            </div>
          </template>
        </Column>
        <Column field="size" header="大小" style="min-width: 8rem">
          <template #body="slotProps">
            {{ slotProps.data.size }} MB
          </template>
        </Column>
        <Column field="status" header="状态" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              :label="slotProps.data.status === 'active' ? '活跃' : '停用'"
              :severity="slotProps.data.status === 'active' ? 'success' : 'danger'"
              text
              size="small"
              @click="handleToggleStatus(slotProps.data)"
            />
          </template>
        </Column>
        <Column field="createdAt" header="创建时间" style="min-width: 12rem">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.createdAt) }}
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
                tooltip="删除"
                :tooltipOptions="{ position: 'top' }"
              />
            </div>
          </template>
        </Column>
      </DataTable>

      <Message 
        v-if="soundsStore.sounds.length === 0 && !soundsStore.isLoading"
        severity="info" 
        class="mt-4"
      >
        <div class="flex items-center gap-2">
          <i class="pi pi-info-circle"></i>
          <span>暂无声音数据，点击"新建声音"按钮添加</span>
        </div>
      </Message>
    </Card>

    <Dialog
      v-model:visible="dialogVisible"
      :header="isEditing ? '编辑声音' : '新建声音'"
      :modal="true"
      :closable="true"
      :closeOnEscape="true"
      :dismissableMask="true"
      :style="{ width: '600px' }"
    >
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div :class="{ 'field-error': errors.name }">
          <label class="block font-medium mb-2">
            声音名称
            <span class="text-red-500">*</span>
          </label>
          <InputText
            v-model="form.name"
            placeholder="请输入声音名称"
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
            声音描述
            <span class="text-red-500">*</span>
          </label>
          <Textarea
            v-model="form.description"
            placeholder="请输入声音描述"
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

        <div :class="{ 'field-error': errors.categoryId }">
          <label class="block font-medium mb-2">
            所属类别
            <span class="text-red-500">*</span>
          </label>
          <Dropdown
            v-model="form.categoryId"
            :options="categoriesStore.categoryOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="选择类别"
            class="w-full"
            :class="{ 'p-invalid': errors.categoryId }"
          />
          <InlineMessage 
            v-if="errors.categoryId" 
            severity="error" 
            class="mt-1"
          >
            {{ errors.categoryId }}
          </InlineMessage>
        </div>

        <div>
          <label class="block font-medium mb-2">
            声音文件
            <span v-if="!isEditing" class="text-red-500">*</span>
          </label>
          
          <div 
            v-if="!selectedFile && !form.fileUrl"
            class="file-upload-area cursor-pointer"
            @click="handleFileUploadClick"
          >
            <input 
              ref="soundFileInputRef"
              type="file"
              accept=".mp3,audio/mpeg"
              class="hidden"
              @change="handleFileSelect"
            />
            <i class="pi pi-music text-3xl opacity-50 mb-2"></i>
            <p class="opacity-70">点击或拖拽上传MP3文件</p>
            <p class="text-sm opacity-50 mt-1">支持 MP3 格式</p>
          </div>

          <div 
            v-else 
            class="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          >
            <Avatar 
              style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
              icon="pi pi-volume-up"
              class="w-12 h-12"
            />
            <div class="flex-1 min-w-0">
              <p class="font-medium truncate">
                {{ selectedFile?.name || form.fileUrl?.split('/').pop() }}
              </p>
              <div class="flex items-center gap-4 text-sm opacity-70">
                <span>{{ form.format }}</span>
                <span>{{ form.size }} MB</span>
                <span v-if="form.duration">{{ formatDuration(form.duration) }}</span>
              </div>
            </div>
            <Button
              icon="pi pi-times"
              text
              rounded
              severity="danger"
              @click="selectedFile = null"
            />
          </div>
        </div>

        <div>
          <label class="block font-medium mb-2">
            状态
          </label>
          <div class="flex items-center gap-3">
            <Checkbox 
              :modelValue="form.status === 'active'" 
              :binary="true"
              @update:modelValue="form.status = form.status === 'active' ? 'inactive' : 'active'"
              inputId="status"
            />
            <label for="status">{{ form.status === 'active' ? '活跃' : '停用' }}</label>
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
