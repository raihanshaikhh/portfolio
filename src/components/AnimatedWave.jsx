import { useEffect, useRef } from "react";
import * as THREE from "three";
import heroImage from "../assets/hero_image.png";

function AnimatedWave() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // -------------------------
    // Scene
    // -------------------------

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
      -1,
      1,
      1,
      -1,
      0,
      1
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 1.5)
    );

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );

    container.appendChild(renderer.domElement);

    // -------------------------
    // Texture
    // -------------------------

    const textureLoader = new THREE.TextureLoader();

    const texture = textureLoader.load(heroImage);

    texture.colorSpace = THREE.SRGBColorSpace;

    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    // -------------------------
    // Shader
    // -------------------------

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: {
          value: texture,
        },

        uTime: {
          value: 0,
        },

        uResolution: {
          value: new THREE.Vector2(
            container.clientWidth,
            container.clientHeight
          ),
        },
      },

      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;

          gl_Position = vec4(
            position,
            1.0
          );
        }
      `,

      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform vec2 uResolution;

        varying vec2 vUv;

        void main() {

          vec2 uv = vUv;

          // --------------------------------
          // Slow horizontal fabric movement
          // --------------------------------

          float wave1 =
            sin(
              uv.y * 7.0
              + uTime * 0.35
            ) * 0.008;

          float wave2 =
            sin(
              uv.y * 15.0
              - uTime * 0.22
            ) * 0.004;

          float wave3 =
            sin(
              uv.y * 30.0
              + uTime * 0.15
            ) * 0.002;

          // --------------------------------
          // Larger organic movement
          // --------------------------------

          float largeWave =
            sin(
              uv.y * 3.0
              + uTime * 0.18
            ) * 0.006;

          uv.x +=
            wave1 +
            wave2 +
            wave3 +
            largeWave;

          // --------------------------------
          // Very subtle vertical distortion
          // --------------------------------

          uv.y +=
            sin(
              uv.x * 5.0
              + uTime * 0.16
            ) * 0.0015;

          // --------------------------------
          // Keep texture inside bounds
          // --------------------------------

          uv = clamp(
            uv,
            0.001,
            0.999
          );

          vec4 color =
            texture2D(
              uTexture,
              uv
            );

          gl_FragColor = color;
        }
      `,
    });

    // -------------------------
    // Fullscreen plane
    // -------------------------

    const geometry =
      new THREE.PlaneGeometry(2, 2);

    const mesh =
      new THREE.Mesh(
        geometry,
        material
      );

    scene.add(mesh);

    // -------------------------
    // Resize
    // -------------------------

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      renderer.setSize(
        width,
        height
      );

      material.uniforms.uResolution.value.set(
        width,
        height
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    // -------------------------
    // Animation
    // -------------------------

    const clock = new THREE.Clock();

    let animationFrame;

    const animate = () => {
      animationFrame =
        requestAnimationFrame(animate);

      material.uniforms.uTime.value =
        clock.getElapsedTime();

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    // -------------------------
    // Cleanup
    // -------------------------

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      geometry.dispose();
      material.dispose();
      texture.dispose();

      renderer.dispose();

      if (
        renderer.domElement.parentNode
      ) {
        renderer.domElement.parentNode.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-20"
      aria-hidden="true"
    />
  );
}

export default AnimatedWave;