<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { NSelect, NButton } from "naive-ui";

interface Movie {
  label: string;
  value: string;
  price: number;
}

interface Seat {
  row: number;
  col: number;
  status: "available" | "selected" | "occupied";
}

const movies: Movie[] = [
  { label: "速度与激情10", value: "movie1", price: 48 },
  { label: "流浪地球2", value: "movie2", price: 38 },
  { label: "满江红", value: "movie3", price: 45 },
  { label: "复仇者联盟4", value: "movie4", price: 55 },
];

const ROWS = 8;
const COLS = 10;

const generateSeats = (): Seat[][] => {
  const result: Seat[][] = [];
  for (let i = 0; i < ROWS; i++) {
    const row: Seat[] = [];
    for (let j = 0; j < COLS; j++) {
      row.push({
        row: i,
        col: j,
        status: "available",
      });
    }
    result.push(row);
  }
  return result;
};

const selectedMovie = ref<string>(movies[0].value);
const seats = ref<Seat[][]>(generateSeats());

const movieOptions = computed(() => {
  return movies.map((movie) => ({
    label: movie.label,
    value: movie.value,
    type: "option" as const,
  }));
});

const markRandomOccupied = (seatArray: Seat[][]) => {
  const occupiedCount = Math.floor(Math.random() * 15) + 5;
  let marked = 0;
  while (marked < occupiedCount) {
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);
    if (seatArray[row][col].status === "available") {
      seatArray[row][col].status = "occupied";
      marked++;
    }
  }
};

const selectedSeatsCount = computed(() => {
  let count = 0;
  for (const row of seats.value) {
    for (const seat of row) {
      if (seat.status === "selected") {
        count++;
      }
    }
  }
  return count;
});

const totalPrice = computed(() => {
  const movie = movies.find((m) => m.value === selectedMovie.value);
  return selectedSeatsCount.value * (movie?.price || 0);
});

const seatClick = (seat: Seat) => {
  if (seat.status === "available") {
    seat.status = "selected";
  } else if (seat.status === "selected") {
    seat.status = "available";
  }
};

const getSelectedSeatsLabel = () => {
  const labels: string[] = [];
  if (!seats.value || seats.value.length === 0) {
    return "未选择座位";
  }
  for (let i = 0; i < seats.value.length; i++) {
    const row = seats.value[i];
    if (!row) continue;
    for (let j = 0; j < row.length; j++) {
      const seat = row[j];
      if (seat && seat.status === "selected") {
        labels.push(`${String.fromCharCode(65 + i)}${j + 1}`);
      }
    }
  }
  return labels.join(", ") || "未选择座位";
};

const saveToLocalStorage = () => {
  const data = {
    selectedMovie: selectedMovie.value,
    seats: seats.value,
  };
  localStorage.setItem("movieBookingData", JSON.stringify(data));
};

const loadFromLocalStorage = () => {
  const saved = localStorage.getItem("movieBookingData");
  if (saved) {
    try {
      const data = JSON.parse(saved);
      selectedMovie.value = data.selectedMovie || movies[0].value;
      if (data.seats && data.seats.length === ROWS) {
        seats.value = data.seats;
      } else {
        initializeSeats();
      }
    } catch (e) {
      initializeSeats();
    }
  } else {
    initializeSeats();
  }
};

const initializeSeats = () => {
  seats.value = generateSeats();
  markRandomOccupied(seats.value);
};

const resetSelection = () => {
  for (const row of seats.value) {
    for (const seat of row) {
      if (seat.status === "selected") {
        seat.status = "available";
      }
    }
  }
};

watch(
  [selectedMovie, seats],
  () => {
    saveToLocalStorage();
  },
  { deep: true },
);

onMounted(() => {
  loadFromLocalStorage();
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4"
  >
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-white text-center mb-8">
        电影座位预订
      </h1>

      <div class="bg-gray-800 rounded-2xl p-6 mb-6 shadow-2xl">
        <label class="block text-gray-300 text-lg font-medium mb-3"
          >选择电影</label
        >
        <n-select
          v-model:value="selectedMovie"
          :options="movieOptions"
          placeholder="请选择电影"
          size="large"
          class="w-full"
        />
        <div class="mt-3 text-gray-400">
          票价：<span class="text-green-400 font-bold text-xl"
            >¥{{ movies.find((m) => m.value === selectedMovie)?.price }}</span
          >
        </div>
      </div>

      <div class="bg-gray-800 rounded-2xl p-6 mb-6 shadow-2xl">
        <div class="flex justify-center mb-10">
          <div
            class="w-3/4 h-4 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-b-full shadow-lg shadow-cyan-500/50"
          ></div>
        </div>

        <div class="text-center text-gray-400 mb-8 text-sm tracking-widest">
          荧幕
        </div>

        <div class="flex flex-col items-center gap-2 mb-8">
          <div
            v-for="(row, rowIndex) in seats"
            :key="rowIndex"
            class="flex items-center gap-3"
          >
            <div class="w-6 text-gray-400 text-sm font-medium text-right">
              {{ String.fromCharCode(65 + rowIndex) }}
            </div>

            <div class="flex gap-2">
              <div
                v-for="(seat, colIndex) in row"
                :key="colIndex"
                class="w-8 h-8 rounded-t-lg cursor-pointer transition-all duration-200 flex items-center justify-center text-xs font-bold"
                :class="{
                  'bg-gray-600 hover:bg-gray-500': seat.status === 'available',
                  'bg-green-500 hover:bg-green-400 shadow-lg shadow-green-500/50':
                    seat.status === 'selected',
                  'bg-red-900 cursor-not-allowed': seat.status === 'occupied',
                }"
                @click="seatClick(seat)"
              >
                <span
                  :class="{
                    'text-gray-300': seat.status === 'available',
                    'text-white': seat.status === 'selected',
                    'text-red-700': seat.status === 'occupied',
                  }"
                >
                  {{ colIndex + 1 }}
                </span>
              </div>
            </div>

            <div class="w-6 text-gray-400 text-sm font-medium">
              {{ String.fromCharCode(65 + rowIndex) }}
            </div>
          </div>
        </div>

        <div class="flex justify-center gap-8">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-t-lg bg-gray-600"></div>
            <span class="text-gray-400 text-sm">可选</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-t-lg bg-green-500"></div>
            <span class="text-gray-400 text-sm">已选</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-t-lg bg-red-900"></div>
            <span class="text-gray-400 text-sm">已占用</span>
          </div>
        </div>
      </div>

      <div class="bg-gray-800 rounded-2xl p-6 shadow-2xl">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div class="flex flex-col items-center md:items-start gap-2">
            <div class="text-gray-400 text-sm">已选座位</div>
            <div
              class="text-white font-medium max-w-md text-center md:text-left"
            >
              {{ getSelectedSeatsLabel() }}
            </div>
          </div>

          <div class="flex flex-col items-center gap-2">
            <div class="text-gray-400 text-sm">座位数量</div>
            <div class="text-white font-bold text-2xl">
              {{ selectedSeatsCount }}
            </div>
          </div>

          <div class="flex flex-col items-center gap-2">
            <div class="text-gray-400 text-sm">总价</div>
            <div class="text-green-400 font-bold text-3xl">
              ¥{{ totalPrice }}
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-center gap-4">
          <n-button
            type="primary"
            size="large"
            class="w-40"
            :disabled="selectedSeatsCount === 0"
          >
            确认预订
          </n-button>
          <n-button size="large" class="w-40" @click="resetSelection">
            重新选择
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>
