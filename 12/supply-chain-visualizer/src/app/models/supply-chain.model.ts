export type NodeType = 'factory' | 'warehouse' | 'retailer';

export interface SupplyChainNode {
  id: string;
  name: string;
  type: NodeType;
  value?: number;
}

export interface SupplyChainLink {
  source: string;
  target: string;
  value: number;
  product?: string;
}

export interface SupplyChainData {
  nodes: SupplyChainNode[];
  links: SupplyChainLink[];
}

export interface FilterOptions {
  nodeTypes: NodeType[];
  minFlowValue: number;
  products: string[];
}
