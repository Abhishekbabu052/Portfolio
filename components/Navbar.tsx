"use client";

const links = [
    {
        label: "About",
        target: "about",
    },
    {
        label: "Skills",
        target: "skills",
    },
    {
        label: "Work",
        target: "projects",
    },
    {
        label: "Contact",
        target: "contact",
    },
];

export default function Navbar() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);

        if (!element) return;

        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <nav
            className="floating-nav"
            aria-label="Main navigation"
        >
            {/* ========================================
          LOGO
      ======================================== */}

            <button
                type="button"
                className="nav-logo"
                onClick={scrollToTop}
                aria-label="Back to top"
            >
                AB
            </button>

            {/* ========================================
          NAVIGATION LINKS
      ======================================== */}

            <div className="nav-links">
                {links.map((link) => (
                    <button
                        key={link.target}
                        type="button"
                        onClick={() =>
                            scrollToSection(link.target)
                        }
                    >
                        {link.label}
                    </button>
                ))}
            </div>
        </nav>
    );
}