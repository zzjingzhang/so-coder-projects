<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <header class="header-gradient py-6 px-8 shadow-lg">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"
            >
              <span class="text-2xl">🌍</span>
            </div>
            <div>
              <h1 class="text-3xl font-bold tracking-tight">
                气候变化数据仪表盘
              </h1>
              <p class="text-blue-100 mt-1">
                实时监控全球温度、降水量与二氧化碳浓度变化
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right">
              <p class="text-sm text-blue-100">最后更新</p>
              <p class="text-white font-medium">{{ currentTime }}</p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          class="stats-card fade-in"
          style="background: linear-gradient(135deg, #ef4444 0%, #f97316 100%)"
        >
          <div class="flex items-center justify-center gap-3 mb-3">
            <span class="text-3xl">🌡️</span>
            <span class="text-lg font-medium">平均温度</span>
          </div>
          <div class="stats-card-value">{{ currentTemperature }}°C</div>
          <div class="text-sm opacity-90">
            较上月 {{ temperatureChange > 0 ? "+" : ""
            }}{{ temperatureChange }}°C
          </div>
        </div>

        <div
          class="stats-card fade-in"
          style="
            background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
            animation-delay: 0.1s;
          "
        >
          <div class="flex items-center justify-center gap-3 mb-3">
            <span class="text-3xl">💧</span>
            <span class="text-lg font-medium">年降水量</span>
          </div>
          <div class="stats-card-value">{{ currentPrecipitation }}mm</div>
          <div class="text-sm opacity-90">
            较上年 {{ precipitationChange > 0 ? "+" : ""
            }}{{ precipitationChange }}mm
          </div>
        </div>

        <div
          class="stats-card fade-in"
          style="
            background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
            animation-delay: 0.2s;
          "
        >
          <div class="flex items-center justify-center gap-3 mb-3">
            <span class="text-3xl">☁️</span>
            <span class="text-lg font-medium">CO₂ 浓度</span>
          </div>
          <div class="stats-card-value">{{ currentCO2 }}ppm</div>
          <div class="text-sm opacity-90">较上月 +{{ co2Change }}ppm</div>
        </div>
      </div>

      <div class="card p-6 mb-8 slide-in-left">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div class="flex items-center gap-3">
            <span class="text-2xl">📅</span>
            <h2 class="text-xl font-semibold text-gray-800">时间范围选择</h2>
          </div>
          <div class="flex flex-wrap gap-3">
            <Button
              v-for="range in timeRanges"
              :key="range.value"
              :label="range.label"
              :class="[
                'px-4 py-2',
                selectedTimeRange === range.value
                  ? 'p-button-primary'
                  : 'p-button-outlined',
              ]"
              @click="selectTimeRange(range.value)"
            />
          </div>
        </div>

        <div class="px-4">
          <Slider
            v-model="selectedYear"
            :min="minYear"
            :max="maxYear"
            :step="1"
            class="w-full"
            @change="onYearChange"
          />
          <div class="flex justify-between mt-3 text-sm text-gray-600">
            <span v-for="year in yearLabels" :key="year" class="font-medium">{{
              year
            }}</span>
          </div>
        </div>
      </div>

      <div class="card p-6 mb-8 slide-in-right">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div class="flex items-center gap-3">
            <span class="text-2xl">📊</span>
            <h2 class="text-xl font-semibold text-gray-800">数据可视化</h2>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <div class="flex items-center gap-3 mr-4">
              <span class="text-sm font-medium text-gray-700">显示类型:</span>
              <SelectButton
                v-model="chartType"
                :options="chartTypeOptions"
                optionLabel="label"
                optionValue="value"
                class="p-button-sm"
              />
            </div>
            <Button
              label="导出数据"
              icon="pi pi-download"
              class="p-button-success"
              @click="exportData"
            />
          </div>
        </div>

        <div class="flex flex-wrap gap-6 mb-6 p-4 bg-gray-50 rounded-xl">
          <div
            v-for="legend in legends"
            :key="legend.id"
            class="flex items-center gap-2 cursor-pointer group"
            @click="toggleLegend(legend.id)"
          >
            <div
              :class="[
                'w-4 h-4 rounded-full transition-all',
                legend.visible ? 'scale-100' : 'opacity-40',
              ]"
              :style="{ backgroundColor: legend.color }"
            />
            <span
              :class="[
                'text-sm font-medium transition-colors',
                legend.visible ? 'text-gray-800' : 'text-gray-400',
              ]"
              >{{ legend.label }}</span
            >
            <span v-if="!legend.visible" class="text-xs text-gray-400"
              >(已隐藏)</span
            >
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3
              class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"
            >
              <span>🌡️</span> 温度变化趋势
            </h3>
            <div class="h-80">
              <canvas ref="temperatureChartRef"></canvas>
            </div>
          </div>

          <div class="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3
              class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"
            >
              <span>💧</span> 降水量统计
            </h3>
            <div class="h-80">
              <canvas ref="precipitationChartRef"></canvas>
            </div>
          </div>

          <div
            class="p-4 bg-white rounded-xl shadow-sm border border-gray-100 lg:col-span-2"
          >
            <h3
              class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"
            >
              <span>☁️</span> 二氧化碳浓度变化
            </h3>
            <div class="h-80">
              <canvas ref="co2ChartRef"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="card p-6 fade-in" style="animation-delay: 0.3s">
        <h2
          class="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2"
        >
          <span class="text-2xl">📈</span> 数据洞察
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div class="text-sm text-blue-600 font-medium mb-1">
              温度上升趋势
            </div>
            <div class="text-2xl font-bold text-blue-800">+1.2°C</div>
            <div class="text-xs text-blue-500 mt-1">过去 100 年</div>
          </div>
          <div class="p-4 bg-green-50 rounded-xl border border-green-100">
            <div class="text-sm text-green-600 font-medium mb-1">
              降水变化率
            </div>
            <div class="text-2xl font-bold text-green-800">+8%</div>
            <div class="text-xs text-green-500 mt-1">过去 50 年</div>
          </div>
          <div class="p-4 bg-purple-50 rounded-xl border border-purple-100">
            <div class="text-sm text-purple-600 font-medium mb-1">
              CO₂ 增长率
            </div>
            <div class="text-2xl font-bold text-purple-800">+2.5ppm/年</div>
            <div class="text-xs text-purple-500 mt-1">近 10 年平均</div>
          </div>
          <div class="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <div class="text-sm text-orange-600 font-medium mb-1">
              预测 2050 温度
            </div>
            <div class="text-2xl font-bold text-orange-800">+2.4°C</div>
            <div class="text-xs text-orange-500 mt-1">基于当前趋势</div>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-gray-800 text-white py-6 mt-12">
      <div class="max-w-7xl mx-auto px-8 text-center">
        <p class="text-gray-400">
          气候变化数据仪表盘 © 2024 | 数据仅供演示用途
        </p>
        <p class="text-gray-500 text-sm mt-2">
          关注气候变化，共建可持续未来 🌱
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { Chart, registerables } from "chart.js";
import * as XLSX from "xlsx";
import { Button, Slider, SelectButton } from "primevue";

