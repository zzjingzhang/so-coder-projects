<script setup>
import { ref, computed } from 'vue'

const purchasePrice = ref('')
const loanYears = ref('')
const loanType = ref('fund')
const paymentType = ref('equalInterest')

const loanInterestRate = computed(() => {
  if (loanType.value === 'fund') {
    return 3.3
  } else {
    return 4.9
  }
})

const monthlyRate = computed(() => {
  return loanInterestRate.value / 100 / 12
})

const loanMonths = computed(() => {
  if (!loanYears.value) return 0
  const years = typeof loanYears.value === 'object' 
    ? loanYears.value.value 
    : loanYears.value
  return parseInt(years) * 12
})

const calculateEqualInterest = (principal, monthlyRate, months) => {
  if (principal <= 0 || months <= 0) return 0
  
  const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / 
    (Math.pow(1 + monthlyRate, months) - 1)
  
  return monthlyPayment
}

const calculateEqualPrincipal = (principal, monthlyRate, months, currentMonth) => {
  if (principal <= 0 || months <= 0) return { principal: 0, interest: 0, total: 0 }
  
  const monthlyPrincipal = principal / months
  const remainingPrincipal = principal - (currentMonth - 1) * monthlyPrincipal
  const monthlyInterest = remainingPrincipal * monthlyRate
  
  return {
    principal: monthlyPrincipal,
    interest: monthlyInterest,
    total: monthlyPrincipal + monthlyInterest
  }
}

