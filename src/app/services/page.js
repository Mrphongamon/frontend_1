import Link from "next/link";

/* ════════════════════════════════════════════════
   ICONS
════════════════════════════════════════════════ */
const I = {
  Clock:      () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Convert:    () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
  Timer:      () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="13" r="8"/><polyline points="12 9 12 13 14.5 15"/><polyline points="16.51 3.51 17.5 1 22 2"/><line x1="18.98" y1="2.02" x2="19.99" y2="5.52"/></svg>,
  Map:        () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>,
  CalClock:   () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><circle cx="16" cy="16" r="3"/><polyline points="16 14.5 16 16 17 17"/></svg>,
  Share:      () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  CalLink:    () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M10 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0"/><path d="M14 16h2a2 2 0 0 0 0-4h-2"/><path d="M10 16H8a2 2 0 0 1 0-4h2"/></svg>,
  Repeat:     () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
  Users:      () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Overlap:    () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="8" height="4" rx="1"/><rect x="8" y="7" width="8" height="4" rx="1" opacity="0.5"/><rect x="10" y="13" width="12" height="4" rx="1"/><line x1="2" y1="4" x2="2" y2="20"/></svg>,
  Flag:       () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,
  Analytics:  () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  Slack:      () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/></svg>,
  Teams:      () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/><rect x="2" y="13" width="9" height="9" rx="1"/><rect x="13" y="13" width="9" height="9" rx="1"/></svg>,
  Zap:        () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Video:      () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
  Server:     () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  Package:    () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  Signal:     () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Graph:      () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><circle cx="6" cy="5" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="9" y1="5" x2="15" y2="5"/><line x1="8.59" y1="10.49" x2="15.42" y2="6.51"/></svg>,
  Bell:       () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Widget:     () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Tag:        () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  Plane:      () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L11 8 2.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L6 12l-2 3H2l-1 1 3 2 2 3 1-1v-2l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>,
  Code:       () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Check:      () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  ArrowRight: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
};

/* ════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════ */
const FEATURED = [
  {
    id: "meeting-scheduler",
    icon: I.CalClock,
    badge: "Most Popular",
    badgeColor: "badge--blue",
    name: "Meeting Scheduler",
    tagline: "Book the perfect meeting across any timezone",
    desc: "Stop playing timezone detective. Paste your team's locations and instantly see the best overlap windows. Share a smart link that auto-converts time for each recipient.",
    features: [
      "Visual timeline showing availability across all zones",
      "Smart \"golden window\" auto-detection algorithm",
      "One-click Google / Outlook / Apple calendar add",
      "Custom working hours per team member",
    ],
    href: "/register",
    cta: "Try Free",
  },
  {
    id: "team-dashboard",
    icon: I.Users,
    badge: "Teams",
    badgeColor: "badge--purple",
    name: "Team Dashboard",
    tagline: "Your global team's time, all in one view",
    desc: "Know at a glance who's online, who's asleep, and who's about to go offline. Pin your key team members and never interrupt anyone at 3 AM again.",
    features: [
      "Live time display for unlimited team members",
      "Color-coded availability status (online / away / offline)",
      "One-click open communication in Slack or Teams",
      "Country flag, local date, and DST awareness built in",
    ],
    href: "/register",
    cta: "Add Your Team",
  },
  {
    id: "rest-api",
    icon: I.Server,
    badge: "Developer",
    badgeColor: "badge--green",
    name: "REST API",
    tagline: "Full timezone data. Rock-solid uptime.",
    desc: "Build timezone-aware apps with our battle-tested API. Timezone conversions, DST transitions, UTC offsets, and geographic lookups — all in one clean endpoint.",
    features: [
      "99.9% uptime SLA with global CDN distribution",
      "195 countries, 600+ IANA timezone identifiers",
      "DST transition events and historical data",
      "Rate limits from 1K to unlimited — scales with you",
    ],
    href: "/register",
    cta: "View API Docs",
  },
];

