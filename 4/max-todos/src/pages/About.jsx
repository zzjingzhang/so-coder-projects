export function About() {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        关于
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            Max Todos
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            版本 1.0.0
          </p>
        </div>

        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Max Todos 是一款功能强大的任务管理应用，帮助您高效地组织和管理日常任务。
          </p>

          <div>
            <h4 className="font-semibold mb-2">主要功能：</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>添加、编辑和删除任务</li>
              <li>标记任务为已完成</li>
              <li>为重要任务加星标</li>
              <li>拖放排序任务</li>
              <li>暗模式支持</li>
              <li>小文本模式</li>
              <li>删除确认功能</li>
              <li>响应式设计，支持移动设备</li>
              <li>PWA 支持，可离线使用</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">技术栈：</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>React 19</li>
              <li>React Router</li>
              <li>PrimeReact</li>
              <li>Tailwind CSS</li>
              <li>@dnd-kit (拖放)</li>
              <li>Vite</li>
              <li>PWA (Service Worker)</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              所有数据都会保存在您的本地浏览器中。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}