<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import type { WaterSimulationParams } from '../types'

const props = defineProps<{
  params: WaterSimulationParams
}>()

const container = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let waterMesh: THREE.Mesh
let ambientLight: THREE.AmbientLight
let directionalLight: THREE.DirectionalLight
let animationId: number
let time = 0

const waterVertexShader = `
  uniform float time;
  uniform float amplitude;
  uniform float speed;
  
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vNoise;
  
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    float waveSpeed = speed * 0.5;
    
    float wave1 = snoise(vec3(position.x * 0.3 + time * waveSpeed, position.z * 0.3, time * waveSpeed * 0.5));
    float wave2 = snoise(vec3(position.x * 0.6 + time * waveSpeed * 1.3, position.z * 0.6 + time * waveSpeed * 0.7, time * waveSpeed * 0.3));
    float wave3 = snoise(vec3(position.x * 1.2 + time * waveSpeed * 0.8, position.z * 1.2 + time * waveSpeed * 1.1, time * waveSpeed * 0.9));
    
    wave1 = wave1 * 0.5 + 0.5;
    wave2 = wave2 * 0.3 + 0.5;
    wave3 = wave3 * 0.2 + 0.5;
    
    float combinedWave = (wave1 + wave2 + wave3) / 3.0;
    vElevation = (combinedWave - 0.5) * amplitude * 2.0;
    
    float detailWave = fbm(vec3(position.x * 2.0 + time * waveSpeed * 2.0, position.z * 2.0 + time * waveSpeed * 1.5, time * waveSpeed)) * 0.3;
    vElevation += detailWave * amplitude * 0.5;
    
    vNoise = fbm(vec3(position.x * 0.1 + time * waveSpeed * 0.3, position.z * 0.1 + time * waveSpeed * 0.2, time * waveSpeed * 0.1));
    
    vec3 pos = position;
    pos.y += vElevation;
    
    float epsilon = 0.1;
    
    float wave1_x = snoise(vec3((position.x + epsilon) * 0.3 + time * waveSpeed, position.z * 0.3, time * waveSpeed * 0.5));
    float wave1_z = snoise(vec3(position.x * 0.3 + time * waveSpeed, (position.z + epsilon) * 0.3, time * waveSpeed * 0.5));
    
    float wave2_x = snoise(vec3((position.x + epsilon) * 0.6 + time * waveSpeed * 1.3, position.z * 0.6 + time * waveSpeed * 0.7, time * waveSpeed * 0.3));
    float wave2_z = snoise(vec3(position.x * 0.6 + time * waveSpeed * 1.3, (position.z + epsilon) * 0.6 + time * waveSpeed * 0.7, time * waveSpeed * 0.3));
    
    float wave3_x = snoise(vec3((position.x + epsilon) * 1.2 + time * waveSpeed * 0.8, position.z * 1.2 + time * waveSpeed * 1.1, time * waveSpeed * 0.9));
    float wave3_z = snoise(vec3(position.x * 1.2 + time * waveSpeed * 0.8, (position.z + epsilon) * 1.2 + time * waveSpeed * 1.1, time * waveSpeed * 0.9));
    
    wave1_x = wave1_x * 0.5 + 0.5;
    wave1_z = wave1_z * 0.5 + 0.5;
    wave2_x = wave2_x * 0.3 + 0.5;
    wave2_z = wave2_z * 0.3 + 0.5;
    wave3_x = wave3_x * 0.2 + 0.5;
    wave3_z = wave3_z * 0.2 + 0.5;
    
    float combinedWave_x = (wave1_x + wave2_x + wave3_x) / 3.0;
    float combinedWave_z = (wave1_z + wave2_z + wave3_z) / 3.0;
    
    float dx = ((combinedWave_x - 0.5) - (combinedWave - 0.5)) / epsilon * amplitude * 2.0;
    float dz = ((combinedWave_z - 0.5) - (combinedWave - 0.5)) / epsilon * amplitude * 2.0;
    
    float detail_dx = fbm(vec3((position.x + epsilon) * 2.0 + time * waveSpeed * 2.0, position.z * 2.0 + time * waveSpeed * 1.5, time * waveSpeed)) * 0.3;
    float detail_dz = fbm(vec3(position.x * 2.0 + time * waveSpeed * 2.0, (position.z + epsilon) * 2.0 + time * waveSpeed * 1.5, time * waveSpeed)) * 0.3;
    
    dx += (detail_dx - detailWave * 0.3) / epsilon * amplitude * 0.5;
    dz += (detail_dz - detailWave * 0.3) / epsilon * amplitude * 0.5;
    
    vNormal = normalize(vec3(-dx, 1.0, -dz));
    
    vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const waterFragmentShader = `
  uniform float time;
  uniform float amplitude;
  uniform float lightIntensity;
  uniform vec3 waterColor;
  uniform vec3 deepWaterColor;
  uniform vec3 skyColor;
  uniform vec3 lightDirection;
  uniform vec3 eyePosition;
  
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vNoise;
  
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(eyePosition - vWorldPosition);
    vec3 lightDir = normalize(lightDirection);
    vec3 reflectDir = reflect(-lightDir, normal);
    vec3 viewReflectDir = reflect(-viewDir, normal);
    vec3 halfDir = normalize(lightDir + viewDir);
    
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);
    fresnel = mix(0.1, 1.0, fresnel);
    
    float depthFactor = smoothstep(-amplitude, amplitude * 0.5, vElevation);
    vec3 baseColor = mix(deepWaterColor, waterColor, depthFactor);
    
    float noiseFactor = vNoise * 0.5 + 0.5;
    baseColor = mix(baseColor, baseColor * 0.9, noiseFactor * 0.2);
    
    float specular = pow(max(dot(normal, halfDir), 0.0), 128.0);
    vec3 specularColor = vec3(1.0, 0.98, 0.92) * specular * lightIntensity * 1.5;
    
    float specular2 = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    specularColor += vec3(1.0, 0.95, 0.85) * specular2 * lightIntensity * 0.5;
    
    float diffuse = max(dot(normal, lightDir), 0.0) * lightIntensity * 0.3;
    vec3 diffuseColor = baseColor * diffuse;
    
    vec3 skyReflection = skyColor * fresnel * 0.6;
    
    float causticScale = 5.0;
    float caustic1 = sin(vUv.x * causticScale * 10.0 + time * 0.5) * sin(vUv.y * causticScale * 10.0 + time * 0.3);
    float caustic2 = sin(vUv.x * causticScale * 8.0 + time * 0.7) * sin(vUv.y * causticScale * 8.0 + time * 0.5);
    float caustics = (caustic1 + caustic2) * 0.05 * lightIntensity;
    
    float subsurface = max(dot(normal, viewDir), 0.0);
    subsurface = pow(1.0 - subsurface, 2.0);
    vec3 subsurfaceColor = waterColor * subsurface * lightIntensity * 0.3;
    
    vec3 finalColor = baseColor * 0.4;
    finalColor += diffuseColor;
    finalColor += skyReflection;
    finalColor += specularColor;
    finalColor += subsurfaceColor;
    finalColor += caustics;
    
    float foamThreshold = smoothstep(amplitude * 0.3, amplitude * 0.8, vElevation);
    float foamNoise = snoise(vec3(vUv.x * 20.0 + time * 0.5, vUv.y * 20.0 + time * 0.3, time * 0.2)) * 0.5 + 0.5;
    float foam = foamThreshold * foamNoise * 0.15;
    finalColor = mix(finalColor, vec3(0.95, 0.98, 1.0), foam);
    
    float distanceToCamera = length(eyePosition - vWorldPosition);
    float fogFactor = 1.0 - exp(-distanceToCamera * 0.02);
    vec3 fogColor = mix(deepWaterColor, skyColor, 0.5);
    finalColor = mix(finalColor, fogColor, fogFactor * 0.3);
    
    float alpha = 0.85 + fresnel * 0.15;
    alpha = mix(alpha, 0.95, fogFactor * 0.5);
    
    finalColor = finalColor * 0.9 + vec3(0.02, 0.05, 0.08);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`

const init = () => {
  if (!container.value) return
  
  scene = new THREE.Scene()
  
  camera = new THREE.PerspectiveCamera(
    60,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  )
  camera.position.set(0, 6, 12)
  camera.lookAt(0, 0, 0)
  
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  container.value.appendChild(renderer.domElement)
  
  ambientLight = new THREE.AmbientLight(0x87ceeb, 0.4 * props.params.lightIntensity)
  scene.add(ambientLight)
  
  directionalLight = new THREE.DirectionalLight(0xfffaf0, 1.5 * props.params.lightIntensity)
  directionalLight.position.set(10, 20, 10)
  scene.add(directionalLight)
  
  const backLight = new THREE.DirectionalLight(0x4488ff, 0.3 * props.params.lightIntensity)
  backLight.position.set(-10, 5, -10)
  scene.add(backLight)
  
  const waterGeometry = new THREE.PlaneGeometry(40, 40, 200, 200)
  waterGeometry.rotateX(-Math.PI / 2)
  
  const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms: {
      time: { value: 0 },
      amplitude: { value: props.params.amplitude },
      speed: { value: props.params.speed },
      lightIntensity: { value: props.params.lightIntensity },
      waterColor: { value: new THREE.Color(0x0a4a6e) },
      deepWaterColor: { value: new THREE.Color(0x051a28) },
      skyColor: { value: new THREE.Color(0x87ceeb) },
      lightDirection: { value: new THREE.Vector3(0.3, 0.8, 0.3).normalize() },
      eyePosition: { value: camera.position }
    },
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  })
  
  waterMesh = new THREE.Mesh(waterGeometry, waterMaterial)
  scene.add(waterMesh)
  
  const bottomGeometry = new THREE.PlaneGeometry(50, 50, 100, 100)
  bottomGeometry.rotateX(-Math.PI / 2)
  
  const bottomMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec2 vUv;
      varying float vElevation;
      
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        i = mod289(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
      
      void main() {
        vUv = uv;
        
        float noise1 = snoise(vec3(position.x * 0.1, position.z * 0.1, 0.0)) * 2.0;
        float noise2 = snoise(vec3(position.x * 0.2, position.z * 0.2, 1.0)) * 1.0;
        float noise3 = snoise(vec3(position.x * 0.4, position.z * 0.4, 2.0)) * 0.5;
        
        vElevation = noise1 + noise2 + noise3;
        
        vec3 pos = position;
        pos.y = -8.0 + vElevation;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float lightIntensity;
      
      varying vec2 vUv;
      varying float vElevation;
      
      void main() {
        float sandFactor = smoothstep(-3.0, 2.0, vElevation);
        float rockFactor = smoothstep(-6.0, -3.0, vElevation);
        
        vec3 sandColor = vec3(0.76, 0.70, 0.50);
        vec3 rockColor = vec3(0.3, 0.35, 0.4);
        vec3 deepSandColor = vec3(0.5, 0.45, 0.3);
        
        vec3 baseColor;
        if (sandFactor > 0.5) {
          baseColor = mix(deepSandColor, sandColor, sandFactor);
        } else {
          baseColor = mix(rockColor, deepSandColor, rockFactor);
        }
        
        float detail = sin(vUv.x * 50.0) * sin(vUv.y * 50.0) * 0.05;
        baseColor += detail;
        
        float lightFactor = lightIntensity * 0.3;
        baseColor = baseColor * (0.5 + lightFactor);
        
        gl_FragColor = vec4(baseColor, 1.0);
      }
    `,
    uniforms: {
      time: { value: 0 },
      lightIntensity: { value: props.params.lightIntensity }
    }
  })
  
  const bottomMesh = new THREE.Mesh(bottomGeometry, bottomMaterial)
  scene.add(bottomMesh)
  
  const skyGeometry = new THREE.SphereGeometry(200, 64, 64)
  const skyMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vWorldPosition;
      
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float lightIntensity;
      
      varying vec3 vWorldPosition;
      
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        i = mod289(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
      
      void main() {
        float h = normalize(vWorldPosition).y;
        
        vec3 horizonColor = vec3(0.8, 0.85, 0.9);
        vec3 zenithColor = vec3(0.3, 0.5, 0.8);
        vec3 sunColor = vec3(1.0, 0.95, 0.8);
        
        float skyGradient = smoothstep(-0.2, 0.8, h);
        vec3 skyColor = mix(horizonColor, zenithColor, skyGradient);
        
        vec3 sunDir = normalize(vec3(0.3, 0.8, 0.3));
        float sunDot = max(dot(normalize(vWorldPosition), sunDir), 0.0);
        float sunGlow = pow(sunDot, 32.0) * 2.0;
        float sunCore = pow(sunDot, 256.0) * 5.0;
        
        skyColor += sunColor * (sunGlow + sunCore);
        
        float cloudNoise = snoise(vec3(vWorldPosition.x * 0.5 + time * 0.01, vWorldPosition.y * 0.3, vWorldPosition.z * 0.5));
        cloudNoise = cloudNoise * 0.5 + 0.5;
        float cloudThreshold = smoothstep(0.6, 0.8, cloudNoise);
        vec3 cloudColor = vec3(1.0, 1.0, 1.0);
        
        float cloudHeight = smoothstep(0.1, 0.4, h);
        skyColor = mix(skyColor, cloudColor, cloudThreshold * cloudHeight * 0.3);
        
        gl_FragColor = vec4(skyColor, 1.0);
      }
    `,
    uniforms: {
      time: { value: 0 },
      lightIntensity: { value: props.params.lightIntensity }
    },
    side: THREE.BackSide
  })
  
  const sky = new THREE.Mesh(skyGeometry, skyMaterial)
  scene.add(sky)
  
  const handleResize = () => {
    if (!container.value) return
    camera.aspect = container.value.clientWidth / container.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  }
  
  window.addEventListener('resize', handleResize)
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  
  time += 0.016
  
  if (waterMesh && waterMesh.material instanceof THREE.ShaderMaterial) {
    waterMesh.material.uniforms.time.value = time
    waterMesh.material.uniforms.eyePosition.value = camera.position
  }
  
  scene.traverse((obj) => {
    if (obj instanceof THREE.Mesh && obj.material instanceof THREE.ShaderMaterial) {
      if (obj.material.uniforms.time) {
        obj.material.uniforms.time.value = time
      }
    }
  })
  
  camera.position.x = Math.sin(time * 0.08) * 12
  camera.position.z = Math.cos(time * 0.08) * 12
  camera.position.y = 6 + Math.sin(time * 0.05) * 1
  camera.lookAt(0, 0, 0)
  
  renderer.render(scene, camera)
}

watch(() => props.params, (newParams) => {
  if (waterMesh && waterMesh.material instanceof THREE.ShaderMaterial) {
    waterMesh.material.uniforms.amplitude.value = newParams.amplitude
    waterMesh.material.uniforms.speed.value = newParams.speed
    waterMesh.material.uniforms.lightIntensity.value = newParams.lightIntensity
  }
  
  if (ambientLight) {
    ambientLight.intensity = 0.4 * newParams.lightIntensity
  }
  
  if (directionalLight) {
    directionalLight.intensity = 1.5 * newParams.lightIntensity
  }
  
  scene.traverse((obj) => {
    if (obj instanceof THREE.Mesh && obj.material instanceof THREE.ShaderMaterial) {
      if (obj.material.uniforms.lightIntensity) {
        obj.material.uniforms.lightIntensity.value = newParams.lightIntensity
      }
    }
  })
}, { deep: true })

onMounted(() => {
  init()
  animate()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (renderer) {
    renderer.dispose()
  }
})
</script>

<template>
  <div ref="container" class="water-container"></div>
</template>

<style scoped>
.water-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #0a1628, #1a3a52);
}
</style>
