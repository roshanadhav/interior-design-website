import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Studio", "Portfolio", "Services", "Process", "Journal", "Contact"];

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
  { title: "The Obsidian Suite", city: "Dubai", year: "2024", size: "large" },
  { title: "Maison Céleste", city: "Paris", year: "2024", size: "small" },
  { title: "Casa Aurea", city: "Milan", year: "2023", size: "small" },
  { title: "The Glass Pavilion", city: "Tokyo", year: "2023", size: "large" },
];

const PROCESS = [
  { step: "I", title: "Discovery", text: "A deep immersion into your world — your rituals, aspirations, and the feeling you want to inhabit." },
  { step: "II", title: "Concept", text: "A singular creative direction emerges. Mood, palette, materiality, and spatial narrative are defined." },
  { step: "III", title: "Design", text: "Every millimetre is resolved. Technical drawings, custom furniture design, and material specification." },
  { step: "IV", title: "Realisation", text: "We orchestrate artisans, contractors, and suppliers — managing every detail through to the final reveal." },
];

const JOURNAL = [
  { cat: "Material Study", title: "The Quiet Power of Raw Travertine", date: "May 2025" },
  { cat: "Essay", title: "Why Silence Is the Ultimate Luxury", date: "April 2025" },
  { cat: "Project", title: "Inside the Obsidian Suite, Dubai", date: "March 2025" },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const heroRef = useRef(null);
  const [visibleSections, setVisibleSections] = useState({});

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
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navBg = scrollY > 60 ? "rgba(8,6,4,0.92)" : "transparent";
  const navBlur = scrollY > 60 ? "blur(24px)" : "none";

  return (
    <div
      style={{
        fontFamily: "'Cormorant Garamond', 'Didot', 'Times New Roman', serif",
        background: "#080604",
        color: "#f0ebe4",
        overflowX: "hidden",
        cursor: "none",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Josefin+Sans:wght@100;200;300;400&display=swap"
        rel="stylesheet"
      />

      {/* Custom cursor */}
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

      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: navBg,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          borderBottom: scrollY > 60 ? "1px solid rgba(200,169,110,0.12)" : "none",
          transition: "background 0.5s ease, border 0.5s ease",
          padding: "0 3rem",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "'Josefin Sans', sans-serif",
            fontWeight: 100,
            fontSize: "15px",
            letterSpacing: "0.35em",
            color: "#c8a96e",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          AURUM
          <span style={{ color: "#f0ebe4", marginLeft: "2px" }}>STUDIO</span>
        </div>

        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 200,
                fontSize: "11px",
                letterSpacing: "0.2em",
                color: "rgba(240,235,228,0.7)",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "color 0.3s",
                position: "relative",
              }}
              onFocus={(e) => (e.target.style.color = "#c8a96e")}
              onBlur={(e) => (e.target.style.color = "rgba(240,235,228,0.7)")}
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
              fontWeight: 200,
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
      </nav>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        {/* Video bg */}
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
            transform: `scale(1.08) translateY(${scrollY * 0.25}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          <source
            src="./src/assets/vedios/hero.mp4"
            type="video/mp4"
          />
        </video>

        {/* Gradient overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, rgba(8,6,4,0.55) 0%, rgba(8,6,4,0.3) 40%, rgba(8,6,4,0.7) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(to top, #080604 0%, transparent 100%)",
          }}
        />

        {/* Noise texture overlay */}
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

        {/* Decorative gold line left */}
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

        {/* Hero content */}
        <div
          style={{
            position: "absolute",
            bottom: "14%",
            left: "8%",
            maxWidth: "820px",
          }}
        >
          <p
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 100,
              fontSize: "11px",
              letterSpacing: "0.4em",
              color: "#c8a96e",
              textTransform: "uppercase",
              marginBottom: "2rem",
              animation: "fadeUp 1.2s ease 0.2s both",
            }}
          >
            Est. 2006 · Award-Winning Studio
          </p>

          <h1
            style={{
              fontWeight: 300,
              fontSize: "clamp(56px, 8vw, 110px)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              margin: "0 0 1.5rem",
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
              fontWeight: 200,
              fontSize: "13px",
              letterSpacing: "0.1em",
              color: "rgba(240,235,228,0.65)",
              lineHeight: 1.8,
              maxWidth: "440px",
              marginBottom: "3rem",
              animation: "fadeUp 1.2s ease 0.8s both",
            }}
          >
            We design spaces that move you — interiors of extraordinary
            refinement, built around the way you actually live.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              animation: "fadeUp 1.2s ease 1.0s both",
            }}
          >
            <button
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              style={{
                background: "#c8a96e",
                border: "none",
                color: "#080604",
                padding: "16px 40px",
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 300,
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              View Portfolio
            </button>
            <button
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              style={{
                background: "transparent",
                border: "1px solid rgba(240,235,228,0.3)",
                color: "#f0ebe4",
                padding: "16px 40px",
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 200,
                fontSize: "10px",
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

        {/* Scroll indicator */}
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
      </section>

      {/* ── SECTION 1: STATS ── */}
      <section
        id="stats"
        data-animate
        style={{
          padding: "100px 8%",
          borderBottom: "1px solid rgba(200,169,110,0.1)",
          opacity: visibleSections["stats"] ? 1 : 0,
          transform: visibleSections["stats"] ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "3rem",
                borderLeft: i > 0 ? "1px solid rgba(200,169,110,0.15)" : "none",
                textAlign: "center",
                transition: `opacity 0.8s ease ${i * 0.15}s, transform 0.8s ease ${i * 0.15}s`,
                opacity: visibleSections["stats"] ? 1 : 0,
                transform: visibleSections["stats"] ? "translateY(0)" : "translateY(30px)",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(48px, 5vw, 72px)",
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
                  fontWeight: 200,
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  color: "rgba(240,235,228,0.5)",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 2: SERVICES ── */}
      <section
        id="services"
        data-animate
        style={{
          padding: "120px 8%",
          opacity: visibleSections["services"] ? 1 : 0,
          transform: visibleSections["services"] ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "80px",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 100,
                fontSize: "10px",
                letterSpacing: "0.4em",
                color: "#c8a96e",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              What We Do
            </p>
            <h2
              style={{
                fontWeight: 300,
                fontSize: "clamp(40px, 5vw, 68px)",
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
          <p
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 200,
              fontSize: "13px",
              letterSpacing: "0.05em",
              color: "rgba(240,235,228,0.55)",
              lineHeight: 1.8,
              maxWidth: "340px",
            }}
          >
            Every engagement is a singular collaboration. We take on a limited
            number of projects each year to ensure each receives our full
            creative attention.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            background: "rgba(200,169,110,0.12)",
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={i}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(200,169,110,0.06)";
                setHovering(true);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#080604";
                setHovering(false);
              }}
              style={{
                background: "#080604",
                padding: "3.5rem",
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
                  marginBottom: "2rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontWeight: 100,
                    fontSize: "11px",
                    letterSpacing: "0.3em",
                    color: "rgba(200,169,110,0.5)",
                  }}
                >
                  {s.num}
                </span>
                <span
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontWeight: 100,
                    fontSize: "9px",
                    letterSpacing: "0.25em",
                    color: "rgba(240,235,228,0.3)",
                    textTransform: "uppercase",
                    border: "1px solid rgba(240,235,228,0.1)",
                    padding: "5px 12px",
                  }}
                >
                  {s.tag}
                </span>
              </div>
              <h3
                style={{
                  fontWeight: 400,
                  fontSize: "28px",
                  letterSpacing: "-0.01em",
                  marginBottom: "1.25rem",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontWeight: 200,
                  fontSize: "13px",
                  letterSpacing: "0.05em",
                  color: "rgba(240,235,228,0.55)",
                  lineHeight: 1.8,
                  marginBottom: "2rem",
                }}
              >
                {s.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "#c8a96e",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontWeight: 200,
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                  }}
                >
                  Learn More
                </span>
                <div
                  style={{
                    width: "32px",
                    height: "1px",
                    background: "#c8a96e",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: PORTFOLIO ── */}
      <section
        id="portfolio"
        data-animate
        style={{
          padding: "120px 8%",
          opacity: visibleSections["portfolio"] ? 1 : 0,
          transform: visibleSections["portfolio"] ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <p
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 100,
              fontSize: "10px",
              letterSpacing: "0.4em",
              color: "#c8a96e",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            Selected Works
          </p>
          <h2
            style={{
              fontWeight: 300,
              fontSize: "clamp(40px, 5vw, 68px)",
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
            const gradients = [
              "linear-gradient(135deg, #1a1410 0%, #2d1f0e 100%)",
              "linear-gradient(135deg, #0e1418 0%, #0e1f2d 100%)",
              "linear-gradient(135deg, #14180e 0%, #1f2d0e 100%)",
              "linear-gradient(135deg, #18100e 0%, #2d150e 100%)",
            ];
            return (
              <div
                key={i}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                style={{
                  gridColumn: configs[i].col,
                  gridRow: configs[i].row,
                  background: gradients[i],
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: "1px solid rgba(200,169,110,0.08)",
                }}
              >
                {/* Shimmer gradient animation */}
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
                {/* Decorative corner */}
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
                <div
                  style={{
                    position: "absolute",
                    bottom: "2rem",
                    left: "2rem",
                    right: "2rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "'Josefin Sans', sans-serif",
                          fontWeight: 100,
                          fontSize: "9px",
                          letterSpacing: "0.3em",
                          color: "rgba(200,169,110,0.7)",
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

        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <button
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={{
              background: "transparent",
              border: "1px solid rgba(200,169,110,0.4)",
              color: "#c8a96e",
              padding: "16px 48px",
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 200,
              fontSize: "10px",
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

      {/* ── SECTION 4: PROCESS ── */}
      <section
        id="process"
        data-animate
        style={{
          padding: "120px 8%",
          background: "linear-gradient(180deg, #080604 0%, #0d0b07 50%, #080604 100%)",
          opacity: visibleSections["process"] ? 1 : 0,
          transform: visibleSections["process"] ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease, transform 1s ease",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background roman numeral watermark */}
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

        <div style={{ marginBottom: "80px" }}>
          <p
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 100,
              fontSize: "10px",
              letterSpacing: "0.4em",
              color: "#c8a96e",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            How We Work
          </p>
          <h2
            style={{
              fontWeight: 300,
              fontSize: "clamp(40px, 5vw, 68px)",
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
                setHovering(true);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector(".process-num").style.color =
                  "rgba(200,169,110,0.2)";
                setHovering(false);
              }}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr 1fr",
                gap: "3rem",
                padding: "3rem 0",
                borderTop: "1px solid rgba(200,169,110,0.1)",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              <div
                className="process-num"
                style={{
                  fontSize: "64px",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "rgba(200,169,110,0.2)",
                  lineHeight: 1,
                  transition: "color 0.3s ease",
                }}
              >
                {p.step}
              </div>
              <h3
                style={{
                  fontWeight: 400,
                  fontSize: "28px",
                  letterSpacing: "-0.01em",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontWeight: 200,
                  fontSize: "13px",
                  letterSpacing: "0.05em",
                  color: "rgba(240,235,228,0.55)",
                  lineHeight: 1.8,
                }}
              >
                {p.text}
              </p>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(200,169,110,0.1)" }} />
        </div>
      </section>

      {/* ── SECTION 5: JOURNAL ── */}
      <section
        id="journal"
        data-animate
        style={{
          padding: "120px 8%",
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
            marginBottom: "64px",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 100,
                fontSize: "10px",
                letterSpacing: "0.4em",
                color: "#c8a96e",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              Thinking & Writing
            </p>
            <h2
              style={{
                fontWeight: 300,
                fontSize: "clamp(40px, 5vw, 68px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
              }}
            >
              The{" "}
              <span style={{ fontStyle: "italic", color: "#c8a96e" }}>
                Journal
              </span>
            </h2>
          </div>
          <a
            href="#"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 200,
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
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {JOURNAL.map((j, i) => (
            <a
              key={i}
              href="#"
              onMouseEnter={(e) => {
                e.currentTarget.style.paddingLeft = "24px";
                setHovering(true);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.paddingLeft = "0";
                setHovering(false);
              }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "2rem 0",
                borderTop: "1px solid rgba(200,169,110,0.1)",
                textDecoration: "none",
                color: "#f0ebe4",
                transition: "padding 0.4s ease",
              }}
            >
              <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
                <span
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontWeight: 100,
                    fontSize: "9px",
                    letterSpacing: "0.3em",
                    color: "#c8a96e",
                    textTransform: "uppercase",
                    width: "120px",
                    flexShrink: 0,
                  }}
                >
                  {j.cat}
                </span>
                <h3
                  style={{
                    fontWeight: 400,
                    fontSize: "22px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {j.title}
                </h3>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                <span
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontWeight: 100,
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    color: "rgba(240,235,228,0.4)",
                  }}
                >
                  {j.date}
                </span>
                <span style={{ color: "rgba(200,169,110,0.6)", fontSize: "20px" }}>
                  →
                </span>
              </div>
            </a>
          ))}
          <div style={{ borderTop: "1px solid rgba(200,169,110,0.1)" }} />
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        id="cta"
        data-animate
        style={{
          margin: "0 8% 120px",
          background: "linear-gradient(135deg, #1a130a 0%, #0d0b07 50%, #0a0f16 100%)",
          border: "1px solid rgba(200,169,110,0.15)",
          padding: "80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,169,110,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "absolute", top: "2rem", right: "2rem" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderTop: "1px solid rgba(200,169,110,0.3)",
              borderRight: "1px solid rgba(200,169,110,0.3)",
            }}
          />
        </div>
        <div style={{ position: "absolute", bottom: "2rem", left: "2rem" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderBottom: "1px solid rgba(200,169,110,0.3)",
              borderLeft: "1px solid rgba(200,169,110,0.3)",
            }}
          />
        </div>
        <div>
          <p
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 100,
              fontSize: "10px",
              letterSpacing: "0.4em",
              color: "#c8a96e",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            Begin Your Project
          </p>
          <h2
            style={{
              fontWeight: 300,
              fontSize: "clamp(32px, 4vw, 56px)",
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
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flexShrink: 0 }}>
          <button
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={{
              background: "#c8a96e",
              border: "none",
              color: "#080604",
              padding: "18px 48px",
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 300,
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Start a Conversation
          </button>
          <p
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 100,
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "rgba(200,169,110,0.5)",
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
          background: "#05040300",
          borderTop: "1px solid rgba(200,169,110,0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Huge background text */}
        <div
          style={{
            position: "absolute",
            bottom: "-5%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "clamp(80px, 18vw, 260px)",
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

        <div style={{ padding: "80px 8% 0", position: "relative", zIndex: 1 }}>
          {/* Footer top grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: "4rem",
              paddingBottom: "64px",
              borderBottom: "1px solid rgba(200,169,110,0.1)",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontWeight: 100,
                  fontSize: "18px",
                  letterSpacing: "0.35em",
                  color: "#c8a96e",
                  textTransform: "uppercase",
                  marginBottom: "1.5rem",
                }}
              >
                AURUM<span style={{ color: "#f0ebe4" }}>STUDIO</span>
              </div>
              <p
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontWeight: 200,
                  fontSize: "13px",
                  letterSpacing: "0.05em",
                  color: "rgba(240,235,228,0.45)",
                  lineHeight: 1.9,
                  maxWidth: "300px",
                  marginBottom: "2.5rem",
                }}
              >
                An international interior design studio dedicated to spaces of
                exceptional beauty and enduring character.
              </p>
              <div style={{ display: "flex", gap: "16px" }}>
                {["IG", "PI", "LI", "BE"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "1px solid rgba(200,169,110,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(200,169,110,0.5)",
                      textDecoration: "none",
                      fontFamily: "'Josefin Sans', sans-serif",
                      fontSize: "9px",
                      letterSpacing: "0.05em",
                      fontWeight: 200,
                      transition: "all 0.3s",
                    }}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                heading: "Studio",
                links: ["About", "Team", "Philosophy", "Careers", "Press"],
              },
              {
                heading: "Services",
                links: ["Residential", "Commercial", "Concept", "Furniture", "Consulting"],
              },
              {
                heading: "Contact",
                links: ["London", "Dubai", "New York", "hello@aurum.studio", "+44 20 7946 0958"],
              },
            ].map((col) => (
              <div key={col.heading}>
                <p
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontWeight: 200,
                    fontSize: "9px",
                    letterSpacing: "0.35em",
                    color: "#c8a96e",
                    textTransform: "uppercase",
                    marginBottom: "2rem",
                  }}
                >
                  {col.heading}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {col.links.map((l) => (
                    <a
                      key={l}
                      href="#"
                      onMouseEnter={() => setHovering(true)}
                      onMouseLeave={() => setHovering(false)}
                      style={{
                        fontFamily: "'Josefin Sans', sans-serif",
                        fontWeight: 200,
                        fontSize: "12px",
                        letterSpacing: "0.1em",
                        color: "rgba(240,235,228,0.45)",
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
              justifyContent: "space-between",
              alignItems: "center",
              padding: "32px 0 40px",
            }}
          >
            <p
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 100,
                fontSize: "10px",
                letterSpacing: "0.15em",
                color: "rgba(240,235,228,0.25)",
              }}
            >
              © 2025 Aurum Studio. All Rights Reserved.
            </p>
            <div style={{ display: "flex", gap: "2.5rem" }}>
              {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((t) => (
                <a
                  key={t}
                  href="#"
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontWeight: 100,
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    color: "rgba(240,235,228,0.25)",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                >
                  {t}
                </a>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
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
                  fontWeight: 100,
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: "rgba(240,235,228,0.35)",
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
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        a:hover { color: #c8a96e !important; }
        button:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}
