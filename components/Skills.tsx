"use client";

import { useRef, type MouseEvent } from "react";

const skillGroups = [
    {
        number: "01",
        title: "Languages",
        skills: ["Java", "C", "C++", "JavaScript"],
    },
    {
        number: "02",
        title: "Frontend",
        skills: [
            "HTML5",
            "CSS3",
            "React.js",
            "Next.js",
        ],
    },
    {
        number: "03",
        title: "Backend",
        skills: [
            "Node.js",
            "Express.js",
            "PHP",
            "REST APIs",
        ],
    },
    {
        number: "04",
        title: "Database",
        skills: [
            "SQL",
            "MySQL",
            "MongoDB",
        ],
    },
    {
        number: "05",
        title: "Concepts",
        skills: [
            "OOP",
            "Data Structures",
            "Algorithms",
        ],
    },
];

type SkillGroup = (typeof skillGroups)[number];

function SkillCard({
    group,
}: {
    group: SkillGroup;
}) {
    const cardRef =
        useRef<HTMLDivElement>(null);

    const handleMouseMove = (
        event: MouseEvent<HTMLDivElement>
    ) => {
        const card = cardRef.current;

        if (!card || window.innerWidth < 768) {
            return;
        }

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const percentX =
            x / rect.width;

        const percentY =
            y / rect.height;

        const rotateX =
            (percentY - 0.5) * -7;

        const rotateY =
            (percentX - 0.5) * 7;

        card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
    `;

        card.style.setProperty(
            "--mouse-x",
            `${x}px`
        );

        card.style.setProperty(
            "--mouse-y",
            `${y}px`
        );
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;

        if (!card) return;

        card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0)
    `;

        card.style.setProperty(
            "--mouse-x",
            "50%"
        );

        card.style.setProperty(
            "--mouse-y",
            "50%"
        );
    };

    return (
        <div
            ref={cardRef}
            className="skill-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Mouse glow */}
            <div
                className="skill-card-glow"
                aria-hidden="true"
            />

            {/* Card header */}
            <div className="skill-card-header">
                <span className="skill-number">
                    {group.number}
                </span>

                <span className="skill-card-title">
                    {group.title}
                </span>
            </div>

            {/* Skills */}
            <div className="skill-list">
                {group.skills.map((skill) => (
                    <span
                        key={skill}
                        className="skill-pill"
                    >
                        {skill}
                    </span>
                ))}
            </div>

            {/* Bottom line */}
            <div
                className="skill-card-line"
                aria-hidden="true"
            />
        </div>
    );
}

export default function Skills() {
    return (
        <section
            id="skills"
            className="skills-section"
        >
            <div className="skills-container">

                {/* Heading */}
                <div className="skills-heading">
                    <p className="section-label">
                        02 / Skills
                    </p>

                    <h2 className="section-title">
                        Tools I use to
                        <span> build things.</span>
                    </h2>
                </div>

                {/* Skill cards */}
                <div className="skills-grid">
                    {skillGroups.map((group) => (
                        <SkillCard
                            key={group.title}
                            group={group}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}