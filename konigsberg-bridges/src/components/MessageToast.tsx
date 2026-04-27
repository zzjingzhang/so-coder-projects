import { useEffect } from 'react';
import './MessageToast.css';

interface MessageToastProps {
  message: string | null;
  messageType: 'info' | 'success' | 'error' | 'warning';
  onClose: () => void;
}

const MessageToast = ({ message, messageType, onClose }: MessageToastProps) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const getBackgroundColor = () => {
    switch (messageType) {
      case 'success':
        return '#10b981';
      case 'error':
        return '#ef4444';
      case 'warning':
        return '#f59e0b';
      default:
        return '#0071e3';
    }
  };

  const getIcon = () => {
    switch (messageType) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  };

  return (
    <div className="message-toast-container">
      <div
        className="message-toast"
        style={{
          backgroundColor: getBackgroundColor(),
        }}
      >
        <span className="message-icon">{getIcon()}</span>
        <span className="message-text">{message}</span>
        <button className="message-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default MessageToast;
