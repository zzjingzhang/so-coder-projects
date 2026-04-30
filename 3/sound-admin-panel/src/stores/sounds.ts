import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Sound } from '@/types'
import { useCategoriesStore } from './categories'

const defaultSounds: Sound[] = [
  {
    id: '1',
    name: '雨声',
    description: '轻柔的雨声，适合冥想和专注',
    categoryId: '1',
    categoryName: '自然声音',
    fileUrl: '/sounds/rain.mp3',
    duration: 180,
    format: 'MP3',
    size: 2.5,
    status: 'active',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '2',
    name: '海浪',
    description: '海浪拍打沙滩的声音',
    categoryId: '1',
    categoryName: '自然声音',
    fileUrl: '/sounds/waves.mp3',
    duration: 240,
    format: 'MP3',
    size: 3.2,
    status: 'active',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: '3',
    name: '风声',
    description: '森林中的风声',
    categoryId: '1',
    categoryName: '自然声音',
    fileUrl: '/sounds/wind.mp3',
    duration: 150,
    format: 'MP3',
    size: 2.1,
    status: 'active',
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '4',
    name: '城市噪音',
    description: '城市街道的环境声音',
    categoryId: '2',
    categoryName: '环境噪音',
    fileUrl: '/sounds/city.mp3',
    duration: 200,
    format: 'MP3',
    size: 2.8,
    status: 'active',
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '5',
    name: '咖啡厅',
    description: '咖啡厅的背景噪音',
    categoryId: '2',
    categoryName: '环境噪音',
    fileUrl: '/sounds/cafe.mp3',
    duration: 300,
    format: 'MP3',
    size: 4.5,
    status: 'active',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '6',
    name: '古典钢琴曲',
    description: '优美的古典钢琴音乐',
    categoryId: '3',
    categoryName: '音乐',
    fileUrl: '/sounds/piano.mp3',
    duration: 360,
    format: 'MP3',
    size: 5.2,
    status: 'active',
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: '7',
    name: '爵士乐',
    description: '轻松的爵士乐片段',
    categoryId: '3',
    categoryName: '音乐',
    fileUrl: '/sounds/jazz.mp3',
    duration: 280,
    format: 'MP3',
    size: 4.1,
    status: 'active',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-23')
  },
  {
    id: '8',
    name: '电子音乐',
    description: '现代电子音乐节奏',
    categoryId: '3',
    categoryName: '音乐',
    fileUrl: '/sounds/electronic.mp3',
    duration: 220,
    format: 'MP3',
    size: 3.5,
    status: 'inactive',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-24')
  },
  {
    id: '9',
    name: '吉他独奏',
    description: '原声吉他演奏',
    categoryId: '3',
    categoryName: '音乐',
    fileUrl: '/sounds/guitar.mp3',
    duration: 240,
    format: 'MP3',
    size: 3.8,
    status: 'active',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '10',
    name: '小提琴曲',
    description: '优雅的小提琴音乐',
    categoryId: '3',
    categoryName: '音乐',
    fileUrl: '/sounds/violin.mp3',
    duration: 300,
    format: 'MP3',
    size: 4.5,
    status: 'active',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-26')
  }
]

export const useSoundsStore = defineStore('sounds', () => {
  const sounds = ref<Sound[]>([])
  const isLoading = ref(false)
  const selectedSound = ref<Sound | null>(null)

  const totalSounds = computed(() => sounds.value.length)
  const activeSounds = computed(() => sounds.value.filter(s => s.status === 'active').length)

  const soundsByCategory = computed(() => {
    const categoriesStore = useCategoriesStore()
    const result: { categoryId: string; categoryName: string; soundCount: number }[] = []
    
    categoriesStore.categories.forEach(category => {
      const count = sounds.value.filter(s => s.categoryId === category.id).length
      if (count > 0) {
        result.push({
          categoryId: category.id,
          categoryName: category.name,
          soundCount: count
        })
      }
    })
    
    return result
  })

  const fetchSounds = async () => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      const saved = localStorage.getItem('sounds')
      if (saved) {
        sounds.value = JSON.parse(saved).map((s: Sound) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          updatedAt: new Date(s.updatedAt)
        }))
      } else {
        sounds.value = [...defaultSounds]
        saveToLocalStorage()
      }
    } catch (error) {
      console.error('获取声音失败:', error)
    } finally {
      isLoading.value = false
    }
  }

  const getSoundById = (id: string) => {
    return sounds.value.find(s => s.id === id)
  }

  const createSound = async (sound: Omit<Sound, 'id' | 'categoryName' | 'createdAt' | 'updatedAt'>) => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const categoriesStore = useCategoriesStore()
      const categoryName = categoriesStore.getCategoryName(sound.categoryId)
      
      const newSound: Sound = {
        ...sound,
        id: Date.now().toString(),
        categoryName,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      sounds.value.push(newSound)
      
      categoriesStore.updateSoundCount(sound.categoryId, 1)
      
      saveToLocalStorage()
      return { success: true, message: '声音创建成功' }
    } catch (error) {
      return { success: false, message: '创建声音失败' }
    } finally {
      isLoading.value = false
    }
  }

  const updateSound = async (id: string, updates: Partial<Omit<Sound, 'id' | 'createdAt'>>) => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const index = sounds.value.findIndex(s => s.id === id)
      if (index !== -1) {
        const oldSound = sounds.value[index]
        
        if (updates.categoryId && updates.categoryId !== oldSound.categoryId) {
          const categoriesStore = useCategoriesStore()
          categoriesStore.updateSoundCount(oldSound.categoryId, -1)
          categoriesStore.updateSoundCount(updates.categoryId, 1)
          updates.categoryName = categoriesStore.getCategoryName(updates.categoryId)
        }
        
        sounds.value[index] = {
          ...oldSound,
          ...updates,
          updatedAt: new Date()
        }
        saveToLocalStorage()
        return { success: true, message: '声音更新成功' }
      }
      return { success: false, message: '声音不存在' }
    } catch (error) {
      return { success: false, message: '更新声音失败' }
    } finally {
      isLoading.value = false
    }
  }

  const deleteSound = async (id: string) => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const sound = getSoundById(id)
      if (sound) {
        const categoriesStore = useCategoriesStore()
        categoriesStore.updateSoundCount(sound.categoryId, -1)
      }
      
      const index = sounds.value.findIndex(s => s.id === id)
      if (index !== -1) {
        sounds.value.splice(index, 1)
        saveToLocalStorage()
        return { success: true, message: '声音删除成功' }
      }
      return { success: false, message: '声音不存在' }
    } catch (error) {
      return { success: false, message: '删除声音失败' }
    } finally {
      isLoading.value = false
    }
  }

  const toggleStatus = async (id: string) => {
    const sound = getSoundById(id)
    if (sound) {
      return updateSound(id, {
        status: sound.status === 'active' ? 'inactive' : 'active'
      })
    }
    return { success: false, message: '声音不存在' }
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('sounds', JSON.stringify(sounds.value))
  }

  return {
    sounds,
    isLoading,
    selectedSound,
    totalSounds,
    activeSounds,
    soundsByCategory,
    fetchSounds,
    getSoundById,
    createSound,
    updateSound,
    deleteSound,
    toggleStatus
  }
})
