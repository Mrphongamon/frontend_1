"use client";

import { useState } from "react";
import Link from "next/link";

/* ════════════════════════════════════════════════
   META — exported separately for server rendering
   (page itself is client for form state)
════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════
   ICONS
════════════════════════════════════════════════ */
function IconMail() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.87a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.27.92z" />
    </svg>
  );
}
function IconLocation() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconSend() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconGithub() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}
function IconLinkedin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
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

/* ════════════════════════════════════════════════
   CONTACT INFO DATA
════════════════════════════════════════════════ */
const INFO_CARDS = [
  {
    icon: IconMail,
    label: "Email",
    value: "george301149@gmail.com",
    href: "mailto:george301149@gmail.com",
    color: "#4f8ef7",
  },
  {
    icon: IconLocation,
    label: "Location",
    value: "Chiang Mai, Thailand",
    href: "https://maps.google.com/?q=Chiang+Mai+Technical+College",
    color: "#10b981",
  },
  {
    icon: IconClock,
    label: "Response Time",
    value: "Usually within 24 hours",
    href: null,
    color: "#f59e0b",
  },
  {
    icon: IconPhone,
    label: "Phone",
    value: "093227234",
    href: null,
    color: "#818cf8",
  },
];

const SOCIALS = [
  { icon: IconGithub,   label: "GitHub",   href: "https://github.com/", color: "#eef2ff" },
  { icon: IconFacebook, label: "Facebook",  href: "https://facebook.com/", color: "#1877f2" },
  { icon: IconLinkedin, label: "LinkedIn",  href: "https://linkedin.com/", color: "#0a66c2" },
];

const TOPICS = [
  "General Inquiry",
  "Collaboration / Project",
  "Technical Question",
  "Job Opportunity",
  "Other",
];

/* ════════════════════════════════════════════════
   FORM COMPONENT
════════════════════════════════════════════════ */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", topic: TOPICS[0], message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate network delay — replace with real fetch() call when backend is ready
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("done");
  };

  if (status === "done") {
    return (
      <div className="ct-success">
        <div className="ct-success__icon">
          <IconCheck />
        </div>
        <h3 className="ct-success__title">Message Sent!</h3>
        <p className="ct-success__desc">
          Thanks for reaching out, <strong>{form.name}</strong>. I&rsquo;ll get back to you at{" "}
          <strong>{form.email}</strong> as soon as possible.
        </p>
        <button
          className="btn btn--ghost btn--sm"
          onClick={() => { setForm({ name: "", email: "", topic: TOPICS[0], message: "" }); setStatus("idle"); }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="ct-form" onSubmit={handleSubmit} id="contact-form">
      <div className="ct-form__row">
        <div className="ct-field">
          <label className="ct-label" htmlFor="cf-name">Full Name</label>
          <input
            id="cf-name"
            className="ct-input"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={set("name")}
            required
          />
        </div>
        <div className="ct-field">
          <label className="ct-label" htmlFor="cf-email">Email Address</label>
          <input
            id="cf-email"
            className="ct-input"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={set("email")}
            required
          />
        </div>
      </div>

      <div className="ct-field">
        <label className="ct-label" htmlFor="cf-topic">Topic</label>
        <select id="cf-topic" className="ct-input ct-select" value={form.topic} onChange={set("topic")}>
          {TOPICS.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div className="ct-field">
        <label className="ct-label" htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          className="ct-input ct-textarea"
          placeholder="Write your message here…"
          rows={5}
          value={form.message}
          onChange={set("message")}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn--primary btn--lg ct-submit"
        id="contact-submit-btn"
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          <span className="ct-spinner" />
        ) : (
          <><IconSend /> Send Message</>
        )}
      </button>
    </form>
  );
}

