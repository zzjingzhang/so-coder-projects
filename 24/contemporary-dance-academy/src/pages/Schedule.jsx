import CourseScheduler from '../components/CourseScheduler'
import { Tag } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'

const Schedule = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="relative py-20 bg-gradient-to-b from-gray-950 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Tag color="pink" className="text-sm px-4 py-1 mb-4">
              课程预约
            </Tag>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              智能课程调度系统
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              灵活预约您喜欢的课程，根据您的时间安排选择合适的时段
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-black/30">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500 text-xl">
                <CalendarOutlined />
              </div>
              <div>
                <div className="text-white font-semibold">选择日期</div>
                <div className="text-gray-500 text-sm">点击日历选择日期</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-black/30">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500 text-xl">
                👆
              </div>
              <div>
                <div className="text-white font-semibold">点击课程</div>
                <div className="text-gray-500 text-sm">查看课程详情</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-black/30">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500 text-xl">
                📝
              </div>
              <div>
                <div className="text-white font-semibold">填写信息</div>
                <div className="text-gray-500 text-sm">填写预约信息</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-black/30">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500 text-xl">
                ✅
              </div>
              <div>
                <div className="text-white font-semibold">确认预约</div>
                <div className="text-gray-500 text-sm">提交预约申请</div>
              </div>
            </div>
          </div>
        </div>

        <CourseScheduler />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8">
          <h3 className="text-xl font-bold text-white mb-6">预约须知</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">预约时间</h4>
                  <p className="text-gray-400 text-sm">请提前至少24小时预约课程，以便我们为您安排最佳的学习体验。</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">取消预约</h4>
                  <p className="text-gray-400 text-sm">如需取消预约，请提前至少12小时操作，避免影响您的预约信用。</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">课程确认</h4>
                  <p className="text-gray-400 text-sm">预约成功后，我们的客服会通过电话或短信与您确认课程详情。</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 text-sm flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">课前准备</h4>
                  <p className="text-gray-400 text-sm">请穿着舒适的运动服装，建议提前15分钟到达教室进行热身准备。</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 text-sm flex-shrink-0">
                  5
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">首次体验</h4>
                  <p className="text-gray-400 text-sm">首次预约课程的学员可享受免费体验课，体验后再决定是否报名。</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 text-sm flex-shrink-0">
                  6
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">联系方式</h4>
                  <p className="text-gray-400 text-sm">如有任何问题，请拨打客服热线：400-888-9999，我们将竭诚为您服务。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule
