import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SuccessStoriesComponent } from './components/success-stories/success-stories.component';
import { ResourceGuideComponent } from './components/resource-guide/resource-guide.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    pathMatch: 'full'
  },
  { 
    path: 'success-stories', 
    component: SuccessStoriesComponent 
  },
  { 
    path: 'resource-guide', 
    component: ResourceGuideComponent 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
