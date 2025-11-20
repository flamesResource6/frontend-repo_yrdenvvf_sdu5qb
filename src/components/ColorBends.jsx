import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ColorBends.css';

// Helper to parse hex colors to linear RGB
function hexToLinearRGB(hex) {
  const c = new THREE.Color(hex);
  // convert sRGB to linear
  return new THREE.Vector3(c.convertSRGBToLinear().r, c.g, c.b);
}

const MAX_COLORS = 8;

const defaultPalette = ['#ff5c7a', '#8a5cff', '#00ffd1'];

// Vertex shader: screen-aligned plane with optional parallax from pointer
const vertexShader = /* glsl */`
  varying vec2 vUv;
  uniform vec2 uParallax;
  void main() {
    vUv = uv;
    vec3 pos = position;
    // Apply subtle parallax by offsetting the plane in XY based on mouse
    pos.x += uParallax.x;
    pos.y += uParallax.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment shader: recreates flowing, warped neon ribbons with grain noise
const fragmentShader = /* glsl */`
  precision highp float;
  varying vec2 vUv;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uScale;
  uniform float uFrequency;
  uniform float uWarpStrength;
  uniform float uNoise;
  uniform vec2 uPointer;          // pointer in NDC [-1,1]
  uniform float uMouseInfluence;   // 0-1
  uniform float uParallaxAmt;      // 0-1
  uniform float uRotation;         // radians
  uniform bool uTransparent;
  uniform int uColorCount;
  uniform vec3 uColors[${MAX_COLORS}];

  // Hash + noise utilities
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }

  // Simple value noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // Rotates a 2D vector by angle
  mat2 rot(float a){
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
  }

  // Palette sampling across multiple colors. Input x in [0,1]
  vec3 samplePalette(float x) {
    if (uColorCount <= 0) return vec3(0.0);
    float seg = 1.0 / float(uColorCount);
    float fIndex = clamp(floor(x / seg), 0.0, float(uColorCount - 1));
    int iIndex = int(fIndex);
    int next = int(min(float(uColorCount - 1), fIndex + 1.0));
    float localT = fract(x / seg);
    vec3 c1 = uColors[iIndex];
    vec3 c2 = uColors[next];
    return mix(c1, c2, smoothstep(0.0, 1.0, localT));
  }

  void main() {
    // Normalize coordinates and rotate to get diagonal orientation
    vec2 uv = vUv * 2.0 - 1.0; // [-1,1]

    // Maintain aspect
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;

    // Rotate space
    uv = rot(uRotation) * uv;

    // Pointer influence (attraction/warp towards pointer)
    vec2 p = uPointer; // [-1,1]
    p.x *= aspect;
    vec2 diff = uv - p;
    float dist = max(0.001, length(diff));

    // Base field combining sin stripes + fbm-like warp
    float t = uTime * uSpeed;

    // multi sine bands
    float base = sin(uv.x * uFrequency * 3.14159 + t);
    base += 0.5 * sin((uv.x * 0.5 + uv.y) * uFrequency * 1.3 + t * 0.7);
    base += 0.25 * sin((uv.x - uv.y) * uFrequency * 2.3 - t * 1.1);

    // Warp using noise fields
    vec2 nUv = uv * (1.5 * uScale);
    float n1 = noise(nUv + t * 0.25);
    float n2 = noise(nUv * 1.7 - t * 0.15);
    float warp = (n1 * 0.7 + n2 * 0.3);

    // Pointer warp pulls bands towards pointer
    float pointerWarp = exp(-dist * 1.5) * uMouseInfluence;
    float dirSign = sign(diff.x + diff.y);
    base += (warp - 0.5) * uWarpStrength + pointerWarp * dirSign;

    // Map base to [0,1]
    float x = 0.5 + 0.5 * sin(base);

    // Sample neon palette
    vec3 col = samplePalette(x);

    // Enhance ribbons by applying band contrast
    float bandSharp = 0.7 + 0.3 * sin(uv.y * 2.0 + t * 0.6);
    col = pow(col, vec3(0.9));
    col = mix(col * 0.6, col * 1.2, bandSharp);

    // Add subtle grain
    float g = noise(uv * uResolution.y * 0.5 + t * 10.0);
    col += (g - 0.5) * uNoise;

    // Vignette for premium feel
    float vign = smoothstep(1.4, 0.2, length(uv));
    col *= vign;

    // Apply parallax darkening relative to pointer
    float par = clamp(1.0 - uParallaxAmt * dist * 0.2, 0.6, 1.0);
    col *= par;

    // Output
    if (uTransparent) {
      gl_FragColor = vec4(col, 0.0 + 1.0 - clamp(uNoise * 6.0, 0.0, 0.35));
      // Keep subtle alpha to let underlying dark base show through
      gl_FragColor.a = 0.85;
    } else {
      gl_FragColor = vec4(col, 1.0);
    }
  }
