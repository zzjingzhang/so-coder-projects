import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from '../control-panel/control-panel.component';
import { MoleculeVisualizationComponent } from '../molecule-visualization/molecule-visualization.component';
import { DataDisplayComponent } from '../data-display/data-display.component';

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [
    CommonModule,
    ControlPanelComponent,
    MoleculeVisualizationComponent,
    DataDisplayComponent
  ],
  templateUrl: './simulator.component.html',
  styleUrl: './simulator.component.css'
})
export class SimulatorComponent {

}
