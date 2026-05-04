import { Link } from 'react-router-dom'
import { Button, Card, Tag, Avatar, Rate, Statistic, Row, Col } from 'antd'
import { ArrowRightOutlined, StarOutlined, UserOutlined, CalendarOutlined, TrophyOutlined, UsersOutlined, BookOutlined, GlobalOutlined } from '@ant-design/icons'
import Hero from '../components/Hero'

const popularCourses = [
  {
    id: 1,
    name: '现代舞基础',
    type: 'modern',
    level: '初级',
    instructor: '李梦',
    rating: 4.9,
    students: 128,
    price: 180,
    description: '适合零基础学员，从基本站姿、呼吸控制开始，逐步学习现代舞的基本动作和表达方式。',
    features: ['小班教学', '专业导师', '免费试听'],
  },
  {
    id: 2,
    name: '爵士舞进阶',
    type: 'jazz',
    level: '中级',
    instructor: '张伟',
    rating: 4.8,
    students: 96,
    price: 220,
    description: '深入学习爵士舞技巧，包括各种风格的编排和表演，提升舞蹈表现力和舞台魅力。',
    features: ['技巧提升', '成品舞教学', '舞台实践'],
  },
  {
    id: 3,
    name: '街舞入门',
    type: 'hiphop',
    level: '初级',
    instructor: '王芳',
    rating: 4.7,
    students: 156,
    price: 180,
    description: '从最基础的律动开始，学习街舞的基本元素和风格，展现自我个性，释放青春活力。',
    features: ['零基础友好', '潮流音乐', '自由氛围'],
  },
  {
    id: 4,
    name: '芭蕾基训',
    type: 'ballet',
    level: '初级',
    instructor: '陈静',
    rating: 4.9,
    students: 89,
    price: 220,
    description: '系统学习芭蕾舞的基本功，包括站姿、手位、脚位等，为各类舞蹈打下坚实基础。',
    features: ['专业体系', '形体塑造', '气质提升'],
  },
]

const instructors = [
  {
    id: 1,
    name: '李梦',
    specialty: '现代舞',
    experience: 12,
    rating: 4.9,
    students: 580,
    description: '毕业于北京舞蹈学院现代舞专业，曾在多个国际舞蹈比赛中获奖。',
    achievements: ['国际现代舞大赛金奖', '全国舞蹈比赛最佳编导'],
  },
  {
    id: 2,
    name: '张伟',
    specialty: '爵士舞',
    experience: 10,
    rating: 4.8,
    students: 420,
    description: '拥有丰富的舞台表演经验，曾为多位知名艺人担任舞蹈编排。',
    achievements: ['全国爵士舞大赛冠军', '知名艺人编舞师'],
  },
  {
    id: 3,
    name: '陈静',
    specialty: '芭蕾舞',
    experience: 15,
    rating: 4.9,
    students: 360,
    description: '曾任职于国家芭蕾舞团，拥有专业的芭蕾舞教学体系和丰富经验。',
    achievements: ['国家一级演员', '芭蕾舞考级评委'],
  },
  {
    id: 4,
    name: '赵雪',
    specialty: '当代舞',
    experience: 9,
    rating: 4.9,
    students: 290,
    description: '专注于当代舞的创作与教学，擅长引导学员表达内心情感。',
    achievements: ['当代舞创作金奖', '舞蹈教育先锋人物'],
  },
]

const features = [
  {
    icon: <UsersOutlined />,
    title: '小班精品教学',
    description: '每班不超过15人，确保每位学员都能得到导师的充分关注和指导。',
  },
  {
    icon: <TrophyOutlined />,
    title: '专业师资团队',
    description: '所有导师均毕业于专业舞蹈院校，拥有丰富的教学和表演经验。',
  },
  {
    icon: <BookOutlined />,
    title: '系统课程体系',
    description: '从零基础到专业进阶，提供完整的学习路径和阶段考核。',
  },
  {
    icon: <CalendarOutlined />,
    title: '灵活预约机制',
    description: '支持在线预约和取消，根据您的时间安排选择合适的课程。',
  },
  {
    icon: <StarOutlined />,
    title: '舞台表演机会',
    description: '定期举办学员汇报演出，提供专业舞台展示自我。',
  },
  {
    icon: <GlobalOutlined />,
    title: '多元化舞种',
    description: '涵盖现代舞、爵士舞、街舞、芭蕾等多种舞蹈风格。',
  },
]

