<template>
  <div ref="container" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const props = defineProps({
  scale: {
    type: Number,
    default: 50,
  },
  density: {
    type: Number,
    default: 10000,
  },
  colorScheme: {
    type: String,
    default: "cosmic",
  },
  rotationSpeed: {
    type: Number,
    default: 0.5,
  },
});

const container = ref(null);
let scene, camera, renderer, controls, galaxy, animationId;
let starParticles, dustParticles;
let time = 0;

const colorSchemes = {
  cosmic: {
    center: [0x667eea, 0x764ba2, 0x8e2de2],
    inner: [0xf093fb, 0xf5576c, 0xff6b6b],
    middle: [0x4facfe, 0x00f2fe, 0x48c6ef],
    outer: [0x96fbc4, 0xf9f586, 0xffecd2],
  },
  fire: {
    center: [0xff416c, 0xff4b2b, 0xfb5652],
    inner: [0xff8c00, 0xffa500, 0xffd700],
    middle: [0xff6347, 0xff7f50, 0xfa8072],
    outer: [0xffc0cb, 0xffb6c1, 0xffcdd2],
  },
  ice: {
    center: [0x00c6ff, 0x0072ff, 0x0052d4],
    inner: [0x89f7fe, 0x66a6ff, 0x74ebd5],
    middle: [0xc471f3, 0x622774, 0x8e2de2],
    outer: [0xe0c3fc, 0xf5f7fa, 0xf0f2f5],
  },
  emerald: {
    center: [0x11998e, 0x38ef7d, 0x00b894],
    inner: [0x00b09b, 0x96c93d, 0x7bed9f],
    middle: [0x56ab2f, 0xa8e063, 0x70e1f5],
    outer: [0xd4fc79, 0x78ffd6, 0x43e97b],
  },
  sunset: {
    center: [0xff4e50, 0xf9d423, 0xf857a4],
    inner: [0xf09819, 0xedde0d, 0xffb347],
    middle: [0xff512f, 0xf09819, 0xff9a9e],
    outer: [0xfbc2eb, 0xa6c1ee, 0xffecd2],
  },
};

const getColorFromScheme = (distance, maxDistance, scheme) => {
  const colors = colorSchemes[scheme];
  const ratio = distance / maxDistance;

  if (ratio < 0.1) {
    return colors.center[Math.floor(Math.random() * colors.center.length)];
  } else if (ratio < 0.3) {
    return colors.inner[Math.floor(Math.random() * colors.inner.length)];
  } else if (ratio < 0.6) {
    return colors.middle[Math.floor(Math.random() * colors.middle.length)];
  } else {
    return colors.outer[Math.floor(Math.random() * colors.outer.length)];
  }
};

const generateGalaxy = () => {
  if (starParticles) {
    scene.remove(starParticles);
    starParticles.geometry.dispose();
    starParticles.material.dispose();
  }

  if (dustParticles) {
    scene.remove(dustParticles);
    dustParticles.geometry.dispose();
    dustParticles.material.dispose();
  }

  const starCount = Math.floor(props.density);
  const dustCount = Math.floor(props.density * 0.3);
  const radius = props.scale;

  const starPositions = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);
  const starSizes = new Float32Array(starCount);
  const starSpeeds = new Float32Array(starCount);

  const dustPositions = new Float32Array(dustCount * 3);
  const dustColors = new Float32Array(dustCount * 3);
  const dustSizes = new Float32Array(dustCount);

  const armCount = 4;

  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;

    const armIndex = i % armCount;
    const armAngle = (armIndex / armCount) * Math.PI * 2;

    const distance = Math.random() * radius;
    const spread = (distance / radius) * 0.5 + 0.1;
    const spiralAngle =
      armAngle +
      (distance / radius) * Math.PI * 4 +
      (Math.random() - 0.5) * spread;

    const x =
      Math.cos(spiralAngle) * distance +
      (Math.random() - 0.5) * spread * distance * 0.3;
    const y = (Math.random() - 0.5) * (distance / radius) * 5;
    const z =
      Math.sin(spiralAngle) * distance +
      (Math.random() - 0.5) * spread * distance * 0.3;

    starPositions[i3] = x;
    starPositions[i3 + 1] = y;
    starPositions[i3 + 2] = z;

    const colorValue = getColorFromScheme(distance, radius, props.colorScheme);
    const color = new THREE.Color(colorValue);
    starColors[i3] = color.r;
    starColors[i3 + 1] = color.g;
    starColors[i3 + 2] = color.b;

    starSizes[i] = Math.random() * 2 + 0.5;
    starSpeeds[i] = 0.1 + Math.random() * 0.2;
  }

  for (let i = 0; i < dustCount; i++) {
    const i3 = i * 3;

    const armIndex = i % armCount;
    const armAngle = (armIndex / armCount) * Math.PI * 2;

    const distance = Math.random() * radius * 0.9;
    const spread = (distance / radius) * 0.8 + 0.2;
    const spiralAngle =
      armAngle +
      (distance / radius) * Math.PI * 4 +
      (Math.random() - 0.5) * spread;

    const x =
      Math.cos(spiralAngle) * distance +
      (Math.random() - 0.5) * spread * distance * 0.5;
    const y = (Math.random() - 0.5) * (distance / radius) * 3;
    const z =
      Math.sin(spiralAngle) * distance +
      (Math.random() - 0.5) * spread * distance * 0.5;

    dustPositions[i3] = x;
    dustPositions[i3 + 1] = y;
    dustPositions[i3 + 2] = z;

    const colorValue = getColorFromScheme(distance, radius, props.colorScheme);
    const color = new THREE.Color(colorValue);
    dustColors[i3] = color.r * 0.6;
    dustColors[i3 + 1] = color.g * 0.6;
    dustColors[i3 + 2] = color.b * 0.6;

    dustSizes[i] = Math.random() * 5 + 2;
  }

  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(starPositions, 3),
  );
  starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
  starGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));

  const starMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        
        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
        alpha *= 0.8;
        
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  starParticles = new THREE.Points(starGeometry, starMaterial);
  scene.add(starParticles);

  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(dustPositions, 3),
  );
  dustGeometry.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));
  dustGeometry.setAttribute("size", new THREE.BufferAttribute(dustSizes, 1));

  const dustMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        
        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
        alpha *= 0.3;
        
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  dustParticles = new THREE.Points(dustGeometry, dustMaterial);
  scene.add(dustParticles);

  const coreGeometry = new THREE.SphereGeometry(radius * 0.15, 32, 32);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0x667eea,
    transparent: true,
    opacity: 0.1,
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  scene.add(core);
};