Chart.register(...registerables);

const currentTime = ref("");
const selectedTimeRange = ref("10y");
const selectedYear = ref(2024);
const minYear = ref(1980);
const maxYear = ref(2024);
const chartType = ref("line");

const timeRanges = [
  { label: "近 5 年", value: "5y" },
  { label: "近 10 年", value: "10y" },
  { label: "近 20 年", value: "20y" },
  { label: "全部数据", value: "all" },
];

const chartTypeOptions = [
  { label: "折线图", value: "line" },
  { label: "柱状图", value: "bar" },
];

const legends = ref([
  { id: "temperature", label: "温度", color: "#ef4444", visible: true },
  { id: "precipitation", label: "降水量", color: "#3b82f6", visible: true },
  { id: "co2", label: "CO₂ 浓度", color: "#8b5cf6", visible: true },
]);

const temperatureChartRef = ref(null);
const precipitationChartRef = ref(null);
const co2ChartRef = ref(null);

let temperatureChart = null;
let precipitationChart = null;
let co2Chart = null;

const generateClimateData = (startYear, endYear) => {
  const years = [];
  const temperatures = [];
  const precipitations = [];
  const co2Levels = [];

  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
    const baseTemp = 14 + (year - 1980) * 0.015 + Math.sin(year * 0.5) * 0.2;
    temperatures.push(parseFloat(baseTemp.toFixed(2)));

    const basePrecip = 900 + Math.sin(year * 0.3) * 100 + (year - 1980) * 2;
    precipitations.push(parseFloat(basePrecip.toFixed(0)));

    const baseCO2 = 340 + (year - 1980) * 2.1 + Math.sin(year * 0.2) * 2;
    co2Levels.push(parseFloat(baseCO2.toFixed(1)));
  }

  return { years, temperatures, precipitations, co2Levels };
};

const climateData = computed(() => {
  let startYear = minYear.value;
  let endYear = maxYear.value;

  switch (selectedTimeRange.value) {
    case "5y":
      startYear = maxYear.value - 4;
      break;
    case "10y":
      startYear = maxYear.value - 9;
      break;
    case "20y":
      startYear = maxYear.value - 19;
      break;
  }

  return generateClimateData(startYear, endYear);
});

const yearLabels = computed(() => {
  const data = climateData.value;
  const step = Math.ceil(data.years.length / 5);
  return data.years.filter((_, index) => index % step === 0);
});

const currentTemperature = computed(() => {
  const data = climateData.value;
  return data.temperatures[data.temperatures.length - 1];
});

const temperatureChange = computed(() => {
  const data = climateData.value;
  if (data.temperatures.length > 1) {
    return (
      data.temperatures[data.temperatures.length - 1] - data.temperatures[0]
    ).toFixed(2);
  }
  return 0;
});

