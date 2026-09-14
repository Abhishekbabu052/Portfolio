"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CUBE_SIZE = 2.55;

const phases = [
    {
        label: "01",
        title: "LinkedIn",
        subtitle: "Professional network",
        url: "https://www.linkedin.com/in/abhishek-babu-655544282/",
    },
    {
        label: "02",
        title: "GitHub",
        subtitle: "Code & projects",
        url: "https://github.com/Abhishekbabu052",
    },
    {
        label: "03",
        title: "Gmail",
        subtitle: "babuabhishek052@gmail.com",
        url: "mailto:babuabhishek052@gmail.com",
    },
    {
        label: "04",
        title: "Phone",
        subtitle: "6282224160",
        url: "tel:+916282224160",
    },
    {
        label: "05",
        title: "Portfolio",
        subtitle: "Digital portfolio",
        url: "",
    },
    {
        label: "06",
        title: "Abhishek",
        subtitle: "Software Developer",
        url: "",
    },
];

function createFaceTexture(
    label: string,
    title: string,
    subtitle: string
) {
    const canvas = document.createElement("canvas");

    canvas.width = 1024;
    canvas.height = 1024;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return new THREE.CanvasTexture(canvas);
    }

    /* Background */

    const gradient = ctx.createLinearGradient(
        0,
        0,
        1024,
        1024
    );

    gradient.addColorStop(0, "#181715");
    gradient.addColorStop(0.5, "#080808");
    gradient.addColorStop(1, "#020304");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1024);

    /* Center glow */

    const glow = ctx.createRadialGradient(
        512,
        500,
        30,
        512,
        500,
        500
    );

    glow.addColorStop(
        0,
        "rgba(255,255,255,0.11)"
    );

    glow.addColorStop(
        0.45,
        "rgba(255,255,255,0.025)"
    );

    glow.addColorStop(
        1,
        "rgba(255,255,255,0)"
    );

    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 1024, 1024);

    /* Inner border */

    ctx.strokeStyle =
        "rgba(255,255,255,0.16)";

    ctx.lineWidth = 4;

    ctx.strokeRect(
        35,
        35,
        954,
        954
    );

    /* Number */

    ctx.textAlign = "left";

    ctx.font =
        "400 32px 'DM Mono', monospace";

    ctx.fillStyle =
        "rgba(255,255,255,0.28)";

    ctx.fillText(
        label,
        75,
        90
    );

    /* Small line */

    ctx.strokeStyle =
        "rgba(255,255,255,0.14)";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(75, 120);
    ctx.lineTo(220, 120);

    ctx.stroke();

    /* Main title */

    ctx.textAlign = "center";

    ctx.font =
        "500 72px 'Manrope', sans-serif";

    ctx.fillStyle =
        "rgba(255,255,255,0.93)";

    ctx.fillText(
        title,
        512,
        515
    );

    /* Subtitle */

    ctx.font =
        "400 23px 'DM Mono', monospace";

    ctx.fillStyle =
        "rgba(255,255,255,0.35)";

    ctx.fillText(
        subtitle,
        512,
        570
    );

    /* Bottom information */

    ctx.textAlign = "left";

    ctx.font =
        "300 19px 'Manrope', sans-serif";

    ctx.fillStyle =
        "rgba(255,255,255,0.22)";

    ctx.fillText(
        "ABHISHEK BABU",
        75,
        935
    );

    ctx.textAlign = "right";

    ctx.font =
        "400 17px 'DM Mono', monospace";

    ctx.fillStyle =
        "rgba(255,255,255,0.18)";

    ctx.fillText(
        "06 DIMENSIONS",
        949,
        935
    );

    const texture =
        new THREE.CanvasTexture(canvas);

    texture.colorSpace =
        THREE.SRGBColorSpace;

    texture.anisotropy = 4;

    return texture;
}

