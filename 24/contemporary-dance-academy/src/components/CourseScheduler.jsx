import { useState } from 'react'
import { Calendar, Select, Button, Modal, Form, Input, message, Card, Tag, Divider, Empty } from 'antd'
import { ClockCircleOutlined, UserOutlined, StarOutlined, CalendarOutlined, CheckCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const { Option } = Select
const { TextArea } = Input

const courseTypes = [
  { value: 'all', label: '全部课程' },
  { value: 'modern', label: '现代舞' },
  { value: 'jazz', label: '爵士舞' },
  { value: 'hiphop', label: '街舞' },
  { value: 'ballet', label: '芭蕾舞' },
  { value: 'chinese', label: '中国舞' },
  { value: 'contemporary', label: '当代舞' },
]

const instructors = [
  { id: 1, name: '李梦', specialty: '现代舞', rating: 4.9, experience: 12 },
  { id: 2, name: '张伟', specialty: '爵士舞', rating: 4.8, experience: 10 },
  { id: 3, name: '王芳', specialty: '街舞', rating: 4.7, experience: 8 },
  { id: 4, name: '陈静', specialty: '芭蕾舞', rating: 4.9, experience: 15 },
  { id: 5, name: '刘洋', specialty: '中国舞', rating: 4.8, experience: 11 },
  { id: 6, name: '赵雪', specialty: '当代舞', rating: 4.9, experience: 9 },
]

const getCourseColor = (type) => {
  const colors = {
    modern: '#ec4899',
    jazz: '#f59e0b',
    hiphop: '#3b82f6',
    ballet: '#8b5cf6',
    chinese: '#10b981',
    contemporary: '#ef4444',
  }
  return colors[type] || '#ec4899'
}

const getLevelColor = (level) => {
  const colors = {
    初级: 'success',
    中级: 'warning',
    高级: 'error',
  }
  return colors[level] || 'default'
}

const generateSchedule = () => {
  const schedule = {}
  const baseDate = dayjs()
  
  for (let i = 0; i < 30; i++) {
    const date = baseDate.add(i, 'day').format('YYYY-MM-DD')
    const dayOfWeek = baseDate.add(i, 'day').day()
    
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      schedule[date] = [
        {
          id: `${date}-1`,
          type: 'modern',
          name: '现代舞基础',
          instructor: instructors[Math.floor(Math.random() * instructors.length)],
          time: '09:00-10:30',
          level: '初级',
          capacity: 15,
          enrolled: Math.floor(Math.random() * 10) + 3,
          duration: 90,
          description: '适合零基础学员，从基本站姿、呼吸控制开始，逐步学习现代舞的基本动作和表达方式。',
          price: 180,
        },
        {
          id: `${date}-2`,
          type: 'jazz',
          name: '爵士舞入门',
          instructor: instructors[Math.floor(Math.random() * instructors.length)],
          time: '14:00-15:30',
          level: '初级',
          capacity: 15,
          enrolled: Math.floor(Math.random() * 10) + 2,
          duration: 90,
          description: '学习爵士舞的基本步伐、节奏感和身体控制，感受爵士舞的热情与活力。',
          price: 180,
        },
        {
          id: `${date}-3`,
          type: 'hiphop',
          name: '街舞基础',
          instructor: instructors[Math.floor(Math.random() * instructors.length)],
          time: '19:00-20:30',
          level: '初级',
          capacity: 15,
          enrolled: Math.floor(Math.random() * 10) + 4,
          duration: 90,
          description: '从最基础的律动开始，学习街舞的基本元素和风格，展现自我个性。',
          price: 180,
        },
      ]
    } else {
      schedule[date] = [
        {
          id: `${date}-1`,
          type: 'modern',
          name: '现代舞进阶',
          instructor: instructors[Math.floor(Math.random() * instructors.length)],
          time: '10:00-11:30',
          level: '中级',
          capacity: 12,
          enrolled: Math.floor(Math.random() * 8) + 2,
          duration: 90,
          description: '深入学习现代舞技巧，包括地面技巧、跳跃和转身，提升舞蹈表现力。',
          price: 220,
        },
        {
          id: `${date}-2`,
          type: 'ballet',
          name: '芭蕾基训',
          instructor: instructors[Math.floor(Math.random() * instructors.length)],
          time: '14:00-15:30',
          level: '初级',
          capacity: 12,
          enrolled: Math.floor(Math.random() * 8) + 1,
          duration: 90,
          description: '系统学习芭蕾舞的基本功，包括站姿、手位、脚位等，为各类舞蹈打下坚实基础。',
          price: 220,
        },
        {
          id: `${date}-3`,
          type: 'contemporary',
          name: '当代舞创作',
          instructor: instructors[Math.floor(Math.random() * instructors.length)],
          time: '16:00-17:30',
          level: '高级',
          capacity: 10,
          enrolled: Math.floor(Math.random() * 6) + 1,
          duration: 90,
          description: '探索当代舞的即兴创作方法，学习如何表达情感和讲述故事，适合有一定基础的学员。',
          price: 280,
        },
        {
          id: `${date}-4`,
          type: 'chinese',
          name: '中国古典舞',
          instructor: instructors[Math.floor(Math.random() * instructors.length)],
          time: '19:00-20:30',
          level: '中级',
          capacity: 15,
          enrolled: Math.floor(Math.random() * 10) + 3,
          duration: 90,
          description: '学习中国古典舞的身韵、身法和技巧，感受中国传统文化的独特魅力。',
          price: 220,
        },
      ]
    }
  }
  return schedule
}

