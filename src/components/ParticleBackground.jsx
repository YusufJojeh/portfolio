import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ParticleBackground = ({ variant = 'default' }) => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;

        // Color variations based on variant
        if (variant === 'hero') {
          const colors = theme === 'dark'
            ? ['#10b981', '#06b6d4', '#f59e0b', '#8b5cf6'] // emerald, cyan, amber, purple
            : ['#059669', '#0891b2', '#d97706', '#7c3aed'];
          this.color = colors[Math.floor(Math.random() * colors.length)];
        } else {
          this.color = theme === 'dark'
            ? `rgba(16, 185, 129, ${this.opacity})`
            : `rgba(6, 182, 212, ${this.opacity})`;
        }
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction
        if (mouse.x && mouse.y) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const dirX = dx / distance;
            const dirY = dy / distance;
            this.x -= dirX * force * 2;
            this.y -= dirY * force * 2;
          }
        }

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect for hero variant
        if (variant === 'hero') {
          ctx.shadowBlur = 15;
          ctx.shadowColor = this.color;
        }
      }
    }

    // Create particles
    const createParticles = () => {
      const numberOfParticles = variant === 'hero'
        ? Math.min(200, Math.floor((canvas.width * canvas.height) / 10000))
        : Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));

      particles = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };
    createParticles();

    // Animation loop
    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = theme === 'dark'
        ? 'rgba(15, 23, 42, 0.1)'
        : 'rgba(248, 250, 252, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDistance = variant === 'hero' ? 120 : 150;
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2;

            if (variant === 'hero') {
              // Gradient line for hero
              const gradient = ctx.createLinearGradient(
                particles[i].x, particles[i].y,
                particles[j].x, particles[j].y
              );
              gradient.addColorStop(0, particles[i].color.replace(/[\d.]+\)$/g, `${opacity})`));
              gradient.addColorStop(1, particles[j].color.replace(/[\d.]+\)$/g, `${opacity})`));
              ctx.strokeStyle = gradient;
            } else {
              ctx.strokeStyle = theme === 'dark'
                ? `rgba(16, 185, 129, ${opacity})`
                : `rgba(6, 182, 212, ${opacity})`;
            }

            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      ctx.shadowBlur = 0; // Reset shadow for next frame
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, variant]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: variant === 'hero'
          ? theme === 'dark'
            ? 'radial-gradient(ellipse at top, rgb(15 23 42), rgb(2 6 23))'
            : 'radial-gradient(ellipse at top, rgb(248 250 252), rgb(236 253 245))'
          : theme === 'dark'
            ? 'linear-gradient(to bottom, rgb(15 23 42), rgb(2 6 23))'
            : 'linear-gradient(to bottom, rgb(248 250 252), rgb(236 253 245))'
      }}
    />
  );
};

export default ParticleBackground;
