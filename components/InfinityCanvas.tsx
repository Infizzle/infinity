"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  startX: number;
  startY: number;
  controlX: number;
  controlY: number;
  targetX: number;
  targetY: number;
  delay: number;
  size: number;
  opacity: number;
  trail: { x: number; y: number }[];
}

function getInfinityPoint(t: number, scale: number, cx: number, cy: number) {
  const sin = Math.sin(t);
  const cos = Math.cos(t);
  const denom = 1 + sin * sin;
  return {
    x: cx + (scale * cos) / denom,
    y: cy + (scale * sin * cos) / denom,
  };
}

export function InfinityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef<number>(0);
  const reducedMotion = useRef(false);

  const initParticles = useCallback((width: number, height: number) => {
    const isMobile = width < 768;
    const count = isMobile ? 80 : 200;
    const scale = Math.min(width * 0.25, 200);
    const cx = width / 2;
    const cy = height / 2;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const target = getInfinityPoint(t, scale, cx, cy);

      const edge = Math.random() * 4;
      let startX: number, startY: number;
      if (edge < 1) { startX = Math.random() * width; startY = -20; }
      else if (edge < 2) { startX = width + 20; startY = Math.random() * height; }
      else if (edge < 3) { startX = Math.random() * width; startY = height + 20; }
      else { startX = -20; startY = Math.random() * height; }

      const midX = (startX + target.x) / 2;
      const midY = (startY + target.y) / 2;
      const offsetX = (Math.random() - 0.5) * width * 0.4;
      const offsetY = (Math.random() - 0.5) * height * 0.4;

      particles.push({
        startX, startY,
        controlX: midX + offsetX, controlY: midY + offsetY,
        targetX: target.x, targetY: target.y,
        delay: Math.random() * 0.3,
        size: 1.5 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.7,
        trail: [],
      });
    }
    particlesRef.current = particles;
  }, []);

  const drawStaticSymbol = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const scale = Math.min(width * 0.25, 200);
    const cx = width / 2;
    const cy = height / 2;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * Math.PI * 2;
      const p = getInfinityPoint(t, scale, cx, cy);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = "#00D2BE";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#00D2BE";
    ctx.shadowBlur = 20;
    ctx.stroke();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cachedWidth = 0;
    let cachedHeight = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      cachedWidth = rect.width;
      cachedHeight = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      if (reducedMotion.current) drawStaticSymbol(ctx, rect.width, rect.height);
      else initParticles(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reducedMotion.current) return () => window.removeEventListener("resize", resize);

    startTimeRef.current = performance.now();
    const assemblyDuration = 3500;
    let assembled = false;

    function animate() {
      if (!ctx || !canvas) return;
      const elapsed = performance.now() - startTimeRef.current;
      const globalProgress = Math.min(elapsed / assemblyDuration, 1);
      ctx.clearRect(0, 0, cachedWidth, cachedHeight);

      if (globalProgress >= 1) {
        const pulse = Math.sin(performance.now() * 0.002) * 0.15 + 0.85;
        ctx.globalAlpha = pulse;
      }

      particlesRef.current.forEach((p) => {
        const adjustedProgress = Math.max(0, (globalProgress - p.delay) / (1 - p.delay));
        const t = 1 - Math.pow(1 - Math.min(adjustedProgress, 1), 3);
        const invT = 1 - t;
        const x = invT * invT * p.startX + 2 * invT * t * p.controlX + t * t * p.targetX;
        const y = invT * invT * p.startY + 2 * invT * t * p.controlY + t * t * p.targetY;

        p.trail.push({ x, y });
        if (p.trail.length > 8) p.trail.shift();

        p.trail.forEach((tp, i) => {
          const trailOpacity = (i / p.trail.length) * p.opacity * 0.3;
          ctx.beginPath();
          ctx.arc(tp.x, tp.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 210, 190, ${trailOpacity})`;
          ctx.fill();
        });

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 210, 190, ${p.opacity})`;
        ctx.fill();

        if (globalProgress > 0.8) {
          const glowIntensity = (globalProgress - 0.8) / 0.2;
          ctx.shadowColor = "#00D2BE";
          ctx.shadowBlur = 10 * glowIntensity;
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 210, 190, ${p.opacity * glowIntensity * 0.5})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      ctx.globalAlpha = 1;

      if (globalProgress >= 1 && !assembled) {
        assembled = true;
        // Stop rAF loop — use CSS animation for pulse instead
        canvas.style.animation = "pulse-glow 3s ease-in-out infinite";
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles, drawStaticSymbol]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
  );
}
