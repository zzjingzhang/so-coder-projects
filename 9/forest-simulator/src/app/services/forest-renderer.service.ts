import { Injectable, NgZone, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EnvironmentService } from './environment.service';
import {
  EnvironmentState,
  WeatherCondition,
} from '../models/environment.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForestRendererService implements OnDestroy {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private animationFrameId: number | null = null;
  private stateSubscription: Subscription | null = null;

  private trees: THREE.Group[] = [];
  private rainParticles: THREE.Points | null = null;
  private sunLight!: THREE.DirectionalLight;
  private ambientLight!: THREE.AmbientLight;
  private moonLight!: THREE.DirectionalLight;
  private fog!: THREE.Fog;

  constructor(
    private ngZone: NgZone,
    private environmentService: EnvironmentService
  ) {}

  init(container: HTMLElement): void {
    this.scene = new THREE.Scene();

    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
    this.camera.position.set(0, 10, 30);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.1;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 100;

    this.fog = new THREE.Fog(0x87ceeb, 50, 200);
    this.scene.fog = this.fog;

    this.createLights();
    this.createGround();
    this.createTrees();

    this.stateSubscription = this.environmentService.state$.subscribe(
      (state) => this.updateEnvironment(state)
    );

    const initialState = this.environmentService.getState();
    this.updateEnvironment(initialState);

    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });

    window.addEventListener('resize', () => this.onResize(container));
  }

  private createLights(): void {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(this.ambientLight);

    this.sunLight = new THREE.DirectionalLight(0xfffdd0, 1);
    this.sunLight.position.set(50, 100, 50);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 500;
    this.sunLight.shadow.camera.left = -100;
    this.sunLight.shadow.camera.right = 100;
    this.sunLight.shadow.camera.top = 100;
    this.sunLight.shadow.camera.bottom = -100;
    this.scene.add(this.sunLight);

    this.moonLight = new THREE.DirectionalLight(0x4a5568, 0.3);
    this.moonLight.position.set(-50, 50, -50);
    this.scene.add(this.moonLight);
  }

  private createGround(): void {
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x228b22,
      roughness: 0.9,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    for (let i = 0; i < 500; i++) {
      const grassGeometry = new THREE.ConeGeometry(0.1, 0.4, 4);
      const grassMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(
          0.25 + Math.random() * 0.1,
          0.7,
          0.3 + Math.random() * 0.2
        ),
      });
      const grass = new THREE.Mesh(grassGeometry, grassMaterial);
      grass.position.set(
        (Math.random() - 0.5) * 180,
        0.2,
        (Math.random() - 0.5) * 180
      );
      grass.rotation.y = Math.random() * Math.PI;
      this.scene.add(grass);
    }
  }

  private createTrees(): void {
    const treeCount = 80;

    for (let i = 0; i < treeCount; i++) {
      const tree = this.createTree();
      const x = (Math.random() - 0.5) * 150;
      const z = (Math.random() - 0.5) * 150;
      tree.position.set(x, 0, z);
      tree.rotation.y = Math.random() * Math.PI * 2;
      const scale = 0.6 + Math.random() * 0.8;
      tree.scale.set(scale, scale, scale);
      this.scene.add(tree);
      this.trees.push(tree);
    }
  }

  private createTree(): THREE.Group {
    const tree = new THREE.Group();

    const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.5, 4, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b4513,
      roughness: 0.9,
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 2;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    tree.add(trunk);

    const foliageMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d5016,
      roughness: 0.8,
    });

    for (let i = 0; i < 3; i++) {
      const foliageGeometry = new THREE.ConeGeometry(
        3 - i * 0.6,
        3.5 - i * 0.5,
        8
      );
      const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
      foliage.position.y = 4 + i * 2.5;
      foliage.castShadow = true;
      foliage.receiveShadow = true;
      tree.add(foliage);
    }

    return tree;
  }

  private createRain(intensity: number): void {
    if (this.rainParticles) {
      this.scene.remove(this.rainParticles);
    }

    if (intensity <= 0) {
      this.rainParticles = null;
      return;
    }

    const particleCount = Math.floor(intensity * 5000);
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200;
      positions[i + 1] = Math.random() * 100;
      positions[i + 2] = (Math.random() - 0.5) * 200;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xadd8e6,
      size: 0.3,
      transparent: true,
      opacity: 0.6,
    });

    this.rainParticles = new THREE.Points(geometry, material);
    this.scene.add(this.rainParticles);
  }

  private updateEnvironment(state: EnvironmentState): void {
    this.updateTimeOfDay(state.time.hour);
    this.updateWeather(state.weather);
    this.updateCamera(state.camera);
  }

  private updateTimeOfDay(hour: number): void {
    const normalizedHour = hour / 24;

    let sunPositionX: number;
    let sunPositionY: number;
    let sunColor: THREE.Color;
    let sunIntensity: number;
    let ambientIntensity: number;
    let skyColor: THREE.Color;
    let fogColor: THREE.Color;

    if (hour >= 6 && hour < 8) {
      const t = (hour - 6) / 2;
      sunPositionX = -100 + t * 100;
      sunPositionY = t * 100;
      sunColor = new THREE.Color().lerpColors(
        new THREE.Color(0xff6b6b),
        new THREE.Color(0xffa500),
        t
      );
      sunIntensity = t;
      ambientIntensity = 0.2 + t * 0.3;
      skyColor = new THREE.Color().lerpColors(
        new THREE.Color(0x1a1a2e),
        new THREE.Color(0xffb6c1),
        t
      );
      fogColor = new THREE.Color().lerpColors(
        new THREE.Color(0x1a1a2e),
        new THREE.Color(0xffb6c1),
        t
      );
    } else if (hour >= 8 && hour < 17) {
      const t = (hour - 8) / 9;
      sunPositionX = 0 + Math.sin(t * Math.PI) * 100;
      sunPositionY = 80 + Math.sin(t * Math.PI) * 20;
      sunColor = new THREE.Color(0xfffdd0);
      sunIntensity = 1;
      ambientIntensity = 0.5;
      skyColor = new THREE.Color(0x87ceeb);
      fogColor = new THREE.Color(0x87ceeb);
    } else if (hour >= 17 && hour < 20) {
      const t = (hour - 17) / 3;
      sunPositionX = 100 - t * 100;
      sunPositionY = 100 - t * 100;
      sunColor = new THREE.Color().lerpColors(
        new THREE.Color(0xffa500),
        new THREE.Color(0xff6b6b),
        t
      );
      sunIntensity = 1 - t * 0.7;
      ambientIntensity = 0.5 - t * 0.3;
      skyColor = new THREE.Color().lerpColors(
        new THREE.Color(0x87ceeb),
        new THREE.Color(0xff6b6b),
        t
      );
      fogColor = new THREE.Color().lerpColors(
        new THREE.Color(0x87ceeb),
        new THREE.Color(0xff6b6b),
        t
      );
    } else {
      let nightHour = hour < 6 ? hour + 4 : hour - 20;
      const t = nightHour / 10;
      sunPositionX = -100;
      sunPositionY = -50;
      sunColor = new THREE.Color(0x1a1a2e);
      sunIntensity = 0;
      ambientIntensity = 0.1;
      skyColor = new THREE.Color().lerpColors(
        new THREE.Color(0xff6b6b),
        new THREE.Color(0x0a0a1a),
        t
      );
      fogColor = new THREE.Color().lerpColors(
        new THREE.Color(0xff6b6b),
        new THREE.Color(0x0a0a1a),
        t
      );
    }

    this.sunLight.position.set(sunPositionX, sunPositionY, 50);
    this.sunLight.color = sunColor;
    this.sunLight.intensity = sunIntensity;
    this.ambientLight.intensity = ambientIntensity;

    this.moonLight.visible = hour < 6 || hour >= 20;
    if (this.moonLight.visible) {
      let moonPhase = 1;
      if (hour >= 20) {
        moonPhase = (hour - 20) / 4;
      } else {
        moonPhase = 1 - hour / 6;
      }
      this.moonLight.intensity = 0.3 * moonPhase;
    }

    this.scene.background = skyColor;
    if (this.scene.fog) {
      (this.scene.fog as THREE.Fog).color = fogColor;
    }
  }

  private updateWeather(weather: {
    condition: WeatherCondition;
    rainIntensity: number;
    fogDensity: number;
    cloudCover: number;
  }): void {
    if (this.scene.fog) {
      const baseFogNear = 50;
      const baseFogFar = 200;
      const fogNear = baseFogNear * (1 - weather.fogDensity * 0.8);
      const fogFar = baseFogFar * (1 - weather.fogDensity * 0.9);
      (this.scene.fog as THREE.Fog).near = Math.max(fogNear, 10);
      (this.scene.fog as THREE.Fog).far = Math.max(fogFar, 50);
    }

    this.createRain(weather.rainIntensity);

    if (weather.condition === WeatherCondition.CLOUDY ||
        weather.condition === WeatherCondition.RAINY ||
        weather.condition === WeatherCondition.FOGGY) {
      this.ambientLight.intensity = this.ambientLight.intensity * 0.6;
    }
  }

  private updateCamera(cameraState: {
    position: { x: number; y: number; z: number };
    target: { x: number; y: number; z: number };
    fov: number;
  }): void {
    this.camera.position.set(
      cameraState.position.x,
      cameraState.position.y,
      cameraState.position.z
    );
    this.controls.target.set(
      cameraState.target.x,
      cameraState.target.y,
      cameraState.target.z
    );
    this.camera.fov = cameraState.fov;
    this.camera.updateProjectionMatrix();
    this.controls.update();
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    this.controls.update();

    if (this.rainParticles) {
      const positions = this.rainParticles.geometry.attributes['position'].array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= 0.5;
        if (positions[i] < 0) {
          positions[i] = 100;
        }
      }
      this.rainParticles.geometry.attributes['position'].needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }

  private onResize(container: HTMLElement): void {
    const aspect = container.clientWidth / container.clientHeight;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}
