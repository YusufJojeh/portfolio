'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

const SpaceBackground = () => {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !mounted) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 50;

    // Unified golden color for all stars
    const starColor = theme === 'dark' ? 0xffc107 : 0xffa000;

    // Stars with smooth connecting lines
    const starFieldGeometry = new THREE.BufferGeometry();
    const starCount = 5000;
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radius = 200;

      starPositions[i3] = (Math.random() - 0.5) * radius;
      starPositions[i3 + 1] = (Math.random() - 0.5) * radius;
      starPositions[i3 + 2] = (Math.random() - 0.5) * radius - 50;

      starSizes[i] = Math.random() * 0.8 + 0.4;
    }

    starFieldGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starFieldGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starFieldMaterial = new THREE.PointsMaterial({
      size: 0.8,
      sizeAttenuation: true,
      color: starColor,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      map: createCircleTexture()
    });

    const starField = new THREE.Points(starFieldGeometry, starFieldMaterial);
    scene.add(starField);

    // Create circular texture for points
    function createCircleTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');

      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.9)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);

      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    }

    // Smooth connecting lines between nearby stars
    const createConnectingLines = () => {
      const lineGeometry = new THREE.BufferGeometry();
      const linePositions = [];
      const maxDistance = 30; // Max distance to connect stars (reduced for cleaner look)

      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        const x1 = starPositions[i3];
        const y1 = starPositions[i3 + 1];
        const z1 = starPositions[i3 + 2];

        // Check only a subset of stars to avoid too many lines (reduced from 50 to 15)
        for (let j = i + 1; j < Math.min(i + 15, starCount); j++) {
          const j3 = j * 3;
          const x2 = starPositions[j3];
          const y2 = starPositions[j3 + 1];
          const z2 = starPositions[j3 + 2];

          const dx = x2 - x1;
          const dy = y2 - y1;
          const dz = z2 - z1;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < maxDistance) {
            linePositions.push(x1, y1, z1);
            linePositions.push(x2, y2, z2);
          }
        }
      }

      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

      const lineMaterial = new THREE.LineBasicMaterial({
        color: starColor,
        transparent: true,
        opacity: 0.10, // Reduced for subtle effect
        blending: THREE.AdditiveBlending
      });

      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lines);
      return lines;
    };

    const connectingLines = createConnectingLines();

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Shooting stars
    const shootingStars = [];
    const createShootingStar = () => {
      const startX = (Math.random() - 0.5) * 100;
      const startY = 50 + Math.random() * 20;
      const startZ = -50 - Math.random() * 50;

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array([
        startX, startY, startZ,
        startX - 8, startY - 8, startZ - 8
      ]);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.LineBasicMaterial({
        color: starColor,
        transparent: true,
        opacity: 1,
        linewidth: 3
      });

      const line = new THREE.Line(geometry, material);
      line.userData = {
        velocity: new THREE.Vector3(
          -Math.random() * 2.5 - 1.5,
          -Math.random() * 2.5 - 1.5,
          -Math.random() * 1.5
        ),
        life: 1,
        maxLife: 50
      };

      scene.add(line);
      shootingStars.push(line);
    };

    const shootingStarInterval = setInterval(() => {
      if (Math.random() > 0.90) {
        createShootingStar();
      }
    }, 1000);

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth camera movement with mouse
      camera.position.x += (mouseX * 10 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 10 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      // Rotate star field and lines slowly
      starField.rotation.y += 0.0002;
      starField.rotation.x += 0.0001;
      connectingLines.rotation.y += 0.0002;
      connectingLines.rotation.x += 0.0001;

      // Twinkle effect
      const sizes = starFieldGeometry.attributes.size.array;
      for (let i = 0; i < starCount; i++) {
        if (Math.random() > 0.99) {
          sizes[i] = Math.random() * 0.8 + 0.4;
        }
      }
      starFieldGeometry.attributes.size.needsUpdate = true;

      // Update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        star.position.add(star.userData.velocity);
        star.userData.life++;

        const lifeRatio = star.userData.life / star.userData.maxLife;
        star.material.opacity = 1 - lifeRatio;

        if (star.userData.life >= star.userData.maxLife) {
          scene.remove(star);
          star.geometry.dispose();
          star.material.dispose();
          shootingStars.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      clearInterval(shootingStarInterval);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      starFieldGeometry.dispose();
      starFieldMaterial.dispose();
      connectingLines.geometry.dispose();
      connectingLines.material.dispose();
      renderer.dispose();
    };
  }, [theme, mounted]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 transition-colors duration-700"
      style={{
        background: !mounted
          ? 'linear-gradient(180deg, #0a1929 0%, #001e3c 50%, #000000 100%)' // Default to dark during SSR
          : theme === 'dark'
          ? 'linear-gradient(180deg, #0a1929 0%, #001e3c 50%, #000000 100%)'
          : 'linear-gradient(180deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)'
      }}
    />
  );
};

export default SpaceBackground;
