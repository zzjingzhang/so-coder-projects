import { InputSwitch } from 'primereact/inputswitch';
import { useSettings } from '../context/SettingsContext';

export function Settings() {
  const { darkMode, setDarkMode, smallText, setSmallText, deleteConfirm, setDeleteConfirm } = useSettings();

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        设置
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-100">暗模式</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">切换深色/浅色主题</p>
          </div>
          <InputSwitch
            checked={darkMode}
            onChange={(e) => setDarkMode(e.value)}
          />
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-100">小文本模式</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">使用更小的字体显示内容</p>
            </div>
            <InputSwitch
              checked={smallText}
              onChange={(e) => setSmallText(e.value)}
            />
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-100">删除确认</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">删除任务前显示确认对话框</p>
            </div>
            <InputSwitch
              checked={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.value)}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>所有设置会自动保存到本地存储</p>
      </div>
    </div>
  );
}