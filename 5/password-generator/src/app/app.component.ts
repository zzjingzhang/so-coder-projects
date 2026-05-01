import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from './components/logo/logo.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    LogoComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Password Generator';
}
