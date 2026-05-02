import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-of-life',
  standalone: true,
  imports: [
    CommonModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatSlideToggleModule,
    FormsModule
  ],
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.css']
})
export class GameOfLifeComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private gl!: WebGLRenderingContext;
  private program!: WebGLProgram;
  private framebuffer!: WebGLFramebuffer;
  private texture!: WebGLTexture;
  private renderbuffer!: WebGLRenderbuffer;
  
  private animationFrameId: number | null = null;
  private lastUpdateTime: number = 0;
  
  // 游戏状态
  public isRunning: boolean = false;
  public speed: number = 10; // 1-100，代表每秒更新次数
  public randomizationFrequency: number = 5; // 0-100，百分比
  public gridSize: number = 200;
  public useGPU: boolean = true;
  
  // CPU 模式下的网格数据
  private cpuGrid!: boolean[][];
  private cpuNextGrid!: boolean[][];
  
  // 颜色方案
  private colorScheme = {
    alive: [0.0, 0.94, 1.0], // #00f0ff - 未来蓝
    dead: [0.04, 0.04, 0.06], // #0a0a0f - 未来黑
    background: [0.07, 0.07, 0.1], // #12121a - 未来深灰
    neon1: [0.62, 0.0, 1.0], // #9d00ff - 未来紫
    neon2: [1.0, 0.0, 0.9] // #ff00e6 - 未来粉
  };

  constructor() { }

  ngOnInit(): void {
    this.initializeCanvas();
    this.initializeGame();
  }

  ngOnDestroy(): void {
    this.stop();
    this.cleanupWebGL();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.resizeCanvas();
  }

  private initializeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const container = canvas.parentElement;
    
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }

    // 尝试初始化 WebGL
    if (this.useGPU) {
      this.gl = canvas.getContext('webgl') || 
                canvas.getContext('experimental-webgl') as WebGLRenderingContext;
      
      if (!this.gl) {
        console.warn('WebGL not supported, falling back to CPU mode');
        this.useGPU = false;
      } else {
        this.initializeWebGL();
      }
    }
  }

  private initializeWebGL(): void {
    const gl = this.gl;
    
    // 创建顶点着色器
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = (a_position + 1.0) / 2.0;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;
    
    // 创建片段着色器 - 生命游戏规则
    const fragmentShaderSource = `
      precision mediump float;
      uniform sampler2D u_texture;
      uniform vec2 u_resolution;
      uniform float u_randomSeed;
      uniform float u_randomizationFrequency;
      varying vec2 v_texCoord;
      
      // 颜色定义
      const vec3 ALIVE_COLOR = vec3(0.0, 0.94, 1.0);
      const vec3 DEAD_COLOR = vec3(0.04, 0.04, 0.06);
      
      float rand(vec2 co) {
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
      }
      
      void main() {
        vec2 texel = 1.0 / u_resolution;
        
        // 计算邻居数量
        float neighbors = 0.0;
        for (int i = -1; i <= 1; i++) {
          for (int j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) continue;
            vec2 neighbor = v_texCoord + vec2(float(i), float(j)) * texel;
            // 循环边界
            neighbor = fract(neighbor + 1.0);
            vec4 color = texture2D(u_texture, neighbor);
            if (color.r > 0.5) neighbors += 1.0;
          }
        }
        
        // 当前细胞状态
        vec4 current = texture2D(u_texture, v_texCoord);
        bool isAlive = current.r > 0.5;
        
        // 生命游戏规则
        bool nextState = false;
        if (isAlive) {
          // 存活：2-3 个邻居
          nextState = neighbors >= 2.0 && neighbors <= 3.0;
        } else {
          // 繁殖：恰好 3 个邻居
          nextState = neighbors == 3.0;
        }
        
        // 随机化
        float randomValue = rand(v_texCoord + u_randomSeed);
        if (randomValue < u_randomizationFrequency / 100.0) {
          nextState = randomValue < u_randomizationFrequency / 200.0;
        }
        
        // 输出颜色
        if (nextState) {
          gl_FragColor = vec4(ALIVE_COLOR, 1.0);
        } else {
          gl_FragColor = vec4(DEAD_COLOR, 1.0);
        }
      }
    `;
    
    // 渲染着色器 - 用于显示
    const renderFragmentShaderSource = `
      precision mediump float;
      uniform sampler2D u_texture;
      uniform float u_time;
      varying vec2 v_texCoord;
      
      // 颜色定义
      const vec3 ALIVE_COLOR = vec3(0.0, 0.94, 1.0);
      const vec3 DEAD_COLOR = vec3(0.04, 0.04, 0.06);
      const vec3 NEON_PURPLE = vec3(0.62, 0.0, 1.0);
      const vec3 NEON_PINK = vec3(1.0, 0.0, 0.9);
      
      void main() {
        vec4 cell = texture2D(u_texture, v_texCoord);
        bool isAlive = cell.r > 0.5;
        
        if (isAlive) {
          // 动态颜色效果 - 基于时间的脉冲
          float pulse = (sin(u_time * 2.0) + 1.0) / 2.0;
          vec3 color = mix(ALIVE_COLOR, NEON_PURPLE, pulse * 0.3);
          
          // 发光效果
          float glow = 0.8 + pulse * 0.2;
          gl_FragColor = vec4(color * glow, 1.0);
        } else {
          gl_FragColor = vec4(DEAD_COLOR, 1.0);
        }
      }
    `;
    
    // 编译着色器
    const vertexShader = this.compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = this.compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    const renderFragmentShader = this.compileShader(gl.FRAGMENT_SHADER, renderFragmentShaderSource);
    
    // 创建程序
    this.program = this.createProgram(vertexShader, fragmentShader);
    
    // 创建渲染程序
    const renderProgram = this.createProgram(vertexShader, renderFragmentShader);
    
    // 创建帧缓冲区和纹理
    this.framebuffer = gl.createFramebuffer()!;
    this.texture = this.createTexture();
    this.renderbuffer = gl.createRenderbuffer()!;
    
    // 设置顶点数据
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1
    ]), gl.STATIC_DRAW);
  }

  private compileShader(type: number, source: string): WebGLShader {
    const gl = this.gl;
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      throw new Error('Shader compilation failed');
    }
    
    return shader;
  }

  private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
    const gl = this.gl;
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      throw new Error('Program linking failed');
    }
    
    return program;
  }

  private createTexture(): WebGLTexture {
    const gl = this.gl;
    const texture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    return texture;
  }

  private cleanupWebGL(): void {
    if (this.gl) {
      this.gl.deleteProgram(this.program);
      this.gl.deleteFramebuffer(this.framebuffer);
      this.gl.deleteTexture(this.texture);
      this.gl.deleteRenderbuffer(this.renderbuffer);
    }
  }

  private initializeGame(): void {
    if (this.useGPU) {
      this.initializeGPUTexture();
    } else {
      this.initializeCPUGrid();
    }
    this.render();
  }

  private initializeGPUTexture(): void {
    const gl = this.gl;
    const size = this.gridSize;
    
    // 创建随机初始状态
    const data = new Uint8Array(size * size * 4);
    for (let i = 0; i < size * size; i++) {
      const isAlive = Math.random() < 0.3;
      const color = isAlive ? this.colorScheme.alive : this.colorScheme.dead;
      data[i * 4] = Math.floor(color[0] * 255);
      data[i * 4 + 1] = Math.floor(color[1] * 255);
      data[i * 4 + 2] = Math.floor(color[2] * 255);
      data[i * 4 + 3] = 255;
    }
    
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
  }

  private initializeCPUGrid(): void {
    this.cpuGrid = [];
    this.cpuNextGrid = [];
    
    for (let i = 0; i < this.gridSize; i++) {
      this.cpuGrid[i] = [];
      this.cpuNextGrid[i] = [];
      for (let j = 0; j < this.gridSize; j++) {
        this.cpuGrid[i][j] = Math.random() < 0.3;
        this.cpuNextGrid[i][j] = false;
      }
    }
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const container = canvas.parentElement;
    
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      if (this.gl) {
        this.gl.viewport(0, 0, canvas.width, canvas.height);
      }
      
      this.render();
    }
  }

  public start(): void {
    this.isRunning = true;
    this.lastUpdateTime = performance.now();
    this.gameLoop();
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  public toggle(): void {
    if (this.isRunning) {
      this.stop();
    } else {
      this.start();
    }
  }

  public reset(): void {
    this.stop();
    this.initializeGame();
  }

  public randomize(): void {
    this.stop();
    if (this.useGPU) {
      this.initializeGPUTexture();
    } else {
      this.initializeCPUGrid();
    }
    this.render();
  }

  private gameLoop(): void {
    if (!this.isRunning) return;
    
    const currentTime = performance.now();
    const updateInterval = 1000 / this.speed;
    
    if (currentTime - this.lastUpdateTime >= updateInterval) {
      this.update();
      this.lastUpdateTime = currentTime;
    }
    
    this.render();
    this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
  }

  private update(): void {
    if (this.useGPU) {
      this.updateGPU();
    } else {
      this.updateCPU();
    }
  }

  private updateGPU(): void {
    const gl = this.gl;
    const canvas = this.canvasRef.nativeElement;
    
    // 绑定帧缓冲区
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    
    // 设置视口
    gl.viewport(0, 0, this.gridSize, this.gridSize);
    
    // 使用程序
    gl.useProgram(this.program);
    
    // 设置属性
    const positionLocation = gl.getAttribLocation(this.program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    // 设置 uniforms
    const resolutionLocation = gl.getUniformLocation(this.program, 'u_resolution');
    gl.uniform2f(resolutionLocation, this.gridSize, this.gridSize);
    
    const randomSeedLocation = gl.getUniformLocation(this.program, 'u_randomSeed');
    gl.uniform1f(randomSeedLocation, Math.random());
    
    const randomizationFrequencyLocation = gl.getUniformLocation(this.program, 'u_randomizationFrequency');
    gl.uniform1f(randomizationFrequencyLocation, this.randomizationFrequency);
    
    // 绘制
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    // 解绑帧缓冲区
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  private updateCPU(): void {
    // 计算下一代
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        const neighbors = this.countNeighbors(i, j);
        
        if (this.cpuGrid[i][j]) {
          // 存活规则
          this.cpuNextGrid[i][j] = neighbors === 2 || neighbors === 3;
        } else {
          // 繁殖规则
          this.cpuNextGrid[i][j] = neighbors === 3;
        }
        
        // 随机化
        if (Math.random() < this.randomizationFrequency / 100) {
          this.cpuNextGrid[i][j] = Math.random() < 0.5;
        }
      }
    }
    
    // 交换网格
    [this.cpuGrid, this.cpuNextGrid] = [this.cpuNextGrid, this.cpuGrid];
  }

  private countNeighbors(x: number, y: number): number {
    let count = 0;
    
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        
        // 循环边界
        const nx = (x + i + this.gridSize) % this.gridSize;
        const ny = (y + j + this.gridSize) % this.gridSize;
        
        if (this.cpuGrid[nx][ny]) {
          count++;
        }
      }
    }
    
    return count;
  }

  private render(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // 清空画布
    ctx.fillStyle = '#12121a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (this.useGPU) {
      this.renderGPU(ctx);
    } else {
      this.renderCPU(ctx);
    }
  }

  private renderGPU(ctx: CanvasRenderingContext2D): void {
    const gl = this.gl;
    const canvas = this.canvasRef.nativeElement;
    
    // 创建临时纹理用于渲染
    const tempTexture = this.createTexture();
    const tempFramebuffer = gl.createFramebuffer()!;
    
    // 复制当前纹理到临时纹理
    gl.bindFramebuffer(gl.FRAMEBUFFER, tempFramebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tempTexture, 0);
    gl.viewport(0, 0, this.gridSize, this.gridSize);
    
    // 使用简单的渲染程序
    const simpleVertexShader = this.compileShader(gl.VERTEX_SHADER, `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = (a_position + 1.0) / 2.0;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `);
    
    const simpleFragmentShader = this.compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      uniform sampler2D u_texture;
      uniform float u_time;
      varying vec2 v_texCoord;
      
      const vec3 ALIVE_COLOR = vec3(0.0, 0.94, 1.0);
      const vec3 DEAD_COLOR = vec3(0.04, 0.04, 0.06);
      const vec3 NEON_PURPLE = vec3(0.62, 0.0, 1.0);
      
      void main() {
        vec4 cell = texture2D(u_texture, v_texCoord);
        bool isAlive = cell.r > 0.5;
        
        if (isAlive) {
          float pulse = (sin(u_time * 2.0) + 1.0) / 2.0;
          vec3 color = mix(ALIVE_COLOR, NEON_PURPLE, pulse * 0.3);
          float glow = 0.8 + pulse * 0.2;
          gl_FragColor = vec4(color * glow, 1.0);
        } else {
          gl_FragColor = vec4(DEAD_COLOR, 1.0);
        }
      }
    `);
    
    const simpleProgram = this.createProgram(simpleVertexShader, simpleFragmentShader);
    
    gl.useProgram(simpleProgram);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    
    const positionLocation = gl.getAttribLocation(simpleProgram, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    const textureLocation = gl.getUniformLocation(simpleProgram, 'u_texture');
    gl.uniform1i(textureLocation, 0);
    
    const timeLocation = gl.getUniformLocation(simpleProgram, 'u_time');
    gl.uniform1f(timeLocation, performance.now() / 1000);
    
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    // 读取像素数据
    const pixels = new Uint8Array(this.gridSize * this.gridSize * 4);
    gl.readPixels(0, 0, this.gridSize, this.gridSize, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    
    // 绘制到 canvas
    const cellWidth = canvas.width / this.gridSize;
    const cellHeight = canvas.height / this.gridSize;
    
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        const index = (j * this.gridSize + i) * 4;
        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];
        
        if (r > 10 || g > 10 || b > 10) {
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillRect(
            i * cellWidth,
            (this.gridSize - 1 - j) * cellHeight,
            cellWidth,
            cellHeight
          );
        }
      }
    }
    
    // 清理
    gl.deleteProgram(simpleProgram);
    gl.deleteFramebuffer(tempFramebuffer);
    gl.deleteTexture(tempTexture);
  }

  private renderCPU(ctx: CanvasRenderingContext2D): void {
    const canvas = this.canvasRef.nativeElement;
    const cellWidth = canvas.width / this.gridSize;
    const cellHeight = canvas.height / this.gridSize;
    const time = performance.now() / 1000;
    
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        if (this.cpuGrid[i][j]) {
          // 动态颜色效果
          const pulse = (Math.sin(time * 2) + 1) / 2;
          const r = Math.floor((0 + pulse * 0.62) * 255);
          const g = Math.floor((0.94 + pulse * 0.0) * 255);
          const b = Math.floor((1.0 + pulse * 1.0) * 255);
          
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillRect(
            j * cellWidth,
            i * cellHeight,
            cellWidth,
            cellHeight
          );
        }
      }
    }
  }

  // 滑块事件处理
  public onSpeedChange(value: number): void {
    this.speed = value;
  }

  public onRandomizationChange(value: number): void {
    this.randomizationFrequency = value;
  }

  public formatLabel(value: number): string {
    return `${value}`;
  }
}
