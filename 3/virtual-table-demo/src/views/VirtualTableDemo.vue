<template>
  <div class="virtual-table-demo">
    <v-row>
      <v-col cols="12">
        <v-card elevation="3" class="mb-6">
          <v-card-title class="text-h5 font-weight-bold d-flex align-center">
            <v-icon
              icon="mdi-information"
              color="primary"
              class="mr-2"
            ></v-icon>
            表格虚拟滚动演示
          </v-card-title>
          <v-card-text>
            <p class="text-body-1 mb-4">
              这是一个高性能的虚拟滚动表格组件，专为处理大数据量设计。支持<span
                class="text-primary font-weight-bold"
                >10万+行数据</span
              >的平滑滚动， 动态行高度，以及灵活的列配置。
            </p>
            <v-chip-group>
              <v-chip color="primary" variant="flat" class="ma-1">
                <v-icon icon="mdi-check-circle" class="mr-1"></v-icon>
                虚拟滚动
              </v-chip>
              <v-chip color="success" variant="flat" class="ma-1">
                <v-icon icon="mdi-check-circle" class="mr-1"></v-icon>
                动态高度
              </v-chip>
              <v-chip color="info" variant="flat" class="ma-1">
                <v-icon icon="mdi-check-circle" class="mr-1"></v-icon>
                平滑滚动
              </v-chip>
              <v-chip color="warning" variant="flat" class="ma-1">
                <v-icon icon="mdi-check-circle" class="mr-1"></v-icon>
                零卡顿
              </v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-card elevation="2" class="mb-4">
          <v-card-title class="text-subtitle-1 font-weight-bold">
            <v-icon icon="mdi-cog" class="mr-2"></v-icon>
            配置选项
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model.number="rowCount"
              label="数据行数"
              type="number"
              min="100"
              max="100000"
              step="100"
              variant="outlined"
              density="comfortable"
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model.number="containerHeight"
              label="容器高度 (px)"
              type="number"
              min="200"
              max="1000"
              step="50"
              variant="outlined"
              density="comfortable"
              class="mb-4"
            ></v-text-field>

            <v-slider
              v-model="bufferSize"
              label="缓冲行数"
              :min="1"
              :max="20"
              :step="1"
              thumb-label
              class="mb-4"
            ></v-slider>

            <v-switch
              v-model="showCode"
              label="显示代码预览"
              color="primary"
              hide-details
              class="mb-2"
            ></v-switch>

            <v-btn color="primary" block @click="generateData" class="mt-2">
              <v-icon icon="mdi-refresh" class="mr-2"></v-icon>
              重新生成数据
            </v-btn>
          </v-card-text>
        </v-card>

        <v-card elevation="2" class="mb-4">
          <v-card-title class="text-subtitle-1 font-weight-bold">
            <v-icon icon="mdi-chart-bar" class="mr-2"></v-icon>
            性能指标
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-body-2">数据量:</span>
              <span class="text-body-2 font-weight-bold"
                >{{ rowCount.toLocaleString() }} 行</span
              >
            </div>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-body-2">渲染行数:</span>
              <span class="text-body-2 font-weight-bold text-primary">{{
                visibleRowCount
              }}</span>
            </div>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-body-2">总高度:</span>
              <span class="text-body-2 font-weight-bold"
                >{{ totalHeight.toLocaleString() }} px</span
              >
            </div>
            <v-divider class="my-3"></v-divider>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-body-2">滚动位置:</span>
              <span class="text-body-2 font-weight-bold"
                >{{ scrollPosition }} px</span
              >
            </div>
            <div class="d-flex justify-space-between">
              <span class="text-body-2">FPS:</span>
              <span class="text-body-2 font-weight-bold" :class="fpsClass">{{
                currentFps
              }}</span>
            </div>
          </v-card-text>
        </v-card>

        <v-card elevation="2">
          <v-card-title class="text-subtitle-1 font-weight-bold">
            <v-icon icon="mdi-keyboard" class="mr-2"></v-icon>
            快捷操作
          </v-card-title>
          <v-card-text class="text-body-2">
            <div class="mb-2">• 使用鼠标滚轮快速滚动</div>
            <div class="mb-2">• 点击并拖动滚动条</div>
            <div>• 按下 Home/End 键跳转</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="9">
        <v-card elevation="2">
          <v-card-title
            class="text-subtitle-1 font-weight-bold d-flex align-center"
          >
            <v-icon icon="mdi-table" color="primary" class="mr-2"></v-icon>
            虚拟滚动表格
            <v-spacer></v-spacer>
            <v-chip size="small" color="primary" variant="flat">
              {{ rowCount.toLocaleString() }} 行数据
            </v-chip>
          </v-card-title>
          <v-card-text class="pa-0">
            <VirtualTable
              :columns="columns"
              :data="tableData"
              :row-height="50"
              :container-height="containerHeight"
              :buffer-size="bufferSize"
              ref="tableRef"
            />
          </v-card-text>
        </v-card>

        <v-expand-transition>
          <v-card v-if="showCode" elevation="2" class="mt-4">
            <v-card-title
              class="text-subtitle-1 font-weight-bold d-flex align-center"
            >
              <v-icon
                icon="mdi-code-tags"
                color="primary"
                class="mr-2"
              ></v-icon>
              组件使用示例
            </v-card-title>
            <v-card-text>
              <CodePreview :code="sampleCode" language="vue" />
            </v-card-text>
          </v-card>
        </v-expand-transition>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" :timeout="2000" color="success">
      <v-icon icon="mdi-check-circle" class="mr-2"></v-icon>
      数据已重新生成！
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import VirtualTable from "@/components/VirtualTable.vue";
import CodePreview from "@/components/CodePreview.vue";
import type { Column, TableRow } from "@/components/VirtualTable.vue";

