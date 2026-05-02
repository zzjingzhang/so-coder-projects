import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzTabsModule,
    NzInputNumberModule,
    FormsModule
  ],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent {
  activeTabIndex = 0;
  
  // 梯子问题
  ladderHeight = 4;
  ladderDistance = 3;
  ladderLength: number | null = null;
  
  // 屏幕尺寸问题
  screenWidth = 16;
  screenHeight = 9;
  screenDiagonal: number | null = null;
  
  // 两点距离问题
  point1X = 0;
  point1Y = 0;
  point2X = 3;
  point2Y = 4;
  distanceBetweenPoints: number | null = null;
  
  // 建筑问题
  buildingHeight = 12;
  shadowLength = 9;
  buildingToTip: number | null = null;

  calculateLadderLength(): void {
    this.ladderLength = Math.sqrt(
      this.ladderHeight * this.ladderHeight + 
      this.ladderDistance * this.ladderDistance
    );
  }

  calculateScreenDiagonal(): void {
    this.screenDiagonal = Math.sqrt(
      this.screenWidth * this.screenWidth + 
      this.screenHeight * this.screenHeight
    );
  }

  calculateDistance(): void {
    const dx = this.point2X - this.point1X;
    const dy = this.point2Y - this.point1Y;
    this.distanceBetweenPoints = Math.sqrt(dx * dx + dy * dy);
  }

  calculateBuildingToTip(): void {
    this.buildingToTip = Math.sqrt(
      this.buildingHeight * this.buildingHeight + 
      this.shadowLength * this.shadowLength
    );
  }

  applications = [
    {
      title: '🏗️ 建筑工程',
      description: '在建筑施工中，勾股定理常用于确保墙角成直角。工人会使用3-4-5方法：在墙角分别量出3英尺和4英尺，如果对角线是5英尺，则说明墙角是直角。',
      examples: [
        '确保墙体垂直',
        '测量对角线验证矩形',
        '搭建脚手架时的角度计算'
      ]
    },
    {
      title: '📐 导航与测量',
      description: '在导航和地理测量中，勾股定理用于计算两点之间的直线距离。例如，已知两点的经纬度差，可以计算出实际距离。',
      examples: [
        '计算两点间直线距离',
        '海上导航定位',
        '地图比例尺换算'
      ]
    },
    {
      title: '📱 电子设备',
      description: '电视、电脑显示器等屏幕尺寸通常以对角线长度表示。使用勾股定理可以根据宽高比计算屏幕的实际尺寸。',
      examples: [
        '计算屏幕对角线长度',
        '验证屏幕比例',
        '计算可视面积'
      ]
    },
    {
      title: '🚀 物理与工程',
      description: '在物理学中，勾股定理常用于矢量分解和合成都。例如，速度、力等矢量可以分解为水平和垂直分量。',
      examples: [
        '矢量分解与合成',
        '抛体运动计算',
        '力的平衡分析'
      ]
    },
    {
      title: '🏠 日常生活',
      description: '勾股定理在日常生活中有很多应用，比如购买家具时测量空间，计算楼梯长度，确定梯子安全放置位置等。',
      examples: [
        '梯子安全放置计算',
        '家具尺寸测量',
        '楼梯斜长计算'
      ]
    }
  ];
}
