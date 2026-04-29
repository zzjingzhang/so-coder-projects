export const STATUS = {
  VALID: 'valid',
  INVALID: 'invalid',
  WARNING: 'warning',
  PENDING: 'pending',
  IDLE: 'idle',
}

export const STATUS_LABELS = {
  [STATUS.VALID]: '有效',
  [STATUS.INVALID]: '无效',
  [STATUS.WARNING]: '警告',
  [STATUS.PENDING]: '验证中',
  [STATUS.IDLE]: '待验证',
}

export const STATUS_COLORS = {
  [STATUS.VALID]: {
    bg: 'valid.50',
    border: 'valid.500',
    text: 'valid.700',
    icon: 'check-circle',
  },
  [STATUS.INVALID]: {
    bg: 'invalid.50',
    border: 'invalid.500',
    text: 'invalid.700',
    icon: 'close-circle',
  },
  [STATUS.WARNING]: {
    bg: 'warning.50',
    border: 'warning.500',
    text: 'warning.700',
    icon: 'warning-two',
  },
  [STATUS.PENDING]: {
    bg: 'gray.50',
    border: 'gray.300',
    text: 'gray.700',
    icon: 'spinner',
  },
  [STATUS.IDLE]: {
    bg: 'gray.50',
    border: 'gray.200',
    text: 'gray.500',
    icon: 'info',
  },
}
