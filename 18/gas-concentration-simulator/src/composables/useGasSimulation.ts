import { ref, reactive, computed } from 'vue'
import type { GasMoles, SimulationState, ConcentrationDataPoint } from '../types/gas'

export function useGasSimulation(initialMode: 'constant-volume' | 'constant-pressure') {
  const mode = ref(initialMode)
  
  const initialMoles: GasMoles = {
    N2: 1.0,
    H2: 2.0,
    He: 0.0
  }
  
  const moles = reactive<GasMoles>({ ...initialMoles })
  
  const temperature = ref(298)
  
  const baseVolume = ref(10)
  const basePressure = ref(1)
  
  const simulationState = ref(0)
  const timePoints = ref(0)
  
  const concentrationHistory = ref<ConcentrationDataPoint[]>([{
    time: 0,
    N2: calculateConcentration(initialMoles.N2, baseVolume.value),
    H2: calculateConcentration(initialMoles.H2, baseVolume.value),
    He: calculateConcentration(initialMoles.He, baseVolume.value)
  }])
  
  function calculateConcentration(mol: number, vol: number): number {
    return mol / vol
  }
  
  const totalMoles = computed(() => {
    return moles.N2 + moles.H2 + moles.He
  })
  
  const currentVolume = computed(() => {
    if (mode.value === 'constant-pressure') {
      const initialTotal = initialMoles.N2 + initialMoles.H2 + initialMoles.He
      return baseVolume.value * (totalMoles.value / initialTotal)
    }
    return baseVolume.value
  })
  
  const currentPressure = computed(() => {
    if (mode.value === 'constant-volume') {
      const initialTotal = initialMoles.N2 + initialMoles.H2 + initialMoles.He
      return basePressure.value * (totalMoles.value / initialTotal)
    }
    return basePressure.value
  })
  
  const concentrations = computed(() => ({
    N2: calculateConcentration(moles.N2, currentVolume.value),
    H2: calculateConcentration(moles.H2, currentVolume.value),
    He: calculateConcentration(moles.He, currentVolume.value)
  }))
  
  function addHelium(amount: number = 0.1) {
    moles.He += amount
    timePoints.value++
    simulationState.value++
    
    concentrationHistory.value.push({
      time: timePoints.value,
      N2: concentrations.value.N2,
      H2: concentrations.value.H2,
      He: concentrations.value.He
    })
  }
  
  function reset() {
    moles.N2 = initialMoles.N2
    moles.H2 = initialMoles.H2
    moles.He = initialMoles.He
    timePoints.value = 0
    simulationState.value = 0
    concentrationHistory.value = [{
      time: 0,
      N2: calculateConcentration(initialMoles.N2, baseVolume.value),
      H2: calculateConcentration(initialMoles.H2, baseVolume.value),
      He: calculateConcentration(initialMoles.He, baseVolume.value)
    }]
  }
  
  function setMode(newMode: 'constant-volume' | 'constant-pressure') {
    mode.value = newMode
    reset()
  }
  
  return {
    mode,
    moles,
    temperature,
    totalMoles,
    currentVolume,
    currentPressure,
    concentrations,
    concentrationHistory,
    timePoints,
    simulationState,
    addHelium,
    reset,
    setMode
  }
}
