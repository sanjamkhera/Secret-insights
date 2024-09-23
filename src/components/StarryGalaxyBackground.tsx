'use client';

import React, { useEffect, useRef } from 'react';

const StarryGalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 1.2;
      drawBackground();
    };

    const drawBackground = () => {
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(0.5, '#1a0033');
      gradient.addColorStop(1, '#4d0099');

      // Apply gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add stars
      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        const opacity = Math.random();

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }

      // Add nebula-like effects
      for (let i = 0; i < 1; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 100 + 50;

        const nebulaGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        nebulaGradient.addColorStop(0, 'rgba(255, 0, 255, 0.1)');
        nebulaGradient.addColorStop(1, 'rgba(0, 0, 255, 0)');

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = nebulaGradient;
        ctx.fill();
      }

      // Add northern lights effect
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.4; // Northern lights in upper 40% of screen
        const radius = Math.random() * 200 + 100;

        const auroraGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        auroraGradient.addColorStop(0, 'rgba(0, 255, 0, 0.1)');
        auroraGradient.addColorStop(1, 'rgba(0, 255, 0, 0)');

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = auroraGradient;
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full" />;
};

export default StarryGalaxyBackground;