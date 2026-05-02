import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AnimationService, AnimationState } from '../../services/animation.service';
import { Molecule } from '../../models/molecule.model';
import { Atom } from '../../models/atom.model';
import { Bond, BondAnimationState } from '../../models/bond.model';

interface ProjectedAtom {
  atom: Atom;
  x: number;
  y: number;
  z: number;
  screenX: number;
  screenY: number;
  scale: number;
}

interface ProjectedBond {
  bond: Bond;
  atom1: ProjectedAtom;
  atom2: ProjectedAtom;
  bondState: BondAnimationState | undefined;
}

@Component({
  selector: 'app-molecule-viewer',
  templateUrl: './molecule-viewer.component.html',
  styleUrls: ['./molecule-viewer.component.css'],
  standalone: false
})
export class MoleculeViewerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D;
  private destroy$ = new Subject<void>();
  private animationFrameId: number | null = null;
  
  currentMolecule: Molecule | null = null;
  animationState: AnimationState | null = null;
  bondStates: Map<string, BondAnimationState> = new Map();
  
  private centerX: number = 0;
  private centerY: number = 0;
  private scale: number = 1;
  private isDragging: boolean = false;
  private lastMouseX: number = 0;
  private lastMouseY: number = 0;
  private manualRotationX: number = 0;
  private manualRotationY: number = 0;

  constructor(private animationService: AnimationService) { }

  ngOnInit(): void {
    this.animationService.molecule$
      .pipe(takeUntil(this.destroy$))
      .subscribe(molecule => {
        this.currentMolecule = molecule;
        this.manualRotationX = 0;
        this.manualRotationY = 0;
      });

    this.animationService.animationState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.animationState = state;
      });

    this.animationService.bondStates$
      .pipe(takeUntil(this.destroy$))
      .subscribe(states => {
        this.bondStates = states;
      });
  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d')!;
    this.resizeCanvas();
    this.startRenderLoop();

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas(): void {
    const canvas = this.canvas.nativeElement;
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      this.centerX = canvas.width / 2;
      this.centerY = canvas.height / 2;
      this.scale = Math.min(canvas.width, canvas.height) / 400;
    }
  }

  private startRenderLoop(): void {
    this.render();
  }

  private render(): void {
    if (!this.context || !this.currentMolecule) {
      this.animationFrameId = requestAnimationFrame(() => this.render());
      return;
    }

    const canvas = this.canvas.nativeElement;
    this.context.clearRect(0, 0, canvas.width, canvas.height);

    this.drawBackground();

    const totalRotationX = this.currentMolecule.rotationX + this.manualRotationX;
    const totalRotationY = this.currentMolecule.rotationY + this.manualRotationY;

    const projectedAtoms: ProjectedAtom[] = this.currentMolecule.atoms.map(atom => {
      const rotated = this.rotate3D(atom.x, atom.y, atom.z, totalRotationX, totalRotationY, 0);
      const projected = this.project(rotated.x, rotated.y, rotated.z);
      return {
        atom,
        x: rotated.x,
        y: rotated.y,
        z: rotated.z,
        screenX: projected.x,
        screenY: projected.y,
        scale: projected.scale
      };
    });

    const projectedBonds: ProjectedBond[] = this.currentMolecule.bonds.map(bond => {
      const atom1 = projectedAtoms.find(a => a.atom.id === bond.atom1Id)!;
      const atom2 = projectedAtoms.find(a => a.atom.id === bond.atom2Id)!;
      return {
        bond,
        atom1,
        atom2,
        bondState: this.bondStates.get(bond.id)
      };
    });

    const sortedAtoms = [...projectedAtoms].sort((a, b) => a.z - b.z);
    const sortedBonds = [...projectedBonds].sort((a, b) => 
      Math.min(a.atom1.z, a.atom2.z) - Math.min(b.atom1.z, b.atom2.z)
    );

    sortedBonds.forEach(bond => this.drawBond(bond));

    sortedAtoms.forEach(projAtom => this.drawAtom(projAtom));

    this.drawInfoOverlay();

    this.animationFrameId = requestAnimationFrame(() => this.render());
  }

  private drawBackground(): void {
    const gradient = this.context.createRadialGradient(
      this.centerX, this.centerY, 0,
      this.centerX, this.centerY, Math.max(this.canvas.nativeElement.width, this.canvas.nativeElement.height) / 2
    );
    gradient.addColorStop(0, '#1e293b');
    gradient.addColorStop(1, '#0f172a');
    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    this.context.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    this.context.lineWidth = 1;
    const gridSize = 50;
    
    for (let x = 0; x < this.canvas.nativeElement.width; x += gridSize) {
      this.context.beginPath();
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.canvas.nativeElement.height);
      this.context.stroke();
    }
    
    for (let y = 0; y < this.canvas.nativeElement.height; y += gridSize) {
      this.context.beginPath();
      this.context.moveTo(0, y);
      this.context.lineTo(this.canvas.nativeElement.width, y);
      this.context.stroke();
    }
  }

  private rotate3D(x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number): { x: number; y: number; z: number } {
    const radX = (rotX * Math.PI) / 180;
    const radY = (rotY * Math.PI) / 180;
    const radZ = (rotZ * Math.PI) / 180;

    let tempX = x;
    let tempY = y * Math.cos(radX) - z * Math.sin(radX);
    let tempZ = y * Math.sin(radX) + z * Math.cos(radX);

    const newX = tempX * Math.cos(radY) + tempZ * Math.sin(radY);
    const newY = tempY;
    const newZ = -tempX * Math.sin(radY) + tempZ * Math.cos(radY);

    return { x: newX, y: newY, z: newZ };
  }

  private project(x: number, y: number, z: number): { x: number; y: number; scale: number } {
    const fov = 500;
    const perspective = fov / (fov + z);
    return {
      x: this.centerX + x * this.scale * perspective,
      y: this.centerY + y * this.scale * perspective,
      scale: perspective
    };
  }

  private drawAtom(projAtom: ProjectedAtom): void {
    const { atom, screenX, screenY, scale } = projAtom;
    const radius = atom.radius * this.scale * scale;

    const gradient = this.context.createRadialGradient(
      screenX - radius * 0.3,
      screenY - radius * 0.3,
      0,
      screenX,
      screenY,
      radius
    );

    const baseColor = atom.color;
    const darkerColor = this.darkenColor(baseColor, 0.3);
    const lighterColor = this.lightenColor(baseColor, 0.3);

    gradient.addColorStop(0, lighterColor);
    gradient.addColorStop(0.5, baseColor);
    gradient.addColorStop(1, darkerColor);

    this.context.beginPath();
    this.context.arc(screenX, screenY, radius, 0, Math.PI * 2);
    this.context.fillStyle = gradient;
    this.context.fill();

    this.context.strokeStyle = darkerColor;
    this.context.lineWidth = 2;
    this.context.stroke();

    const fontSize = Math.max(12, radius * 0.6);
    this.context.font = `bold ${fontSize}px Arial`;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = this.isLightColor(baseColor) ? '#333333' : '#ffffff';
    this.context.fillText(atom.symbol, screenX, screenY);
  }

  private drawBond(projBond: ProjectedBond): void {
    const { bond, atom1, atom2, bondState } = projBond;
    
    let actualBondLength = bond.bondLength;
    if (bondState && this.animationState?.vibrationEnabled) {
      actualBondLength = bondState.currentLength;
    }

    const x1 = atom1.screenX;
    const y1 = atom1.screenY;
    const x2 = atom2.screenX;
    const y2 = atom2.screenY;

    const avgScale = (atom1.scale + atom2.scale) / 2;
    const baseLineWidth = 4 * this.scale * avgScale;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = -dy / len;
    const ny = dx / len;

    const offset = baseLineWidth * 0.6;

    if (bond.type === 'single') {
      this.drawSingleBond(x1, y1, x2, y2, baseLineWidth);
    } else if (bond.type === 'double') {
      this.drawDoubleBond(x1, y1, x2, y2, nx, ny, offset, baseLineWidth);
    } else if (bond.type === 'triple') {
      this.drawTripleBond(x1, y1, x2, y2, nx, ny, offset, baseLineWidth);
    }
  }

  private drawSingleBond(x1: number, y1: number, x2: number, y2: number, width: number): void {
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.strokeStyle = '#94a3b8';
    this.context.lineWidth = width;
    this.context.lineCap = 'round';
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.strokeStyle = '#cbd5e1';
    this.context.lineWidth = width * 0.5;
    this.context.stroke();
  }

  private drawDoubleBond(
    x1: number, y1: number, x2: number, y2: number,
    nx: number, ny: number, offset: number, width: number
  ): void {
    this.context.beginPath();
    this.context.moveTo(x1 + nx * offset, y1 + ny * offset);
    this.context.lineTo(x2 + nx * offset, y2 + ny * offset);
    this.context.strokeStyle = '#94a3b8';
    this.context.lineWidth = width * 0.7;
    this.context.lineCap = 'round';
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(x1 - nx * offset, y1 - ny * offset);
    this.context.lineTo(x2 - nx * offset, y2 - ny * offset);
    this.context.strokeStyle = '#94a3b8';
    this.context.lineWidth = width * 0.7;
    this.context.stroke();
  }

  private drawTripleBond(
    x1: number, y1: number, x2: number, y2: number,
    nx: number, ny: number, offset: number, width: number
  ): void {
    this.drawDoubleBond(x1, y1, x2, y2, nx, ny, offset * 1.2, width * 0.6);

    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.strokeStyle = '#94a3b8';
    this.context.lineWidth = width * 0.6;
    this.context.lineCap = 'round';
    this.context.stroke();
  }

  private drawInfoOverlay(): void {
    if (!this.currentMolecule || !this.animationState) return;

    const padding = 16;
    const lineHeight = 24;
    let y = padding;

    this.context.font = '14px Arial';
    this.context.textAlign = 'left';
    this.context.fillStyle = 'rgba(255, 255, 255, 0.9)';

    const info = [
      `分子: ${this.currentMolecule.name} (${this.currentMolecule.formula})`,
      `状态: ${this.animationState.isPlaying ? '播放中' : '已暂停'}`,
      `振动: ${this.animationState.vibrationEnabled ? '开启' : '关闭'}`,
      `旋转: ${this.animationState.rotationEnabled ? '开启' : '关闭'}`
    ];

    this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    const maxWidth = Math.max(...info.map(i => this.context.measureText(i).width)) + 32;
    this.context.fillRect(padding - 8, padding - 8, maxWidth, info.length * lineHeight + 16);

    this.context.fillStyle = 'rgba(255, 255, 255, 0.9)';
    info.forEach(text => {
      this.context.fillText(text, padding, y + 16);
      y += lineHeight;
    });

    this.context.fillStyle = 'rgba(255, 255, 255, 0.6)';
    this.context.font = '12px Arial';
    this.context.textAlign = 'center';
    this.context.fillText(
      '拖拽鼠标旋转分子 | 点击原子查看详情',
      this.centerX,
      this.canvas.nativeElement.height - 20
    );
  }

  private darkenColor(color: string, amount: number): string {
    const hex = color.replace('#', '');
    const r = Math.max(0, parseInt(hex.substr(0, 2), 16) * (1 - amount));
    const g = Math.max(0, parseInt(hex.substr(2, 2), 16) * (1 - amount));
    const b = Math.max(0, parseInt(hex.substr(4, 2), 16) * (1 - amount));
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  }

  private lightenColor(color: string, amount: number): string {
    const hex = color.replace('#', '');
    const r = Math.min(255, parseInt(hex.substr(0, 2), 16) * (1 + amount));
    const g = Math.min(255, parseInt(hex.substr(2, 2), 16) * (1 + amount));
    const b = Math.min(255, parseInt(hex.substr(4, 2), 16) * (1 + amount));
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  }

  private isLightColor(color: string): boolean {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  }

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;

    const deltaX = event.clientX - this.lastMouseX;
    const deltaY = event.clientY - this.lastMouseY;

    this.manualRotationY += deltaX * 0.5;
    this.manualRotationX += deltaY * 0.5;

    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
  }

  onMouseUp(): void {
    this.isDragging = false;
  }

  onMouseLeave(): void {
    this.isDragging = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', () => this.resizeCanvas());
  }
}
