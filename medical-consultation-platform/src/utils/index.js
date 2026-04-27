export const cn = (...args) => {
  return args.filter(Boolean).join(' ');
};

export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatTime = (date) => {
  const d = new Date(date);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const formatDateTime = (date) => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

export const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

export const generateId = () => {
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
  }).format(amount);
};

export const getStatusBadgeColor = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-warning/10 text-warning';
    case 'confirmed':
      return 'bg-success/10 text-success';
    case 'completed':
      return 'bg-primary/10 text-primary';
    case 'cancelled':
      return 'bg-danger/10 text-danger';
    case 'active':
      return 'bg-success/10 text-success';
    case 'inactive':
      return 'bg-text-secondary/10 text-text-secondary';
    default:
      return 'bg-text-secondary/10 text-text-secondary';
  }
};

export const getStatusText = (status) => {
  switch (status) {
    case 'pending':
      return '待确认';
    case 'confirmed':
      return '已确认';
    case 'completed':
      return '已完成';
    case 'cancelled':
      return '已取消';
    case 'active':
      return '进行中';
    case 'inactive':
      return '已结束';
    default:
      return status;
  }
};
