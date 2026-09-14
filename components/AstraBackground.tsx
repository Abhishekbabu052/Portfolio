"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AstraBackground() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;

        if (!mount) return;

        // ========================================
        // SCENE
        // ========================================

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            2500
        );

        camera.position.z = 500;

        // ========================================
        // RENDERER
        // ========================================

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
        });

        const pixelRatio = Math.min(window.devicePixelRatio, 1.5);

        renderer.setPixelRatio(pixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        renderer.domElement.style.position = "fixed";
        renderer.domElement.style.inset = "0";
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        renderer.domElement.style.zIndex = "1";
        renderer.domElement.style.pointerEvents = "none";

        mount.appendChild(renderer.domElement);

        // ========================================
        // DEVICE
        // ========================================

        const isMobile = window.innerWidth < 700;

        const particleCount = isMobile ? 1500 : 3600;

        // ========================================
        // PARTICLE DATA
        // ========================================

        const positions = new Float32Array(
            particleCount * 3
        );

        const randoms = new Float32Array(
            particleCount
        );

        const sizes = new Float32Array(
            particleCount
        );

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Large atmospheric field
            positions[i3] =
                (Math.random() - 0.5) * 1700;

            positions[i3 + 1] =
                (Math.random() - 0.5) * 1000;

            positions[i3 + 2] =
                (Math.random() - 0.5) * 1200;

            randoms[i] = Math.random();

            // Slightly varied particle sizes
            sizes[i] =
                0.7 + Math.random() * 1.8;
        }

        // ========================================
        // GEOMETRY
        // ========================================

        const geometry = new THREE.BufferGeometry();

        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                positions,
                3
            )
        );

        geometry.setAttribute(
            "aRandom",
            new THREE.BufferAttribute(
                randoms,
                1
            )
        );

        geometry.setAttribute(
            "aSize",
            new THREE.BufferAttribute(
                sizes,
                1
            )
        );

        // ========================================
        // SHADER
        // ========================================

        const material = new THREE.ShaderMaterial({
            transparent: true,

            depthWrite: false,

            blending: THREE.AdditiveBlending,

            uniforms: {
                uTime: {
                    value: 0,
                },

                uMouse: {
                    value: new THREE.Vector2(0, 0),
                },

                uPixelRatio: {
                    value: pixelRatio,
                },
            },

            vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uPixelRatio;

        attribute float aRandom;
        attribute float aSize;

        varying float vAlpha;

        void main() {

          vec3 pos = position;

          // ====================================
          // ATMOSPHERIC MOTION
          // ====================================

          float t = uTime * 0.12;

          pos.x +=
            sin(
              t +
              aRandom * 18.0
            ) * 13.0;

          pos.y +=
            cos(
              t * 1.15 +
              aRandom * 16.0
            ) * 10.0;

          pos.z +=
            sin(
              t * 0.8 +
              aRandom * 14.0
            ) * 16.0;


          // ====================================
          // MOUSE INTERACTION
          // ====================================

          vec2 mousePosition =
            uMouse * 420.0;

          vec2 difference =
            pos.xy - mousePosition;

          float distanceToMouse =
            length(difference);

          float influence =
            1.0 -
            smoothstep(
              0.0,
              330.0,
              distanceToMouse
            );

          vec2 direction =
            normalize(
              difference +
              vec2(0.001)
            );

          // Gentle particle repulsion
          pos.xy +=
            direction *
            influence *
            42.0;

          // Atmospheric wave
          pos.z +=
            influence *
            40.0 *
            sin(
              distanceToMouse * 0.025 -
              uTime * 1.4
            );


          // ====================================
          // CAMERA
          // ====================================

          vec4 mvPosition =
            modelViewMatrix *
            vec4(pos, 1.0);


          // ====================================
          // PARTICLE SIZE
          // ====================================

          float particleSize =
            (
              1.2 +
              aSize * 1.5
            ) *
            uPixelRatio;

          gl_PointSize =
            particleSize *
            (
              430.0 /
              -mvPosition.z
            );

          gl_Position =
            projectionMatrix *
            mvPosition;


          // ====================================
          // DEPTH / RANDOM OPACITY
          // ====================================

          float depthFade =
            smoothstep(
              1200.0,
              100.0,
              -mvPosition.z
            );

          vAlpha =
            (
              0.18 +
              aRandom * 0.48
            ) *
            depthFade;
        }
      `,

            fragmentShader: `
        varying float vAlpha;

        void main() {

          vec2 uv =
            gl_PointCoord -
            vec2(0.5);

          float distanceFromCenter =
            length(uv);

          // Soft circular particle
          float glow =
            1.0 -
            smoothstep(
              0.0,
              0.5,
              distanceFromCenter
            );

          // Extra soft outer glow
          float softGlow =
            1.0 -
            smoothstep(
              0.15,
              0.5,
              distanceFromCenter
            );

          float alpha =
            glow *
            vAlpha *
            (0.65 + softGlow * 0.35);

          if (alpha < 0.01) {
            discard;
          }

          gl_FragColor =
            vec4(
              1.0,
              1.0,
              1.0,
              alpha
            );
        }
      `,
        });

        // ========================================
        // PARTICLES
        // ========================================

        const particles = new THREE.Points(
            geometry,
            material
        );

        scene.add(particles);

        // ========================================
        // MOUSE
        // ========================================

        const targetMouse =
            new THREE.Vector2(0, 0);

        const smoothMouse =
            new THREE.Vector2(0, 0);

        const handleMouseMove = (
            event: MouseEvent
        ) => {
            targetMouse.x =
                (
                    event.clientX /
                    window.innerWidth -
                    0.5
                ) * 2;

            targetMouse.y =
                -(
                    (
                        event.clientY /
                        window.innerHeight -
                        0.5
                    ) * 2
                );
        };

        window.addEventListener(
            "mousemove",
            handleMouseMove,
            {
                passive: true,
            }
        );

        // ========================================
        // RESIZE
        // ========================================

        const handleResize = () => {
            const width =
                window.innerWidth;

            const height =
                window.innerHeight;

            camera.aspect =
                width / height;

            camera.updateProjectionMatrix();

            const newPixelRatio =
                Math.min(
                    window.devicePixelRatio,
                    1.5
                );

            renderer.setPixelRatio(
                newPixelRatio
            );

            renderer.setSize(
                width,
                height
            );

            material.uniforms.uPixelRatio.value =
                newPixelRatio;
        };

        window.addEventListener(
            "resize",
            handleResize
        );

        // ========================================
        // ANIMATION
        // ========================================

        let animationFrame = 0;

        const clock =
            new THREE.Clock();

        const animate = () => {
            animationFrame =
                requestAnimationFrame(
                    animate
                );

            const time =
                clock.getElapsedTime();

            material.uniforms.uTime.value =
                time;

            // Smooth mouse movement
            smoothMouse.lerp(
                targetMouse,
                0.045
            );

            material.uniforms.uMouse.value.copy(
                smoothMouse
            );

            // Very subtle global movement
            particles.rotation.y =
                Math.sin(time * 0.08) *
                0.035;

            particles.rotation.x =
                Math.cos(time * 0.06) *
                0.02;

            renderer.render(
                scene,
                camera
            );
        };

        animate();

        // ========================================
        // CLEANUP
        // ========================================

        return () => {
            cancelAnimationFrame(
                animationFrame
            );

            window.removeEventListener(
                "mousemove",
                handleMouseMove
            );

            window.removeEventListener(
                "resize",
                handleResize
            );

            geometry.dispose();

            material.dispose();

            renderer.dispose();

            renderer.forceContextLoss();

            if (
                renderer.domElement.parentNode ===
                mount
            ) {
                mount.removeChild(
                    renderer.domElement
                );
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            aria-hidden="true"
            style={{
                position: "fixed",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 1,
            }}
        />
    );
}