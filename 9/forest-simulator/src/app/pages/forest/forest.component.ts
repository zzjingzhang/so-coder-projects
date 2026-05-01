import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForestRendererService } from '../../services/forest-renderer.service';
import { EnvironmentService } from '../../services/environment.service';
import { EnvironmentState } from '../../models/environment.model';
import { Subscription } from 'rxjs';
import { ControlPanelComponent } from '../../components/control-panel/control-panel.component';

@Component({
  selector: 'app-forest',
  standalone: true,
  imports: [CommonModule, ControlPanelComponent],
  templateUrl: './forest.component.html',
  styleUrls: ['./forest.component.css']
})
export class ForestComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  environmentState!: EnvironmentState;
  private stateSubscription: Subscription | null = null;

  constructor(
    private forestRenderer: ForestRendererService,
    private environmentService: EnvironmentService
  ) {}

  ngOnInit(): void {
    this.forestRenderer.init(this.canvasContainer.nativeElement);
    this.stateSubscription = this.environmentService.state$.subscribe(
      (state) => {
        this.environmentState = state;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
  }
}