const testimonials = [
  {
    id: 1,
    name: '小雨',
    age: 28,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoyu',
    rating: 5,
    content: '作为一名零基础的上班族，我在这里找到了舞蹈的乐趣。李梦老师非常有耐心，课程安排也很合理。现在我已经能跳完整的成品舞了！',
    course: '现代舞基础',
  },
  {
    id: 2,
    name: '子轩',
    age: 16,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zixuan',
    rating: 5,
    content: '街舞课超棒！王芳老师不仅教得好，还很懂年轻人。在这里认识了很多志同道合的朋友，每次上课都很期待。',
    course: '街舞入门',
  },
  {
    id: 3,
    name: '雅婷',
    age: 35,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yating',
    rating: 5,
    content: '芭蕾基训课让我找回了优雅的体态。陈静老师非常专业，从最基础的站姿开始纠正，现在朋友们都说我的气质变好了很多。',
    course: '芭蕾基训',
  },
]

const getTypeColor = (type) => {
  const colors = {
    modern: 'pink',
    jazz: 'orange',
    hiphop: 'blue',
    ballet: 'purple',
  }
  return colors[type] || 'default'
}

const getLevelColor = (level) => {
  const colors = {
    初级: 'success',
    中级: 'warning',
    高级: 'error',
  }
  return colors[level] || 'default'
}

const Home = () => {
  return (
    <div className="bg-black">
      <Hero />

      <section className="py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Row gutter={[32, 32]}>
            <Col xs={12} sm={6}>
              <div className="text-center">
                <Statistic
                  title={<span className="text-gray-400">学员信赖</span>}
                  value={5000}
                  suffix="+"
                  valueStyle={{ color: '#ec4899', fontWeight: 'bold' }}
                />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="text-center">
                <Statistic
                  title={<span className="text-gray-400">专业导师</span>}
                  value={50}
                  suffix="+"
                  valueStyle={{ color: '#ec4899', fontWeight: 'bold' }}
                />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="text-center">
                <Statistic
                  title={<span className="text-gray-400">精品课程</span>}
                  value={100}
                  suffix="+"
                  valueStyle={{ color: '#ec4899', fontWeight: 'bold' }}
                />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="text-center">
                <Statistic
                  title={<span className="text-gray-400">办学年限</span>}
                  value={15}
                  suffix="年"
                  valueStyle={{ color: '#ec4899', fontWeight: 'bold' }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Tag color="pink" className="text-sm px-4 py-1 mb-4">
              为什么选择我们
            </Tag>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              专业舞蹈教育，成就舞蹈梦想
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              我们致力于为每一位舞者提供最专业、最贴心的舞蹈教育服务
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10"
              >
                <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500 text-2xl mb-6 group-hover:bg-pink-500/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <Tag color="pink" className="text-sm px-4 py-1 mb-4">
                热门课程
              </Tag>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                精选课程推荐
              </h2>
            </div>
            <Link to="/classes">
              <Button
                type="text"
                className="text-pink-500 hover:text-pink-400 text-base font-medium flex items-center gap-2"
              >
                查看全部课程
                <ArrowRightOutlined style={{ fontSize: '16px' }} />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCourses.map((course) => (
              <Card
                key={course.id}
                hoverable
                className="bg-gray-900/50 border-gray-800 hover:border-pink-500/50 transition-all duration-300"
                cover={
                  <div className="h-48 bg-gradient-to-br from-pink-500/20 to-pink-600/20 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="relative z-10 text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-pink-500/30">
                        <span className="text-white text-3xl font-bold">舞</span>
                      </div>
                      <div className="flex justify-center gap-2">
                        <Tag color={getTypeColor(course.type)}>{course.type === 'modern' ? '现代舞' : course.type === 'jazz' ? '爵士舞' : course.type === 'hiphop' ? '街舞' : '芭蕾舞'}</Tag>
                        <Tag color={getLevelColor(course.level)}>{course.level}</Tag>
                      </div>
                    </div>
                  </div>
                }
              >
                <Card.Meta
                  title={
                    <h3 className="text-lg font-bold text-white mb-2">
                      {course.name}
                    </h3>
                  }
                  description={
                    <div className="space-y-3">
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar size={24} className="bg-gradient-to-br from-pink-500 to-pink-600">
                            {course.instructor[0]}
                          </Avatar>
                          <span className="text-gray-400 text-sm">{course.instructor}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <StarOutlined className="text-yellow-500" />
                          <span className="text-white text-sm font-medium">{course.rating}</span>
                          <span className="text-gray-500 text-sm">({course.students}人)</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {course.features.map((feature, idx) => (
                          <span key={idx} className="text-xs text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                        <div>
                          <span className="text-2xl font-bold text-pink-500">¥{course.price}</span>
                          <span className="text-gray-500 text-sm ml-1">/课时</span>
                        </div>
                        <Link to="/schedule">
                          <Button type="primary" size="small" className="bg-gradient-to-r from-pink-500 to-pink-600">
                            立即预约
                          </Button>
                        </Link>
                      </div>
                    </div>
                  }
                />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Tag color="pink" className="text-sm px-4 py-1 mb-4">
              师资力量
            </Tag>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              专业导师团队
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              每位导师都拥有丰富的教学经验和专业背景
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="group text-center"
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:shadow-xl group-hover:shadow-pink-500/40 transition-all duration-300">
                    <span className="text-white text-4xl font-bold">{instructor.name[0]}</span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-800 rounded-full px-3 py-1">
                    <span className="text-pink-400 text-sm font-medium">{instructor.specialty}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-pink-400 transition-colors">
                  {instructor.name}
                </h3>
                <div className="flex items-center justify-center gap-1 mb-3">
                  <Rate disabled defaultValue={instructor.rating} className="text-xs" />
                  <span className="text-gray-400 text-sm">{instructor.rating}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {instructor.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {instructor.achievements.map((achievement, idx) => (
                    <span key={idx} className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Tag color="pink" className="text-sm px-4 py-1 mb-4">
              学员评价
            </Tag>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              听听学员怎么说
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              来自真实学员的真实反馈
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-pink-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarOutlined key={i} className="text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <Avatar
                    src={testimonial.avatar}
                    size={48}
                    className="bg-gradient-to-br from-pink-500 to-pink-600"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">{testimonial.name}</span>
                      <span className="text-gray-500 text-sm">{testimonial.age}岁</span>
                    </div>
                    <span className="text-pink-400 text-sm">{testimonial.course}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-600 to-pink-700 p-12 md:p-16">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-black/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                准备好开启你的舞蹈之旅了吗？
              </h2>
              <p className="text-pink-100 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                现在预约，即可享受首次课程免费体验！专业导师一对一指导，帮你找到最适合的舞蹈风格。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/schedule">
                  <Button
                    size="large"
                    className="h-14 px-8 text-base font-semibold bg-white text-pink-600 hover:bg-gray-100 shadow-lg shadow-pink-900/30"
                    icon={<CalendarOutlined />}
                  >
                    立即预约体验课
                  </Button>
                </Link>
                <Link to="/classes">
                  <Button
                    size="large"
                    className="h-14 px-8 text-base font-semibold bg-transparent border-2 border-white/50 text-white hover:bg-white/10"
                    icon={<ArrowRightOutlined />}
                  >
                    了解更多课程
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
