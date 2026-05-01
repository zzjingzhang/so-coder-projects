import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DashboardService, Metric } from '../../services/dashboard.service';

@Component({
  selector: 'app-metric-cards',
  templateUrl: './metric-cards.component.html',
  styleUrls: ['./metric-cards.component.css'],
  standalone: false
})
export class MetricCardsComponent implements OnInit {
  metrics: Metric[] = [];
  activeMetricId: string = '1';

  @Output() metricSelected = new EventEmitter<string>();

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getMetrics().subscribe(metrics => {
      this.metrics = metrics;
    });
  }

  selectMetric(metricId: string): void {
    this.activeMetricId = metricId;
    this.metricSelected.emit(metricId);
  }
}
