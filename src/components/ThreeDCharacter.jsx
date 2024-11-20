// components/ThreeDCharacter.js

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

const Character = ({ position }) => {
  const { scene } = useGLTF('/models/character.glb');
  return <primitive object={scene} position={position} />;
};

const Ground = ({ onClick }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} onClick={onClick} receiveShadow>
      <planeBufferGeometry args={[100, 100]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

const ThreeDCharacter = () => {
  const [position, setPosition] = React.useState([0, 0, 0]);

  const handleGroundClick = event => {
    const point = event.point;
    setPosition([point.x, 0, point.z]);
  };

  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Character position={position} />
      <Ground onClick={handleGroundClick} />
    </Canvas>
  );
};

export default ThreeDCharacter;