/* ════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════ */
export default function ContactPage() {
  return (
    <>
      <style>{`
        /* ── Contact Page ── */
        .ct-page { display: flex; flex-direction: column; }

        /* HERO */
        .ct-hero {
          position: relative; overflow: hidden;
          padding: 96px 24px 72px; background: var(--bg-primary);
          display: flex; align-items: center; justify-content: center;
          transition: background var(--transition);
        }
        .ct-hero::before {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 55% at 50% 15%, var(--accent-blue-glow), transparent 65%),
            radial-gradient(ellipse 38% 38% at 88% 78%, rgba(129,140,248,0.1), transparent 60%);
        }
        .ct-hero__grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(79,142,247,0.12) 1.5px, transparent 1.5px);
          background-size: 36px 36px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
        }
        .ct-hero__content {
          position: relative; z-index: 2; max-width: 680px;
          text-align: center; display: flex; flex-direction: column;
          align-items: center; gap: 18px; animation: fadeUp 0.7s ease both;
        }
        .ct-hero__badge {
          display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px;
          border-radius: 100px; border: 1px solid var(--bg-glass-border);
          background: var(--bg-glass); backdrop-filter: blur(10px);
          font-size: 0.75rem; font-weight: 700; color: var(--accent-blue);
          letter-spacing: 0.06em; text-transform: uppercase;
        }
        .ct-hero__title {
          font-size: clamp(2rem, 5.5vw, 3.6rem); font-weight: 800;
          line-height: 1.1; letter-spacing: -0.04em; color: var(--text-primary); margin: 0;
        }
        .ct-hero__sub {
          font-size: clamp(0.95rem, 2vw, 1.08rem); color: var(--text-secondary);
          max-width: 480px; line-height: 1.7; margin: 0;
        }

        /* MAIN GRID */
        .ct-main {
          padding: 80px 24px 96px; background: var(--bg-primary);
          transition: background var(--transition);
        }
        .ct-main__inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.5fr; gap: 52px; align-items: start; }
        @media(max-width: 900px) { .ct-main__inner { grid-template-columns: 1fr; } }

        /* INFO COLUMN */
        .ct-info-col { display: flex; flex-direction: column; gap: 24px; }
        .ct-info-head { display: flex; flex-direction: column; gap: 8px; }
        .ct-info-eyebrow { font-size: 0.73rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent-blue); }
        .ct-info-title { font-size: 1.6rem; font-weight: 800; letter-spacing: -0.03em; color: var(--text-primary); margin: 0; }
        .ct-info-desc { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.72; margin: 0; }

        /* Info cards */
        .ct-info-cards { display: flex; flex-direction: column; gap: 14px; }
        .ct-info-card {
          display: flex; align-items: center; gap: 16px;
          background: var(--bg-card); border: 1px solid var(--bg-card-border);
          border-radius: 14px; padding: 18px 20px;
          text-decoration: none; transition: all var(--transition);
        }
        .ct-info-card:hover { background: var(--bg-card-hover); border-color: rgba(79,142,247,0.28); transform: translateX(4px); }
        .ct-info-card__icon {
          width: 46px; height: 46px; border-radius: 13px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--accent-blue-soft); border: 1px solid rgba(79,142,247,0.18);
          color: var(--accent-blue); transition: all var(--transition);
        }
        .ct-info-card:hover .ct-info-card__icon { transform: scale(1.08) rotate(-5deg); background: var(--accent-blue-glow); }
        .ct-info-card__label { font-size: 0.73rem; font-weight: 600; color: var(--text-muted); letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 3px; }
        .ct-info-card__value { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); }

        /* Socials */
        .ct-socials-title { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; }
        .ct-socials { display: flex; gap: 10px; }
        .ct-social {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 16px; border-radius: 10px;
          background: var(--bg-card); border: 1px solid var(--bg-card-border);
          color: var(--text-secondary); text-decoration: none; font-size: 0.84rem; font-weight: 500;
          transition: all var(--transition);
        }
        .ct-social:hover { background: var(--bg-card-hover); color: var(--text-primary); transform: translateY(-2px); border-color: rgba(79,142,247,0.3); }

        /* FORM COLUMN */
        .ct-form-col {
          background: var(--bg-card); border: 1px solid var(--bg-card-border);
          border-radius: 20px; padding: 40px;
          backdrop-filter: blur(16px);
          box-shadow: var(--shadow-card);
        }
        @media(max-width: 600px) { .ct-form-col { padding: 28px 20px; } }
        .ct-form-head { margin-bottom: 28px; }
        .ct-form-title { font-size: 1.4rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.03em; margin: 0 0 6px; }
        .ct-form-sub   { font-size: 0.87rem; color: var(--text-secondary); line-height: 1.6; margin: 0; }

        /* Form elements */
        .ct-form { display: flex; flex-direction: column; gap: 20px; }
        .ct-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media(max-width: 600px) { .ct-form__row { grid-template-columns: 1fr; } }
        .ct-field { display: flex; flex-direction: column; gap: 7px; }
        .ct-label { font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); letter-spacing: 0.02em; }
        .ct-input {
          padding: 11px 15px; border-radius: 10px;
          border: 1px solid var(--bg-card-border);
          background: var(--bg-primary); color: var(--text-primary);
          font-family: inherit; font-size: 0.9rem; outline: none;
          transition: all var(--transition);
        }
        .ct-input::placeholder { color: var(--text-muted); }
        .ct-input:focus {
          border-color: var(--accent-blue);
          background: var(--bg-secondary);
          box-shadow: 0 0 0 3px var(--accent-blue-soft);
        }
        .ct-select { cursor: pointer; appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%234f8ef7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center;
          padding-right: 40px;
        }
        .ct-textarea { resize: vertical; min-height: 130px; }
        .ct-submit { width: 100%; justify-content: center; gap: 10px; }
        .ct-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        /* Spinner */
        .ct-spinner {
          width: 18px; height: 18px; border-radius: 50%;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          animation: ctSpin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes ctSpin { to { transform: rotate(360deg); } }

        /* Success state */
        .ct-success {
          display: flex; flex-direction: column; align-items: center; gap: 16px;
          padding: 32px 16px; text-align: center;
          animation: fadeUp 0.4s ease both;
        }
        .ct-success__icon {
          width: 72px; height: 72px; border-radius: 50%;
          background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.25);
          display: flex; align-items: center; justify-content: center;
          color: #10b981;
        }
        .ct-success__title { font-size: 1.4rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.03em; margin: 0; }
        .ct-success__desc  { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7; max-width: 360px; margin: 0; }
        .ct-success__desc strong { color: var(--text-primary); }

        /* FAQ STRIP */
        .ct-faq {
          padding: 64px 24px 80px; background: var(--bg-alt);
          transition: background var(--transition);
        }
        .ct-faq__inner { max-width: 820px; margin: 0 auto; }
        .ct-faq__header { text-align: center; margin-bottom: 40px; }
        .ct-faq__list { display: flex; flex-direction: column; gap: 14px; }
        .ct-faq__item {
          background: var(--bg-card); border: 1px solid var(--bg-card-border);
          border-radius: 14px; padding: 22px 26px;
          transition: all var(--transition);
        }
        .ct-faq__item:hover { background: var(--bg-card-hover); border-color: rgba(79,142,247,0.25); }
        .ct-faq__q { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0 0 8px; letter-spacing: -0.01em; }
        .ct-faq__a { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.7; margin: 0; }
      `}</style>

      <div className="ct-page">

        {/* ── HERO ── */}
        <section className="ct-hero" id="contact-hero">
          <div className="hero__orb hero__orb--1" aria-hidden="true" />
          <div className="hero__orb hero__orb--2" aria-hidden="true" />
          <div className="ct-hero__grid" aria-hidden="true" />

          <div className="ct-hero__content">
            <div className="ct-hero__badge">
              <span className="hero__badge-dot" />
              Always Happy to Connect
            </div>
            <h1 className="ct-hero__title">
              Get in{" "}
              <span className="hero__title-gradient">Touch</span>
            </h1>
            <p className="ct-hero__sub">
             ยินดีต้อนรับ
            </p>
          </div>
        </section>

        {/* ── MAIN ── */}
        <div className="ct-main">
          <div className="ct-main__inner">

            {/* LEFT — contact info */}
            <div className="ct-info-col">
              <div className="ct-info-head">
                <p className="ct-info-eyebrow">Contact Info</p>
                <h2 className="ct-info-title">มาพูด&rsquo;คุยกัน</h2>
                <p className="ct-info-desc">
                  ไม่ว่าจะสงสัยเรื่องฟีเจอร์การใช้งาน อยากชวนมาร่วมงานกัน หรือมีเรื่องอื่นอยากสอบถาม — ส่งข้อความมาหาได้ตลอดเลยนะ แล้วฉันจะรีบตอบกลับให้เร็วที่สุด! I&rsquo;ll do my best to get back to you promptly.
                </p>
              </div>

              <div className="ct-info-cards">
                {INFO_CARDS.map(({ icon: Icon, label, value, href }) =>
                  href ? (
                    <a key={label} href={href} className="ct-info-card" id={`contact-info-${label.toLowerCase()}`} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      <div className="ct-info-card__icon"><Icon /></div>
                      <div>
                        <div className="ct-info-card__label">{label}</div>
                        <div className="ct-info-card__value">{value}</div>
                      </div>
                    </a>
                  ) : (
                    <div key={label} className="ct-info-card" id={`contact-info-${label.toLowerCase().replace(/ /g, "-")}`}>
                      <div className="ct-info-card__icon"><Icon /></div>
                      <div>
                        <div className="ct-info-card__label">{label}</div>
                        <div className="ct-info-card__value">{value}</div>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div>
                <p className="ct-socials-title">Find me on</p>
                <div className="ct-socials">
                  {SOCIALS.map(({ icon: Icon, label, href }) => (
                    <a key={label} href={href} className="ct-social" target="_blank" rel="noreferrer" id={`social-${label.toLowerCase()}`}>
                      <Icon /> {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — form */}
            <div className="ct-form-col">
              <div className="ct-form-head">
                <h2 className="ct-form-title">Send a Message</h2>
                <p className="ct-form-sub">
                  รายงานปัญหาการใช้งาน.
                </p>
              </div>
              <ContactForm />
            </div>

          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="ct-faq" id="contact-faq">
          <div className="ct-faq__inner">
            <div className="ct-faq__header">
              <p className="section__eyebrow">FAQ</p>
              <h2 className="section__title">Common Questions</h2>
            </div>
            <div className="ct-faq__list">
              {[
                {
                  q: "How quickly do you respond to messages?",
                  a: "I typically respond within 24 hours on weekdays. For urgent matters, feel free to mention it in your message.",
                },
                {
                  q: "Are you open to freelance or part-time projects?",
                  a: "Yes! I'm open to interesting projects, collaborations, and internship opportunities. Feel free to reach out with details.",
                },
                {
                  q: "What kinds of projects are you interested in?",
                  a: "I enjoy front-end and full-stack web projects — especially those involving clean UI, interesting data, or tools that help people.",
                },
                {
                  q: "Can I use TimeSync on my own website?",
                  a: "Absolutely. Check out the Services page for our embeddable widgets and API options.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="ct-faq__item">
                  <p className="ct-faq__q">{q}</p>
                  <p className="ct-faq__a">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA BANNER ── */}
        <section className="cta-banner" id="contact-cta">
          <div className="cta-ring cta-ring--1" aria-hidden="true" />
          <div className="cta-ring cta-ring--2" aria-hidden="true" />
          <div className="cta-banner__inner">
            <h2 className="cta-banner__title">Ready to sync with the world?</h2>
            <p className="cta-banner__desc">
              Explore TimeSync's full feature set — from live world clocks to team dashboards.
            </p>
            <Link href="/services" className="btn btn--primary btn--lg" id="contact-explore-btn">
              Explore Services <IconArrow />
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
