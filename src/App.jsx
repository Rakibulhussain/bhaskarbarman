import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

/* ================================
   DATA
================================ */
const categories = [
  {
    slug: "weddings",
    title: "Weddings",
    tagline: "Cinematic · Timeless",
    cover:
      "https://ik.imagekit.io/il1hcqwbr/img/IMG_6012.JPG.jpeg?updatedAt=1777720197448",
    photos: [
      "https://ik.imagekit.io/il1hcqwbr/img/IMG_6012.JPG.jpeg?updatedAt=1777720197448",
      "https://ik.imagekit.io/il1hcqwbr/img/IMG_6001.JPG.jpeg?updatedAt=1777720195699",
      "https://ik.imagekit.io/il1hcqwbr/img/IMG_5335.PNG?updatedAt=1777720180402",
      "https://ik.imagekit.io/il1hcqwbr/img/IMG_6488.JPG.jpeg?updatedAt=1777720179552",
      "https://ik.imagekit.io/il1hcqwbr/img/IMG_6075.JPG.jpeg?updatedAt=1777720178062",
      "https://ik.imagekit.io/il1hcqwbr/img/IMG_6037.JPG.jpeg?updatedAt=1777720177768",
      "https://ik.imagekit.io/il1hcqwbr/img/IMG_6072.JPG.jpeg?updatedAt=1777720176130",
      "https://ik.imagekit.io/il1hcqwbr/img/IMG_6065.JPG.jpeg?updatedAt=1777720174076",
      "https://ik.imagekit.io/il1hcqwbr/img/IMG_6070.JPG.jpeg?updatedAt=1777720175546",
      "https://ik.imagekit.io/il1hcqwbr/img/IMG_6086.JPG.jpeg?updatedAt=1777720175458",
    ],
  },
  {
    slug: "fashion",
    title: "Fashion",
    tagline: "Style · Identity",
    cover:
      "https://ik.imagekit.io/il1hcqwbr/img/IMG_8645.JPG.jpeg?updatedAt=1777720197089",
    photos: [
      "https://ik.imagekit.io/il1hcqwbr/img/IMG_8645.JPG.jpeg?updatedAt=1777720197089",
      "https://ik.imagekit.io/il1hcqwbr/img/IMG_8644.JPG.jpeg?updatedAt=1777720195049",
      "https://ik.imagekit.io/il1hcqwbr/img/IMG_8656.JPG.jpeg?updatedAt=1777720191631",
      "https://ik.imagekit.io/il1hcqwbr/img/IMG_8654.JPG.jpeg?updatedAt=1777720191720",
      "https://ik.imagekit.io/il1hcqwbr/img/IMG_8646.JPG.jpeg?updatedAt=1777720191476",
    ],
  },
  {
    slug: "music",
    title: "Music",
    tagline: "Live Energy",
    cover:
      "https://ik.imagekit.io/il1hcqwbr/img/IMG_5334.JPG.jpeg?updatedAt=1777720169707",
    photos: [
      "https://ik.imagekit.io/il1hcqwbr/img/WhatsApp%20Image%202026-05-02%20at%204.39.15%20PM.jpeg",
      "https://ik.imagekit.io/il1hcqwbr/img/WhatsApp%20Image%202026-05-02%20at%204.39.16%20PM.jpeg",
      "https://ik.imagekit.io/il1hcqwbr/img/WhatsApp%20Image%202026-05-02%20at%204.39.17%20PM.jpeg",
      "https://ik.imagekit.io/il1hcqwbr/img/WhatsApp%20Image%202026-05-02%20at%204.39.18%20PM.jpeg",
    ],
  },
];

/* ================================
   LIGHTBOX
================================ */
function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="lightbox" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button className="lb-close" onClick={onClose}>×</button>
      <button className="lb-nav lb-prev" onClick={onPrev}>‹</button>
      <img src={photos[index]} alt="" className="lb-img" />
      <button className="lb-nav lb-next" onClick={onNext}>›</button>
      <div className="lb-counter">{index + 1} / {photos.length}</div>
    </div>
  );
}