const currentPrecipitation = computed(() => {
  const data = climateData.value;
  return data.precipitations[data.precipitations.length - 1];
});

const precipitationChange = computed(() => {
  const data = climateData.value;
  if (data.precipitations.length > 1) {
    return (
      data.precipitations[data.precipitations.length - 1] -
      data.precipitations[0]
    );
  }
  return 0;
});

const currentCO2 = computed(() => {
  const data = climateData.value;
  return data.co2Levels[data.co2Levels.length - 1];
});

const co2Change = computed(() => {
  return 2.5;
});

const updateCurrentTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const selectTimeRange = (range) => {
  selectedTimeRange.value = range;
  nextTick(() => {
    updateCharts();
  });
};

const onYearChange = () => {
  updateCharts();
};

const toggleLegend = (id) => {
  const legend = legends.value.find((l) => l.id === id);
  if (legend) {
    legend.visible = !legend.visible;
    updateCharts();
  }
};

const createChartConfig = (type, label, data, color, borderColor) => {
  const visible = legends.value.find((l) => l.label === label)?.visible ?? true;

  return {
    type: type,
    data: {
      labels: climateData.value.years,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: type === "bar" ? color : `${color}20`,
          borderColor: borderColor,
          borderWidth: 3,
          tension: 0.4,
          fill: type === "line",
          pointRadius: type === "line" ? 4 : 0,
          pointHoverRadius: 6,
          pointBackgroundColor: borderColor,
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          hidden: !visible,
          animation: {
            duration: 1500,
            easing: "easeInOutQuart",
          },
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: 12,
          titleFont: {
            size: 14,
            weight: "bold",
          },
          bodyFont: {
            size: 13,
          },
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
          ticks: {
            font: {
              size: 12,
            },
          },
        },
        y: {
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
          ticks: {
            font: {
              size: 12,
            },
          },
        },
      },
      animation: {
        duration: 1500,
        easing: "easeInOutQuart",
      },
    },
  };
};

const initCharts = () => {
  if (temperatureChartRef.value) {
    const ctx = temperatureChartRef.value.getContext("2d");
    temperatureChart = new Chart(
      ctx,
      createChartConfig(
        chartType.value,
        "温度",
        climateData.value.temperatures,
        "rgba(239, 68, 68, 0.2)",
        "#ef4444",
      ),
    );
  }

  if (precipitationChartRef.value) {
    const ctx = precipitationChartRef.value.getContext("2d");
    precipitationChart = new Chart(
      ctx,
      createChartConfig(
        chartType.value,
        "降水量",
        climateData.value.precipitations,
        "rgba(59, 130, 246, 0.2)",
        "#3b82f6",
      ),
    );
  }

  if (co2ChartRef.value) {
    const ctx = co2ChartRef.value.getContext("2d");
    co2Chart = new Chart(
      ctx,
      createChartConfig(
        chartType.value,
        "CO₂ 浓度",
        climateData.value.co2Levels,
        "rgba(139, 92, 246, 0.2)",
        "#8b5cf6",
      ),
    );
  }
};

const updateCharts = () => {
  if (temperatureChart) {
    temperatureChart.destroy();
  }
  if (precipitationChart) {
    precipitationChart.destroy();
  }
  if (co2Chart) {
    co2Chart.destroy();
  }

  nextTick(() => {
    initCharts();
  });
};

const exportData = () => {
  const data = climateData.value;

  const exportData = data.years.map((year, index) => ({
    年份: year,
    "平均温度 (°C)": data.temperatures[index],
    "降水量 (mm)": data.precipitations[index],
    "CO₂ 浓度 (ppm)": data.co2Levels[index],
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "气候变化数据");

  const colWidths = [{ wch: 12 }, { wch: 18 }, { wch: 15 }, { wch: 18 }];
  worksheet["!cols"] = colWidths;

  XLSX.writeFile(
    workbook,
    `气候变化数据_${new Date().toLocaleDateString("zh-CN").replace(/\//g, "-")}.xlsx`,
  );
};

watch(chartType, () => {
  updateCharts();
});

let timeInterval = null;

onMounted(() => {
  updateCurrentTime();
  timeInterval = setInterval(updateCurrentTime, 1000);

  nextTick(() => {
    initCharts();
  });
});

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval);
  }
  if (temperatureChart) {
    temperatureChart.destroy();
  }
  if (precipitationChart) {
    precipitationChart.destroy();
  }
  if (co2Chart) {
    co2Chart.destroy();
  }
});
</script>

<style scoped>
.p-button {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
}

.p-slider {
  height: 8px;
}

.p-slider .p-slider-range {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
}

.p-slider .p-slider-handle {
  width: 20px;
  height: 20px;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.p-selectbutton .p-button {
  border-radius: 6px;
}

.p-selectbutton .p-button.p-highlight {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border-color: #3b82f6;
}
</style>
