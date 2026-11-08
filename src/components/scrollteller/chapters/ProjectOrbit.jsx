'use client';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, RoundedBox, Float } from '@react-three/drei';
import { MathUtils } from 'three';

function Screen({ work, offset, selected, onSelect }) {
 const ref=useRef();
 useFrame((_,dt)=>{
  const angle=offset*0.76;
  const target=[Math.sin(angle)*4.9,Math.abs(offset)*.24,Math.cos(angle)*2.4-2.4];
  ref.current.position.x=MathUtils.damp(ref.current.position.x,target[0],5,dt);
  ref.current.position.y=MathUtils.damp(ref.current.position.y,target[1],5,dt);
  ref.current.position.z=MathUtils.damp(ref.current.position.z,target[2],5,dt);
  ref.current.rotation.y=MathUtils.damp(ref.current.rotation.y,-angle*.65,5,dt);
 });
 return <group ref={ref} onClick={onSelect}>
  <Float speed={1.2} rotationIntensity={selected?.025:.06} floatIntensity={.12}>
   <RoundedBox args={[4.5,3.05,.13]} radius={.09} smoothness={4}><meshStandardMaterial color={selected?'#a5bed6':'#44546a'} metalness={.8} roughness={.25}/></RoundedBox>
   <Image url={work.image} position={[0,0,.075]} scale={[4.32,2.86]} transparent radius={.035} toneMapped={false}/>
   <mesh position={[0,-1.45,.09]}><boxGeometry args={[.65,.018,.02]}/><meshBasicMaterial color="#91c8ff"/></mesh>
  </Float>
 </group>;
}
export default function ProjectOrbit({works,active,onSelect}){
 return <Canvas dpr={[1,1.5]} camera={{position:[0,1,10.5],fov:44}} gl={{alpha:true,antialias:true,powerPreference:'low-power'}}>
  <ambientLight intensity={1.5}/><directionalLight position={[4,6,5]} intensity={4}/><pointLight position={[-5,2,3]} color="#8bbcff" intensity={20}/>
  <Suspense fallback={null}><group rotation={[-.08,0,-.025]}>
   {works.map((w,i)=>{let offset=i-active;if(offset>2)offset-=works.length;if(offset< -2)offset+=works.length;return <Screen key={w.slug} work={w} offset={offset} selected={i===active} onSelect={()=>onSelect(i)}/>;})}
  </group></Suspense>
  <mesh rotation={[-Math.PI/2,0,0]} position={[0,-2,-1]}><ringGeometry args={[4.8,4.82,128]}/><meshBasicMaterial color="#6c829c" transparent opacity={.45}/></mesh>
 </Canvas>;
}
