<template>
  <Card 
    title="项目经历" 
    :bordered="false" 
    class="shadow-sm"
  >
    <template #extra>
      <Button type="primary" @click="addProject">
        <PlusOutlined class="mr-1" />
        添加项目经历
      </Button>
    </template>

    <Empty v-if="projectsList.length === 0" description="暂无项目经历，点击上方按钮添加" />
    
    <Collapse v-else v-model:activeKey="activeKeys">
      <CollapsePanel
        v-for="(item, index) in projectsList" :key="item.id"
        :header="getHeader(item, index)"
      >
        <Form :model="item" layout="vertical">
          <Row :gutter="16">
            <Col :span="24" :md="12">
              <FormItem label="项目名称">
                <Input v-model:value="item.name" placeholder="请输入项目名称" />
              </FormItem>
            </Col>
            <Col :span="24" :md="12">
              <FormItem label="担任角色">
                <Input v-model:value="item.role" placeholder="请输入您在项目中的角色" />
              </FormItem>
            </Col>
          </Row>

          <Row :gutter="16">
            <Col :span="24" :md="12">
              <FormItem label="项目时间">
                <RangePicker
                  v-model:value="dateRanges[index]"
                  :picker="picker"
                  :placeholder="['开始时间', '结束时间']"
                  :style="{ width: '100%' }"
                  @change="handleDateChange(index, $event)"
                />
              </FormItem>
            </Col>
            <Col :span="24" :md="12">
              <FormItem label="项目链接">
                <Input v-model:value="item.link" placeholder="https://github.com/your-project">
                  <template #prefix>
                    <LinkOutlined />
                  </template>
                </Input>
              </FormItem>
            </Col>
          </Row>

          <FormItem label="项目描述">
            <TextArea
              v-model:value="item.description"
              :rows="4"
              placeholder="请描述项目的背景、目标、您的主要贡献和成果..."
            />
          </FormItem>

          <FormItem label="使用技术栈">
            <Select
              v-model:value="item.technologies"
              mode="tags"
              placeholder="请输入或选择使用的技术栈"
              :style="{ width: '100%' }"
              :tokenSeparators="[',', ' ']"
            >
              <SelectOption v-for="tech in commonTechnologies" :key="tech" :value="tech">
                {{ tech }}
              </SelectOption>
            </Select>
          </FormItem>

          <div class="flex justify-end mt-4">
            <Button danger @click="removeProject(item.id)">
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
import { PlusOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons-vue'
import type { Project } from '@/types'
import { useStore } from '@/store'
import dayjs, { type Dayjs } from 'dayjs'

const { addProject: addProjectStore, removeProject: removeProjectStore, state } = useStore()

const projectsList = ref<Project[]>([])
const activeKeys = ref<string[]>([])
const dateRanges = reactive<Record<number, [Dayjs | null, Dayjs | null]>>({})
const TextArea = Input.TextArea
const RangePicker = DatePicker.RangePicker
const picker = 'month'

const commonTechnologies = [
  'Vue.js', 'React', 'Angular', 'TypeScript', 'JavaScript', 'Node.js',
  'Python', 'Java', 'Go', 'Rust', 'C++', 'C#',
  'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
  'Git', 'CI/CD', 'RESTful API', 'GraphQL', 'WebSocket'
]

const addProject = () => {
  addProjectStore()
}

const removeProject = (id: string) => {
  removeProjectStore(id)
}

const getHeader = (item: Project, index: number) => {
  const title = item.name || `项目经历 ${index + 1}`
  const subtitle = item.role ? ` - ${item.role}` : ''
  return `${title}${subtitle}`
}

const handleDateChange = (index: number, dates: [Dayjs | null, Dayjs | null] | null) => {
  if (dates && dates[0] && dates[1]) {
    const project = projectsList.value[index]
    if (project) {
      project.startDate = dates[0].format('YYYY-MM')
      project.endDate = dates[1].format('YYYY-MM')
    }
  }
}

watch(
  () => state.resumeData.projects,
  (newProjects) => {
    projectsList.value = newProjects
    
    newProjects.forEach((item, index) => {
      if (item.startDate && item.endDate) {
        dateRanges[index] = [dayjs(item.startDate), dayjs(item.endDate)]
      }
    })
    
    if (newProjects.length > 0 && activeKeys.value.length === 0) {
      activeKeys.value = [newProjects[0].id]
    }
  },
  { immediate: true, deep: true }
)
</script>
