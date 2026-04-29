<template>
  <Card 
    title="教育经历" 
    :bordered="false" 
    class="shadow-sm"
    :extra="extraSlot"
  >
    <template #extra>
      <Button type="primary" @click="addEducation">
        <PlusOutlined class="mr-1" />
        添加教育经历
      </Button>
    </template>

    <Empty v-if="educationList.length === 0" description="暂无教育经历，点击上方按钮添加" />
    
    <Collapse v-else v-model:activeKey="activeKeys">
      <CollapsePanel
        v-for="(item, index) in educationList" :key="item.id"
        :header="getHeader(item, index)"
      >
        <Form :model="item" layout="vertical">
          <Row :gutter="16">
            <Col :span="24" :md="12">
              <FormItem label="学校名称">
                <Input v-model:value="item.school" placeholder="请输入学校名称" />
              </FormItem>
            </Col>
            <Col :span="24" :md="12">
              <FormItem label="学位">
                <Select v-model:value="item.degree" placeholder="请选择学位" :style="{ width: '100%' }">
                  <SelectOption value="高中">高中</SelectOption>
                  <SelectOption value="大专">大专</SelectOption>
                  <SelectOption value="本科">本科</SelectOption>
                  <SelectOption value="硕士">硕士</SelectOption>
                  <SelectOption value="博士">博士</SelectOption>
                </Select>
              </FormItem>
            </Col>
          </Row>

          <Row :gutter="16">
            <Col :span="24" :md="12">
              <FormItem label="专业">
                <Input v-model:value="item.major" placeholder="请输入专业名称" />
              </FormItem>
            </Col>
            <Col :span="24" :md="12">
              <FormItem label="就读时间">
                <RangePicker
                  v-model:value="dateRanges[index]"
                  :picker="picker"
                  :placeholder="['开始时间', '结束时间']"
                  :style="{ width: '100%' }"
                  @change="handleDateChange(index, $event)"
                />
              </FormItem>
            </Col>
          </Row>

          <FormItem label="在校经历/成绩">
            <TextArea
              v-model:value="item.description"
              :rows="3"
              placeholder="请描述您的在校经历、成绩、获奖情况等..."
            />
          </FormItem>

          <div class="flex justify-end mt-4">
            <Button danger @click="removeEducation(item.id)">
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
  Select,
  SelectOption,
  DatePicker,
  Row,
  Col
} from 'ant-design-vue'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import type { Education } from '@/types'
import { useStore } from '@/store'
import dayjs, { type Dayjs } from 'dayjs'

const { addEducation: addEducationStore, removeEducation: removeEducationStore, state } = useStore()

const educationList = ref<Education[]>([])
const activeKeys = ref<string[]>([])
const dateRanges = reactive<Record<number, [Dayjs | null, Dayjs | null]>>({})
const TextArea = Input.TextArea
const RangePicker = DatePicker.RangePicker
const picker = 'month'

const addEducation = () => {
  addEducationStore()
}

const removeEducation = (id: string) => {
  removeEducationStore(id)
}

const getHeader = (item: Education, index: number) => {
  const title = item.school || `教育经历 ${index + 1}`
  const subtitle = item.degree ? ` - ${item.degree}` : ''
  return `${title}${subtitle}`
}

const handleDateChange = (index: number, dates: [Dayjs | null, Dayjs | null] | null) => {
  if (dates && dates[0] && dates[1]) {
    const education = educationList.value[index]
    if (education) {
      education.startDate = dates[0].format('YYYY-MM')
      education.endDate = dates[1].format('YYYY-MM')
    }
  }
}

watch(
  () => state.resumeData.education,
  (newEducation) => {
    educationList.value = newEducation
    
    newEducation.forEach((item, index) => {
      if (item.startDate && item.endDate) {
        dateRanges[index] = [dayjs(item.startDate), dayjs(item.endDate)]
      }
    })
    
    if (newEducation.length > 0 && activeKeys.value.length === 0) {
      activeKeys.value = [newEducation[0].id]
    }
  },
  { immediate: true, deep: true }
)
</script>
