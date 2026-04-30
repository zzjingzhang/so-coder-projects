import { Component, ElementRef, HostListener, ViewChild, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface MenuItem {
  icon: string;
  label: string;
  action: string;
}

type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

@Component({
  selector: 'app-floating-menu',
  standalone: false,
  templateUrl: './floating-menu.component.html',
  styleUrls: ['./floating-menu.component.css']
})
export class FloatingMenuComponent implements OnInit, OnDestroy {
  @ViewChild('floatingButton', { static: true }) floatingButton!: ElementRef;
  @ViewChild('menuPopup', { static: true }) menuPopup!: ElementRef;

  buttonSize: number = 56;
  isDragging: boolean = false;
  isMenuOpen: boolean = false;
  dragOffsetX: number = 0;
  dragOffsetY: number = 0;
  isResizing: boolean = false;
  resizeStartX: number = 0;
  resizeStartY: number = 0;

  themeColor: string = '#3f51b5';
  shadowColor: string = 'rgba(63, 81, 181, 0.4)';

  offsetX: number = 0;
  offsetY: number = 0;
  closestCorner: Corner = 'bottom-right';
  lastWindowWidth: number = 0;
  lastWindowHeight: number = 0;

  menuItems: MenuItem[] = [
    { icon: 'settings', label: '处理中心', action: 'processing' },
    { icon: 'work', label: '我的工作台', action: 'workbench' },
    { icon: 'folder', label: '资源管理', action: 'resources' }
  ];

  colorOptions: string[] = [
    '#3f51b5',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#2196f3',
    '#00bcd4',
    '#4caf50',
    '#ff9800',
    '#ff5722',
    '#795548'
  ];

  private mouseMoveListener: any;
  private mouseUpListener: any;

  constructor(
    private renderer: Renderer2,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.lastWindowWidth = window.innerWidth;
    this.lastWindowHeight = window.innerHeight;
    this.offsetX = 20;
    this.offsetY = 20;
    this.closestCorner = 'bottom-right';
    this.applyButtonPosition();
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
  }

  applyButtonPosition(): void {
    if (!this.floatingButton) return;

    const padding = 20;
    let top: number, left: number;
    const maxTop = window.innerHeight - this.buttonSize - padding;
    const maxLeft = window.innerWidth - this.buttonSize - padding;

    switch (this.closestCorner) {
      case 'top-left':
        top = Math.max(this.offsetY, padding);
        left = Math.max(this.offsetX, padding);
        break;
      case 'top-right':
        top = Math.max(this.offsetY, padding);
        left = Math.min(window.innerWidth - this.offsetX - this.buttonSize, maxLeft);
        break;
      case 'bottom-left':
        top = Math.min(window.innerHeight - this.offsetY - this.buttonSize, maxTop);
        left = Math.max(this.offsetX, padding);
        break;
      case 'bottom-right':
      default:
        top = Math.min(window.innerHeight - this.offsetY - this.buttonSize, maxTop);
        left = Math.min(window.innerWidth - this.offsetX - this.buttonSize, maxLeft);
        break;
    }

    this.renderer.setStyle(this.floatingButton.nativeElement, 'top', `${top}px`);
    this.renderer.setStyle(this.floatingButton.nativeElement, 'left', `${left}px`);
    this.renderer.setStyle(this.floatingButton.nativeElement, 'right', 'auto');
    this.renderer.setStyle(this.floatingButton.nativeElement, 'bottom', 'auto');
  }

  findClosestCorner(left: number, top: number): Corner {
    const centerX = left + this.buttonSize / 2;
    const centerY = top + this.buttonSize / 2;

    const distToTopLeft = centerX + centerY;
    const distToTopRight = (window.innerWidth - centerX) + centerY;
    const distToBottomLeft = centerX + (window.innerHeight - centerY);
    const distToBottomRight = (window.innerWidth - centerX) + (window.innerHeight - centerY);

    const minDist = Math.min(distToTopLeft, distToTopRight, distToBottomLeft, distToBottomRight);

    if (minDist === distToTopLeft) return 'top-left';
    if (minDist === distToTopRight) return 'top-right';
    if (minDist === distToBottomLeft) return 'bottom-left';
    return 'bottom-right';
  }

  calculateOffsetFromCorner(left: number, top: number, corner: Corner): { offsetX: number, offsetY: number } {
    switch (corner) {
      case 'top-left':
        return { offsetX: left, offsetY: top };
      case 'top-right':
        return { offsetX: window.innerWidth - left - this.buttonSize, offsetY: top };
      case 'bottom-left':
        return { offsetX: left, offsetY: window.innerHeight - top - this.buttonSize };
      case 'bottom-right':
      default:
        return { offsetX: window.innerWidth - left - this.buttonSize, offsetY: window.innerHeight - top - this.buttonSize };
    }
  }

  onDragStart(event: MouseEvent | TouchEvent): void {
    if (this.isResizing) return;

    this.isDragging = true;

    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

    const buttonRect = this.floatingButton.nativeElement.getBoundingClientRect();
    this.dragOffsetX = clientX - buttonRect.left;
    this.dragOffsetY = clientY - buttonRect.top;

    this.addEventListeners();
    event.preventDefault();
  }

  onResizeStart(event: MouseEvent): void {
    this.isResizing = true;
    this.resizeStartX = event.clientX;
    this.resizeStartY = event.clientY;
    this.addEventListeners();
    event.stopPropagation();
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isDragging && !this.isResizing) {
      const clientX = event.clientX;
      const clientY = event.clientY;

      const padding = 20;
      let newLeft = clientX - this.dragOffsetX;
      let newTop = clientY - this.dragOffsetY;

      const maxLeft = window.innerWidth - this.buttonSize - padding;
      const maxTop = window.innerHeight - this.buttonSize - padding;

      newLeft = Math.min(Math.max(newLeft, padding), maxLeft);
      newTop = Math.min(Math.max(newTop, padding), maxTop);

      this.closestCorner = this.findClosestCorner(newLeft, newTop);
      const offset = this.calculateOffsetFromCorner(newLeft, newTop, this.closestCorner);
      this.offsetX = offset.offsetX;
      this.offsetY = offset.offsetY;

      this.renderer.setStyle(this.floatingButton.nativeElement, 'top', `${newTop}px`);
      this.renderer.setStyle(this.floatingButton.nativeElement, 'left', `${newLeft}px`);
      this.renderer.setStyle(this.floatingButton.nativeElement, 'right', 'auto');
      this.renderer.setStyle(this.floatingButton.nativeElement, 'bottom', 'auto');
    } else if (this.isResizing) {
      const deltaX = event.clientX - this.resizeStartX;

      this.buttonSize = Math.max(40, Math.min(120, this.buttonSize + deltaX));
      this.resizeStartX = event.clientX;
      this.resizeStartY = event.clientY;

      this.renderer.setStyle(this.floatingButton.nativeElement, 'width', `${this.buttonSize}px`);
      this.renderer.setStyle(this.floatingButton.nativeElement, 'height', `${this.buttonSize}px`);
    }
  }

  onMouseUp(): void {
    this.isDragging = false;
    this.isResizing = false;
    this.removeEventListeners();
  }

  addEventListeners(): void {
    this.mouseMoveListener = this.renderer.listen('document', 'mousemove', (event: MouseEvent) => this.onMouseMove(event));
    this.mouseUpListener = this.renderer.listen('document', 'mouseup', () => this.onMouseUp());
  }

  removeEventListeners(): void {
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
      this.mouseMoveListener = null;
    }
    if (this.mouseUpListener) {
      this.mouseUpListener();
      this.mouseUpListener = null;
    }
  }

  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.closestCorner = 'bottom-right';
    this.offsetX = 20;
    this.offsetY = 20;
    this.applyButtonPosition();
  }

  onMenuItemClick(item: MenuItem): void {
    const messages: { [key: string]: string } = {
      'processing': '您点击了：处理中心',
      'workbench': '您点击了：我的工作台',
      'resources': '您点击了：资源管理'
    };

    this.snackBar.open(messages[item.action], '关闭', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });

    this.closeMenu();
  }

  selectColor(color: string): void {
    this.themeColor = color;
    this.updateThemeColor(color);
  }

  updateThemeColor(color: string): void {
    const hexToRgba = (hex: string, alpha: number): string => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    document.documentElement.style.setProperty('--themeColor', color);
    document.documentElement.style.setProperty('--shadowColor', hexToRgba(color, 0.4));
  }

  onThemeColorChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectColor(input.value);
  }

  onSliderInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.buttonSize = parseInt(input.value, 10);
    this.renderer.setStyle(this.floatingButton.nativeElement, 'width', `${this.buttonSize}px`);
    this.renderer.setStyle(this.floatingButton.nativeElement, 'height', `${this.buttonSize}px`);
    this.applyButtonPosition();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.isMenuOpen && this.menuPopup && !this.menuPopup.nativeElement.contains(event.target) && !this.floatingButton.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  @HostListener('document:mouseleave')
  onDocumentMouseLeave(): void {
    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.lastWindowWidth = window.innerWidth;
    this.lastWindowHeight = window.innerHeight;
    this.applyButtonPosition();
    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }
}
