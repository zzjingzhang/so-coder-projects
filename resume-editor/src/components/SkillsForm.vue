<template>
  <Card 
    title="技能" 
    :bordered="false" 
    class="shadow-sm"
  >
    <template #extra>
      <Button type="primary" @click="addSkillCategory">
        <PlusOutlined class="mr-1" />
        添加技能分类
      </Button>
    </template>

    <Empty v-if="skillsList.length === 0" description="暂无技能分类，点击上方按钮添加" />
    
    <div v-else class="space-y-4">
      <div
        v-for="(skillCategory, index) in skillsList" :key="index"
        class="p-4 rounded-lg border"
        :style="{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }"
      >
        <div class="flex items-center justify-between mb-4">
          <Input
            v-model:value="skillCategory.category"
            placeholder="技能分类名称（如：前端开发、后端开发、工具等）"
            :style="{ width: '60%' }"
          />
          <Button danger size="small" @click="removeSkillCategory(index)">
            <DeleteOutlined class="mr-1" />
            删除分类
          </Button>
        </div>

        <FormItem label="技能列表">
          <Select
            v-model:value="skillCategory.items"
            mode="tags"
            placeholder="请输入技能名称，按回车或逗号分隔添加"
            :style="{ width: '100%' }"
            :tokenSeparators="[',', ' ']"
          >
            <SelectOption v-for="skill in commonSkills" :key="skill" :value="skill">
              {{ skill }}
            </SelectOption>
          </Select>
        </FormItem>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Card,
  Button,
  Empty,
  FormItem,
  Input,
  Select,
  SelectOption
} from 'ant-design-vue'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import type { Skill } from '@/types'
import { useStore } from '@/store'

const { addSkillCategory: addSkillCategoryStore, removeSkillCategory: removeSkillCategoryStore, updateSkillCategory, state } = useStore()

const skillsList = ref<Skill[]>([])

const commonSkills = {
  frontend: [
    'Vue.js', 'React', 'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3',
    'Tailwind CSS', 'SCSS', 'Less', 'Webpack', 'Vite', 'Next.js', 'Nuxt.js',
    'Element UI', 'Ant Design', 'Bootstrap', 'jQuery', 'Axios'
  ],
  backend: [
    'Node.js', 'Express', 'Python', 'Django', 'Flask', 'FastAPI',
    'Java', 'Spring Boot', 'Go', 'Gin', 'Rust', 'Actix-web',
    'C#', '.NET Core', 'PHP', 'Laravel', 'Ruby', 'Rails'
  ],
  database: [
    'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite',
    'Oracle', 'SQL Server', 'Elasticsearch', 'Cassandra', 'MariaDB'
  ],
  devops: [
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Linux',
    'Nginx', 'Apache', 'CI/CD', 'Jenkins', 'GitHub Actions',
    'GitLab CI', 'Terraform', 'Ansible', 'Prometheus', 'Grafana'
  ],
  tools: [
    'Git', 'GitHub', 'GitLab', 'VS Code', 'IntelliJ IDEA',
    'Postman', 'Figma', 'Jira', 'Confluence', 'Slack',
    'Notion', 'Trello', 'Asana', 'Agile', 'Scrum', 'Kanban'
  ],
  other: [
    'RESTful API', 'GraphQL', 'WebSocket', 'TCP/IP', 'HTTP/HTTPS',
    'OAuth', 'JWT', 'OAuth2.0', 'Single Sign-On', '微服务架构',
    '设计模式', '数据结构', '算法', '单元测试', '集成测试'
  ]
}

const allCommonSkills = [...new Set([
  ...commonSkills.frontend,
  ...commonSkills.backend,
  ...commonSkills.database,
  ...commonSkills.devops,
  ...commonSkills.tools,
  ...commonSkills.other
])]

const addSkillCategory = () => {
  addSkillCategoryStore()
}

const removeSkillCategory = (index: number) => {
  removeSkillCategoryStore(index)
}

watch(
  () => state.resumeData.skills,
  (newSkills) => {
    skillsList.value = newSkills
  },
  { immediate: true, deep: true }
)
</script>
