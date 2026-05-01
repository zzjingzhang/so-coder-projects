import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const About = () => {
  return (
    <div className="flex-1 p-6 overflow-auto bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">关于我们</h2>
        
        <Card className="bg-gray-900 border-gray-800 mb-6">
          <CardHeader>
            <CardTitle>鞋类销售仪表盘</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              欢迎使用鞋类销售仪表盘！这是一个现代化的销售管理系统，帮助您高效管理鞋类产品的销售和库存。
            </p>
            <p className="text-gray-300">
              我们致力于为您提供最优质的用户体验和最强大的功能，让您的销售工作更加轻松高效。
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>技术栈</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-gray-300 space-y-2">
                <li>• React 18</li>
                <li>• Vite</li>
                <li>• Tailwind CSS</li>
                <li>• shadcn/ui</li>
                <li>• React Router</li>
                <li>• Lucide Icons</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>主要功能</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-gray-300 space-y-2">
                <li>• 产品管理</li>
                <li>• 订单跟踪</li>
                <li>• 销售分析</li>
                <li>• 实时数据</li>
                <li>• 响应式设计</li>
                <li>• 暗色主题</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-900 border-gray-800 mt-6">
          <CardHeader>
            <CardTitle>联系我们</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-2">
              如有任何问题或建议，请随时与我们联系：
            </p>
            <p className="text-gray-400">
              邮箱: support@shoedashboard.com
            </p>
            <p className="text-gray-400">
              电话: 400-123-4567
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default About
