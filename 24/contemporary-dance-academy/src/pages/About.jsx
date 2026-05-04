import { Link } from 'react-router-dom'
import { Button, Card, Tag, Avatar, Statistic, Row, Col, Divider } from 'antd'
import { CalendarOutlined, TrophyOutlined, UsersOutlined, BookOutlined, GlobalOutlined, ArrowRightOutlined, StarOutlined, ClockCircleOutlined, EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons'

const milestones = [
  {
    year: '2009',
    title: '学院成立',
    description: '当代舞蹈学院在北京正式成立，专注于现代舞教育与推广。',
  },
  {
    year: '2012',
    title: '扩大规模',
    description: '开设爵士舞、街舞等更多舞种，学员人数突破1000人。',
  },
  {
    year: '2015',
    title: '国际交流',
    description: '与国际知名舞蹈机构建立合作，定期邀请外籍导师授课。',
  },
  {
    year: '2018',
    title: '教学体系完善',
    description: '建立完整的从零基础到专业进阶的课程体系。',
  },
  {
    year: '2020',
    title: '数字化转型',
    description: '推出在线课程和智能预约系统，服务更多舞蹈爱好者。',
  },
  {
    year: '2024',
    title: '新校区启用',
    description: '全新校区投入使用，配备更专业的舞蹈教室和设施。',
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
    achievements: ['国际现代舞大赛金奖', '全国舞蹈比赛最佳编导', '舞蹈教育先进工作者'],
    education: '北京舞蹈学院 现代舞专业 硕士',
  },
  {
    id: 2,
    name: '张伟',
    specialty: '爵士舞',
    experience: 10,
    rating: 4.8,
    students: 420,
    description: '拥有丰富的舞台表演经验，曾为多位知名艺人担任舞蹈编排。',
    achievements: ['全国爵士舞大赛冠军', '知名艺人编舞师', '街舞协会认证导师'],
    education: '上海戏剧学院 舞蹈编导专业',
  },
  {
    id: 3,
    name: '王芳',
    specialty: '街舞',
    experience: 8,
    rating: 4.7,
    students: 350,
    description: '曾获多项国内国际街舞比赛奖项，教学风格活泼有趣。',
    achievements: ['KOD 街舞大赛 16强', 'HHI 中国赛区冠军', '街舞考级认证考官'],
    education: '中央民族大学 舞蹈学专业',
  },
  {
    id: 4,
    name: '陈静',
    specialty: '芭蕾舞',
    experience: 15,
    rating: 4.9,
    students: 360,
    description: '曾任职于国家芭蕾舞团，拥有专业的芭蕾舞教学体系和丰富经验。',
    achievements: ['国家一级演员', '芭蕾舞考级评委', '桃李杯指导教师金奖'],
    education: '北京舞蹈学院 芭蕾舞专业',
  },
  {
    id: 5,
    name: '刘洋',
    specialty: '中国舞',
    experience: 11,
    rating: 4.8,
    students: 280,
    description: '专注于中国古典舞和民族民间舞教学，弘扬中国传统舞蹈文化。',
    achievements: ['荷花奖舞蹈比赛银奖', '全国舞蹈比赛优秀指导教师', '舞蹈家协会会员'],
    education: '北京舞蹈学院 中国古典舞专业',
  },
  {
    id: 6,
    name: '赵雪',
    specialty: '当代舞',
    experience: 9,
    rating: 4.9,
    students: 290,
    description: '专注于当代舞的创作与教学，擅长引导学员表达内心情感。',
    achievements: ['当代舞创作金奖', '舞蹈教育先锋人物', '国际舞蹈节特邀艺术家'],
    education: '香港演艺学院 当代舞专业',
  },
]

const facilities = [
  {
    name: '专业舞蹈教室',
    description: '8间专业舞蹈教室，配备专业地胶、把杆、镜子等设施',
    icon: '🪞',
  },
  {
    name: '恒温空调系统',
    description: '全年恒温24-26°C，为舞者提供最舒适的训练环境',
    icon: '❄️',
  },
  {
    name: '专业音响设备',
    description: '顶级音响系统，提供高品质音乐体验',
    icon: '🎵',
  },
  {
    name: '休息区',
    description: '宽敞舒适的家长休息区和学员休息区',
    icon: '🛋️',
  },
  {
    name: '更衣室',
    description: '独立更衣室和储物柜，保护学员隐私',
    icon: '👔',
  },
  {
    name: '淋浴间',
    description: '干净整洁的淋浴间，训练后可以舒适地冲洗',
    icon: '🚿',
  },
]

const About = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="relative py-24 bg-gradient-to-b from-gray-950 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Tag color="pink" className="text-sm px-4 py-1 mb-4">
              关于我们
            </Tag>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              释放身心，<span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">舞动灵魂</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              当代舞蹈学院成立于2009年，致力于为每一位舞蹈爱好者提供专业、个性化的舞蹈教育。
              我们相信，舞蹈不仅是一种艺术形式，更是一种生活方式，一种表达自我的方式。
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12">
          <Row gutter={[32, 32]}>
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
            <Col xs={12} sm={6}>
              <div className="text-center">
                <Statistic
                  title={<span className="text-gray-400">累计学员</span>}
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
                  title={<span className="text-gray-400">课程数量</span>}
                  value={100}
                  suffix="+"
                  valueStyle={{ color: '#ec4899', fontWeight: 'bold' }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Tag color="pink" className="text-sm px-4 py-1 mb-4">
                我们的故事
              </Tag>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                从一间教室到全国知名舞蹈教育品牌
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  2009年，我们怀揣着对舞蹈的热爱，在北京的一间小教室里开始了我们的舞蹈教育之旅。
                  那时的我们只有几位老师和几十名学员，但我们有一个共同的信念：让每一个人都能感受到舞蹈的魅力。
                </p>
                <p>
                  十五年来，我们不断发展壮大。从最初的现代舞单一课程，到如今涵盖现代舞、爵士舞、街舞、
                  芭蕾舞、中国舞、当代舞等多种舞蹈风格的综合性舞蹈学院。
                </p>
                <p>
                  我们始终坚持"以学员为中心"的教育理念，注重每一位学员的个性化发展。
                  无论是零基础的舞蹈爱好者，还是希望成为专业舞者的学员，我们都能为其提供最适合的课程和指导。
                </p>
                <p>
                  未来，我们将继续秉承初心，不断提升教学质量，为更多的舞蹈爱好者提供优质的教育服务，
                  让舞蹈成为更多人生活中不可或缺的一部分。
                </p>
              </div>
            </div>
            <div>
              <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <TrophyOutlined className="text-pink-500 mr-3" />
                  发展历程
                </h3>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        {index < milestones.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-700 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <Tag color="pink" className="mb-2">{milestone.year}</Tag>
                        <h4 className="text-white font-semibold mb-1">{milestone.title}</h4>
                        <p className="text-gray-400 text-sm">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Tag color="pink" className="text-sm px-4 py-1 mb-4">
              师资力量
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              专业导师团队
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              每位导师都拥有丰富的教学经验和专业背景，致力于为学员提供最优质的舞蹈教育
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((instructor) => (
              <Card
                key={instructor.id}
                className="bg-gray-900/50 border-gray-800 hover:border-pink-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/20 flex-shrink-0">
                    <span className="text-white text-3xl font-bold">{instructor.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-white">{instructor.name}</h3>
                      <Tag color="pink">{instructor.specialty}</Tag>
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-gray-400 text-sm">{instructor.education}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <StarOutlined className="text-yellow-500" />
                        <span className="text-white">{instructor.rating}</span>
                      </div>
                      <div className="text-gray-500">
                        <ClockCircleOutlined className="mr-1" />
                        {instructor.experience}年教龄
                      </div>
                      <div className="text-gray-500">
                        <UsersOutlined className="mr-1" />
                        {instructor.students}+学员
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {instructor.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {instructor.achievements.map((achievement, idx) => (
                    <span key={idx} className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                      {achievement}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Tag color="pink" className="text-sm px-4 py-1 mb-4">
              教学环境
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              专业的舞蹈训练环境
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              我们为学员提供最专业、最舒适的训练环境
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-pink-500/30 transition-all duration-300"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {facility.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                  {facility.name}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {facility.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Tag color="pink" className="text-sm px-4 py-1 mb-4">
                联系我们
              </Tag>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                欢迎来到当代舞蹈学院
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                如果您对我们的课程感兴趣，或者有任何问题，欢迎随时联系我们。
                我们的客服团队将竭诚为您服务，帮您找到最适合的舞蹈课程。
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500 text-xl flex-shrink-0">
                    <EnvironmentOutlined />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">校区地址</h4>
                    <p className="text-gray-400">
                      北京市朝阳区建国路88号艺术中心大厦3层（近地铁1号线国贸站）
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500 text-xl flex-shrink-0">
                    <PhoneOutlined />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">联系电话</h4>
                    <p className="text-gray-400">
                      400-888-9999（全国热线）<br />
                      010-88889999（北京校区）
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500 text-xl flex-shrink-0">
                    <MailOutlined />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">电子邮箱</h4>
                    <p className="text-gray-400">
                      info@dance-academy.com<br />
                      support@dance-academy.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500 text-xl flex-shrink-0">
                    <ClockCircleOutlined />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">营业时间</h4>
                    <p className="text-gray-400">
                      周一至周五: 09:00 - 21:00<br />
                      周六至周日: 09:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link to="/schedule">
                  <Button
                    type="primary"
                    size="large"
                    className="h-12 px-8 bg-gradient-to-r from-pink-500 to-pink-600"
                    icon={<CalendarOutlined />}
                  >
                    立即预约免费体验课
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8">
              <h3 className="text-xl font-bold text-white mb-6">发送咨询</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">姓名</label>
                    <input
                      type="text"
                      placeholder="请输入姓名"
                      className="w-full h-12 px-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">电话</label>
                    <input
                      type="tel"
                      placeholder="请输入电话"
                      className="w-full h-12 px-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">咨询内容</label>
                  <textarea
                    rows={4}
                    placeholder="请输入您想咨询的内容..."
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors resize-none"
                  />
                </div>
                <Button
                  type="primary"
                  size="large"
                  block
                  className="h-12 bg-gradient-to-r from-pink-500 to-pink-600"
                >
                  提交咨询
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
