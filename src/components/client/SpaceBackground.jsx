'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const DARK_BG = 'linear-gradient(180deg, #0a1929 0%, #001e3c 50%, #000000 100%)';
const LIGHT_BG = 'linear-gradient(180deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)';

function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isMobile() {
  return typeof window !== 'undefined' && window.innerWidth < 768;
}

const SpaceBackground = () => {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [useStatic, setUseStatic] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (prefersReducedMotion() || isMobile()) {
      setUseStatic(true);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || !mounted || useStatic) return;

    let disposed = false;
    let animationId;

    async function init() {
      const THREE = (await import('three'));

      if (disposed) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      containerRef.current.appendChild(renderer.domElement);

      camera.position.z = 50;

      const starColor = theme === 'dark' ? 0xffc107 : 0xffa000;

      const starCount = 1500;
      const starFieldGeometry = new THREE.BufferGeometry();
      const starPositions = new Float32Array(starCount * 3);
      const starSizes = new Float32Array(starCount);

      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        starPositions[i3] = (Math.random() - 0.5) * 200;
        starPositions[i3 + 1] = (Math.random() - 0.5) * 200;
        starPositions[i3 + 2] = (Math.random() - 0.5) * 200 - 50;
        starSizes[i] = Math.random() * 0.8 + 0.4;
      }

      starFieldGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      starFieldGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

      const circleCanvas = document.createElement('canvas');
      circleCanvas.width = 32;
      circleCanvas.height = 32;
      const ctx = circleCanvas.getContext('2d');
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.9)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
      const circleTexture = new THREE.Texture(circleCanvas);
      circleTexture.needsUpdate = true;

      const starFieldMaterial = new THREE.PointsMaterial({
        size: 0.8,
        sizeAttenuation: true,
        color: starColor,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        map: circleTexture
      });

      const starField = new THREE.Points(starFieldGeometry, starFieldMaterial);
      scene.add(starField);

      const linePositions = [];
      const maxDistance = 25;
      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        for (let j = i + 1; j < Math.min(i + 8, starCount); j++) {
          const j3 = j * 3;
          const dx = starPositions[j3] - starPositions[i3];
          const dy = starPositions[j3 + 1] - starPositions[i3 + 1];
          const dz = starPositions[j3 + 2] - starPositions[i3 + 2];
          if (dx * dx + dy * dy + dz * dz < maxDistance * maxDistance) {
            linePositions.push(
              starPositions[i3], starPositions[i3 + 1], starPositions[i3 + 2],
              starPositions[j3], starPositions[j3 + 1], starPositions[j3 + 2]
            );
          }
        }
      }

      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      const lineMaterial = new THREE.LineBasicMaterial({
        color: starColor,
        transparent: true,
        opacity: 0.10,
        blending: THREE.AdditiveBlending
      });
      const connectingLines = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(connectingLines);

      let mouseX = 0;
      let mouseY = 0;
      const onMouseMove = (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener('mousemove', onMouseMove);

      const shootingStars = [];
      const shootingStarInterval = setInterval(() => {
        if (Math.random() > 0.92) {
          const startX = (Math.random() - 0.5) * 100;
          const startY = 50 + Math.random() * 20;
          const startZ = -50 - Math.random() * 50;
          const geo = new THREE.BufferGeometry();
          geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
            startX, startY, startZ,
            startX - 8, startY - 8, startZ - 8
          ]), 3));
          const mat = new THREE.LineBasicMaterial({ color: starColor, transparent: true, opacity: 1 });
          const line = new THREE.Line(geo, mat);
          line.userData = {
            velocity: new THREE.Vector3(-Math.random() * 2.5 - 1.5, -Math.random() * 2.5 - 1.5, -Math.random() * 1.5),
            life: 1, maxLife: 50
          };
          scene.add(line);
          shootingStars.push(line);
        }
      }, 1500);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      let frame = 0;
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        frame++;

        camera.position.x += (mouseX * 10 - camera.position.x) * 0.02;
        camera.position.y += (mouseY * 10 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        starField.rotation.y += 0.0002;
        starField.rotation.x += 0.0001;
        connectingLines.rotation.y += 0.0002;
        connectingLines.rotation.x += 0.0001;

        if (frame % 3 === 0) {
          const sizes = starFieldGeometry.attributes.size.array;
          for (let i = 0; i < 50; i++) {
            const idx = Math.floor(Math.random() * starCount);
            sizes[idx] = Math.random() * 0.8 + 0.4;
          }
          starFieldGeometry.attributes.size.needsUpdate = true;
        }

        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const star = shootingStars[i];
          star.position.add(star.userData.velocity);
          star.userData.life++;
          star.material.opacity = 1 - star.userData.life / star.userData.maxLife;
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

      return () => {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('mousemove', onMouseMove);
        clearInterval(shootingStarInterval);
        cancelAnimationFrame(animationId);
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
        starFieldGeometry.dispose();
        starFieldMaterial.dispose();
        circleTexture.dispose();
        lineGeometry.dispose();
        lineMaterial.dispose();
        shootingStars.forEach(s => { s.geometry.dispose(); s.material.dispose(); });
        renderer.dispose();
      };
    }

    let cleanup;
    init().then(fn => { cleanup = fn; });

    return () => {
      disposed = true;
      if (animationId) cancelAnimationFrame(animationId);
      if (cleanup) cleanup();
    };
  }, [theme, mounted, useStatic]);

  const bg = !mounted || theme === 'dark' ? DARK_BG : LIGHT_BG;

  if (useStatic) {
    return <div className="fixed inset-0 -z-10" style={{ background: bg }} />;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 transition-colors duration-700"
      style={{ background: bg }}
    />
  );
};

export default SpaceBackground;
