<template>
  <Card 
    title="工作经验" 
    :bordered="false" 
    class="shadow-sm"
  >
    <template #extra>
      <Button type="primary" @click="addWorkExperience">
        <PlusOutlined class="mr-1" />
        添加工作经验
      </Button>
    </template>

    <Empty v-if="workExperienceList.length === 0" description="暂无工作经验，点击上方按钮添加" />
    
    <Collapse v-else v-model:activeKey="activeKeys">
      <CollapsePanel
        v-for="(item, index) in workExperienceList" :key="item.id"
        :header="getHeader(item, index)"
      >
        <Form :model="item" layout="vertical">
          <Row :gutter="16">
            <Col :span="24" :md="12">
              <FormItem label="公司名称">
                <Input v-model:value="item.company" placeholder="请输入公司名称" />
              </FormItem>
            </Col>
            <Col :span="24" :md="12">
              <FormItem label="职位">
                <Input v-model:value="item.position" placeholder="请输入职位名称" />
              </FormItem>
            </Col>
          </Row>

          <Row :gutter="16">
            <Col :span="24" :md="12">
              <FormItem label="工作时间">
                <div class="flex items-center gap-2">
                  <RangePicker
                    v-model:value="dateRanges[index]"
                    :picker="picker"
                    :placeholder="['开始时间', '结束时间']"
                    :style="{ width: '100%' }"
                    :disabled-date="item.current ? disabledEndDate : undefined"
                    @change="handleDateChange(index, $event)"
                  />
                  <Checkbox v-model:checked="item.current">至今</Checkbox>
                </div>
              </FormItem>
            </Col>
          </Row>

          <FormItem label="工作描述">
            <div class="relative">
              <TextArea
                v-model:value="item.description"
                :rows="4"
                placeholder="请描述您的工作内容、职责范围等..."
              />
              <div class="absolute right-2 bottom-2">
                <Button
                  type="primary"
                  size="small"
                  :loading="generating[index]"
                  :disabled="!item.description"
                  @click="generateAchievements(index, item)"
                >
                  <ExperimentOutlined class="mr-1" />
                  AI 生成要点
                </Button>
              </div>
            </div>
          </FormItem>

          <FormItem label="工作成就（量化要点）">
            <div v-if="item.achievements.length > 0" class="space-y-2">
              <div
                v-for="(achievement, aIndex) in item.achievements" :key="aIndex"
                class="flex items-center gap-2 p-2 rounded"
                :style="{ backgroundColor: 'var(--bg-color)' }"
              >
                <Input
                  v-model:value="item.achievements[aIndex]"
                  :style="{ flex: 1 }"
                />
                <Button danger size="small" @click="removeAchievement(item.id, aIndex)">
                  <DeleteOutlined />
                </Button>
              </div>
            </div>
            <Button type="dashed" block @click="addAchievement(item.id)">
              <PlusOutlined class="mr-1" />
              添加成就
            </Button>
          </FormItem>

          <div class="flex justify-end mt-4">
            <Button danger @click="removeWorkExperience(item.id)">
              <DeleteOutlined class="mr-1" />
              删除
            </Button>
          </div>
        </Form>
      </CollapsePanel>
    </Collapse>
  </Card>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import {
  Card,
  Button,
  Empty,
  Collapse,
  CollapsePanel,
  Form,
  FormItem,
  Input,
  DatePicker,
  Checkbox,
  Row,
  Col,
  message
} from 'ant-design-vue'
import { PlusOutlined, DeleteOutlined, ExperimentOutlined } from '@ant-design/icons-vue'
import type { WorkExperience } from '@/types'
import { useStore } from '@/store'
import { llmService } from '@/api/llm'
import dayjs, { type Dayjs } from 'dayjs'

const { addWorkExperience: addWorkExperienceStore, removeWorkExperience: removeWorkExperienceStore, updateWorkExperience, state, addToast, setLoading } = useStore()

const workExperienceList = ref<WorkExperience[]>([])
const activeKeys = ref<string[]>([])
const dateRanges = reactive<Record<number, [Dayjs | null, Dayjs | null]>>({})
const generating = reactive<Record<number, boolean>>({})
const TextArea = Input.TextArea
const RangePicker = DatePicker.RangePicker
const picker = 'month'

const addWorkExperience = () => {
  addWorkExperienceStore()
}

const removeWorkExperience = (id: string) => {
  removeWorkExperienceStore(id)
}

const addAchievement = (id: string) => {
  const index = workExperienceList.value.findIndex(w => w.id === id)
  if (index > -1) {
    workExperienceList.value[index].achievements.push('')
  }
}

const removeAchievement = (id: string, achievementIndex: number) => {
  const index = workExperienceList.value.findIndex(w => w.id === id)
  if (index > -1 && achievementIndex > -1) {
    workExperienceList.value[index].achievements.splice(achievementIndex, 1)
  }
}

const getHeader = (item: WorkExperience, index: number) => {
  const title = item.company || `工作经验 ${index + 1}`
  const subtitle = item.position ? ` - ${item.position}` : ''
  return `${title}${subtitle}`
}

const handleDateChange = (index: number, dates: [Dayjs | null, Dayjs | null] | null) => {
  if (dates && dates[0]) {
    const work = workExperienceList.value[index]
    if (work) {
      work.startDate = dates[0].format('YYYY-MM')
      if (dates[1] && !work.current) {
        work.endDate = dates[1].format('YYYY-MM')
      }
    }
  }
}

const disabledEndDate = (current: Dayjs) => {
  return current && current > dayjs().endOf('month')
}

const generateAchievements = async (index: number, item: WorkExperience) => {
  if (!item.description) {
    message.warning('请先填写工作描述')
    return
  }

  generating[index] = true
  setLoading(true)
  addToast('info', 'AI 正在生成量化要点，请稍候...')

  try {
    const result = await llmService.generateAchievements(
      item.company,
      item.position,
      item.description
    )

    if (result.achievements && result.achievements.length > 0) {
      workExperienceList.value[index].achievements = result.achievements
      addToast('success', 'AI 生成要点成功！')
    } else {
      addToast('warning', '未能生成有效要点，请尝试更详细的工作描述')
    }
  } catch (error) {
    console.error('Failed to generate achievements:', error)
    addToast('error', 'AI 生成失败，请稍后重试')
  } finally {
    generating[index] = false
    setLoading(false)
  }
}

watch(
  () => state.resumeData.workExperience,
  (newWorkExperience) => {
    workExperienceList.value = newWorkExperience
    
    newWorkExperience.forEach((item, index) => {
      if (item.startDate && item.endDate) {
        dateRanges[index] = [dayjs(item.startDate), dayjs(item.endDate)]
      } else if (item.startDate) {
        dateRanges[index] = [dayjs(item.startDate), null]
      }
    })
    
    if (newWorkExperience.length > 0 && activeKeys.value.length === 0) {
      activeKeys.value = [newWorkExperience[0].id]
    }
  },
  { immediate: true, deep: true }
)
</script>
