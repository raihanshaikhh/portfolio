import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Globe() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth || 400;
    const height = mount.clientHeight || 400;

    // --- scene / camera / renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1));

    // --- globe group ---
    const globe = new THREE.Group();
    scene.add(globe);

    const radius = 2;
    const segments = 64;
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.75,
    });

    // Meridians (longitude lines) — vertical great circles through the poles
    const meridianCount = 5;
    for (let i = 0; i < meridianCount; i++) {
      const rotationY = (i / meridianCount) * Math.PI;
      const points = [];
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            radius * Math.sin(theta) * Math.cos(rotationY),
            radius * Math.cos(theta),
            radius * Math.sin(theta) * Math.sin(rotationY)
          )
        );
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      globe.add(new THREE.LineLoop(geometry, material));
    }

    // Parallels (latitude lines) — horizontal rings, skipping the poles
    const parallelCount = 2;
    for (let i = 1; i < parallelCount; i++) {
      const lat = (i / parallelCount) * Math.PI - Math.PI / 2;
      const y = radius * Math.sin(lat);
      const r = radius * Math.cos(lat);
      const points = [];
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      globe.add(new THREE.LineLoop(geometry, material));
    }

    // --- animation loop ---
    let animationId;
    let lastTime = performance.now();

    const animate = () => {
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      globe.rotation.y += delta * 0.15;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // --- resize handling ---
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // --- cleanup ---
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      material.dispose();
      globe.children.forEach((line) => line.geometry.dispose());
    };
  }, []);

  return <div ref={mountRef} style={{ width: "80%", height: "80%" }} />;
}