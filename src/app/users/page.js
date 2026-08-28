"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

const API_URL = "https://api.itdev.cmtc.ac.th/users";

/* ════════════════════════════════════════════════
   ICONS
════════════════════════════════════════════════ */
function IconPlus() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );
}
function IconEdit() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
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
function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}
function IconRefresh() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  );
}
function IconUsers() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}
function IconSpinner() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
  );
}
function IconEmpty() {
  return (
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <line x1="17" y1="11" x2="23" y2="11"/><line x1="20" y1="8" x2="20" y2="14"/>
    </svg>
  );
}
function IconLogout() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );
}
function IconClose() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
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

/* ════════════════════════════════════════════════
   AVATAR helper
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
function initials(first = "", last = "") {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase() || "?";
}

/* ════════════════════════════════════════════════
   USER ROW COMPONENT
════════════════════════════════════════════════ */
function UserRow({ user, index, onDelete }) {
  const color = getColor(user.username || user.id?.toString());
  return (
    <div className="ur-row" style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="ur-row__avatar" style={{ background: color }}>
        {initials(user.firstname, user.lastname)}
      </div>
      <div className="ur-row__info">
        <span className="ur-row__name">{user.firstname} {user.lastname}</span>
        <span className="ur-row__username">@{user.username}</span>
      </div>
      <div className="ur-row__id">
        <span className="ur-row__id-badge">#{user.id}</span>
      </div>
      <div className="ur-row__actions">
        <Link
          href={`/users/${user.id}`}
          className="ur-btn ur-btn--edit"
          id={`edit-user-${user.id}`}
          title="Edit user"
        >
          <IconEdit /> Edit
        </Link>
        <button
          className="ur-btn ur-btn--delete"
          id={`delete-user-${user.id}`}
          onClick={() => onDelete(user.id)}
          title="Delete user"
        >
          <IconTrash /> Delete
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════ */
export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);

  /* ── Add User Modal state ── */
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ txt_firstname: "", txt_lastname: "", txt_username: "", txt_password: "" });
  const [addErrors, setAddErrors] = useState({});
  const [addLoading, setAddLoading] = useState(false);
  const [showAddPw, setShowAddPw] = useState(false);
  const firstInputRef = useRef(null);

  const openAddModal = () => {
    setAddForm({ txt_firstname: "", txt_lastname: "", txt_username: "", txt_password: "" });
    setAddErrors({});
    setShowAddPw(false);
    setShowAddModal(true);
    setTimeout(() => firstInputRef.current?.focus(), 80);
  };
  const closeAddModal = () => setShowAddModal(false);

  const setAdd = (k) => (e) => {
    setAddForm((f) => ({ ...f, [k]: e.target.value }));
    setAddErrors((er) => ({ ...er, [k]: "" }));
  };

  const validateAdd = () => {
    const err = {};
    if (!addForm.txt_firstname.trim()) err.txt_firstname = "First name is required";
    if (!addForm.txt_lastname.trim())  err.txt_lastname  = "Last name is required";
    if (!addForm.txt_username.trim())  err.txt_username  = "Username is required";
    else if (addForm.txt_username.length < 3) err.txt_username = "At least 3 characters";
    if (!addForm.txt_password)         err.txt_password  = "Password is required";
    else if (addForm.txt_password.length < 6) err.txt_password = "At least 6 characters";
    return err;
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const err = validateAdd();
    if (Object.keys(err).length) { setAddErrors(err); return; }
    setAddLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          firstname: addForm.txt_firstname,
          lastname:  addForm.txt_lastname,
          username:  addForm.txt_username,
          password:  addForm.txt_password,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok) {
        closeAddModal();
        await Swal.fire({
          icon: "success",
          title: "User Added!",
          text: `${addForm.txt_firstname} ${addForm.txt_lastname} has been created.`,
          timer: 1500,
          showConfirmButton: false,
        });
        fetchUsers();
      } else if (response.status === 400) {
        await Swal.fire({ icon: "warning", title: `Invalid data (${response.status})`, text: result.message || "Please check your input.", confirmButtonColor: "#f59e0b" });
      } else {
        await Swal.fire({ icon: "error", title: `Server error (${response.status})`, text: result.message || "Something went wrong.", confirmButtonColor: "#ef4444" });
      }
    } catch {
      await Swal.fire({ icon: "warning", title: "Connection failed", text: "Please check your internet connection.", confirmButtonColor: "#4f8ef7" });
    } finally {
      setAddLoading(false);
    }
  };

  /* ── Fetch all users ── */
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_URL, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : data.users ?? []);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  /* ── Delete ── */
  const handleDelete = async (id) => {
    const user = users.find((u) => u.id === id);
    const result = await Swal.fire({
      icon: "warning",
      title: "Confirm Delete",
      html: user
        ? `Delete <b>${user.firstname} ${user.lastname}</b>?<br><small style="color:#9ca3af">This action cannot be undone.</small>`
        : "This action cannot be undone.",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;
    setDeleting(id);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${user?.firstname ?? "User"} has been removed.`,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        const data = await res.json().catch(() => ({}));
        await Swal.fire({
          icon: "error",
          title: `Failed to delete (${res.status})`,
          text: data.message || "Something went wrong.",
          confirmButtonColor: "#4f8ef7",
        });
      }
    } catch {
      await Swal.fire({
        icon: "warning",
        title: "Connection failed",
        text: "Please check your internet connection.",
        confirmButtonColor: "#4f8ef7",
      });
    } finally {
      setDeleting(null);
    }
  };

  /* ── Logout ── */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  /* ── Filter ── */
  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.firstname?.toLowerCase() ?? "").includes(q) ||
      (u.lastname?.toLowerCase()  ?? "").includes(q) ||
      (u.username?.toLowerCase()  ?? "").includes(q) ||
      String(u.id).includes(q)
    );
  });

  /* ══════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════ */
  return (
    <>
      <style>{STYLES}</style>

      <div className="ur-page">
        {/* BG decorations */}
        <div className="ur-orb ur-orb--1" />
        <div className="ur-orb ur-orb--2" />

        <div className="ur-container">

          {/* ── Page Header ── */}
          <div className="ur-header">
            <div className="ur-header__left">
              <div className="ur-header__icon"><IconUsers /></div>
              <div>
                <h1 className="ur-header__title">User Management</h1>
                <p className="ur-header__sub">
                  {isLoading ? "Loading…" : `${users.length} users registered`}
                </p>
              </div>
            </div>
            <div className="ur-header__actions">
              <button className="ur-icon-btn" onClick={fetchUsers} title="Refresh" id="users-refresh-btn">
                <IconRefresh />
              </button>
              <button className="btn btn--primary btn--sm" id="users-add-btn" onClick={openAddModal}>
                <IconPlus /> Add User
              </button>

            </div>
          </div>

          {/* ── Stats Row ── */}
          {!isLoading && !isError && (
            <div className="ur-stats">
              {[
                { label: "Total Users",  value: users.length },
                { label: "Shown",        value: filtered.length },
                { label: "Hidden",       value: users.length - filtered.length },
              ].map(({ label, value }) => (
                <div key={label} className="ur-stat">
                  <span className="ur-stat__num">{value}</span>
                  <span className="ur-stat__label">{label}</span>
                </div>
              ))}
            </div>
          )}

          {/* ── Search + Table Card ── */}
          <div className="ur-card">

            {/* Toolbar */}
            <div className="ur-toolbar">
              <div className="ur-search-wrap">
                <span className="ur-search-icon"><IconSearch /></span>
                <input
                  id="users-search"
                  className="ur-search"
                  type="search"
                  placeholder="Search by name, username or ID…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <span className="ur-count">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Table header */}
            <div className="ur-table-head">
              <span>User</span>
              <span>Username</span>
              <span>ID</span>
              <span>Actions</span>
            </div>

            {/* Body */}
            <div className="ur-table-body">

              {/* Loading */}
              {isLoading && (
                <div className="ur-state">
                  <span className="ur-spinner"><IconSpinner /></span>
                  <p>Loading users…</p>
                </div>
              )}

              {/* Error */}
              {!isLoading && isError && (
                <div className="ur-state ur-state--error">
                  <p>Failed to load users.</p>
                  <button className="btn btn--ghost btn--sm" onClick={fetchUsers}>
                    <IconRefresh /> Retry
                  </button>
                </div>
              )}

              {/* Empty */}
              {!isLoading && !isError && filtered.length === 0 && (
                <div className="ur-state">
                  <div className="ur-state__icon"><IconEmpty /></div>
                  <p>{search ? "No users match your search." : "No users yet."}</p>
                  {!search && (
                    <Link href="/register" className="btn btn--primary btn--sm">
                      <IconPlus /> Add First User
                    </Link>
                  )}
                </div>
              )}

              {/* Rows */}
              {!isLoading && !isError && filtered.map((u, i) => (
                <UserRow
                  key={u.id}
                  user={u}
                  index={i}
                  onDelete={deleting === u.id ? () => {} : handleDelete}
                />
              ))}

            </div>
          </div>

        </div>
      </div>

      {/* ────── ADD USER MODAL ────── */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && closeAddModal()} id="add-user-modal">
          <div className="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">

            {/* Header */}
            <div className="modal-header">
              <div>
                <h2 className="modal-title" id="modal-title">Add New User</h2>
                <p className="modal-sub">Fill in the details to create a new account.</p>
              </div>
              <button className="modal-close-btn" onClick={closeAddModal} aria-label="Close modal" id="modal-close-btn">
                <IconClose />
              </button>
            </div>

            {/* Form */}
            <form className="modal-form" onSubmit={handleAddUser} id="add-user-form" noValidate>

              {/* Name row */}
              <div className="modal-fields-row">
                <div className="modal-field">
                  <label className="modal-label" htmlFor="modal-firstname">First Name</label>
                  <input
                    id="modal-firstname"
                    ref={firstInputRef}
                    className={`modal-input ${addErrors.txt_firstname ? "modal-input--error" : ""}`}
                    type="text"
                    name="txt_firstname"
                    value={addForm.txt_firstname}
                    onChange={setAdd("txt_firstname")}
                    placeholder="First name"
                  />
                  {addErrors.txt_firstname && <span className="modal-error">{addErrors.txt_firstname}</span>}
                </div>
                <div className="modal-field">
                  <label className="modal-label" htmlFor="modal-lastname">Last Name</label>
                  <input
                    id="modal-lastname"
                    className={`modal-input ${addErrors.txt_lastname ? "modal-input--error" : ""}`}
                    type="text"
                    name="txt_lastname"
                    value={addForm.txt_lastname}
                    onChange={setAdd("txt_lastname")}
                    placeholder="Last name"
                  />
                  {addErrors.txt_lastname && <span className="modal-error">{addErrors.txt_lastname}</span>}
                </div>
              </div>

              {/* Username */}
              <div className="modal-field">
                <label className="modal-label" htmlFor="modal-username">Username</label>
                <input
                  id="modal-username"
                  className={`modal-input ${addErrors.txt_username ? "modal-input--error" : ""}`}
                  type="text"
                  name="txt_username"
                  value={addForm.txt_username}
                  onChange={setAdd("txt_username")}
                  placeholder="username"
                />
                {addErrors.txt_username && <span className="modal-error">{addErrors.txt_username}</span>}
              </div>

              {/* Password */}
              <div className="modal-field">
                <label className="modal-label" htmlFor="modal-password">Password</label>
                <div className="modal-input-wrap">
                  <input
                    id="modal-password"
                    className={`modal-input modal-input--icon-r ${addErrors.txt_password ? "modal-input--error" : ""}`}
                    type={showAddPw ? "text" : "password"}
                    name="txt_password"
                    value={addForm.txt_password}
                    onChange={setAdd("txt_password")}
                    placeholder="At least 6 characters"
                  />
                  <button type="button" className="modal-eye-btn" onClick={() => setShowAddPw(v => !v)} aria-label="Toggle password">
                    <IconEye open={showAddPw} />
                  </button>
                </div>
                {addErrors.txt_password && <span className="modal-error">{addErrors.txt_password}</span>}
              </div>

              {/* Actions */}
              <div className="modal-actions">
                <button type="button" className="btn btn--ghost btn--sm" onClick={closeAddModal} id="modal-cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary btn--sm" disabled={addLoading} id="modal-submit-btn">
                  {addLoading ? (
                    <span className="ur-spinner"><IconSpinner /></span>
                  ) : (
                    <><IconPlus /> Create User</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

/* ════════════════════════════════════════════════
   STYLES
════════════════════════════════════════════════ */
const STYLES = `
  .ur-page {
    min-height: 100vh; padding: 32px 24px 80px;
    background: var(--bg-primary); position: relative; overflow: hidden;
    transition: background var(--transition);
  }
  .ur-orb { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(90px); }
  .ur-orb--1 { width: 500px; height: 500px; background: rgba(79,142,247,0.07);  top: -80px; right: -80px; }
  .ur-orb--2 { width: 350px; height: 350px; background: rgba(129,140,248,0.05); bottom: 0;  left: -60px; }

  .ur-container { position: relative; z-index: 2; max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }

  /* Header */
  .ur-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
  .ur-header__left { display: flex; align-items: center; gap: 16px; }
  .ur-header__icon {
    width: 52px; height: 52px; border-radius: 16px; flex-shrink: 0;
    background: var(--gradient-hero); display: flex; align-items: center; justify-content: center;
    color: #fff; box-shadow: 0 0 24px var(--accent-blue-glow);
  }
  .ur-header__title { font-size: 1.5rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.03em; margin: 0; }
  .ur-header__sub   { font-size: 0.82rem; color: var(--text-muted); margin: 2px 0 0; }
  .ur-header__actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

  .ur-icon-btn {
    width: 36px; height: 36px; border-radius: 10px; border: 1px solid var(--bg-card-border);
    background: var(--bg-card); color: var(--text-secondary); cursor: pointer;
    display: flex; align-items: center; justify-content: center; transition: all var(--transition);
  }
  .ur-icon-btn:hover { color: var(--text-primary); background: var(--bg-card-hover); transform: rotate(180deg); }

  .ur-logout-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 14px; border-radius: 10px; border: 1px solid rgba(239,68,68,0.25);
    background: rgba(239,68,68,0.08); color: #f87171; font-family: inherit;
    font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all var(--transition);
  }
  .ur-logout-btn:hover { background: rgba(239,68,68,0.18); }

  /* Stats */
  .ur-stats { display: flex; gap: 14px; }
  .ur-stat {
    flex: 1; padding: 16px 20px; border-radius: 14px;
    background: var(--bg-card); border: 1px solid var(--bg-card-border);
    display: flex; flex-direction: column; gap: 3px;
  }
  .ur-stat__num   { font-size: 1.6rem; font-weight: 800; letter-spacing: -0.04em; color: var(--text-primary); line-height: 1; }
  .ur-stat__label { font-size: 0.7rem; color: var(--text-muted); font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; }

  /* Card */
  .ur-card {
    background: var(--bg-card); border: 1px solid var(--bg-card-border);
    border-radius: 20px; overflow: hidden;
    box-shadow: var(--shadow-card);
    animation: fadeUp 0.4s ease both;
  }

  /* Toolbar */
  .ur-toolbar {
    display: flex; align-items: center; gap: 14px; padding: 18px 20px;
    border-bottom: 1px solid var(--bg-card-border);
    flex-wrap: wrap;
  }
  .ur-search-wrap { position: relative; flex: 1; min-width: 220px; }
  .ur-search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none; display: flex; }
  .ur-search {
    width: 100%; padding: 9px 14px 9px 38px; border-radius: 10px;
    border: 1px solid var(--bg-card-border); background: var(--bg-secondary);
    color: var(--text-primary); font-family: inherit; font-size: 0.875rem; outline: none;
    transition: all var(--transition);
  }
  .ur-search::placeholder { color: var(--text-muted); }
  .ur-search:focus { border-color: var(--accent-blue); box-shadow: 0 0 0 3px var(--accent-blue-soft); }
  .ur-count { font-size: 0.8rem; color: var(--text-muted); white-space: nowrap; }

  /* Table head */
  .ur-table-head {
    display: grid; grid-template-columns: 1fr auto auto 160px;
    padding: 10px 20px; gap: 16px;
    font-size: 0.7rem; font-weight: 700; color: var(--text-muted);
    letter-spacing: 0.07em; text-transform: uppercase;
    border-bottom: 1px solid var(--bg-card-border);
    background: rgba(0,0,0,0.05);
  }
  @media(max-width: 640px) {
    .ur-table-head { display: none; }
  }

  /* Table body */
  .ur-table-body { display: flex; flex-direction: column; }

  /* Row */
  .ur-row {
    display: grid; grid-template-columns: 1fr auto auto 160px;
    align-items: center; gap: 16px; padding: 14px 20px;
    border-bottom: 1px solid var(--bg-card-border);
    transition: background var(--transition);
    animation: fadeUp 0.35s ease both;
  }
  .ur-row:last-child { border-bottom: none; }
  .ur-row:hover { background: var(--bg-card-hover); }

  .ur-row__avatar {
    width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.78rem; font-weight: 800; color: #fff; letter-spacing: 0;
  }
  .ur-row__info { display: flex; align-items: center; gap: 12px; min-width: 0; }
  .ur-row__name { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ur-row__username { font-size: 0.78rem; color: var(--text-muted); margin-left: 4px; }

  .ur-row__id-badge {
    display: inline-block; padding: 3px 10px; border-radius: 100px;
    background: var(--accent-blue-soft); color: var(--accent-blue);
    font-size: 0.72rem; font-weight: 700; white-space: nowrap;
  }

  .ur-row__actions { display: flex; gap: 8px; justify-content: flex-end; }
  .ur-btn {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 6px 12px; border-radius: 8px; font-size: 0.78rem; font-weight: 600;
    border: none; cursor: pointer; text-decoration: none; transition: all var(--transition);
    font-family: inherit;
  }
  .ur-btn--edit {
    background: var(--accent-blue-soft); color: var(--accent-blue);
    border: 1px solid rgba(79,142,247,0.2);
  }
  .ur-btn--edit:hover { background: var(--accent-blue-glow); transform: translateY(-1px); }
  .ur-btn--delete {
    background: rgba(239,68,68,0.08); color: #f87171;
    border: 1px solid rgba(239,68,68,0.2);
  }
  .ur-btn--delete:hover { background: rgba(239,68,68,0.18); transform: translateY(-1px); }

  /* State (loading / error / empty) */
  .ur-state {
    display: flex; flex-direction: column; align-items: center; gap: 14px;
    padding: 64px 24px; color: var(--text-muted); font-size: 0.9rem;
  }
  .ur-state--error { color: #f87171; }
  .ur-state__icon { color: var(--text-muted); opacity: 0.4; }
  .ur-spinner { display: flex; animation: ctSpin 0.8s linear infinite; color: var(--accent-blue); }
  @keyframes ctSpin { to { transform: rotate(360deg); } }

  @media(max-width: 640px) {
    .ur-row {
      grid-template-columns: 1fr;
      gap: 10px;
    }
    .ur-row__id { display: none; }
    .ur-row__actions { justify-content: flex-start; }
    .ur-stats { flex-wrap: wrap; }
    .ur-stat { min-width: 100px; }
  }

  /* ════════════════════════════════════════════════
     MODAL — Add User
  ════════════════════════════════════════════════ */
  .modal-backdrop {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    animation: modalFadeIn 0.2s ease both;
  }
  @keyframes modalFadeIn { from { opacity: 0; } to { opacity: 1; } }

  .modal-box {
    width: 100%; max-width: 500px;
    background: var(--bg-card); border: 1px solid var(--bg-card-border);
    border-radius: 22px; overflow: hidden;
    box-shadow: 0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05);
    animation: modalSlideUp 0.25s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  @keyframes modalSlideUp {
    from { opacity: 0; transform: translateY(28px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .modal-header {
    display: flex; align-items: flex-start; justify-content: space-between; gap: 14px;
    padding: 28px 28px 20px;
    border-bottom: 1px solid var(--bg-card-border);
  }
  .modal-title { font-size: 1.25rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.03em; margin: 0 0 4px; }
  .modal-sub   { font-size: 0.82rem; color: var(--text-muted); margin: 0; }

  .modal-close-btn {
    width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--bg-card-border);
    background: var(--bg-secondary); color: var(--text-muted); cursor: pointer;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    transition: all var(--transition);
  }
  .modal-close-btn:hover { background: rgba(239,68,68,0.1); color: #f87171; border-color: rgba(239,68,68,0.25); }

  .modal-form { display: flex; flex-direction: column; gap: 18px; padding: 24px 28px 28px; }
  .modal-fields-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media(max-width: 480px) { .modal-fields-row { grid-template-columns: 1fr; } }

  .modal-field { display: flex; flex-direction: column; gap: 6px; }
  .modal-label { font-size: 0.78rem; font-weight: 600; color: var(--text-secondary); letter-spacing: 0.02em; }

  .modal-input-wrap { position: relative; }
  .modal-eye-btn {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; color: var(--text-muted); cursor: pointer;
    display: flex; padding: 0; transition: color var(--transition);
  }
  .modal-eye-btn:hover { color: var(--text-primary); }

  .modal-input {
    width: 100%; padding: 11px 14px; border-radius: 11px;
    border: 1px solid var(--bg-card-border);
    background: var(--bg-secondary); color: var(--text-primary);
    font-family: inherit; font-size: 0.9rem; outline: none;
    transition: all var(--transition);
  }
  .modal-input::placeholder { color: var(--text-muted); }
  .modal-input:focus { border-color: var(--accent-blue); background: var(--bg-primary); box-shadow: 0 0 0 3px var(--accent-blue-soft); }
  .modal-input--icon-r { padding-right: 40px; }
  .modal-input--error  { border-color: #ef4444 !important; box-shadow: 0 0 0 3px rgba(239,68,68,0.1) !important; }
  .modal-error { font-size: 0.74rem; color: #ef4444; font-weight: 500; }

  .modal-actions { display: flex; align-items: center; justify-content: flex-end; gap: 10px; padding-top: 4px; }
`;

