"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const items = section.querySelectorAll(".about-reveal");

        const animation = gsap.fromTo(
            items,
            {
                opacity: 0,
                y: 30,
                filter: "blur(8px)",
            },
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1,
                stagger: 0.14,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    once: true,
                },
            }
        );

        return () => {
            animation.kill();
        };
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="portfolio-section about-section"
        >
            <div className="about-container">
                {/* Section label */}
                <div className="about-reveal about-label">
                    <span>01</span>
                    <span>ABOUT ME</span>
                </div>

                {/* Main heading */}
                <h2 className="about-reveal about-title">
                    I build digital experiences
                    <span> where code meets creativity.</span>
                </h2>

                {/* Description */}
                <div className="about-description">
                    <p className="about-reveal">
                        I&apos;m an entry-level software developer with strong computer
                        science fundamentals, focused on building clean, maintainable and
                        practical applications.
                    </p>

                    <p className="about-reveal">
                        My interests span full-stack development, modern web technologies,
                        databases and interactive digital experiences.
                    </p>
                </div>

                {/* Information */}
                <div className="about-reveal about-info">
                    <div className="about-info-item">
                        <span>FOCUS</span>
                        <strong>Full Stack</strong>
                    </div>

                    <div className="about-info-item">
                        <span>EDUCATION</span>
                        <strong>BCA</strong>
                    </div>

                    <div className="about-info-item">
                        <span>BASED</span>
                        <strong>India</strong>
                    </div>
                </div>
            </div>
        </section>
    );
}