// 收支记录数据
export const transactions = [
  { id: 1, type: 'income', category: '工资', amount: 15000, date: '2026-04-01', description: '4月份工资' },
  { id: 2, type: 'expense', category: '餐饮', amount: 150, date: '2026-04-02', description: '午餐' },
  { id: 3, type: 'expense', category: '交通', amount: 50, date: '2026-04-03', description: '打车' },
  { id: 4, type: 'income', category: '投资收益', amount: 2000, date: '2026-04-05', description: '股票收益' },
  { id: 5, type: 'expense', category: '购物', amount: 800, date: '2026-04-06', description: '买衣服' },
  { id: 6, type: 'expense', category: '餐饮', amount: 200, date: '2026-04-07', description: '朋友聚餐' },
  { id: 7, type: 'expense', category: '娱乐', amount: 100, date: '2026-04-08', description: '看电影' },
  { id: 8, type: 'income', category: '奖金', amount: 3000, date: '2026-04-10', description: '季度奖金' },
  { id: 9, type: 'expense', category: '住房', amount: 3000, date: '2026-04-15', description: '房租' },
  { id: 10, type: 'expense', category: '医疗', amount: 200, date: '2026-04-18', description: '买药' }
]

// 预算数据
export const budgets = [
  { id: 1, category: '餐饮', amount: 3000, spent: 1200, month: '2026-04' },
  { id: 2, category: '交通', amount: 1000, spent: 350, month: '2026-04' },
  { id: 3, category: '购物', amount: 2000, spent: 800, month: '2026-04' },
  { id: 4, category: '娱乐', amount: 500, spent: 150, month: '2026-04' },
  { id: 5, category: '住房', amount: 3000, spent: 3000, month: '2026-04' },
  { id: 6, category: '医疗', amount: 500, spent: 200, month: '2026-04' }
]

// 投资数据
export const investments = [
  { id: 1, name: '贵州茅台', type: '股票', code: '600519', shares: 10, buyPrice: 1800, currentPrice: 1950, purchaseDate: '2026-01-15' },
  { id: 2, name: '腾讯控股', type: '股票', code: '00700.HK', shares: 50, buyPrice: 350, currentPrice: 380, purchaseDate: '2026-02-20' },
  { id: 3, name: '易方达蓝筹精选', type: '基金', code: '005827', shares: 1000, buyPrice: 2.5, currentPrice: 2.8, purchaseDate: '2026-01-10' },
  { id: 4, name: '余额宝', type: '理财', code: '-', shares: 50000, buyPrice: 1, currentPrice: 1.02, purchaseDate: '2026-01-01' },
  { id: 5, name: '招商银行', type: '股票', code: '600036', shares: 100, buyPrice: 35, currentPrice: 38, purchaseDate: '2026-03-01' }
]

// 账单提醒数据
export const bills = [
  { id: 1, name: '房租', amount: 3000, dueDate: '2026-04-30', type: '每月', status: 'pending', description: '每月房租' },
  { id: 2, name: '信用卡还款', amount: 5000, dueDate: '2026-04-25', type: '每月', status: 'pending', description: '招商银行信用卡' },
  { id: 3, name: '水电费', amount: 500, dueDate: '2026-04-20', type: '每月', status: 'paid', description: '水电费账单' },
  { id: 4, name: '网络费', amount: 100, dueDate: '2026-04-28', type: '每月', status: 'pending', description: '宽带费用' },
  { id: 5, name: '保险费', amount: 8000, dueDate: '2026-05-15', type: '每年', status: 'pending', description: '年度保险费' }
]

// 收支分类
export const categories = {
  income: ['工资', '奖金', '投资收益', '兼职', '其他收入'],
  expense: ['餐饮', '交通', '购物', '娱乐', '住房', '医疗', '教育', '其他支出']
}

// 投资类型
export const investmentTypes = ['股票', '基金', '理财', '债券', '其他']
