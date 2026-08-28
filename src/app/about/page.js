import Image from "next/image";
import Link from "next/link";

/* ════════════════════════════════════════════════
   META
════════════════════════════════════════════════ */
export const metadata = {
  title: "About — Pong-Amorn Sriphacharachai | TimeSync",
  description:
    "About Pong-Amorn Sriphacharachai, Student at Chiang Mai Technical College and developer of TimeSync.",
};

/* ════════════════════════════════════════════════
   ICONS
════════════════════════════════════════════════ */
function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function IconSchool() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
function IconBadge() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <circle cx="8" cy="12" r="2" />
      <line x1="12" y1="10" x2="19" y2="10" />
      <line x1="12" y1="14" x2="17" y2="14" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════ */
const SKILLS = [
  { name: "HTML / CSS",      pct: 85, color: "#f97316" },
  { name: "JavaScript",      pct: 78, color: "#f59e0b" },
  { name: "React / Next.js", pct: 72, color: "#38bdf8" },
  { name: "Node.js",         pct: 65, color: "#10b981" },
  { name: "MySQL / SQL",     pct: 70, color: "#818cf8" },
  { name: "Git & GitHub",    pct: 80, color: "#ec4899" },
];

const INTERESTS = [
  { emoji: "💻", label: "Web Development",  desc: "Building modern, responsive web applications" },
  { emoji: "🌐", label: "Open Source",       desc: "Contributing to open-source projects & community" },
  { emoji: "🎨", label: "UI/UX Design",      desc: "Crafting beautiful and intuitive user experiences" },
  { emoji: "🧩", label: "Problem Solving",   desc: "Logical thinking, algorithms & data structures" },
  { emoji: "⚡", label: "Tech Innovation",   desc: "Staying up-to-date with the latest technologies" },
];

const TIMELINE = [
  {
    year: "Present",
    title: "Information Technology Student",
    place: "Chiang Mai Technical College",
    desc: "Studying software development, computer networking, and information technology fundamentals.",
    active: true,
  },
  {
    year: "2024",
    title: "TimeSync Project",
    place: "Personal Project",
    desc: "Developed a world time comparison web app using Next.js, React, and advanced CSS animations.",
    active: false,
  },
  {
    year: "2023",
    title: "Started Web Development",
    place: "Self-study & Online Courses",
    desc: "Learned HTML, CSS, JavaScript, and React through online platforms and hands-on projects.",
    active: false,
  },
];

