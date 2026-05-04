import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

@Component({
  selector: 'app-experiment',
  standalone: true,
  imports: [ButtonModule, CardModule, StepsModule, CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-6">
          <h1 class="text-3xl font-bold text-indigo-800 mb-2">
            实验步骤演示
          </h1>
          <p class="text-gray-600">碳酸钙与盐酸反应制取二氧化碳</p>
        </div>

        <p-steps [model]="steps" [activeIndex]="currentStep" [readonly]="false" class="mb-10"></p-steps>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <p-card class="shadow-lg">
              <ng-template pTemplate="header">
                <div class="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-4 text-center">
                  <h2 class="text-xl font-bold">{{ steps[currentStep].label }}</h2>
                </div>
              </ng-template>

              <div class="relative h-96 bg-gradient-to-b from-slate-100 to-slate-200 rounded-lg overflow-hidden" #experimentArea>
                @switch (currentStep) {
                  @case (0) {
                    <div class="absolute inset-0 flex flex-col items-center justify-center p-8">
                      <div class="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
                        <div class="text-5xl mb-4">🧪</div>
                        <h3 class="text-xl font-bold text-indigo-700 mb-4">实验准备</h3>
                        <div class="space-y-3 text-left text-gray-700">
                          <div class="flex items-center gap-3">
                            <span class="text-2xl">🧂</span>
                            <span>大理石或石灰石（主要成分：CaCO₃）</span>
                          </div>
                          <div class="flex items-center gap-3">
                            <span class="text-2xl">💧</span>
                            <span>稀盐酸（HCl）</span>
                          </div>
                          <div class="flex items-center gap-3">
                            <span class="text-2xl">🏺</span>
                            <span>发生装置：锥形瓶、长颈漏斗</span>
                          </div>
                          <div class="flex items-center gap-3">
                            <span class="text-2xl">📦</span>
                            <span>收集装置：集气瓶、玻璃片</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  }

                  @case (1) {
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="relative">
                        <div class="w-48 h-64 bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-full border-4 border-gray-400 relative overflow-hidden">
                          <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-100 to-amber-200">
                            @for (piece of [1,2,3,4,5]; track piece) {
                              <div class="absolute w-8 h-6 bg-amber-300 rounded-full border-2 border-amber-400"
                                [style.left.%]="10 + piece * 15"
                                [style.bottom.px]="2 + (piece % 2) * 10">
                              </div>
                            }
                          </div>
                        </div>
                        <div class="absolute -top-8 left-1/2 transform -translate-x-1/2">
                          <div class="w-6 h-20 bg-gray-400 rounded-t-sm"></div>
                        </div>
                        <div class="text-center mt-4 font-semibold text-gray-700">锥形瓶（放入固体药品）</div>
                      </div>
                    </div>
                  }

                  @case (2) {
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="relative">
                        <div class="absolute left-1/2 transform -translate-x-1/2 -top-16 z-20">
                          <div class="w-10 h-8 bg-white border-4 border-gray-400 rounded-t-sm"></div>
                          <div class="w-6 h-24 bg-white border-4 border-t-0 border-gray-400 mx-auto" [style.height.px]="isAddingLiquid ? 100 : 80"></div>
                        </div>

                        <div class="w-48 h-64 bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-full border-4 border-gray-400 relative overflow-hidden z-10">
                          <div class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-amber-100 to-amber-200">
                            @for (piece of [1,2,3,4,5]; track piece) {
                              <div class="absolute w-6 h-4 bg-amber-300 rounded-full border border-amber-400"
                                [style.left.%]="10 + piece * 15"
                                [style.bottom.px]="2 + (piece % 2) * 8">
                              </div>
                            }
                          </div>

                          <div class="absolute bottom-8 left-0 right-0 bg-gradient-to-t from-cyan-300 to-cyan-200 transition-all duration-1000"
                            [style.height.%]="liquidLevel">
                            <div class="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-cyan-400 to-transparent"></div>
                          </div>

                          @if (isAddingLiquid) {
                            <div class="absolute left-1/2 transform -translate-x-1/2 top-0">
                              <div class="w-2 h-32 bg-cyan-400 animate-pulse"></div>
                            </div>
                          }
                        </div>

                        <div class="absolute -right-20 top-1/3 w-8 h-4 bg-gray-400 rounded-r-full"></div>
                        <div class="absolute -right-16 top-1/3 w-8 h-32 bg-transparent border-4 border-gray-400 border-l-0 rounded-r-full"></div>

                        <div class="text-center mt-4 font-semibold text-gray-700">
                          {{ isAddingLiquid ? '正在添加稀盐酸...' : '准备添加液体药品' }}
                        </div>
                      </div>
                    </div>
                  }

                  @case (3) {
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="relative">
                        <div class="absolute left-1/2 transform -translate-x-1/2 -top-20 z-20">
                          <div class="w-16 h-4 bg-gray-500 rounded-sm"></div>
                          <div class="w-16 h-8 bg-white border-4 border-gray-400 rounded-t-sm"></div>
                          <div class="w-8 h-24 bg-white border-4 border-t-0 border-gray-400 mx-auto">
                            <div class="w-full h-1 bg-gray-400 mt-2"></div>
                          </div>
                        </div>

                        <div class="w-56 h-72 bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-full border-4 border-gray-400 relative overflow-hidden z-10">
                          <div class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-amber-100 to-amber-200">
                            @for (piece of [1,2,3,4,5,6,7]; track piece) {
                              <div class="absolute w-6 h-4 bg-amber-300 rounded-full border border-amber-400"
                                [style.left.%]="5 + piece * 12"
                                [style.bottom.px]="2 + (piece % 3) * 8">
                              </div>
                            }
                          </div>

                          <div class="absolute bottom-12 left-0 right-0 h-40 bg-gradient-to-t from-cyan-300 to-cyan-200">
                            <div class="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-cyan-400 to-transparent"></div>

                            @for (bubble of bubbles; track bubble.id) {
                              <div class="absolute rounded-full bg-white opacity-70"
                                [style.width.px]="bubble.size"
                                [style.height.px]="bubble.size"
                                [style.left.px]="bubble.x"
                                [style.bottom.px]="bubble.y"
                                [style.opacity]="bubble.opacity">
                              </div>
                            }
                          </div>
                        </div>

                        <div class="absolute right-0 top-1/3">
                          <div class="w-12 h-4 bg-gray-400 rounded-r-full"></div>
                          <div class="absolute left-8 -top-16 w-4 h-24 bg-gray-400"></div>
                          <div class="absolute left-8 -top-24 w-6 h-8 bg-transparent border-3 border-gray-400 rounded-t-full"></div>
                        </div>

                        <div class="text-center mt-4">
                          <span class="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold animate-pulse">
                            <span class="w-3 h-3 bg-green-500 rounded-full"></span>
                            反应进行中
                          </span>
                        </div>
                      </div>
                    </div>
                  }

                  @case (4) {
                    <div class="absolute inset-0 flex items-center justify-around px-8">
                      <div class="text-center">
                        <div class="relative w-32 h-48 bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-lg border-4 border-gray-400">
                          <div class="absolute inset-x-2 top-2 bottom-2 bg-gradient-to-t from-gray-400 via-transparent to-transparent opacity-50">
                            <div class="absolute bottom-0 left-0 right-0 h-1/2 bg-gray-400 opacity-30"></div>
                          </div>
                          <div class="absolute -top-10 left-1/2 transform -translate-x-1/2">
                            <div class="w-8 h-16 bg-gray-400"></div>
                          </div>
                        </div>
                        <p class="mt-4 text-gray-700 font-semibold">发生装置</p>
                        <p class="text-sm text-gray-500">持续产生CO₂</p>
                      </div>

                      <div class="text-center">
                        <div class="relative w-32 h-48 bg-white border-4 border-gray-400 rounded-t-lg overflow-hidden">
                          <div class="absolute top-2 left-2 right-2 h-1/2 bg-gray-100 rounded-lg">
                            <div class="absolute inset-0 flex items-center justify-center">
                              <div class="text-center">
                                <div class="text-3xl">💨</div>
                                <div class="text-xs text-gray-500 mt-1">CO₂</div>
                              </div>
                            </div>
                          </div>
                          <div class="absolute -top-10 left-1/2 transform -translate-x-1/2">
                            <div class="w-6 h-12 bg-gray-400"></div>
                          </div>
                          <div class="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-blue-300 to-blue-400 opacity-50"></div>
                        </div>
                        <p class="mt-4 text-gray-700 font-semibold">收集装置</p>
                        <p class="text-sm text-gray-500">向上排空气法</p>
                      </div>

                      <div class="text-center">
                        <div class="relative w-32 h-48">
                          <div class="absolute bottom-0 w-32 h-40 bg-blue-200 rounded-lg border-4 border-blue-400">
                            <div class="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-28 bg-white border-4 border-gray-400 rounded-b-lg">
                              <div class="absolute bottom-0 left-0 right-0 h-16 bg-blue-200">
                                @for (i of [1,2,3,4,5]; track i) {
                                  <div class="absolute w-3 h-3 bg-white rounded-full opacity-60 animate-bounce"
                                    [style.left.%]="20 + i * 12"
                                    [style.bottom.px]="i * 5"
                                    [style.animationDelay.ms]="i * 200">
                                  </div>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                        <p class="mt-4 text-gray-700 font-semibold">检验方法</p>
                        <p class="text-sm text-gray-500">排水法（不推荐）</p>
                      </div>
                    </div>
                  }

                  @case (5) {
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="space-y-8 text-center">
                        <div class="relative inline-block">
                          <div class="w-48 h-56 bg-white border-4 border-gray-400 rounded-t-lg">
                            <div class="absolute inset-4 bg-gray-50 rounded-lg flex flex-col items-center justify-center">
                              <div class="text-6xl mb-4">💨</div>
                              <div class="text-lg font-bold text-gray-700">CO₂ 已收集</div>
                            </div>
                          </div>
                          <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-56 h-4 bg-gray-500 rounded-lg shadow-lg"></div>
                        </div>

                        <div class="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
                          <h3 class="text-xl font-bold text-indigo-700 mb-4">气体验满方法</h3>
                          <div class="flex items-center justify-center gap-4">
                            <div class="text-center">
                              <div class="text-4xl mb-2">🔥</div>
                              <p class="text-sm text-gray-600">燃着的木条</p>
                            </div>
                            <div class="text-3xl">→</div>
                            <div class="text-center">
                              <div class="text-4xl mb-2">集气瓶口</div>
                              <p class="text-sm text-gray-600">放在瓶口</p>
                            </div>
                            <div class="text-3xl">→</div>
                            <div class="text-center">
                              <div class="text-4xl mb-2">💨</div>
                              <p class="text-sm text-gray-600">木条熄灭</p>
                              <p class="text-xs text-green-600 font-semibold">已满！</p>
                            </div>
                          </div>
                        </div>

                        <div class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                          <p class="text-yellow-800">
                            <span class="font-bold">注意：</span>二氧化碳密度比空气大，所以使用<span class="font-bold">向上排空气法</span>收集。
                            检验气体时，将燃着的木条放在<span class="font-bold">集气瓶口</span>，若木条熄灭则证明已收集满。
                          </p>
                        </div>
                      </div>
                    </div>
                  }
                }
              </div>

              <ng-template pTemplate="footer">
                <div class="flex justify-between items-center">
                  <p-button 
                    label="上一步" 
                    icon="pi pi-arrow-left"
                    [disabled]="currentStep === 0"
                    (click)="prevStep()"
                    styleClass="p-button-secondary"
                  ></p-button>

                  <div class="flex gap-3">
                    @if (currentStep === 2) {
                      <p-button 
                        [label]="isAddingLiquid ? '停止添加' : '添加稀盐酸'" 
                        icon="pi pi-play"
                        (click)="toggleLiquid()"
                        styleClass="p-button-info"
                      ></p-button>
                    }
                    @if (currentStep === 3) {
                      <p-button 
                        [label]="isReacting ? '暂停反应' : '开始反应'" 
                        [icon]="isReacting ? 'pi pi-pause' : 'pi pi-play'"
                        (click)="toggleReaction()"
                        styleClass="p-button-success"
                      ></p-button>
                    }
                  </div>

                  <p-button 
                    [label]="currentStep === 5 ? '进入知识检验' : '下一步'" 
                    [icon]="currentStep === 5 ? 'pi pi-graduation-cap' : 'pi pi-arrow-right'"
                    iconPos="right"
                    (click)="nextStep()"
                    styleClass="p-button-primary"
                  ></p-button>
                </div>
              </ng-template>
            </p-card>
          </div>

          <div class="lg:col-span-1 space-y-6">
            <p-card header="当前步骤说明" class="shadow-lg">
              <div class="text-gray-700 leading-relaxed">
                @switch (currentStep) {
                  @case (0) {
                    <p>准备实验药品和仪器：</p>
                    <ul class="list-disc list-inside mt-2 space-y-1">
                      <li>大理石或石灰石（CaCO₃）</li>
                      <li>稀盐酸（HCl）</li>
                      <li>锥形瓶、长颈漏斗</li>
                      <li>集气瓶、玻璃片</li>
                    </ul>
                  }
                  @case (1) {
                    <p>将固体药品（大理石或石灰石）放入锥形瓶底部。</p>
                    <p class="mt-2 text-yellow-600">注意：块状固体药品要用镊子夹取，不能直接用手接触。</p>
                  }
                  @case (2) {
                    <p>通过长颈漏斗向锥形瓶中添加稀盐酸。</p>
                    <p class="mt-2 text-blue-600">点击"添加稀盐酸"按钮开始添加液体。</p>
                    <p class="mt-2 text-yellow-600">注意：长颈漏斗的末端必须浸没在液体中，防止气体从漏斗逸出。</p>
                  }
                  @case (3) {
                    <p>碳酸钙与稀盐酸开始反应，产生二氧化碳气体。</p>
                    <p class="mt-2 text-green-600">观察：可以看到有大量气泡产生。</p>
                    <p class="mt-2 text-blue-600">点击"开始反应"按钮观看动画。</p>
                  }
                  @case (4) {
                    <p>收集二氧化碳气体。</p>
                    <p class="mt-2"><span class="font-bold">收集方法：</span>向上排空气法</p>
                    <p class="mt-2 text-gray-600">原因：CO₂密度比空气大（约是空气的1.5倍）</p>
                    <p class="mt-2 text-yellow-600">注意：导管要伸到集气瓶底部，便于排尽空气。</p>
                  }
                  @case (5) {
                    <p>验满和检验。</p>
                    <p class="mt-2"><span class="font-bold">验满方法：</span>将燃着的木条放在集气瓶口，若木条熄灭，则证明已收集满。</p>
                    <p class="mt-2"><span class="font-bold">检验方法：</span>将气体通入澄清石灰水中，若石灰水变浑浊，则证明是二氧化碳。</p>
                    <p class="mt-2 text-green-600">反应方程式：CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O</p>
                  }
                }
              </div>
            </p-card>

            <p-card header="关键知识点" class="shadow-lg">
              <div class="space-y-3">
                <div class="p-3 bg-blue-50 rounded-lg">
                  <h4 class="font-bold text-blue-700 mb-1">为什么选碳酸钙？</h4>
                  <p class="text-sm text-gray-600">反应速率适中，便于控制和收集气体。</p>
                </div>
                <div class="p-3 bg-green-50 rounded-lg">
                  <h4 class="font-bold text-green-700 mb-1">为什么不用硫酸？</h4>
                  <p class="text-sm text-gray-600">生成的硫酸钙微溶，会覆盖在碳酸钙表面，阻止反应继续进行。</p>
                </div>
                <div class="p-3 bg-orange-50 rounded-lg">
                  <h4 class="font-bold text-orange-700 mb-1">为什么不用浓盐酸？</h4>
                  <p class="text-sm text-gray-600">浓盐酸易挥发，会使制得的CO₂中混有HCl气体。</p>
                </div>
              </div>
            </p-card>

            <div class="mt-6 text-center">
              <p-button 
                label="返回实验原理" 
                icon="pi pi-book"
                (click)="goToPrinciple()"
                styleClass="p-button-text p-button-secondary w-full"
              ></p-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `]
})
export class ExperimentComponent implements OnInit, OnDestroy {
  steps: MenuItem[] = [
    { label: '准备药品' },
    { label: '放入固体' },
    { label: '添加液体' },
    { label: '开始反应' },
    { label: '收集气体' },
    { label: '验满检验' }
  ];

  currentStep = 0;
  isAddingLiquid = false;
  isReacting = false;
  liquidLevel = 0;
  bubbles: Bubble[] = [];
  private bubbleIdCounter = 0;
  private animationFrame: number | null = null;
  private liquidInterval: ReturnType<typeof setInterval> | null = null;

  constructor(private router: Router) {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    if (this.liquidInterval) {
      clearInterval(this.liquidInterval);
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.isAddingLiquid = false;
      this.isReacting = false;
      this.liquidLevel = 0;
      this.bubbles = [];
      if (this.liquidInterval) {
        clearInterval(this.liquidInterval);
        this.liquidInterval = null;
      }
    }
  }

  nextStep() {
    if (this.currentStep === 5) {
      this.router.navigate(['/quiz']);
    } else if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.isAddingLiquid = false;
      this.isReacting = false;
      this.bubbles = [];
    }
  }

  toggleLiquid() {
    this.isAddingLiquid = !this.isAddingLiquid;
    if (this.isAddingLiquid) {
      this.liquidInterval = setInterval(() => {
        if (this.liquidLevel < 70) {
          this.liquidLevel += 2;
        } else {
          this.isAddingLiquid = false;
          if (this.liquidInterval) {
            clearInterval(this.liquidInterval);
            this.liquidInterval = null;
          }
        }
      }, 100);
    } else {
      if (this.liquidInterval) {
        clearInterval(this.liquidInterval);
        this.liquidInterval = null;
      }
    }
  }

  toggleReaction() {
    this.isReacting = !this.isReacting;
    if (this.isReacting) {
      this.startBubbleAnimation();
    } else {
      this.bubbles = [];
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
      }
    }
  }

  private startBubbleAnimation() {
    const animate = () => {
      if (!this.isReacting) return;

      if (Math.random() > 0.7) {
        this.bubbles.push({
          id: this.bubbleIdCounter++,
          x: 20 + Math.random() * 160,
          y: 50,
          size: 4 + Math.random() * 8,
          speed: 1 + Math.random() * 2,
          opacity: 0.8
        });
      }

      this.bubbles = this.bubbles
        .map(bubble => ({
          ...bubble,
          y: bubble.y + bubble.speed,
          opacity: Math.max(0, bubble.opacity - 0.01)
        }))
        .filter(bubble => bubble.y < 160 && bubble.opacity > 0);

      this.animationFrame = requestAnimationFrame(animate);
    };

    animate();
  }

  goToPrinciple() {
    this.router.navigate(['/principle']);
  }
}
