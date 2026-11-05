import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshReflectorMaterial, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import type { Wine } from '../content'

/**
 * 3D bottle showcase. Each bottle is a transparent cut-out on a plane that
 * floats gently above a dark reflective floor. The selected bottle moves to
 * the front and the whole group tilts toward the pointer.
 */

function Bottle({ wine, index, total, selected, onSelect }: { wine: Wine; index: number; total: number; selected: boolean; onSelect: () => void }) {
  const tex = useTexture(wine.image)
  const mesh = useRef<THREE.Mesh>(null)
  const img = tex.image as { width: number; height: number } | undefined
  const aspect = img ? img.width / img.height : 0.3
  const h = 3.2
  const w = h * aspect
  const spread = 1.35
  const baseX = (index - (total - 1) / 2) * spread
  const target = useRef(new THREE.Vector3(baseX, 0, 0))

  useFrame((_, dt) => {
    if (!mesh.current) return
    target.current.set(baseX * (selected ? 1.05 : 1), selected ? 0.12 : -0.05, selected ? 0.9 : 0)
    mesh.current.position.lerp(target.current, 1 - Math.pow(0.001, dt))
    const s = selected ? 1.08 : 0.92
    mesh.current.scale.lerp(new THREE.Vector3(s, s, s), 1 - Math.pow(0.001, dt))
    const mat = mesh.current.material as THREE.MeshStandardMaterial
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, selected ? 1 : 0.72, 1 - Math.pow(0.001, dt))
  })

  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.25} floatingRange={[-0.06, 0.06]}>
      <mesh
        ref={mesh}
        position={[baseX, -0.05, 0]}
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = '')}
      >
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial map={tex} transparent opacity={0.72} roughness={0.35} metalness={0.1} alphaTest={0.02} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  )
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)
  useFrame((state, dt) => {
    if (!group.current) return
    const rx = -state.pointer.y * 0.06
    const ry = state.pointer.x * 0.22
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, rx, 3, dt)
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, ry, 3, dt)
    // keep all five bottles in frame on narrow viewports
    const s = THREE.MathUtils.clamp(state.viewport.aspect / 1.6, 0.52, 1)
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, s, 4, dt))
  })
  return <group ref={group}>{children}</group>
}

function Floor() {
  const { size } = useThree()
  const res = size.width < 700 ? 512 : 1024
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.72, 0]}>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        blur={[400, 120]}
        resolution={res}
        mixBlur={1}
        mixStrength={18}
        roughness={0.9}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#0a0708"
        metalness={0.4}
        mirror={0.6}
      />
    </mesh>
  )
}

export function BottleScene({ wines, selected, onSelect }: { wines: Wine[]; selected: string; onSelect: (id: string) => void }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.3, 7.2], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
      onPointerMissed={() => undefined}
    >
      <ambientLight intensity={1.1} />
      <spotLight position={[4, 6, 6]} intensity={40} angle={0.5} penumbra={1} color="#f6ebd8" />
      <pointLight position={[-5, 2, 3]} intensity={12} color="#bc995d" />
      <Suspense fallback={null}>
        <Rig>
          {wines.map((w, i) => (
            <Bottle key={w.id} wine={w} index={i} total={wines.length} selected={w.id === selected} onSelect={() => onSelect(w.id)} />
          ))}
          <Floor />
        </Rig>
      </Suspense>
      <fog attach="fog" args={['#060709', 9, 16]} />
    </Canvas>
  )
}