const init = () => {
  if (!container.value) return;

  const width = container.value.clientWidth;
  const height = container.value.clientHeight;

  scene = new THREE.Scene();

  const bgGeometry = new THREE.SphereGeometry(500, 32, 32);
  const bgMaterial = new THREE.MeshBasicMaterial({
    color: 0x0a0a1a,
    side: THREE.BackSide,
  });
  const bg = new THREE.Mesh(bgGeometry, bgMaterial);
  scene.add(bg);

  const bgStarCount = 2000;
  const bgStarPositions = new Float32Array(bgStarCount * 3);
  const bgStarColors = new Float32Array(bgStarCount * 3);
  const bgStarSizes = new Float32Array(bgStarCount);

  for (let i = 0; i < bgStarCount; i++) {
    const i3 = i * 3;
    const radius = 400 + Math.random() * 100;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    bgStarPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    bgStarPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    bgStarPositions[i3 + 2] = radius * Math.cos(phi);

    const brightness = 0.3 + Math.random() * 0.7;
    bgStarColors[i3] = brightness;
    bgStarColors[i3 + 1] = brightness;
    bgStarColors[i3 + 2] = brightness;
    bgStarSizes[i] = Math.random() * 1.5 + 0.3;
  }

  const bgStarGeometry = new THREE.BufferGeometry();
  bgStarGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(bgStarPositions, 3),
  );
  bgStarGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(bgStarColors, 3),
  );
  bgStarGeometry.setAttribute(
    "size",
    new THREE.BufferAttribute(bgStarSizes, 1),
  );

  const bgStarMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const bgStars = new THREE.Points(bgStarGeometry, bgStarMaterial);
  scene.add(bgStars);

  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, props.scale * 0.8, props.scale * 1.5);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.value.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 10;
  controls.maxDistance = props.scale * 5;

  generateGalaxy();

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    time += 0.016;

    if (starParticles) {
      starParticles.rotation.y += 0.0005 * props.rotationSpeed;
    }
    if (dustParticles) {
      dustParticles.rotation.y += 0.0003 * props.rotationSpeed;
    }

    controls.update();
    renderer.render(scene, camera);
  };

  animate();

  const handleResize = () => {
    if (!container.value) return;
    const width = container.value.clientWidth;
    const height = container.value.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  window.addEventListener("resize", handleResize);
};

const updateGalaxy = () => {
  generateGalaxy();
  if (camera) {
    camera.position.set(0, props.scale * 0.8, props.scale * 1.5);
    camera.lookAt(0, 0, 0);
    if (controls) {
      controls.maxDistance = props.scale * 5;
    }
  }
};

watch(
  [() => props.scale, () => props.density, () => props.colorScheme],
  updateGalaxy,
);

onMounted(() => {
  init();
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  if (renderer) {
    renderer.dispose();
    if (container.value && renderer.domElement) {
      container.value.removeChild(renderer.domElement);
    }
  }
  if (controls) {
    controls.dispose();
  }
});
</script>

<style scoped></style>
