import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SupplyChainData, FilterOptions, NodeType } from '../models/supply-chain.model';

@Injectable({
  providedIn: 'root'
})
export class SupplyChainDataService {
  private readonly rawData: SupplyChainData = {
    nodes: [
      { id: 'factory1', name: '上海工厂', type: 'factory' },
      { id: 'factory2', name: '深圳工厂', type: 'factory' },
      { id: 'factory3', name: '北京工厂', type: 'factory' },
      { id: 'warehouse1', name: '华东仓库', type: 'warehouse' },
      { id: 'warehouse2', name: '华南仓库', type: 'warehouse' },
      { id: 'warehouse3', name: '华北仓库', type: 'warehouse' },
      { id: 'retailer1', name: '天猫旗舰店', type: 'retailer' },
      { id: 'retailer2', name: '京东商城', type: 'retailer' },
      { id: 'retailer3', name: '苏宁易购', type: 'retailer' },
      { id: 'retailer4', name: '线下门店', type: 'retailer' }
    ],
    links: [
      { source: 'factory1', target: 'warehouse1', value: 1200, product: '电子产品' },
      { source: 'factory1', target: 'warehouse2', value: 800, product: '电子产品' },
      { source: 'factory2', target: 'warehouse2', value: 1500, product: '服装' },
      { source: 'factory2', target: 'warehouse1', value: 600, product: '服装' },
      { source: 'factory3', target: 'warehouse3', value: 1000, product: '家电' },
      { source: 'factory3', target: 'warehouse2', value: 400, product: '家电' },
      { source: 'warehouse1', target: 'retailer1', value: 900, product: '电子产品' },
      { source: 'warehouse1', target: 'retailer2', value: 700, product: '电子产品' },
      { source: 'warehouse1', target: 'retailer4', value: 200, product: '服装' },
      { source: 'warehouse2', target: 'retailer1', value: 500, product: '电子产品' },
      { source: 'warehouse2', target: 'retailer2', value: 600, product: '服装' },
      { source: 'warehouse2', target: 'retailer3', value: 800, product: '服装' },
      { source: 'warehouse2', target: 'retailer4', value: 300, product: '家电' },
      { source: 'warehouse3', target: 'retailer3', value: 600, product: '家电' },
      { source: 'warehouse3', target: 'retailer4', value: 400, product: '家电' }
    ]
  };

  getProducts(): string[] {
    const products = new Set<string>();
    this.rawData.links.forEach(link => {
      if (link.product) {
        products.add(link.product);
      }
    });
    return Array.from(products);
  }

  getNodeTypes(): NodeType[] {
    return ['factory', 'warehouse', 'retailer'];
  }

  getDefaultFilters(): FilterOptions {
    return {
      nodeTypes: ['factory', 'warehouse', 'retailer'],
      minFlowValue: 0,
      products: this.getProducts()
    };
  }

  getData(): Observable<SupplyChainData> {
    return of(this.rawData);
  }

  getFilteredData(filters: FilterOptions): Observable<SupplyChainData> {
    const filteredLinks = this.rawData.links.filter(link => {
      if (link.value < filters.minFlowValue) {
        return false;
      }
      if (filters.products.length > 0 && link.product) {
        if (!filters.products.includes(link.product)) {
          return false;
        }
      }
      return true;
    });

    const connectedNodeIds = new Set<string>();
    filteredLinks.forEach(link => {
      connectedNodeIds.add(link.source);
      connectedNodeIds.add(link.target);
    });

    const filteredNodes = this.rawData.nodes.filter(node => {
      if (!filters.nodeTypes.includes(node.type)) {
        return false;
      }
      return connectedNodeIds.has(node.id);
    });

    const finalLinks = filteredLinks.filter(link => {
      const sourceNode = filteredNodes.find(n => n.id === link.source);
      const targetNode = filteredNodes.find(n => n.id === link.target);
      return sourceNode && targetNode;
    });

    return of({
      nodes: filteredNodes,
      links: finalLinks
    });
  }
}
