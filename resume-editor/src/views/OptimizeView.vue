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
        <h1 class="text-lg font-semibold" v-if="!state.isMobile">简历优化</h1>
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
        <div class="max-w-4xl mx-auto">
          <div class="mb-6">
            <h1 class="text-2xl font-bold mb-2">简历优化</h1>
            <p :style="{ color: 'var(--text-tertiary)' }">
              AI 将分析职位描述并为您的简历提供优化建议
            </p>
          </div>

          <Card class="mb-6 shadow-sm" :bordered="false">
            <Form :model="optimizeForm" layout="vertical">
              <FormItem label="目标职位描述">
                <TextArea
                  v-model:value="optimizeForm.jobDescription"
                  :rows="8"
                  placeholder="请粘贴目标职位的完整描述，包括职位要求、职责描述等信息..."
                  :show-count="true"
                  :maxlength="3000"
                />
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  size="large"
                  :loading="analyzing"
                  :disabled="!optimizeForm.jobDescription"
                  @click="analyzeResume"
                >
                  <ExperimentOutlined class="mr-2" />
                  开始分析
                </Button>
              </FormItem>
            </Form>
          </Card>

          <div v-if="optimizationResult" class="space-y-6">
            <Card title="缺失的关键词" class="shadow-sm" :bordered="false">
              <template #extra>
                <Button type="link" size="small" @click="addAllKeywords">
                  一键添加到技能
                </Button>
              </template>
              <div
                v-if="optimizationResult.missingKeywords.length > 0"
                class="flex flex-wrap gap-2"
              >
                <Tag
                  v-for="(keyword, index) in optimizationResult.missingKeywords"
                  :key="index"
                  closable
                  @close="removeKeyword(index)"
                  :style="{
                    backgroundColor: 'var(--tag-warning-bg)',
                    borderColor: 'var(--tag-warning-border)',
                    color: 'var(--tag-warning-text)',
                    cursor: 'pointer',
                  }"
                  @click="addKeywordToSkills(keyword)"
                >
                  <PlusOutlined class="mr-1" />
                  {{ keyword }}
                </Tag>
              </div>
              <Empty
                v-else
                description="暂未发现缺失的关键词"
                :image="Empty.PRESENTED_IMAGE_SIMPLE"
              />
            </Card>

            <Card title="推荐技能" class="shadow-sm" :bordered="false">
              <template #extra>
                <Button
                  type="link"
                  size="small"
                  @click="addAllRecommendedSkills"
                >
                  一键添加
                </Button>
              </template>
              <div
                v-if="optimizationResult.recommendedSkills.length > 0"
                class="flex flex-wrap gap-2"
              >
                <Tag
                  v-for="(skill, index) in optimizationResult.recommendedSkills"
                  :key="index"
                  closable
                  @close="removeRecommendedSkill(index)"
                  :style="{
                    backgroundColor: 'var(--tag-info-bg)',
                    borderColor: 'var(--tag-info-border)',
                    color: 'var(--tag-info-text)',
                    cursor: 'pointer',
                  }"
                  @click="addRecommendedSkill(skill)"
                >
                  <PlusOutlined class="mr-1" />
                  {{ skill }}
                </Tag>
              </div>
              <Empty
                v-else
                description="暂无推荐技能"
                :image="Empty.PRESENTED_IMAGE_SIMPLE"
              />
            </Card>

            <Card title="简历摘要建议" class="shadow-sm" :bordered="false">
              <template #extra>
                <Button
                  type="link"
                  size="small"
                  @click="applySummarySuggestion"
                >
                  一键写入简历
                </Button>
              </template>
              <List
                v-if="optimizationResult.summarySuggestions.length > 0"
                :data-source="optimizationResult.summarySuggestions"
              >
                <List.Item
                  v-for="(item, index) in optimizationResult.summarySuggestions"
                  :key="index"
                  class="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded px-2"
                  @click="selectSummary(index)"
                >
                  <List.Item.Meta
                    :avatar="summaryAvatars[index]"
                    :description="item"
                  />
                </List.Item>
              </List>
              <Empty
                v-else
                description="暂无摘要建议"
                :image="Empty.PRESENTED_IMAGE_SIMPLE"
              />
            </Card>

            <Card title="优化技巧" class="shadow-sm" :bordered="false">
              <Timeline v-if="optimizationResult.optimizationTips.length > 0">
                <TimelineItem
                  v-for="(tip, index) in optimizationResult.optimizationTips"
                  :key="index"
                >
                  <p class="text-sm">{{ tip }}</p>
                </TimelineItem>
              </Timeline>
              <Empty
                v-else
                description="暂无优化技巧"
                :image="Empty.PRESENTED_IMAGE_SIMPLE"
              />
            </Card>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h, onMounted } from "vue";
