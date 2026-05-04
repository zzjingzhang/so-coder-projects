<script setup>
import { ref, onMounted } from 'vue';
import { NCard, NButton, NSpin, useMessage } from 'naive-ui';
import quotes from '../data/quotes.js';

const message = useMessage();
const currentQuote = ref(null);
const isLoading = ref(false);

const getRandomQuote = () => {
  isLoading.value = true;
  
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    currentQuote.value = quotes[randomIndex];
    isLoading.value = false;
  }, 500);
};

const speakQuote = () => {
  if (!currentQuote.value) return;
  
  if ('speechSynthesis' in window) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = `${currentQuote.value.text}. — ${currentQuote.value.author}`;
    speech.rate = 0.9;
    speech.pitch = 1;
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  } else {
    message.warning('您的浏览器不支持语音合成功能');
  }
};

const copyQuote = async () => {
  if (!currentQuote.value) return;
  
  const textToCopy = `"${currentQuote.value.text}" — ${currentQuote.value.author}`;
  
  try {
    await navigator.clipboard.writeText(textToCopy);
    message.success('名言已复制到剪贴板');
  } catch (err) {
    message.error('复制失败，请手动复制');
  }
};

const shareOnTwitter = () => {
  if (!currentQuote.value) return;
  
  const tweetText = encodeURIComponent(`"${currentQuote.value.text}" — ${currentQuote.value.author}`);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
  
  window.open(twitterUrl, '_blank', 'width=600,height=400');
};

onMounted(() => {
  getRandomQuote();
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center p-4">
    <n-card
      class="w-full max-w-2xl shadow-2xl rounded-2xl"
      :bordered="false"
    >
      <n-spin :show="isLoading">
        <div v-if="currentQuote" class="p-6 md:p-8">
          <div class="mb-8">
            <div class="flex items-start mb-4">
              <svg class="w-12 h-12 text-blue-500 opacity-30 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p class="text-2xl md:text-3xl font-light text-gray-800 leading-relaxed mb-6 italic">
              {{ currentQuote.text }}
            </p>
            <p class="text-right text-lg md:text-xl font-semibold text-gray-600">
              — {{ currentQuote.author }}
            </p>
          </div>
          
          <div class="border-t border-gray-200 pt-6">
            <div class="flex flex-wrap gap-3 justify-center">
              <n-button
                type="primary"
                size="large"
                @click="speakQuote"
                class="flex items-center justify-center"
                :disabled="isLoading"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                朗读
              </n-button>
              
              <n-button
                type="default"
                size="large"
                @click="copyQuote"
                class="flex items-center justify-center"
                :disabled="isLoading"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                复制
              </n-button>
              
              <n-button
                type="default"
                size="large"
                @click="shareOnTwitter"
                class="flex items-center justify-center"
                :disabled="isLoading"
              >
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter
              </n-button>
              
              <n-button
                type="primary"
                size="large"
                :loading="isLoading"
                @click="getRandomQuote"
                class="flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                New Quote
              </n-button>
            </div>
          </div>
        </div>
      </n-spin>
    </n-card>
  </div>
</template>

<style scoped>
.n-card {
  border-radius: 1rem !important;
}

.n-button {
  min-width: 100px;
  height: 48px;
}
</style>
