import { Canvas, useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh, MeshStandardMaterial, PerspectiveCamera } from 'three';

function Box() {
  const boxRef = useRef<Mesh>(null!);

  useFrame(() => {
    boxRef.current.rotation.x += 0.005;
    boxRef.current.rotation.y += 0.01;
  })
  
  return (
    <mesh ref={boxRef} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="crimson" />
      <MeshReflectorMaterial 
        envMapIntensity={0}
        dithering={true}
        color={[0.7, 0.015, 0.015]}
        roughness={0.7}
        blur={[1000, 400]}
        mixBlur={30}
        mixStrength={80}
        mixContrast={1}
        resolution={1024}
        mirror={0} 
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        // debug={0}
        reflectorOffset={0.2}
      />
    </mesh>
  )
}

function Ground() {
  return (
    <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial 
        envMapIntensity={0}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={0.7}
        blur={[1000, 400]}
        mixBlur={30}
        mixStrength={80}
        mixContrast={1}
        resolution={1024}
        mirror={0} 
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        // debug={0}
        reflectorOffset={0.2}
      />
    </mesh>
  )
}

function ThreeScene() {
  return (
    <Canvas shadows>
      {/* <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} /> */}

      <color args={[0, 0, 0]} attach='background' />
      
      <spotLight 
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        castShadow
        shadow-bias={-0.0001}
      />
      <ambientLight intensity={0.5} />
      <directionalLight
        color="white"
        intensity={1}
        position={[0, 10, 0]}
        castShadow
      />
      <Ground />
      <Box /> 
      
    </Canvas>
  )
}


function App() {

  return (
    <div className="App">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row justify-between items-center bg-[crimson] px-12 py-4">
          <a href="#">
            <h1 className="text-white font-bold text-center text-3xl">TUPAN - DEMO</h1>
          </a>
          <ul className="flex gap-12 text-white font-bold uppercase">
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
            <li><a href="#">Link 3</a></li>
          </ul>
        </div>

        {/* hero */}
        <div className="h-screen"><ThreeScene /></div>
      </div>
    </div>
  )
}

export default App
