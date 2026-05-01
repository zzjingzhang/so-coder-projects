import { Component, OnInit } from '@angular/core';
import { DashboardService, BurnChartData } from '../../services/dashboard.service';

@Component({
  selector: 'app-burn-chart',
  templateUrl: './burn-chart.component.html',
  styleUrls: ['./burn-chart.component.css'],
  standalone: false
})
export class BurnChartComponent implements OnInit {
  chartData: BurnChartData[] = [];
  totalValue: number = 0;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getBurnChartData().subscribe(data => {
      this.chartData = data;
      this.totalValue = data.reduce((sum, item) => sum + item.value, 0);
    });
  }

  getPathForItem(index: number): string {
    const radius = 100;
    const center = 120;
    let startAngle = -Math.PI / 2;
    
    let cumulativeAngle = 0;
    for (let i = 0; i < index; i++) {
      cumulativeAngle += (this.chartData[i].value / this.totalValue) * 2 * Math.PI;
    }
    
    const currentAngle = (this.chartData[index].value / this.totalValue) * 2 * Math.PI;
    const endAngle = startAngle + cumulativeAngle + currentAngle;
    const adjustedStartAngle = startAngle + cumulativeAngle;

    const x1 = center + radius * Math.cos(adjustedStartAngle);
    const y1 = center + radius * Math.sin(adjustedStartAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const largeArcFlag = currentAngle > Math.PI ? 1 : 0;

    return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  }

  getPercentage(value: number): number {
    return Math.round((value / this.totalValue) * 100);
  }
}
