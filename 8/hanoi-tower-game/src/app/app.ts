import { Component, HostListener, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

interface Disk {
  size: number;
  color: string;
}

interface Tower {
  id: number;
  disks: Disk[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  private _disksCount = 3;
  minDisks = 3;
  maxDisks = 6;
  towers: Tower[] = [];
  selectedTower: number | null = null;
  moveCount = 0;
  gameWon = false;
  optimalMoves = 0;

  colors = [
    '#EF4444',
    '#F97316',
    '#EAB308',
    '#22C55E',
    '#3B82F6',
    '#A855F7'
  ];

  get disksCount(): number {
    return this._disksCount;
  }

  set disksCount(value: number) {
    if (this._disksCount !== value) {
      this._disksCount = value;
      this.initGame();
    }
  }

  constructor(private message: NzMessageService) {}

  ngOnInit(): void {
    this.initGame();
  }

  initGame(): void {
    this.moveCount = 0;
    this.gameWon = false;
    this.selectedTower = null;
    this.optimalMoves = Math.pow(2, this.disksCount) - 1;

    this.towers = [
      { id: 1, disks: [] },
      { id: 2, disks: [] },
      { id: 3, disks: [] }
    ];

    for (let i = this.disksCount; i >= 1; i--) {
      this.towers[0].disks.push({
        size: i,
        color: this.colors[i - 1]
      });
    }
  }

  selectTower(towerId: number): void {
    if (this.gameWon) return;

    const towerIndex = towerId - 1;
    const tower = this.towers[towerIndex];

    if (this.selectedTower === null) {
      if (tower.disks.length === 0) {
        this.message.warning('该柱子没有圆环可以移动！');
        return;
      }
      this.selectedTower = towerId;
    } else if (this.selectedTower === towerId) {
      this.selectedTower = null;
    } else {
      this.moveDisk(this.selectedTower, towerId);
      this.selectedTower = null;
    }
  }

  moveDisk(fromTowerId: number, toTowerId: number): void {
    const fromIndex = fromTowerId - 1;
    const toIndex = toTowerId - 1;

    const fromTower = this.towers[fromIndex];
    const toTower = this.towers[toIndex];

    if (fromTower.disks.length === 0) {
      return;
    }

    const topDisk = fromTower.disks[fromTower.disks.length - 1];

    if (toTower.disks.length > 0) {
      const targetTopDisk = toTower.disks[toTower.disks.length - 1];
      if (topDisk.size > targetTopDisk.size) {
        this.message.error('小圆环必须放在大圆环上！');
        return;
      }
    }

    const disk = fromTower.disks.pop()!;
    toTower.disks.push(disk);
    this.moveCount++;

    this.checkWin();
  }

  checkWin(): void {
    if (this.towers[2].disks.length === this.disksCount) {
      this.gameWon = true;
      if (this.moveCount === this.optimalMoves) {
        this.message.success(`恭喜！你用最少步数(${this.moveCount}步)完成了游戏！`);
      } else {
        this.message.success(`恭喜完成！你用了 ${this.moveCount} 步，最少需要 ${this.optimalMoves} 步。`);
      }
    }
  }

  getDiskWidth(size: number): number {
    const baseWidth = 40;
    const increment = 30;
    return baseWidth + (this.maxDisks - size) * increment;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.increaseDisks();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.decreaseDisks();
        break;
      case 'r':
      case 'R':
        this.resetGame();
        break;
    }
  }

  increaseDisks(): void {
    if (this.disksCount < this.maxDisks) {
      this.disksCount++;
      this.initGame();
      this.message.info(`圆环数量已增加到 ${this.disksCount} 个`);
    } else {
      this.message.warning(`圆环数量最多为 ${this.maxDisks} 个`);
    }
  }

  decreaseDisks(): void {
    if (this.disksCount > this.minDisks) {
      this.disksCount--;
      this.initGame();
      this.message.info(`圆环数量已减少到 ${this.disksCount} 个`);
    } else {
      this.message.warning(`圆环数量最少为 ${this.minDisks} 个`);
    }
  }

  resetGame(): void {
    this.initGame();
    this.message.info('游戏已重置');
  }
}
