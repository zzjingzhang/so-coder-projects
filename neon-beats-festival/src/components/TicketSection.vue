<script setup lang="ts">
import { ref, computed } from 'vue'

interface Ticket {
  id: number
  name: string
  price: number
  originalPrice?: number
  description: string
  features: string[]
  recommended?: boolean
  color: string
}

interface SelectedTicket {
  ticketId: number
  quantity: number
}

const tickets = ref<Ticket[]>([
  {
    id: 1,
    name: '单日票',
    price: 399,
    originalPrice: 599,
    description: '选择任意一天进入音乐节，体验精彩演出',
    features: ['单日入场', '普通区域', '免费WiFi', '电子票'],
    color: 'electric-blue',
  },
  {
    id: 2,
    name: '三日通票',
    price: 999,
    originalPrice: 1499,
    description: '连续三天完整体验音乐节，不错过任何精彩',
    features: ['三天入场', '普通区域', '免费WiFi', '电子票', '专属周边'],
    recommended: true,
    color: 'purple-light',
  },
  {
    id: 3,
    name: 'VIP 通票',
    price: 2999,
    originalPrice: 3999,
    description: '尊享VIP体验，专属区域和专属服务',
    features: [
      '三天入场',
      'VIP专属区域',
      '免费WiFi',
      '电子票',
      '专属周边',
      'VIP休息区',
      '艺人见面会',
      '优先入场',
    ],
    color: 'neon-pink',
  },
])

const selectedTickets = ref<SelectedTicket[]>([
  { ticketId: 1, quantity: 0 },
  { ticketId: 2, quantity: 0 },
  { ticketId: 3, quantity: 0 },
])

const getTicketQuantity = (ticketId: number) => {
  const selected = selectedTickets.value.find((t) => t.ticketId === ticketId)
  return selected ? selected.quantity : 0
}

const isTicketSelected = (ticketId: number) => {
  return getTicketQuantity(ticketId) > 0
}

const updateQuantity = (ticketId: number, delta: number) => {
  const selected = selectedTickets.value.find((t) => t.ticketId === ticketId)
  if (selected) {
    const newQuantity = Math.max(0, Math.min(10, selected.quantity + delta))
    selected.quantity = newQuantity
  }
}

const totalPrice = computed(() => {
  return selectedTickets.value.reduce((total, selected) => {
    const ticket = tickets.value.find((t) => t.id === selected.ticketId)
    if (ticket && selected.quantity > 0) {
      return total + ticket.price * selected.quantity
    }
    return total
  }, 0)
})

const totalTickets = computed(() => {
  return selectedTickets.value.reduce((total, selected) => total + selected.quantity, 0)
})

const hasSelectedTickets = computed(() => {
  return totalTickets.value > 0
})

const checkout = () => {
  if (!hasSelectedTickets.value) return
  alert(`感谢您的购买！\n\n购票详情：\n${selectedTickets.value
    .map((s) => {
      const ticket = tickets.value.find((t) => t.id === s.ticketId)
      return ticket && s.quantity > 0 ? `- ${ticket.name} x ${s.quantity}: ¥${ticket.price * s.quantity}` : ''
    })
    .filter(Boolean)
    .join('\n')}\n\n总价: ¥${totalPrice.value}\n\n确认邮件将发送至您的邮箱。`)
}
</script>

