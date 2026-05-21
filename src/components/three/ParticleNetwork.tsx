"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ParticleNetworkProps {
  particleCount?: number;
  maxDistance?: number;
  mouseStrength?: number;
  speed?: number;
}

export function ParticleNetwork({
  particleCount = 80,
  maxDistance = 150,
  mouseStrength = 0.3,
  speed = 0.0008,
}: ParticleNetworkProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion:reduce)"
    ).matches;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 400;

    // Particles
    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const particles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      mesh: THREE.Mesh;
    }> = [];

    const dotGeo = new THREE.SphereGeometry(1.2, 6, 6);

    for (let i = 0; i < particleCount; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xf0f0ff,
        transparent: true,
        opacity: Math.random() * 0.5 + 0.3,
      });
      const mesh = new THREE.Mesh(dotGeo, mat);

      const x = (Math.random() - 0.5) * W;
      const y = (Math.random() - 0.5) * H;
      const z = (Math.random() - 0.5) * 200;

      mesh.position.set(x, y, z);
      scene.add(mesh);

      particles.push({
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * speed * 60,
        vy: (Math.random() - 0.5) * speed * 60,
        vz: (Math.random() - 0.5) * speed * 30,
        mesh,
      });
    }

    // Connection lines
    const maxLines = particleCount * particleCount;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSegments);

    // Mouse tracking
    const mouse3D = new THREE.Vector3(0, 0, 0);
    const handleMouseMove = (e: MouseEvent) => {
      mouse3D.x = e.clientX - W / 2;
      mouse3D.y = -(e.clientY - H / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Resize
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Animation loop
    let frameId: number;
    const blue = new THREE.Color(0x4f6ef7);

    const tick = () => {
      // Skip expensive calculations when tab is hidden to save CPU
      if (!document.hidden && !reduced) {
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;

          // Mouse gravity
          const dx = mouse3D.x - p.x;
          const dy = mouse3D.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200 && dist > 0) {
            p.vx += (dx / dist) * mouseStrength * 0.01;
            p.vy += (dy / dist) * mouseStrength * 0.01;
          }

          // Damping
          p.vx *= 0.99;
          p.vy *= 0.99;

          // Wrap around edges
          const hw = W / 2;
          const hh = H / 2;
          if (p.x > hw) p.x = -hw;
          if (p.x < -hw) p.x = hw;
          if (p.y > hh) p.y = -hh;
          if (p.y < -hh) p.y = hh;

          p.mesh.position.set(p.x, p.y, p.z);
        }

        // Update connection lines
        let lineIndex = 0;
        const pos = lineGeo.attributes.position.array as Float32Array;
        const col = lineGeo.attributes.color.array as Float32Array;

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dz = a.z - b.z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < maxDistance) {
              const alpha = 1 - dist / maxDistance;

              pos[lineIndex * 6 + 0] = a.x;
              pos[lineIndex * 6 + 1] = a.y;
              pos[lineIndex * 6 + 2] = a.z;
              col[lineIndex * 6 + 0] = blue.r * alpha;
              col[lineIndex * 6 + 1] = blue.g * alpha;
              col[lineIndex * 6 + 2] = blue.b * alpha;

              pos[lineIndex * 6 + 3] = b.x;
              pos[lineIndex * 6 + 4] = b.y;
              pos[lineIndex * 6 + 5] = b.z;
              col[lineIndex * 6 + 3] = blue.r * alpha;
              col[lineIndex * 6 + 4] = blue.g * alpha;
              col[lineIndex * 6 + 5] = blue.b * alpha;

              lineIndex++;
              if (lineIndex >= maxLines) break;
            }
          }
          if (lineIndex >= maxLines) break;
        }

        // Zero out unused slots
        for (let k = lineIndex * 6; k < maxLines * 6; k++) {
          pos[k] = 0;
          col[k] = 0;
        }

        lineGeo.attributes.position.needsUpdate = true;
        lineGeo.attributes.color.needsUpdate = true;
        lineGeo.setDrawRange(0, lineIndex * 2);
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };
    tick();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      dotGeo.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [particleCount, maxDistance, mouseStrength, speed]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        WebkitMaskImage: [
          "radial-gradient(ellipse 80% 70% at 50% 40%,",
          "black 30%, transparent 100%)",
        ].join(""),
        maskImage: [
          "radial-gradient(ellipse 80% 70% at 50% 40%,",
          "black 30%, transparent 100%)",
        ].join(""),
      }}
    />
  );
}
