'use client';

import { useEffect, useRef } from "react";
import Link from 'next/link';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let running = true;

    // 设置 canvas 尺寸为窗口大小
    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 1个巨大星球粒子
    const planet = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 90 + Math.random() * 40, // 更大
      speed: 1.2 + Math.random() * 0.8, // 更快
      floatPhase: Math.random() * Math.PI * 2
    };

    // 层次丰富的小粒子
    const PARTICLE_COUNT = 70;
    const particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 1.2 + Math.random() * 7, // 大小不一
      speed: 0.4 + Math.random() * 1.6, // 速度有层次
      alpha: 0.12 + Math.random() * 0.38 // 深浅不一
    }));

    let frame = 0;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas?.width || 1, canvas?.height || 1);
      // 绘制巨大星球
      planet.x += planet.speed;
      const floatY = Math.sin(frame * 0.01 + planet.floatPhase) * 24;
      if (planet.x - planet.r > (canvas?.width || 1)) {
        planet.x = -planet.r;
        planet.y = Math.random() * (canvas?.height || 1);
      }
      // 渐变星球
      const grad = ctx.createRadialGradient(
        planet.x, planet.y + floatY, planet.r * 0.1,
        planet.x, planet.y + floatY, planet.r
      );
      grad.addColorStop(0, 'rgba(220,20,60,1)'); // 绯红色中心
      grad.addColorStop(0.7, 'rgba(220,20,60,0.7)');
      grad.addColorStop(1, 'rgba(220,20,60,0)'); // 边缘透明
      ctx.beginPath();
      ctx.arc(planet.x, planet.y + floatY, planet.r, 0, 2 * Math.PI);
      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(220,20,60,0.18)';
      ctx.shadowBlur = 48;
      ctx.fill();
      ctx.shadowBlur = 0;

      // 绘制层次丰富的小粒子
      for (const p of particles) {
        p.x += p.speed;
        if (p.x - p.r > (canvas?.width || 1)) {
          p.x = -p.r;
          p.y = Math.random() * (canvas?.height || 1);
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(0,0,0,${p.alpha})`;
        ctx.shadowColor = 'rgba(0,0,0,0.10)';
        ctx.shadowBlur = 6 + p.r * 1.5;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      frame++;
      if (running) requestAnimationFrame(draw);
    }
    draw();

    return () => {
      running = false;
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
        style={{ opacity: 1 }}
      />
      {/* Banner 导航 */}
      <div className="w-full py-3 bg-black bg-opacity-80 text-white text-center text-lg font-semibold z-20 shadow-md fixed top-0 left-0 flex justify-center gap-8">
        <Link href="/about" className="hover:text-red-400 transition">About</Link>
        <Link href="/projects" className="hover:text-red-400 transition">Projects</Link>
        <Link href="/artworks" className="hover:text-red-400 transition">Artworks</Link>
        <Link href="/literature" className="hover:text-red-400 transition">Literature</Link>
        <Link href="/contact" className="hover:text-red-400 transition">Contact</Link>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="z-10 flex flex-col items-center mt-20">
          <h1 className="text-5xl font-bold tracking-widest mb-8 text-black drop-shadow-lg">Yi Tian</h1>
          <p className="text-xl text-gray-800 mb-12 text-center max-w-xl drop-shadow">
            艺术家 / 创作者 / 探索者
            <br />
            欢迎来到我的个人艺术主页
          </p>
        </div>
      </div>
    </>
  );
}