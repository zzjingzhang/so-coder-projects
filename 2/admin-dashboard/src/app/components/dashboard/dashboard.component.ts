import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { CardModule } from 'primeng/card';

Chart.register(...registerables);

interface InfoCard {
  title: string;
  value: string;
  icon: string;
  color: string;
  bgColor: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutChart') doughnutChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart') pieChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') barChartRef!: ElementRef<HTMLCanvasElement>;
  
  infoCards: InfoCard[] = [
    { title: '总销售额', value: '¥ 2,847,650', icon: 'pi pi-dollar', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { title: '订单数量', value: '1,847', icon: 'pi pi-shopping-cart', color: 'text-green-600', bgColor: 'bg-green-50' },
    { title: '活跃用户', value: '3,421', icon: 'pi pi-users', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { title: '转化率', value: '3.24%', icon: 'pi pi-percentage', color: 'text-orange-600', bgColor: 'bg-orange-50' }
  ];

  private lineChart: Chart | null = null;
  private doughnutChart: Chart | null = null;
  private pieChart: Chart | null = null;
  private barChart: Chart | null = null;

  ngOnInit(): void {
    this.initCharts();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.destroyCharts();
  }

  private initCharts(): void {
    if (this.lineChartRef.nativeElement) {
      this.lineChart = new Chart(this.lineChartRef.nativeElement, {
        type: 'line',
        data: {
          labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
          datasets: [{
            label: '销售额',
            data: [45000, 52000, 38000, 61000, 58000, 72000],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: true }
          }
        }
      });
    }

    if (this.doughnutChartRef.nativeElement) {
      this.doughnutChart = new Chart(this.doughnutChartRef.nativeElement, {
        type: 'doughnut',
        data: {
          labels: ['手机', '电脑', '配件', '平板', '穿戴'],
          datasets: [{
            data: [35, 25, 20, 12, 8],
            backgroundColor: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'right' }
          }
        }
      });
    }

    if (this.pieChartRef.nativeElement) {
      this.pieChart = new Chart(this.pieChartRef.nativeElement, {
        type: 'pie',
        data: {
          labels: ['在线', '离线', '忙碌'],
          datasets: [{
            data: [65, 25, 10],
            backgroundColor: ['#10B981', '#EF4444', '#F59E0B']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'right' }
          }
        }
      });
    }

    if (this.barChartRef.nativeElement) {
      this.barChart = new Chart(this.barChartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          datasets: [{
            label: '订单数',
            data: [120, 150, 180, 145, 200, 280, 220],
            backgroundColor: '#3B82F6'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: true }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  }

  private destroyCharts(): void {
    this.lineChart?.destroy();
    this.doughnutChart?.destroy();
    this.pieChart?.destroy();
    this.barChart?.destroy();
  }

  private handleResize(): void {
    this.destroyCharts();
    setTimeout(() => this.initCharts(), 100);
  }
}
