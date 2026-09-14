"use client";

import AstraBackground from "@/components/AstraBackground";
import ParticleName from "@/components/ParticleName";
import Navbar from "@/components/Navbar";

import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import DimensionalCube from "@/components/DimensionalCube";

export default function Home() {
  return (
    <>
      {/* ========================================
          3D ASTRA BACKGROUND
      ======================================== */}
      <AstraBackground />

      {/* ========================================
          NAVIGATION
      ======================================== */}
      <Navbar />

      {/* ========================================
          PARTICLE NAME
          The name is rendered by Three.js
      ======================================== */}
      <ParticleName />

      {/* ========================================
          MAIN PORTFOLIO
      ======================================== */}
      <main>
        {/* ======================================
            HERO SECTION
        ====================================== */}
        <section className="hero-section">
          <div className="hero-content">

            {/* Top information */}


            {/* ==================================
                PARTICLE NAME IS IN THE CENTER

                ParticleName.tsx handles:
                - Name formation
                - Particle animation
                - Mouse interaction
                - Scroll disappearance
            ================================== */}

            {/* Developer role */}
            <div className="hero-role">
              <span>SOFTWARE DEVELOPER</span>
            </div>

            {/* Hero description */}
            <p className="hero-description">
              Building clean digital experiences
              <br />
              where code meets creativity.
            </p>

            {/* Scroll indicator */}
            <div className="hero-scroll">
              <span className="hero-scroll-line" />

              <span>SCROLL TO EXPLORE</span>

              <span className="hero-scroll-arrow">↓</span>
            </div>
          </div>
        </section>

        {/* ======================================
            PORTFOLIO CONTENT

            The content appears below the
            particle-name hero.

            On scroll:
            ParticleName fades/spreads away
            and these sections become visible.
        ====================================== */}
        <div className="portfolio-content">

          {/* ABOUT */}
          <About />

          {/* SKILLS */}
          <Skills />

          {/* PROJECTS */}
          <Projects />

          {/* EXPERIENCE */}
          <Experience />

          {/* CERTIFICATIONS */}
          <Certifications />

          {/* EDUCATION */}
          <Education />

          {/* CONTACT */}
          <Contact />
          <DimensionalCube />

        </div>
      </main>
    </>
  );
}