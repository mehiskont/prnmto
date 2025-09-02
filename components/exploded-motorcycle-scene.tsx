"use client"

import * as React from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { Motorcycle } from "./motorcycle-model"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function ExplodedMotorcycleScene() {
  const [animationKey, setAnimationKey] = React.useState(0)

  const handleReplay = () => {
    setAnimationKey((prevKey) => prevKey + 1)
  }

  return (
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [5, 2, 8], fov: 50 }} shadows>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <React.Suspense fallback={null}>
          <Motorcycle key={animationKey} />
          <Environment preset="city" />
        </React.Suspense>
        <OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
      <div className="absolute bottom-4 right-4 z-10">
        <Button onClick={handleReplay} size="icon" aria-label="Replay Animation">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
