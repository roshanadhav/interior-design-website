import { useState, useEffect, useRef } from "react";
import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";
import image4 from "../assets/images/image4.png";

const PROJECT_IMAGES = [image1, image2, image3, image4];
function shuffle(a) {
    let array = [...a] ;
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements [i] and [j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const PROJECTS = [
  { id: "01", title: "The Obsidian Suite", subtitle: "Penthouse Residence", city: "Dubai, UAE", year: "2024", area: "4,200 sq ft", category: "Residential", tags: ["Dark Luxury", "Custom Millwork", "Smart Home"], desc: "A penthouse conceived entirely in shadow and light — obsidian stone, bronzed steel, and hand-stitched leather form a residence that commands the sky.", images: shuffle(PROJECT_IMAGES) },
  { id: "02", title: "Maison Céleste", subtitle: "Private Villa", city: "Paris, France", year: "2024", area: "6,800 sq ft", category: "Residential", tags: ["Parisian Grandeur", "Bespoke Art", "Atelier Furniture"], desc: "Haussmann bones wrapped in contemporary restraint. Plaster ceilings, raw silk drapery, and an art collection curated over three years.", images: shuffle(PROJECT_IMAGES)  },
  { id: "03", title: "Casa Aurea", subtitle: "Lakeside Estate", city: "Milan, Italy", year: "2023", area: "9,100 sq ft", category: "Estate", tags: ["Travertine", "Indoor–Outdoor", "Private Gallery"], desc: "Where Italian craftsmanship meets radical openness. A lakeside estate dissolving the threshold between architecture and landscape.", images: PROJECT_IMAGES },
  { id: "04", title: "The Glass Pavilion", subtitle: "Corporate Headquarters", city: "Tokyo, Japan", year: "2023", area: "12,500 sq ft", category: "Commercial", tags: ["Wabi-Sabi", "Biophilic", "Executive Floors"], desc: "A corporate space stripped of all pretence. Japanese minimalism elevated — washi paper panels, moss gardens, and structural glass in conversation with Mount Fuji.", images: shuffle(PROJECT_IMAGES) },
];

const FILTERS = ["All", "Residential", "Estate", "Commercial"];
const NAV_LINKS = ["Studio", "Portfolio", "Services", "Process", "Journal"];

function useSlideshow(images, active, intervalMs = 800) {
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);
  useEffect(() => {
    if (active) {
      setIdx(0);
      timer.current = setInterval(() => setIdx((i) => (i + 1) % images.length), intervalMs);
    } else {
      setIdx(0);
      clearInterval(timer.current);
    }
    return () => clearInterval(timer.current);
  }, [active, images.length, intervalMs]);
  return idx;
}

function ProjectCard({ project, index, visible, isMobile }) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState([false, false, false, false]);
  const slideIdx = useSlideshow(project.images, hovered, 800);
  const markLoaded = (i) => setImgLoaded((prev) => { const n = [...prev]; n[i] = true; return n; });
  const isEven = index % 2 === 0;


  

  return (

    <article style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.97)",
      transition: `opacity 0.9s cubic-bezier(.22,1,.36,1) ${index * 0.15}s, transform 0.9s cubic-bezier(.22,1,.36,1) ${index * 0.15}s`,
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gridTemplateAreas: isMobile ? '"img" "info"' : (isEven ? '"img info"' : '"info img"'),
      gap: 0,
      minHeight: isMobile ? "auto" : "580px",
      borderBottom: "1px solid rgba(200,169,110,0.1)",
      position: "relative",
    }}>
      {/* Image panel */}
      <div
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => !isMobile && setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setTimeout(() => setHovered(false), 2000)}
        style={{ gridArea: "img", position: "relative", overflow: "hidden", cursor: isMobile ? "auto" : "none", background: "#0d0b07", height: isMobile ? "min(65vw, 420px)" : "auto", minHeight: isMobile ? "240px" : "100%" }}
      >
        {project.images.map((src, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, opacity: hovered ? (i === slideIdx ? 1 : 0) : i === 0 ? 1 : 0, transition: hovered ? "opacity 0.35s ease" : "opacity 0.6s ease", zIndex: i === slideIdx ? 2 : 1 }}>
            <img src={src} alt={`${project.title} view ${i + 1}`} onLoad={() => markLoaded(i)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: hovered ? "scale(1.07)" : "scale(1)", transition: "transform 1.4s cubic-bezier(.22,1,.36,1)", filter: imgLoaded[i] ? "none" : "blur(8px)" }} />
          </div>
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(8,6,4,0.35) 0%,transparent 60%,rgba(8,6,4,0.5) 100%)", zIndex: 3, opacity: hovered ? 0.5 : 1, transition: "opacity 0.5s ease", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "1.25rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "7px", zIndex: 4, opacity: hovered ? 1 : 0, transition: "opacity 0.4s ease" }}>
          {project.images.map((_, i) => <div key={i} style={{ width: i === slideIdx ? "22px" : "5px", height: "2px", background: i === slideIdx ? "#c8a96e" : "rgba(200,169,110,0.35)", transition: "width 0.35s ease", borderRadius: "2px" }} />)}
        </div>
        <div style={{ position: "absolute", top: "1.25rem", right: "1.25rem", zIndex: 4, opacity: hovered ? 1 : 0, transition: "opacity 0.4s ease", fontFamily: "'Josefin Sans',sans-serif", fontWeight: 100, fontSize: "10px", letterSpacing: "0.2em", color: "rgba(200,169,110,0.8)" }}>
          {String(slideIdx + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
        </div>
        <div style={{ position: "absolute", top: "1.25rem", left: "1.25rem", zIndex: 4, background: "rgba(8,6,4,0.72)", backdropFilter: "blur(8px)", border: "1px solid rgba(200,169,110,0.2)", padding: "5px 12px", fontFamily: "'Josefin Sans',sans-serif", fontWeight: 100, fontSize: "8px", letterSpacing: "0.3em", color: "#c8a96e", textTransform: "uppercase" }}>
          {project.category}
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 5, background: "linear-gradient(105deg,transparent 40%,rgba(200,169,110,0.07) 50%,transparent 60%)", backgroundSize: "250% 100%", backgroundPosition: hovered ? "100% 0" : "-100% 0", transition: "background-position 0.8s ease", pointerEvents: "none" }} />
      </div>

      {/* Info panel */}
      <div style={{ gridArea: "info", display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "2.5rem 6%" : "4rem 6%", background: isEven ? "linear-gradient(135deg,#0d0b07 0%,#080604 100%)" : "linear-gradient(225deg,#0d0b07 0%,#080604 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: "-5%", right: isEven ? "-3%" : "auto", left: isEven ? "auto" : "-3%", fontSize: isMobile ? "100px" : "170px", fontWeight: 300, fontStyle: "italic", color: "rgba(200,169,110,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em" }}>{project.id}</div>
        {!isMobile && (
          <>
            <div style={{ position: "absolute", top: "2rem", [isEven ? "left" : "right"]: "2rem", width: "28px", height: "28px", [isEven ? "borderLeft" : "borderRight"]: "1px solid rgba(200,169,110,0.28)", borderTop: "1px solid rgba(200,169,110,0.28)" }} />
            <div style={{ position: "absolute", bottom: "2rem", [isEven ? "right" : "left"]: "2rem", width: "28px", height: "28px", [isEven ? "borderRight" : "borderLeft"]: "1px solid rgba(200,169,110,0.28)", borderBottom: "1px solid rgba(200,169,110,0.28)" }} />
          </>
        )}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: isMobile ? "32px" : "48px", fontWeight: 300, color: "rgba(200,169,110,0.22)", lineHeight: 1 }}>{project.id}</span>
            <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 100, fontSize: "9px", letterSpacing: "0.28em", color: "rgba(200,169,110,0.55)", textTransform: "uppercase" }}>{project.city}</span>
          </div>
          <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 100, fontSize: "9px", letterSpacing: "0.35em", color: "#c8a96e", textTransform: "uppercase", marginBottom: "0.75rem" }}>{project.subtitle}</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: isMobile ? "clamp(24px,7vw,36px)" : "clamp(28px,3vw,46px)", lineHeight: 0.95, letterSpacing: "-0.02em", color: "#f0ebe4", marginBottom: "1.5rem" }}>{project.title}</h2>
          <div style={{ width: "40px", height: "1px", background: "linear-gradient(to right,#c8a96e,transparent)", marginBottom: "1.5rem" }} />
          <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 200, fontSize: "12px", letterSpacing: "0.05em", color: "rgba(240,235,228,0.52)", lineHeight: 1.9, marginBottom: "1.75rem", maxWidth: "360px" }}>{project.desc}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(200,169,110,0.1)", marginBottom: "1.5rem", maxWidth: "280px" }}>
            {[{ label: "Year", value: project.year }, { label: "Area", value: project.area }].map((m) => (
              <div key={m.label} style={{ background: "#080604", padding: "10px 14px" }}>
                <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 100, fontSize: "7px", letterSpacing: "0.3em", color: "rgba(200,169,110,0.5)", textTransform: "uppercase", marginBottom: "3px" }}>{m.label}</p>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "15px", color: "#f0ebe4", letterSpacing: "0.02em" }}>{m.value}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "2rem" }}>
            {project.tags.map((t) => <span key={t} style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 100, fontSize: "8px", letterSpacing: "0.18em", color: "rgba(240,235,228,0.38)", textTransform: "uppercase", border: "1px solid rgba(200,169,110,0.14)", padding: "4px 10px" }}>{t}</span>)}
          </div>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "14px", color: "#c8a96e", textDecoration: "none", fontFamily: "'Josefin Sans',sans-serif", fontWeight: 200, fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", transition: "gap 0.3s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.gap = "26px")}
            onMouseLeave={(e) => (e.currentTarget.style.gap = "14px")}>
            View Full Project
            <div style={{ width: "34px", height: "1px", background: "linear-gradient(to right,#c8a96e,rgba(200,169,110,0.3))", flexShrink: 0 }} />
            <span style={{ fontSize: "14px", lineHeight: 1 }}>→</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function PortfolioPage() {
  const [filter, setFilter] = useState("All");
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const [heroVisible, setHeroVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => { setCursor({ x: e.clientX, y: e.clientY }); setCursorVisible(true); };
    const onLeave = () => setCursorVisible(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseleave", onLeave); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setVisibleSections((p) => ({ ...p, [e.target.id]: true })); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  const navBg = scrollY > 60 ? "rgba(8,6,4,0.94)" : "transparent";
  const navBlur = scrollY > 60 ? "blur(24px)" : "none";

  return (
    <div style={{ fontFamily: "'Cormorant Garamond','Times New Roman',serif", background: "#080604", color: "#f0ebe4", overflowX: "hidden", cursor: isMobile ? "auto" : "none", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Josefin+Sans:wght@100;200;300;400&display=swap" rel="stylesheet" />

      {/* Custom cursor – desktop only */}
      {!isMobile && (
        <>
          <div style={{ position: "fixed", left: cursor.x, top: cursor.y, width: hovering ? 52 : 10, height: hovering ? 52 : 10, borderRadius: "50%", background: hovering ? "transparent" : "#c8a96e", border: hovering ? "1px solid #c8a96e" : "none", transform: "translate(-50%,-50%)", transition: "width 0.3s ease,height 0.3s ease,background 0.3s ease", pointerEvents: "none", zIndex: 9999, opacity: cursorVisible ? 1 : 0 }} />
          <div style={{ position: "fixed", left: cursor.x, top: cursor.y, width: 3, height: 3, borderRadius: "50%", background: "#c8a96e", transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 10000, opacity: cursorVisible && hovering ? 1 : 0, transition: "opacity 0.2s" }} />
        </>
      )}

      {/* Mobile menu overlay */}
      <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(8,6,4,0.97)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem", opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none", transition: "opacity 0.4s ease" }}>
        <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "20px", right: "5%", background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: "5px" }} aria-label="Close menu">
          <span style={{ display: "block", width: "20px", height: "1px", background: "#c8a96e", transform: "rotate(45deg) translate(4px, 4px)", transition: "transform 0.3s" }} />
          <span style={{ display: "block", width: "20px", height: "1px", background: "#c8a96e", transform: "rotate(-45deg)", transition: "transform 0.3s" }} />
        </button>
        <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 100, fontSize: "10px", letterSpacing: "0.4em", color: "#c8a96e", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          AURUM<span style={{ color: "#f0ebe4" }}>STUDIO</span>
        </div>
        {NAV_LINKS.map((l, i) => (
          <a key={l} href={`/${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
            style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "clamp(28px,8vw,44px)", letterSpacing: "-0.01em", color: l === "Portfolio" ? "#c8a96e" : "#f0ebe4", textDecoration: "none", fontStyle: l === "Portfolio" ? "italic" : "normal", opacity: menuOpen ? 1 : 0, transform: menuOpen ? "translateY(0)" : "translateY(18px)", transition: `opacity 0.4s ease ${i * 0.06 + 0.1}s, transform 0.4s ease ${i * 0.06 + 0.1}s` }}>
            {l}
          </a>
        ))}
        <div style={{ width: "32px", height: "1px", background: "rgba(200,169,110,0.2)", margin: "0.25rem 0" }} />
        <button style={{ background: "transparent", border: "1px solid rgba(200,169,110,0.45)", color: "#c8a96e", padding: "11px 30px", fontFamily: "'Josefin Sans',sans-serif", fontWeight: 200, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer" }}>
          Enquire
        </button>
      </div>

      {/* Navbar */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: navBg, backdropFilter: navBlur, WebkitBackdropFilter: navBlur, borderBottom: scrollY > 60 ? "1px solid rgba(200,169,110,0.1)" : "none", transition: "background 0.5s ease, border 0.5s ease", height: isMobile ? "64px" : "80px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 5%" }}>
        {/* Logo linked to "/" */}
        <a href="/" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
          style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 100, fontSize: isMobile ? "11px" : "13px", letterSpacing: "0.35em", color: "#c8a96e", textDecoration: "none", textTransform: "uppercase" }}>
          AURUM<span style={{ color: "#f0ebe4" }}>STUDIO</span>
        </a>

        {/* Desktop nav – hrefs via .toLowerCase() */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "2.25rem", alignItems: "center" }}>
            {NAV_LINKS.map((l) => (
              <a key={l} href={`/${l.toLowerCase()}`}
                onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
                style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 200, fontSize: "9px", letterSpacing: "0.22em", color: l === "Portfolio" ? "#c8a96e" : "rgba(240,235,228,0.6)", textDecoration: "none", textTransform: "uppercase", transition: "color 0.3s" }}>
                {l}
              </a>
            ))}
            <button onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
              style={{ background: "transparent", border: "1px solid rgba(200,169,110,0.45)", color: "#c8a96e", padding: "8px 20px", fontFamily: "'Josefin Sans',sans-serif", fontWeight: 200, fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }}>
              Enquire
            </button>
          </div>
        )}

        {/* Hamburger – mobile only */}
        {isMobile && (
          <button onClick={() => setMenuOpen(true)} aria-label="Open menu"
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", padding: "8px 0" }}>
            <span style={{ display: "block", width: "22px", height: "1px", background: "#c8a96e" }} />
            <span style={{ display: "block", width: "14px", height: "1px", background: "#c8a96e" }} />
            <span style={{ display: "block", width: "18px", height: "1px", background: "#c8a96e" }} />
          </button>
        )}
      </nav>

      {/* Hero */}
      <header style={{ paddingTop: isMobile ? "88px" : "152px", paddingBottom: isMobile ? "44px" : "76px", paddingLeft: "5%", paddingRight: "5%", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(200,169,110,0.08)" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.18, backgroundImage: `url(${image1})`, backgroundSize: "cover", backgroundPosition: "center", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(8,6,4,0.72) 0%,rgba(8,6,4,0.45) 50%,rgba(8,6,4,0.97) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "clamp(55px,16vw,230px)", fontWeight: 300, fontStyle: "italic", color: "rgba(200,169,110,0.04)", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em" }}>Portfolio</div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", gap: isMobile ? "2rem" : 0 }}>
          <div>
            <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 100, fontSize: "9px", letterSpacing: "0.45em", color: "#c8a96e", textTransform: "uppercase", marginBottom: "1rem", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s" }}>
              Selected Works · 2020–2024
            </p>
            <h1 style={{ fontWeight: 300, fontSize: isMobile ? "clamp(38px,10vw,62px)" : "clamp(52px,8vw,96px)", lineHeight: 0.9, letterSpacing: "-0.03em", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s" }}>
              <span style={{ display: "block" }}>Works of</span>
              <span style={{ display: "block", fontStyle: "italic", color: "#c8a96e" }}>Enduring</span>
              <span style={{ display: "block" }}>Beauty</span>
            </h1>
          </div>
          <div style={{ maxWidth: isMobile ? "100%" : "290px", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.9s ease 0.6s, transform 0.9s ease 0.6s" }}>
            <div style={{ width: "32px", height: "1px", background: "#c8a96e", marginBottom: "1.1rem" }} />
            <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 200, fontSize: "12px", letterSpacing: "0.05em", color: "rgba(240,235,228,0.48)", lineHeight: 1.9 }}>
              Each project is a singular act of collaboration — between client, context, and craft. We take on a maximum of eight commissions each year.
            </p>
          </div>
        </div>
        {!isMobile && <div style={{ position: "absolute", left: "5%", top: "50%", transform: "translateY(-50%)", width: "1px", height: heroVisible ? "90px" : "0px", background: "linear-gradient(to bottom,transparent,#c8a96e,transparent)", transition: "height 1.2s cubic-bezier(.22,1,.36,1) 0.4s" }} />}
      </header>

      {/* Filter bar */}
      <div id="filter-bar" data-animate style={{ padding: isMobile ? "1.1rem 5%" : "2rem 5%", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? "0.875rem" : 0, borderBottom: "1px solid rgba(200,169,110,0.08)", opacity: visibleSections["filter-bar"] ? 1 : 0, transform: visibleSections["filter-bar"] ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
        <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 100, fontSize: "8px", letterSpacing: "0.4em", color: "rgba(200,169,110,0.5)", textTransform: "uppercase", marginRight: isMobile ? 0 : "2.5rem" }}>Filter By</span>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {FILTERS.map((f, i) => (
            <button key={f} onClick={() => setFilter(f)}
              onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
              style={{ background: filter === f ? "#c8a96e" : "transparent", border: "1px solid rgba(200,169,110,0.2)", borderLeft: i > 0 ? "none" : "1px solid rgba(200,169,110,0.2)", color: filter === f ? "#080604" : "rgba(240,235,228,0.5)", padding: isMobile ? "7px 15px" : "8px 22px", fontFamily: "'Josefin Sans',sans-serif", fontWeight: filter === f ? 300 : 200, fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s ease" }}>
              {f}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: isMobile ? 0 : "auto", fontFamily: "'Josefin Sans',sans-serif", fontWeight: 100, fontSize: "9px", letterSpacing: "0.2em", color: "rgba(200,169,110,0.4)" }}>
          {filtered.length} {filtered.length === 1 ? "Project" : "Projects"}
        </div>
      </div>

      {/* Project cards */}
      <main>
        {filtered.map((project, i) => (
          <div key={project.id} id={`project-${project.id}`} data-animate>
            <ProjectCard project={project} index={i} visible={!!visibleSections[`project-${project.id}`]} isMobile={isMobile} />
          </div>
        ))}
      </main>

      {/* Awards strip */}
      <section id="awards" data-animate style={{ padding: isMobile ? "44px 5%" : "68px 5%", borderTop: "1px solid rgba(200,169,110,0.08)", borderBottom: "1px solid rgba(200,169,110,0.08)", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", flexWrap: "wrap", gap: isMobile ? "1.25rem" : "1.5rem", opacity: visibleSections["awards"] ? 1 : 0, transform: visibleSections["awards"] ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
        {isMobile && <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 100, fontSize: "8px", letterSpacing: "0.4em", color: "#c8a96e", textTransform: "uppercase", width: "100%", marginBottom: "0.25rem" }}>Recognition</p>}
        {[{ label: "AD 100 List", year: "2024" }, { label: "SBID Gold Award", year: "2023" }, { label: "Elle Décor A-List", year: "2023" }, { label: "Dezeen Award", year: "2022" }, { label: "FX International", year: "2022" }].map((a, i) => (
          <div key={i} style={{ display: "flex", flexDirection: isMobile ? "row" : "column", alignItems: "center", gap: isMobile ? "0.875rem" : 0, textAlign: "center" }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: isMobile ? "16px" : "19px", fontWeight: 300, color: "#f0ebe4", marginBottom: isMobile ? 0 : "4px" }}>{a.label}</p>
            <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 100, fontSize: "8px", letterSpacing: "0.3em", color: "rgba(200,169,110,0.5)", textTransform: "uppercase" }}>{a.year}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section id="cta" data-animate style={{ padding: isMobile ? "64px 5%" : "112px 5%", textAlign: "center", position: "relative", overflow: "hidden", opacity: visibleSections["cta"] ? 1 : 0, transform: visibleSections["cta"] ? "translateY(0)" : "translateY(40px)", transition: "opacity 1s ease, transform 1s ease" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: isMobile ? "260px" : "500px", height: isMobile ? "260px" : "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(200,169,110,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />
        <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 100, fontSize: "8px", letterSpacing: "0.4em", color: "#c8a96e", textTransform: "uppercase", marginBottom: "1.5rem" }}>Begin Your Project</p>
        <h2 style={{ fontWeight: 300, fontSize: isMobile ? "clamp(30px,8vw,46px)" : "clamp(40px,6vw,76px)", lineHeight: 0.92, letterSpacing: "-0.02em", marginBottom: "2rem" }}>
          Let Us Design<br /><span style={{ fontStyle: "italic", color: "#c8a96e" }}>Your World</span>
        </h2>
        <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 200, fontSize: "11px", letterSpacing: "0.05em", color: "rgba(240,235,228,0.4)", lineHeight: 1.9, maxWidth: "340px", margin: "0 auto 2.5rem" }}>
          We accept a limited number of commissions annually to ensure each project receives our complete creative attention.
        </p>
        <button onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
          style={{ background: "#c8a96e", border: "none", color: "#080604", padding: isMobile ? "13px 32px" : "16px 48px", fontFamily: "'Josefin Sans',sans-serif", fontWeight: 300, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", transition: "opacity 0.3s" }}>
          Start a Conversation
        </button>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(200,169,110,0.1)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: "-8%", left: "50%", transform: "translateX(-50%)", fontSize: "clamp(55px,15vw,200px)", fontWeight: 300, fontStyle: "italic", color: "rgba(200,169,110,0.03)", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em" }}>AURUM</div>
        <div style={{ padding: isMobile ? "44px 5% 0" : "56px 5% 0", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr", gap: isMobile ? "1.75rem" : "2.5rem", paddingBottom: "36px", borderBottom: "1px solid rgba(200,169,110,0.08)" }}>
            <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
              <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 100, fontSize: "12px", letterSpacing: "0.35em", color: "#c8a96e", textTransform: "uppercase", marginBottom: "0.875rem" }}>AURUM<span style={{ color: "#f0ebe4" }}>STUDIO</span></div>
              <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 200, fontSize: "11px", letterSpacing: "0.04em", color: "rgba(240,235,228,0.36)", lineHeight: 1.85, maxWidth: isMobile ? "100%" : "250px" }}>An international interior design studio dedicated to spaces of exceptional beauty.</p>
            </div>
            {[{ h: "Studio", ls: ["About", "Philosophy", "Team", "Careers", "Press"] }, { h: "Services", ls: ["Residential", "Commercial", "Concept", "Furniture"] }, { h: "Contact", ls: ["London", "Dubai", "New York", "hello@aurum.studio"] }].map((col) => (
              <div key={col.h}>
                <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 200, fontSize: "7px", letterSpacing: "0.35em", color: "#c8a96e", textTransform: "uppercase", marginBottom: "1rem" }}>{col.h}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {col.ls.map((l) => (
                    <a key={l} href="#" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
                      style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 200, fontSize: "10px", letterSpacing: "0.07em", color: "rgba(240,235,228,0.36)", textDecoration: "none", transition: "color 0.3s" }}>{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? "0.75rem" : 0, paddingTop: "20px", paddingBottom: "24px" }}>
            <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 100, fontSize: "8px", letterSpacing: "0.12em", color: "rgba(240,235,228,0.18)" }}>© 2025 Aurum Studio. All Rights Reserved.</p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80", animation: "pulse 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 100, fontSize: "8px", letterSpacing: "0.12em", color: "rgba(240,235,228,0.26)" }}>Currently accepting new enquiries</span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.5)} }
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        a:hover { color:#c8a96e !important; }
        img { -webkit-user-drag:none; user-select:none; }
      `}</style>
    </div>
  );
}