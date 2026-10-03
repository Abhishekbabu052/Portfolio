"use client";

const certifications = [
    {
        number: "01",
        title: "Full Stack Development",
        issuer: "Illinois Tech — USA",
        focus: "MERN Stack",
        url: "https://www.credly.com/badges/66602066-267a-4829-92d6-e1d31a960335/print",
    },
    {
        number: "02",
        title: "Full Stack Development",
        issuer: "NSDC",
        focus: "Full Stack",
        url: "https://certificate.entri.app/?ref=J9OIOSR-OHIVF",
    },
    {
        number: "03",
        title: "Data Structures and Algorithms",
        issuer: "Certification",
        focus: "DSA",
        url: "https://i.ibb.co/LD2zPkJW/DSA.png",
    },
    {
        number: "04",
        title: "Legacy JavaScript Algorithms and Data Structures V8",
        issuer: "freeCodeCamp",
        focus: "JavaScript",
        url: "https://freecodecamp.org/certification/abhishekbabu/javascript-algorithms-and-data-structures-v8",
    },
];

export default function Certifications() {
    return (
        <section
            id="certifications"
            className="certifications-section"
        >
            <div className="certifications-container">

                {/* ========================================
            HEADING
        ======================================== */}

                <div className="certifications-heading">
                    <p className="section-label">
                        05 / Certifications
                    </p>

                    <h2 className="section-title">
                        Learning that
                        <span> keeps moving.</span>
                    </h2>
                </div>

                {/* ========================================
            CERTIFICATION LIST
        ======================================== */}

                <div className="certifications-list">
                    {certifications.map((cert) => (
                        <a
                            className="certificate-item"
                            key={cert.number}
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {/* Number */}
                            <span className="certificate-number">
                                {cert.number}
                            </span>

                            {/* Main information */}
                            <div className="certificate-main">
                                <h3>{cert.title}</h3>

                                <p>{cert.issuer}</p>
                            </div>

                            {/* Technology / focus */}
                            <span className="certificate-focus">
                                {cert.focus}
                            </span>

                            {/* Arrow */}
                            <span
                                className="certificate-arrow"
                                aria-hidden="true"
                            >
                                ↗
                            </span>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
}
