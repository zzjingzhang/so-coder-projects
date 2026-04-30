<template>
  <div
    ref="containerRef"
    class="virtual-table-container"
    :style="{ height: containerHeight + 'px' }"
    @scroll="handleScroll"
  >
    <div class="virtual-table-header">
      <div class="virtual-table-row" :style="{ height: headerHeight + 'px' }">
        <div
          v-for="(col, index) in columns"
          :key="index"
          class="virtual-table-cell font-weight-bold bg-primary text-white"
          :style="{ width: col.width + 'px' }"
        >
          {{ col.title }}
        </div>
      </div>
    </div>

    <div class="virtual-table-body" :style="{ height: totalHeight + 'px' }">
      <div
        v-for="item in visibleData"
        :key="item.index"
        class="virtual-table-row"
        :style="{
          height: item.height + 'px',
          top: item.offsetY + 'px',
        }"
      >
        <div
          v-for="(col, colIndex) in columns"
          :key="colIndex"
          class="virtual-table-cell"
          :style="{ width: col.width + 'px' }"
        >
          <template v-if="col.render">
            <component :is="col.render" :row="item.data" :column="col" />
          </template>
          <template v-else>
            {{ getCellValue(item.data, col) }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

export interface Column {
  title: string;
  key: string;
  width: number;
  render?: any;
}

export interface TableRow {
  [key: string]: any;
}

interface VirtualRow {
  index: number;
  offsetY: number;
  height: number;
  data: TableRow;
}

const props = withDefaults(
  defineProps<{
    columns: Column[];
    data: TableRow[];
    rowHeight?: number;
    containerHeight?: number;
    bufferSize?: number;
  }>(),
  {
    rowHeight: 50,
    containerHeight: 400,
    bufferSize: 5,
  },
);

const containerRef = ref<HTMLElement>();
const scrollTop = ref(0);
const measuredHeights = ref<Map<number, number>>(new Map());

const headerHeight = 50;

const totalHeight = computed(() => {
  let height = 0;
  for (let i = 0; i < props.data.length; i++) {
    height += getRowHeight(i);
  }
  return height;
});

const getRowHeight = (index: number): number => {
  if (measuredHeights.value.has(index)) {
    return measuredHeights.value.get(index)!;
  }
  return props.rowHeight;
};

const getItemOffsetY = (index: number): number => {
  let offset = 0;
  for (let i = 0; i < index; i++) {
    offset += getRowHeight(i);
  }
  return offset;
};

const visibleRange = computed(() => {
  const startIndex = findStartIndex(scrollTop.value);
  const endIndex = findEndIndex(startIndex);
  return {
    start: Math.max(0, startIndex - props.bufferSize),
    end: Math.min(props.data.length - 1, endIndex + props.bufferSize),
  };
});

const findStartIndex = (scrollTop: number): number => {
  let low = 0;
  let high = props.data.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const offset = getItemOffsetY(mid);

    if (offset < scrollTop) {
      low = mid + 1;
    } else if (offset > scrollTop) {
      high = mid - 1;
    } else {
      return mid;
    }
  }

  return low > 0 ? low - 1 : 0;
};

const findEndIndex = (startIndex: number): number => {
  let offset = getItemOffsetY(startIndex);
  const visibleHeight = props.containerHeight - headerHeight;

  let endIndex = startIndex;
  while (
    endIndex < props.data.length - 1 &&
    offset < scrollTop.value + visibleHeight
  ) {
    offset += getRowHeight(endIndex);
    endIndex++;
  }

  return endIndex;
};

const visibleData = computed((): VirtualRow[] => {
  const result: VirtualRow[] = [];
  const { start, end } = visibleRange.value;

  for (let i = start; i <= end; i++) {
    result.push({
      index: i,
      offsetY: getItemOffsetY(i),
      height: getRowHeight(i),
      data: props.data[i],
    });
  }

  return result;
});

const getCellValue = (row: TableRow, col: Column): any => {
  return row[col.key];
};

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  scrollTop.value = target.scrollTop;
};

const updateRowHeight = (index: number, height: number) => {
  if (height > 0 && !measuredHeights.value.has(index)) {
    measuredHeights.value.set(index, height);
  }
};

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  if (containerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      const rowElements =
        containerRef.value?.querySelectorAll(".virtual-table-row");
      rowElements?.forEach((el, index) => {
        const startIndex = visibleRange.value.start;
        const actualIndex = startIndex + index;
        const height = (el as HTMLElement).offsetHeight;
        if (height > 0) {
          updateRowHeight(actualIndex, height);
        }
      });
    });
  }
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<style scoped>
.virtual-table-container {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  background: white;
}

.virtual-table-header {
  background: rgb(var(--v-theme-primary));
}

.virtual-table-header .virtual-table-row {
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
}

.virtual-table-cell {
  font-size: 14px;
}

.virtual-table-row:hover {
  background: rgba(0, 0, 0, 0.04);
}
</style>
