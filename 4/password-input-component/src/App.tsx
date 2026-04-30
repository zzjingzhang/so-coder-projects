import { useState } from 'react'
import { PasswordInput } from '@/components/password-input'
import { Input } from '@/components/ui/input'

function App() {
  const [controlledVisible, setControlledVisible] = useState(false)
  const [controlledValue, setControlledValue] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            密码输入组件
          </h1>
          <p className="text-lg text-slate-600">
            一个功能丰富、可高度自定义的 React 密码输入组件
          </p>
        </header>

        <div className="space-y-12">
          <section className="bg-white rounded-xl shadow-sm p-8 border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              基本用法
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">
                  默认状态
                </h3>
                <PasswordInput
                  placeholder="请输入密码"
                  hintText="至少8个字符，包含大小写字母和数字"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">
                  带有浮动标签
                </h3>
                <PasswordInput
                  floatingLabelText="密码"
                  hintText="请输入您的登录密码"
                />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm p-8 border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              各种状态
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">
                  默认隐藏状态
                </h3>
                <PasswordInput
                  placeholder="密码默认隐藏"
                  hintText="点击眼睛图标显示密码"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">
                  初始可见状态
                </h3>
                <PasswordInput
                  placeholder="密码初始可见"
                  visible={true}
                  hintText="默认显示密码内容"
                  defaultValue="MySecretPassword123"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">
                  受控可见性
                </h3>
                <div className="space-y-4">
                  <PasswordInput
                    placeholder="密码"
                    visible={controlledVisible}
                    onVisibleChange={setControlledVisible}
                    hintText={
                      controlledVisible
                        ? '密码当前可见'
                        : '密码当前隐藏'
                    }
                  />
                  <p className="text-sm text-slate-500">
                    当前状态: {controlledVisible ? '可见' : '隐藏'}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">
                  禁用状态
                </h3>
                <PasswordInput
                  placeholder="无法输入"
                  disabled={true}
                  hintText="输入框已禁用"
                  defaultValue="disabledpassword"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">
                  按钮禁用状态
                </h3>
                <PasswordInput
                  placeholder="无法切换可见性"
                  buttonDisabled={true}
                  hintText="可见性切换按钮已禁用"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">
                  错误状态
                </h3>
                <PasswordInput
                  placeholder="请输入密码"
                  errorText="密码不能为空"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">
                  全宽
                </h3>
                <PasswordInput
                  placeholder="占满整行宽度"
                  fullWidth={true}
                  hintText="使用 fullWidth 属性让输入框占满容器宽度"
                />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm p-8 border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              自定义样式
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">
                  自定义按钮样式
                </h3>
                <PasswordInput
                  placeholder="带有自定义按钮样式"
                  buttonClassName="bg-blue-100 hover:bg-blue-200 p-2 rounded-full"
                  iconClassName="text-blue-600"
                  hintText="自定义按钮背景色和图标颜色"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">
                  自定义输入框样式
                </h3>
                <PasswordInput
                  placeholder="带有自定义输入框样式"
                  className="border-2 border-indigo-300 focus-visible:border-indigo-500 bg-indigo-50"
                  hintText="自定义输入框边框和背景色"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">
                  自定义容器样式
                </h3>
                <PasswordInput
                  placeholder="带有自定义容器样式"
                  wrapperClassName="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
                  hintText="自定义外层容器样式"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">
                  组合自定义样式
                </h3>
                <PasswordInput
                  placeholder="完全自定义的密码输入框"
                  className="h-12 text-lg border-2 border-green-200 rounded-xl focus-visible:border-green-400 bg-green-50"
                  buttonClassName="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full text-white shadow-lg"
                  iconClassName="w-5 h-5"
                  hintText="综合应用多种自定义样式"
                  hintClassName="text-green-600 italic"
                />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm p-8 border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              受控与非受控使用
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">
                  非受控（使用 defaultValue）
                </h3>
                <PasswordInput
                  placeholder="非受控输入"
                  defaultValue="初始密码"
                  hintText="使用 defaultValue 设置初始值"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">
                  受控（使用 value 和 onChange）
                </h3>
                <div className="space-y-4">
                  <PasswordInput
                    placeholder="受控输入"
                    value={controlledValue}
                    onChange={(e) => setControlledValue(e.target.value)}
                    hintText="使用 value 和 onChange 控制输入值"
                  />
                  <p className="text-sm text-slate-500">
                    当前值: {controlledValue || '(空)'}
                  </p>
                  <button
                    onClick={() => setControlledValue('')}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-md text-sm text-slate-700"
                  >
                    清空
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm p-8 border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              与基本输入组件比较
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-4 text-center">
                  基本 Input 组件
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-600 mb-1 block">
                      密码
                    </label>
                    <Input type="password" placeholder="请输入密码" />
                    <p className="text-xs text-slate-400 mt-1">
                      没有可见性切换功能
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-slate-600 mb-1 block">
                      用户名
                    </label>
                    <Input type="text" placeholder="请输入用户名" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-4 text-center">
                  PasswordInput 组件
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-600 mb-1 block">
                      密码
                    </label>
                    <PasswordInput
                      placeholder="请输入密码"
                      hintText="点击眼睛图标显示/隐藏密码"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-600 mb-1 block">
                      用户名
                    </label>
                    <Input type="text" placeholder="请输入用户名" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-800 mb-2">
                PasswordInput 优势:
              </h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✅ 内置可见性切换按钮</li>
                <li>✅ 支持浮动标签</li>
                <li>✅ 统一的错误提示样式</li>
                <li>✅ 可自定义按钮和图标样式</li>
                <li>✅ 全宽模式</li>
                <li>✅ 受控和非受控可见性</li>
                <li>✅ 更好的无障碍支持</li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm p-8 border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              实际表单示例
            </h2>
            <div className="max-w-md mx-auto space-y-6">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">
                  用户名
                </label>
                <Input type="text" placeholder="请输入用户名" />
              </div>

              <div>
                <PasswordInput
                  floatingLabelText="密码"
                  hintText="至少8个字符，包含大小写字母和数字"
                />
              </div>

              <div>
                <PasswordInput
                  floatingLabelText="确认密码"
                  hintText="请再次输入密码"
                />
              </div>

              <button className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors">
                注册
              </button>
            </div>
          </section>
        </div>

        <footer className="mt-16 text-center text-sm text-slate-500">
          <p>密码输入组件演示 - 基于 React + TypeScript + Tailwind CSS + shadcn/ui</p>
        </footer>
      </div>
    </div>
  )
}

export default App