`;

export default function ColorBends({
  className,
  style,
  colors = defaultPalette,
  rotation = 30,
  speed = 0.3,
  transparent = false,
  autoRotate = 0,
  scale = 1.2,
  frequency = 1.4,
  warpStrength = 1.2,
  mouseInfluence = 0.8,
  parallax = 0.6,
  noise = 0.08,
}) {
  const containerRef = useRef(null);
  const rafRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const rotationRef = useRef((rotation * Math.PI) / 180);
  const startTimeRef = useRef(performance.now());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: transparent });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    // Scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Geometry: full-screen quad
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Prepare uniforms
    const colorVecs = new Array(Math.min(colors.length, MAX_COLORS))
      .fill(0)
      .map((_, i) => hexToLinearRGB(colors[i]));
    while (colorVecs.length < MAX_COLORS) colorVecs.push(new THREE.Vector3(0, 0, 0));

    const uniforms = {
      uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uScale: { value: scale },
      uFrequency: { value: frequency },
      uWarpStrength: { value: warpStrength },
      uNoise: { value: noise },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uMouseInfluence: { value: mouseInfluence },
      uParallaxAmt: { value: parallax },
      uRotation: { value: rotationRef.current },
      uTransparent: { value: transparent },
      uColorCount: { value: Math.min(colors.length, MAX_COLORS) },
      uColors: { value: colorVecs },
      uParallax: { value: new THREE.Vector2(0, 0) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: transparent,
      depthTest: false,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Resize handling
    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h, false);
      uniforms.uResolution.value.set(w, h);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Pointer handling
    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointerRef.current.tx = x;
      pointerRef.current.ty = y;
    };
    container.addEventListener('pointermove', onPointerMove);

    const onLeave = () => {
      pointerRef.current.tx = 0;
      pointerRef.current.ty = 0;
    };
    container.addEventListener('pointerleave', onLeave);

    // Animation loop
    const animate = () => {
      const now = performance.now();
      const t = (now - startTimeRef.current) / 1000;
      uniforms.uTime.value = t;

      // Smooth pointer interpolation
      const lerp = (a, b, f) => a + (b - a) * f;
      const sm = 0.12; // smoothing factor
      pointerRef.current.x = lerp(pointerRef.current.x, pointerRef.current.tx, sm);
      pointerRef.current.y = lerp(pointerRef.current.y, pointerRef.current.ty, sm);
      uniforms.uPointer.value.set(pointerRef.current.x, pointerRef.current.y);

      // Parallax offset for vertex shader (slight camera-like movement)
      const par = 0.05 * parallax;
      uniforms.uParallax.value.set(-pointerRef.current.x * par, -pointerRef.current.y * par);

      // Auto rotate
      if (autoRotate !== 0) {
        rotationRef.current += (autoRotate * Math.PI / 180) * (1 / 60);
        uniforms.uRotation.value = rotationRef.current;
      }

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [transparent, colors, speed, scale, frequency, warpStrength, mouseInfluence, parallax, autoRotate]);

  // Keep rotation prop in sync
  useEffect(() => {
    rotationRef.current = (rotation * Math.PI) / 180;
  }, [rotation]);

  return (
    <div
      ref={containerRef}
      className={`color-bends-container ${className ?? ''}`}
      style={style}
    />
  );
}
