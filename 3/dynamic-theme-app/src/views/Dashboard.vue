<template>
  <div class="space-y-6">
    <el-row :gutter="20">
      <el-col :xs="24" :md="12" :lg="8">
        <ValidationForm />
      </el-col>
      <el-col :xs="24" :md="12" :lg="16">
        <AlertSection />
      </el-col>
    </el-row>
    
    <el-row :gutter="20">
      <el-col :xs="24" :md="12" :lg="8">
        <WeatherCard />
      </el-col>
      <el-col :xs="24" :md="12" :lg="8">
        <ForecastSlider />
      </el-col>
      <el-col :xs="24" :md="24" :lg="8">
        <HeartRateMonitor />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import ValidationForm from '../components/ValidationForm.vue'
import AlertSection from '../components/AlertSection.vue'
import WeatherCard from '../components/WeatherCard.vue'
import ForecastSlider from '../components/ForecastSlider.vue'
import HeartRateMonitor from '../components/HeartRateMonitor.vue'
</script>
