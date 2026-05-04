export type GasType = 'N2' | 'H2' | 'He'

export interface GasParticle {
  id: number
  type: GasType
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export interface GasConcentration {
  N2: number
  H2: number
  He: number
}

export interface GasMoles {
  N2: number
  H2: number
  He: number
}

export interface SimulationState {
  moles: GasMoles
  volume: number
  temperature: number
  pressure: number
  timePoint: number
}

export type SimulationMode = 'constant-volume' | 'constant-pressure'

export interface ConcentrationDataPoint {
  time: number
  N2: number
  H2: number
  He: number
}
