import { NodeDetail } from './node-detail.model';

export interface FlowChart {
  id: string;
  name: string;
  description: string;
  creator: string;
  createTime: string;
  nodes: FlowNode[];
}

export interface FlowNode {
  id: string;
  name: string;
  nodeType: 'start' | 'end' | 'process' | 'decision' | 'parallel';
  x: number;
  y: number;
  width: number;
  height: number;
  connectedTo: string[];
  detail: NodeDetail;
}
