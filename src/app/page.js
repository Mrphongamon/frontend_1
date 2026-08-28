"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ════════════════════════════════════════════════════
   ENHANCED 3D GLOBE CANVAS
   - Proper XY rotation with rotX tilt + rotY spin
   - Latitude / Longitude grid dot lines
   - Glowing equatorial ring
   - Connection lines between nearby dots
   - Atmospheric glow
════════════════════════════════════════════════════ */
function Globe3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const R = Math.min(W, H) * 0.36;
    let rotY = 0;
    const rotX = 0.28; // fixed tilt

    // ── Main surface dots ──
    const DOTS = 300;
    const dots = Array.from({ length: DOTS }, () => {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi   = Math.random() * Math.PI * 2;
      return { theta, phi, size: Math.random() * 1.9 + 0.4 };
    });

    // ── Grid lines as dot sequences ──
    const gridDots = [];
    // latitude lines
    for (let lat = -75; lat <= 75; lat += 25) {
      const theta = ((90 - lat) * Math.PI) / 180;
      for (let deg = 0; deg < 360; deg += 6) {
        gridDots.push({ theta, phi: (deg * Math.PI) / 180 });
      }
    }
    // longitude lines
    for (let lng = 0; lng < 360; lng += 30) {
      const phi = (lng * Math.PI) / 180;
      for (let lat = -88; lat <= 88; lat += 6) {
        gridDots.push({ theta: ((90 - lat) * Math.PI) / 180, phi });
      }
    }

    // ── Connection edges ──
    const EDGES = [];
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dt = Math.abs(dots[i].theta - dots[j].theta);
        const dp = Math.abs(dots[i].phi   - dots[j].phi);
        if (dt < 0.38 && dp < 0.38) EDGES.push([i, j]);
      }
    }

    // ── Project 3D sphere point → 2D screen ──
    function project(theta, phi) {
      // Sphere point
      const sx = Math.sin(theta) * Math.cos(phi + rotY);
      const sy = Math.cos(theta);
      const sz = Math.sin(theta) * Math.sin(phi + rotY);
      // Apply X-axis tilt
      const y2 = sy * Math.cos(rotX) - sz * Math.sin(rotX);
      const z2 = sy * Math.sin(rotX) + sz * Math.cos(rotX);
      // Perspective
      const fov = 900;
      const scale = fov / (fov + z2 * R);
      return { px: W / 2 + sx * R * scale, py: H / 2 + y2 * R * scale, depth: z2 };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute("data-theme") !== "light";
      const base = isDark ? [100, 160, 255] : [50, 100, 220];
      const grid = isDark ? [80, 130, 240] : [70, 110, 200];

      // ── Atmospheric glow ──
      const atm = ctx.createRadialGradient(W / 2, H / 2, R * 0.85, W / 2, H / 2, R * 1.3);
      atm.addColorStop(0, `rgba(${base.join(",")},${isDark ? 0.07 : 0.04})`);
      atm.addColorStop(1, "transparent");
      ctx.fillStyle = atm;
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, R * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // ── Project all points ──
      const pDots = dots.map((d) => ({ ...project(d.theta, d.phi), size: d.size }));
      const pGrid = gridDots.map((d) => project(d.theta, d.phi));

      // ── Grid dots ──
      pGrid.forEach((p) => {
        if (p.depth < -0.15) return;
        const a = ((p.depth + 1) / 2) * 0.16;
        ctx.beginPath();
        ctx.arc(p.px, p.py, 0.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${grid.join(",")},${a.toFixed(3)})`;
        ctx.fill();
      });

      // ── Connection lines ──
      EDGES.forEach(([i, j]) => {
        const a = pDots[i], b = pDots[j];
        if (a.depth < -0.45 || b.depth < -0.45) return;
        const alpha = Math.min(((a.depth + 1) / 2) * 0.28, ((b.depth + 1) / 2) * 0.28);
        ctx.beginPath();
        ctx.moveTo(a.px, a.py);
        ctx.lineTo(b.px, b.py);
        ctx.strokeStyle = `rgba(${base.join(",")},${alpha.toFixed(3)})`;
        ctx.lineWidth = 0.55;
        ctx.stroke();
      });

      // ── Surface dots ──
      pDots.forEach((p) => {
        if (p.depth < -0.3) return;
        const alpha = ((p.depth + 1) / 2) * 0.85 + 0.12;
        const r = Math.max(p.size * (0.7 + (p.depth + 1) / 2 * 0.5), 0.3);

        // Halo for front-facing dots
        if (p.depth > 0.55) {
          const g = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, r * 5);
          g.addColorStop(0, `rgba(${base.join(",")},0.12)`);
          g.addColorStop(1, "transparent");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.px, p.py, r * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${base.join(",")},${Math.min(alpha, 0.95).toFixed(3)})`;
        ctx.fill();
      });

      // ── Equatorial ring glow ──
      const eqA = project(Math.PI / 2, 0);
      const eqB = project(Math.PI / 2, Math.PI / 2);
      const eqRX = Math.abs(eqA.px - W / 2) || R;
      const eqRY = Math.sqrt(
        Math.pow(eqB.px - W / 2, 2) + Math.pow(eqB.py - H / 2, 2)
      ) * 0.15 + 2;

      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.rotate(-rotX * 0.4);
      ctx.beginPath();
      ctx.ellipse(0, 0, R * 1.01, R * Math.abs(Math.sin(rotX + Math.PI / 5)) + 1, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${base.join(",")},${isDark ? 0.1 : 0.12})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // inner glow
      ctx.strokeStyle = `rgba(${base.join(",")},${isDark ? 0.05 : 0.06})`;
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();

      rotY += 0.0013;
      animId = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />;
}