const rowCount = ref(10000);
const containerHeight = ref(500);
const bufferSize = ref(5);
const showCode = ref(false);
const snackbar = ref(false);
const scrollPosition = ref(0);
const currentFps = ref(60);
const tableRef = ref<InstanceType<typeof VirtualTable> | null>(null);

const columns: Column[] = [
  { title: "ID", key: "id", width: 80 },
  { title: "姓名", key: "name", width: 150 },
  { title: "邮箱", key: "email", width: 220 },
  { title: "电话号码", key: "phone", width: 150 },
  { title: "地址", key: "address", width: 300 },
  { title: "城市", key: "city", width: 120 },
  { title: "国家", key: "country", width: 100 },
  { title: "公司", key: "company", width: 180 },
  { title: "职位", key: "position", width: 120 },
  { title: "入职日期", key: "hireDate", width: 120 },
];

const tableData = ref<TableRow[]>([]);

const firstNames = [
  "张",
  "李",
  "王",
  "刘",
  "陈",
  "杨",
  "黄",
  "赵",
  "周",
  "吴",
  "徐",
  "孙",
  "马",
  "朱",
  "胡",
  "郭",
  "何",
  "高",
  "林",
  "罗",
];
const lastNames = [
  "伟",
  "芳",
  "娜",
  "敏",
  "静",
  "丽",
  "强",
  "磊",
  "军",
  "洋",
  "勇",
  "艳",
  "杰",
  "涛",
  "明",
  "超",
  "秀英",
  "霞",
  "平",
  "刚",
];
const cities = [
  "北京",
  "上海",
  "深圳",
  "广州",
  "杭州",
  "成都",
  "南京",
  "武汉",
  "西安",
  "苏州",
];
const countries = ["中国"];
const companies = [
  "阿里巴巴",
  "腾讯",
  "字节跳动",
  "百度",
  "京东",
  "美团",
  "滴滴",
  "网易",
  "快手",
  "拼多多",
];
const positions = [
  "工程师",
  "经理",
  "总监",
  "主管",
  "分析师",
  "设计师",
  "运营",
  "产品经理",
];

const generateData = () => {
  const data: TableRow[] = [];
  for (let i = 0; i < rowCount.value; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    data.push({
      id: i + 1,
      name: firstName + lastName,
      email: `user${i + 1}@example.com`,
      phone: `138${Math.floor(Math.random() * 100000000)
        .toString()
        .padStart(8, "0")}`,
      address: `北京市朝阳区某街道${Math.floor(Math.random() * 1000) + 1}号`,
      city: cities[Math.floor(Math.random() * cities.length)],
      country: countries[0],
      company: companies[Math.floor(Math.random() * companies.length)],
      position: positions[Math.floor(Math.random() * positions.length)],
      hireDate: `${2020 + Math.floor(Math.random() * 5)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    });
  }
  tableData.value = data;
  snackbar.value = true;
};

const visibleRowCount = computed(() => {
  return Math.ceil(containerHeight.value / 50) + bufferSize.value * 2;
});

const totalHeight = computed(() => {
  return tableData.value.length * 50;
});

const fpsClass = computed(() => {
  if (currentFps.value >= 55) return "text-success";
  if (currentFps.value >= 30) return "text-warning";
  return "text-error";
});

let frameCount = 0;
let lastFpsUpdate = 0;

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  scrollPosition.value = Math.round(target.scrollTop);
};

const measureFps = () => {
  frameCount++;
  const currentTime = performance.now();
  const elapsed = currentTime - lastFpsUpdate;

  if (elapsed >= 1000) {
    currentFps.value = Math.round((frameCount * 1000) / elapsed);
    frameCount = 0;
    lastFpsUpdate = currentTime;
  }

  requestAnimationFrame(measureFps);
};

onMounted(() => {
  generateData();
  lastFpsUpdate = performance.now();
  measureFps();

  document.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  document.removeEventListener("scroll", handleScroll);
});

const sampleCode = `import { createApp } from 'vue'
import VirtualTable from './components/VirtualTable.vue'

const columns = [
  { title: 'ID', key: 'id', width: 80 },
  { title: '姓名', key: 'name', width: 150 },
  { title: '邮箱', key: 'email', width: 220 },
  { title: '电话号码', key: 'phone', width: 150 },
]

const tableData = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', phone: '13800000001' },
  { id: 2, name: '李四', email: 'lisi@example.com', phone: '13800000002' },
  // ... 更多数据
]

const App = {
  template: \`
    <VirtualTable
      :columns="columns"
      :data="tableData"
      :row-height="50"
      :container-height="400"
      :buffer-size="5"
    />
  \`,
  components: { VirtualTable }
}

createApp(App).mount('#app')`;
</script>

<style scoped>
.virtual-table-demo {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
