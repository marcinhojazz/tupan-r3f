import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import { LinearEncoding, Mesh, MeshStandardMaterial, PerspectiveCamera, RepeatWrapping, TextureLoader, Vector3 } from 'three';
import { Ground } from './components/Ground';

function Box() {
  const boxRef = useRef<Mesh>(null!);
  const [scale, setScale] = useState<Vector3>(new Vector3(1, 1, 1));
  const [color, setColor] = useState<string>('crimson');

  useFrame(() => {
    boxRef.current.rotation.x += 0.005;
    boxRef.current.rotation.y += 0.01;
    boxRef.current.scale.set(scale.x, scale.y, scale.z);
  })

  const handleClick = () => {
    setScale(new Vector3(2, 2, 2));
    setTimeout(() => {
      setScale(new Vector3(1, 1, 1));
      setColor(getRandomColor());
    }, 1000);
  };

  const [roughness, normal] = useLoader(TextureLoader, [
    'textures/terrain-normal.jpg',
    'textures/terrain-roughness.jpg',
  ]);
  
  useEffect(() => {
    [normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
      t.offset.set(0, 0);
    });
    normal.encoding = LinearEncoding;
  }, [normal, roughness]);
  
  useFrame((state, delta) => {
    let t = -state.clock.getElapsedTime() * 0.128;
    roughness.offset.set(0, t % 1);
    normal.offset.set(0, t % 1);
  });

  useFrame(() => {
    boxRef.current.rotation.x += 0.008;
    boxRef.current.rotation.y += 0.01;
  })
  
  return (
    <mesh ref={boxRef} castShadow receiveShadow  onClick={handleClick}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={color} />
      <MeshReflectorMaterial 
        normalMap={normal}
        // normalScale={0.15}
        roughnessMap={roughness}
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

function getRandomColor() {
  const colors = ['crimson', 'red', 'green', 'pink', 'fuchsia'];
  return colors[Math.floor(Math.random() * colors.length)];
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
        angle={2.6}
        penumbra={0.2}
        castShadow
        position={[0, 10, 2]}
        shadow-bias={-0.0001}
      />
      <ambientLight intensity={0.5} />
      <directionalLight
        color="white"
        intensity={2.5}
        position={[0, 10, 0]}
        castShadow
      />
      <Suspense fallback>
        <Box /> 
      </Suspense>
      
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
