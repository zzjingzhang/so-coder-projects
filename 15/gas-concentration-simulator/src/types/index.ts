export interface GasState {
  nitrogen: number;
  hydrogen: number;
  helium: number;
}

export interface SimulationParams {
  initialNitrogen: number;
  initialHydrogen: number;
  heliumAdded: number;
}

export const GAS_COLORS = {
  nitrogen: '#3b82f6',
  hydrogen: '#10b981',
  helium: '#f59e0b',
};

export const GAS_NAMES = {
  nitrogen: '氮气',
  hydrogen: '氢气',
  helium: '氦气',
};
