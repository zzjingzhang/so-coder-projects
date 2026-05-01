<template>
  <div class="home-container">
    <div class="home-content">
      <div class="game-intro">
        <h2 class="intro-title">🎮 游戏说明</h2>
        <p class="intro-text">
          这是一款管道连接益智游戏。你的目标是通过旋转管道，
          将水从喷泉引导到池塘。点击管道可以旋转它（每次90度），
          当所有管道正确连接，水成功从喷泉流到池塘时，你就赢了！
        </p>
        <div class="pipe-examples">
          <div class="pipe-example">
            <div class="pipe-icon straight"></div>
            <span>直线管道</span>
          </div>
          <div class="pipe-example">
            <div class="pipe-icon corner"></div>
            <span>拐角管道</span>
          </div>
          <div class="pipe-example">
            <div class="pipe-icon t-shape"></div>
            <span>T型管道</span>
          </div>
          <div class="pipe-example">
            <div class="pipe-icon cross"></div>
            <span>十字管道</span>
          </div>
        </div>
      </div>

      <div class="level-selection">
        <h2 class="level-title">🗺️ 选择关卡</h2>
        <div class="level-cards">
          <el-card
            v-for="level in levels"
            :key="level.id"
            class="level-card"
            :class="{ 'level-difficult': level.id > 1 }"
            shadow="hover"
            @click="startGame(level.id)"
          >
            <template #header>
              <div class="level-header">
                <span class="level-number">第 {{ level.id }} 关</span>
                <el-tag :type="getLevelDifficulty(level.id)">
                  {{ getLevelDifficultyText(level.id) }}
                </el-tag>
              </div>
            </template>
            <div class="level-info">
              <h3 class="level-name">{{ level.name }}</h3>
              <p class="level-size">
                棋盘大小：{{ level.rows }} × {{ level.cols }}
              </p>
              <el-button type="primary" class="start-button">
                开始游戏
              </el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { allLevels } from '../data/levels';

const router = useRouter();

const levels = allLevels;

const startGame = (levelId: number) => {
  router.push({
    path: '/game',
    query: { level: levelId.toString() }
  });
};

const getLevelDifficulty = (levelId: number): 'success' | 'warning' | 'danger' => {
  if (levelId === 1) return 'success';
  if (levelId === 2) return 'warning';
  return 'danger';
};

const getLevelDifficultyText = (levelId: number): string => {
  if (levelId === 1) return '简单';
  if (levelId === 2) return '中等';
  return '困难';
};
</script>

<style scoped>
.home-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.home-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.game-intro {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.intro-title {
  font-size: 1.5rem;
  color: #409eff;
  margin-bottom: 15px;
  font-weight: bold;
}

.intro-text {
  font-size: 1rem;
  line-height: 1.8;
  color: #606266;
  margin-bottom: 20px;
}

.pipe-examples {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.pipe-example {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  background: #f5f7fa;
  border-radius: 8px;
}

.pipe-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(180deg, #a0a0a0 0%, #707070 100%);
  border-radius: 8px;
  position: relative;
}

.pipe-icon.straight::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 12px;
  transform: translateY(-50%);
  background: linear-gradient(180deg, #409eff 0%, #66b1ff 100%);
  border-radius: 6px;
}

.pipe-icon.corner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 50%;
  background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
  border-radius: 8px 0 0 0;
}

.pipe-icon.t-shape::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 12px;
  transform: translateY(-50%);
  background: linear-gradient(180deg, #409eff 0%, #66b1ff 100%);
  border-radius: 6px;
}

.pipe-icon.t-shape::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 12px;
  height: 50%;
  transform: translateX(-50%);
  background: linear-gradient(90deg, #409eff 0%, #66b1ff 100%);
  border-radius: 6px 6px 0 0;
}

.pipe-icon.cross::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 12px;
  transform: translateY(-50%);
  background: linear-gradient(180deg, #409eff 0%, #66b1ff 100%);
  border-radius: 6px;
}

.pipe-icon.cross::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 12px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, #409eff 0%, #66b1ff 100%);
  border-radius: 6px;
}

.level-selection {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.level-title {
  font-size: 1.5rem;
  color: #409eff;
  margin-bottom: 20px;
  font-weight: bold;
}

.level-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.level-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.level-card:hover {
  transform: translateY(-5px);
}

.level-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.level-number {
  font-weight: bold;
  font-size: 1.1rem;
}

.level-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.level-name {
  font-size: 1.2rem;
  color: #303133;
  margin: 0;
}

.level-size {
  font-size: 0.9rem;
  color: #909399;
  margin: 0;
}

.start-button {
  margin-top: 10px;
  width: 100%;
}

@media (max-width: 768px) {
  .home-container {
    padding: 10px;
  }

  .game-intro,
  .level-selection {
    padding: 20px;
  }

  .level-cards {
    grid-template-columns: 1fr;
  }

  .pipe-examples {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
