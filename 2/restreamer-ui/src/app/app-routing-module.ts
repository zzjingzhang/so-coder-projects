import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'channels',
        loadChildren: () => import('./features/channels/channels.module').then(m => m.ChannelsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'system',
        loadChildren: () => import('./features/system/system.module').then(m => m.SystemModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'player',
        loadChildren: () => import('./features/player/player.module').then(m => m.PlayerModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'callback',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'embed/:channelId',
    loadChildren: () => import('./features/embed/embed.module').then(m => m.EmbedModule)
  },
  {
    path: 'oembed',
    loadChildren: () => import('./features/oembed/oembed.module').then(m => m.OEmbedModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