/* ================================
   NAVBAR
================================ */
function Navbar({ page, onNav }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <span className="nav-logo" onClick={() => onNav("home")}>
        Bhaskar Barman
      </span>
      <div className="nav-links">
        {["home", "work", "about", "contact"].map((p) => (
          <button
            key={p}
            className={`nav-btn ${page === p || (p === "work" && page === "category") ? "active" : ""}`}
            onClick={() => onNav(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ================================
   HOME
================================ */
function Home({ onNav }) {
  return (
    <div className="hero">
      <div className="hero-bg" />
      <div className="hero-grain" />
      <div className="hero-content">
        <p className="hero-eyebrow">Photography by</p>
        <h1 className="hero-title">
          Bhaskar<br />
          <em>Barman</em>
        </h1>
        <p className="hero-sub">
          Weddings · Fashion · Music — captured with cinematic intention.
        </p>
        <button className="btn-primary" onClick={() => onNav("work")}>
          View Work <span className="btn-arrow">→</span>
        </button>
      </div>
      <div className="hero-scroll">
        <span className="scroll-text">Scroll</span>
        <div className="scroll-line" />
      </div>
      <div className="hero-badge">Based in Assam, India</div>
    </div>
  );
}

/* ================================
   WORK
================================ */
function Work({ onSelectCategory }) {
  return (
    <div className="section work-section">
      <div className="section-header">
        <span className="section-label">Portfolio</span>
        <h1>My Work</h1>
        <p>Select a category to explore</p>
      </div>
      <div className="cat-grid">
        {categories.map((c, i) => (
          <div
            key={c.slug}
            className="cat-card"
            style={{ animationDelay: `${i * 0.08}s` }}
            onClick={() => onSelectCategory(c)}
          >
            <img src={c.cover} alt={c.title} loading="lazy" />
            <div className="cat-overlay">
              <span className="cat-count">{c.photos.length} photos</span>
              <div>
                <p className="cat-tagline">{c.tagline}</p>
                <h3 className="cat-title">{c.title}</h3>
              </div>
            </div>
            <div className="cat-arrow-btn">→</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================
   CATEGORY
================================ */
function Category({ category, onBack }) {
  const [lb, setLb] = useState({ open: false, idx: 0 });

  const openLb = (idx) => setLb({ open: true, idx });
  const closeLb = () => setLb({ open: false, idx: 0 });
  const prev = useCallback(() => setLb((s) => ({ ...s, idx: (s.idx - 1 + category.photos.length) % category.photos.length })), [category.photos.length]);
  const next = useCallback(() => setLb((s) => ({ ...s, idx: (s.idx + 1) % category.photos.length })), [category.photos.length]);

  return (
    <div className="section cat-section">
      <button className="back-btn" onClick={onBack}>
        ← Back to Work
      </button>
      <div className="section-header">
        <span className="section-label">{category.tagline}</span>
        <h1>{category.title}</h1>
        <p>{category.photos.length} photographs</p>
      </div>
      <div className="photo-grid">
        {category.photos.map((img, i) => (
          <div
            key={i}
            className="photo-item"
            style={{ animationDelay: `${i * 0.05}s` }}
            onClick={() => openLb(i)}
          >
            <img src={img} alt="" loading="lazy" />
            <div className="photo-hover">
              <span className="photo-expand">⤢</span>
            </div>
          </div>
        ))}
      </div>
      {lb.open && (
        <Lightbox
          photos={category.photos}
          index={lb.idx}
          onClose={closeLb}
          onPrev={prev}
          onNext={next}
        />
      )}
    </div>
  );
}

/* ================================
   ABOUT
================================ */
function About() {
  return (
    <div className="section about-section">
      <div className="about-layout">
        <div className="about-img-wrap">
          <img
            src="https://ik.imagekit.io/il1hcqwbr/img/WhatsApp%20Image%202026-05-02%20at%208.47.05%20PM%20(1).jpeg"
            alt="Bhaskar Barman"
            className="about-img"
          />

          
          <div className="about-img-tag">Guwahati, Assam</div>
        </div>
        <div className="about-text">
          <span className="section-label">The photographer</span>
          <h1>About Me</h1>
          <p>
            I'm Bhaskar Barman — a photographer from Assam with 4+ years of
            experience finding emotion in light, color, and human connection.
          </p>
          <p>
            From intimate wedding ceremonies to editorial fashion shoots and
            high-energy live music events, my work is driven by authentic
            storytelling and a cinematic eye.
          </p>
          <p>
            Every photograph is a conversation between the subject, the moment,
            and the frame. I believe in images that make you feel something.
          </p>
          <div className="about-stats">
            {[
              { num: "4+", label: "Years experience" },
              { num: "3", label: "Specialisations" },
              { num: "19", label: "Portfolio photos" },
              { num: "∞", label: "Stories told" },
            ].map((s) => (
              <div key={s.label} className="stat-box">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================
   CONTACT
================================ */
function Contact() {
  const contacts = [
    {
      icon: "✉",
      label: "Email",
      value: "barmanbhaskarrrrr914@gmail.com",
      href: "mailto:barmanbhaskarrrrr914@gmail.com",
    },
    {
      icon: "◈",
      label: "Instagram",
      value: "@iambhaskarbarman",
      href: "https://instagram.com/iambhaskarbarman",
    },
    {
      icon: "✆",
      label: "WhatsApp",
      value: "+91 93942 12929",
      href: "https://wa.me/919394212929",
    },
  ];

  return (
    <div className="section contact-section">
      <div className="section-header">
        <span className="section-label">Let's work together</span>
        <h1>Get in Touch</h1>
        <p>Available for bookings across Assam and beyond</p>
      </div>
      <div className="contact-grid">
        {contacts.map((c) => (
          <a key={c.label} className="contact-card" href={c.href} target="_blank" rel="noreferrer">
            <div className="contact-icon">{c.icon}</div>
            <div className="contact-label">{c.label}</div>
            <div className="contact-value">{c.value}</div>
            <div className="contact-arrow">→</div>
          </a>
        ))}
      </div>
      <div className="contact-note">
        <p>Response within 24 hours · Fluent in English & Assamese</p>
      </div>
    </div>
  );
}

/* ================================
   APP
================================ */
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [animKey, setAnimKey] = useState(0);

  const navigate = (p) => {
    setPage(p);
    setSelectedCategory(null);
    setAnimKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectCategory = (cat) => {
    setSelectedCategory(cat);
    setPage("category");
    setAnimKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (page) {
      case "home":     return <Home onNav={navigate} />;
      case "work":     return <Work onSelectCategory={selectCategory} />;
      case "category": return <Category category={selectedCategory} onBack={() => navigate("work")} />;
      case "about":    return <About />;
      case "contact":  return <Contact />;
      default:         return <Home onNav={navigate} />;
    }
  };

  return (
    <div className="app">
      <Navbar page={page} onNav={navigate} />
      <main key={animKey} className="page-enter">
        {renderPage()}
      </main>
    </div>
  );
}