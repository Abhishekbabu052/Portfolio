"use client";

import { useRef, type MouseEvent } from "react";

export default function Experience() {
    const cardRef = useRef<HTMLDivElement>(null);

    // ========================================
    // 3D CARD MOUSE MOVE
    // ========================================

    const handleMouseMove = (
        e: MouseEvent<HTMLDivElement>
    ) => {
        const card = cardRef.current;

        if (!card) return;

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY =
            ((x - rect.width / 2) / rect.width) * 4;

        const rotateX =
            -((y - rect.height / 2) / rect.height) * 4;

        card.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(0)
    `;

        card.style.setProperty(
            "--experience-x",
            `${x}px`
        );

        card.style.setProperty(
            "--experience-y",
            `${y}px`
        );
    };

    // ========================================
    // RESET CARD
    // ========================================

    const handleMouseLeave = () => {
        const card = cardRef.current;

        if (!card) return;

        card.style.transform = `
      perspective(1200px)
      rotateX(0deg)
      rotateY(0deg)
      translateZ(0)
    `;
    };

    return (
        <section
            id="experience"
            className="experience-section"
        >
            <div className="experience-container">

                {/* ====================================
            HEADING
        ==================================== */}

                <div className="experience-heading">
                    <p className="section-label">
                        04 / Experience
                    </p>

                    <h2 className="section-title">
                        Where I&apos;ve
                        <span> worked.</span>
                    </h2>
                </div>

                {/* ====================================
            TIMELINE
        ==================================== */}

                <div className="experience-timeline">

                    {/* Timeline line */}
                    <div className="experience-line">
                        <span
                            className="experience-dot"
                            aria-hidden="true"
                        />
                    </div>

                    {/* Experience card */}
                    <div
                        ref={cardRef}
                        className="experience-card"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >

                        {/* Mouse-following glow */}
                        <div
                            className="experience-glow"
                            aria-hidden="true"
                        />

                        {/* ==================================
                TOP
            ================================== */}

                        <div className="experience-top">
                            <div>
                                <p className="experience-company">
                                    SMEC Technologies
                                </p>

                                <h3 className="experience-role">
                                    Full Stack Development Intern
                                </h3>
                            </div>

                            <span className="experience-index">
                                01
                            </span>
                        </div>

                        {/* ==================================
                DESCRIPTION
            ================================== */}

                        <p className="experience-description">
                            Worked on full-stack web development
                            using modern JavaScript technologies,
                            building practical applications and
                            working with frontend and backend
                            development.
                        </p>

                        {/* ==================================
                TECHNOLOGY STACK
            ================================== */}

                        <div className="experience-stack">
                            <span>React.js</span>
                            <span>Node.js</span>
                            <span>Express.js</span>
                            <span>REST APIs</span>
                            <span>JWT</span>
                            <span>Redux Toolkit</span>
                            <span>Tailwind CSS</span>
                        </div>

                        {/* ==================================
                FOOTER
            ================================== */}

                        <div className="experience-footer">
                            <span>
                                FULL STACK DEVELOPMENT
                            </span>

                            <span
                                className="experience-arrow"
                                aria-hidden="true"
                            >
                                ↗
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}