const CATEGORIES = [
  {
    id: "time-tools",
    label: "Time Tools",
    Icon: I.Clock,
    desc: "Core utilities for working with time across any timezone on Earth.",
    services: [
      { id: "world-clock",   icon: I.Clock,   badge: null,         name: "Live World Clock",    desc: "Real-time digital clocks for any timezone, side by side. Auto-updates every second and shows day/night status at a glance." },
      { id: "tz-converter",  icon: I.Convert, badge: "Popular",    name: "Time Zone Converter", desc: "Type a time in one zone, instantly see it in every other zone you care about. Supports all 600+ IANA timezone identifiers." },
      { id: "countdown",     icon: I.Timer,   badge: null,         name: "Countdown Timer",     desc: "Create countdown timers locked to any timezone. Share a link — recipients see the countdown in their own local time automatically." },
      { id: "world-map",     icon: I.Map,     badge: "New",        name: "Interactive Time Map", desc: "A live world map overlaid with timezone boundaries and current time. Click any region to instantly compare it with your home zone." },
    ],
  },
  {
    id: "scheduling",
    label: "Scheduling & Meetings",
    Icon: I.CalClock,
    desc: "Intelligent scheduling tools that eliminate timezone confusion forever.",
    services: [
      { id: "scheduler",    icon: I.CalClock, badge: "Most Used", name: "Meeting Scheduler",     desc: "Find the perfect meeting time across timezones with visual overlap detection and one-click calendar integration." },
      { id: "availability", icon: I.Share,    badge: null,        name: "Smart Availability",    desc: "Set your working hours once. Share a personal booking link. Visitors see available slots in their own local timezone automatically." },
      { id: "cal-sync",     icon: I.CalLink,  badge: "Pro",       name: "Calendar Integration",  desc: "Two-way sync with Google Calendar, Outlook, and Apple Calendar. Events display in the right timezone everywhere." },
      { id: "recurring",    icon: I.Repeat,   badge: null,        name: "Recurring Event Manager", desc: "Recurring meetings that survive DST changes intact. Handles spring-forward and fall-back automatically for all participants." },
    ],
  },
  {
    id: "team",
    label: "Team Collaboration",
    Icon: I.Users,
    desc: "Everything your global team needs to stay in sync, every single day.",
    services: [
      { id: "team-dash",  icon: I.Users,    badge: "Popular", name: "Team Dashboard",        desc: "See every team member's local time, working status, and next availability window on one beautiful real-time screen." },
      { id: "overlap",    icon: I.Overlap,  badge: null,      name: "Overlap Visualizer",    desc: "A visual heat map of when your entire team is online simultaneously. Essential for distributed and async-first companies." },
      { id: "holidays",   icon: I.Flag,     badge: null,      name: "Global Holiday Calendar", desc: "Automatically flag national holidays for each team member's country so you never accidentally schedule over a local holiday." },
      { id: "analytics",  icon: I.Analytics, badge: "Pro",   name: "Meeting Analytics",     desc: "Understand your cross-timezone meeting patterns: peak hours, timezone friction scores, and cost-per-meeting estimates." },
      { id: "dst-alerts", icon: I.Bell,     badge: "New",    name: "DST Alerts",            desc: "Get notified before Daylight Saving Time changes affect your team's schedule so you can adjust recurring meetings in advance." },
      { id: "travel",     icon: I.Plane,    badge: null,     name: "Travel Planner",         desc: "Plan business travel across timezones. See jet lag impact, local office hours, and schedule meetings that work on both ends." },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    Icon: I.Zap,
    desc: "Connect TimeSync with the tools your team already uses every day.",
    services: [
      { id: "slack",    icon: I.Slack,   badge: "Popular", name: "Slack Bot",              desc: "Use /timesync in any channel to instantly compare timezones, find meeting windows, and share live clocks — without leaving Slack." },
      { id: "teams",    icon: I.Teams,   badge: null,      name: "Microsoft Teams App",    desc: "Native TimeSync tab and bot inside Microsoft Teams. Full timezone toolkit available inside your existing workspace." },
      { id: "zapier",   icon: I.Zap,     badge: null,      name: "Zapier & Make",          desc: "Connect TimeSync with 5,000+ apps using Zapier or Make. Trigger automations on timezone events, DST changes, and meeting bookings." },
      { id: "video",    icon: I.Video,   badge: "New",     name: "Video Meeting Links",    desc: "Generate Zoom and Google Meet links that auto-convert meeting time for each invitee. No more \"what time is the call?\" messages." },
      { id: "widget",   icon: I.Widget,  badge: null,      name: "Embeddable Widgets",     desc: "Drop a timezone clock or world time widget onto any website with a single line of script. Fully customizable styling." },
      { id: "whitelabel", icon: I.Tag,   badge: "Business", name: "White Label Solution",  desc: "Rebrand TimeSync as your own product. Custom domain, your logo, your color scheme — served from our infrastructure." },
    ],
  },
  {
    id: "developer",
    label: "Developer Tools",
    Icon: I.Code,
    desc: "APIs, SDKs, and webhooks so you can build timezone features into anything.",
    services: [
      { id: "rest-api",   icon: I.Server,  badge: "Popular", name: "REST API",          desc: "Complete IANA timezone data API. Conversions, UTC offsets, DST transitions, country lookups — all in one clean JSON API." },
      { id: "js-sdk",     icon: I.Package, badge: null,      name: "JavaScript SDK",    desc: "npm install timesync-js. Full timezone utility library for browsers and Node.js. Zero dependencies, tree-shakeable." },
      { id: "webhooks",   icon: I.Signal,  badge: null,      name: "Webhooks",          desc: "Subscribe to real-time events: DST transitions, timezone definition updates, and calendar change notifications." },
      { id: "graphql",    icon: I.Graph,   badge: "New",     name: "GraphQL API",       desc: "Query exactly the timezone data you need. Schema-first design with introspection, subscriptions, and batching support." },
    ],
  },
];

const PRICING = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for individuals exploring world timezones.",
    popular: false,
    cta: "Get Started",
    href: "/register",
    features: [
      "Live World Clock (up to 5 zones)",
      "Time Zone Converter",
      "Basic Meeting Scheduler",
      "1 Team Member",
      "Web & Mobile access",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9",
    period: "per month",
    desc: "For remote professionals who live across time zones.",
    popular: true,
    cta: "Start Free Trial",
    href: "/register",
    features: [
      "Everything in Free",
      "Unlimited timezone clocks",
      "Smart Availability & booking link",
      "Calendar Integration (Google, Outlook)",
      "Up to 15 Team Members",
      "DST Alerts & Travel Planner",
      "Slack & Teams integration",
      "Meeting Analytics",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: "$29",
    period: "per month",
    desc: "For distributed teams that need full global coordination.",
    popular: false,
    cta: "Contact Sales",
    href: "/contact",
    features: [
      "Everything in Pro",
      "Unlimited Team Members",
      "REST API + GraphQL API",
      "Webhooks & Zapier integration",
      "Embeddable Widgets",
      "White Label option",
      "Advanced Meeting Analytics",
      "Priority Support (4h SLA)",
    ],
  },
];

/* ════════════════════════════════════════════════
   UI COMPONENTS
════════════════════════════════════════════════ */
function Badge({ label, color = "badge--blue" }) {
  return <span className={`svc-badge ${color}`}>{label}</span>;
}

function FeaturedCard({ icon: Icon, badge, badgeColor, name, tagline, desc, features, href, cta }) {
  return (
    <div className="featured-card">
      <div className="featured-card__top">
        <div className="featured-card__icon"><Icon /></div>
        {badge && <Badge label={badge} color={badgeColor} />}
      </div>
      <h3 className="featured-card__name">{name}</h3>
      <p className="featured-card__tagline">{tagline}</p>
      <p className="featured-card__desc">{desc}</p>
      <ul className="featured-card__features">
        {features.map((f) => (
          <li key={f} className="featured-card__feature">
            <span className="feature-check"><I.Check /></span>
            {f}
          </li>
        ))}
      </ul>
      <Link href={href} className="btn btn--primary btn--sm featured-card__cta">
        {cta} <I.ArrowRight />
      </Link>
    </div>
  );
}

function ServiceCard({ icon: Icon, badge, name, desc, i }) {
  const badgeColors = { Popular: "badge--blue", New: "badge--cyan", Pro: "badge--purple", Business: "badge--gold", "Most Used": "badge--blue" };
  return (
    <div className="service-card" style={{ animationDelay: `${i * 0.07}s` }}>
      <div className="service-card__top">
        <div className="service-card__icon"><Icon /></div>
        {badge && <Badge label={badge} color={badgeColors[badge] ?? "badge--blue"} />}
      </div>
      <h4 className="service-card__name">{name}</h4>
      <p className="service-card__desc">{desc}</p>
    </div>
  );
}

function CategorySection({ id, label, Icon, desc, services }) {
  return (
    <section className="section section--alt svc-category" id={id}>
      <div className="section__inner">
        <div className="svc-category__header">
          <div className="svc-category__icon"><Icon /></div>
          <div>
            <h2 className="svc-category__title">{label}</h2>
            <p className="svc-category__desc">{desc}</p>
          </div>
        </div>
        <div className="service-grid">
          {services.map((s, i) => <ServiceCard key={s.id} {...s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ name, price, period, desc, popular, cta, href, features }) {
  return (
    <div className={`pricing-card ${popular ? "pricing-card--popular" : ""}`}>
      {popular && <div className="pricing-card__popular-badge">Most Popular</div>}
      <div className="pricing-card__header">
        <h3 className="pricing-card__name">{name}</h3>
        <div className="pricing-card__price">
          <span className="pricing-card__amount">{price}</span>
          <span className="pricing-card__period">/{period}</span>
        </div>
        <p className="pricing-card__desc">{desc}</p>
      </div>
      <Link href={href} className={`btn ${popular ? "btn--primary" : "btn--ghost"} btn--sm pricing-card__cta`}>
        {cta}
      </Link>
      <ul className="pricing-card__features">
        {features.map((f) => (
          <li key={f} className="pricing-feature">
            <span className="pricing-feature__check"><I.Check /></span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════ */
export const metadata = {
  title: "Services — TimeSync",
  description: "Explore all TimeSync features: world clocks, meeting scheduler, team dashboard, API, integrations, and more.",
};

export default function ServicesPage() {
  return (
    <div className="services-page">

      {/* ── HERO ── */}
      <section className="services-hero">
        {/* CSS orbs */}
        <div className="hero__orb hero__orb--1" aria-hidden="true" />
        <div className="hero__orb hero__orb--2" aria-hidden="true" />

        {/* Dot grid */}
        <div className="services-hero__grid" aria-hidden="true" />

        <div className="services-hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            20+ Tools &amp; Features
          </div>
          <h1 className="services-hero__title">
            Everything You Need to
            <span className="hero__title-gradient"> Work Globally</span>
          </h1>
          <p className="services-hero__subtitle">
            From live world clocks to enterprise APIs — TimeSync has every timezone tool your team needs, all in one place.
          </p>
          <div className="hero__cta">
            <Link href="/register" className="btn btn--primary btn--lg" id="svc-hero-cta">
              Start for Free <I.ArrowRight />
            </Link>
            <a href="#pricing" className="btn btn--ghost btn--lg" id="svc-hero-pricing">
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="svc-stats-bar">
        {[
          { num: "20+",   label: "Tools & Features" },
          { num: "195",   label: "Countries Supported" },
          { num: "600+",  label: "Timezone Identifiers" },
          { num: "99.9%", label: "API Uptime SLA" },
          { num: "50K+",  label: "Happy Users" },
        ].map((s) => (
          <div key={s.label} className="svc-stat">
            <span className="svc-stat__num">{s.num}</span>
            <span className="svc-stat__label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── FEATURED ── */}
      <section className="section" id="featured-services">
        <div className="section__inner">
          <div className="section__header">
            <p className="section__eyebrow">Highlights</p>
            <h2 className="section__title">Featured Services</h2>
            <p className="section__desc">Our three most powerful tools — loved by remote teams worldwide.</p>
          </div>
          <div className="featured-grid">
            {FEATURED.map((f) => <FeaturedCard key={f.id} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      {CATEGORIES.map((cat) => <CategorySection key={cat.id} {...cat} />)}

      {/* ── PRICING ── */}
      <section className="section" id="pricing">
        <div className="section__inner">
          <div className="section__header">
            <p className="section__eyebrow">Pricing</p>
            <h2 className="section__title">Simple, Transparent Pricing</h2>
            <p className="section__desc">Start free. Upgrade when your team grows. Cancel anytime.</p>
          </div>
          <div className="pricing-grid">
            {PRICING.map((p) => <PricingCard key={p.id} {...p} />)}
          </div>

          {/* Enterprise row */}
          <div className="enterprise-row" id="enterprise">
            <div className="enterprise-row__content">
              <div>
                <h3 className="enterprise-row__title">Enterprise</h3>
                <p className="enterprise-row__desc">
                  Custom contracts, dedicated infrastructure, on-premise deployment, SSO, and a dedicated success manager.
                </p>
              </div>
              <Link href="/contact" className="btn btn--primary btn--lg" id="enterprise-cta">
                Talk to Sales <I.ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-banner" id="svc-cta">
        <div className="cta-ring cta-ring--1" aria-hidden="true" />
        <div className="cta-ring cta-ring--2" aria-hidden="true" />
        <div className="cta-banner__inner">
          <h2 className="cta-banner__title">Ready to stop fighting timezones?</h2>
          <p className="cta-banner__desc">
            Join 50,000+ professionals who schedule smarter with TimeSync.
          </p>
          <Link href="/register" className="btn btn--primary btn--lg" id="svc-final-cta">
            Get Started — It&rsquo;s Free <I.ArrowRight />
          </Link>
        </div>
      </section>

    </div>
  );
}
