"use client";

import { useRef, type MouseEvent } from "react";

const projects = [
    {
        number: "01",
        title: "Nexera",
        description:
            "Android habit tracker designed for daily tracking, progress analytics and scheduled notifications.",
        technologies: ["Android", "SQLite", "Material UI"],
        liveUrl: "https://github.com/Abhishekbabu052/Nexera",
        githubUrl: "https://github.com/Abhishekbabu052/Nexera",
    },
    {
        number: "02",
        title: "E-Commerce Platform",
        description:
            "A web application for browsing and purchasing products with authentication and product management.",
        technologies: ["PHP", "SQL", "MySQL", "HTML/CSS"],
        liveUrl: "https://github.com/Abhishekbabu052/zoro-products",
        githubUrl: "https://github.com/Abhishekbabu052/zoro-products",
    },
    {
        number: "03",
        title: "Medical Store Management System",
        description:
            "A management system for tracking inventory and stock with real-time updates and CRUD operations.",
        technologies: ["PHP", "MySQL", "CRUD"],
        liveUrl: "https://medkart.42web.io/",
        githubUrl: "https://github.com/Abhishekbabu052/Medikart",
    },
    {
        number: "04",
        title: "Memory Game App",
        description:
            "An Android memory and quiz game featuring mathematics and science challenges with gamified rewards.",
        technologies: ["Android", "Java", "Game Logic"],
        liveUrl: "https://github.com/Abhishekbabu052/MemoryGame",
        githubUrl: "https://github.com/Abhishekbabu052/MemoryGame",
    },
    {
        number: "05",
        title: "Artex – Task Scheduler",
        description:
            "A task scheduling application for planning work and staying on top of daily priorities.",
        technologies: ["Task Management", "Scheduling"],
        liveUrl: "https://github.com/Abhishekbabu052/Artex",
        githubUrl: "https://github.com/Abhishekbabu052/Artex",
    },
];

type Project = (typeof projects)[number];

function ProjectCard({ project }: { project: Project }) {
    const cardRef = useRef<HTMLElement>(null);

    const handleMove = (event: MouseEvent<HTMLElement>) => {
        const card = cardRef.current;

        if (!card || window.innerWidth < 768) return;

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const percentX = x / rect.width;
        const percentY = y / rect.height;

        const rotateX = (percentY - 0.5) * -6;
        const rotateY = (percentX - 0.5) * 6;

        card.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
    `;

        card.style.setProperty(
            "--mouse-x",
            `${percentX * 100}%`
        );

        card.style.setProperty(
            "--mouse-y",
            `${percentY * 100}%`
        );
    };

    const handleLeave = () => {
        const card = cardRef.current;

        if (!card) return;

        card.style.transform = `
      perspective(1200px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0)
    `;

        card.style.setProperty("--mouse-x", "50%");
        card.style.setProperty("--mouse-y", "50%");
    };

    return (
        <article
            ref={cardRef}
            className="project-card"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
        >
            {/* Number */}
            <div className="project-number">
                {project.number}
            </div>

            {/* Main content */}
            <div className="project-main">
                <div className="project-content">
                    <h3 className="project-title">
                        {project.title}
                    </h3>

                    <p className="project-description">
                        {project.description}
                    </p>
                </div>

                {/* Technologies */}
                <div className="project-technologies">
                    {project.technologies.map((technology) => (
                        <span
                            key={technology}
                            className="project-tech"
                        >
                            {technology}
                        </span>
                    ))}
                </div>

                <div className="project-links" aria-label={`${project.title} links`}>
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Live ↗
                    </a>
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub ↗
                    </a>
                </div>
            </div>

            {/* Arrow */}
            <div
                className="project-arrow"
                aria-hidden="true"
            >
                ↗
            </div>

            {/* Hover glow */}
            <div
                className="project-hover-glow"
                aria-hidden="true"
            />
        </article>
    );
}

export default function Projects() {
    return (
        <section
            id="projects"
            className="projects-section"
        >
            <div className="projects-container">

                {/* Heading */}
                <div className="projects-heading">
                    <p className="section-label">
                        03 / Projects
                    </p>

                    <h2 className="section-title">
                        Selected
                        <span> work.</span>
                    </h2>
                </div>

                {/* Project list */}
                <div className="project-list">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.number}
                            project={project}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
