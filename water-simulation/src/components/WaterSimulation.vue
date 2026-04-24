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
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    float wave1 = sin(position.x * 2.0 + time * speed) * cos(position.z * 2.0 + time * speed * 0.7);
    float wave2 = sin(position.x * 3.0 + time * speed * 1.3) * cos(position.z * 3.0 + time * speed * 0.9);
    float wave3 = sin(position.x * 4.0 + time * speed * 1.7) * cos(position.z * 4.0 + time * speed * 1.1);
    
    vElevation = (wave1 + wave2 + wave3) * amplitude;
    
    vec3 pos = position;
    pos.y += vElevation;
    
    float dx = amplitude * (
      2.0 * cos(position.x * 2.0 + time * speed) * cos(position.z * 2.0 + time * speed * 0.7) +
      3.0 * cos(position.x * 3.0 + time * speed * 1.3) * cos(position.z * 3.0 + time * speed * 0.9) +
      4.0 * cos(position.x * 4.0 + time * speed * 1.7) * cos(position.z * 4.0 + time * speed * 1.1)
    );
    
    float dz = amplitude * (
      -2.0 * sin(position.x * 2.0 + time * speed) * sin(position.z * 2.0 + time * speed * 0.7) * 0.7 +
      -3.0 * sin(position.x * 3.0 + time * speed * 1.3) * sin(position.z * 3.0 + time * speed * 0.9) * 0.9 +
      -4.0 * sin(position.x * 4.0 + time * speed * 1.7) * sin(position.z * 4.0 + time * speed * 1.1) * 1.1
    );
    
    vNormal = normalize(vec3(-dx, 1.0, -dz));
    
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
  
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  void main() {
    vec3 normal = normalize(vNormal);
    
    float depthFactor = smoothstep(-amplitude * 0.5, amplitude * 0.5, vElevation);
    vec3 baseColor = mix(deepWaterColor, waterColor, depthFactor);
    
    vec3 viewDir = normalize(cameraPosition - vPosition);
    vec3 lightDir = normalize(lightDirection);
    vec3 reflectDir = reflect(-lightDir, normal);
    vec3 viewReflectDir = reflect(-viewDir, normal);
    
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.0);
    
    float specular = pow(max(dot(viewDir, reflectDir), 0.0), 64.0) * lightIntensity;
    
    float diffuse = max(dot(normal, lightDir), 0.0) * lightIntensity * 0.5;
    
    vec3 reflectionColor = skyColor * fresnel * 0.6;
    
    float caustic1 = sin(vUv.x * 20.0 + time * 1.0) * sin(vUv.y * 20.0 + time * 0.7);
    float caustic2 = sin(vUv.x * 15.0 + time * 1.3) * sin(vUv.y * 15.0 + time * 1.1);
    float caustics = (caustic1 + caustic2) * 0.1 * lightIntensity;
    
    vec3 finalColor = baseColor + diffuse + caustics;
    finalColor += reflectionColor;
    finalColor += vec3(1.0, 0.95, 0.85) * specular;
    
    float foam = smoothstep(amplitude * 0.3, amplitude * 0.6, vElevation) * 0.3;
    finalColor = mix(finalColor, vec3(0.9, 0.95, 1.0), foam);
    
    float refractionOffset = vElevation * 0.02;
    vec2 refractedUv = vUv + vec2(refractionOffset);
    float refractionEffect = sin(refractedUv.x * 10.0 + refractedUv.y * 10.0) * 0.05;
    finalColor += refractionEffect;
    
    gl_FragColor = vec4(finalColor, 0.9);
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
  camera.position.set(0, 8, 15)
  camera.lookAt(0, 0, 0)
  
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)
  
  ambientLight = new THREE.AmbientLight(0xffffff, 0.5 * props.params.lightIntensity)
  scene.add(ambientLight)
  
  directionalLight = new THREE.DirectionalLight(0xffffff, 1 * props.params.lightIntensity)
  directionalLight.position.set(5, 10, 5)
  scene.add(directionalLight)
  
  const waterGeometry = new THREE.PlaneGeometry(30, 30, 256, 256)
  waterGeometry.rotateX(-Math.PI / 2)
  
  const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms: {
      time: { value: 0 },
      amplitude: { value: props.params.amplitude },
      speed: { value: props.params.speed },
      lightIntensity: { value: props.params.lightIntensity },
      waterColor: { value: new THREE.Color(0x1e88e5) },
      deepWaterColor: { value: new THREE.Color(0x0d47a1) },
      skyColor: { value: new THREE.Color(0x87ceeb) },
      lightDirection: { value: new THREE.Vector3(0.5, 1, 0.5).normalize() }
    },
    transparent: true,
    side: THREE.DoubleSide
  })
  
  waterMesh = new THREE.Mesh(waterGeometry, waterMaterial)
  scene.add(waterMesh)
  
  const skyGeometry = new THREE.SphereGeometry(100, 32, 32)
  const skyMaterial = new THREE.MeshBasicMaterial({
    color: 0x87ceeb,
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
  }
  
  camera.position.x = Math.sin(time * 0.1) * 15
  camera.position.z = Math.cos(time * 0.1) * 15
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
    ambientLight.intensity = 0.5 * newParams.lightIntensity
  }
  
  if (directionalLight) {
    directionalLight.intensity = 1 * newParams.lightIntensity
  }
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
  background: linear-gradient(to bottom, #87ceeb, #4a90e2);
}
</style>
