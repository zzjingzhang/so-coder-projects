import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent {
  @Output() paramsChange = new EventEmitter<PlanetParams>();
  @Output() regenerate = new EventEmitter<void>();

  form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      seed: [42],
      noiseLevel: [5],
      waterLevel: [0.4],
      octaves: [6],
      persistence: [0.5],
      lacunarity: [2.0],
      scale: [3.0]
    });

    this.form.valueChanges.subscribe(values => {
      this.paramsChange.emit({
        seed: values.seed,
        noiseLevel: values.noiseLevel,
        waterLevel: values.waterLevel,
        octaves: values.octaves,
        persistence: values.persistence,
        lacunarity: values.lacunarity,
        scale: values.scale
      });
    });
  }

  onRegenerate(): void {
    const newSeed = Math.floor(Math.random() * 100000);
    this.form.patchValue({ seed: newSeed }, { emitEvent: false });
    this.regenerate.emit();
    this.paramsChange.emit({
      ...this.form.value,
      seed: newSeed
    });
  }

  resetToDefaults(): void {
    this.form.setValue({
      seed: 42,
      noiseLevel: 5,
      waterLevel: 0.4,
      octaves: 6,
      persistence: 0.5,
      lacunarity: 2.0,
      scale: 3.0
    });
  }
}