/* ════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <>
      <style>{`
        /* ── About Page ── */
        .ab-page { display: flex; flex-direction: column; }

        /* HERO */
        .ab-hero {
          position: relative; overflow: hidden;
          padding: 96px 24px 80px; background: var(--bg-primary);
          display: flex; align-items: center; justify-content: center;
          transition: background var(--transition);
        }
        .ab-hero::before {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 65% 55% at 50% 20%, var(--accent-blue-glow), transparent 65%),
            radial-gradient(ellipse 40% 40% at 85% 75%, rgba(129,140,248,0.1), transparent 60%);
        }
        .ab-hero__grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(79,142,247,0.12) 1.5px, transparent 1.5px);
          background-size: 36px 36px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
        }
        .ab-hero__inner {
          position: relative; z-index: 2; max-width: 900px; width: 100%;
          display: flex; align-items: center; gap: 60px;
          animation: fadeUp 0.7s ease both;
        }
        @media(max-width: 768px) {
          .ab-hero__inner { flex-direction: column; text-align: center; gap: 36px; }
        }

        /* Photo */
        .ab-photo-wrap {
          position: relative; flex-shrink: 0;
          width: 220px; height: 220px;
        }
        .ab-photo-ring1 {
          position: absolute; inset: -14px; border-radius: 50%;
          border: 1px solid rgba(79,142,247,0.2);
          animation: abRing 4s ease-in-out infinite;
        }
        .ab-photo-ring2 {
          position: absolute; inset: -28px; border-radius: 50%;
          border: 1px solid rgba(79,142,247,0.1);
          animation: abRing 4s ease-in-out infinite 1.5s;
        }
        @keyframes abRing {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.05); opacity: 0.5; }
        }
        .ab-photo {
          width: 220px; height: 220px; border-radius: 50%;
          object-fit: cover; object-position: center top;
          border: 3px solid rgba(79,142,247,0.4);
          box-shadow: 0 0 48px var(--accent-blue-glow);
        }
        .ab-photo-badge {
          position: absolute; bottom: 6px; left: 50%; transform: translateX(-50%);
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 14px; border-radius: 100px;
          background: var(--bg-glass); border: 1px solid var(--bg-glass-border);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          font-size: 0.72rem; font-weight: 600; color: var(--text-secondary);
          white-space: nowrap; z-index: 2;
        }
        .ab-photo-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #10b981; box-shadow: 0 0 6px #10b981;
          animation: pulse 2s ease infinite;
        }

        /* Text side */
        .ab-hero__text { display: flex; flex-direction: column; gap: 16px; }
        .ab-num-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 14px; border-radius: 100px;
          background: var(--bg-glass); border: 1px solid var(--bg-glass-border);
          backdrop-filter: blur(10px);
          font-size: 0.74rem; font-weight: 700; color: var(--accent-blue);
          letter-spacing: 0.06em; text-transform: uppercase; align-self: flex-start;
        }
        @media(max-width: 768px) { .ab-num-badge { align-self: center; } }
        .ab-hero__name {
          font-size: clamp(2rem, 5vw, 3.4rem); font-weight: 800;
          line-height: 1.1; letter-spacing: -0.04em; color: var(--text-primary); margin: 0;
        }
        .ab-hero__role {
          font-size: 1rem; color: var(--text-secondary); font-weight: 400; margin: 0;
        }

        /* Info pills */
        .ab-pills { display: flex; flex-wrap: wrap; gap: 10px; }
        @media(max-width: 768px) { .ab-pills { justify-content: center; } }
        .ab-pill {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 16px; border-radius: 100px;
          background: var(--bg-card); border: 1px solid var(--bg-card-border);
          backdrop-filter: blur(12px);
          font-size: 0.82rem; font-weight: 500; color: var(--text-secondary);
          text-decoration: none; transition: all var(--transition);
        }
        .ab-pill:hover { color: var(--text-primary); border-color: rgba(79,142,247,0.35); transform: translateY(-1px); }
        .ab-pill svg { color: var(--accent-blue); flex-shrink: 0; }
        .ab-pill--accent {
          background: var(--accent-blue-soft); border-color: rgba(79,142,247,0.3);
          color: var(--accent-blue);
        }

        /* CTA row */
        .ab-cta { display: flex; gap: 12px; flex-wrap: wrap; }
        @media(max-width: 768px) { .ab-cta { justify-content: center; } }

        /* STATS BAR */
        .ab-stats {
          display: flex; justify-content: center; flex-wrap: wrap;
          background: var(--bg-secondary);
          border-top: 1px solid var(--bg-card-border);
          border-bottom: 1px solid var(--bg-card-border);
          transition: background var(--transition);
        }
        .ab-stat {
          display: flex; flex-direction: column; align-items: center;
          padding: 20px 36px; gap: 4px;
          border-right: 1px solid var(--bg-card-border);
        }
        .ab-stat:last-child { border-right: none; }
        .ab-stat__num { font-size: 1.55rem; font-weight: 800; letter-spacing: -0.04em; color: var(--text-primary); line-height: 1; }
        .ab-stat__label { font-size: 0.7rem; color: var(--text-muted); font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; }

        /* TWO-COL */
        .ab-two-col {
          display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start;
        }
        @media(max-width: 900px) { .ab-two-col { grid-template-columns: 1fr; gap: 48px; } }

        /* Bio col */
        .ab-bio-col { display: flex; flex-direction: column; gap: 18px; }
        .ab-bio-title {
          font-size: clamp(1.7rem, 3.5vw, 2.4rem); font-weight: 800;
          letter-spacing: -0.04em; color: var(--text-primary); line-height: 1.2; margin: 0;
        }
        .ab-bio-text { font-size: 0.92rem; color: var(--text-secondary); line-height: 1.78; margin: 0; }
        .ab-bio-text strong { color: var(--text-primary); font-weight: 600; }
        .ab-facts { list-style: none; display: flex; flex-direction: column; gap: 10px; margin: 0; padding: 0; }
        .ab-fact { display: flex; align-items: center; gap: 10px; font-size: 0.87rem; color: var(--text-secondary); }
        .ab-fact__check {
          width: 22px; height: 22px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(16,185,129,0.12); border-radius: 50%; color: #10b981;
        }

        /* Skills col */
        .ab-skills-col { display: flex; flex-direction: column; gap: 18px; }
        .ab-skills-title { font-size: 1.3rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.03em; margin: 0 0 8px; }
        .ab-skills-list { display: flex; flex-direction: column; gap: 20px; }
        .ab-skill { display: flex; flex-direction: column; gap: 8px; }
        .ab-skill__row { display: flex; justify-content: space-between; align-items: center; }
        .ab-skill__name { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); }
        .ab-skill__pct { font-size: 0.8rem; font-weight: 700; }
        .ab-skill__track {
          height: 8px; border-radius: 100px; overflow: hidden;
          background: var(--bg-card); border: 1px solid var(--bg-card-border);
        }
        .ab-skill__fill { height: 100%; border-radius: 100px; }

        /* INTERESTS */
        .ab-interests {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;
        }
        .ab-int-card {
          background: var(--bg-card); border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-card); padding: 28px 22px;
          display: flex; flex-direction: column; gap: 12px;
          transition: all var(--transition); animation: fadeUp 0.5s ease both;
          transform-style: preserve-3d;
        }
        .ab-int-card:hover {
          transform: translateY(-5px) rotateX(2deg);
          background: var(--bg-card-hover); border-color: rgba(79,142,247,0.25);
          box-shadow: var(--shadow-card);
        }
        .ab-int-emoji { font-size: 2rem; line-height: 1; }
        .ab-int-title { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; }
        .ab-int-desc  { font-size: 0.82rem; color: var(--text-secondary); line-height: 1.6; }

        /* TIMELINE */
        .ab-timeline { display: flex; flex-direction: column; max-width: 700px; margin: 0 auto; }
        .ab-tl-item { display: grid; grid-template-columns: 110px 1fr; gap: 24px; }
        .ab-tl-side { display: flex; flex-direction: column; align-items: flex-end; padding-top: 6px; }
        .ab-tl-year {
          font-size: 0.75rem; font-weight: 700; color: var(--accent-blue);
          background: var(--accent-blue-soft); padding: 4px 10px;
          border-radius: 100px; white-space: nowrap;
        }
        .ab-tl-line { flex: 1; width: 2px; background: var(--bg-card-border); margin: 8px 0; align-self: center; }
        .ab-tl-item:last-child .ab-tl-line { display: none; }
        .ab-tl-card {
          background: var(--bg-card); border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-card); padding: 22px;
          display: flex; flex-direction: column; gap: 6px;
          margin-bottom: 20px; transition: all var(--transition);
        }
        .ab-tl-card:hover { background: var(--bg-card-hover); border-color: rgba(79,142,247,0.25); box-shadow: var(--shadow-card); }
        .ab-tl-item--active .ab-tl-card {
          border-color: rgba(79,142,247,0.4);
          box-shadow: 0 0 24px var(--accent-blue-glow);
        }
        .ab-tl-now { display: inline-flex; align-items: center; gap: 6px; font-size: 0.7rem; font-weight: 600; color: #10b981; }
        .ab-tl-now-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; box-shadow: 0 0 6px #10b981; animation: pulse 2s ease infinite; }
        .ab-tl-title { font-size: 0.98rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; }
        .ab-tl-place { font-size: 0.81rem; font-weight: 600; color: var(--accent-indigo); }
        .ab-tl-desc  { font-size: 0.84rem; color: var(--text-secondary); line-height: 1.65; }

        @media(max-width: 640px) {
          .ab-hero    { padding: 72px 20px 56px; }
          .ab-tl-item { grid-template-columns: 80px 1fr; gap: 14px; }
          .ab-stat    { padding: 14px 20px; }
          .ab-interests { grid-template-columns: 1fr 1fr; }
        }
        @media(max-width: 400px) {
          .ab-interests { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ab-page">

        {/* ── HERO ── */}
        <section className="ab-hero" id="about-hero">
          <div className="hero__orb hero__orb--1" aria-hidden="true" />
          <div className="hero__orb hero__orb--2" aria-hidden="true" />
          <div className="ab-hero__grid" aria-hidden="true" />

          <div className="ab-hero__inner">

            {/* Photo */}
            <div className="ab-photo-wrap">
              <div className="ab-photo-ring1" />
              <div className="ab-photo-ring2" />
              <Image
                src="/me.jpg"
                alt="Pong-Amorn Sriphacharachai"
                width={220}
                height={220}
                className="ab-photo"
                priority
              />
              <div className="ab-photo-badge">
                <span className="ab-photo-dot" />
                Online
              </div>
            </div>

            {/* Text side */}
            <div className="ab-hero__text">
              <div className="ab-num-badge">
                <IconBadge />
                Student No. 009
              </div>

              <h1 className="ab-hero__name">
                พงษ์อมร{" "}
                <span className="hero__title-gradient">ศรีพชรชัย</span>
              </h1>
              <p className="ab-hero__role">Web Developer &nbsp;·&nbsp; IT Student</p>

              <div className="ab-pills">
                <a href="mailto:george301149@gmail.com" className="ab-pill" id="about-email-pill">
                  <IconMail />
                  george301149@gmail.com
                </a>
                <div className="ab-pill">
                  <IconSchool />
                  Chiang Mai Technical College
                </div>
                <div className="ab-pill ab-pill--accent">
                  <IconBadge />
                  No. 009
                </div>
              </div>

              <div className="ab-cta">
                <a href="mailto:george301149@gmail.com" className="btn btn--primary btn--lg" id="about-contact-cta">
                  Get in Touch <IconArrow />
                </a>
                <Link href="/services" className="btn btn--ghost btn--lg" id="about-services-btn">
                  View Services
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ── STATS BAR ── */}
        <div className="ab-stats">
          {[
            { num: "009",  label: "Student ID" },
            { num: "3+",   label: "Years of Experience" },
            { num: "6+",   label: "Core Skills" },
            { num: "100%", label: "Dedication" },
          ].map((s) => (
            <div key={s.label} className="ab-stat">
              <span className="ab-stat__num">{s.num}</span>
              <span className="ab-stat__label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── ABOUT ME ── */}
        <section className="section" id="about-me">
          <div className="section__inner">
            <div className="ab-two-col">

              {/* Bio */}
              <div className="ab-bio-col">
                <p className="section__eyebrow">About Me</p>
                <h2 className="ab-bio-title">
                  Hi, I&rsquo;m<br />
                  <span className="hero__title-gradient">Pong-Amorn</span>
                </h2>
                <p className="ab-bio-text">
                  I&rsquo;m an Information Technology student at <strong>Chiang Mai Technical College</strong>,
                  passionate about building modern web applications and creating digital experiences
                  that are both beautiful and functional.
                </p>
                <p className="ab-bio-text">
                  I enjoy learning new technologies and have a special interest in Front-end Development,
                  UI/UX Design, and building products that solve real-world problems. TimeSync is one of
                  the projects I&rsquo;m most proud of.
                </p>
                <ul className="ab-facts">
                  {[
                    "Currently studying at Chiang Mai Technical College",
                    "Email: george301149@gmail.com",
                    "Passionate about beautiful UI design",
                    "Committed to improving skills every day",
                    "Interested in Open Source & Community",
                  ].map((f) => (
                    <li key={f} className="ab-fact">
                      <span className="ab-fact__check"><IconCheck /></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div className="ab-skills-col">
                <p className="section__eyebrow">Skills</p>
                <h3 className="ab-skills-title">Technologies I Use</h3>
                <div className="ab-skills-list">
                  {SKILLS.map(({ name, pct, color }) => (
                    <div key={name} className="ab-skill">
                      <div className="ab-skill__row">
                        <span className="ab-skill__name">{name}</span>
                        <span className="ab-skill__pct" style={{ color }}>{pct}%</span>
                      </div>
                      <div className="ab-skill__track">
                        <div
                          className="ab-skill__fill"
                          style={{
                            width: `${pct}%`,
                            background: `linear-gradient(90deg, ${color}88, ${color})`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── INTERESTS ── */}
        <section className="section section--alt" id="about-interests">
          <div className="section__inner">
            <div className="section__header">
              <p className="section__eyebrow">Interests</p>
              <h2 className="section__title">My Passions</h2>
              <p className="section__desc">Things I love doing and keep me motivated every single day.</p>
            </div>
            <div className="ab-interests">
              {INTERESTS.map(({ emoji, label, desc }, i) => (
                <div
                  key={label}
                  className="ab-int-card"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="ab-int-emoji">{emoji}</div>
                  <h3 className="ab-int-title">{label}</h3>
                  <p className="ab-int-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="section" id="about-timeline">
          <div className="section__inner">
            <div className="section__header">
              <p className="section__eyebrow">Journey</p>
              <h2 className="section__title">My Story</h2>
              <p className="section__desc">My educational path and development journey so far.</p>
            </div>
            <div className="ab-timeline">
              {TIMELINE.map((item, i) => (
                <div key={i} className={`ab-tl-item${item.active ? " ab-tl-item--active" : ""}`}>
                  <div className="ab-tl-side">
                    <span className="ab-tl-year">{item.year}</span>
                    <div className="ab-tl-line" />
                  </div>
                  <div className="ab-tl-card">
                    {item.active && (
                      <span className="ab-tl-now">
                        <span className="ab-tl-now-dot" />
                        Currently
                      </span>
                    )}
                    <h3 className="ab-tl-title">{item.title}</h3>
                    <p className="ab-tl-place">{item.place}</p>
                    <p className="ab-tl-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-banner" id="about-cta">
          <div className="cta-ring cta-ring--1" aria-hidden="true" />
          <div className="cta-ring cta-ring--2" aria-hidden="true" />
          <div className="cta-banner__inner">
            <h2 className="cta-banner__title">Want to get in touch?</h2>
            <p className="cta-banner__desc">
              Interested in collaborating or just want to talk about tech? Drop me an email anytime!
            </p>
            <a
              href="mailto:george301149@gmail.com"
              className="btn btn--primary btn--lg"
              id="about-final-cta"
            >
              george301149@gmail.com <IconArrow />
            </a>
          </div>
        </section>

      </div>
    </>
  );
}
