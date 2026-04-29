<template>
  <div class="flex flex-col h-full">
    <header
      class="no-print h-14 px-4 flex items-center justify-between border-b transition-all duration-300"
      :style="{
        borderColor: 'var(--border-color)',
        backgroundColor: 'var(--card-bg)',
        marginLeft: state.isMobile
          ? '0'
          : state.sidebarCollapsed
            ? '64px'
            : '256px',
      }"
    >
      <div class="flex items-center gap-4">
        <button
          v-if="state.isMobile"
          @click="toggleSidebar"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <MenuOutlined class="text-lg" />
        </button>
        <h1 class="text-lg font-semibold" v-if="!state.isMobile">
          在线简历编辑器
        </h1>
      </div>
      <div class="flex items-center gap-2">
        <Button type="dashed" @click="resetResume" :loading="state.loading">
          <ReloadOutlined class="mr-1" />
          重置
        </Button>
        <Button type="primary" @click="exportResume" :loading="state.loading">
          <DownloadOutlined class="mr-1" />
          导出
        </Button>
      </div>
    </header>

    <div class="flex-1 flex overflow-hidden">
      <Sidebar class="no-print" />

      <main
        :class="[
          'flex-1 overflow-auto transition-all duration-300',
          'p-4 md:p-6',
        ]"
        :style="{
          marginLeft: state.isMobile
            ? '0'
            : state.sidebarCollapsed
              ? '64px'
              : '256px',
        }"
      >
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-col lg:flex-row gap-6">
            <div class="flex-1 space-y-6">
              <Tabs v-model:activeKey="activeTab" @change="handleTabChange">
                <TabPane key="personal" tab="个人信息">
                  <PersonalInfoForm />
                </TabPane>
                <TabPane key="education" tab="教育经历">
                  <EducationForm />
                </TabPane>
                <TabPane key="experience" tab="工作经验">
                  <WorkExperienceForm />
                </TabPane>
                <TabPane key="projects" tab="项目经历">
                  <ProjectsForm />
                </TabPane>
                <TabPane key="skills" tab="技能">
                  <SkillsForm />
                </TabPane>
              </Tabs>
            </div>

            <div class="w-full lg:w-1/2 xl:w-2/5">
              <ResumePreview />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Button, Tabs } from "ant-design-vue";
import {
  MenuOutlined,
  ReloadOutlined,
  DownloadOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "@/store";
import Sidebar from "@/components/Sidebar.vue";
import PersonalInfoForm from "@/components/PersonalInfoForm.vue";
import EducationForm from "@/components/EducationForm.vue";
import WorkExperienceForm from "@/components/WorkExperienceForm.vue";
import ProjectsForm from "@/components/ProjectsForm.vue";
import SkillsForm from "@/components/SkillsForm.vue";
import ResumePreview from "@/components/ResumePreview.vue";

const { state, toggleSidebar, resetResumeData, setIsMobile, addToast } =
  useStore();
const route = useRoute();
const router = useRouter();

const TabPane = Tabs.TabPane;
const activeTab = ref("personal");

const handleTabChange = (key: string) => {
  if (key === "personal") {
    router.push({ path: "/", query: {} });
  } else {
    router.push({ path: "/", query: { tab: key } });
  }
};

const resetResume = () => {
  resetResumeData();
  addToast("success", "简历数据已重置");
};

const exportResume = () => {
  const resumeData = state.resumeData;
  const dataStr = JSON.stringify(resumeData, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `resume-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  addToast("success", "简历已导出");
};

const handleResize = () => {
  setIsMobile(window.innerWidth < 768);
};

const handleKeydown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "b") {
    e.preventDefault();
    toggleSidebar();
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
  window.addEventListener("keydown", handleKeydown);

  const tab = route.query.tab;
  if (tab && typeof tab === "string") {
    activeTab.value = tab;
  }
});

watch(
  () => route.query.tab,
  (newTab) => {
    if (newTab && typeof newTab === "string") {
      activeTab.value = newTab;
    } else {
      activeTab.value = "personal";
    }
  },
);
</script>