import {
  Card,
  Form,
  FormItem,
  Input,
  Button,
  Tag,
  Empty,
  List,
  Avatar,
  Timeline,
} from "ant-design-vue";
import {
  ExperimentOutlined,
  PlusOutlined,
  MenuOutlined,
} from "@ant-design/icons-vue";
import { llmService } from "@/api/llm";
import { useStore } from "@/store";
import Sidebar from "@/components/Sidebar.vue";
import type { OptimizationResult } from "@/types";

const {
  state,
  toggleSidebar,
  setIsMobile,
  addToast,
  setLoading,
  updatePersonalInfo,
  addSkillCategory,
  updateSkillCategory,
} = useStore();

const TextArea = Input.TextArea;
const TimelineItem = Timeline.Item;

const optimizeForm = ref({
  jobDescription: "",
});

const analyzing = ref(false);
const optimizationResult = ref<OptimizationResult | null>(null);

const summaryAvatars = computed(() => {
  if (!optimizationResult.value) return [];
  return optimizationResult.value.summarySuggestions.map((_, index) => {
    return h(
      Avatar,
      {
        size: 24,
        style: { backgroundColor: "#722ed1" },
      },
      { default: () => index + 1 },
    );
  });
});

const currentResumeText = computed(() => {
  const resume = state.resumeData;
  let text = `
个人信息:
- 姓名: ${resume.personalInfo.name || "未填写"}
- 简介: ${resume.personalInfo.summary || "未填写"}

教育经历:
${resume.education.map((edu) => `- ${edu.school} - ${edu.degree} ${edu.major}`).join("\n")}

工作经验:
${resume.workExperience
  .map(
    (work) => `
- ${work.company} - ${work.position}
  描述: ${work.description || ""}
  成就: ${work.achievements.join(", ") || ""}
`,
  )
  .join("")}

项目经历:
${resume.projects
  .map(
    (project) => `
- ${project.name} - ${project.role}
  技术栈: ${project.technologies.join(", ")}
`,
  )
  .join("")}

技能:
${resume.skills.map((skill) => `- ${skill.category}: ${skill.items.join(", ")}`).join("\n")}
  `.trim();
  return text;
});

const analyzeResume = async () => {
  if (!optimizeForm.value.jobDescription) {
    addToast("warning", "请先输入目标职位描述");
    return;
  }

  analyzing.value = true;
  setLoading(true);
  addToast("info", "AI 正在分析简历，请稍候...");

  try {
    const result = await llmService.optimizeResume(
      optimizeForm.value.jobDescription,
      currentResumeText.value,
    );

    optimizationResult.value = result;
    addToast("success", "分析完成！");
  } catch (error) {
    console.error("Failed to analyze resume:", error);
    addToast("error", "分析失败，请稍后重试");
  } finally {
    analyzing.value = false;
    setLoading(false);
  }
};

const addKeywordToSkills = (keyword: string) => {
  const skills = state.resumeData.skills;
  if (skills.length === 0) {
    addSkillCategory();
    updateSkillCategory(0, { category: "推荐技能", items: [keyword] });
  } else {
    const lastSkill = skills[skills.length - 1];
    if (!lastSkill.items.includes(keyword)) {
      updateSkillCategory(skills.length - 1, {
        items: [...lastSkill.items, keyword],
      });
    }
  }
  addToast("success", `已添加技能: ${keyword}`);
};

const removeKeyword = (index: number) => {
  if (optimizationResult.value) {
    optimizationResult.value.missingKeywords.splice(index, 1);
  }
};

const addAllKeywords = () => {
  if (optimizationResult.value) {
    optimizationResult.value.missingKeywords.forEach((keyword) => {
      addKeywordToSkills(keyword);
    });
  }
};

const addRecommendedSkill = (skill: string) => {
  addKeywordToSkills(skill);
};

const removeRecommendedSkill = (index: number) => {
  if (optimizationResult.value) {
    optimizationResult.value.recommendedSkills.splice(index, 1);
  }
};

const addAllRecommendedSkills = () => {
  if (optimizationResult.value) {
    optimizationResult.value.recommendedSkills.forEach((skill) => {
      addKeywordToSkills(skill);
    });
  }
};

const selectSummary = (index: number) => {
  if (optimizationResult.value) {
    const suggestion = optimizationResult.value.summarySuggestions[index];
    updatePersonalInfo({ summary: suggestion });
    addToast("success", "已选择该摘要建议");
  }
};

const applySummarySuggestion = () => {
  if (
    optimizationResult.value &&
    optimizationResult.value.summarySuggestions.length > 0
  ) {
    const combined = optimizationResult.value.summarySuggestions.join("\n\n");
    updatePersonalInfo({ summary: combined });
    addToast("success", "已将摘要建议写入简历");
  }
};

const handleResize = () => {
  setIsMobile(window.innerWidth < 768);
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});
</script>
