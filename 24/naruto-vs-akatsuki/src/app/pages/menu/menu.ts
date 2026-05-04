import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, NzButtonModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent implements OnInit {
  gameTitle: string = '火影忍者 VS 晓组织';
  gameSubtitle: string = '忍者村保卫战';
  showInstructions: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  startGame(): void {
    this.router.navigate(['/game']);
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }
}
