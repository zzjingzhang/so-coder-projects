import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FlowChart } from '../../models/flow-chart.model';
import { FlowChartDataService } from '../../services/flow-chart-data.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-flow-chart-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './flow-chart-list.component.html',
  styleUrls: ['./flow-chart-list.component.css']
})
export class FlowChartListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'creator', 'createTime', 'actions'];
  dataSource: MatTableDataSource<FlowChart> = new MatTableDataSource<FlowChart>([]);
  loading = true;
  searchControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private flowChartDataService: FlowChartDataService
  ) {}

  ngOnInit(): void {
    this.loadFlowCharts();
    this.setupSearch();
  }

  loadFlowCharts(): void {
    this.loading = true;
    this.flowChartDataService.getFlowCharts().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((keyword: string | null) => {
          this.loading = true;
          return this.flowChartDataService.searchFlowCharts(keyword || '');
        })
      )
      .subscribe({
        next: (data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  viewDetail(flowChart: FlowChart): void {
    this.router.navigate(['/detail', flowChart.id]);
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }

  getNodeCount(flowChart: FlowChart): number {
    return flowChart.nodes?.length || 0;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
