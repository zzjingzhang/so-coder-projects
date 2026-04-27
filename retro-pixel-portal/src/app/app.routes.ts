import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LinksComponent } from './components/links/links.component';
import { GuestbookComponent } from './components/guestbook/guestbook.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'links', component: LinksComponent },
  { path: 'guestbook', component: GuestbookComponent },
  { path: '**', component: NotFoundComponent }
];
