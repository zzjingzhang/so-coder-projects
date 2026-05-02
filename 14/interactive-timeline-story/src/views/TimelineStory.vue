<template>
  <div class="timeline-container">
    <header class="header-section">
      <div class="header-content">
        <h1 class="main-title">时间的印记</h1>
        <p class="subtitle">探索历史长河中的精彩瞬间</p>
        <el-button 
          type="primary" 
          size="large" 
          class="scroll-btn"
          @click="scrollToSection(0)"
        >
          开始探索
        </el-button>
      </div>
      <div class="scroll-indicator">
        <div class="scroll-arrow"></div>
        <div class="scroll-arrow"></div>
        <div class="scroll-arrow"></div>
      </div>
    </header>

    <div 
      ref="timelineRef" 
      class="timeline-sections"
    >
      <section 
        v-for="(section, index) in sections" 
        :key="index"
        :id="`section-${index}`"
        class="timeline-section"
        :class="{ 'active': activeSection === index }"
      >
        <div class="section-content" :class="index % 2 === 0 ? 'left' : 'right'">
          <div class="chapter-badge">第 {{ index + 1 }} 章</div>
          <h2 class="section-title">{{ section.title }}</h2>
          <p class="section-date">{{ section.date }}</p>
          <p class="section-description">{{ section.description }}</p>
          <div class="characters">
            <div 
              v-for="(character, charIndex) in section.characters" 
              :key="charIndex"
              class="character-card"
              :class="{ 'visible': visibleCharacters[index]?.[charIndex] }"
              :style="getCharacterStyle(index, charIndex)"
            >
              <div class="character-avatar">
                <span class="character-initial">{{ character.name.charAt(0) }}</span>
              </div>
              <div class="character-info">
                <h4 class="character-name">{{ character.name }}</h4>
                <p class="character-role">{{ character.role }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="timeline-marker">
          <div class="marker-dot"></div>
          <div class="connector-line"></div>
        </div>
      </section>
    </div>

    <nav class="progress-nav" v-if="progress > 5">
      <div class="progress-track">
        <div 
          class="progress-fill" 
          :style="{ height: `${progress}%` }"
        ></div>
      </div>
      <div class="nav-dots">
        <button 
          v-for="(_, index) in sections" 
          :key="index"
          class="nav-dot"
          :class="{ 'active': activeSection === index }"
          @click="scrollToSection(index)"
        >
          <span class="dot-label">{{ index + 1 }}</span>
        </button>
      </div>
    </nav>

    <footer class="footer-section">
      <p class="footer-text">感谢您的探索</p>
      <el-button 
        type="primary" 
        size="large" 
        class="back-to-top"
        @click="scrollToTop"
      >
        回到顶部
      </el-button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Character {
  name: string
  role: string
}

interface Section {
  title: string
  date: string
  description: string
  characters: Character[]
}

const sections: Section[] = [
  {
    title: '远古时代',
    date: '公元前 3000 年',
    description: '人类文明的曙光初现，古老的河流孕育着最早的城市与国家。在这片土地上，文字被发明，农业开始繁荣，人类社会逐渐形成了复杂的结构。',
    characters: [
      { name: '伏羲', role: '人文始祖' },
      { name: '女娲', role: '创世女神' }
    ]
  },
  {
    title: '春秋战国',
    date: '公元前 770 - 221 年',
    description: '百家争鸣的黄金时代，孔子、老子、墨子等思想家纷纷涌现。这是一个动荡与变革并存的时期，也是中华文化思想的奠基时代。',
    characters: [
      { name: '孔子', role: '儒家创始人' },
      { name: '老子', role: '道家创始人' },
      { name: '孙子', role: '兵家代表' }
    ]
  },
  {
    title: '秦汉盛世',
    date: '公元前 221 年 - 公元 220 年',
    description: '大一统的帝国崛起，秦始皇统一六国，汉武帝开疆拓土。丝绸之路连接东西方，中华文明走向世界舞台的中心。',
    characters: [
      { name: '秦始皇', role: '千古一帝' },
      { name: '汉武帝', role: '雄才大略' },
      { name: '张骞', role: '丝绸之路开拓者' }
    ]
  },
  {
    title: '唐宋辉煌',
    date: '公元 618 - 1279 年',
    description: '诗词歌赋的鼎盛时期，唐诗宋词成为中华文化的瑰宝。经济繁荣，科技发达，四大发明中的三项在此期间出现。',
    characters: [
      { name: '李白', role: '诗仙' },
      { name: '杜甫', role: '诗圣' },
      { name: '苏轼', role: '文学家' },
      { name: '毕昇', role: '印刷术发明者' }
    ]
  },
  {
    title: '明清交融',
    date: '公元 1368 - 1912 年',
    description: '传统与现代的碰撞，郑和下西洋展示中华国力，四大名著相继问世。这是一个集大成的时代，也是变革的前夜。',
    characters: [
      { name: '郑和', role: '航海家' },
      { name: '李时珍', role: '医学家' },
      { name: '曹雪芹', role: '文学家' }
    ]
  }
]

const activeSection = ref(0)
const progress = ref(0)
const visibleCharacters = ref<boolean[][]>(
  sections.map(s => s.characters.map(() => false))
)
const timelineRef = ref<HTMLElement | null>(null)

const getCharacterStyle = (sectionIndex: number, charIndex: number) => {
  return {
    transitionDelay: `${charIndex * 0.2}s`
  }
}

const handleScroll = () => {
  const scrollTop = window.scrollY
  const windowHeight = window.innerHeight
  const docHeight = document.documentElement.scrollHeight - windowHeight
  
  progress.value = Math.min((scrollTop / docHeight) * 100, 100)
  
  sections.forEach((_, index) => {
    const section = document.getElementById(`section-${index}`)
    if (section) {
      const rect = section.getBoundingClientRect()
      const isVisible = rect.top < windowHeight * 0.75 && rect.bottom > windowHeight * 0.25
      
      if (isVisible) {
        activeSection.value = index
        showCharacters(index)
      }
    }
  })
}

const showCharacters = (sectionIndex: number) => {
  if (!visibleCharacters.value[sectionIndex]) return
  
  sections[sectionIndex].characters.forEach((_, charIndex) => {
    if (!visibleCharacters.value[sectionIndex][charIndex]) {
      setTimeout(() => {
        visibleCharacters.value[sectionIndex][charIndex] = true
      }, charIndex * 300)
    }
  })
}

const scrollToSection = (index: number) => {
  const section = document.getElementById(`section-${index}`)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.timeline-container {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

.header-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #6366f1 0%, #10b981 100%);
  background-attachment: fixed;
}

.header-content {
  z-index: 10;
}

.main-title {
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(90deg, #fff 0%, #f1f5f9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  text-shadow: 0 0 40px rgba(99, 102, 241, 0.5);
  animation: titleFadeIn 1s ease-out;
}

.subtitle {
  font-size: 1.5rem;
  color: #f1f5f9;
  margin-bottom: 2rem;
  opacity: 0.9;
  animation: titleFadeIn 1s ease-out 0.2s both;
}

.scroll-btn {
  background: #1e293b;
  border: none;
  font-size: 1.1rem;
  padding: 1rem 3rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  animation: titleFadeIn 1s ease-out 0.4s both;
}

.scroll-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.scroll-indicator {
  position: absolute;
  bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: bounce 2s infinite;
}

.scroll-arrow {
  width: 20px;
  height: 20px;
  border-right: 3px solid #f1f5f9;
  border-bottom: 3px solid #f1f5f9;
  transform: rotate(45deg);
  margin: -8px 0;
  opacity: 0.6;
  animation: arrowPulse 2s infinite;
}

.scroll-arrow:nth-child(2) {
  animation-delay: 0.2s;
}

.scroll-arrow:nth-child(3) {
  animation-delay: 0.4s;
}

.timeline-sections {
  position: relative;
  padding: 4rem 0;
}

.timeline-sections::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #6366f1 0%, #10b981 50%, #f59e0b 100%);
  border-radius: 2px;
}

.timeline-section {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  padding: 4rem 2rem;
  opacity: 0.3;
  transition: all 0.8s ease;
}

.timeline-section.active {
  opacity: 1;
}

.section-content {
  width: 45%;
  padding: 2.5rem;
  background: #1e293b;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(99, 102, 241, 0.2);
  transition: all 0.5s ease;
}

.section-content.left {
  margin-right: auto;
  transform: translateX(-50px);
}

.section-content.right {
  margin-left: auto;
  transform: translateX(50px);
}

.timeline-section.active .section-content {
  transform: translateX(0);
}

.chapter-badge {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: linear-gradient(90deg, #6366f1, #10b981);
  color: white;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 0.5rem;
}

.section-date {
  font-size: 1.1rem;
  color: #6366f1;
  margin-bottom: 1rem;
  font-weight: 500;
}

.section-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #94a3b8;
  margin-bottom: 2rem;
}

.characters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.character-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(16, 185, 129, 0.1));
  border-radius: 12px;
  border: 1px solid rgba(99, 102, 241, 0.3);
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.5s ease;
}

