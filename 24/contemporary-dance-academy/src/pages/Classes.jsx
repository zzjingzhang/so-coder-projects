import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Tag, Tabs, Avatar, Rate, Select, Input } from 'antd'
import { SearchOutlined, FilterOutlined, CalendarOutlined, ArrowRightOutlined, StarOutlined } from '@ant-design/icons'

const { Option } = Select

const allCourses = [
  {
    id: 1,
    name: '现代舞基础',
    type: 'modern',
    category: '现代舞',
    level: '初级',
    instructor: '李梦',
    rating: 4.9,
    students: 128,
    price: 180,
    duration: 90,
    description: '适合零基础学员，从基本站姿、呼吸控制开始，逐步学习现代舞的基本动作和表达方式。课程内容包括：身体放松技巧、地面动作训练、站立动作组合、简单的舞蹈编排。',
    features: ['小班教学', '专业导师', '免费试听', '随时退款'],
    schedule: ['周一 10:00', '周三 14:00', '周五 19:00', '周六 09:00'],
    suitableFor: ['零基础学员', '希望提升身体素质者', '对现代舞感兴趣者'],
  },
  {
    id: 2,
    name: '现代舞进阶',
    type: 'modern',
    category: '现代舞',
    level: '中级',
    instructor: '李梦',
    rating: 4.9,
    students: 86,
    price: 220,
    duration: 90,
    description: '深入学习现代舞技巧，包括地面技巧、跳跃和转身，提升舞蹈表现力。适合有一定基础的学员，内容涵盖：接触即兴、释放技巧、双人舞配合、舞台表演技巧。',
    features: ['技巧提升', '成品舞教学', '舞台实践', '专业指导'],
    schedule: ['周二 10:00', '周四 14:00', '周日 14:00'],
    suitableFor: ['有现代舞基础者', '希望提升技巧者', '准备参加比赛者'],
  },
  {
    id: 3,
    name: '爵士舞入门',
    type: 'jazz',
    category: '爵士舞',
    level: '初级',
    instructor: '张伟',
    rating: 4.8,
    students: 156,
    price: 180,
    duration: 90,
    description: '学习爵士舞的基本步伐、节奏感和身体控制，感受爵士舞的热情与活力。课程内容包括：基础步伐训练、节奏感培养、身体隔离训练、简单成品舞学习。',
    features: ['零基础友好', '潮流音乐', '自由氛围', '趣味性强'],
    schedule: ['周一 19:00', '周三 19:00', '周五 19:00', '周六 14:00'],
    suitableFor: ['零基础学员', '喜欢流行音乐者', '希望释放压力者'],
  },
  {
    id: 4,
    name: '爵士舞进阶',
    type: 'jazz',
    category: '爵士舞',
    level: '中级',
    instructor: '张伟',
    rating: 4.8,
    students: 96,
    price: 220,
    duration: 90,
    description: '深入学习爵士舞技巧，包括各种风格的编排和表演，提升舞蹈表现力和舞台魅力。内容涵盖：Power Jazz、Street Jazz、Sexy Jazz 等多种风格。',
    features: ['技巧提升', '成品舞教学', '舞台实践', '编舞学习'],
    schedule: ['周二 19:00', '周四 19:00', '周日 09:00'],
    suitableFor: ['有爵士舞基础者', '希望学习多种风格者', '准备参加演出者'],
  },
  {
    id: 5,
    name: '街舞基础',
    type: 'hiphop',
    category: '街舞',
    level: '初级',
    instructor: '王芳',
    rating: 4.7,
    students: 145,
    price: 180,
    duration: 90,
    description: '从最基础的律动开始，学习街舞的基本元素和风格，展现自我个性。课程内容包括：基础律动、Toprock、Footwork、Freeze 等基础技巧。',
    features: ['零基础友好', '潮流文化', '自由表达', '燃脂塑形'],
    schedule: ['周一 16:00', '周三 16:00', '周五 16:00', '周六 16:00'],
    suitableFor: ['零基础学员', '喜欢街头文化者', '青少年群体'],
  },
  {
    id: 6,
    name: '街舞进阶',
    type: 'hiphop',
    category: '街舞',
    level: '中级',
    instructor: '王芳',
    rating: 4.8,
    students: 78,
    price: 220,
    duration: 90,
    description: '深入学习 Breaking、Popping、Locking 等街舞风格，提升技巧和表现力。适合有一定基础的学员，内容涵盖：Power Move 训练、Battle 技巧、Freestyle 能力培养。',
    features: ['技巧提升', 'Battle 训练', 'Freestyle 培养', '比赛指导'],
    schedule: ['周二 16:00', '周四 16:00', '周日 16:00'],
    suitableFor: ['有街舞基础者', '希望参加 Battle 者', '专业舞者'],
  },
  {
    id: 7,
    name: '芭蕾基训',
    type: 'ballet',
    category: '芭蕾舞',
    level: '初级',
    instructor: '陈静',
    rating: 4.9,
    students: 89,
    price: 220,
    duration: 90,
    description: '系统学习芭蕾舞的基本功，包括站姿、手位、脚位等，为各类舞蹈打下坚实基础。课程内容包括：芭蕾基训、形体塑造、柔韧性训练、核心力量训练。',
    features: ['专业体系', '形体塑造', '气质提升', '科学训练'],
    schedule: ['周一 09:00', '周三 09:00', '周五 09:00', '周六 09:00'],
    suitableFor: ['零基础学员', '希望提升气质者', '少儿及成人'],
  },
  {
    id: 8,
    name: '中国古典舞',
    type: 'chinese',
    category: '中国舞',
    level: '中级',
    instructor: '刘洋',
    rating: 4.8,
    students: 67,
    price: 220,
    duration: 90,
    description: '学习中国古典舞的身韵、身法和技巧，感受中国传统文化的独特魅力。内容涵盖：身韵元素训练、古典舞技巧、汉唐舞蹈、水袖舞等。',
    features: ['传统文化', '身韵训练', '技巧提升', '艺术熏陶'],
    schedule: ['周二 09:00', '周四 09:00', '周日 09:00'],
    suitableFor: ['有舞蹈基础者', '喜欢传统文化者', '希望提升表现力者'],
  },
  {
    id: 9,
    name: '当代舞创作',
    type: 'contemporary',
    category: '当代舞',
    level: '高级',
    instructor: '赵雪',
    rating: 4.9,
    students: 45,
    price: 280,
    duration: 120,
    description: '探索当代舞的即兴创作方法，学习如何表达情感和讲述故事。课程内容包括：即兴技巧、编舞方法、主题创作、作品呈现。',
    features: ['创作培养', '即兴训练', '作品呈现', '艺术表达'],
    schedule: ['周三 19:00', '周六 10:00'],
    suitableFor: ['有丰富舞蹈经验者', '希望学习编舞者', '专业舞者'],
  },
]

