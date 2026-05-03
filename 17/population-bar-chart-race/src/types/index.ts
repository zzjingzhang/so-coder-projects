export interface CountryData {
  id: string
  name: string
  population: number
  color: string
  rank: number
}

export interface YearData {
  year: number
  countries: CountryData[]
}

export interface AnimationConfig {
  isPlaying: boolean
  speed: number
  currentYear: number
  startYear: number
  endYear: number
  displayCount: number
}

export interface ControlPanelProps {
  config: AnimationConfig
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  onSpeedChange: (speed: number) => void
  onYearChange: (year: number) => void
  onDisplayCountChange: (count: number) => void
}

export interface BarChartRaceProps {
  data: YearData[]
  config: AnimationConfig
}

export interface DataTableProps {
  data: YearData[]
  currentYear: number
}
