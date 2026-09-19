"use client";
import Link from "next/link";
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
  Gamepad2,
  Mail,
  Menu,
  Music2,
  MessageCircle,
  Newspaper,
  Phone,
  Twitter,
  Users,
  X,
  Youtube,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useCms } from "@/hooks/use-cms";
import { nav } from "@/lib/site-data";

function whatsappHref(value: string) {
  if (value.startsWith("http")) return value;
  return `https://wa.me/${value.replace(/[^\d]/g, "")}`;
}

function phoneHref(value: string) {
  return `tel:${value.replace(/[^\d+]/g, "")}`;
}

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
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const { settings } = useCms();

  useEffect(() => {
    if (open) {
      setMenuVisible(true);
      return;
    }

    const timeout = window.setTimeout(() => setMenuVisible(false), 420);
    return () => window.clearTimeout(timeout);
  }, [open]);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`${menuVisible ? "site-header is-open" : "site-header"} ${!open && menuVisible ? "is-closing" : ""}`}>
      <div className="shell nav-row">
        <Link href="/" className="wordmark" aria-label={`${settings.siteName} Home`} onClick={closeMenu}>
          <img src="/ceasiun-logo.svg" alt="" />
          <span className="wordmark-name">{settings.siteName}</span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([n, to]) => (
            <Link
              key={to}
              href={to}
              className={pathname === to ? "active" : undefined}
              aria-current={pathname === to ? "page" : undefined}
            >
              {n}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Button asChild size="lg" className="project-cta">
            <Link href="/contact">
              {settings.headerCta} <ArrowUpRight />
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

      {menuVisible && (
        <nav className={`mobile-nav ${!open ? "is-closing" : ""}`} aria-label="Mobile navigation">
          <div className="mobile-nav-links">
            {nav.map(([n, to]) => {
              const Icon = mobileNavIcons[to as keyof typeof mobileNavIcons] || Home;
              return (
                <Link
                  key={to}
                  href={to}
                  onClick={closeMenu}
                >
                  <Icon className="mobile-nav-icon" />
                  <span>{n}</span>
                </Link>
              );
            })}
            <Link href="/careers" onClick={closeMenu}>
              <GraduationCap className="mobile-nav-icon" />
              <span>Careers</span>
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
            >
              <Mail className="mobile-nav-icon" />
              <span>Contact</span>
            </Link>
          </div>

          <div className="mobile-nav-footer">
<Button asChild size="lg" className="project-cta w-full text-black font-bold">
          <Link href="/contact" onClick={closeMenu}>
                {settings.headerCta} <ArrowUpRight className="text-black" />
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const { settings } = useCms();

  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <Link href="/" className="wordmark footer-wordmark" aria-label={`${settings.siteName} Home`}>
            <img src="/ceasiun-logo.svg" alt="" />
          </Link>
          <h2 className="footer-brand-heading">{settings.siteName}</h2>
          <p>{settings.footerBlurb}</p>
          <p className="footer-tagline">{settings.footerTagline}</p>
        </div>

        <div className="footer-privacy-section">
          <b>Legal</b>
  <Link href="/privacy-policy" className="footer-privacy-link">
  <span>Privacy Policy</span>
  <span aria-hidden="true">Read our policy</span>
  </Link>
  <Link href="/terms-and-conditions" className="footer-privacy-link">
  <span>Terms &amp; Conditions</span>
  <span aria-hidden="true">Read our terms</span>
  </Link>
        </div>

        <div className="footer-connect-section">
          <b>Connect</b>
          <a href={phoneHref(settings.phone)}>
            <Phone /> {settings.phone}
          </a>
          <a href={whatsappHref(settings.whatsapp)} target="_blank" rel="noreferrer">
            <MessageCircle /> WhatsApp
          </a>
          <a href={settings.linkedin} target="_blank" rel="noreferrer">
            <Linkedin /> LinkedIn
          </a>
          <a href={settings.instagram} target="_blank" rel="noreferrer">
            <Instagram /> Instagram
          </a>
          <a href={settings.facebook} target="_blank" rel="noreferrer">
            <Facebook /> Facebook
          </a>
          <a href={settings.x} target="_blank" rel="noreferrer">
            <Twitter /> X (Twitter)
          </a>
          <a href={settings.youtube} target="_blank" rel="noreferrer">
            <Youtube /> YouTube
          </a>
          <a href={settings.tiktok} target="_blank" rel="noreferrer">
            <Music2 aria-hidden="true" /> TikTok
          </a>
          <a href={settings.discord} target="_blank" rel="noreferrer">
            <Gamepad2 aria-hidden="true" /> Discord Join Community
          </a>
        </div>
      </div>

      <div className="shell footer-bottom">
        <span>(c) {new Date().getFullYear()} {settings.siteName}. All rights reserved.</span>
        <Link href="/admin">Admin Desk</Link>
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

export function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
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

export function SectionHead({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

export function CTA() {
  const { cta } = useCms();

  return (
    <section className="cta-band">
      <div className="shell">
        <p className="eyebrow">{cta.eyebrow}</p>
        <h2>{cta.title}</h2>
        <Button asChild size="lg">
          <Link href="/contact">
            {cta.button} <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export const meta = (title: string, description: string) => ({
  meta: [
    { title: `${title} - Ceasiun` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} - Ceasiun` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
