"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"
import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as THREE from "three"

interface BikeModelProps {
  modelPath: string
  position: [number, number, number]
  targetX: number
  onPositionUpdate?: (x: number) => void
}

function BikeModel({ modelPath, position, targetX, onPositionUpdate }: BikeModelProps) {
  const meshRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(modelPath)

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Continuous rotation for all bikes
      meshRef.current.rotation.y += delta * 0.5

      // Smooth position interpolation
      const currentX = meshRef.current.position.x
      const newX = THREE.MathUtils.lerp(currentX, targetX, 0.12)
      meshRef.current.position.x = newX

      // Notify parent of position updates
      onPositionUpdate?.(newX)
    }
  })

  return (
    <group ref={meshRef} position={position}>
      <primitive object={scene.clone()} scale={[2, 2, 2]} />
    </group>
  )
}

interface BikeData {
  id: string
  modelPath: string
  initialX: number
  targetX: number
}

export function ProductCarousel3D() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [activeBikes, setActiveBikes] = useState<BikeData[]>([])

  const bikes = [
    { path: "/bike1.glb", name: "Bike 1" },
    { path: "/bike2.glb", name: "Bike 2" },
    { path: "/bike3.glb", name: "Bike 3" },
  ]

  // Initialize with first bike
  useEffect(() => {
    setActiveBikes([
      {
        id: `bike-${currentIndex}-${Date.now()}`,
        modelPath: bikes[currentIndex].path,
        initialX: 0,
        targetX: 0,
      },
    ])
  }, [])

  // Auto-advance every 12 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        handleNext()
      }
    }, 12000)

    return () => clearInterval(interval)
  }, [currentIndex, isTransitioning])

  const handleNext = () => {
    if (isTransitioning) return

    const nextIndex = (currentIndex + 1) % bikes.length
    startTransition(nextIndex, "next")
  }

  const handlePrevious = () => {
    if (isTransitioning) return

    const prevIndex = (currentIndex - 1 + bikes.length) % bikes.length
    startTransition(prevIndex, "prev")
  }

  const startTransition = (newIndex: number, direction: "next" | "prev") => {
    setIsTransitioning(true)

    const exitDirection = direction === "next" ? 10 : -10
    const enterDirection = direction === "next" ? -10 : 10

    // Update existing bike to exit
    setActiveBikes((prev) =>
      prev.map((bike) => ({
        ...bike,
        targetX: exitDirection,
      })),
    )

    // Add new bike entering from opposite side
    const newBike: BikeData = {
      id: `bike-${newIndex}-${Date.now()}`,
      modelPath: bikes[newIndex].path,
      initialX: enterDirection,
      targetX: 0,
    }

    setActiveBikes((prev) => [...prev, newBike])
    setCurrentIndex(newIndex)

    // Clean up after transition
    setTimeout(() => {
      setActiveBikes([newBike])
      setIsTransitioning(false)
    }, 2000)
  }

  const handlePositionUpdate = (bikeId: string, x: number) => {
    // Remove bikes that have moved far off-screen
    if (Math.abs(x) > 12) {
      setActiveBikes((prev) => prev.filter((bike) => bike.id !== bikeId))
    }
  }

  return (
    <div className="relative w-full h-[600px]">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }} className="w-full h-full">
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} />

        {activeBikes.map((bike) => (
          <BikeModel
            key={bike.id}
            modelPath={bike.modelPath}
            position={[bike.initialX, 0, 0]}
            targetX={bike.targetX}
            onPositionUpdate={(x) => handlePositionUpdate(bike.id, x)}
          />
        ))}

        <Environment preset="sunset" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Navigation Controls */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70 z-10"
        onClick={handlePrevious}
        disabled={isTransitioning}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70 z-10"
        onClick={handleNext}
        disabled={isTransitioning}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Progress Indicators */}
      
    </div>
  )
}
