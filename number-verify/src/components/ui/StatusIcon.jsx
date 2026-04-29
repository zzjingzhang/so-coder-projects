import { Icon, Spinner } from '@chakra-ui/react'
import { CheckCircleIcon, CloseIcon, WarningTwoIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { STATUS } from '../../constants/status'

const iconMap = {
  [STATUS.VALID]: CheckCircleIcon,
  [STATUS.INVALID]: CloseIcon,
  [STATUS.WARNING]: WarningTwoIcon,
  [STATUS.IDLE]: InfoOutlineIcon,
  [STATUS.PENDING]: null,
}

const colorMap = {
  [STATUS.VALID]: 'valid.500',
  [STATUS.INVALID]: 'invalid.500',
  [STATUS.WARNING]: 'warning.500',
  [STATUS.IDLE]: 'gray.400',
  [STATUS.PENDING]: 'blue.500',
}

export const StatusIcon = ({ status, size = 'md', ...props }) => {
  if (status === STATUS.PENDING) {
    return <Spinner size={size} color={colorMap[status]} {...props} />
  }

  const IconComponent = iconMap[status] || InfoOutlineIcon

  return (
    <Icon
      as={IconComponent}
      boxSize={size === 'sm' ? 4 : size === 'md' ? 6 : size === 'lg' ? 8 : 10}
      color={colorMap[status] || colorMap[STATUS.IDLE]}
      {...props}
    />
  )
}
