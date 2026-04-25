export interface OrgNode {
  id: string
  name: string
  title: string
  x: number
  y: number
  description?: string
  department?: string
  avatar?: string
  phone?: string
  email?: string
}

export interface OrgConnection {
  id: string
  from: string
  to: string
}

export interface OrgChartData {
  nodes: OrgNode[]
  connections: OrgConnection[]
}
