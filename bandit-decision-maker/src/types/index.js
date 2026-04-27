export const FeedbackType = {
  SCALAR: 'scalar',
  BINARY: 'binary',
  STARS: 'stars'
}

export const FeedbackTypeLabels = {
  [FeedbackType.SCALAR]: '标量评分 (1-100)',
  [FeedbackType.BINARY]: '好/坏',
  [FeedbackType.STARS]: '星标评分 (1-5)'
}
