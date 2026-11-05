import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * "Rutherford Dust": a GPU particle field of fine gold motes drifting in
 * slow convection, with gentle mouse parallax. Rendered with additive blending
 * over the hero photograph.
 */

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  attribute float aScale;
  attribute float aSpeed;
  attribute float aOffset;
  varying float vAlpha;
  varying float vTint;

  // simple 3d hash noise for drift
  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  void main() {
    vec3 p = position;
    float t = uTime * aSpeed;
    p.y += sin(t * 0.35 + aOffset) * 0.6 + mod(t * 0.08 + aOffset, 7.0) - 3.5;
    p.x += cos(t * 0.27 + aOffset * 1.7) * 0.5;
    p.z += sin(t * 0.21 + aOffset * 0.9) * 0.4;

    // parallax: deeper particles move less
    float depth = (p.z + 6.0) / 12.0;
    p.xy += uMouse * depth * 0.9;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aScale * uPixelRatio * (28.0 / -mv.z);
    vAlpha = smoothstep(-9.0, -2.0, mv.z) * (0.35 + 0.65 * hash(aOffset));
    vTint = hash(aOffset * 3.1);
  }
`

const fragment = /* glsl */ `
  varying float vAlpha;
  varying float vTint;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float core = smoothstep(0.5, 0.0, d);
    float glow = pow(core, 2.6);
    vec3 gold = vec3(0.737, 0.6, 0.365);
    vec3 cream = vec3(0.965, 0.92, 0.847);
    vec3 col = mix(gold, cream, vTint * 0.6);
    gl_FragColor = vec4(col, glow * vAlpha * 0.9);
  }
`

function Dust({ count = 2600 }: { count?: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const mouse = useRef(new THREE.Vector2(0, 0))
  const target = useRef(new THREE.Vector2(0, 0))
  const { gl } = useThree()

  const { positions, scales, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const speeds = new Float32Array(count)
    const offsets = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12
      const r = Math.random()
      scales[i] = r < 0.9 ? 0.6 + Math.random() * 1.4 : 2.4 + Math.random() * 3.2
      speeds[i] = 0.4 + Math.random() * 0.9
      offsets[i] = Math.random() * 100
    }
    return { positions, scales, speeds, offsets }
  }, [count])

  useFrame((state, delta) => {
    if (!mat.current) return
    mat.current.uniforms.uTime.value += delta
    target.current.set(state.pointer.x, state.pointer.y)
    mouse.current.lerp(target.current, 0.04)
    mat.current.uniforms.uMouse.value.copy(mouse.current)
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
        <bufferAttribute attach="attributes-aOffset" args={[offsets, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
          uMouse: { value: new THREE.Vector2() },
        }}
      />
    </points>
  )
}

export function DustScene({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Dust />
      </Canvas>
    </div>
  )
}