const categories = [
  { key: 'all', label: '全部课程' },
  { key: 'modern', label: '现代舞' },
  { key: 'jazz', label: '爵士舞' },
  { key: 'hiphop', label: '街舞' },
  { key: 'ballet', label: '芭蕾舞' },
  { key: 'chinese', label: '中国舞' },
  { key: 'contemporary', label: '当代舞' },
]

const getLevelColor = (level) => {
  const colors = {
    初级: 'success',
    中级: 'warning',
    高级: 'error',
  }
  return colors[level] || 'default'
}

const getCategoryColor = (category) => {
  const colors = {
    现代舞: 'pink',
    爵士舞: 'orange',
    街舞: 'blue',
    芭蕾舞: 'purple',
    中国舞: 'green',
    当代舞: 'red',
  }
  return colors[category] || 'default'
}

const Classes = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')

  const filteredCourses = allCourses.filter((course) => {
    const matchCategory = activeCategory === 'all' || course.type === activeCategory
    const matchSearch = !searchText || 
      course.name.toLowerCase().includes(searchText.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchText.toLowerCase()) ||
      course.description.toLowerCase().includes(searchText.toLowerCase())
    const matchLevel = levelFilter === 'all' || course.level === levelFilter
    return matchCategory && matchSearch && matchLevel
  })

  const tabItems = categories.map((category) => ({
    key: category.key,
    label: category.label,
  }))

  return (
    <div className="bg-black min-h-screen">
      <div className="relative py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Tag color="pink" className="text-sm px-4 py-1 mb-4">
              课程中心
            </Tag>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              精选舞蹈课程
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              无论您是零基础还是有一定基础，我们都有适合您的课程
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="搜索课程名称、导师..."
                prefix={<SearchOutlined className="text-gray-500" />}
                size="large"
                className="bg-gray-800 border-gray-700"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </div>
            <div className="w-full lg:w-48">
              <Select
                placeholder="难度等级"
                size="large"
                className="w-full"
                value={levelFilter}
                onChange={setLevelFilter}
                suffixIcon={<FilterOutlined />}
              >
                <Option value="all">全部等级</Option>
                <Option value="初级">初级</Option>
                <Option value="中级">中级</Option>
                <Option value="高级">高级</Option>
              </Select>
            </div>
            <Link to="/schedule">
              <Button
                type="primary"
                size="large"
                className="h-12 bg-gradient-to-r from-pink-500 to-pink-600"
                icon={<CalendarOutlined />}
              >
                立即预约
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <Tabs
            activeKey={activeCategory}
            onChange={setActiveCategory}
            items={tabItems}
            className="course-tabs"
          />
        </div>

        <div className="mb-6">
          <p className="text-gray-400">
            共找到 <span className="text-pink-500 font-bold">{filteredCourses.length}</span> 门课程
          </p>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💃</div>
            <h3 className="text-xl font-bold text-white mb-2">暂无相关课程</h3>
            <p className="text-gray-400">请尝试其他搜索条件或课程分类</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                hoverable
                className="bg-gray-900/50 border-gray-800 hover:border-pink-500/50 transition-all duration-300"
                cover={
                  <div className="h-52 bg-gradient-to-br from-pink-500/20 to-pink-600/20 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <Tag color={getCategoryColor(course.category)}>{course.category}</Tag>
                      <Tag color={getLevelColor(course.level)}>{course.level}</Tag>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-pink-400 font-bold">{course.duration}分钟</span>
                    </div>
                    <div className="relative z-10 text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-pink-500/30">
                        <span className="text-white text-4xl font-bold">舞</span>
                      </div>
                    </div>
                  </div>
                }
              >
                <Card.Meta
                  title={
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{course.name}</h3>
                    </div>
                  }
                  description={
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar size={28} className="bg-gradient-to-br from-pink-500 to-pink-600">
                            {course.instructor[0]}
                          </Avatar>
                          <span className="text-gray-300 text-sm">{course.instructor}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <StarOutlined className="text-yellow-500" />
                          <span className="text-white text-sm font-medium">{course.rating}</span>
                          <span className="text-gray-500 text-xs">({course.students}人)</span>
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>

                      <div>
                        <div className="text-xs text-gray-500 mb-2">上课时间</div>
                        <div className="flex flex-wrap gap-1">
                          {course.schedule.slice(0, 3).map((time, idx) => (
                            <span key={idx} className="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded">
                              {time}
                            </span>
                          ))}
                          {course.schedule.length > 3 && (
                            <span className="text-xs text-pink-400">+{course.schedule.length - 3}个时段</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-500 mb-2">适合人群</div>
                        <div className="flex flex-wrap gap-1">
                          {course.suitableFor.map((item, idx) => (
                            <span key={idx} className="text-xs text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {course.features.map((feature, idx) => (
                          <span key={idx} className="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                        <div>
                          <span className="text-3xl font-bold text-pink-500">¥{course.price}</span>
                          <span className="text-gray-500 text-sm ml-1">/课时</span>
                        </div>
                        <Link to="/schedule">
                          <Button
                            type="primary"
                            size="large"
                            className="bg-gradient-to-r from-pink-500 to-pink-600"
                            icon={<ArrowRightOutlined style={{ fontSize: '16px' }} />}
                            iconPosition="end"
                          >
                            预约
                          </Button>
                        </Link>
                      </div>
                    </div>
                  }
                />
              </Card>
            ))}
          </div>
        )}

        <div className="py-16">
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  不知道选择哪门课程？
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  我们的专业顾问可以根据您的年龄、基础、兴趣爱好，为您推荐最适合的课程。
                  首次预约还可享受免费体验课！
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/schedule">
                    <Button
                      type="primary"
                      size="large"
                      className="h-12 bg-gradient-to-r from-pink-500 to-pink-600"
                      icon={<CalendarOutlined />}
                    >
                      预约免费体验课
                    </Button>
                  </Link>
                  <Button
                    size="large"
                    className="h-12 border-gray-600 text-gray-300"
                  >
                    咨询客服
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">👶</div>
                  <div className="text-white font-semibold">少儿课程</div>
                  <div className="text-gray-500 text-sm">4-12岁</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">🎓</div>
                  <div className="text-white font-semibold">青少年课程</div>
                  <div className="text-gray-500 text-sm">13-18岁</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">💼</div>
                  <div className="text-white font-semibold">成人课程</div>
                  <div className="text-gray-500 text-sm">18岁+</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="text-white font-semibold">专业进阶</div>
                  <div className="text-gray-500 text-sm">有基础者</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Classes
