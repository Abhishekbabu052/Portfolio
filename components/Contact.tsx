"use client";

export default function Contact() {
    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <section
            className="contact-section"
            id="contact"
        >
            <div className="contact-container">

                {/* ========================================
            CONTACT CONTENT
        ======================================== */}

                <div className="contact-content">

                    <p className="section-label">
                        07 / Contact
                    </p>

                    <h2 className="contact-title">
                        Let&apos;s build
                        <br />
                        something <span>great.</span>
                    </h2>

                    <p className="contact-description">
                        Have an idea, opportunity, or project in mind?
                        I&apos;m always open to connecting and creating
                        something meaningful.
                    </p>

                    {/* Email */}
                    <a
                        href="mailto:babuabhishek052@gmail.com"
                        className="contact-email"
                    >
                        <span>
                            babuabhishek052@gmail.com
                        </span>

                        <span
                            className="contact-email-arrow"
                            aria-hidden="true"
                        >
                            ↗
                        </span>
                    </a>

                </div>


                {/* ========================================
            SOCIAL / EXTERNAL LINKS
        ======================================== */}

                <div className="contact-links">

                    <a
                        href="https://www.linkedin.com/in/abhishek-babu-655544282/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>LinkedIn</span>
                        <span aria-hidden="true">↗</span>
                    </a>

                    <a
                        href="https://github.com/Abhishekbabu052"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>GitHub</span>
                        <span aria-hidden="true">↗</span>
                    </a>

                    <a href="tel:+916282224160">
                        <span>Phone</span>
                        <span aria-hidden="true">↗</span>
                    </a>

                </div>


                {/* ========================================
            FOOTER
        ======================================== */}

                <footer className="portfolio-footer">

                    <span>
                        © {new Date().getFullYear()} Abhishek Babu
                    </span>

                    <span>
                        Built with React + Three.js
                    </span>

                    <button
                        type="button"
                        className="back-to-top"
                        onClick={handleBackToTop}
                    >
                        BACK TO TOP ↑
                    </button>

                </footer>

            </div>
        </section>
    );
}
