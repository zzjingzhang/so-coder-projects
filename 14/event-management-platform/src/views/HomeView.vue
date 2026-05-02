<template>
  <div class="home-view">
    <!-- 主视觉区域 -->
    <section class="hero-section bg-gradient-to-br from-cold-gray-900 via-cold-gray-800 to-cold-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="hero-content">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              简化您的
              <span class="text-accent-400">活动管理</span>
              流程
            </h1>
            <p class="text-lg md:text-xl text-cold-gray-300 mb-8 leading-relaxed">
              EventFlow 是一个强大的在线活动管理平台，帮助您轻松规划、组织和管理各类活动。从小型会议到大型会议，我们都能满足您的需求。
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <el-button 
                type="primary" 
                size="large" 
                class="bg-accent-500 hover:bg-accent-600 border-none text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg transition-all transform hover:scale-105"
              >
                立即开始
              </el-button>
              <el-button 
                size="large" 
                class="bg-transparent border-2 border-white text-white hover:bg-white hover:text-cold-gray-900 px-8 py-3 text-lg font-medium rounded-lg transition-all"
              >
                了解更多
              </el-button>
            </div>
          </div>
          <div class="hero-image">
            <div class="relative">
              <div class="absolute inset-0 bg-accent-500 rounded-2xl blur-3xl opacity-20"></div>
              <div class="relative bg-cold-gray-800 rounded-2xl p-6 shadow-2xl border border-cold-gray-700">
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-lg font-semibold">即将到来的活动</h3>
                  <span class="text-sm text-accent-400">查看全部</span>
                </div>
                <div class="space-y-4">
                  <div class="flex items-center p-3 bg-cold-gray-700 rounded-lg">
                    <div class="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center mr-4">
                      <span class="text-xl">📅</span>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-medium">技术峰会 2026</h4>
                      <p class="text-sm text-cold-gray-400">2026年6月15日 · 北京</p>
                    </div>
                    <el-tag type="success" effect="dark">进行中</el-tag>
                  </div>
                  <div class="flex items-center p-3 bg-cold-gray-700 rounded-lg">
                    <div class="w-12 h-12 bg-cold-gray-600 rounded-lg flex items-center justify-center mr-4">
                      <span class="text-xl">🎯</span>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-medium">产品发布会</h4>
                      <p class="text-sm text-cold-gray-400">2026年7月20日 · 上海</p>
                    </div>
                    <el-tag type="warning" effect="dark">筹备中</el-tag>
                  </div>
                  <div class="flex items-center p-3 bg-cold-gray-700 rounded-lg">
                    <div class="w-12 h-12 bg-cold-gray-600 rounded-lg flex items-center justify-center mr-4">
                      <span class="text-xl">🎓</span>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-medium">年度培训课程</h4>
                      <p class="text-sm text-cold-gray-400">2026年8月10日 · 线上</p>
                    </div>
                    <el-tag type="info" effect="dark">报名中</el-tag>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能特性区域 -->
    <section class="features-section bg-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-cold-gray-900 mb-4">
            强大的功能，简单的体验
          </h2>
          <p class="text-lg text-cold-gray-600 max-w-3xl mx-auto">
            EventFlow 提供了一系列强大的功能，帮助您高效管理各类活动，从策划到执行，全程无忧。
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="feature-card bg-cold-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow border border-cold-gray-200">
            <div class="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mb-6">
              <span class="text-3xl">📆</span>
            </div>
            <h3 class="text-xl font-semibold text-cold-gray-900 mb-3">智能日程安排</h3>
            <p class="text-cold-gray-600 leading-relaxed">
              通过直观的日历界面，轻松规划和管理活动日程。支持拖拽操作，让时间安排变得简单高效。
            </p>
          </div>

          <div class="feature-card bg-cold-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow border border-cold-gray-200">
            <div class="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mb-6">
              <span class="text-3xl">👥</span>
            </div>
            <h3 class="text-xl font-semibold text-cold-gray-900 mb-3">参与者管理</h3>
            <p class="text-cold-gray-600 leading-relaxed">
              高效管理活动参与者，发送邀请、跟踪回复状态、管理签到流程，一切尽在掌握。
            </p>
          </div>

          <div class="feature-card bg-cold-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow border border-cold-gray-200">
            <div class="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mb-6">
              <span class="text-3xl">📊</span>
            </div>
            <h3 class="text-xl font-semibold text-cold-gray-900 mb-3">数据分析报告</h3>
            <p class="text-cold-gray-600 leading-relaxed">
              详细的数据分析和可视化报告，帮助您了解活动效果，优化未来活动策划。
            </p>
          </div>

          <div class="feature-card bg-cold-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow border border-cold-gray-200">
            <div class="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mb-6">
              <span class="text-3xl">💰</span>
            </div>
            <h3 class="text-xl font-semibold text-cold-gray-900 mb-3">预算管理</h3>
            <p class="text-cold-gray-600 leading-relaxed">
              精确控制活动预算，跟踪支出，生成财务报告，确保活动在预算范围内顺利进行。
            </p>
          </div>

          <div class="feature-card bg-cold-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow border border-cold-gray-200">
            <div class="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mb-6">
              <span class="text-3xl">🔔</span>
            </div>
            <h3 class="text-xl font-semibold text-cold-gray-900 mb-3">智能提醒</h3>
            <p class="text-cold-gray-600 leading-relaxed">
              自动发送活动提醒和通知，确保参与者及时了解活动信息，不错过任何重要环节。
            </p>
          </div>

          <div class="feature-card bg-cold-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow border border-cold-gray-200">
            <div class="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mb-6">
              <span class="text-3xl">🔒</span>
            </div>
            <h3 class="text-xl font-semibold text-cold-gray-900 mb-3">安全可靠</h3>
            <p class="text-cold-gray-600 leading-relaxed">
              采用企业级安全标准，保护您的数据安全，确保活动信息和参与者隐私得到充分保护。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 行动召唤区域 -->
    <section class="cta-section bg-gradient-to-r from-cold-gray-900 to-cold-gray-800 text-white py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          准备好开始您的活动管理之旅了吗？
        </h2>
        <p class="text-lg text-cold-gray-300 mb-8">
          加入数千名活动组织者，使用 EventFlow 简化您的活动管理流程，提升工作效率。
        </p>
        <el-button 
          type="primary" 
          size="large" 
          class="bg-accent-500 hover:bg-accent-600 border-none text-white px-10 py-4 text-lg font-medium rounded-lg shadow-lg transition-all transform hover:scale-105"
        >
          免费试用 14 天
        </el-button>
        <p class="mt-4 text-sm text-cold-gray-400">
          无需信用卡，随时取消
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.hero-section {
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at 25% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 75% 50%, rgba(6, 182, 212, 0.05) 0%, transparent 50%);
  pointer-events: none;
}
</style>