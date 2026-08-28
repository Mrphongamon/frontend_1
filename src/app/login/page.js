"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

const LOGIN_URL = "https://api.itdev.cmtc.ac.th/auth/login";

/* ════════════════════════════════════════════════
   ICONS
════════════════════════════════════════════════ */
function IconGlobe() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
function IconEye({ open }) {
  return open ? (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function IconSpinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

/* ════════════════════════════════════════════════
   FEATURE LIST (right panel)
════════════════════════════════════════════════ */
const FEATURES = [
  { emoji: "🌍", text: "Live world clocks for any timezone" },
  { emoji: "📅", text: "Smart meeting scheduler across zones" },
  { emoji: "👥", text: "Real-time team availability dashboard" },
  { emoji: "⚡", text: "REST API with 99.9% uptime SLA" },
];

/* ════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════ */
export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({ txt_username: "", txt_password: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  /* ── Redirect if already logged in ── */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/users");
    } else {
      setChecking(false);
    }
  }, [router]);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };

  const validate = () => {
    const err = {};
    if (!form.txt_username.trim()) err.txt_username = "Username is required";
    if (!form.txt_password)        err.txt_password = "Password is required";
    return err;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) { setErrors(err); return; }

    setIsLoading(true);
    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.txt_username,
          password: form.txt_password,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        if (result.token) localStorage.setItem("token", result.token);
        if (result.user)  localStorage.setItem("user", JSON.stringify(result.user));

        await Swal.fire({
          icon: "success",
          title: "Login successful!",
          timer: 1200,
          showConfirmButton: false,
        });
        router.push("/users");
        return;
      }

      if (response.status === 401) {
        setErrors({ txt_password: "Incorrect username or password" });
        await Swal.fire({
          icon: "error",
          title: "Login failed",
          text: result.message || "Incorrect username or password.",
          confirmButtonText: "Try Again",
          confirmButtonColor: "#4f8ef7",
        });
      } else if (response.status === 400) {
        await Swal.fire({
          icon: "warning",
          title: `Invalid data (${response.status})`,
          text: result.message || "Please check your input.",
          confirmButtonText: "OK",
          confirmButtonColor: "#f59e0b",
        });
      } else if (response.status >= 500) {
        await Swal.fire({
          icon: "error",
          title: `Server error (${response.status})`,
          text: result.message || "Please try again later.",
          confirmButtonText: "OK",
          confirmButtonColor: "#ef4444",
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: `Login failed (${response.status})`,
          text: result.message || "An error occurred.",
          confirmButtonText: "OK",
        });
      }
    } catch {
      await Swal.fire({
        icon: "warning",
        title: "Cannot connect to server",
        text: "Please check your internet connection and try again.",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (checking) return null;

  return (
    <>
      <style>{STYLES}</style>

      <div className="lg-page">
        {/* Background */}
        <div className="lg-orb lg-orb--1" />
        <div className="lg-orb lg-orb--2" />
        <div className="lg-orb lg-orb--3" />
        <div className="lg-grid" />

        <div className="lg-wrap">

          {/* ══════ LEFT PANEL — form ══════ */}
          <div className="lg-form-panel">

            {/* Logo */}
            <Link href="/" className="lg-logo" id="login-logo-link">
              <div className="lg-logo__icon"><IconGlobe /></div>
              <span className="lg-logo__name">TimeSync</span>
            </Link>

            {/* Heading */}
            <div className="lg-heading">
              <h1 className="lg-heading__title">Welcome back</h1>
              <p className="lg-heading__sub">Sign in to your TimeSync account</p>
            </div>

            {/* Form */}
            <form className="lg-form" onSubmit={handleLogin} id="login-form" noValidate>

              {/* Username */}
              <div className="lg-field">
                <label className="lg-label" htmlFor="lg-username">Username</label>
                <div className="lg-input-wrap">
                  <span className="lg-input-icon"><IconUser /></span>
                  <input
                    id="lg-username"
                    className={`lg-input lg-input--icon-l ${errors.txt_username ? "lg-input--error" : ""}`}
                    type="text"
                    name="txt_username"
                    value={form.txt_username}
                    onChange={set("txt_username")}
                    placeholder="Enter your username"
                    autoComplete="username"
                    autoFocus
                  />
                </div>
                {errors.txt_username && <span className="lg-error">{errors.txt_username}</span>}
              </div>

              {/* Password */}
              <div className="lg-field">
                <div className="lg-label-row">
                  <label className="lg-label" htmlFor="lg-password">Password</label>
                  <button type="button" className="lg-forgot" id="login-forgot-btn">
                    Forgot password?
                  </button>
                </div>
                <div className="lg-input-wrap">
                  <span className="lg-input-icon"><IconLock /></span>
                  <input
                    id="lg-password"
                    className={`lg-input lg-input--icon-l lg-input--icon-r ${errors.txt_password ? "lg-input--error" : ""}`}
                    type={showPw ? "text" : "password"}
                    name="txt_password"
                    value={form.txt_password}
                    onChange={set("txt_password")}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="lg-eye-btn"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label="Toggle password visibility"
                  >
                    <IconEye open={showPw} />
                  </button>
                </div>
                {errors.txt_password && <span className="lg-error">{errors.txt_password}</span>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="lg-submit"
                disabled={isLoading}
                id="login-submit-btn"
              >
                {isLoading ? (
                  <span className="lg-spinner"><IconSpinner /></span>
                ) : (
                  <>Sign In <IconArrow /></>
                )}
              </button>

              {/* Divider */}
              <div className="lg-divider"><span>or</span></div>

              {/* Register */}
              <p className="lg-register">
                Don&rsquo;t have an account?{" "}
                <Link href="/register" className="lg-register__link" id="login-register-link">
                  Create one — it&rsquo;s free
                </Link>
              </p>

            </form>
          </div>

          {/* ══════ RIGHT PANEL — promo ══════ */}
          <div className="lg-promo-panel" aria-hidden="true">
            <div className="lg-promo-panel__glow" />

            <div className="lg-promo-content">
              <div className="lg-promo__badge">
                <span className="hero__badge-dot" />
                World Time Platform
              </div>
              <h2 className="lg-promo__title">
                Schedule meetings<br />
                <span className="hero__title-gradient">across any timezone</span>
              </h2>
              <p className="lg-promo__desc">
                Join 50,000+ professionals who use TimeSync to coordinate
                their global teams effortlessly.
              </p>

              <ul className="lg-features">
                {FEATURES.map(({ emoji, text }) => (
                  <li key={text} className="lg-feature">
                    <span className="lg-feature__emoji">{emoji}</span>
                    <span className="lg-feature__text">{text}</span>
                  </li>
                ))}
              </ul>

              {/* Mini clock card row */}
              <div className="lg-clocks">
                {[
                  { city: "Bangkok", time: "09:00", code: "TH" },
                  { city: "London",  time: "03:00", code: "GB" },
                  { city: "New York", time: "22:00", code: "US" },
                ].map(({ city, time, code }) => (
                  <div key={city} className="lg-clock-card">
                    <img
                      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
                      alt={city}
                      className="lg-clock-card__flag"
                      width={24} height={16}
                    />
                    <div>
                      <div className="lg-clock-card__time">{time}</div>
                      <div className="lg-clock-card__city">{city}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════
   STYLES
════════════════════════════════════════════════ */
const STYLES = `
  /* Page */
  .lg-page {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: var(--bg-primary); position: relative; overflow: hidden;
    padding: 80px 20px; transition: background var(--transition);
  }
  .lg-page::before {
    content: ""; position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 55% 50% at 25% 50%, var(--accent-blue-glow), transparent 65%),
      radial-gradient(ellipse 40% 40% at 80% 20%, rgba(129,140,248,0.08), transparent 60%);
  }
  .lg-orb {
    position: absolute; border-radius: 50%; pointer-events: none; filter: blur(80px);
  }
  .lg-orb--1 { width: 380px; height: 380px; background: rgba(79,142,247,0.09);  top: 5%;   left: 2%;  animation: orbDrift1 14s ease-in-out infinite; }
  .lg-orb--2 { width: 280px; height: 280px; background: rgba(129,140,248,0.07); bottom: 8%; right: 4%; animation: orbDrift2 18s ease-in-out infinite 3s; }
  .lg-orb--3 { width: 200px; height: 200px; background: rgba(56,189,248,0.06);  top: 60%;  left: 40%; animation: orbDrift3 12s ease-in-out infinite 1.5s; }
  .lg-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(79,142,247,0.09) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(ellipse 80% 80% at 30% 50%, black 20%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 30% 50%, black 20%, transparent 100%);
  }

  /* Wrap */
  .lg-wrap {
    position: relative; z-index: 2; width: 100%; max-width: 980px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 0;
    background: var(--bg-card); border: 1px solid var(--bg-card-border);
    border-radius: 28px; overflow: hidden;
    box-shadow: 0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04);
    animation: fadeUp 0.5s ease both;
  }
  @media(max-width: 820px) { .lg-wrap { grid-template-columns: 1fr; max-width: 480px; } }

  /* ── Form Panel ── */
  .lg-form-panel {
    padding: 44px 40px 40px;
    display: flex; flex-direction: column; gap: 28px;
    border-right: 1px solid var(--bg-card-border);
  }
  @media(max-width: 820px) { .lg-form-panel { border-right: none; padding: 36px 28px 32px; } }

  /* Logo */
  .lg-logo {
    display: inline-flex; align-items: center; gap: 10px;
    text-decoration: none; align-self: flex-start;
  }
  .lg-logo__icon {
    width: 40px; height: 40px; border-radius: 12px; flex-shrink: 0;
    background: var(--gradient-hero); display: flex; align-items: center; justify-content: center;
    color: #fff; box-shadow: 0 0 16px var(--accent-blue-glow);
  }
  .lg-logo__name { font-size: 1.1rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.03em; }

  /* Heading */
  .lg-heading__title { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.04em; margin: 0 0 6px; }
  .lg-heading__sub   { font-size: 0.88rem; color: var(--text-secondary); margin: 0; }

  /* Form */
  .lg-form { display: flex; flex-direction: column; gap: 18px; }
  .lg-field { display: flex; flex-direction: column; gap: 7px; }
  .lg-label-row { display: flex; justify-content: space-between; align-items: center; }
  .lg-label { font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); letter-spacing: 0.02em; }
  .lg-forgot { background: none; border: none; font-size: 0.78rem; color: var(--accent-blue); cursor: pointer; padding: 0; font-family: inherit; transition: opacity var(--transition); }
  .lg-forgot:hover { opacity: 0.75; }

  /* Input */
  .lg-input-wrap { position: relative; }
  .lg-input-icon {
    position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
    color: var(--text-muted); pointer-events: none; display: flex;
  }
  .lg-eye-btn {
    position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
    background: none; border: none; color: var(--text-muted); cursor: pointer;
    display: flex; padding: 0; transition: color var(--transition);
  }
  .lg-eye-btn:hover { color: var(--text-primary); }
  .lg-input {
    width: 100%; padding: 12px 14px; border-radius: 11px;
    border: 1px solid var(--bg-card-border);
    background: var(--bg-secondary); color: var(--text-primary);
    font-family: inherit; font-size: 0.9rem; outline: none;
    transition: all var(--transition);
  }
  .lg-input::placeholder { color: var(--text-muted); }
  .lg-input:focus {
    border-color: var(--accent-blue); background: var(--bg-primary);
    box-shadow: 0 0 0 3px var(--accent-blue-soft);
  }
  .lg-input--icon-l { padding-left: 40px; }
  .lg-input--icon-r { padding-right: 40px; }
  .lg-input--error  { border-color: #ef4444 !important; box-shadow: 0 0 0 3px rgba(239,68,68,0.1) !important; }
  .lg-error { font-size: 0.74rem; color: #ef4444; font-weight: 500; }

  /* Submit */
  .lg-submit {
    width: 100%; padding: 13px 20px; border-radius: 12px; border: none; cursor: pointer;
    background: var(--gradient-hero); color: #fff;
    font-family: inherit; font-size: 0.95rem; font-weight: 700;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    box-shadow: 0 4px 20px var(--accent-blue-glow);
    transition: all var(--transition); letter-spacing: -0.01em;
  }
  .lg-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(79,142,247,0.45); filter: brightness(1.08); }
  .lg-submit:disabled { opacity: 0.65; cursor: not-allowed; }
  .lg-spinner { display: flex; animation: ctSpin 0.7s linear infinite; }
  @keyframes ctSpin { to { transform: rotate(360deg); } }

  /* Divider */
  .lg-divider {
    display: flex; align-items: center; gap: 12px;
    color: var(--text-muted); font-size: 0.78rem;
  }
  .lg-divider::before, .lg-divider::after {
    content: ""; flex: 1; height: 1px; background: var(--bg-card-border);
  }

  /* Register */
  .lg-register { text-align: center; font-size: 0.83rem; color: var(--text-muted); margin: 0; }
  .lg-register__link { color: var(--accent-blue); font-weight: 600; text-decoration: none; }
  .lg-register__link:hover { text-decoration: underline; }

  /* ── Promo Panel ── */
  .lg-promo-panel {
    position: relative; padding: 44px 40px 40px;
    background: linear-gradient(160deg, rgba(79,142,247,0.07) 0%, rgba(129,140,248,0.04) 100%);
    display: flex; align-items: center;
    overflow: hidden;
  }
  @media(max-width: 820px) { .lg-promo-panel { display: none; } }
  .lg-promo-panel__glow {
    position: absolute; width: 350px; height: 350px; border-radius: 50%;
    background: radial-gradient(circle, rgba(79,142,247,0.18), transparent 70%);
    top: 50%; left: 50%; transform: translate(-50%,-50%); pointer-events: none;
  }
  .lg-promo-content { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 20px; }
  .lg-promo__badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 5px 14px; border-radius: 100px;
    background: var(--bg-glass); border: 1px solid var(--bg-glass-border);
    backdrop-filter: blur(10px);
    font-size: 0.72rem; font-weight: 700; color: var(--text-secondary);
    letter-spacing: 0.05em; text-transform: uppercase; align-self: flex-start;
  }
  .lg-promo__title { font-size: clamp(1.4rem, 2.5vw, 1.9rem); font-weight: 800; color: var(--text-primary); letter-spacing: -0.04em; line-height: 1.2; margin: 0; }
  .lg-promo__desc  { font-size: 0.87rem; color: var(--text-secondary); line-height: 1.7; margin: 0; max-width: 300px; }

  /* Feature list */
  .lg-features { list-style: none; display: flex; flex-direction: column; gap: 11px; margin: 0; padding: 0; }
  .lg-feature   { display: flex; align-items: center; gap: 12px; }
  .lg-feature__emoji { font-size: 1.15rem; flex-shrink: 0; }
  .lg-feature__text  { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4; }

  /* Mini clocks */
  .lg-clocks { display: flex; gap: 10px; flex-wrap: wrap; }
  .lg-clock-card {
    display: flex; align-items: center; gap: 9px;
    padding: 10px 14px; border-radius: 12px;
    background: var(--bg-glass); border: 1px solid var(--bg-glass-border);
    backdrop-filter: blur(12px);
  }
  .lg-clock-card__flag { border-radius: 3px; object-fit: cover; }
  .lg-clock-card__time { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.03em; font-variant-numeric: tabular-nums; line-height: 1; }
  .lg-clock-card__city { font-size: 0.65rem; color: var(--text-muted); font-weight: 500; margin-top: 2px; }

  @media(max-width: 480px) {
    .lg-form-panel { padding: 28px 20px 24px; }
    .lg-wrap { border-radius: 20px; }
  }
`;