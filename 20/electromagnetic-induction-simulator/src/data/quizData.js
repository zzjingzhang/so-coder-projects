export const quizQuestions = [
  {
    id: 1,
    question: '根据法拉第电磁感应定律，感应电动势的大小与什么成正比？',
    category: '法拉第定律',
    difficulty: 'easy',
    options: [
      { id: 'A', text: '磁通量的大小' },
      { id: 'B', text: '磁通量变化率的大小' },
      { id: 'C', text: '磁铁的速度' },
      { id: 'D', text: '线圈的匝数' }
    ],
    correctAnswer: 'B',
    explanation: '法拉第电磁感应定律指出：感应电动势 ε = -dΦ/dt，其中 dΦ/dt 表示磁通量随时间的变化率。感应电动势的大小与磁通量变化率成正比，负号表示感应电动势的方向（楞次定律）。'
  },
  {
    id: 2,
    question: '楞次定律的核心思想是什么？',
    category: '楞次定律',
    difficulty: 'easy',
    options: [
      { id: 'A', text: '感应电流总是增强原磁场' },
      { id: 'B', text: '感应电流产生的磁场总是阻碍引起感应电流的磁通量的变化' },
      { id: 'C', text: '感应电流方向由右手定则确定' },
      { id: 'D', text: '感应电流大小与磁铁质量成正比' }
    ],
    correctAnswer: 'B',
    explanation: '楞次定律是电磁感应中的重要定律，它指出：感应电流产生的磁场，总是阻碍引起感应电流的磁通量的变化。这是能量守恒定律在电磁感应现象中的具体体现。'
  },
  {
    id: 3,
    question: '当磁铁的N极快速插入线圈时，关于感应电流产生的磁场，下列说法正确的是？',
    category: '楞次定律',
    difficulty: 'medium',
    options: [
      { id: 'A', text: '感应磁场的N极朝向磁铁的N极，阻碍磁铁进入' },
      { id: 'B', text: '感应磁场的S极朝向磁铁的N极，吸引磁铁进入' },
      { id: 'C', text: '感应磁场方向与原磁场方向相同' },
      { id: 'D', text: '不会产生感应磁场' }
    ],
    correctAnswer: 'A',
    explanation: '根据楞次定律，当N极插入线圈时，穿过线圈的磁通量增加，感应电流产生的磁场会阻碍这种增加。因此，感应磁场在朝向磁铁一侧也表现为N极，与磁铁的N极相互排斥，阻碍磁铁的进入。'
  },
  {
    id: 4,
    question: '下列哪种情况不会产生感应电流？',
    category: '感应条件',
    difficulty: 'medium',
    options: [
      { id: 'A', text: '磁铁快速插入静止的线圈' },
      { id: 'B', text: '线圈快速套入静止的磁铁' },
      { id: 'C', text: '磁铁和线圈以相同速度同向运动' },
      { id: 'D', text: '旋转的线圈靠近静止的磁铁' }
    ],
    correctAnswer: 'C',
    explanation: '感应电流产生的条件是穿过闭合回路的磁通量发生变化。当磁铁和线圈以相同速度同向运动时，两者相对静止，穿过线圈的磁通量不随时间变化，因此不会产生感应电流。'
  },
  {
    id: 5,
    question: '关于感应电流的方向，下列说法正确的是？',
    category: '电流方向',
    difficulty: 'medium',
    options: [
      { id: 'A', text: '磁铁接近和离开线圈时，感应电流方向相同' },
      { id: 'B', text: '磁铁接近和离开线圈时，感应电流方向相反' },
      { id: 'C', text: '感应电流方向只与磁铁的N极S极有关，与运动方向无关' },
      { id: 'D', text: '感应电流方向无法预测' }
    ],
    correctAnswer: 'B',
    explanation: '根据楞次定律，感应电流的方向取决于磁通量变化的方向。磁铁接近时磁通量增加，感应电流产生的磁场阻碍增加；磁铁离开时磁通量减少，感应电流产生的磁场阻碍减少。这两种情况的感应电流方向相反。'
  },
  {
    id: 6,
    question: '下列哪个公式正确表达了法拉第电磁感应定律？',
    category: '法拉第定律',
    difficulty: 'easy',
    options: [
      { id: 'A', text: 'ε = dΦ/dt' },
      { id: 'B', text: 'ε = -dΦ/dt' },
      { id: 'C', text: 'ε = Φ × t' },
      { id: 'D', text: 'ε = dΦ + dt' }
    ],
    correctAnswer: 'B',
    explanation: '法拉第电磁感应定律的完整表达式为 ε = -dΦ/dt。其中：ε 是感应电动势，Φ 是磁通量，t 是时间。负号表示感应电动势的方向遵循楞次定律，即感应电流产生的磁场阻碍原磁通量的变化。'
  },
  {
    id: 7,
    question: '当磁铁快速移动时与慢速移动时，感应电流有什么不同？',
    category: '感应强度',
    difficulty: 'medium',
    options: [
      { id: 'A', text: '快速移动时感应电流更大，因为磁通量变化率更大' },
      { id: 'B', text: '慢速移动时感应电流更大，因为有更多时间产生电流' },
      { id: 'C', text: '速度不影响感应电流的大小' },
      { id: 'D', text: '快速移动时方向相反' }
    ],
    correctAnswer: 'A',
    explanation: '根据法拉第定律 ε = -dΦ/dt，感应电动势（及相应的感应电流）的大小与磁通量变化率成正比。磁铁快速移动时，磁通量随时间变化更快（dΦ/dt 更大），因此产生的感应电流也更大。'
  },
  {
    id: 8,
    question: '楞次定律体现了哪个基本物理定律？',
    category: '物理本质',
    difficulty: 'hard',
    options: [
      { id: 'A', text: '动量守恒定律' },
      { id: 'B', text: '能量守恒定律' },
      { id: 'C', text: '电荷守恒定律' },
      { id: 'D', text: '质量守恒定律' }
    ],
    correctAnswer: 'B',
    explanation: '楞次定律是能量守恒定律在电磁感应现象中的具体体现。如果感应电流不是阻碍而是促进磁通量的变化，那么只需要一点点初始的推动力，系统就会不断加速并产生无限能量，这违背了能量守恒定律。'
  },
  {
    id: 9,
    question: '关于磁通量Φ，下列说法正确的是？',
    category: '磁通量',
    difficulty: 'medium',
    options: [
      { id: 'A', text: '磁通量越大，感应电流一定越大' },
      { id: 'B', text: '磁通量为零时，感应电流一定为零' },
      { id: 'C', text: '磁通量变化率越大，感应电流越大' },
      { id: 'D', text: '磁通量与感应电流无关' }
    ],
    correctAnswer: 'C',
    explanation: '感应电流的大小取决于磁通量的变化率（dΦ/dt），而不是磁通量本身的大小。即使磁通量很大，如果它不随时间变化，也不会产生感应电流。反之，即使磁通量很小或为零，但如果它正在快速变化，也会产生很大的感应电流。'
  },
  {
    id: 10,
    question: '当磁铁的N极从线圈中抽出时，线圈中感应电流产生的磁场方向是？',
    category: '楞次定律',
    difficulty: 'hard',
    options: [
      { id: 'A', text: '与原磁场方向相同，试图保持磁通量' },
      { id: 'B', text: '与原磁场方向相反，阻碍磁铁离开' },
      { id: 'C', text: '垂直于原磁场方向' },
      { id: 'D', text: '不会产生磁场' }
    ],
    correctAnswer: 'A',
    explanation: '根据楞次定律，感应电流产生的磁场总是阻碍引起感应电流的磁通量变化。当N极抽出时，穿过线圈的磁通量减少，感应电流产生的磁场会试图"维持"原有的磁通量，因此其方向与原磁场方向相同（即在线圈靠近磁铁一侧表现为S极，吸引磁铁的N极，阻碍其离开）。'
  }
]

export const categories = [
  { id: 'all', name: '全部题目', icon: '📚' },
  { id: '法拉第定律', name: '法拉第定律', icon: '⚡' },
  { id: '楞次定律', name: '楞次定律', icon: '🧭' },
  { id: '感应条件', name: '感应条件', icon: '🔍' },
  { id: '电流方向', name: '电流方向', icon: '→' },
  { id: '感应强度', name: '感应强度', icon: '📊' },
  { id: '物理本质', name: '物理本质', icon: '💡' },
  { id: '磁通量', name: '磁通量', icon: 'Φ' }
]

export const getDifficultyLabel = (difficulty) => {
  const labels = {
    easy: { text: '简单', color: 'text-green-400', bg: 'bg-green-900/30' },
    medium: { text: '中等', color: 'text-yellow-400', bg: 'bg-yellow-900/30' },
    hard: { text: '困难', color: 'text-red-400', bg: 'bg-red-900/30' }
  }
  return labels[difficulty] || labels.medium
}
