"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleName() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        // --------------------------------------------------
        // SCENE
        // --------------------------------------------------

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            55,
            window.innerWidth / window.innerHeight,
            1,
            2500
        );

        camera.position.z = 520;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
        });

        const pixelRatio = Math.min(window.devicePixelRatio, 2);

        renderer.setPixelRatio(pixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        renderer.domElement.style.position = "fixed";
        renderer.domElement.style.inset = "0";
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        renderer.domElement.style.zIndex = "3";
        renderer.domElement.style.pointerEvents = "none";

        mount.appendChild(renderer.domElement);

        // --------------------------------------------------
        // HIGH QUALITY TEXT → PARTICLES
        // --------------------------------------------------

        const textCanvas = document.createElement("canvas");

        // High resolution canvas = sharper particle letters
        textCanvas.width = 3000;
        textCanvas.height = 700;

        const ctx = textCanvas.getContext("2d");

        if (!ctx) {
            renderer.dispose();

            if (renderer.domElement.parentNode === mount) {
                mount.removeChild(renderer.domElement);
            }

            return;
        }

        ctx.clearRect(
            0,
            0,
            textCanvas.width,
            textCanvas.height
        );

        ctx.fillStyle = "#ffffff";

        // Stronger, wider font
        ctx.font =
            '900 420px "Arial Black", "Helvetica Neue", Arial, sans-serif';

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(
            "ABHISHEK",
            textCanvas.width / 2,
            textCanvas.height / 2
        );

        // --------------------------------------------------
        // READ PIXELS
        // --------------------------------------------------

        const imageData = ctx.getImageData(
            0,
            0,
            textCanvas.width,
            textCanvas.height
        );

        const positions: number[] = [];
        const targets: number[] = [];
        const explosions: number[] = [];
        const randoms: number[] = [];

        const width = window.innerWidth;

        // Smaller gap = more particles = better text quality
        let gap = 5;

        if (width < 600) {
            gap = 7;
        } else if (width < 900) {
            gap = 6;
        } else {
            gap = 5;
        }

        const centerX = textCanvas.width / 2;
        const centerY = textCanvas.height / 2;

        for (
            let y = 0;
            y < textCanvas.height;
            y += gap
        ) {
            for (
                let x = 0;
                x < textCanvas.width;
                x += gap
            ) {
                const index =
                    (y * textCanvas.width + x) * 4;

                const alpha = imageData.data[index + 3];

                if (alpha > 100) {
                    // Convert canvas pixels to Three.js coordinates
                    const px =
                        (x - centerX) * 0.28;

                    const py =
                        -(y - centerY) * 0.28;

                    targets.push(
                        px,
                        py,
                        0
                    );

                    // Random starting position
                    positions.push(
                        (Math.random() - 0.5) * 1000,
                        (Math.random() - 0.5) * 700,
                        (Math.random() - 0.5) * 600
                    );

                    // Explosion direction
                    const direction = new THREE.Vector3(
                        Math.random() - 0.5,
                        Math.random() - 0.5,
                        Math.random() - 0.5
                    ).normalize();

                    const distance =
                        180 + Math.random() * 380;

                    explosions.push(
                        direction.x * distance,
                        direction.y * distance,
                        direction.z * distance
                    );

                    randoms.push(Math.random());
                }
            }
        }

        // --------------------------------------------------
        // GEOMETRY
        // --------------------------------------------------

        const geometry =
            new THREE.BufferGeometry();

        geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(
                positions,
                3
            )
        );

        geometry.setAttribute(
            "aTarget",
            new THREE.Float32BufferAttribute(
                targets,
                3
            )
        );

        geometry.setAttribute(
            "aExplosion",
            new THREE.Float32BufferAttribute(
                explosions,
                3
            )
        );

        geometry.setAttribute(
            "aRandom",
            new THREE.Float32BufferAttribute(
                randoms,
                1
            )
        );

        // --------------------------------------------------
        // SHADER
        // --------------------------------------------------

        const material =
            new THREE.ShaderMaterial({
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,

                uniforms: {
                    uTime: {
                        value: 0,
                    },

                    uFormation: {
                        value: 0,
                    },

                    uProgress: {
                        value: 0,
                    },

                    uOpacity: {
                        value: 1,
                    },

                    uScale: {
                        value: 1,
                    },

                    uPixelRatio: {
                        value: pixelRatio,
                    },
                },

                // --------------------------------------------------
                // VERTEX SHADER
                // --------------------------------------------------

                vertexShader: `
          uniform float uTime;
          uniform float uFormation;
          uniform float uProgress;
          uniform float uScale;
          uniform float uPixelRatio;

          attribute vec3 aTarget;
          attribute vec3 aExplosion;
          attribute float aRandom;

          varying float vAlpha;
          varying float vRandom;

          void main() {

            vec3 start = position;
            vec3 target = aTarget;

            // --------------------------------------------
            // FORMATION
            // --------------------------------------------

            float formation = smoothstep(
              0.0,
              1.0,
              uFormation
            );

            // More cinematic easing
            formation =
              1.0 -
              pow(
                1.0 - formation,
                4.5
              );

            // --------------------------------------------
            // FORM NAME
            // --------------------------------------------

            vec3 pos = mix(
              start,
              target,
              formation
            );

            // --------------------------------------------
            // PARTICLE DELAY
            // --------------------------------------------

            float delay =
              aRandom * 0.28;

            float disperse =
              smoothstep(
                delay,
                0.88 + delay * 0.12,
                uProgress
              );

            // --------------------------------------------
            // SCROLL EXPLOSION
            // --------------------------------------------

            pos +=
              aExplosion *
              disperse;

            // --------------------------------------------
            // FLOATING MOTION
            // --------------------------------------------

            float movement =
              uTime * 0.65 +
              aRandom * 12.0;

            pos.x +=
              sin(movement) *
              1.25 *
              (1.0 - disperse);

            pos.y +=
              cos(
                uTime * 0.75 +
                aRandom * 9.0
              ) *
              1.25 *
              (1.0 - disperse);

            pos.z +=
              sin(
                uTime * 0.5 +
                aRandom * 7.0
              ) *
              1.5;

            // --------------------------------------------
            // SCALE
            // --------------------------------------------

            pos *= uScale;

            // --------------------------------------------
            // CAMERA
            // --------------------------------------------

            vec4 mvPosition =
              modelViewMatrix *
              vec4(pos, 1.0);

            // --------------------------------------------
            // PARTICLE SIZE
            // --------------------------------------------

            float baseSize =
              2.4 +
              aRandom * 2.4;

            float size =
              baseSize *
              uPixelRatio;

            // Slightly larger while forming
            size *=
              1.0 +
              formation * 0.15;

            gl_PointSize =
              size *
              (470.0 / -mvPosition.z);

            gl_Position =
              projectionMatrix *
              mvPosition;

            // --------------------------------------------
            // FADE DURING EXPLOSION
            // --------------------------------------------

            float fade =
              1.0 -
              smoothstep(
                0.20,
                0.95,
                disperse
              );

            // Keep a subtle amount of particles
            // visible during the transition
            vAlpha =
              mix(
                1.0,
                0.0,
                smoothstep(
                  0.35,
                  1.0,
                  disperse
                )
              );

            vAlpha *=
              0.92 +
              aRandom * 0.08;

            vRandom = aRandom;
          }
        `,

                // --------------------------------------------------
                // FRAGMENT SHADER
                // --------------------------------------------------

                fragmentShader: `
          varying float vAlpha;
          varying float vRandom;

          void main() {

            vec2 uv =
              gl_PointCoord -
              vec2(0.5);

            float distanceFromCenter =
              length(uv);

            // Sharp particle core
            float core =
              1.0 -
              smoothstep(
                0.0,
                0.22,
                distanceFromCenter
              );

            // Soft outer glow
            float glow =
              1.0 -
              smoothstep(
                0.05,
                0.5,
                distanceFromCenter
              );

            float alpha =
              core * 0.82 +
              glow * 0.32;

            alpha *= vAlpha;

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

        // --------------------------------------------------
        // PARTICLES
        // --------------------------------------------------

        const particles =
            new THREE.Points(
                geometry,
                material
            );

        particles.frustumCulled = false;

        scene.add(particles);

        // --------------------------------------------------
        // RESPONSIVE SCALE
        // --------------------------------------------------

        const updateScale = () => {
            const currentWidth =
                window.innerWidth;

            let scale = 1;

            if (currentWidth < 420) {
                scale = 0.43;
            } else if (currentWidth < 600) {
                scale = 0.52;
            } else if (currentWidth < 900) {
                scale = 0.70;
            } else if (currentWidth < 1200) {
                scale = 0.86;
            } else {
                scale = 1.0;
            }

            material.uniforms.uScale.value =
                scale;
        };

        updateScale();

        // --------------------------------------------------
        // INTRO
        // --------------------------------------------------

        const introStart =
            performance.now();

        const introDuration = 3000;

        // --------------------------------------------------
        // SCROLL
        // --------------------------------------------------

        let targetScroll = 0;
        let smoothScroll = 0;

        const handleScroll = () => {
            const scrollDistance =
                window.innerHeight * 0.95;

            targetScroll =
                Math.min(
                    window.scrollY /
                    scrollDistance,
                    1
                );
        };

        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true,
            }
        );

        // --------------------------------------------------
        // MOUSE
        // --------------------------------------------------

        const mouse =
            new THREE.Vector2(
                0,
                0
            );

        const targetMouse =
            new THREE.Vector2(
                0,
                0
            );

        const handleMouseMove = (
            event: MouseEvent
        ) => {
            targetMouse.x =
                (event.clientX /
                    window.innerWidth -
                    0.5) *
                2;

            targetMouse.y =
                -(
                    (event.clientY /
                        window.innerHeight -
                        0.5) *
                    2
                );
        };

        window.addEventListener(
            "mousemove",
            handleMouseMove,
            {
                passive: true,
            }
        );

        // --------------------------------------------------
        // RESIZE
        // --------------------------------------------------

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
                    2
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

            updateScale();
        };

        window.addEventListener(
            "resize",
            handleResize
        );

        // --------------------------------------------------
        // ANIMATION
        // --------------------------------------------------

        let animationFrame = 0;

        const animate = () => {
            animationFrame =
                requestAnimationFrame(
                    animate
                );

            const now =
                performance.now();

            // ----------------------------------------------
            // INTRO FORMATION
            // ----------------------------------------------

            const introProgress =
                Math.min(
                    (now - introStart) /
                    introDuration,
                    1
                );

            material.uniforms.uFormation.value =
                introProgress;

            // ----------------------------------------------
            // SMOOTH SCROLL
            // ----------------------------------------------

            smoothScroll +=
                (targetScroll -
                    smoothScroll) *
                0.075;

            material.uniforms.uProgress.value =
                smoothScroll;

            // ----------------------------------------------
            // SMOOTH MOUSE
            // ----------------------------------------------

            mouse.lerp(
                targetMouse,
                0.045
            );

            // ----------------------------------------------
            // PARTICLE MOVEMENT
            // ----------------------------------------------

            particles.rotation.y +=
                (
                    mouse.x * 0.04 -
                    particles.rotation.y
                ) *
                0.025;

            particles.rotation.x +=
                (
                    mouse.y * 0.025 -
                    particles.rotation.x
                ) *
                0.025;

            // Slight cinematic movement
            particles.position.x +=
                (
                    mouse.x * 5 -
                    particles.position.x
                ) *
                0.008;

            particles.position.y +=
                (
                    mouse.y * 3 -
                    particles.position.y
                ) *
                0.008;

            // ----------------------------------------------
            // TIME
            // ----------------------------------------------

            material.uniforms.uTime.value =
                now * 0.001;

            // ----------------------------------------------
            // RENDER
            // ----------------------------------------------

            renderer.render(
                scene,
                camera
            );
        };

        animate();

        // --------------------------------------------------
        // CLEANUP
        // --------------------------------------------------

        return () => {
            cancelAnimationFrame(
                animationFrame
            );

            window.removeEventListener(
                "scroll",
                handleScroll
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
                zIndex: 3,
            }}
        />
    );
}