"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

const API_URL = "https://api.itdev.cmtc.ac.th/users";

/* ════════════════════════════════════════════════
   ICONS
════════════════════════════════════════════════ */
function IconArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  );
}
function IconSave() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
      <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
    </svg>
  );
}
function IconUser() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  );
}
function IconLock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}
function IconEye({ open }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}
function IconSpinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
  );
}
function IconId() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2"/>
      <line x1="12" y1="10" x2="19" y2="10"/><line x1="12" y1="14" x2="17" y2="14"/>
    </svg>
  );
}
function IconTrash() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
    </svg>
  );
}

/* ════════════════════════════════════════════════
   AVATAR helpers
════════════════════════════════════════════════ */
const AVATAR_COLORS = [
  "#4f8ef7","#818cf8","#10b981","#f59e0b","#ec4899",
  "#38bdf8","#f97316","#a78bfa","#34d399","#fb7185",
];
function getColor(str = "") {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

/* ════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════ */
export default function EditUserPage() {
  const router   = useRouter();
  const { id }   = useParams();

  const [form, setForm] = useState({
    txt_firstname: "",
    txt_lastname:  "",
    txt_username:  "",
    txt_password:  "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving,  setIsSaving]  = useState(false);
  const [isError,   setIsError]   = useState(false);
  const [showPw,    setShowPw]    = useState(false);
  const [errors,    setErrors]    = useState({});

  const avatarColor = getColor(form.txt_username || String(id));
  const avatarInit  = `${form.txt_firstname.charAt(0)}${form.txt_lastname.charAt(0)}`.toUpperCase() || "?";

  /* ── Fetch user ── */
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!response.ok) throw new Error(`Status ${response.status}`);
        const data = await response.json();
        setForm({
          txt_firstname: data.firstname ?? "",
          txt_lastname:  data.lastname  ?? "",
          txt_username:  data.username  ?? "",
          txt_password:  "",
        });
      } catch {
        setIsError(true);
        await Swal.fire({ icon: "warning", title: "Failed to load user data", confirmButtonColor: "#4f8ef7" });
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchUser();
  }, [id]);

  /* ── Handlers ── */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
  };

  const validateForm = () => {
    const err = {};
    if (!form.txt_firstname.trim()) err.txt_firstname = "First name is required";
    if (!form.txt_lastname.trim())  err.txt_lastname  = "Last name is required";
    if (!form.txt_username.trim())  err.txt_username  = "Username is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ── Update ── */
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSaving(true);
    try {
      const payload = {
        firstname: form.txt_firstname,
        lastname:  form.txt_lastname,
        username:  form.txt_username,
      };
      if (form.txt_password) payload.password = form.txt_password;

      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Saved!",
          text: "User information has been updated.",
          timer: 1500,
          showConfirmButton: false,
        });
        router.push("/users");
        return;
      }

      if (response.status === 400) {
        await Swal.fire({ icon: "warning", title: `Invalid data (${response.status})`, text: result.message || "Please check your input.", confirmButtonColor: "#f59e0b" });
      } else if (response.status >= 500) {
        await Swal.fire({ icon: "error", title: `Server error (${response.status})`, text: result.message || "Please try again later.", confirmButtonColor: "#ef4444" });
      } else {
        await Swal.fire({ icon: "error", title: `Failed (${response.status})`, text: result.message || "Something went wrong.", confirmButtonColor: "#4f8ef7" });
      }
    } catch {
      await Swal.fire({ icon: "warning", title: "Connection failed", text: "Please check your internet connection.", confirmButtonColor: "#4f8ef7" });
    } finally {
      setIsSaving(false);
    }
  };

  /* ── Delete from edit page ── */
  const handleDelete = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Confirm Delete",
      html: `Delete <b>${form.txt_firstname} ${form.txt_lastname}</b>?<br><small style="color:#9ca3af">This action cannot be undone.</small>`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });
    if (!result.isConfirmed) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        await Swal.fire({ icon: "success", title: "Deleted!", timer: 1200, showConfirmButton: false });
        router.push("/users");
      } else {
        const d = await res.json().catch(() => ({}));
        await Swal.fire({ icon: "error", title: `Failed (${res.status})`, text: d.message || "Could not delete user." });
      }
    } catch {
      await Swal.fire({ icon: "warning", title: "Connection failed" });
    }
  };

  /* ════════════ RENDER ════════════ */
  return (
    <>
      <style>{STYLES}</style>

      <div className="ed-page">
        <div className="ed-orb ed-orb--1" />
        <div className="ed-orb ed-orb--2" />

        <div className="ed-container">

          {/* Back breadcrumb */}
          <Link href="/users" className="ed-back" id="edit-back-btn">
            <IconArrowLeft /> Back to Users
          </Link>

          <div className="ed-layout">

            {/* ── LEFT — Profile Card ── */}
            <div className="ed-sidebar">
              <div className="ed-profile-card">
                <div className="ed-avatar" style={{ background: avatarColor }}>
                  {isLoading ? "…" : avatarInit}
                </div>
                <div className="ed-profile-card__name">
                  {isLoading ? "Loading…" : `${form.txt_firstname} ${form.txt_lastname}`}
                </div>
                <div className="ed-profile-card__username">
                  {isLoading ? "" : `@${form.txt_username}`}
                </div>
                <div className="ed-profile-card__id">User ID #{id}</div>
              </div>

              {/* Danger zone */}
              <div className="ed-danger">
                <p className="ed-danger__title">Danger Zone</p>
                <p className="ed-danger__desc">Permanently delete this user account. This cannot be undone.</p>
                <button
                  type="button"
                  className="ed-delete-btn"
                  onClick={handleDelete}
                  id="edit-delete-btn"
                  disabled={isLoading}
                >
                  <IconTrash /> Delete User
                </button>
              </div>
            </div>

            {/* ── RIGHT — Edit Form ── */}
            <div className="ed-form-card">
              <div className="ed-form-card__header">
                <h1 className="ed-form-card__title">Edit User</h1>
                <p className="ed-form-card__sub">Update the user&rsquo;s information below.</p>
              </div>

              {isLoading && (
                <div className="ed-loading">
                  <span className="ed-spinner"><IconSpinner /></span>
                  Loading user data…
                </div>
              )}

              {isError && !isLoading && (
                <div className="ed-error-state">
                  Failed to load user. <Link href="/users" className="ed-link">Go back</Link>
                </div>
              )}

              {!isLoading && !isError && (
                <form className="ed-form" onSubmit={handleUpdate} id="edit-user-form">

                  {/* Row: First + Last */}
                  <div className="ed-fields-row">
                    <div className="ed-field">
                      <label className="ed-label" htmlFor="ed-firstname">First Name</label>
                      <input
                        id="ed-firstname"
                        className={`ed-input ${errors.txt_firstname ? "ed-input--error" : ""}`}
                        type="text"
                        name="txt_firstname"
                        value={form.txt_firstname}
                        onChange={handleChange}
                        placeholder="First name"
                      />
                      {errors.txt_firstname && <span className="ed-error">{errors.txt_firstname}</span>}
                    </div>
                    <div className="ed-field">
                      <label className="ed-label" htmlFor="ed-lastname">Last Name</label>
                      <input
                        id="ed-lastname"
                        className={`ed-input ${errors.txt_lastname ? "ed-input--error" : ""}`}
                        type="text"
                        name="txt_lastname"
                        value={form.txt_lastname}
                        onChange={handleChange}
                        placeholder="Last name"
                      />
                      {errors.txt_lastname && <span className="ed-error">{errors.txt_lastname}</span>}
                    </div>
                  </div>

                  {/* Username */}
                  <div className="ed-field">
                    <label className="ed-label" htmlFor="ed-username">Username</label>
                    <div className="ed-input-wrap">
                      <span className="ed-input-icon"><IconUser /></span>
                      <input
                        id="ed-username"
                        className={`ed-input ed-input--icon-l ${errors.txt_username ? "ed-input--error" : ""}`}
                        type="text"
                        name="txt_username"
                        value={form.txt_username}
                        onChange={handleChange}
                        placeholder="username"
                      />
                    </div>
                    {errors.txt_username && <span className="ed-error">{errors.txt_username}</span>}
                  </div>

                  {/* Password */}
                  <div className="ed-field">
                    <label className="ed-label" htmlFor="ed-password">
                      New Password
                      <span className="ed-label__opt">(leave blank to keep current)</span>
                    </label>
                    <div className="ed-input-wrap">
                      <span className="ed-input-icon"><IconLock /></span>
                      <input
                        id="ed-password"
                        className="ed-input ed-input--icon-l ed-input--icon-r"
                        type={showPw ? "text" : "password"}
                        name="txt_password"
                        value={form.txt_password}
                        onChange={handleChange}
                        placeholder="Leave blank to keep current"
                      />
                      <button type="button" className="ed-eye-btn" onClick={() => setShowPw(v => !v)} aria-label="Toggle">
                        <IconEye open={showPw} />
                      </button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="ed-divider" />

                  {/* Actions */}
                  <div className="ed-form-actions">
                    <Link href="/users" className="btn btn--ghost btn--sm" id="edit-cancel-btn">
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="ed-save-btn"
                      disabled={isSaving}
                      id="edit-save-btn"
                    >
                      {isSaving ? (
                        <span className="ed-spinner"><IconSpinner /></span>
                      ) : (
                        <><IconSave /> Save Changes</>
                      )}
                    </button>
                  </div>

                </form>
              )}
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
  .ed-page {
    min-height: 100vh; padding: 32px 24px 80px;
    background: var(--bg-primary); position: relative; overflow: hidden;
    transition: background var(--transition);
  }
  .ed-orb { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(90px); }
  .ed-orb--1 { width: 450px; height: 450px; background: rgba(79,142,247,0.08);  top: -100px; right: -80px; }
  .ed-orb--2 { width: 300px; height: 300px; background: rgba(129,140,248,0.06); bottom: 0;   left: -50px; }

  .ed-container { position: relative; z-index: 2; max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }

  /* Back link */
  .ed-back {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);
    text-decoration: none; padding: 6px 0; transition: color var(--transition);
    align-self: flex-start;
  }
  .ed-back:hover { color: var(--accent-blue); }

  /* Layout */
  .ed-layout { display: grid; grid-template-columns: 260px 1fr; gap: 20px; align-items: start; }
  @media(max-width: 760px) { .ed-layout { grid-template-columns: 1fr; } }

  /* ── Sidebar ── */
  .ed-sidebar { display: flex; flex-direction: column; gap: 14px; }

  .ed-profile-card {
    background: var(--bg-card); border: 1px solid var(--bg-card-border);
    border-radius: 18px; padding: 28px 20px; text-align: center;
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    box-shadow: var(--shadow-card);
  }
  .ed-avatar {
    width: 80px; height: 80px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem; font-weight: 800; color: #fff;
    box-shadow: 0 0 24px rgba(0,0,0,0.3);
    letter-spacing: -0.04em;
  }
  .ed-profile-card__name     { font-size: 1.05rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; }
  .ed-profile-card__username { font-size: 0.82rem; color: var(--accent-blue); font-weight: 600; }
  .ed-profile-card__id       { font-size: 0.72rem; color: var(--text-muted); background: var(--accent-blue-soft); padding: 3px 10px; border-radius: 100px; }

  /* Danger zone */
  .ed-danger {
    background: rgba(239,68,68,0.05); border: 1px solid rgba(239,68,68,0.18);
    border-radius: 14px; padding: 18px;
    display: flex; flex-direction: column; gap: 8px;
  }
  .ed-danger__title { font-size: 0.78rem; font-weight: 700; color: #f87171; text-transform: uppercase; letter-spacing: 0.06em; margin: 0; }
  .ed-danger__desc  { font-size: 0.8rem; color: var(--text-muted); line-height: 1.55; margin: 0; }
  .ed-delete-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 14px; border-radius: 9px;
    background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25);
    color: #f87171; font-family: inherit; font-size: 0.82rem; font-weight: 600;
    cursor: pointer; transition: all var(--transition); align-self: flex-start;
  }
  .ed-delete-btn:hover:not(:disabled) { background: rgba(239,68,68,0.2); }
  .ed-delete-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ── Form Card ── */
  .ed-form-card {
    background: var(--bg-card); border: 1px solid var(--bg-card-border);
    border-radius: 20px; padding: 36px 32px;
    box-shadow: var(--shadow-card);
    animation: fadeUp 0.4s ease both;
  }
  @media(max-width: 600px) { .ed-form-card { padding: 24px 18px; } }

  .ed-form-card__header { margin-bottom: 26px; }
  .ed-form-card__title  { font-size: 1.4rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.03em; margin: 0 0 5px; }
  .ed-form-card__sub    { font-size: 0.85rem; color: var(--text-secondary); margin: 0; }

  /* Loading / error */
  .ed-loading { display: flex; align-items: center; gap: 12px; padding: 32px 0; color: var(--text-muted); font-size: 0.9rem; }
  .ed-error-state { padding: 24px 0; color: #f87171; font-size: 0.9rem; }
  .ed-link { color: var(--accent-blue); text-decoration: none; font-weight: 600; }
  .ed-spinner { display: flex; animation: ctSpin 0.7s linear infinite; }
  @keyframes ctSpin { to { transform: rotate(360deg); } }

  /* Form elements */
  .ed-form       { display: flex; flex-direction: column; gap: 20px; }
  .ed-fields-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media(max-width: 500px) { .ed-fields-row { grid-template-columns: 1fr; } }
  .ed-field      { display: flex; flex-direction: column; gap: 6px; }
  .ed-label      { font-size: 0.78rem; font-weight: 600; color: var(--text-secondary); letter-spacing: 0.02em; display: flex; align-items: center; gap: 8px; }
  .ed-label__opt { font-size: 0.72rem; color: var(--text-muted); font-weight: 400; }

  .ed-input-wrap { position: relative; }
  .ed-input-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none; display: flex; }
  .ed-eye-btn    { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-muted); cursor: pointer; display: flex; padding: 0; transition: color var(--transition); }
  .ed-eye-btn:hover { color: var(--text-primary); }

  .ed-input {
    width: 100%; padding: 11px 14px; border-radius: 11px;
    border: 1px solid var(--bg-card-border);
    background: var(--bg-secondary); color: var(--text-primary);
    font-family: inherit; font-size: 0.9rem; outline: none;
    transition: all var(--transition);
  }
  .ed-input::placeholder { color: var(--text-muted); }
  .ed-input:focus { border-color: var(--accent-blue); background: var(--bg-primary); box-shadow: 0 0 0 3px var(--accent-blue-soft); }
  .ed-input--icon-l { padding-left: 40px; }
  .ed-input--icon-r { padding-right: 40px; }
  .ed-input--error  { border-color: #ef4444 !important; box-shadow: 0 0 0 3px rgba(239,68,68,0.1) !important; }
  .ed-error { font-size: 0.74rem; color: #ef4444; font-weight: 500; }

  .ed-divider { height: 1px; background: var(--bg-card-border); }

  /* Form actions */
  .ed-form-actions { display: flex; align-items: center; justify-content: flex-end; gap: 12px; }
  .ed-save-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 11px 22px; border-radius: 11px; border: none; cursor: pointer;
    background: var(--gradient-hero); color: #fff;
    font-family: inherit; font-size: 0.9rem; font-weight: 700;
    box-shadow: 0 4px 16px var(--accent-blue-glow);
    transition: all var(--transition);
  }
  .ed-save-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(79,142,247,0.4); filter: brightness(1.07); }
  .ed-save-btn:disabled { opacity: 0.65; cursor: not-allowed; }
`;
