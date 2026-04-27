import { FeedbackType } from '../types'

const STORAGE_KEY = 'bandit-decision-maker-problems'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

function normalizeFeedback(feedback, feedbackType) {
  switch (feedbackType) {
    case FeedbackType.SCALAR:
      return (feedback - 1) / 99
    case FeedbackType.BINARY:
      return feedback === 'good' ? 1 : 0
    case FeedbackType.STARS:
      return (feedback - 1) / 4
    default:
      return 0.5
  }
}

function sampleFromBeta(alpha, beta) {
  function sampleFromGamma(shape) {
    if (shape < 1) {
      return sampleFromGamma(1 + shape) * Math.pow(Math.random(), 1 / shape)
    }
    
    const d = shape - 1 / 3
    const c = 1 / Math.sqrt(9 * d)
    
    while (true) {
      let x, v
      do {
        x = randomNormal()
        v = 1 + c * x
      } while (v <= 0)
      
      v = v * v * v
      const u = Math.random()
      
      if (u < 1 - 0.0331 * (x * x) * (x * x)) {
        return d * v
      }
      
      if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) {
        return d * v
      }
    }
  }
  
  function randomNormal() {
    let u = 0, v = 0
    while (u === 0) u = Math.random()
    while (v === 0) v = Math.random()
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
  }
  
  const gammaAlpha = sampleFromGamma(alpha)
  const gammaBeta = sampleFromGamma(beta)
  return gammaAlpha / (gammaAlpha + gammaBeta)
}

export function getProblems() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function saveProblems(problems) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(problems))
}

export function getProblem(id) {
  const problems = getProblems()
  return problems.find(p => p.id === id)
}

export function createProblem(name, description, arms, feedbackType) {
  const problem = {
    id: generateId(),
    name,
    description,
    arms: arms.map(name => ({
      id: generateId(),
      name,
      alpha: 1,
      beta: 1,
      trials: 0,
      totalReward: 0,
      history: []
    })),
    feedbackType,
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  }
  
  const problems = getProblems()
  problems.push(problem)
  saveProblems(problems)
  
  return problem
}

export function updateProblem(id, updates) {
  const problems = getProblems()
  const index = problems.findIndex(p => p.id === id)
  
  if (index !== -1) {
    problems[index] = { ...problems[index], ...updates, lastUpdated: new Date().toISOString() }
    saveProblems(problems)
    return problems[index]
  }
  
  return null
}

export function deleteProblem(id) {
  const problems = getProblems()
  const filtered = problems.filter(p => p.id !== id)
  saveProblems(filtered)
}

export function selectNextArm(problem) {
  let bestArm = null
  let bestSample = -1
  
  for (const arm of problem.arms) {
    const sample = sampleFromBeta(arm.alpha, arm.beta)
    if (sample > bestSample) {
      bestSample = sample
      bestArm = arm
    }
  }
  
  return bestArm
}

export function updateArmWithFeedback(problem, armId, feedback) {
  const normalizedReward = normalizeFeedback(feedback, problem.feedbackType)
  
  const problems = getProblems()
  const problemIndex = problems.findIndex(p => p.id === problem.id)
  
  if (problemIndex !== -1) {
    const armIndex = problems[problemIndex].arms.findIndex(a => a.id === armId)
    
    if (armIndex !== -1) {
      const arm = problems[problemIndex].arms[armIndex]
      
      arm.alpha += normalizedReward
      arm.beta += (1 - normalizedReward)
      arm.trials += 1
      arm.totalReward += normalizedReward
      arm.history.push({
        feedback,
        normalizedReward,
        timestamp: new Date().toISOString()
      })
      
      problems[problemIndex].lastUpdated = new Date().toISOString()
      saveProblems(problems)
      
      return problems[problemIndex]
    }
  }
  
  return null
}

export function getArmStats(arm) {
  const expectedValue = arm.alpha / (arm.alpha + arm.beta)
  const variance = (arm.alpha * arm.beta) / 
    ((arm.alpha + arm.beta) * (arm.alpha + arm.beta) * (arm.alpha + arm.beta + 1))
  
  return {
    expectedValue,
    variance,
    trials: arm.trials,
    averageReward: arm.trials > 0 ? arm.totalReward / arm.trials : 0
  }
}
