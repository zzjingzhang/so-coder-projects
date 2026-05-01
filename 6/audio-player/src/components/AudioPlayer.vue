<template>
  <div class="flex flex-col items-center gap-8 w-full max-w-xl">
    <div
      class="relative w-72 h-72 rounded-full overflow-hidden shadow-2xl"
      :class="{
        'rotate-animation': isPlaying,
        paused: !isPlaying,
        'pulse-glow': isPlaying,
      }"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"
      >
        <img
          v-if="track && track.cover"
          :src="track.cover"
          :alt="track.title"
          class="w-full h-full object-cover"
        />
        <div
          v-else
          class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800"
        >
          <svg
            class="w-24 h-24 text-white/50"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
            />
          </svg>
        </div>
      </div>
      <div
        class="absolute inset-0 rounded-full border-8 border-slate-800"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-slate-900 border-4 border-slate-700 flex items-center justify-center"
      >
        <div class="w-4 h-4 rounded-full bg-slate-600"></div>
      </div>
    </div>

    <div class="text-center">
      <h2 class="text-2xl font-bold text-white mb-1">
        {{ track ? track.title : "选择一首歌曲" }}
      </h2>
      <p class="text-slate-400">
        {{ track ? track.artist : "--" }}
      </p>
      <p v-if="track && track.album" class="text-sm text-slate-500 mt-1">
        {{ track.album }}
      </p>
    </div>

    <div class="w-full">
      <div class="flex items-center justify-center gap-6">
        <div class="flex flex-col items-center">
          <span class="text-xs text-slate-500 mb-1">随机播放</span>
          <n-button
            quaternary
            circle
            size="medium"
            :class="{ 'text-primary-500 bg-primary-500/10': isShuffle }"
            @click="$emit('toggle-shuffle')"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"
              />
            </svg>
          </n-button>
        </div>

        <div class="flex items-center gap-4">
          <n-button
            quaternary
            circle
            size="large"
            class="!w-12 !h-12 hover:bg-slate-700"
            @click="$emit('prev-track')"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </n-button>

          <n-button
            type="primary"
            circle
            size="large"
            class="!w-20 !h-20 shadow-lg shadow-primary-500/30"
            @click="$emit('toggle-play')"
          >
            <svg
              v-if="!isPlaying"
              class="w-10 h-10 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <svg
              v-else
              class="w-10 h-10"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          </n-button>

          <n-button
            quaternary
            circle
            size="large"
            class="!w-12 !h-12 hover:bg-slate-700"
            @click="$emit('next-track')"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </n-button>
        </div>

        <div class="flex flex-col items-center">
          <span class="text-xs text-slate-500 mb-1">循环模式</span>
          <n-button
            quaternary
            circle
            size="medium"
            :class="{
              'text-primary-500 bg-primary-500/10': repeatMode !== 'none',
            }"
            @click="$emit('change-repeat')"
          >
            <svg
              v-if="repeatMode === 'none' || repeatMode === 'all'"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"
              />
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"
              />
              <path
                d="M12 8v4l3 3"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </n-button>
        </div>
      </div>
    </div>

    <div class="w-full space-y-4">
      <div class="flex items-center gap-3">
        <span class="text-xs text-slate-400 w-12 text-right font-mono">{{
          formatTime(currentTime)
        }}</span>
        <div class="flex-1">
          <n-slider
            :value="progress"
            :max="100"
            :tooltip="false"
            @update:value="$emit('seek', $event)"
          />
        </div>
        <span class="text-xs text-slate-400 w-12 font-mono">{{
          formatTime(duration)
        }}</span>
      </div>

      <div class="flex items-center justify-center gap-3">
        <n-button quaternary circle size="small" @click="$emit('toggle-mute')">
          <svg
            v-if="isMuted || volume === 0"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
            />
          </svg>
          <svg
            v-else-if="volume < 0.5"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"
            />
          </svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
            />
          </svg>
        </n-button>
        <n-slider
          :value="volume"
          :min="0"
          :max="1"
          :step="0.01"
          :tooltip="false"
          @update:value="$emit('volume-change', $event)"
          class="w-32"
        />
        <span class="text-xs text-slate-400 w-10"
          >{{ Math.round(volume * 100) }}%</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  track: {
    type: Object,
    default: null,
  },
  isPlaying: {
    type: Boolean,
    default: false,
  },
  progress: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
  currentTime: {
    type: Number,
    default: 0,
  },
  volume: {
    type: Number,
    default: 0.7,
  },
  isMuted: {
    type: Boolean,
    default: false,
  },
  isShuffle: {
    type: Boolean,
    default: false,
  },
  repeatMode: {
    type: String,
    default: "none",
  },
});

const emit = defineEmits([
  "toggle-play",
  "seek",
  "volume-change",
  "toggle-mute",
  "toggle-shuffle",
  "change-repeat",
  "prev-track",
  "next-track",
]);

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
</script>