/* ════════════════════════════════════════════════════
   FLOATING 3D TIMEZONE CARDS (around hero globe)
════════════════════════════════════════════════════ */
function useLiveClock(tz) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString("en-US", {
        timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false,
      }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tz]);
  return time;
}

const FLOAT_CITIES = [
  { city: "Bangkok",  tz: "Asia/Bangkok",      code: "TH", pos: "float-card--tl" },
  { city: "New York", tz: "America/New_York",   code: "US", pos: "float-card--tr" },
  { city: "London",   tz: "Europe/London",      code: "GB", pos: "float-card--bl" },
  { city: "Tokyo",    tz: "Asia/Tokyo",          code: "JP", pos: "float-card--br" },
];

function FloatCard({ city, tz, code, pos }) {
  const time = useLiveClock(tz);
  return (
    <div className={`float-card ${pos}`} aria-hidden="true">
      <img src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`} alt={city} className="float-card__flag" width={28} height={18} />
      <div>
        <div className="float-card__city">{city}</div>
        <div className="float-card__time">{time}</div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   LIVE WORLD CLOCKS SECTION
════════════════════════════════════════════════════ */
const CITIES = [
  { city: "Bangkok",  country: "Thailand",        tz: "Asia/Bangkok",       code: "TH" },
  { city: "New York", country: "United States",   tz: "America/New_York",   code: "US" },
  { city: "London",   country: "United Kingdom",  tz: "Europe/London",      code: "GB" },
  { city: "Tokyo",    country: "Japan",            tz: "Asia/Tokyo",          code: "JP" },
  { city: "Dubai",    country: "UAE",              tz: "Asia/Dubai",          code: "AE" },
  { city: "Sydney",   country: "Australia",        tz: "Australia/Sydney",    code: "AU" },
];

function useFullClock(tz) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
      setDate(now.toLocaleDateString("en-US", { timeZone: tz, weekday: "short", month: "short", day: "numeric" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tz]);
  return { time, date };
}

function getOffset(tz) {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const local = new Date(now.toLocaleString("en-US", { timeZone: tz })).getTime();
  const diff = Math.round((local - utc) / 3600000);
  return diff >= 0 ? `UTC+${diff}` : `UTC${diff}`;
}

function SunSmIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
}
function MoonSmIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
}

function ClockCard({ city, tz, code, index }) {
  const { time, date } = useFullClock(tz);
  const offset = getOffset(tz);
  const isDay = (() => { const h = parseInt((time || "12").split(":")[0], 10); return h >= 6 && h < 20; })();

  return (
    <div className="clock-card" style={{ animationDelay: `${index * 0.09}s` }} id={`clock-${code.toLowerCase()}`}>
      <div className="clock-card__top">
        <img src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`} alt={city} className="clock-card__flag" width={32} height={22} />
        {isDay ? <SunSmIcon /> : <MoonSmIcon />}
      </div>
      <div className="clock-card__time">{time}</div>
      <div className="clock-card__date">{date}</div>
      <div className="clock-card__meta">
        <span className="clock-card__city">{city}</span>
        <span className="clock-card__offset">{offset}</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   FEATURES SECTION
════════════════════════════════════════════════════ */
const FEATURES = [
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: "Live World Clocks",
    desc: "Real-time clocks for any timezone — updated every second, accessible from anywhere.",
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    title: "Smart Scheduling",
    desc: "Find the perfect overlap window for your global team with visual timeline comparison.",
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    title: "Side-by-Side Compare",
    desc: "Drag a timeline to instantly see what time it is everywhere at once.",
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: "Team Zones",
    desc: "Save your team's timezones and see everyone's working hours at a glance.",
  },
];