.character-card.visible {
  transform: translateY(0);
  opacity: 1;
}

.character-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #10b981);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.character-initial {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.character-info {
  display: flex;
  flex-direction: column;
}

.character-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0;
}

.character-role {
  font-size: 0.9rem;
  color: #94a3b8;
  margin: 0;
}

.timeline-marker {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.marker-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #6366f1;
  border: 4px solid #1e293b;
  box-shadow: 0 0 20px #6366f1;
  transition: all 0.3s ease;
}

.timeline-section.active .marker-dot {
  transform: scale(1.3);
  background: linear-gradient(135deg, #6366f1, #10b981);
}

.connector-line {
  position: absolute;
  top: 20px;
  width: 2px;
  height: calc(100% - 20px);
  background: rgba(99, 102, 241, 0.3);
}

.progress-nav {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  z-index: 100;
}

.progress-track {
  position: absolute;
  width: 4px;
  height: 100%;
  background: #1e293b;
  border-radius: 2px;
}

.progress-fill {
  position: absolute;
  width: 100%;
  background: linear-gradient(180deg, #6366f1, #10b981);
  border-radius: 2px;
  transition: height 0.3s ease;
}

.nav-dots {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 1;
}

.nav-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #1e293b;
  border: 2px solid #6366f1;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  position: relative;
}

.nav-dot:hover {
  transform: scale(1.3);
  background: #6366f1;
}

.nav-dot.active {
  background: #6366f1;
  transform: scale(1.3);
  box-shadow: 0 0 15px #6366f1;
}

.dot-label {
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  background: #1e293b;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #f1f5f9;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.nav-dot:hover .dot-label {
  opacity: 1;
}

.footer-section {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  background: linear-gradient(180deg, #1e293b, #0f172a);
  text-align: center;
}

.footer-text {
  font-size: 2rem;
  color: #94a3b8;
  margin-bottom: 2rem;
}

.back-to-top {
  background: linear-gradient(90deg, #6366f1, #10b981);
  border: none;
  font-size: 1.1rem;
  padding: 1rem 3rem;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

@keyframes titleFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes arrowPulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .timeline-sections::before {
    left: 30px;
  }
  
  .section-content {
    width: calc(100% - 60px);
    margin-left: 60px !important;
    margin-right: 0 !important;
    transform: translateX(0) !important;
  }
  
  .timeline-marker {
    left: 30px;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .progress-nav {
    right: 1rem;
  }
  
  .dot-label {
    display: none;
  }
}
</style>
