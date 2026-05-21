import { useState, useEffect, useRef } from "react";
import heroVideo from "../assets/vedios/hero.mp4";
import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";
import image4 from "../assets/images/image4.png";

const NAV_LINKS = [
  "Studio",
  "Portfolio",
  "Services",
  "Process",
  "Journal",
  "Contact",
];

const STATS = [
  { value: "340+", label: "Projects Completed" },
  { value: "18", label: "Years of Excellence" },
  { value: "62", label: "Design Awards" },
  { value: "29", label: "Countries Served" },
];

const SERVICES = [
  {
    num: "01",
    title: "Residential Design",
    desc: "Bespoke living environments crafted around the soul of your daily life. Every corner whispers intention.",
    tag: "Homes & Villas",
  },
  {
    num: "02",
    title: "Commercial Spaces",
    desc: "Environments that command presence. Offices, hotels, and retail spaces that define their own category.",
    tag: "Offices & Hotels",
  },
  {
    num: "03",
    title: "Concept & Styling",
    desc: "From moodboard to materialisation. Full art direction for shoots, events, and experiential spaces.",
    tag: "Styling & Direction",
  },
  {
    num: "04",
    title: "Bespoke Furniture",
    desc: "Custom-commissioned pieces that no catalogue can offer. Designed for the space. Built to outlive trends.",
    tag: "Custom Pieces",
  },
];

const PORTFOLIO = [
  {
    title: "The Obsidian Suite",
    city: "Dubai",
    year: "2024",
    size: "large",
    image: image1,
  },
  {
    title: "Maison Céleste",
    city: "Paris",
    year: "2024",
    size: "small",
    image: image2,
  },
  {
    title: "Casa Aurea",
    city: "Milan",
    year: "2023",
    size: "small",
    image: image3,
  },
  {
    title: "The Glass Pavilion",
    city: "Tokyo",
    year: "2023",
    size: "large",
    image: image4,
  },
];

const PROCESS = [
  {
    step: "I",
    title: "Discovery",
    text: "A deep immersion into your world — your rituals, aspirations, and the feeling you want to inhabit.",
  },
  {
    step: "II",
    title: "Concept",
    text: "A singular creative direction emerges. Mood, palette, materiality, and spatial narrative are defined.",
  },
  {
    step: "III",
    title: "Design",
    text: "Every millimetre is resolved. Technical drawings, custom furniture design, and material specification.",
  },
  {
    step: "IV",
    title: "Realisation",
    text: "We orchestrate artisans, contractors, and suppliers — managing every detail through to the final reveal.",
  },
];