const result = computed(() => {
  if (!purchasePrice.value || !loanYears.value) {
    return null
  }
  
  const principal = parseFloat(purchasePrice.value)
  const months = loanMonths.value
  
  if (principal <= 0 || months <= 0) {
    return null
  }
  
  const rate = monthlyRate.value
  
  if (paymentType.value === 'equalInterest') {
    const monthlyPayment = calculateEqualInterest(principal, rate, months)
    const totalPayment = monthlyPayment * months
    const totalInterest = totalPayment - principal
    
    return {
      type: 'equalInterest',
      monthlyPayment,
      totalPayment,
      totalInterest,
      months
    }
  } else {
    const firstMonth = calculateEqualPrincipal(principal, rate, months, 1)
    const lastMonth = calculateEqualPrincipal(principal, rate, months, months)
    
    let totalInterest = 0
    for (let i = 1; i <= months; i++) {
      totalInterest += calculateEqualPrincipal(principal, rate, months, i).interest
    }
    
    const totalPayment = principal + totalInterest
    
    return {
      type: 'equalPrincipal',
      firstMonthPayment: firstMonth.total,
      lastMonthPayment: lastMonth.total,
      totalPayment,
      totalInterest,
      months,
      monthlyPrincipalDecrease: firstMonth.total - lastMonth.total
    }
  }
})

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '¥0.00'
  return '¥' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const formatNumber = (num) => {
  if (num === null || num === undefined) return '0'
  return num.toLocaleString('zh-CN')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">
          🏠 房贷计算器
        </h1>
        <p class="text-gray-600 text-lg">轻松计算您的每月还款金额</p>
      </div>

      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="grid md:grid-cols-2 gap-8">
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                购买价格（元）
              </label>
              <v-text-field
                v-model="purchasePrice"
                type="number"
                placeholder="请输入房屋总价"
                prepend-inner-icon="mdi-home"
                density="compact"
                variant="outlined"
                :rules="[
                  (v) => !!v || '请输入购买价格',
                  (v) => v > 0 || '购买价格必须大于0'
                ]"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                贷款年限（年）
              </label>
              <v-select
                v-model="loanYears"
                :items="[
                  { title: '1年', value: '1' },
                  { title: '5年', value: '5' },
                  { title: '10年', value: '10' },
                  { title: '15年', value: '15' },
                  { title: '20年', value: '20' },
                  { title: '25年', value: '25' },
                  { title: '30年', value: '30' }
                ]"
                item-title="title"
                item-value="value"
                placeholder="请选择贷款年限"
                density="compact"
                variant="outlined"
                :return-object="false"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                贷款类型
              </label>
              <v-btn-toggle
                v-model="loanType"
                mandatory
                density="default"
                variant="outlined"
                class="w-full"
              >
                <v-btn
                  value="fund"
                  class="flex-1 min-h-12"
                >
                  <div class="text-center">
                    <div class="font-semibold">公积金贷款</div>
                    <div class="text-sm opacity-80 mt-1">年利率 3.3%</div>
                  </div>
                </v-btn>
                <v-btn
                  value="commercial"
                  class="flex-1 min-h-12"
                >
                  <div class="text-center">
                    <div class="font-semibold">商业贷款</div>
                    <div class="text-sm opacity-80 mt-1">年利率 4.9%</div>
                  </div>
                </v-btn>
              </v-btn-toggle>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                还款方式
              </label>
              <v-btn-toggle
                v-model="paymentType"
                mandatory
                density="default"
                variant="outlined"
                class="w-full"
              >
                <v-btn
                  value="equalInterest"
                  class="flex-1 min-h-12"
                >
                  <div class="text-center">
                    <div class="font-semibold">等额本息</div>
                    <div class="text-xs opacity-80 mt-1">每月还款固定</div>
                  </div>
                </v-btn>
                <v-btn
                  value="equalPrincipal"
                  class="flex-1 min-h-12"
                >
                  <div class="text-center">
                    <div class="font-semibold">等额本金</div>
                    <div class="text-xs opacity-80 mt-1">每月递减</div>
                  </div>
                </v-btn>
              </v-btn-toggle>
            </div>

            <v-alert 
              type="info" 
              density="compact"
              class="mt-4"
            >
              <template #prepend>
                <v-icon>mdi-information</v-icon>
              </template>
              <div class="text-sm">
                <p><strong>等额本息：</strong>每月还款金额固定，前期利息占比大</p>
                <p><strong>等额本金：</strong>每月还款本金固定，利息逐月递减，前期压力大</p>
              </div>
            </v-alert>
          </div>

          <div class="space-y-6">
            <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
              <h3 class="text-lg font-semibold mb-4 opacity-90">计算结果</h3>
              
              <v-divider class="my-4" color="white" opacity="0.3"></v-divider>
              
              <div v-if="result" class="space-y-4">
                <div v-if="result.type === 'equalInterest'">
                  <p class="text-sm opacity-80 mb-1">每月还款</p>
                  <p class="text-4xl font-bold">{{ formatCurrency(result.monthlyPayment) }}</p>
                </div>
                
                <div v-else>
                  <p class="text-sm opacity-80 mb-1">首月还款</p>
                  <p class="text-3xl font-bold">{{ formatCurrency(result.firstMonthPayment) }}</p>
                  <p class="text-sm opacity-70 mt-2">
                    末月还款：{{ formatCurrency(result.lastMonthPayment) }}
                  </p>
                  <p class="text-sm opacity-70">
                    每月递减：{{ formatCurrency(result.monthlyPrincipalDecrease / (result.months - 1)) }}
                  </p>
                </div>
                
                <v-divider class="my-4" color="white" opacity="0.3"></v-divider>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm opacity-80">贷款总额</p>
                    <p class="text-xl font-semibold">{{ formatCurrency(parseFloat(purchasePrice)) }}</p>
                  </div>
                  <div>
                    <p class="text-sm opacity-80">还款总额</p>
                    <p class="text-xl font-semibold">{{ formatCurrency(result.totalPayment) }}</p>
                  </div>
                  <div>
                    <p class="text-sm opacity-80">支付利息</p>
                    <p class="text-xl font-semibold text-yellow-200">{{ formatCurrency(result.totalInterest) }}</p>
                  </div>
                  <div>
                    <p class="text-sm opacity-80">还款月数</p>
                    <p class="text-xl font-semibold">{{ formatNumber(result.months) }} 月</p>
                  </div>
                </div>
              </div>
              
              <div v-else class="text-center py-8">
                <v-icon size="48" class="mb-2 opacity-50">mdi-calculator</v-icon>
                <p class="opacity-70">请输入购买价格和贷款年限</p>
              </div>
            </div>

            <div class="bg-gray-50 rounded-xl p-5">
              <h4 class="font-semibold text-gray-700 mb-3">贷款详情</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">贷款利率：</span>
                  <span class="font-medium text-gray-800">{{ loanInterestRate }}% / 年</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">贷款类型：</span>
                  <span class="font-medium text-gray-800">
                    {{ loanType === 'fund' ? '公积金贷款' : '商业贷款' }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">还款方式：</span>
                  <span class="font-medium text-gray-800">
                    {{ paymentType === 'equalInterest' ? '等额本息' : '等额本金' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-8 text-gray-500 text-sm">
        <p>📋 说明：计算结果仅供参考，实际还款金额以银行为准</p>
      </div>
    </div>
  </div>
</template>
