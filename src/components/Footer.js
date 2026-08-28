"use client";
import Link from "next/link";
import Image from "next/image";

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}
function DiscordIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.114 18.1.141 18.116a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function ArrowRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

const footerLinks = {
  product: [
    { label: "World Clock", href: "/services" },
    { label: "Time Zone Converter", href: "/services" },
    { label: "Meeting Scheduler", href: "/services" },
    { label: "Team Dashboard", href: "/services" },
    { label: "API Access", href: "/services" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/about" },
    { label: "Careers", href: "/about" },
    { label: "Press Kit", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Help Center", href: "/contact" },
    { label: "Documentation", href: "/contact" },
    { label: "Status Page", href: "/contact" },
    { label: "Privacy Policy", href: "/contact" },
    { label: "Terms of Service", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: <TwitterIcon />, href: "#", label: "Twitter" },
  { icon: <LinkedinIcon />, href: "#", label: "LinkedIn" },
  { icon: <GithubIcon />, href: "#", label: "GitHub" },
  { icon: <DiscordIcon />, href: "#", label: "Discord" },
];

export default function Footer() {
  return (
    <footer className="footer">
      {/* Top glow line */}
      <div className="footer__glow-line" aria-hidden="true" />

      <div className="footer__main">
        <div className="footer__inner">
          {/* Brand Column */}
          <div className="footer__brand-col">
            <Link href="/" className="footer__logo">
              <Image src="/logo.png" alt="TimeSync" width={100} height={33} className="footer__logo-img" />
            </Link>
            <p className="footer__tagline">
              Bridging time zones so your team can focus on what matters — collaboration without confusion.
            </p>
            {/* Social */}
            <div className="footer__social">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} className="footer__social-btn" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  {s.icon}
                </a>
              ))}
            </div>
            {/* Contact snippet */}
            <div className="footer__contact-info">
              <div className="footer__contact-row">
                <MailIcon />
                <span>hello@timesync.io</span>
              </div>
              <div className="footer__contact-row">
                <MapPinIcon />
                <span>Chiang Mai, Thailand — Global</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="footer__links-col">
            <h4 className="footer__col-title">Product</h4>
            <ul className="footer__link-list">
              {footerLinks.product.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="footer__link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__links-col">
            <h4 className="footer__col-title">Company</h4>
            <ul className="footer__link-list">
              {footerLinks.company.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="footer__link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__links-col">
            <h4 className="footer__col-title">Support</h4>
            <ul className="footer__link-list">
              {footerLinks.support.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="footer__link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer__newsletter-col">
            <h4 className="footer__col-title">Stay Updated</h4>
            <p className="footer__newsletter-desc">
              Get tips on remote work, scheduling, and global collaboration.
            </p>
            <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="footer__newsletter-input"
                id="newsletter-email"
                aria-label="Email address"
              />
              <button type="submit" className="footer__newsletter-btn" id="newsletter-submit">
                <ArrowRightIcon />
              </button>
            </form>
            <p className="footer__newsletter-note">No spam. Unsubscribe anytime.</p>

            {/* Stats */}
            <div className="footer__stats">
              <div className="footer__stat">
                <span className="footer__stat-num">50K+</span>
                <span className="footer__stat-label">Users</span>
              </div>
              <div className="footer__stat">
                <span className="footer__stat-num">195</span>
                <span className="footer__stat-label">Countries</span>
              </div>
              <div className="footer__stat">
                <span className="footer__stat-num">99.9%</span>
                <span className="footer__stat-label">Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} TimeSync Technologies Co., Ltd. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="/contact" className="footer__bottom-link">Privacy</a>
            <span className="footer__bottom-sep" />
            <a href="/contact" className="footer__bottom-link">Terms</a>
            <span className="footer__bottom-sep" />
            <a href="/contact" className="footer__bottom-link">Cookies</a>
            <span className="footer__bottom-sep" />
            <a href="/contact" className="footer__bottom-link">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