export default function DimensionalCube() {
    const mountRef =
        useRef<HTMLDivElement>(null);

    const sectionRef =
        useRef<HTMLElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        const section = sectionRef.current;

        if (!mount || !section) return;

        /* =====================================================
           SCENE
           ===================================================== */

        const scene = new THREE.Scene();

        const camera =
            new THREE.PerspectiveCamera(
                42,
                mount.clientWidth /
                mount.clientHeight,
                0.1,
                100
            );

        camera.position.set(
            0,
            0,
            7
        );

        /* =====================================================
           RENDERER
           ===================================================== */

        const renderer =
            new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                powerPreference:
                    "high-performance",
            });

        const pixelRatio =
            Math.min(
                window.devicePixelRatio,
                1.5
            );

        renderer.setPixelRatio(
            pixelRatio
        );

        renderer.setSize(
            mount.clientWidth,
            mount.clientHeight
        );

        renderer.outputColorSpace =
            THREE.SRGBColorSpace;

        renderer.toneMapping =
            THREE.ACESFilmicToneMapping;

        renderer.toneMappingExposure =
            1.1;

        renderer.domElement.style.width =
            "100%";

        renderer.domElement.style.height =
            "100%";

        renderer.domElement.style.display =
            "block";

        mount.appendChild(
            renderer.domElement
        );

        /* =====================================================
           LIGHTS
           ===================================================== */

        const ambient =
            new THREE.AmbientLight(
                0xffffff,
                1.8
            );

        scene.add(ambient);

        const keyLight =
            new THREE.DirectionalLight(
                0xffffff,
                3
            );

        keyLight.position.set(
            4,
            5,
            7
        );

        scene.add(keyLight);

        const warmLight =
            new THREE.PointLight(
                0xffdca0,
                6,
                14
            );

        warmLight.position.set(
            -4,
            2,
            5
        );

        scene.add(warmLight);

        /* =====================================================
           CUBE
           ===================================================== */

        const cube =
            new THREE.Group();

        scene.add(cube);

        const cubeGeometry =
            new RoundedBoxGeometry(
                CUBE_SIZE,
                CUBE_SIZE,
                CUBE_SIZE,
                8,
                0.15
            );

        const cubeMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x080808,
                roughness: 0.2,
                metalness: 0.6,
            });

        const cubeBody =
            new THREE.Mesh(
                cubeGeometry,
                cubeMaterial
            );

        cube.add(cubeBody);

        /* =====================================================
           GOLD EDGE
           ===================================================== */

        const edgeGeometry =
            new THREE.EdgesGeometry(
                cubeGeometry
            );

        const edgeMaterial =
            new THREE.LineBasicMaterial({
                color: 0xcab982,
                transparent: true,
                opacity: 0.7,
            });

        const edges =
            new THREE.LineSegments(
                edgeGeometry,
                edgeMaterial
            );

        cube.add(edges);

        /* =====================================================
           FACE TEXTURES
           ===================================================== */

        const textures =
            phases.map((phase) =>
                createFaceTexture(
                    phase.label,
                    phase.title,
                    phase.subtitle
                )
            );

        const materials =
            textures.map(
                (texture) =>
                    new THREE.MeshBasicMaterial({
                        map: texture,
                        transparent: true,
                        opacity: 0.95,
                        side: THREE.FrontSide,
                    })
            );

        const faceGroup =
            new THREE.Group();

        cube.add(faceGroup);

        const faceSize =
            CUBE_SIZE * 0.9;

        const clickableFaces: THREE.Mesh[] = [];

        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();

        const createFace = (
            material: THREE.Material,
            position: THREE.Vector3,
            rotation: THREE.Euler,
            url: string
        ) => {
            const geometry =
                new THREE.PlaneGeometry(
                    faceSize,
                    faceSize
                );

            const face =
                new THREE.Mesh(
                    geometry,
                    material
                );

            face.position.copy(position);

            face.rotation.copy(rotation);

            face.userData.url = url;

            faceGroup.add(face);

            if (url) clickableFaces.push(face);

            return face;
        };

        /* Front */

        createFace(
            materials[0],
            new THREE.Vector3(
                0,
                0,
                CUBE_SIZE / 2 + 0.012
            ),
            new THREE.Euler(
                0,
                0,
                0
            ),
            phases[0].url
        );

        /* Right */

        createFace(
            materials[1],
            new THREE.Vector3(
                CUBE_SIZE / 2 + 0.012,
                0,
                0
            ),
            new THREE.Euler(
                0,
                Math.PI / 2,
                0
            ),
            phases[1].url
        );

        /* Back */

        createFace(
            materials[2],
            new THREE.Vector3(
                0,
                0,
                -CUBE_SIZE / 2 - 0.012
            ),
            new THREE.Euler(
                0,
                Math.PI,
                0
            ),
            phases[2].url
        );

        /* Left */

        createFace(
            materials[3],
            new THREE.Vector3(
                -CUBE_SIZE / 2 - 0.012,
                0,
                0
            ),
            new THREE.Euler(
                0,
                -Math.PI / 2,
                0
            ),
            phases[3].url
        );

        /* Top */

        createFace(
            materials[4],
            new THREE.Vector3(
                0,
                CUBE_SIZE / 2 + 0.012,
                0
            ),
            new THREE.Euler(
                -Math.PI / 2,
                0,
                0
            ),
            phases[4].url
        );

        /* Bottom */

        createFace(
            materials[5],
            new THREE.Vector3(
                0,
                -CUBE_SIZE / 2 - 0.012,
                0
            ),
            new THREE.Euler(
                Math.PI / 2,
                0,
                0
            ),
            phases[5].url
        );

        /* =====================================================
           PARTICLES
           ===================================================== */

        const particleCount = 500;

        const positions =
            new Float32Array(
                particleCount * 3
            );

        for (
            let i = 0;
            i < particleCount;
            i++
        ) {
            const i3 = i * 3;

            const radius =
                3.8 +
                Math.random() * 3.5;

            const theta =
                Math.random() *
                Math.PI *
                2;

            const phi =
                Math.acos(
                    2 * Math.random() - 1
                );

            positions[i3] =
                radius *
                Math.sin(phi) *
                Math.cos(theta);

            positions[i3 + 1] =
                radius *
                Math.sin(phi) *
                Math.sin(theta);

            positions[i3 + 2] =
                radius *
                Math.cos(phi);
        }

        const particleGeometry =
            new THREE.BufferGeometry();

        particleGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                positions,
                3
            )
        );

        const particleMaterial =
            new THREE.PointsMaterial({
                color: 0xffffff,
                size: 0.018,
                transparent: true,
                opacity: 0.28,
                depthWrite: false,
            });

        const particles =
            new THREE.Points(
                particleGeometry,
                particleMaterial
            );

        scene.add(particles);

        /* =====================================================
           MOUSE DRAG CONTROL
           ===================================================== */

        let isDragging = false;

        let previousX = 0;
        let previousY = 0;
        let dragDistance = 0;

        const mouseRotation = {
            x: 0,
            y: 0,
        };

        const mouseVelocity = {
            x: 0,
            y: 0,
        };

        const handlePointerDown = (
            event: PointerEvent
        ) => {
            isDragging = true;

            previousX =
                event.clientX;

            previousY =
                event.clientY;

            dragDistance = 0;

            renderer.domElement.setPointerCapture(
                event.pointerId
            );

            renderer.domElement.style.cursor =
                "grabbing";
        };

        const handlePointerMove = (
            event: PointerEvent
        ) => {
            if (!isDragging) return;

            const deltaX =
                event.clientX -
                previousX;

            const deltaY =
                event.clientY -
                previousY;

            dragDistance += Math.abs(deltaX) + Math.abs(deltaY);

            previousX =
                event.clientX;

            previousY =
                event.clientY;

            const sensitivity =
                0.009;

            mouseVelocity.y =
                deltaX * sensitivity;

            mouseVelocity.x =
                deltaY * sensitivity;

            mouseRotation.y +=
                deltaX * sensitivity;

            mouseRotation.x +=
                deltaY * sensitivity;

            /*
              Keep vertical rotation
              within a reasonable range.
            */

            mouseRotation.x =
                THREE.MathUtils.clamp(
                    mouseRotation.x,
                    -Math.PI * 1.5,
                    Math.PI * 1.5
                );
        };

        const handlePointerUp = (
            event: PointerEvent
        ) => {
            isDragging = false;

            try {
                renderer.domElement.releasePointerCapture(
                    event.pointerId
                );
            } catch { }

            if (dragDistance < 8) {
                const rect = renderer.domElement.getBoundingClientRect();

                pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

                raycaster.setFromCamera(pointer, camera);

                const hit = raycaster.intersectObjects(clickableFaces, false)[0];
                const url = hit?.object.userData.url as string | undefined;

                if (url) {
                    if (url.startsWith("http")) {
                        window.open(url, "_blank", "noopener,noreferrer");
                    } else {
                        window.location.href = url;
                    }
                }
            }

            renderer.domElement.style.cursor = "grab";
        };

        renderer.domElement.style.cursor =
            "grab";

        renderer.domElement.addEventListener(
            "pointerdown",
            handlePointerDown
        );

        renderer.domElement.addEventListener(
            "pointermove",
            handlePointerMove
        );

        renderer.domElement.addEventListener(
            "pointerup",
            handlePointerUp
        );

        renderer.domElement.addEventListener(
            "pointercancel",
            handlePointerUp
        );

        /* =====================================================
           SCROLL PHASE
           ===================================================== */

        const phaseState = {
            value: 0,
        };

        const scrollAnimation =
            gsap.to(phaseState, {
                value: 5,

                ease: "none",

                scrollTrigger: {
                    trigger: section,

                    start: "top top",

                    end: "bottom bottom",

                    scrub: 1,

                    snap: {
                        snapTo: 1 / 5,

                        duration: {
                            min: 0.2,
                            max: 0.5,
                        },

                        ease:
                            "power2.inOut",
                    },
                },
            });

        /* =====================================================
           RESIZE
           ===================================================== */

        const handleResize = () => {
            const width =
                mount.clientWidth;

            const height =
                mount.clientHeight;

            camera.aspect =
                width / height;

            camera.updateProjectionMatrix();

            renderer.setSize(
                width,
                height
            );
        };

        window.addEventListener(
            "resize",
            handleResize
        );

        /* =====================================================
           ANIMATION
           ===================================================== */

        const clock =
            new THREE.Clock();

        let animationFrame = 0;

        const rotations = [
            {
                x: -0.12,
                y: 0,
            },
            {
                x: -0.12,
                y: -Math.PI / 2,
            },
            {
                x: -0.12,
                y: -Math.PI,
            },
            {
                x: -0.12,
                y: -Math.PI * 1.5,
            },
            {
                x: Math.PI / 2 - 0.12,
                y: 0,
            },
            {
                x: -Math.PI / 2 + 0.12,
                y: 0,
            },
        ];

        const animate = () => {
            animationFrame =
                requestAnimationFrame(
                    animate
                );

            const time =
                clock.getElapsedTime();

            /* ================================================
               SCROLL ROTATION
               ================================================ */

            const phase =
                THREE.MathUtils.clamp(
                    phaseState.value,
                    0,
                    5
                );

            const index =
                Math.floor(phase);

            const nextIndex =
                Math.min(
                    index + 1,
                    5
                );

            const blend =
                phase - index;

            const current =
                rotations[index];

            const next =
                rotations[nextIndex];

            const scrollX =
                THREE.MathUtils.lerp(
                    current.x,
                    next.x,
                    blend
                );

            const scrollY =
                THREE.MathUtils.lerp(
                    current.y,
                    next.y,
                    blend
                );

            /* ================================================
               MOUSE INERTIA
               ================================================ */

            if (!isDragging) {
                mouseRotation.x +=
                    mouseVelocity.x * 0.96;

                mouseRotation.y +=
                    mouseVelocity.y * 0.96;

                mouseVelocity.x *= 0.94;
                mouseVelocity.y *= 0.94;
            }

            /* ================================================
               FINAL ROTATION
               ================================================ */

            cube.rotation.x =
                scrollX +
                mouseRotation.x;

            cube.rotation.y =
                scrollY +
                mouseRotation.y;

            /*
              Very subtle floating movement.
              Disabled while dragging.
            */

            if (!isDragging) {
                cube.position.y =
                    Math.sin(
                        time * 0.8
                    ) * 0.06;

                cube.rotation.z =
                    Math.sin(
                        time * 0.35
                    ) * 0.012;
            } else {
                cube.position.y = 0;

                cube.rotation.z = 0;
            }

            /* Particle movement */

            particles.rotation.y =
                time * 0.012;

            particles.rotation.x =
                Math.sin(
                    time * 0.15
                ) * 0.04;

            renderer.render(
                scene,
                camera
            );
        };

        animate();

        /* =====================================================
           CLEANUP
           ===================================================== */

        return () => {
            cancelAnimationFrame(
                animationFrame
            );

            scrollAnimation.kill();

            window.removeEventListener(
                "resize",
                handleResize
            );

            renderer.domElement.removeEventListener(
                "pointerdown",
                handlePointerDown
            );

            renderer.domElement.removeEventListener(
                "pointermove",
                handlePointerMove
            );

            renderer.domElement.removeEventListener(
                "pointerup",
                handlePointerUp
            );

            renderer.domElement.removeEventListener(
                "pointercancel",
                handlePointerUp
            );

            textures.forEach((texture) =>
                texture.dispose()
            );

            materials.forEach((material) =>
                material.dispose()
            );

            cubeGeometry.dispose();
            cubeMaterial.dispose();

            edgeGeometry.dispose();
            edgeMaterial.dispose();

            particleGeometry.dispose();
            particleMaterial.dispose();

            renderer.dispose();

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
        <section
            ref={sectionRef}
            id="dimensional-cube"
            className="dimensional-cube-section"
        >
            <div className="dimensional-cube-sticky">

                {/* HEADER */}



                {/* THREE.JS */}

                <div
                    ref={mountRef}
                    className="dimensional-cube-canvas"
                />

                {/* PHASE */}

                <div className="cube-phase-indicator">
                    <span>01</span>

                    <div className="cube-phase-line">
                        <div className="cube-phase-progress" />
                    </div>

                    <span>06</span>
                </div>

                {/* FOOTER */}

                <div className="cube-bottom-label">
                    <span>SIX PHASES</span>

                    <span>ONE DEVELOPER</span>
                </div>

            </div>
        </section>
    );
}
