import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Category } from '@/types'

const defaultCategories: Category[] = [
  {
    id: '1',
    name: '自然声音',
    description: '来自大自然的声音，如雨、风、海浪等',
    imageUrl: 'https://images.unsplash.com/photo-1518173946687-a4c06b1353a0?w=200&h=200&fit=crop',
    soundCount: 3,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: '环境噪音',
    description: '城市和环境中的声音',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=200&h=200&fit=crop',
    soundCount: 2,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: '音乐',
    description: '各种风格的音乐片段',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop',
    soundCount: 5,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '4',
    name: '音效',
    description: '游戏和应用程序使用的音效',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop',
    soundCount: 0,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-25')
  }
]

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const isLoading = ref(false)
  const selectedCategory = ref<Category | null>(null)

  const totalCategories = computed(() => categories.value.length)

  const categoriesWithSounds = computed(() => {
    return categories.value.filter(c => c.soundCount > 0)
  })

  const categoryOptions = computed(() => {
    return categories.value.map(c => ({ label: c.name, value: c.id }))
  })

  const fetchCategories = async () => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      const saved = localStorage.getItem('categories')
      if (saved) {
        categories.value = JSON.parse(saved).map((c: Category) => ({
          ...c,
          createdAt: new Date(c.createdAt),
          updatedAt: new Date(c.updatedAt)
        }))
      } else {
        categories.value = [...defaultCategories]
        saveToLocalStorage()
      }
    } catch (error) {
      console.error('获取类别失败:', error)
    } finally {
      isLoading.value = false
    }
  }

  const getCategoryById = (id: string) => {
    return categories.value.find(c => c.id === id)
  }

  const getCategoryName = (id: string) => {
    return getCategoryById(id)?.name || '未知类别'
  }

  const createCategory = async (category: Omit<Category, 'id' | 'soundCount' | 'createdAt' | 'updatedAt'>) => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const newCategory: Category = {
        ...category,
        id: Date.now().toString(),
        soundCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      categories.value.push(newCategory)
      saveToLocalStorage()
      return { success: true, message: '类别创建成功' }
    } catch (error) {
      return { success: false, message: '创建类别失败' }
    } finally {
      isLoading.value = false
    }
  }

  const updateCategory = async (id: string, updates: Partial<Omit<Category, 'id' | 'createdAt'>>) => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const index = categories.value.findIndex(c => c.id === id)
      if (index !== -1) {
        categories.value[index] = {
          ...categories.value[index],
          ...updates,
          updatedAt: new Date()
        }
        saveToLocalStorage()
        return { success: true, message: '类别更新成功' }
      }
      return { success: false, message: '类别不存在' }
    } catch (error) {
      return { success: false, message: '更新类别失败' }
    } finally {
      isLoading.value = false
    }
  }

  const deleteCategory = async (id: string) => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const category = getCategoryById(id)
      if (category && category.soundCount > 0) {
        return { success: false, message: '该类别下还有声音，无法删除' }
      }
      const index = categories.value.findIndex(c => c.id === id)
      if (index !== -1) {
        categories.value.splice(index, 1)
        saveToLocalStorage()
        return { success: true, message: '类别删除成功' }
      }
      return { success: false, message: '类别不存在' }
    } catch (error) {
      return { success: false, message: '删除类别失败' }
    } finally {
      isLoading.value = false
    }
  }

  const updateSoundCount = (categoryId: string, delta: number) => {
    const category = getCategoryById(categoryId)
    if (category) {
      category.soundCount = Math.max(0, category.soundCount + delta)
      saveToLocalStorage()
    }
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('categories', JSON.stringify(categories.value))
  }

  return {
    categories,
    isLoading,
    selectedCategory,
    totalCategories,
    categoriesWithSounds,
    categoryOptions,
    fetchCategories,
    getCategoryById,
    getCategoryName,
    createCategory,
    updateCategory,
    deleteCategory,
    updateSoundCount
  }
})
