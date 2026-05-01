import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CanvasImage, CanvasBackground } from '../../services/canvas.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggleCollapse = new EventEmitter<void>();
  @Output() imageAdded = new EventEmitter<CanvasImage>();
  @Output() backgroundChanged = new EventEmitter<CanvasBackground | null>();
  @Output() exportRequest = new EventEmitter<void>();

  isMobile = window.innerWidth < 768;
  selectedTab = 0;

  readonly presetPhotos: { src: string; category: string }[] = [
    { src: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400', category: 'anime' },
    { src: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=400', category: 'anime' },
    { src: 'https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=400', category: 'animals' },
    { src: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400', category: 'animals' },
    { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400', category: 'people' },
    { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', category: 'people' },
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category: 'other' },
    { src: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400', category: 'other' },
  ];

  readonly presetBackgrounds: { src: string; name: string }[] = [
    { src: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800', name: 'Gradient Purple' },
    { src: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800', name: 'Gradient Pink' },
    { src: 'https://images.unsplash.com/photo-1557682260-96773eb01377?w=800', name: 'Dark Blue' },
    { src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800', name: 'Soft Peach' },
  ];

  uploadedImages: string[] = [];
  selectedCategory = 'all';
  categories = ['all', 'anime', 'animals', 'people', 'other'];

  constructor() {
    this.loadUploadedImages();
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
  }

  loadUploadedImages(): void {
    const saved = localStorage.getItem('moodboard_uploads');
    if (saved) {
      this.uploadedImages = JSON.parse(saved);
    }
  }

  saveUploadedImages(): void {
    localStorage.setItem('moodboard_uploads', JSON.stringify(this.uploadedImages));
  }

  onToggle(): void {
    this.toggleCollapse.emit();
  }

  get filteredPhotos() {
    if (this.selectedCategory === 'all') {
      return this.presetPhotos;
    }
    return this.presetPhotos.filter(p => p.category === this.selectedCategory);
  }

  onPhotoDragStart(event: DragEvent, src: string): void {
    event.dataTransfer?.setData('text/uri-list', src);
  }

  onPhotoClick(src: string): void {
    const image: CanvasImage = {
      id: 'img_' + Date.now(),
      src,
      x: 200,
      y: 150,
      width: 200,
      height: 150,
      rotation: 0,
      zIndex: Date.now()
    };
    this.imageAdded.emit(image);
  }

  onBackgroundClick(bg: { src: string; name: string }): void {
    this.backgroundChanged.emit({ src: bg.src });
  }

  clearBackground(): void {
    this.backgroundChanged.emit(null);
  }

  beforeUpload = (file: NzUploadFile, fileList: NzUploadFile[]): boolean => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      this.uploadedImages.push(result);
      this.saveUploadedImages();
    };
    reader.readAsDataURL(file as unknown as File);
    return false;
  }

  onUploadRemove(url: string): void {
    this.uploadedImages = this.uploadedImages.filter(u => u !== url);
    this.saveUploadedImages();
  }

  onUploadDragStart(event: DragEvent, src: string): void {
    event.dataTransfer?.setData('text/uri-list', src);
  }

  onUploadClick(src: string): void {
    const image: CanvasImage = {
      id: 'img_' + Date.now(),
      src,
      x: 200,
      y: 150,
      width: 200,
      height: 150,
      rotation: 0,
      zIndex: Date.now()
    };
    this.imageAdded.emit(image);
  }

  onExportRequest(): void {
    this.exportRequest.emit();
  }
}
