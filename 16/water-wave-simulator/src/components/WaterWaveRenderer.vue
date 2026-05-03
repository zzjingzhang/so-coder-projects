<template>
  <div ref="container" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'

const props = defineProps({
  amplitude: {
    type: Number,
    default: 0.5
  },
  speed: {
    type: Number,
    default: 1.0
  },
  transparency: {
    type: Number,
    default: 0.7
  }
})

const container = ref(null)
let scene, camera, renderer, water, animationId
let time = 0

const vertexShader = `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uSpeed;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vElevation;
  
  vec3 gerstnerWave(vec2 direction, float steepness, float wavelength, vec2 position) {
    float k = 2.0 * 3.14159 / wavelength;
    float c = sqrt(9.8 / k);
    vec2 d = normalize(direction);
    float f = k * (dot(d, position) - c * uTime * uSpeed);
    float a = steepness / k * uAmplitude;
    
    return vec3(
      d.x * (a * cos(f)),
      a * sin(f),
      d.y * (a * cos(f))
    );
  }
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    vec3 wave1 = gerstnerWave(vec2(1.0, 0.3), 0.25, 8.0, pos.xz);
    vec3 wave2 = gerstnerWave(vec2(0.5, 1.0), 0.15, 5.0, pos.xz);
    vec3 wave3 = gerstnerWave(vec2(-0.7, 0.5), 0.1, 3.0, pos.xz);
    vec3 wave4 = gerstnerWave(vec2(0.3, -0.8), 0.08, 2.0, pos.xz);
    
    pos += wave1 + wave2 + wave3 + wave4;
    vPosition = pos;
    vElevation = pos.y;
    
    float delta = 0.01;
    vec3 posX = position + vec3(delta, 0.0, 0.0);
    vec3 posZ = position + vec3(0.0, 0.0, delta);
    
    vec3 waveX1 = gerstnerWave(vec2(1.0, 0.3), 0.25, 8.0, posX.xz);
    vec3 waveX2 = gerstnerWave(vec2(0.5, 1.0), 0.15, 5.0, posX.xz);
    vec3 waveX3 = gerstnerWave(vec2(-0.7, 0.5), 0.1, 3.0, posX.xz);
    vec3 waveX4 = gerstnerWave(vec2(0.3, -0.8), 0.08, 2.0, posX.xz);
    posX += waveX1 + waveX2 + waveX3 + waveX4;
    
    vec3 waveZ1 = gerstnerWave(vec2(1.0, 0.3), 0.25, 8.0, posZ.xz);
    vec3 waveZ2 = gerstnerWave(vec2(0.5, 1.0), 0.15, 5.0, posZ.xz);
    vec3 waveZ3 = gerstnerWave(vec2(-0.7, 0.5), 0.1, 3.0, posZ.xz);
    vec3 waveZ4 = gerstnerWave(vec2(0.3, -0.8), 0.08, 2.0, posZ.xz);
    posZ += waveZ1 + waveZ2 + waveZ3 + waveZ4;
    
    vec3 tangent = normalize(posX - pos);
    vec3 bitangent = normalize(posZ - pos);
    vNormal = normalize(cross(bitangent, tangent));
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float uTransparency;
  uniform vec3 uWaterColor;
  uniform vec3 uDeepColor;
  uniform vec3 uFoamColor;
  uniform vec3 uSkyColor;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vElevation;
  
  void main() {
    vec3 normal = normalize(vNormal);
    
    vec3 viewDir = normalize(cameraPosition - vPosition);
    vec3 reflectDir = reflect(-viewDir, normal);
    
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
    
    float depthFactor = smoothstep(-1.0, 1.0, vElevation);
    vec3 waterBase = mix(uDeepColor, uWaterColor, depthFactor);
    
    vec3 skyReflection = uSkyColor + fresnel * 0.5;
    
    float foam = smoothstep(0.3, 0.8, vElevation + 0.5) * smoothstep(1.0, 0.5, vElevation);
    vec3 finalColor = mix(waterBase, uFoamColor, foam * 0.3);
    
    finalColor = mix(finalColor, skyReflection, fresnel * 0.6);
    
    vec3 lightDir = normalize(vec3(0.5, 1.0, 0.3));
    float specular = pow(max(dot(reflect(-lightDir, normal), viewDir), 0.0), 64.0);
    finalColor += vec3(1.0, 0.98, 0.9) * specular * 0.8;
    
    gl_FragColor = vec4(finalColor, uTransparency);
  }
`

const init = () => {
  if (!container.value) return

  const width = container.value.clientWidth
  const height = container.value.clientHeight

  scene = new THREE.Scene()
  
  const skyColor = new THREE.Color(0x87CEEB)
  scene.background = skyColor

  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
  camera.position.set(0, 5, 15)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  container.value.appendChild(renderer.domElement)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
  directionalLight.position.set(10, 20, 10)
  scene.add(directionalLight)

  const waterGeometry = new THREE.PlaneGeometry(40, 40, 256, 256)
  waterGeometry.rotateX(-Math.PI / 2)

  const waterMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uAmplitude: { value: props.amplitude },
      uSpeed: { value: props.speed },
      uTransparency: { value: props.transparency },
      uWaterColor: { value: new THREE.Color(0x006994) },
      uDeepColor: { value: new THREE.Color(0x001a33) },
      uFoamColor: { value: new THREE.Color(0xffffff) },
      uSkyColor: { value: skyColor }
    },
    transparent: true,
    side: THREE.DoubleSide
  })

  water = new THREE.Mesh(waterGeometry, waterMaterial)
  scene.add(water)

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
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition).y;
        gl_FragColor = vec4(mix(vec3(0.4, 0.6, 0.8), vec3(0.8, 0.9, 1.0), max(h, 0.0)), 1.0);
      }
    `,
    side: THREE.BackSide
  })
  const sky = new THREE.Mesh(skyGeometry, skyMaterial)
  scene.add(sky)

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    time += 0.016
    
    if (water && water.material.uniforms) {
      water.material.uniforms.uTime.value = time
    }

    const cameraAngle = time * 0.05
    camera.position.x = Math.sin(cameraAngle) * 15
    camera.position.z = Math.cos(cameraAngle) * 15
    camera.position.y = 5 + Math.sin(time * 0.1) * 2
    camera.lookAt(0, 0, 0)

    renderer.render(scene, camera)
  }

  animate()

  const handleResize = () => {
    if (!container.value) return
    const width = container.value.clientWidth
    const height = container.value.clientHeight
    
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  window.addEventListener('resize', handleResize)
}

const updateUniforms = () => {
  if (water && water.material.uniforms) {
    water.material.uniforms.uAmplitude.value = props.amplitude
    water.material.uniforms.uSpeed.value = props.speed
    water.material.uniforms.uTransparency.value = props.transparency
  }
}

watch([() => props.amplitude, () => props.speed, () => props.transparency], updateUniforms)

onMounted(() => {
  init()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (renderer) {
    renderer.dispose()
    if (container.value && renderer.domElement) {
      container.value.removeChild(renderer.domElement)
    }
  }
})
</script>

<style scoped>
</style>