<template>
  <section id="tickets" class="py-20 bg-gradient-to-b from-deep-purple to-purple-dark relative overflow-hidden">
    <div class="absolute top-20 left-10 w-72 h-72 bg-electric-blue/15 rounded-full blur-3xl animate-float-sway"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-neon-pink/15 rounded-full blur-3xl animate-float-sway-reverse"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-light/10 rounded-full blur-3xl animate-breathe-strong"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center mb-16">
        <span
          class="inline-block px-6 py-2 bg-gradient-to-r from-neon-pink/20 to-purple-light/20 border border-neon-pink/50 rounded-full text-neon-pink text-sm font-semibold tracking-wider uppercase mb-6 animate-border-glow-rotate"
        >
          限时早鸟价
        </span>
        <h2
          class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-neon-pink via-purple-light to-electric-blue text-gradient glow-text-strong animate-typography"
        >
          立即购票
        </h2>
        <p class="text-lg text-glow-white/70 max-w-2xl mx-auto">
          选择最适合您的票务方案，开启这场震撼的电子音乐之旅。早鸟票数量有限，先到先得！
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
        <div
          v-for="ticket in tickets"
          :key="ticket.id"
          :class="[
            'relative rounded-3xl overflow-hidden transition-all duration-700 transform',
            'hover:-translate-y-4 hover:scale-[1.02]',
            ticket.recommended
              ? 'bg-gradient-to-b from-purple-light/30 via-purple-dark/50 to-purple-dark/70 border-2 border-purple-light/50 shadow-2xl shadow-purple-light/30'
              : 'bg-purple-dark/50 border border-purple-medium/30 hover:border-electric-blue/50',
            isTicketSelected(ticket.id)
              ? 'ring-4 ring-electric-blue/60 shadow-[0_0_60px_rgba(0,212,255,0.4)]'
              : ''
          ]"
        >
          <div class="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700">
            <div
              :class="[
                'absolute inset-0 opacity-30 blur-xl',
                ticket.color === 'electric-blue' ? 'bg-gradient-to-br from-electric-blue/50 to-transparent' :
                ticket.color === 'purple-light' ? 'bg-gradient-to-br from-purple-light/50 to-transparent' :
                'bg-gradient-to-br from-neon-pink/50 to-transparent'
              ]"
            ></div>
          </div>

          <div
            v-if="ticket.recommended"
            class="absolute top-0 right-0 z-10"
          >
            <div
              class="bg-gradient-to-r from-electric-blue to-purple-light text-glow-white text-xs font-bold px-4 py-1 rounded-bl-xl animate-pulse-glow-strong shadow-lg shadow-electric-blue/50"
            >
              最受欢迎
            </div>
          </div>

          <div class="p-6 sm:p-8 relative z-10">
            <div
              :class="[
                'w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500',
                ticket.color === 'electric-blue' ? 'bg-electric-blue/20 hover:bg-electric-blue/30' :
                ticket.color === 'purple-light' ? 'bg-purple-light/20 hover:bg-purple-light/30' :
                'bg-neon-pink/20 hover:bg-neon-pink/30',
                isTicketSelected(ticket.id) ? 'animate-breathe-strong shadow-lg' : ''
              ]"
            >
              <svg
                :class="[
                  'w-7 h-7 transition-transform duration-500 hover:scale-110',
                  ticket.color === 'electric-blue' ? 'text-electric-blue' :
                  ticket.color === 'purple-light' ? 'text-purple-light' :
                  'text-neon-pink'
                ]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm10 0h2v2h-2zm-6-4h8v2h-8z" />
              </svg>
            </div>

            <h3
              :class="[
                'text-2xl font-extrabold mb-2 transition-all duration-300',
                ticket.color === 'electric-blue' ? 'text-electric-blue' :
                ticket.color === 'purple-light' ? 'text-purple-light' :
                'text-neon-pink'
              ]"
            >
              {{ ticket.name }}
            </h3>
            <p class="text-glow-white/60 mb-6 text-sm">{{ ticket.description }}</p>

            <div class="mb-6">
              <div class="flex items-baseline gap-3 mb-2">
                <span
                  :class="[
                    'text-4xl font-extrabold text-glow-white transition-all duration-300',
                    isTicketSelected(ticket.id) ? 'animate-breathe text-electric-blue' : ''
                  ]"
                >
                  ¥{{ ticket.price }}
                </span>
                <span
                  v-if="ticket.originalPrice"
                  class="text-lg text-glow-white/40 line-through"
                >
                  ¥{{ ticket.originalPrice }}
                </span>
              </div>
              <div
                v-if="ticket.originalPrice"
                class="inline-flex items-center gap-1 text-sm"
              >
                <span
                  :class="[
                    'font-bold',
                    ticket.color === 'electric-blue' ? 'text-electric-blue' :
                    ticket.color === 'purple-light' ? 'text-purple-light' :
                    'text-neon-pink'
                  ]"
                >
                  节省 ¥{{ ticket.originalPrice - ticket.price }}
                </span>
                <span class="text-glow-white/40">（早鸟优惠）</span>
              </div>
            </div>

            <div class="space-y-3 mb-8">
              <div
                v-for="(feature, index) in ticket.features"
                :key="feature"
                class="flex items-center gap-3 text-glow-white/80 transition-all duration-300 hover:text-glow-white"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <svg
                  :class="[
                    'w-5 h-5 flex-shrink-0 transition-transform duration-300 hover:scale-125',
                    ticket.color === 'electric-blue' ? 'text-electric-blue' :
                    ticket.color === 'purple-light' ? 'text-purple-light' :
                    'text-neon-pink'
                  ]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span class="text-sm">{{ feature }}</span>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <button
                  @click="updateQuantity(ticket.id, -1)"
                  :class="[
                    'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform',
                    'hover:scale-110 active:scale-95',
                    getTicketQuantity(ticket.id) > 0
                      ? 'bg-gradient-to-br from-purple-medium/70 to-purple-dark/50 text-glow-white hover:from-purple-medium hover:to-purple-dark shadow-lg shadow-purple-medium/30 border border-purple-light/30'
                      : 'bg-purple-dark/50 text-glow-white/30 cursor-not-allowed border border-purple-medium/20'
                  ]"
                  :disabled="getTicketQuantity(ticket.id) <= 0"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <span
                  :class="[
                    'text-3xl font-extrabold w-12 text-center transition-all duration-500',
                    isTicketSelected(ticket.id)
                      ? 'text-electric-blue scale-110 drop-shadow-[0_0_20px_rgba(0,212,255,0.6)]'
                      : 'text-glow-white'
                  ]"
                >
                  {{ getTicketQuantity(ticket.id) }}
                </span>
                <button
                  @click="updateQuantity(ticket.id, 1)"
                  :class="[
                    'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform',
                    'hover:scale-110 active:scale-95',
                    getTicketQuantity(ticket.id) < 10
                      ? 'bg-gradient-to-br from-purple-medium/70 to-purple-dark/50 text-glow-white hover:from-purple-medium hover:to-purple-dark shadow-lg shadow-purple-medium/30 border border-purple-light/30'
                      : 'bg-purple-dark/50 text-glow-white/30 cursor-not-allowed border border-purple-medium/20'
                  ]"
                  :disabled="getTicketQuantity(ticket.id) >= 10"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <transition name="checkout-slide">
        <div
          v-if="hasSelectedTickets"
          class="sticky bottom-4 z-40 animate-slide-up"
        >
          <div
            class="max-w-4xl mx-auto bg-gradient-to-r from-purple-dark/95 via-deep-purple/95 to-purple-dark/95 backdrop-blur-xl rounded-2xl border-2 border-electric-blue/50 shadow-2xl shadow-electric-blue/40 p-4 sm:p-6 animate-border-glow-rotate"
          >
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div
                  class="w-14 h-14 rounded-xl bg-gradient-to-br from-electric-blue to-purple-light flex items-center justify-center animate-breathe-strong shadow-lg shadow-electric-blue/50"
                >
                  <svg class="w-7 h-7 text-glow-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </div>
                <div>
                  <div class="text-sm text-glow-white/60 mb-1">
                    已选择 <span class="text-electric-blue font-bold text-lg animate-pulse">{{ totalTickets }}</span> 张票
                  </div>
                  <div class="text-3xl font-extrabold text-glow-white">
                    总价: <span class="text-electric-blue animate-breathe">¥{{ totalPrice }}</span>
                  </div>
                </div>
              </div>
              <button
                @click="checkout"
                class="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-electric-blue via-purple-light to-neon-pink rounded-xl font-bold text-lg text-glow-white hover:shadow-[0_0_60px_rgba(0,212,255,0.6)] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-pulse-glow-strong"
              >
                立即结算
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<style scoped>
.checkout-slide-enter-active,
.checkout-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.checkout-slide-enter-from,
.checkout-slide-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}
</style>
