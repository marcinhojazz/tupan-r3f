import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react';
import { Mesh } from 'three';
import { AmbientLight, DirectionalLight  } from 'three'

function Box() {
  const boxRef = useRef<Mesh>(null!);

  useFrame(() => {
    boxRef.current.rotation.x += 0.005;
    boxRef.current.rotation.y += 0.01;
  })
  
  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

function ThreeScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight
        color="white"
        intensity={1}
        position={[0, 10, 0]}
        castShadow
      />
      <Box /> 
    </Canvas>
  )
}

function App() {

  return (
    <div className="App">
      <div className="w-full">
        <div className="flex justify-between items-center bg-[crimson] px-12">
          <a href="#">
            <h1 className="text-white font-bold text-center p-4 text-3xl">TUPAN - DEMO</h1>
          </a>
          <ul className="flex gap-12 text-white font-bold uppercase">
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
            <li><a href="#">Link 3</a></li>
          </ul>
        </div>

        {/* hero */}
        <div className="border h-screen"><ThreeScene /></div>
      </div>
    </div>
  )
}

export default App