/* ════════════════════════════════════════════════════
   TESTIMONIALS MARQUEE
════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "Stripe",
    avatar: "SC",
    color: "#6366f1",
    rating: 5,
    text: "TimeSync completely eliminated the \"what time is it for you?\" back-and-forth. Our standups run perfectly now.",
  },
  {
    name: "Marcus Webb",
    role: "Engineering Lead",
    company: "Shopify",
    avatar: "MW",
    color: "#10b981",
    rating: 5,
    text: "We have a team across 6 timezones. TimeSync is the first tool that actually made scheduling feel effortless.",
  },
  {
    name: "Priya Nair",
    role: "Remote Work Consultant",
    company: "Freelance",
    avatar: "PN",
    color: "#f59e0b",
    rating: 5,
    text: "I recommend TimeSync to every remote team I work with. It saves hours of confusion every single week.",
  },
  {
    name: "Luca Moretti",
    role: "Head of Design",
    company: "Figma",
    avatar: "LM",
    color: "#ec4899",
    rating: 5,
    text: "The 3D globe view is stunning and the live clock comparison is genuinely the most useful thing I use daily.",
  },
  {
    name: "Aisha Rahman",
    role: "Operations Director",
    company: "Airbnb",
    avatar: "AR",
    color: "#14b8a6",
    rating: 5,
    text: "Coordinating our Bangkok, London, and NYC offices used to be a nightmare. TimeSync made it trivial.",
  },
  {
    name: "Jake Thompson",
    role: "Startup Founder",
    company: "Indie Hacker",
    avatar: "JT",
    color: "#8b5cf6",
    rating: 5,
    text: "As a solo founder with clients worldwide, TimeSync is the first thing I open every morning. Absolutely essential.",
  },
  {
    name: "Yuki Tanaka",
    role: "Developer Relations",
    company: "Vercel",
    avatar: "YT",
    color: "#3b82f6",
    rating: 5,
    text: "The API is clean, the UI is gorgeous, and it actually works reliably. What more could you ask for?",
  },
  {
    name: "Clara Dubois",
    role: "Team Lead",
    company: "Notion",
    avatar: "CD",
    color: "#f97316",
    rating: 5,
    text: "Our Paris-Singapore team bridge used to be chaos. TimeSync gave us our sanity back.",
  },
];

function StarIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
}

function TestimonialCard({ name, role, company, avatar, color, rating, text }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-card__stars">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="testimonial-card__star"><StarIcon /></span>
        ))}
      </div>
      <p className="testimonial-card__text">&ldquo;{text}&rdquo;</p>
      <div className="testimonial-card__author">
        <div className="testimonial-card__avatar" style={{ background: color }}>
          {avatar}
        </div>
        <div>
          <div className="testimonial-card__name">{name}</div>
          <div className="testimonial-card__meta">{role} · {company}</div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   ARROW ICON
════════════════════════════════════════════════════ */
function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

