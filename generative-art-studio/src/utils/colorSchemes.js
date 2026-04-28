export const colorSchemes = {
  sunset: {
    name: '日落',
    colors: ['#FF6B6B', '#FFA07A', '#FFD93D', '#FF8C00', '#FF4500'],
    background: '#1a1a2e'
  },
  ocean: {
    name: '海洋',
    colors: ['#00B4DB', '#0083B0', '#00CED1', '#20B2AA', '#48D1CC'],
    background: '#0c2d48'
  },
  forest: {
    name: '森林',
    colors: ['#228B22', '#32CD32', '#90EE90', '#6B8E23', '#556B2F'],
    background: '#1a3a1a'
  },
  neon: {
    name: '霓虹',
    colors: ['#FF00FF', '#00FFFF', '#FF00CC', '#00CCFF', '#CC00FF'],
    background: '#0a0a0a'
  },
  pastel: {
    name: '柔和',
    colors: ['#FFB6C1', '#98FB98', '#ADD8E6', '#DDA0DD', '#F0E68C'],
    background: '#2d2d44'
  },
  monochrome: {
    name: '单色',
    colors: ['#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333'],
    background: '#111111'
  },
  fire: {
    name: '火焰',
    colors: ['#FF0000', '#FF4500', '#FF6347', '#FF8C00', '#FFA500'],
    background: '#1a0a00'
  },
  cosmic: {
    name: '宇宙',
    colors: ['#9B59B6', '#8E44AD', '#3498DB', '#2980B9', '#1ABC9C'],
    background: '#0d0d1a'
  }
}

export const getRandomColor = (colors) => {
  return colors[Math.floor(Math.random() * colors.length)]
}

export const hexToRgba = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
