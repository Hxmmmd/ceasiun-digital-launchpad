import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Briefcase,
  Facebook,
  FolderKanban,
  GitMerge,
  GraduationCap,
  Home,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Newspaper,
  Phone,
  Twitter,
  Users,
  X,
  Youtube,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { nav } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import logoUrl from "@/assets/ceasiun-logo.svg";

const mobileNavIcons = {
  "/": Home,
  "/services": Briefcase,
  "/work": FolderKanban,
  "/process": GitMerge,
  "/about": Users,
  "/blog": Newspaper,
  "/careers": GraduationCap,
  "/contact": Mail,
};

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={open ? "site-header is-open" : "site-header"}>
      <div className="shell nav-row">
        <Link to="/" className="wordmark" aria-label="Ceasiun Home" onClick={() => setOpen(false)}>
          <img src={logoUrl} alt="Ceasiun" />
          CEASIUN
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([n, to]) => (
            <Link
              key={to}
              to={to}
              activeProps={{ className: "active" }}
              activeOptions={{ exact: to === "/" }}
            >
              {n}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Button asChild size="lg">
            <Link to="/contact" search={{ service: "" }}>
              Start a project <ArrowUpRight />
            </Link>
          </Button>
          <Button
            className="menu-btn"
            variant="ghost"
            size="icon"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <div className="mobile-nav-links">
            {nav.map(([n, to]) => {
              const Icon = mobileNavIcons[to as keyof typeof mobileNavIcons] || Home;
              return (
                <Link
                  key={to}
                  to={to}
                  activeProps={{ className: "active" }}
                  activeOptions={{ exact: to === "/" }}
                  onClick={() => setOpen(false)}
                >
                  <Icon className="mobile-nav-icon" />
                  <span>{n}</span>
                </Link>
              );
            })}
            <Link
              to="/careers"
              activeProps={{ className: "active" }}
              onClick={() => setOpen(false)}
            >
              <GraduationCap className="mobile-nav-icon" />
              <span>Careers</span>
            </Link>
            <Link
              to="/contact"
              search={{ service: "" }}
              activeProps={{ className: "active" }}
              onClick={() => setOpen(false)}
            >
              <Mail className="mobile-nav-icon" />
              <span>Contact</span>
            </Link>
          </div>

          <div className="mobile-nav-footer">
            <Button asChild size="lg" className="w-full text-black font-bold">
              <Link to="/contact" search={{ service: "" }} onClick={() => setOpen(false)}>
                Start a project <ArrowUpRight className="text-black" />
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <Link to="/" className="wordmark" aria-label="Ceasiun Home">
            <img src={logoUrl} alt="Ceasiun" />
            CEASIUN
          </Link>
          <p>Ceasiun, your digital growth partner.</p>
          <p className="footer-tagline">
            Website Development · Digital Marketing · SMM · Design · Branding · AI & Automation ·
            Cyber Security · Managed Operations
          </p>
        </div>

        <div>
          <b>Navigate</b>
          {nav.map(([n, to]) => (
            <Link key={to} to={to}>
              {n}
            </Link>
          ))}
          <Link to="/careers">Careers</Link>
          <Link to="/contact" search={{ service: "" }}>
            Contact
          </Link>
        </div>

        <div>
          <b>Connect</b>
          <a href="tel:+923140262087">
            <Phone /> 0314 0262087
          </a>
          <a href="https://wa.me/923140262087" target="_blank" rel="noreferrer">
            <MessageCircle /> WhatsApp
          </a>
          <a href="https://linkedin.com/in/ceasiun" target="_blank" rel="noreferrer">
            <Linkedin /> LinkedIn
          </a>
          <a href="https://instagram.com/ceasiun" target="_blank" rel="noreferrer">
            <Instagram /> Instagram
          </a>
          <a href="https://facebook.com/ceasiun" target="_blank" rel="noreferrer">
            <Facebook /> Facebook
          </a>
          <a href="https://x.com/ceasiun" target="_blank" rel="noreferrer">
            <Twitter /> X (Twitter)
          </a>
          <a href="https://youtube.com/@ceasiun" target="_blank" rel="noreferrer">
            <Youtube /> YouTube
          </a>
          <a href="https://tiktok.com/@ceasiun" target="_blank" rel="noreferrer">
            <span className="social-text-icon">TikTok</span> @ceasiun
          </a>
          <a href="https://discord.com/invite/AkBQH7EQM4" target="_blank" rel="noreferrer">
            <span className="social-text-icon">Discord</span> Join Community
          </a>
        </div>
      </div>

      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Ceasiun. All rights reserved.</span>
        <Link to="/admin">Admin Desk</Link>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export function PageIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <section className="page-intro grid-bg">
      <div className="shell">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lede">{copy}</p>
      </div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

export function CTA() {
  return (
    <section className="cta-band">
      <div className="shell">
        <p className="eyebrow">Your Next Move</p>
        <h2>Build what growth needs next.</h2>
        <Button asChild size="lg">
          <Link to="/contact" search={{ service: "" }}>
            Talk to Ceasiun <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export const meta = (title: string, description: string) => ({
  meta: [
    { title: `${title} — Ceasiun` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — Ceasiun` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