/* ════════════════════════════════════════════════════
   HOME PAGE
════════════════════════════════════════════════════ */
export default function Home() {
  // Duplicate testimonials for seamless marquee
  const allTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero" id="hero">
        <Globe3D />

        {/* Ambient orbs */}
        <div className="hero__orb hero__orb--1" aria-hidden="true" />
        <div className="hero__orb hero__orb--2" aria-hidden="true" />
        <div className="hero__orb hero__orb--3" aria-hidden="true" />

        {/* Floating 3D timezone cards */}
        <div className="float-cards" aria-hidden="true">
          {FLOAT_CITIES.map((c) => <FloatCard key={c.tz} {...c} />)}
        </div>

        {/* Hero content */}
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            World Time Comparison Tool
          </div>
          <h1 className="hero__title">
            Schedule Across
            <span className="hero__title-gradient"> Time Zones</span>
            <br />Effortlessly
          </h1>
          <p className="hero__subtitle">
            Compare real-time clocks from Bangkok to New York. Find the best meeting
            time that works for everyone — without the timezone confusion.
          </p>
          <div className="hero__cta">
            <a href="/services" className="btn btn--primary btn--lg" id="hero-cta-start">
              Compare Timezones <ArrowRight />
            </a>
            <a href="/about" className="btn btn--ghost btn--lg" id="hero-cta-learn">
              Learn More
            </a>
          </div>
        </div>

        <div className="hero__scroll-hint" aria-hidden="true">
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ── LIVE CLOCKS ── */}
      <section className="section" id="live-clocks">
        <div className="section__inner">
          <div className="section__header">
            <p className="section__eyebrow">Real-time</p>
            <h2 className="section__title">Live World Clocks</h2>
            <p className="section__desc">
              Glance at current times across major cities — updated every second.
            </p>
          </div>
          <div className="clock-grid">
            {CITIES.map((c, i) => <ClockCard key={c.tz} {...c} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section section--alt" id="features">
        <div className="section__inner">
          <div className="section__header">
            <p className="section__eyebrow">Features</p>
            <h2 className="section__title">Everything You Need</h2>
            <p className="section__desc">
              Designed for remote teams, digital nomads, and anyone working across borders.
            </p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="feature-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonials-section" id="testimonials">
        <div className="section__inner">
          <div className="section__header">
            <p className="section__eyebrow">Testimonials</p>
            <h2 className="section__title">Loved by Teams Worldwide</h2>
            <p className="section__desc">
              From startups to global enterprises — here&rsquo;s what our users say.
            </p>
          </div>
        </div>
        {/* Full-width marquee — outside section__inner */}
        <div className="marquee-wrapper">
          <div className="marquee-fade marquee-fade--left" aria-hidden="true" />
          <div className="marquee-fade marquee-fade--right" aria-hidden="true" />
          <div className="marquee-track" aria-hidden="true">
            {allTestimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
        {/* Second row, opposite direction */}
        <div className="marquee-wrapper marquee-wrapper--row2">
          <div className="marquee-fade marquee-fade--left" aria-hidden="true" />
          <div className="marquee-fade marquee-fade--right" aria-hidden="true" />
          <div className="marquee-track marquee-track--reverse" aria-hidden="true">
            {[...allTestimonials].reverse().map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner" id="cta-banner">
        {/* 3D ring decorations */}
        <div className="cta-ring cta-ring--1" aria-hidden="true" />
        <div className="cta-ring cta-ring--2" aria-hidden="true" />
        <div className="cta-banner__inner">
          <h2 className="cta-banner__title">Ready to sync with the world?</h2>
          <p className="cta-banner__desc">
            Create a free account and start scheduling smarter today.
          </p>
          <a href="/register" className="btn btn--primary btn--lg" id="cta-register-btn">
            Get Started — It&rsquo;s Free <ArrowRight />
          </a>
        </div>
      </section>

    </div>
  );
}
