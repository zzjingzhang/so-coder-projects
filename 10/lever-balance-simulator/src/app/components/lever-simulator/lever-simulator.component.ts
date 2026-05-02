import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Weight {
  id: number;
  force: number;
  position: number;
  side: 'left' | 'right';
}

@Component({
  selector: 'app-lever-simulator',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './lever-simulator.component.html',
  styleUrl: './lever-simulator.component.css'
})
export class LeverSimulatorComponent {
  // 可用的力值选项 (1N - 5N)
  availableForces = [1, 2, 3, 4, 5];
  
  // 当前选择的力值
  selectedForce = signal(1);
  
  // 左侧和右侧的重物列表
  leftWeights = signal<Weight[]>([]);
  rightWeights = signal<Weight[]>([]);
  
  // 下一个重物的ID
  nextWeightId = 1;
  
  // 杠杆长度（单位：米，每侧各5米）
  leverLength = 10;
  
  // 计算左侧总力矩
  leftTorque = computed(() => {
    return this.leftWeights().reduce((total, weight) => {
      return total + weight.force * weight.position;
    }, 0);
  });
  
  // 计算右侧总力矩
  rightTorque = computed(() => {
    return this.rightWeights().reduce((total, weight) => {
      return total + weight.force * weight.position;
    }, 0);
  });
  
  // 计算力矩差
  torqueDifference = computed(() => {
    return this.leftTorque() - this.rightTorque();
  });
  
  // 计算力矩差的绝对值（用于模板显示）
  torqueDifferenceAbs = computed(() => {
    return Math.abs(this.torqueDifference());
  });
  
  // 检查是否平衡
  isBalanced = computed(() => {
    return this.torqueDifferenceAbs() < 0.001;
  });
  
  // 计算杠杆倾斜角度（根据力矩差）
  leverAngle = computed(() => {
    if (this.isBalanced()) {
      return 0;
    }
    
    // 计算力矩差的绝对值
    const diff = this.torqueDifferenceAbs();
    
    // 最大倾斜角度（度）
    const maxAngle = 15;
    
    // 计算角度（力矩差越大，角度越大）
    let angle = Math.min(diff * 2, maxAngle);
    
    // 根据力矩差的方向确定倾斜方向
    return this.torqueDifference() > 0 ? -angle : angle;
  });
  
  // 添加重物到左侧
  addLeftWeight(position: number) {
    const newWeight: Weight = {
      id: this.nextWeightId++,
      force: this.selectedForce(),
      position: position,
      side: 'left'
    };
    this.leftWeights.update(weights => [...weights, newWeight]);
  }
  
  // 添加重物到右侧
  addRightWeight(position: number) {
    const newWeight: Weight = {
      id: this.nextWeightId++,
      force: this.selectedForce(),
      position: position,
      side: 'right'
    };
    this.rightWeights.update(weights => [...weights, newWeight]);
  }
  
  // 移除左侧重物
  removeLeftWeight(id: number) {
    this.leftWeights.update(weights => weights.filter(w => w.id !== id));
  }
  
  // 移除右侧重物
  removeRightWeight(id: number) {
    this.rightWeights.update(weights => weights.filter(w => w.id !== id));
  }
  
  // 重置所有重物
  resetAll() {
    this.leftWeights.set([]);
    this.rightWeights.set([]);
  }
  
  // 获取重物在杠杆上的位置百分比（用于CSS定位）
  getWeightPositionPercent(position: number): number {
    // 杠杆每侧5米，转换为百分比（从中心向两侧）
    return (position / 5) * 45; // 45%是每侧的可用空间
  }
  
  // 获取力矩计算过程的文本描述
  getTorqueCalculationText(side: 'left' | 'right'): string {
    const weights = side === 'left' ? this.leftWeights() : this.rightWeights();
    const torque = side === 'left' ? this.leftTorque() : this.rightTorque();
    
    if (weights.length === 0) {
      return `${side === 'left' ? '左侧' : '右侧'}: 无重物，力矩 = 0 N·m`;
    }
    
    const calculations = weights.map(w => `${w.force}N × ${w.position}m = ${w.force * w.position} N·m`);
    const sum = calculations.join(' + ');
    
    return `${side === 'left' ? '左侧' : '右侧'}: ${sum} = ${torque} N·m`;
  }
}
