"use client";

export default function Education() {
    return (
        <section
            id="education"
            className="education-section"
        >
            <div className="education-container">

                {/* ========================================
            HEADING
        ======================================== */}

                <div className="education-heading">
                    <p className="section-label">
                        06 / Education
                    </p>

                    <h2 className="section-title">
                        Foundations
                        <span> matter.</span>
                    </h2>
                </div>

                {/* ========================================
            EDUCATION CARD
        ======================================== */}

                <article className="education-card">

                    {/* Year */}
                    <div className="education-year">
                        2023 — 2026
                    </div>

                    {/* Education details */}
                    <div className="education-content">

                        <p className="education-degree">
                            Bachelor of Computer Applications
                        </p>

                        <h3>
                            BCA
                        </h3>

                        <p className="education-institution">
                            Mahatma Gandhi University
                        </p>

                    </div>

                    {/* Decorative symbol */}
                    <div
                        className="education-symbol"
                        aria-hidden="true"
                    >
                        +
                    </div>

                </article>

            </div>
        </section>
    );
}