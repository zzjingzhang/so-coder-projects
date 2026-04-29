<template>
  <Card
    title="简历预览"
    :bordered="false"
    class="shadow-sm sticky top-4"
    :extra="extraSlot"
  >
    <template #extra>
      <Button @click="printResume">
        <PrinterOutlined class="mr-1" />
        打印
      </Button>
    </template>

    <div
      class="resume-preview p-8 min-h-96 rounded shadow-inner"
      ref="previewRef"
    >
      <div class="flex items-start gap-6 mb-6">
        <Avatar
          :size="80"
          :src="resumeData.personalInfo.avatar || undefined"
          :style="{
            backgroundColor: 'var(--preview-avatar-bg)',
            fontSize: '32px',
            flexShrink: 0,
          }"
        >
          {{
            resumeData.personalInfo.name
              ? resumeData.personalInfo.name.charAt(0)
              : "?"
          }}
        </Avatar>
        <div class="flex-1">
          <h1>{{ resumeData.personalInfo.name || "您的姓名" }}</h1>
          <div
            class="flex flex-wrap gap-3 mt-2 text-sm"
            :style="{ color: 'var(--preview-text-secondary)' }"
          >
            <span
              v-if="resumeData.personalInfo.email"
              class="flex items-center gap-1"
            >
              <MailOutlined />
              {{ resumeData.personalInfo.email }}
            </span>
            <span
              v-if="resumeData.personalInfo.phone"
              class="flex items-center gap-1"
            >
              <PhoneOutlined />
              {{ resumeData.personalInfo.phone }}
            </span>
            <span
              v-if="resumeData.personalInfo.location"
              class="flex items-center gap-1"
            >
              <EnvironmentOutlined />
              {{ resumeData.personalInfo.location }}
            </span>
          </div>
          <div
            class="flex flex-wrap gap-3 mt-1 text-sm"
            :style="{ color: 'var(--preview-text-secondary)' }"
          >
            <a
              v-if="resumeData.personalInfo.github"
              :href="resumeData.personalInfo.github"
              target="_blank"
              class="flex items-center gap-1 hover:underline"
            >
              <GithubOutlined />
              GitHub
            </a>
            <a
              v-if="resumeData.personalInfo.linkedin"
              :href="resumeData.personalInfo.linkedin"
              target="_blank"
              class="flex items-center gap-1 hover:underline"
            >
              <LinkedinOutlined />
              LinkedIn
            </a>
            <a
              v-if="resumeData.personalInfo.website"
              :href="resumeData.personalInfo.website"
              target="_blank"
              class="flex items-center gap-1 hover:underline"
            >
              <GlobalOutlined />
              个人网站
            </a>
          </div>
        </div>
      </div>

      <div v-if="resumeData.personalInfo.summary" class="mb-6">
        <h2>个人简介</h2>
        <p>{{ resumeData.personalInfo.summary }}</p>
      </div>

      <div v-if="resumeData.education.length > 0" class="mb-6">
        <h2>教育经历</h2>
        <div v-for="edu in resumeData.education" :key="edu.id" class="mb-4">
          <div class="flex justify-between items-start">
            <div>
              <h3>{{ edu.school || "学校名称" }}</h3>
              <p :style="{ color: 'var(--preview-text-secondary)' }">
                {{ edu.degree }} · {{ edu.major }}
              </p>
            </div>
            <span
              class="text-sm"
              :style="{ color: 'var(--preview-text-tertiary)' }"
            >
              {{ edu.startDate || "开始时间" }} -
              {{ edu.endDate || "结束时间" }}
            </span>
          </div>
          <p v-if="edu.description" class="mt-2">{{ edu.description }}</p>
        </div>
      </div>

      <div v-if="resumeData.workExperience.length > 0" class="mb-6">
        <h2>工作经验</h2>
        <div
          v-for="work in resumeData.workExperience"
          :key="work.id"
          class="mb-4"
        >
          <div class="flex justify-between items-start">
            <div>
              <h3>{{ work.company || "公司名称" }}</h3>
              <p :style="{ color: 'var(--preview-text-secondary)' }">
                {{ work.position || "职位" }}
              </p>
            </div>
            <span
              class="text-sm"
              :style="{ color: 'var(--preview-text-tertiary)' }"
            >
              {{ work.startDate || "开始时间" }} -
              {{ work.current ? "至今" : work.endDate || "结束时间" }}
            </span>
          </div>
          <p v-if="work.description" class="mt-2">{{ work.description }}</p>
          <ul v-if="work.achievements.length > 0" class="mt-2">
            <li v-for="(achievement, index) in work.achievements" :key="index">
              {{ achievement }}
            </li>
          </ul>
        </div>
      </div>

      <div v-if="resumeData.projects.length > 0" class="mb-6">
        <h2>项目经历</h2>
        <div
          v-for="project in resumeData.projects"
          :key="project.id"
          class="mb-4"
        >
          <div class="flex justify-between items-start">
            <div>
              <h3>
                {{ project.name || "项目名称" }}
                <a
                  v-if="project.link"
                  :href="project.link"
                  target="_blank"
                  class="ml-2 text-sm hover:underline"
                  :style="{ color: 'var(--preview-link-color)' }"
                >
                  <LinkOutlined />
                </a>
              </h3>
              <p :style="{ color: 'var(--preview-text-secondary)' }">
                {{ project.role || "角色" }}
              </p>
            </div>
            <span
              class="text-sm"
              :style="{ color: 'var(--preview-text-tertiary)' }"
            >
              {{ project.startDate || "开始时间" }} -
              {{ project.endDate || "结束时间" }}
            </span>
          </div>
          <p v-if="project.description" class="mt-2">
            {{ project.description }}
          </p>
          <div
            v-if="project.technologies.length > 0"
            class="mt-2 flex flex-wrap gap-2"
          >
            <Tag
              v-for="tech in project.technologies"
              :key="tech"
              :style="{
                backgroundColor: 'var(--preview-tag-info-bg)',
                borderColor: 'var(--preview-tag-info-border)',
                color: 'var(--preview-tag-info-text)',
              }"
            >
              {{ tech }}
            </Tag>
          </div>
        </div>
      </div>

      <div v-if="resumeData.skills.length > 0" class="mb-6">
        <h2>技能</h2>
        <div
          v-for="(skill, index) in resumeData.skills"
          :key="index"
          class="mb-3"
        >
          <p class="font-semibold mb-2">{{ skill.category || "技能分类" }}</p>
          <div class="flex flex-wrap gap-2">
            <Tag
              v-for="item in skill.items"
              :key="item"
              :style="{
                backgroundColor: 'var(--preview-tag-success-bg)',
                borderColor: 'var(--preview-tag-success-border)',
                color: 'var(--preview-tag-success-text)',
              }"
            >
              {{ item }}
            </Tag>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Card, Button, Avatar, Tag } from "ant-design-vue";
import {
  PrinterOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  GithubOutlined,
  LinkedinOutlined,
  GlobalOutlined,
  LinkOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "@/store";

const { state } = useStore();
const previewRef = ref<HTMLElement | null>(null);

const resumeData = computed(() => state.resumeData);

const printResume = () => {
  window.print();
};
</script>
