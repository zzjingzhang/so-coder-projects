import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal, SankeyGraph, SankeyNode, SankeyLink } from 'd3-sankey';
import { SupplyChainData, SupplyChainNode, NodeType } from '../../models/supply-chain.model';

interface SankeyNodeExtra {
  id: string;
  name: string;
  type: NodeType;
}

interface SankeyLinkExtra {
  value: number;
  product?: string;
}

type SNode = SankeyNode<SankeyNodeExtra, SankeyLinkExtra>;
type SLink = SankeyLink<SankeyNodeExtra, SankeyLinkExtra>;

@Component({
  selector: 'app-sankey-chart',
  standalone: true,
  imports: [],
  template: `
    <div class="sankey-container w-full" #containerRef>
      <svg #sankeySvg class="w-full"></svg>
      <div #tooltip class="tooltip hidden absolute bg-gray-800 text-white px-3 py-2 rounded-lg text-sm pointer-events-none z-50 shadow-lg"></div>
    </div>
  `,
  styles: [`
    .sankey-container {
      position: relative;
      min-height: 550px;
      width: 100%;
    }
  `]
})
export class SankeyChartComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() data!: SupplyChainData;
  @ViewChild('sankeySvg') sankeySvg!: ElementRef<SVGSVGElement>;
  @ViewChild('tooltip') tooltip!: ElementRef<HTMLDivElement>;
  @ViewChild('containerRef') containerRef!: ElementRef<HTMLDivElement>;

  private readonly nodeColors: Record<NodeType, string> = {
    factory: '#2563eb',
    warehouse: '#059669',
    retailer: '#d97706'
  };

  private readonly linkColors: Record<NodeType, string> = {
    factory: 'rgba(37, 99, 235, 0.4)',
    warehouse: 'rgba(5, 150, 105, 0.4)',
    retailer: 'rgba(217, 119, 6, 0.4)'
  };

  private resizeObserver: ResizeObserver | null = null;
  private isViewInitialized = false;
  private pendingData: SupplyChainData | null = null;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.isViewInitialized = true;
    this.setupResizeObserver();
    if (this.pendingData) {
      this.renderChart();
      this.pendingData = null;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      if (this.isViewInitialized && this.sankeySvg) {
        this.renderChart();
      } else {
        this.pendingData = this.data;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  private setupResizeObserver(): void {
    if (!this.containerRef) return;

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && this.data) {
          requestAnimationFrame(() => {
            if (this.isViewInitialized) {
              this.renderChart();
            }
          });
        }
      }
    });

    this.resizeObserver.observe(this.containerRef.nativeElement);
  }

  private renderChart(): void {
    if (!this.data || this.data.nodes.length === 0 || this.data.links.length === 0) {
      return;
    }

    if (!this.sankeySvg || !this.sankeySvg.nativeElement) {
      return;
    }

    const svgElement = this.sankeySvg.nativeElement;
    const container = this.containerRef?.nativeElement || svgElement.parentElement;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const width = Math.max(400, containerWidth - 80);
    const height = 550;
    const margin = { top: 30, right: 120, bottom: 30, left: 120 };

    d3.select(svgElement).selectAll('*').remove();

    const svg = d3.select(svgElement)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('display', 'block')
      .style('margin', '0 auto');

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const nodeMap = new Map<string, SankeyNodeExtra>();
    this.data.nodes.forEach(node => {
      nodeMap.set(node.id, { id: node.id, name: node.name, type: node.type });
    });

    const graph: SankeyGraph<SankeyNodeExtra, SankeyLinkExtra> = {
      nodes: Array.from(nodeMap.values()),
      links: this.data.links.map(link => ({
        source: nodeMap.get(link.source)!,
        target: nodeMap.get(link.target)!,
        value: link.value,
        product: link.product
      }))
    };

    const sankeyGenerator = sankey<SankeyNodeExtra, SankeyLinkExtra>()
      .nodeWidth(30)
      .nodePadding(60)
      .extent([[0, 0], [width, height]]);

    const sankeyGraph = sankeyGenerator(graph);
    const nodes = sankeyGraph.nodes as SNode[];
    const links = sankeyGraph.links as SLink[];

    const linkGroup = g.append('g')
      .attr('class', 'links')
      .selectAll('path')
      .data(links)
      .enter()
      .append('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke', (d: SLink) => {
        const sourceNode = d.source as SNode;
        return this.linkColors[sourceNode.type] || 'rgba(150, 150, 150, 0.4)';
      })
      .attr('stroke-width', (d: SLink) => Math.max(2, d.width || 0))
      .attr('fill', 'none')
      .attr('opacity', 0.6)
      .style('cursor', 'pointer')
      .on('mouseenter', (event: MouseEvent, d: SLink) => this.showLinkTooltip(event, d))
      .on('mousemove', (event: MouseEvent) => this.moveTooltip(event))
      .on('mouseleave', () => this.hideTooltip());

    const nodeGroup = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g');

    nodeGroup.append('rect')
      .attr('x', (d: SNode) => d.x0 || 0)
      .attr('y', (d: SNode) => d.y0 || 0)
      .attr('height', (d: SNode) => Math.max(1, (d.y1 || 0) - (d.y0 || 0)))
      .attr('width', (d: SNode) => (d.x1 || 0) - (d.x0 || 0))
      .attr('fill', (d: SNode) => this.nodeColors[d.type] || '#6b7280')
      .attr('rx', 4)
      .attr('ry', 4)
      .style('cursor', 'pointer')
      .on('mouseenter', (event: MouseEvent, d: SNode) => this.showNodeTooltip(event, d))
      .on('mousemove', (event: MouseEvent) => this.moveTooltip(event))
      .on('mouseleave', () => this.hideTooltip());

    nodeGroup.append('text')
      .attr('x', (d: SNode) => {
        const x0 = d.x0 || 0;
        const x1 = d.x1 || 0;
        return (x0 + x1) / 2;
      })
      .attr('y', (d: SNode) => {
        const y0 = d.y0 || 0;
        const y1 = d.y1 || 0;
        return (y0 + y1) / 2;
      })
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', '#1f2937')
      .attr('font-weight', '600')
      .attr('font-size', '13px')
      .text((d: SNode) => d.name)
      .style('pointer-events', 'none');

    nodeGroup.append('text')
      .attr('x', (d: SNode) => {
        const x0 = d.x0 || 0;
        const x1 = d.x1 || 0;
        return (x0 + x1) / 2;
      })
      .attr('y', (d: SNode) => {
        const y0 = d.y0 || 0;
        const y1 = d.y1 || 0;
        return (y0 + y1) / 2 + 18;
      })
      .attr('text-anchor', 'middle')
      .attr('fill', '#6b7280')
      .attr('font-size', '11px')
      .text((d: SNode) => `流量: ${Math.round(d.value || 0)}`)
      .style('pointer-events', 'none');
  }

  private showNodeTooltip(event: MouseEvent, d: SNode): void {
    const typeNames: Record<NodeType, string> = {
      factory: '工厂',
      warehouse: '仓库',
      retailer: '零售商'
    };

    const html = `
      <div class="font-semibold">${d.name}</div>
      <div class="text-gray-300 mt-1">类型: ${typeNames[d.type]}</div>
      <div class="text-gray-300">总流量: ${Math.round(d.value || 0)}</div>
    `;

    if (this.tooltip && this.tooltip.nativeElement) {
      this.tooltip.nativeElement.innerHTML = html;
      this.tooltip.nativeElement.classList.remove('hidden');
    }
  }

  private showLinkTooltip(event: MouseEvent, d: SLink): void {
    const sourceNode = d.source as SNode;
    const targetNode = d.target as SNode;

    const html = `
      <div class="font-semibold">物料流动</div>
      <div class="text-gray-300 mt-1">从: ${sourceNode.name}</div>
      <div class="text-gray-300">到: ${targetNode.name}</div>
      <div class="text-gray-300">流量: ${d.value}</div>
      ${d.product ? `<div class="text-gray-300">产品: ${d.product}</div>` : ''}
    `;

    if (this.tooltip && this.tooltip.nativeElement) {
      this.tooltip.nativeElement.innerHTML = html;
      this.tooltip.nativeElement.classList.remove('hidden');
    }
  }

  private moveTooltip(event: MouseEvent): void {
    if (!this.tooltip || !this.tooltip.nativeElement) return;

    const tooltipEl = this.tooltip.nativeElement;
    const x = event.pageX + 15;
    const y = event.pageY - 10;

    tooltipEl.style.left = `${x}px`;
    tooltipEl.style.top = `${y}px`;
  }

  private hideTooltip(): void {
    if (this.tooltip && this.tooltip.nativeElement) {
      this.tooltip.nativeElement.classList.add('hidden');
    }
  }
}
