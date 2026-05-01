import { Routes } from '@angular/router';
import { PipelineEditorComponent } from './components/pipeline-editor/pipeline-editor.component';

export const routes: Routes = [
  {
    path: '',
    component: PipelineEditorComponent,
    pathMatch: 'full'
  }
];