const JOURNAL = [
  {
    cat: "Material Study",
    title: "The Quiet Power of Raw Travertine",
    date: "May 2025",
  },
  {
    cat: "Essay",
    title: "Why Silence Is the Ultimate Luxury",
    date: "April 2025",
  },
  {
    cat: "Project",
    title: "Inside the Obsidian Suite, Dubai",
    date: "March 2025",
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };
    const onLeave = () => setCursorVisible(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 },
    );
    document
      .querySelectorAll("[data-animate]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close menu on scroll
  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
  }, [scrollY]);

  const navBg = scrollY > 60 ? "rgba(8,6,4,0.95)" : "transparent";
  const navBlur = scrollY > 60 ? "blur(24px)" : "none";

  return (
    <div
      style={{
        fontFamily: "'Cormorant Garamond', 'Didot', 'Times New Roman', serif",
        background: "#080604",
        color: "#f0ebe4",
        overflowX: "hidden",
        cursor: isMobile ? "auto" : "none",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Josefin+Sans:wght@100;200;300;400&display=swap"
        rel="stylesheet"
      />

      {/* Custom cursor — desktop only */}
      {!isMobile && (
        <>
          <div
            style={{
              position: "fixed",
              left: cursor.x,
              top: cursor.y,
              width: hovering ? 56 : 12,
              height: hovering ? 56 : 12,
              borderRadius: "50%",
              background: hovering ? "transparent" : "#c8a96e",
              border: hovering ? "1px solid #c8a96e" : "none",
              transform: "translate(-50%, -50%)",
              transition: "width 0.3s ease, height 0.3s ease, background 0.3s ease",
              pointerEvents: "none",
              zIndex: 9999,
              opacity: cursorVisible ? 1 : 0,
              mixBlendMode: hovering ? "normal" : "difference",
            }}
          />
          <div
            style={{
              position: "fixed",
              left: cursor.x,
              top: cursor.y,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#c8a96e",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 10000,
              opacity: cursorVisible && hovering ? 1 : 0,
              transition: "opacity 0.2s",
            }}
          />
        </>
      )}

      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: menuOpen ? "rgba(8,6,4,0.98)" : navBg,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          borderBottom:
            scrollY > 60 || menuOpen ? "1px solid rgba(200,169,110,0.12)" : "none",
          transition: "background 0.5s ease, border 0.5s ease",
          padding: isMobile ? "0 1.25rem" : "0 3rem",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "'Josefin Sans', sans-serif",
            fontWeight: 100,
            fontSize: isMobile ? "14px" : "15px",
            letterSpacing: "0.35em",
            color: "#c8a96e",
            textTransform: "uppercase",
            cursor: "pointer",
            flexShrink: 0,
          }}
          onMouseEnter={() => !isMobile && setHovering(true)}
          onMouseLeave={() => !isMobile && setHovering(false)}
        >
          AURUM
          <span style={{ color: "#f0ebe4", marginLeft: "2px" }}>STUDIO</span>
        </div>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  color: "rgba(240,235,228,0.85)",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "color 0.3s",
                }}
              >
                {link}
              </a>
            ))}
            <button
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              style={{
                background: "transparent",
                border: "1px solid rgba(200,169,110,0.6)",
                color: "#c8a96e",
                padding: "10px 24px",
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 300,
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              Enquire
            </button>
          </div>
        )}

        {/* Mobile hamburger (= lines) */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "flex-end",
            }}
            aria-label="Toggle menu"
          >
            <span
              style={{
                display: "block",
                width: "26px",
                height: "1px",
                background: menuOpen ? "#c8a96e" : "#f0ebe4",
                transition: "all 0.3s ease",
                transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
                transformOrigin: "center",
              }}
            />
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1px",
                background: menuOpen ? "transparent" : "rgba(240,235,228,0.7)",
                transition: "all 0.3s ease",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "26px",
                height: "1px",
                background: menuOpen ? "#c8a96e" : "#f0ebe4",
                transition: "all 0.3s ease",
                transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
                transformOrigin: "center",
              }}
            />
          </button>
        )}
      </nav>

      {/* ── MOBILE MENU OVERLAY ── */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            top: "70px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(8,6,4,0.98)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "0",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.45s cubic-bezier(0.76, 0, 0.24, 1)",
            borderTop: "1px solid rgba(200,169,110,0.1)",
            overflowY: "auto",
          }}
        >
          {/* Decorative vertical line */}
          <div
            style={{
              position: "absolute",
              left: "2rem",
              top: "10%",
              bottom: "10%",
              width: "1px",
              background: "linear-gradient(to bottom, transparent, rgba(200,169,110,0.3), transparent)",
            }}
          />

          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "36px",
                letterSpacing: "0.05em",
                color: "rgba(240,235,228,0.9)",
                textDecoration: "none",
                padding: "1rem 3rem",
                transition: "color 0.3s, padding-left 0.3s",
                width: "100%",
                textAlign: "center",
                animation: menuOpen ? `mobileMenuFadeIn 0.4s ease ${i * 0.07}s both` : "none",
              }}
            >
              {link}
            </a>
          ))}

          <button
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: "2rem",
              background: "#c8a96e",
              border: "none",
              color: "#080604",
              padding: "14px 40px",
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 300,
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              cursor: "pointer",
              animation: menuOpen ? `mobileMenuFadeIn 0.4s ease 0.45s both` : "none",
            }}
          >
            Enquire
          </button>

          <p
            style={{
              marginTop: "2rem",
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 100,
              fontSize: "10px",
              letterSpacing: "0.3em",
              color: "rgba(200,169,110,0.5)",
              textTransform: "uppercase",
              animation: menuOpen ? `mobileMenuFadeIn 0.4s ease 0.5s both` : "none",
            }}
          >
            Est. 2006
          </p>
        </div>
      )}

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{ position: "relative", height: "100svh", overflow: "hidden" }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: isMobile ? "scale(1.05)" : `scale(1.08) translateY(${scrollY * 0.25}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, rgba(8,6,4,0.65) 0%, rgba(8,6,4,0.4) 40%, rgba(8,6,4,0.8) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50%",
            background: "linear-gradient(to top, #080604 0%, transparent 100%)",
          }}
        />

        {/* Noise texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
            pointerEvents: "none",
          }}
        />

        {/* Decorative gold line — hide on mobile */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              left: "3rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: "1px",
              height: "120px",
              background: "linear-gradient(to bottom, transparent, #c8a96e, transparent)",
              animation: "lineGrow 2s ease forwards",
            }}
          />
        )}

        {/* Hero content */}
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? "12%" : "14%",
            left: isMobile ? "5%" : "8%",
            right: isMobile ? "5%" : "auto",
            maxWidth: isMobile ? "100%" : "820px",
          }}
        >
          <p
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 200,
              fontSize: isMobile ? "10px" : "11px",
              letterSpacing: "0.4em",
              color: "#c8a96e",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
              animation: "fadeUp 1.2s ease 0.2s both",
            }}
          >
            Est. 2006 · Award-Winning Studio
          </p>

          <h1
            style={{
              fontWeight: 300,
              fontSize: isMobile ? "clamp(44px, 13vw, 72px)" : "clamp(56px, 8vw, 110px)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              margin: "0 0 1.25rem",
              animation: "fadeUp 1.2s ease 0.5s both",
            }}
          >
            <span style={{ display: "block", fontStyle: "italic", color: "#c8a96e" }}>
              Where
            </span>
            <span style={{ display: "block" }}>Space Becomes</span>
            <span style={{ display: "block", fontStyle: "italic" }}>Sensation</span>
          </h1>

          <p
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 300,
              fontSize: isMobile ? "13px" : "13px",
              letterSpacing: "0.06em",
              color: "rgba(240,235,228,0.8)",
              lineHeight: 1.8,
              maxWidth: isMobile ? "100%" : "440px",
              marginBottom: "2rem",
              animation: "fadeUp 1.2s ease 0.8s both",
            }}
          >
            We design spaces that move you — interiors of extraordinary
            refinement, built around the way you actually live.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "1rem",
              animation: "fadeUp 1.2s ease 1.0s both",
            }}
          >
            <button
              onMouseEnter={() => !isMobile && setHovering(true)}
              onMouseLeave={() => !isMobile && setHovering(false)}
              style={{
                background: "#c8a96e",
                border: "none",
                color: "#080604",
                padding: isMobile ? "14px 0" : "16px 40px",
                width: isMobile ? "100%" : "auto",
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 300,
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              View Portfolio
            </button>
            <button
              onMouseEnter={() => !isMobile && setHovering(true)}
              onMouseLeave={() => !isMobile && setHovering(false)}
              style={{
                background: "transparent",
                border: "1px solid rgba(240,235,228,0.4)",
                color: "#f0ebe4",
                padding: isMobile ? "14px 0" : "16px 40px",
                width: isMobile ? "100%" : "auto",
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 300,
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              Our Story
            </button>
          </div>
        </div>

        {/* Scroll indicator — hide on mobile */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              bottom: "5%",
              right: "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              animation: "fadeUp 1.2s ease 1.4s both",
            }}
          >
            <span
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: "rgba(200,169,110,0.7)",
                textTransform: "uppercase",
                writingMode: "vertical-rl",
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: "1px",
                height: "60px",
                background: "linear-gradient(to bottom, #c8a96e, transparent)",
                animation: "scrollPulse 2s ease-in-out infinite",
              }}
            />
          </div>
        )}
      </section>

      {/* ── STATS ── */}
      <section
        id="stats"
        data-animate
        style={{
          padding: isMobile ? "60px 5%" : "100px 8%",
          borderBottom: "1px solid rgba(200,169,110,0.1)",
          opacity: visibleSections["stats"] ? 1 : 0,
          transform: visibleSections["stats"] ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: isMobile ? "0" : "0",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                padding: isMobile ? "2rem 1rem" : "3rem",
                borderLeft: isMobile
                  ? i % 2 !== 0 ? "1px solid rgba(200,169,110,0.15)" : "none"
                  : i > 0 ? "1px solid rgba(200,169,110,0.15)" : "none",
                borderTop: isMobile && i >= 2 ? "1px solid rgba(200,169,110,0.15)" : "none",
                textAlign: "center",
                transition: `opacity 0.8s ease ${i * 0.15}s, transform 0.8s ease ${i * 0.15}s`,
                opacity: visibleSections["stats"] ? 1 : 0,
                transform: visibleSections["stats"] ? "translateY(0)" : "translateY(30px)",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? "clamp(36px, 10vw, 56px)" : "clamp(48px, 5vw, 72px)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  color: "#c8a96e",
                  lineHeight: 1,
                  marginBottom: "0.75rem",
                  fontStyle: "italic",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: isMobile ? "10px" : "10px",
                  letterSpacing: "0.2em",
                  color: "rgba(240,235,228,0.65)",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        id="services"
        data-animate
        style={{
          padding: isMobile ? "70px 5%" : "120px 8%",
          opacity: visibleSections["services"] ? 1 : 0,
          transform: visibleSections["services"] ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-end",
            marginBottom: isMobile ? "48px" : "80px",
            gap: isMobile ? "1.5rem" : "0",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 200,
                fontSize: "10px",
                letterSpacing: "0.4em",
                color: "#c8a96e",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              What We Do
            </p>
            <h2
              style={{
                fontWeight: 300,
                fontSize: isMobile ? "clamp(36px, 10vw, 56px)" : "clamp(40px, 5vw, 68px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                maxWidth: "480px",
              }}
            >
              Services Of
              <br />
              <span style={{ fontStyle: "italic", color: "#c8a96e" }}>
                Rare Distinction
              </span>
            </h2>
          </div>
          {!isMobile && (
            <p
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 300,
                fontSize: "13px",
                letterSpacing: "0.05em",
                color: "rgba(240,235,228,0.7)",
                lineHeight: 1.8,
                maxWidth: "340px",
              }}
            >
              Every engagement is a singular collaboration. We take on a limited
              number of projects each year to ensure each receives our full
              creative attention.
            </p>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "1px",
            background: "rgba(200,169,110,0.12)",
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={i}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(200,169,110,0.06)";
                !isMobile && setHovering(true);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#080604";
                !isMobile && setHovering(false);
              }}
              style={{
                background: "#080604",
                padding: isMobile ? "2rem 1.5rem" : "3.5rem",
                transition: "background 0.4s ease",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontWeight: 200,
                    fontSize: "11px",
                    letterSpacing: "0.3em",
                    color: "rgba(200,169,110,0.6)",
                  }}
                >
                  {s.num}
                </span>
                <span
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontWeight: 200,
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    color: "rgba(240,235,228,0.45)",
                    textTransform: "uppercase",
                    border: "1px solid rgba(240,235,228,0.15)",
                    padding: "5px 12px",
                  }}
                >
                  {s.tag}
                </span>
              </div>
              <h3
                style={{
                  fontWeight: 400,
                  fontSize: isMobile ? "24px" : "28px",
                  letterSpacing: "-0.01em",
                  marginBottom: "1rem",
                  color: "#f0ebe4",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: "13px",
                  letterSpacing: "0.04em",
                  color: "rgba(240,235,228,0.7)",
                  lineHeight: 1.8,
                  marginBottom: "1.5rem",
                }}
              >
                {s.desc}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#c8a96e" }}>
                <span
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                  }}
                >
                  Learn More
                </span>
                <div style={{ width: "32px", height: "1px", background: "#c8a96e" }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section
        id="portfolio"
        data-animate
        style={{
          padding: isMobile ? "70px 5%" : "120px 8%",
          opacity: visibleSections["portfolio"] ? 1 : 0,
          transform: visibleSections["portfolio"] ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: isMobile ? "48px" : "80px" }}>
          <p
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 200,
              fontSize: "10px",
              letterSpacing: "0.4em",
              color: "#c8a96e",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            Selected Works
          </p>
          <h2
            style={{
              fontWeight: 300,
              fontSize: isMobile ? "clamp(36px, 10vw, 56px)" : "clamp(40px, 5vw, 68px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            A Portfolio of
            <br />
            <span style={{ fontStyle: "italic", color: "#c8a96e" }}>
              Enduring Beauty
            </span>
          </h2>
        </div>

        {/* Mobile: stacked cards */}
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {PORTFOLIO.map((p, i) => (
              <div
                key={i}
                style={{
                  height: "240px",
                  backgroundImage: `url(${p.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid rgba(200,169,110,0.08)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(8,6,4,0.85) 0%, transparent 60%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    width: "18px",
                    height: "18px",
                    borderTop: "1px solid rgba(200,169,110,0.5)",
                    borderRight: "1px solid rgba(200,169,110,0.5)",
                  }}
                />
                <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem" }}>
                  <p
                    style={{
                      fontFamily: "'Josefin Sans', sans-serif",
                      fontWeight: 200,
                      fontSize: "9px",
                      letterSpacing: "0.3em",
                      color: "rgba(200,169,110,0.8)",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    {p.city} · {p.year}
                  </p>
                  <h3 style={{ fontWeight: 400, fontSize: "20px", letterSpacing: "-0.01em", color: "#f0ebe4" }}>
                    {p.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: grid layout */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gridTemplateRows: "360px 360px",
              gap: "16px",
            }}
          >
            {PORTFOLIO.map((p, i) => {
              const configs = [
                { col: "1 / 8", row: "1 / 2" },
                { col: "8 / 13", row: "1 / 2" },
                { col: "1 / 6", row: "2 / 3" },
                { col: "6 / 13", row: "2 / 3" },
              ];
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  style={{
                    gridColumn: configs[i].col,
                    gridRow: configs[i].row,
                    backgroundImage: `url(${p.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    border: "1px solid rgba(200,169,110,0.08)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(45deg, transparent 40%, rgba(200,169,110,0.03) 50%, transparent 60%)",
                      backgroundSize: "200% 200%",
                      animation: `shimmer ${3 + i * 0.7}s ease infinite`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "1.5rem",
                      right: "1.5rem",
                      width: "24px",
                      height: "24px",
                      borderTop: "1px solid rgba(200,169,110,0.5)",
                      borderRight: "1px solid rgba(200,169,110,0.5)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "1.5rem",
                      left: "1.5rem",
                      width: "24px",
                      height: "24px",
                      borderBottom: "1px solid rgba(200,169,110,0.5)",
                      borderLeft: "1px solid rgba(200,169,110,0.5)",
                    }}
                  />
                  <div style={{ position: "absolute", bottom: "2rem", left: "2rem", right: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <div>
                        <p
                          style={{
                            fontFamily: "'Josefin Sans', sans-serif",
                            fontWeight: 200,
                            fontSize: "9px",
                            letterSpacing: "0.3em",
                            color: "rgba(200,169,110,0.8)",
                            textTransform: "uppercase",
                            marginBottom: "8px",
                          }}
                        >
                          {p.city} · {p.year}
                        </p>
                        <h3
                          style={{
                            fontWeight: 400,
                            fontSize: "22px",
                            letterSpacing: "-0.01em",
                            color: "#f0ebe4",
                          }}
                        >
                          {p.title}
                        </h3>
                      </div>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          border: "1px solid rgba(200,169,110,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#c8a96e",
                          fontSize: "18px",
                          flexShrink: 0,
                        }}
                      >
                        →
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <button
            onMouseEnter={() => !isMobile && setHovering(true)}
            onMouseLeave={() => !isMobile && setHovering(false)}
            style={{
              background: "transparent",
              border: "1px solid rgba(200,169,110,0.4)",
              color: "#c8a96e",
              padding: isMobile ? "14px 40px" : "16px 48px",
              width: isMobile ? "100%" : "auto",
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 300,
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            View Full Portfolio
          </button>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section
        id="process"
        data-animate
        style={{
          padding: isMobile ? "70px 5%" : "120px 8%",
          background: "linear-gradient(180deg, #080604 0%, #0d0b07 50%, #080604 100%)",
          opacity: visibleSections["process"] ? 1 : 0,
          transform: visibleSections["process"] ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease, transform 1s ease",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              right: "-2%",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "280px",
              fontWeight: 300,
              color: "rgba(200,169,110,0.03)",
              lineHeight: 1,
              pointerEvents: "none",
              letterSpacing: "-0.05em",
              fontStyle: "italic",
              userSelect: "none",
            }}
          >
            Process
          </div>
        )}

        <div style={{ marginBottom: isMobile ? "40px" : "80px" }}>
          <p
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 200,
              fontSize: "10px",
              letterSpacing: "0.4em",
              color: "#c8a96e",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            How We Work
          </p>
          <h2
            style={{
              fontWeight: 300,
              fontSize: isMobile ? "clamp(36px, 10vw, 56px)" : "clamp(40px, 5vw, 68px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              maxWidth: "520px",
            }}
          >
            The Art of
            <br />
            <span style={{ fontStyle: "italic", color: "#c8a96e" }}>
              Deliberate Making
            </span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {PROCESS.map((p, i) => (
            <div
              key={i}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector(".process-num").style.color = "#c8a96e";
                !isMobile && setHovering(true);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector(".process-num").style.color = "rgba(200,169,110,0.25)";
                !isMobile && setHovering(false);
              }}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "60px 1fr" : "120px 1fr 1fr",
                gap: isMobile ? "1rem" : "3rem",
                padding: isMobile ? "1.75rem 0" : "3rem 0",
                borderTop: "1px solid rgba(200,169,110,0.1)",
                alignItems: isMobile ? "flex-start" : "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              <div
                className="process-num"
                style={{
                  fontSize: isMobile ? "40px" : "64px",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "rgba(200,169,110,0.25)",
                  lineHeight: 1,
                  transition: "color 0.3s ease",
                }}
              >
                {p.step}
              </div>
              <div>
                <h3
                  style={{
                    fontWeight: 400,
                    fontSize: isMobile ? "22px" : "28px",
                    letterSpacing: "-0.01em",
                    marginBottom: isMobile ? "0.5rem" : "0",
                    color: "#f0ebe4",
                  }}
                >
                  {p.title}
                </h3>
                {isMobile && (
                  <p
                    style={{
                      fontFamily: "'Josefin Sans', sans-serif",
                      fontWeight: 300,
                      fontSize: "13px",
                      letterSpacing: "0.04em",
                      color: "rgba(240,235,228,0.7)",
                      lineHeight: 1.8,
                    }}
                  >
                    {p.text}
                  </p>
                )}
              </div>
              {!isMobile && (
                <p
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "13px",
                    letterSpacing: "0.05em",
                    color: "rgba(240,235,228,0.7)",
                    lineHeight: 1.8,
                  }}
                >
                  {p.text}
                </p>
              )}
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(200,169,110,0.1)" }} />
        </div>
      </section>

      {/* ── JOURNAL ── */}
      <section
        id="journal"
        data-animate
        style={{
          padding: isMobile ? "70px 5%" : "120px 8%",
          opacity: visibleSections["journal"] ? 1 : 0,
          transform: visibleSections["journal"] ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: isMobile ? "40px" : "64px",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 200,
                fontSize: "10px",
                letterSpacing: "0.4em",
                color: "#c8a96e",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Thinking & Writing
            </p>
            <h2
              style={{
                fontWeight: 300,
                fontSize: isMobile ? "clamp(36px, 10vw, 56px)" : "clamp(40px, 5vw, 68px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
              }}
            >
              The{" "}
              <span style={{ fontStyle: "italic", color: "#c8a96e" }}>Journal</span>
            </h2>
          </div>
          {!isMobile && (
            <a
              href="#"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 300,
                fontSize: "10px",
                letterSpacing: "0.25em",
                color: "#c8a96e",
                textDecoration: "none",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              All Articles
              <div style={{ width: "32px", height: "1px", background: "#c8a96e" }} />
            </a>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {JOURNAL.map((j, i) => (
            <a
              key={i}
              href="#"
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.paddingLeft = "24px";
                  setHovering(true);
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.paddingLeft = "0";
                  setHovering(false);
                }
              }}
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: isMobile ? "flex-start" : "space-between",
                alignItems: isMobile ? "flex-start" : "center",
                padding: isMobile ? "1.5rem 0" : "2rem 0",
                borderTop: "1px solid rgba(200,169,110,0.1)",
                textDecoration: "none",
                color: "#f0ebe4",
                transition: "padding 0.4s ease",
                gap: isMobile ? "0.5rem" : "0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "0.4rem" : "3rem",
                  alignItems: isMobile ? "flex-start" : "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontWeight: 200,
                    fontSize: "9px",
                    letterSpacing: "0.3em",
                    color: "#c8a96e",
                    textTransform: "uppercase",
                    width: isMobile ? "auto" : "120px",
                    flexShrink: 0,
                  }}
                >
                  {j.cat}
                </span>
                <h3
                  style={{
                    fontWeight: 400,
                    fontSize: isMobile ? "18px" : "22px",
                    letterSpacing: "-0.01em",
                    color: "#f0ebe4",
                    lineHeight: 1.3,
                  }}
                >
                  {j.title}
                </h3>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginTop: isMobile ? "0.5rem" : "0",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontWeight: 200,
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    color: "rgba(240,235,228,0.5)",
                  }}
                >
                  {j.date}
                </span>
                <span style={{ color: "rgba(200,169,110,0.7)", fontSize: "18px" }}>→</span>
              </div>
            </a>
          ))}
          <div style={{ borderTop: "1px solid rgba(200,169,110,0.1)" }} />
        </div>

        {isMobile && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <a
              href="#"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 300,
                fontSize: "10px",
                letterSpacing: "0.25em",
                color: "#c8a96e",
                textDecoration: "none",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              All Articles
              <div style={{ width: "32px", height: "1px", background: "#c8a96e" }} />
            </a>
          </div>
        )}
      </section>

      {/* ── CTA BANNER ── */}
      <section
        id="cta"
        data-animate
        style={{
          margin: isMobile ? "0 5% 80px" : "0 8% 120px",
          background: "linear-gradient(135deg, #1a130a 0%, #0d0b07 50%, #0a0f16 100%)",
          border: "1px solid rgba(200,169,110,0.15)",
          padding: isMobile ? "3rem 2rem" : "80px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? "2.5rem" : "0",
          position: "relative",
          overflow: "hidden",
          opacity: visibleSections["cta"] ? 1 : 0,
          transform: visibleSections["cta"] ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-10%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,169,110,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              borderTop: "1px solid rgba(200,169,110,0.3)",
              borderRight: "1px solid rgba(200,169,110,0.3)",
            }}
          />
        </div>
        <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              borderBottom: "1px solid rgba(200,169,110,0.3)",
              borderLeft: "1px solid rgba(200,169,110,0.3)",
            }}
          />
        </div>
        <div>
          <p
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 200,
              fontSize: "10px",
              letterSpacing: "0.4em",
              color: "#c8a96e",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            Begin Your Project
          </p>
          <h2
            style={{
              fontWeight: 300,
              fontSize: isMobile ? "clamp(28px, 8vw, 44px)" : "clamp(32px, 4vw, 56px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              maxWidth: "500px",
            }}
          >
            Ready to Live Inside
            <br />
            <span style={{ fontStyle: "italic", color: "#c8a96e" }}>
              Something Extraordinary?
            </span>
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            flexShrink: 0,
            width: isMobile ? "100%" : "auto",
          }}
        >
          <button
            onMouseEnter={() => !isMobile && setHovering(true)}
            onMouseLeave={() => !isMobile && setHovering(false)}
            style={{
              background: "#c8a96e",
              border: "none",
              color: "#080604",
              padding: "16px 48px",
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 300,
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              cursor: "pointer",
              whiteSpace: "nowrap",
              width: isMobile ? "100%" : "auto",
            }}
          >
            Start a Conversation
          </button>
          <p
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 200,
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "rgba(200,169,110,0.6)",
              textAlign: "center",
            }}
          >
            Limited to 8 projects annually
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "transparent",
          borderTop: "1px solid rgba(200,169,110,0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "-5%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "clamp(60px, 18vw, 260px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(200,169,110,0.04)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            letterSpacing: "-0.05em",
            userSelect: "none",
          }}
        >
          AURUM
        </div>

        <div style={{ padding: isMobile ? "60px 5% 0" : "80px 8% 0", position: "relative", zIndex: 1 }}>
          {/* Footer top */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
              gap: isMobile ? "2.5rem" : "4rem",
              paddingBottom: isMobile ? "40px" : "64px",
              borderBottom: "1px solid rgba(200,169,110,0.1)",
            }}
          >
            {/* Brand col — full width on mobile */}
            <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
              <div
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontWeight: 100,
                  fontSize: "18px",
                  letterSpacing: "0.35em",
                  color: "#c8a96e",
                  textTransform: "uppercase",
                  marginBottom: "1.25rem",
                }}
              >
                AURUM<span style={{ color: "#f0ebe4" }}>STUDIO</span>
              </div>
              <p
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: "13px",
                  letterSpacing: "0.04em",
                  color: "rgba(240,235,228,0.6)",
                  lineHeight: 1.9,
                  maxWidth: isMobile ? "100%" : "300px",
                  marginBottom: "2rem",
                }}
              >
                An international interior design studio dedicated to spaces of
                exceptional beauty and enduring character.
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                {["IG", "PI", "LI", "BE"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    onMouseEnter={() => !isMobile && setHovering(true)}
                    onMouseLeave={() => !isMobile && setHovering(false)}
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "1px solid rgba(200,169,110,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(200,169,110,0.65)",
                      textDecoration: "none",
                      fontFamily: "'Josefin Sans', sans-serif",
                      fontSize: "9px",
                      letterSpacing: "0.05em",
                      fontWeight: 300,
                      transition: "all 0.3s",
                    }}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {[
              { heading: "Studio", links: ["About", "Team", "Philosophy", "Careers", "Press"] },
              { heading: "Services", links: ["Residential", "Commercial", "Concept", "Furniture", "Consulting"] },
              { heading: "Contact", links: ["London", "Dubai", "New York", "hello@aurum.studio", "+44 20 7946 0958"] },
            ].map((col) => (
              <div key={col.heading}>
                <p
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "9px",
                    letterSpacing: "0.3em",
                    color: "#c8a96e",
                    textTransform: "uppercase",
                    marginBottom: "1.5rem",
                  }}
                >
                  {col.heading}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {col.links.map((l) => (
                    <a
                      key={l}
                      href="#"
                      onMouseEnter={() => !isMobile && setHovering(true)}
                      onMouseLeave={() => !isMobile && setHovering(false)}
                      style={{
                        fontFamily: "'Josefin Sans', sans-serif",
                        fontWeight: 300,
                        fontSize: isMobile ? "12px" : "12px",
                        letterSpacing: "0.08em",
                        color: "rgba(240,235,228,0.6)",
                        textDecoration: "none",
                        transition: "color 0.3s",
                      }}
                    >
                      {l}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer bottom */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              padding: "28px 0 40px",
              gap: isMobile ? "1rem" : "0",
            }}
          >
            <p
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 200,
                fontSize: "10px",
                letterSpacing: "0.15em",
                color: "rgba(240,235,228,0.35)",
              }}
            >
              © 2025 Aurum Studio. All Rights Reserved.
            </p>
            {!isMobile && (
              <div style={{ display: "flex", gap: "2.5rem" }}>
                {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((t) => (
                  <a
                    key={t}
                    href="#"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    style={{
                      fontFamily: "'Josefin Sans', sans-serif",
                      fontWeight: 200,
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      color: "rgba(240,235,228,0.3)",
                      textDecoration: "none",
                      transition: "color 0.3s",
                    }}
                  >
                    {t}
                  </a>
                ))}
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#4ade80",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontWeight: 200,
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: "rgba(240,235,228,0.45)",
                }}
              >
                Currently accepting new enquiries
              </span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { opacity: 0; transform: translateY(-50%) scaleY(0); }
          to { opacity: 1; transform: translateY(-50%) scaleY(1); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }
        @keyframes shimmer {
          0% { background-position: -200% -200%; }
          100% { background-position: 200% 200%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes mobileMenuFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        a:hover { color: #c8a96e !important; }
        button:hover { opacity: 0.85; }
        @media (max-width: 767px) {
          body { cursor: auto !important; }
        }
      `}</style>
    </div>
  );
}