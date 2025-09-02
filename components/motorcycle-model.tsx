"use client"
import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"
import gsap from "gsap"

export function Motorcycle(props: any) {
  const groupRef = useRef<THREE.Group>(null)

  // Individual part refs for animation
  const frameRef = useRef<THREE.Mesh>(null)
  const frontWheelRef = useRef<THREE.Mesh>(null)
  const rearWheelRef = useRef<THREE.Mesh>(null)
  const fuelTankRef = useRef<THREE.Mesh>(null)
  const seatRef = useRef<THREE.Mesh>(null)
  const handlebarsRef = useRef<THREE.Mesh>(null)
  const exhaustRef = useRef<THREE.Mesh>(null)
  const fenderRef = useRef<THREE.Mesh>(null)
  const forksRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (!groupRef.current) return

    const parts = [
      frameRef.current,
      frontWheelRef.current,
      rearWheelRef.current,
      fuelTankRef.current,
      seatRef.current,
      handlebarsRef.current,
      exhaustRef.current,
      fenderRef.current,
      forksRef.current,
    ].filter(Boolean)

    // Set initial exploded positions
    gsap.set(parts, { visible: false })

    if (frameRef.current) gsap.set(frameRef.current.position, { y: 0 })
    if (frontWheelRef.current) gsap.set(frontWheelRef.current.position, { x: 2, z: 1.2 })
    if (rearWheelRef.current) gsap.set(rearWheelRef.current.position, { x: -2, z: -1.2 })
    if (fuelTankRef.current) gsap.set(fuelTankRef.current.position, { y: 1.5 })
    if (seatRef.current) gsap.set(seatRef.current.position, { y: 1.2, x: -0.5 })
    if (handlebarsRef.current) gsap.set(handlebarsRef.current.position, { y: 1.8, x: 0.8 })
    if (exhaustRef.current) gsap.set(exhaustRef.current.position, { x: -1.5, y: -0.8 })
    if (fenderRef.current) gsap.set(fenderRef.current.position, { x: 1.2, y: 0.8 })
    if (forksRef.current) gsap.set(forksRef.current.position, { x: 1.5, y: 0.5 })

    const tl = gsap.timeline()

    // Animate parts assembling
    tl.to(frameRef.current, { visible: true, duration: 0.1 }, "start")
      .to(frameRef.current?.position || {}, { y: 0, duration: 0.6, ease: "power2.out" }, "start")

      .to(rearWheelRef.current, { visible: true, duration: 0.1 }, "+=0.2")
      .to(rearWheelRef.current?.position || {}, { x: 0, z: -1.2, duration: 0.8, ease: "back.out(1.7)" }, "-=0.1")

      .to(frontWheelRef.current, { visible: true, duration: 0.1 }, "+=0.1")
      .to(frontWheelRef.current?.position || {}, { x: 0, z: 1.2, duration: 0.8, ease: "back.out(1.7)" }, "-=0.1")

      .to(forksRef.current, { visible: true, duration: 0.1 }, "+=0.1")
      .to(forksRef.current?.position || {}, { x: 0, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.1")

      .to(exhaustRef.current, { visible: true, duration: 0.1 }, "+=0.1")
      .to(exhaustRef.current?.position || {}, { x: -0.8, y: -0.3, duration: 0.6, ease: "power2.out" }, "-=0.1")

      .to(fuelTankRef.current, { visible: true, duration: 0.1 }, "+=0.1")
      .to(fuelTankRef.current?.position || {}, { y: 0.3, duration: 0.8, ease: "bounce.out" }, "-=0.1")

      .to(seatRef.current, { visible: true, duration: 0.1 }, "+=0.1")
      .to(seatRef.current?.position || {}, { y: 0.4, x: -0.5, duration: 0.7, ease: "bounce.out" }, "-=0.1")

      .to(handlebarsRef.current, { visible: true, duration: 0.1 }, "+=0.1")
      .to(handlebarsRef.current?.position || {}, { y: 0.8, x: 0.8, duration: 0.6, ease: "power2.out" }, "-=0.1")

      .to(fenderRef.current, { visible: true, duration: 0.1 }, "+=0.1")
      .to(fenderRef.current?.position || {}, { x: 0.8, y: 0.2, duration: 0.5, ease: "power2.out" }, "-=0.1")
  }, [])

  // Rotate wheels
  useFrame((state, delta) => {
    if (frontWheelRef.current) {
      frontWheelRef.current.rotation.x += delta * 0.5
    }
    if (rearWheelRef.current) {
      rearWheelRef.current.rotation.x += delta * 0.5
    }
  })

  return (
    <group ref={groupRef} {...props}>
      {/* Frame */}
      <mesh ref={frameRef} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.1, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Additional frame parts */}
      <mesh position={[0.5, -0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.1, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      <mesh position={[-0.5, -0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.1, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Front Wheel */}
      <mesh ref={frontWheelRef} position={[0, 0, 1.2]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Front wheel rim */}
      <mesh position={[0, 0, 1.2]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.25, 16]} />
        <meshStandardMaterial color="#c0c0c0" />
      </mesh>

      {/* Rear Wheel */}
      <mesh ref={rearWheelRef} position={[0, 0, -1.2]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Rear wheel rim */}
      <mesh position={[0, 0, -1.2]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.25, 16]} />
        <meshStandardMaterial color="#c0c0c0" />
      </mesh>

      {/* Fuel Tank */}
      <mesh ref={fuelTankRef} position={[0.2, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.4, 0.6]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>

      {/* Seat */}
      <mesh ref={seatRef} position={[-0.5, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.1, 0.4]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Handlebars */}
      <mesh ref={handlebarsRef} position={[0.8, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.1, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Handlebar grips */}
      <mesh position={[0.8, 0.8, 0.4]} castShadow receiveShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.15, 8]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0.8, 0.8, -0.4]} castShadow receiveShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.15, 8]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Front Forks */}
      <mesh ref={forksRef} position={[0.8, 0, 1.2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
        <meshStandardMaterial color="#c0c0c0" />
      </mesh>
      <mesh position={[0.8, 0, 1.0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
        <meshStandardMaterial color="#c0c0c0" />
      </mesh>

      {/* Exhaust */}
      <mesh ref={exhaustRef} position={[-0.8, -0.3, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.06, 1.2, 8]} />
        <meshStandardMaterial color="#c0c0c0" />
      </mesh>

      {/* Front Fender */}
      <mesh ref={fenderRef} position={[0.8, 0.2, 1.2]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.05, 0.6]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>

      {/* Engine block */}
      <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.5, 0.4]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </group>
  )
}
