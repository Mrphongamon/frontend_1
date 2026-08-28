"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

/* ════════════════════════════════════════════════
   ICONS
════════════════════════════════════════════════ */
function IconUser() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconCheckBig() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconArrowRight() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function IconArrowLeft() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  );
}
function IconEye({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}
function IconSpinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

/* ════════════════════════════════════════════════
   STEP DEFINITIONS
════════════════════════════════════════════════ */
const STEPS = [
  { id: 1, label: "Personal Info",  Icon: IconUser   },
  { id: 2, label: "Account Setup",  Icon: IconShield },
  { id: 3, label: "Review",         Icon: IconCheck  },
];

/* ════════════════════════════════════════════════
   PASSWORD STRENGTH
════════════════════════════════════════════════ */
function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8)             score++;
  if (/[A-Z]/.test(pw))           score++;
  if (/[0-9]/.test(pw))           score++;
  if (/[^A-Za-z0-9]/.test(pw))   score++;
  return score; // 0-4
}
const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["", "#ef4444", "#f59e0b", "#10b981", "#4f8ef7"];

/* ════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════ */
export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep]   = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone]   = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [form, setForm] = useState({
    txt_firstname: "",
    txt_lastname:  "",
    txt_username:  "",
    txt_password:  "",
  });

  const [errors, setErrors] = useState({});

  /* ── Detect logged-in state ── */
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };

  /* ── Validation per step ── */
  const validate = (s) => {
    const err = {};
    if (s === 1) {
      if (!form.txt_firstname.trim()) err.txt_firstname = "First name is required";
      if (!form.txt_lastname.trim())  err.txt_lastname  = "Last name is required";
    }
    if (s === 2) {
      if (!form.txt_username.trim())         err.txt_username = "Username is required";
      else if (form.txt_username.length < 3) err.txt_username = "At least 3 characters";
      if (!form.txt_password)                err.txt_password = "Password is required";
      else if (form.txt_password.length < 6) err.txt_password = "At least 6 characters";
    }
    return err;
  };

  const next = () => {
    const err = validate(step);
    if (Object.keys(err).length) { setErrors(err); return; }
    setStep((s) => s + 1);
  };
  const back = () => setStep((s) => s - 1);

  /* ── Submit ── */
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.itdev.cmtc.ac.th/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: form.txt_firstname,
          lastname:  form.txt_lastname,
          username:  form.txt_username,
          password:  form.txt_password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setDone(true);
      } else if (response.status === 400) {
        await Swal.fire({
          icon: "warning",
          title: `Invalid data (${response.status})`,
          text: result.message || "Please check your information.",
          confirmButtonText: "OK",
          confirmButtonColor: "#4f8ef7",
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: `Server error (${response.status})`,
          text: "Something went wrong. Please try again later.",
          confirmButtonText: "OK",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Connection failed",
        text: "Please check your internet connection and try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  const pwStrength = getStrength(form.txt_password);

  /* ════════ SUCCESS SCREEN ════════ */
  if (done) {
    return (
      <>
        <style>{STYLES}</style>
        <div className="rg-page">
          <div className="rg-bg-orb rg-bg-orb--1" />
          <div className="rg-bg-orb rg-bg-orb--2" />
          <div className="rg-grid" />
          <div className="rg-success">
            <div className="rg-success__ring">
              <div className="rg-success__icon"><IconCheckBig /></div>
            </div>
            <h1 className="rg-success__title">Account Created!</h1>
            <p className="rg-success__desc">
              Welcome, <strong>{form.txt_firstname} {form.txt_lastname}</strong>!<br />
              Your account <strong>@{form.txt_username}</strong> is ready to go.
            </p>
            <div className="rg-success__actions">
              {isLoggedIn ? (
                <Link href="/users" className="btn btn--primary btn--lg">
                  <IconArrowLeft /> Back to Users
                </Link>
              ) : (
                <Link href="/login" className="btn btn--primary btn--lg">
                  Sign In Now <IconArrowRight />
                </Link>
              )}
              <Link href="/" className="btn btn--ghost btn--sm">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ════════ MAIN FORM ════════ */
  return (
    <>
      <style>{STYLES}</style>

      <div className="rg-page">
        {/* Background */}
        <div className="rg-bg-orb rg-bg-orb--1" />
        <div className="rg-bg-orb rg-bg-orb--2" />
        <div className="rg-grid" />

        <div className="rg-card">

          {/* ── Card Header ── */}
          <div className="rg-header">
            <div className="rg-header__logo">
              <IconGlobe />
            </div>
            <div style={{ flex: 1 }}>
              <h1 className="rg-header__title">Create Account</h1>
              <p className="rg-header__sub">Join TimeSync — free forever</p>
            </div>
            {isLoggedIn && (
              <Link href="/users" className="rg-back-users-btn" id="register-back-users-btn">
                <IconArrowLeft /> Back to Users
              </Link>
            )}
          </div>

          {/* ── Stepper ── */}
          <div className="rg-stepper">
            {STEPS.map(({ id, label, Icon }, idx) => {
              const state = id < step ? "done" : id === step ? "active" : "idle";
              return (
                <div key={id} className="rg-stepper__item">
                  <div className={`rg-stepper__circle rg-stepper__circle--${state}`}>
                    {state === "done" ? <IconCheck /> : <Icon />}
                  </div>
                  <span className={`rg-stepper__label rg-stepper__label--${state}`}>{label}</span>
                  {idx < STEPS.length - 1 && (
                    <div className={`rg-stepper__line rg-stepper__line--${id < step ? "done" : "idle"}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Step Content ── */}
          <div className="rg-body" key={step}>

            {/* STEP 1 — Personal Info */}
            {step === 1 && (
              <div className="rg-step rg-step--in">
                <div className="rg-step__head">
                  <p className="rg-step__eyebrow">Step 1 of 3</p>
                  <h2 className="rg-step__title">What&rsquo;s your name?</h2>
                  <p className="rg-step__desc">Tell us how you&rsquo;d like to be addressed.</p>
                </div>
                <div className="rg-fields rg-fields--two">
                  <div className="rg-field">
                    <label className="rg-label" htmlFor="rg-firstname">First Name</label>
                    <input
                      id="rg-firstname"
                      className={`rg-input ${errors.txt_firstname ? "rg-input--error" : ""}`}
                      type="text"
                      name="txt_firstname"
                      value={form.txt_firstname}
                      onChange={set("txt_firstname")}
                      placeholder="e.g. Pong-Amorn"
                      autoFocus
                    />
                    {errors.txt_firstname && <span className="rg-error">{errors.txt_firstname}</span>}
                  </div>
                  <div className="rg-field">
                    <label className="rg-label" htmlFor="rg-lastname">Last Name</label>
                    <input
                      id="rg-lastname"
                      className={`rg-input ${errors.txt_lastname ? "rg-input--error" : ""}`}
                      type="text"
                      name="txt_lastname"
                      value={form.txt_lastname}
                      onChange={set("txt_lastname")}
                      placeholder="e.g. Sriphacharachai"
                    />
                    {errors.txt_lastname && <span className="rg-error">{errors.txt_lastname}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 — Account Setup */}
            {step === 2 && (
              <div className="rg-step rg-step--in">
                <div className="rg-step__head">
                  <p className="rg-step__eyebrow">Step 2 of 3</p>
                  <h2 className="rg-step__title">Set up your account</h2>
                  <p className="rg-step__desc">Choose a username and a strong password.</p>
                </div>
                <div className="rg-fields">
                  <div className="rg-field">
                    <label className="rg-label" htmlFor="rg-username">Username</label>
                    <div className="rg-input-wrap">
                      <span className="rg-input-prefix">@</span>
                      <input
                        id="rg-username"
                        className={`rg-input rg-input--prefixed ${errors.txt_username ? "rg-input--error" : ""}`}
                        type="text"
                        name="txt_username"
                        value={form.txt_username}
                        onChange={set("txt_username")}
                        placeholder="your_username"
                        autoFocus
                      />
                    </div>
                    {errors.txt_username && <span className="rg-error">{errors.txt_username}</span>}
                  </div>
                  <div className="rg-field">
                    <label className="rg-label" htmlFor="rg-password">Password</label>
                    <div className="rg-input-wrap">
                      <input
                        id="rg-password"
                        className={`rg-input rg-input--suffixed ${errors.txt_password ? "rg-input--error" : ""}`}
                        type={showPw ? "text" : "password"}
                        name="txt_password"
                        value={form.txt_password}
                        onChange={set("txt_password")}
                        placeholder="Min. 6 characters"
                      />
                      <button type="button" className="rg-input-suffix" onClick={() => setShowPw((v) => !v)} aria-label="Toggle password">
                        <IconEye open={showPw} />
                      </button>
                    </div>
                    {errors.txt_password && <span className="rg-error">{errors.txt_password}</span>}
                    {/* Strength bar */}
                    {form.txt_password && (
                      <div className="rg-strength">
                        <div className="rg-strength__bars">
                          {[1,2,3,4].map((i) => (
                            <div
                              key={i}
                              className="rg-strength__bar"
                              style={{ background: i <= pwStrength ? STRENGTH_COLORS[pwStrength] : undefined }}
                            />
                          ))}
                        </div>
                        <span className="rg-strength__label" style={{ color: STRENGTH_COLORS[pwStrength] }}>
                          {STRENGTH_LABELS[pwStrength]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 — Review */}
            {step === 3 && (
              <div className="rg-step rg-step--in">
                <div className="rg-step__head">
                  <p className="rg-step__eyebrow">Step 3 of 3</p>
                  <h2 className="rg-step__title">Almost there!</h2>
                  <p className="rg-step__desc">Review your details before creating the account.</p>
                </div>
                <div className="rg-review">
                  <div className="rg-review__avatar">
                    {form.txt_firstname.charAt(0).toUpperCase()}{form.txt_lastname.charAt(0).toUpperCase()}
                  </div>
                  <div className="rg-review__rows">
                    {[
                      { label: "First Name", value: form.txt_firstname },
                      { label: "Last Name",  value: form.txt_lastname  },
                      { label: "Username",   value: `@${form.txt_username}` },
                      { label: "Password",   value: "••••••••" },
                    ].map(({ label, value }) => (
                      <div key={label} className="rg-review__row">
                        <span className="rg-review__row-label">{label}</span>
                        <span className="rg-review__row-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="rg-tos">
                  By creating an account you agree to our{" "}
                  <Link href="#" className="rg-tos__link">Terms of Service</Link> and{" "}
                  <Link href="#" className="rg-tos__link">Privacy Policy</Link>.
                </p>
              </div>
            )}

          </div>

          {/* ── Navigation ── */}
          <div className="rg-nav">
            {step > 1 && (
              <button type="button" className="btn btn--ghost btn--sm rg-nav__back" onClick={back}>
                <IconArrowLeft /> Back
              </button>
            )}
            {step < 3 ? (
              <button type="button" className="btn btn--primary btn--lg rg-nav__next" onClick={next}>
                Continue <IconArrowRight />
              </button>
            ) : (
              <button
                type="button"
                className="btn btn--primary btn--lg rg-nav__next"
                onClick={handleSubmit}
                disabled={loading}
                id="register-submit-btn"
              >
                {loading ? (
                  <span className="rg-spinner"><IconSpinner /></span>
                ) : (
                  <><IconCheck /> Create Account</>
                )}
              </button>
            )}
          </div>

          {/* ── Login link ── */}
          <p className="rg-login-link">
            Already have an account?{" "}
            <Link href="/login" className="rg-login-link__a" id="register-login-link">Sign in</Link>
          </p>

        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════
   STYLES
════════════════════════════════════════════════ */
const STYLES = `
  /* ── Page wrapper ── */
  .rg-page {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 80px 20px; background: var(--bg-primary);
    position: relative; overflow: hidden;
    transition: background var(--transition);
  }
  .rg-page::before {
    content: ""; position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 60% 55% at 50% 10%, var(--accent-blue-glow), transparent 65%),
      radial-gradient(ellipse 38% 38% at 85% 80%, rgba(129,140,248,0.08), transparent 60%);
  }
  .rg-bg-orb {
    position: absolute; border-radius: 50%; pointer-events: none; filter: blur(80px);
  }
  .rg-bg-orb--1 { width: 400px; height: 400px; background: rgba(79,142,247,0.1);  top: 5%;   left: 5%;  animation: orbDrift1 14s ease-in-out infinite; }
  .rg-bg-orb--2 { width: 300px; height: 300px; background: rgba(129,140,248,0.08); bottom: 8%; right: 6%; animation: orbDrift2 18s ease-in-out infinite 3s; }
  .rg-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(79,142,247,0.1) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
  }

  /* ── Card ── */
  .rg-card {
    position: relative; z-index: 2;
    width: 100%; max-width: 540px;
    background: var(--bg-card); border: 1px solid var(--bg-card-border);
    border-radius: 24px; backdrop-filter: blur(24px);
    box-shadow: 0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04);
    animation: fadeUp 0.5s ease both;
    overflow: hidden;
  }

  /* ── Header ── */
  .rg-header {
    display: flex; align-items: center; gap: 14px;
    padding: 28px 32px 0;
  }
  .rg-header__logo {
    width: 48px; height: 48px; border-radius: 14px; flex-shrink: 0;
    background: var(--gradient-hero);
    display: flex; align-items: center; justify-content: center;
    color: #fff; box-shadow: 0 0 20px var(--accent-blue-glow);
  }
  .rg-header__title { font-size: 1.3rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.03em; margin: 0; }
  .rg-header__sub   { font-size: 0.8rem; color: var(--text-muted); margin: 2px 0 0; }

  /* ── Stepper ── */
  .rg-stepper {
    display: flex; align-items: flex-start; gap: 0;
    padding: 24px 32px 0;
    position: relative;
  }
  .rg-stepper__item {
    display: flex; flex-direction: column; align-items: center;
    gap: 6px; flex: 1; position: relative;
  }
  .rg-stepper__circle {
    width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.8rem; font-weight: 700; transition: all 0.3s ease;
    position: relative; z-index: 1;
  }
  .rg-stepper__circle--idle   { background: var(--bg-secondary); border: 2px solid var(--bg-card-border); color: var(--text-muted); }
  .rg-stepper__circle--active {
    background: var(--gradient-hero); border: 2px solid transparent; color: #fff;
    box-shadow: 0 0 16px var(--accent-blue-glow);
    animation: stepPulse 2s ease-in-out infinite;
  }
  .rg-stepper__circle--done   { background: rgba(16,185,129,0.15); border: 2px solid #10b981; color: #10b981; }
  @keyframes stepPulse {
    0%,100% { box-shadow: 0 0 16px var(--accent-blue-glow); }
    50%      { box-shadow: 0 0 28px rgba(79,142,247,0.5); }
  }
  .rg-stepper__label { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.02em; text-align: center; transition: color 0.3s; }
  .rg-stepper__label--idle   { color: var(--text-muted); }
  .rg-stepper__label--active { color: var(--accent-blue); }
  .rg-stepper__label--done   { color: #10b981; }
  .rg-stepper__line {
    position: absolute; top: 20px; left: calc(50% + 20px);
    width: calc(100% - 40px); height: 2px;
    border-radius: 2px; transition: background 0.4s;
  }
  .rg-stepper__line--idle { background: var(--bg-card-border); }
  .rg-stepper__line--done { background: #10b981; }

  /* ── Body ── */
  .rg-body { padding: 28px 32px 0; }
  .rg-step { animation: rgStepIn 0.35s cubic-bezier(0.4,0,0.2,1) both; }
  @keyframes rgStepIn { from { opacity:0; transform: translateX(20px); } to { opacity:1; transform: translateX(0); } }

  .rg-step__head { margin-bottom: 22px; }
  .rg-step__eyebrow { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-blue); margin: 0 0 4px; }
  .rg-step__title   { font-size: 1.4rem; font-weight: 800; letter-spacing: -0.03em; color: var(--text-primary); margin: 0 0 6px; }
  .rg-step__desc    { font-size: 0.85rem; color: var(--text-secondary); margin: 0; }

  /* Fields */
  .rg-fields       { display: flex; flex-direction: column; gap: 18px; }
  .rg-fields--two  { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media(max-width: 480px) { .rg-fields--two { grid-template-columns: 1fr; } }
  .rg-field        { display: flex; flex-direction: column; gap: 6px; }
  .rg-label        { font-size: 0.78rem; font-weight: 600; color: var(--text-secondary); letter-spacing: 0.02em; }
  .rg-input {
    padding: 11px 14px; border-radius: 11px;
    border: 1px solid var(--bg-card-border);
    background: var(--bg-secondary); color: var(--text-primary);
    font-family: inherit; font-size: 0.9rem; outline: none;
    transition: all var(--transition);
    width: 100%;
  }
  .rg-input::placeholder { color: var(--text-muted); }
  .rg-input:focus {
    border-color: var(--accent-blue);
    background: var(--bg-primary);
    box-shadow: 0 0 0 3px var(--accent-blue-soft);
  }
  .rg-input--error  { border-color: #ef4444 !important; box-shadow: 0 0 0 3px rgba(239,68,68,0.1) !important; }
  .rg-input--prefixed { padding-left: 32px; }
  .rg-input--suffixed { padding-right: 44px; }
  .rg-error { font-size: 0.75rem; color: #ef4444; font-weight: 500; }

  /* Input wrap for prefix/suffix */
  .rg-input-wrap { position: relative; }
  .rg-input-prefix {
    position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
    font-size: 0.9rem; font-weight: 600; color: var(--text-muted); pointer-events: none;
  }
  .rg-input-suffix {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; color: var(--text-muted); cursor: pointer;
    display: flex; align-items: center; padding: 0; transition: color var(--transition);
  }
  .rg-input-suffix:hover { color: var(--text-primary); }

  /* Password strength */
  .rg-strength { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
  .rg-strength__bars { display: flex; gap: 4px; flex: 1; }
  .rg-strength__bar {
    height: 4px; flex: 1; border-radius: 100px;
    background: var(--bg-card-border); transition: background 0.3s;
  }
  .rg-strength__label { font-size: 0.72rem; font-weight: 700; min-width: 40px; transition: color 0.3s; }

  /* ── Review card ── */
  .rg-review { display: flex; flex-direction: column; gap: 20px; }
  .rg-review__avatar {
    width: 64px; height: 64px; border-radius: 50%;
    background: var(--gradient-hero); color: #fff;
    font-size: 1.4rem; font-weight: 800; letter-spacing: -0.04em;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 24px var(--accent-blue-glow);
    align-self: center;
  }
  .rg-review__rows { display: flex; flex-direction: column; gap: 0; border-radius: 14px; overflow: hidden; border: 1px solid var(--bg-card-border); }
  .rg-review__row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 13px 16px; background: var(--bg-secondary);
    border-bottom: 1px solid var(--bg-card-border);
    transition: background var(--transition);
  }
  .rg-review__row:last-child { border-bottom: none; }
  .rg-review__row-label { font-size: 0.78rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; }
  .rg-review__row-value { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); }

  /* ToS */
  .rg-tos { font-size: 0.78rem; color: var(--text-muted); text-align: center; margin: 0; line-height: 1.6; }
  .rg-tos__link { color: var(--accent-blue); text-decoration: none; }
  .rg-tos__link:hover { text-decoration: underline; }

  /* ── Nav bar ── */
  .rg-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 32px;
    border-top: 1px solid var(--bg-card-border);
    margin-top: 28px;
  }
  .rg-nav__back { display: flex; align-items: center; gap: 6px; }
  .rg-nav__next { margin-left: auto; display: flex; align-items: center; gap: 8px; }
  .rg-nav__next:disabled { opacity: 0.65; cursor: not-allowed; }
  .rg-spinner { display: flex; animation: ctSpin 0.7s linear infinite; }
  @keyframes ctSpin { to { transform: rotate(360deg); } }

  /* ── Login link ── */
  .rg-login-link { text-align: center; font-size: 0.83rem; color: var(--text-muted); padding: 0 32px 24px; margin: 0; }
  .rg-login-link__a { color: var(--accent-blue); font-weight: 600; text-decoration: none; }
  .rg-login-link__a:hover { text-decoration: underline; }

  /* ── Success screen ── */
  .rg-success {
    position: relative; z-index: 2; max-width: 440px; width: 100%;
    background: var(--bg-card); border: 1px solid var(--bg-card-border);
    border-radius: 24px; backdrop-filter: blur(24px);
    padding: 48px 40px; text-align: center;
    display: flex; flex-direction: column; align-items: center; gap: 18px;
    box-shadow: 0 24px 64px rgba(0,0,0,0.35);
    animation: fadeUp 0.5s ease both;
  }
  .rg-success__ring {
    width: 80px; height: 80px; border-radius: 50%;
    background: rgba(16,185,129,0.12); border: 2px solid rgba(16,185,129,0.3);
    display: flex; align-items: center; justify-content: center;
    color: #10b981;
    box-shadow: 0 0 32px rgba(16,185,129,0.2);
  }
  .rg-success__icon { display: flex; }
  .rg-success__title { font-size: 1.8rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.04em; margin: 0; }
  .rg-success__desc  { font-size: 0.92rem; color: var(--text-secondary); line-height: 1.7; margin: 0; }
  .rg-success__desc strong { color: var(--text-primary); }
  .rg-success__actions { display: flex; flex-direction: column; gap: 10px; align-items: center; width: 100%; }

  /* ── Back to Users btn (visible when logged in) ── */
  .rg-back-users-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 14px; border-radius: 10px;
    background: var(--accent-blue-soft); border: 1px solid rgba(79,142,247,0.25);
    color: var(--accent-blue); font-size: 0.82rem; font-weight: 600;
    text-decoration: none; transition: all var(--transition); white-space: nowrap; flex-shrink: 0;
  }
  .rg-back-users-btn:hover { background: var(--accent-blue-glow); transform: translateY(-1px); }

  @media(max-width: 560px) {
    .rg-card { border-radius: 18px; }
    .rg-header, .rg-body, .rg-nav { padding-left: 20px; padding-right: 20px; }
    .rg-stepper { padding-left: 20px; padding-right: 20px; }
    .rg-login-link { padding-left: 20px; padding-right: 20px; }
  }
`;