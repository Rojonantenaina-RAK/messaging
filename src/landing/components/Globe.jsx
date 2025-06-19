import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function GlobeModel() {
  const gltf = useGLTF('/roboter_cute.glb') // mets le bon chemin
  return <primitive object={gltf.scene} scale={1.5} />
}

export default function Globe3D() {
  return (
    <Canvas style={{ height: '500px' }}>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 5, 5]} />
      <Suspense fallback={null}>
        <GlobeModel />
        <OrbitControls enableZoom={false} />
      </Suspense>
    </Canvas>
  )
}