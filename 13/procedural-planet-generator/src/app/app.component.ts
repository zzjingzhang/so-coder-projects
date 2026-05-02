import { Component } from '@angular/core';

interface PlanetParams {
  seed: number;
  noiseLevel: number;
  waterLevel: number;
  octaves: number;
  persistence: number;
  lacunarity: number;
  scale: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '程序性行星生成器';
  
  planetParams: PlanetParams = {
    seed: 42,
    noiseLevel: 5,
    waterLevel: 0.4,
    octaves: 6,
    persistence: 0.5,
    lacunarity: 2.0,
    scale: 3.0
  };

  onParamsChange(params: PlanetParams): void {
    this.planetParams = params;
  }
}
