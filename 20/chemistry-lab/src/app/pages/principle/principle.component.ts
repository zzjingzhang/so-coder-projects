import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principle',
  standalone: true,
  imports: [CardModule, ButtonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-indigo-800 mb-2">
            实验室制取二氧化碳
          </h1>
          <p class="text-lg text-gray-600">
            CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <p-card header="反应方程式" class="shadow-lg">
            <div class="text-center">
              <div class="text-2xl font-bold text-indigo-700 mb-4">
                CaCO₃ + 2HCl
              </div>
              <div class="text-lg text-gray-600 mb-2">↓</div>
              <div class="text-2xl font-bold text-green-700">
                CaCl₂ + H₂O + CO₂↑
              </div>
            </div>
          </p-card>

          <p-card header="反应类型" class="shadow-lg">
            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span class="font-semibold">反应类型</span>
                <span class="text-indigo-700">复分解反应</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span class="font-semibold">反应物状态</span>
                <span class="text-indigo-700">固体 + 液体</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span class="font-semibold">反应条件</span>
                <span class="text-indigo-700">常温（不加热）</span>
              </div>
            </div>
          </p-card>
        </div>

        <p-card header="实验原理解析" class="shadow-lg mb-8">
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <span class="font-bold text-indigo-700">1. 选择碳酸钙的原因：</span>
              碳酸钙（CaCO₃）是实验室制取二氧化碳最常用的药品。它与稀盐酸反应速率适中，便于收集气体。同时碳酸钙来源广泛，价格便宜。
            </p>
            <p>
              <span class="font-bold text-indigo-700">2. 选择稀盐酸的原因：</span>
              不能使用浓盐酸，因为浓盐酸具有挥发性，会使制得的二氧化碳气体中混有氯化氢气体。也不能使用硫酸，因为硫酸与碳酸钙反应会生成微溶于水的硫酸钙，覆盖在碳酸钙表面，阻止反应继续进行。
            </p>
            <p>
              <span class="font-bold text-indigo-700">3. 反应过程：</span>
              碳酸钙与盐酸反应生成氯化钙、水和二氧化碳。这是一个复分解反应，两种化合物互相交换成分，生成另外两种化合物。
            </p>
          </div>
        </p-card>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div class="bg-white rounded-xl shadow-lg p-5 text-center">
            <div class="text-3xl font-bold text-blue-600 mb-2">固体 + 液体</div>
            <div class="text-gray-600">反应装置类型</div>
          </div>
          <div class="bg-white rounded-xl shadow-lg p-5 text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">不加热</div>
            <div class="text-gray-600">反应条件</div>
          </div>
          <div class="bg-white rounded-xl shadow-lg p-5 text-center">
            <div class="text-3xl font-bold text-orange-600 mb-2">向上排空气法</div>
            <div class="text-gray-600">收集方法</div>
          </div>
        </div>

        <div class="text-center">
          <p-button 
            label="开始实验演示" 
            icon="pi pi-arrow-right" 
            iconPos="right"
            styleClass="p-button-lg p-button-primary"
            (click)="goToExperiment()"
          ></p-button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PrincipleComponent {
  constructor(private router: Router) {}

  goToExperiment() {
    this.router.navigate(['/experiment']);
  }
}
