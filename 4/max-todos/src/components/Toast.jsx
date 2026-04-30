import { useState, useEffect } from 'react';
import { ProgressBar } from 'primereact/progressbar';

export function Toast({ message, type = 'success', duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[type];

  if (!visible) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="flex items-center gap-3">
        <i className={`pi ${type === 'success' ? 'pi-check-circle' : type === 'error' ? 'pi-times-circle' : 'pi-info-circle'}`}></i>
        <span className="font-medium">{message}</span>
      </div>
      <ProgressBar
        value={100}
        showValue={false}
        className="mt-2 h-1"
        style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
      />
    </div>
  );
}