const scheduleData = generateSchedule()

const CourseScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [courseType, setCourseType] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [form] = Form.useForm()
  const [bookedCourses, setBookedCourses] = useState([])

  const dateStr = selectedDate.format('YYYY-MM-DD')
  const courses = scheduleData[dateStr] || []
  
  const filteredCourses = courseType === 'all' 
    ? courses 
    : courses.filter(c => c.type === courseType)

  const handleDateSelect = (value) => {
    setSelectedDate(value)
  }

  const handleCourseClick = (course) => {
    setSelectedCourse(course)
    setIsModalOpen(true)
  }

  const handleBooking = (values) => {
    if (selectedCourse) {
      const booking = {
        ...selectedCourse,
        ...values,
        date: dateStr,
        bookingId: `BK${Date.now()}`,
        bookedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }
      setBookedCourses([...bookedCourses, booking])
      message.success('预约成功！我们会尽快与您联系确认。')
      setIsModalOpen(false)
      form.resetFields()
    }
  }

  const getDateCellContent = (value) => {
    const dateStr = value.format('YYYY-MM-DD')
    const dayCourses = scheduleData[dateStr] || []
    const hasCourses = dayCourses.length > 0

    return (
      <div className="text-center py-1">
        {hasCourses && (
          <div className="flex justify-center gap-1 mt-1">
            {dayCourses.slice(0, 3).map((course, index) => (
              <div
                key={index}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: getCourseColor(course.type) }}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h3 className="text-xl font-bold text-white">
                <CalendarOutlined className="mr-2 text-pink-500" />
                课程日历
              </h3>
              <Select
                value={courseType}
                onChange={setCourseType}
                className="w-full sm:w-48"
                size="large"
              >
                {courseTypes.map((type) => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="bg-black/30 rounded-xl p-4">
              <Calendar
                fullscreen={false}
                onSelect={handleDateSelect}
                cellRender={getDateCellContent}
                value={selectedDate}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                {selectedDate.format('MM月DD日')} 课程
              </h3>
              <Tag color="pink">{selectedDate.format('dddd')}</Tag>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {filteredCourses.length === 0 ? (
                <div className="py-12">
                  <Empty
                    description={
                      <span className="text-gray-500">
                        当日暂无{courseType !== 'all' ? courseTypes.find(t => t.value === courseType)?.label : ''}课程
                      </span>
                    }
                  />
                </div>
              ) : (
                filteredCourses.map((course) => (
                  <Card
                    key={course.id}
                    size="small"
                    className="cursor-pointer hover:border-pink-500/50 transition-all duration-300 bg-gray-800/50 border-gray-700"
                    hoverable
                    onClick={() => handleCourseClick(course)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-white font-semibold text-lg mb-1">{course.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <ClockCircleOutlined className="text-pink-400" />
                            {course.time}
                          </div>
                        </div>
                        <Tag color={getLevelColor(course.level)}>{course.level}</Tag>
                      </div>

                      <Divider className="my-2" />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white text-xs font-bold">
                            {course.instructor.name[0]}
                          </div>
                          <div>
                            <div className="text-sm text-gray-300">{course.instructor.name}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <StarOutlined className="text-yellow-500" />
                              {course.instructor.rating}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-pink-500">¥{course.price}</div>
                          <div className="text-xs text-gray-500">
                            剩余 {course.capacity - course.enrolled} 个名额
                          </div>
                        </div>
                      </div>

                      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-500 to-pink-400 rounded-full transition-all duration-500"
                          style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {bookedCourses.length > 0 && (
        <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <CheckCircleOutlined className="mr-2 text-green-500" />
            已预约课程
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookedCourses.map((booking) => (
              <Card
                key={booking.bookingId}
                size="small"
                className="bg-green-500/5 border-green-500/30"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-semibold">{booking.name}</h4>
                    <Tag color="green">已预约</Tag>
                  </div>
                  <div className="text-sm text-gray-400 space-y-1">
                    <div>日期: {booking.date}</div>
                    <div>时间: {booking.time}</div>
                    <div>学员: {booking.name}</div>
                    <div>电话: {booking.phone}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Modal
        title={
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: selectedCourse ? `${getCourseColor(selectedCourse.type)}20` : '#ec489920' }}
            >
              <CalendarOutlined
                className="text-xl"
                style={{ color: selectedCourse ? getCourseColor(selectedCourse.type) : '#ec4899' }}
              />
            </div>
            <div>
              <div className="text-lg font-bold text-white">{selectedCourse?.name}</div>
              <div className="text-sm text-gray-400">{selectedDate.format('YYYY年MM月DD日')} {selectedCourse?.time}</div>
            </div>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={640}
      >
        {selectedCourse && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">授课导师</div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white text-sm font-bold">
                    {selectedCourse.instructor.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{selectedCourse.instructor.name}</div>
                    <div className="text-xs text-gray-500">{selectedCourse.instructor.specialty} · {selectedCourse.instructor.experience}年经验</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">课程信息</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">难度等级</span>
                    <Tag color={getLevelColor(selectedCourse.level)}>{selectedCourse.level}</Tag>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">课程时长</span>
                    <span className="text-gray-900 font-medium">{selectedCourse.duration}分钟</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">课程价格</span>
                    <span className="text-pink-600 font-bold text-lg">¥{selectedCourse.price}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-2">课程简介</div>
              <p className="text-gray-700 leading-relaxed">{selectedCourse.description}</p>
            </div>

            <div className="bg-pink-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">名额情况</div>
                <div className="text-sm font-medium text-gray-900">
                  已报名 <span className="text-pink-600">{selectedCourse.enrolled}</span> / 总名额 <span className="text-gray-900">{selectedCourse.capacity}</span>
                </div>
              </div>
              <div className="mt-2 relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-500 to-pink-400 rounded-full"
                  style={{ width: `${(selectedCourse.enrolled / selectedCourse.capacity) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-500">
                剩余 <span className="text-pink-600 font-medium">{selectedCourse.capacity - selectedCourse.enrolled}</span> 个名额
              </div>
            </div>

            <Divider />

            <Form
              form={form}
              layout="vertical"
              onFinish={handleBooking}
            >
              <h4 className="text-lg font-bold text-gray-900 mb-4">预约信息</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="name"
                  label="学员姓名"
                  rules={[{ required: true, message: '请输入学员姓名' }]}
                >
                  <Input placeholder="请输入学员姓名" size="large" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="联系电话"
                  rules={[
                    { required: true, message: '请输入联系电话' },
                    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' },
                  ]}
                >
                  <Input placeholder="请输入联系电话" size="large" />
                </Form.Item>
              </div>
              <Form.Item
                name="age"
                label="学员年龄"
                rules={[{ required: true, message: '请选择学员年龄段' }]}
              >
                <Select placeholder="请选择学员年龄段" size="large">
                  <Option value="6-12">6-12岁（儿童）</Option>
                  <Option value="13-18">13-18岁（青少年）</Option>
                  <Option value="19-35">19-35岁（成人）</Option>
                  <Option value="36+">36岁以上</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="experience"
                label="舞蹈基础"
              >
                <Select placeholder="请选择舞蹈基础情况" size="large">
                  <Option value="none">零基础</Option>
                  <Option value="beginner">1年以内</Option>
                  <Option value="intermediate">1-3年</Option>
                  <Option value="advanced">3年以上</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="notes"
                label="备注信息"
              >
                <TextArea
                  rows={3}
                  placeholder="如有特殊需求请在此说明（可选）"
                  size="large"
                />
              </Form.Item>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="large"
                  className="h-12 flex-1"
                  onClick={() => setIsModalOpen(false)}
                >
                  取消
                </Button>
                <Button
                  type="primary"
                  size="large"
                  className="h-12 flex-1 bg-gradient-to-r from-pink-500 to-pink-600"
                  htmlType="submit"
                >
                  确认预约
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default CourseScheduler
