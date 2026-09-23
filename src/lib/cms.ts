import { faq as defaultFaq, processSteps, services as staticServices } from "@/lib/site-data";

export const CMS_STORAGE_KEY = "ceasiun_cms_pages";
export const CMS_PREVIEW_KEY = "ceasiun_cms_preview";
export const CMS_EVENT = "ceasiun-cms-updated";

export type PageIntroContent = {
  eyebrow: string;
  title: string;
  copy: string;
};

export type ServiceContent = {
  slug: string;
  title: string;
  short: string;
  description: string;
  items: string[];
  highlights: string[];
  deliverables: string[];
};

export type CmsContent = {
  settings: {
    siteName: string;
    tagline: string;
    phone: string;
    whatsapp: string;
    email: string;
    announcementBanner: string;
    bannerActive: boolean;
    linkedin: string;
    instagram: string;
    facebook: string;
    x: string;
    youtube: string;
    tiktok: string;
    discord: string;
    headerCta: string;
    footerBlurb: string;
    footerTagline: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    button: string;
  };
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroCopy: string;
    heroCta: string;
    heroAlt: string;
    servicesEyebrow: string;
    servicesTitle: string;
    servicesCopy: string;
    whyEyebrow: string;
    whyTitle: string;
    whyReasons: string[];
    stats: { value: number; label: string }[];
    testimonialsEyebrow: string;
    testimonialsTitle: string;
    testimonialsCopy: string;
    faqEyebrow: string;
    faqTitle: string;
  };
  about: PageIntroContent & {
    storyEyebrow: string;
    storyTitle: string;
    storyP1: string;
    storyP2: string;
    cultureEyebrow: string;
    cultureTitle: string;
    cultureNote: string;
    cultureStats: { value: string; label: string }[];
  };
  process: PageIntroContent & {
    steps: { title: string; description: string }[];
    engagementTitle: string;
    projectLabel: string;
    projectCopy: string;
    retainerLabel: string;
    retainerCopy: string;
    payment: string;
  };
  servicesPage: PageIntroContent;
  work: PageIntroContent;
  blog: PageIntroContent;
  careers: PageIntroContent & {
    values: string[];
  };
  contact: PageIntroContent & {
    successTitle: string;
    successCopy: string;
    asideEyebrow: string;
    asideTitle: string;
    paymentEyebrow: string;
    paymentCopy: string;
    faqEyebrow: string;
    faqTitle: string;
  };
  faq: [string, string][];
  services: ServiceContent[];
};

const defaultStepDescriptions = [
  "Understand the business, user needs, technical constraints, and strategic opportunities.",
  "Define clear priorities, target outcomes, project milestones, and team responsibilities.",
  "Shape user experiences, UI components, and brand guidelines before writing production code.",
  "Engineer resilient frontends, backends, and integrations in controlled, reviewable stages.",
  "Rigorous testing for performance, security, responsiveness, accessibility, and functional requirements.",
  "Execute a smooth production deployment with monitoring, DNS setup, and launch readiness checks.",
  "Stabilize infrastructure, resolve initial user feedback, and provide continuous technical support.",
  "Measure analytics, review growth data, and iteratively improve what drives business performance.",
];

export const defaultCms: CmsContent = {
  settings: {
    siteName: "Ceasiun",
    tagline: "Your Digital Growth Partner",
    phone: "0314 0262087",
    whatsapp: "+923140262087",
    email: "contact@ceasiun.com",
    announcementBanner: "Launch Sprints Available for Q4 - Reserve Your Slot Now!",
    bannerActive: true,
    linkedin: "https://linkedin.com/in/ceasiun",
    instagram: "https://instagram.com/ceasiun",
    facebook: "https://facebook.com/ceasiun",
    x: "https://x.com/ceasiun",
    youtube: "https://youtube.com/@ceasiun",
    tiktok: "https://tiktok.com/@ceasiun",
    discord: "https://discord.com/invite/AkBQH7EQM4",
    headerCta: "Start a project",
    footerBlurb: "Ceasiun, your digital growth partner.",
    footerTagline:
      "Website Development - Digital Marketing - SMM - Design - Branding - AI & Automation - Cyber Security - Managed Operations",
  },
  cta: {
    eyebrow: "Your Next Move",
    title: "Build what growth needs next.",
    button: "Talk to Ceasiun",
  },
  home: {
    heroEyebrow: "Digital solutions - Built for growth",
    heroTitle: "Digital systems that move business forward.",
    heroCopy:
      "Ceasiun brings engineering, growth, automation, design, security, and managed operations into one accountable partnership.",
    heroCta: "Start a project",
    heroAlt: "Abstract precision architecture representing connected digital systems",
    servicesEyebrow: "One partner. Nine capabilities.",
    servicesTitle: "Built to solve the whole digital problem.",
    servicesCopy:
      "Strategy is stronger when execution is connected. Our specialists work as one team across every critical touchpoint.",
    whyEyebrow: "Why Ceasiun",
    whyTitle: "Senior thinking. Practical delivery. One clear line of accountability.",
    whyReasons: [
      "End-to-end digital capability",
      "Milestone-led delivery",
      "Post-launch partnership",
      "A 21-person specialist team",
    ],
    stats: [
      { value: 2024, label: "Established" },
      { value: 21, label: "Team members" },
      { value: 9, label: "Core capabilities" },
      { value: 8, label: "Delivery stages" },
    ],
    testimonialsEyebrow: "Client perspective",
    testimonialsTitle: "Proof belongs in the open.",
    testimonialsCopy: "Only approved client feedback is published. Sample entries are always clearly identified.",
    faqEyebrow: "Questions, answered",
    faqTitle: "A clear start to every engagement.",
  },
  about: {
    eyebrow: "About Ceasiun",
    title: "A digital partner built for long-term accountability.",
    copy: "Ceasiun helps businesses go digital and grow through connected engineering, marketing, automation, and managed operations.",
    storyEyebrow: "Our Story",
    storyTitle: "Started focused. Growing deliberately.",
    storyP1:
      "Founded in 2024 by Hammad Hanif, Ceasiun began with a core team of 10 digital specialists. Today, our team has grown to 21 people working across software engineering, growth marketing, visual design, AI automation, cybersecurity, and managed infrastructure.",
    storyP2:
      "Our growth is driven by a simple model: understand the client's real business challenge, assemble the right specialist capabilities, and maintain clear accountability through execution and post-launch support.",
    cultureEyebrow: "Team & Culture",
    cultureTitle: "Different disciplines. Shared standards.",
    cultureNote:
      "Detailed team profiles and photography will be published upon verification. Ceasiun does not display placeholder staff or unverified client claims.",
    cultureStats: [
      { value: "21", label: "Team members" },
      { value: "9", label: "Connected practices" },
      { value: "1", label: "Delivery culture" },
    ],
  },
  process: {
    eyebrow: "Delivery Process",
    title: "Clarity at every stage.",
    copy: "A disciplined eight-step method keeps strategy, craft, and execution moving seamlessly in the same direction.",
    steps: processSteps.map((title, i) => ({
      title,
      description: defaultStepDescriptions[i] ?? "",
    })),
    engagementTitle: "Two engagement models built for flexibility.",
    projectLabel: "Project-Based",
    projectCopy: "Discover -> Propose -> Contract -> Execute -> Review -> Complete -> Deliver",
    retainerLabel: "Monthly Retainer",
    retainerCopy: "Discover -> Propose -> Contract -> Onboard -> Execute -> Report -> Renew",
    payment:
      "Payment structure: 30% advance required to initiate work, followed by milestone-based payments.",
  },
  servicesPage: {
    eyebrow: "Services",
    title: "Capability without fragmentation.",
    copy: "Nine specialist practices, connected around the outcomes your business needs.",
  },
  work: {
    eyebrow: "Work & Portfolio",
    title: "A record of deliberate problem solving.",
    copy: "Until verified client case studies are released with client consent, these sample structures demonstrate our Problem -> Approach -> Result framework.",
  },
  blog: {
    eyebrow: "Insights & Articles",
    title: "Useful thinking for digital operators.",
    copy: "Practical perspectives across the disciplines that shape modern digital growth.",
  },
  careers: {
    eyebrow: "Careers",
    title: "Do serious work with people who care about details.",
    copy: "We value clear thinking, ownership, honest communication, and the discipline to keep improving.",
    values: ["Own the outcome", "Stay curious", "Communicate clearly", "Make it maintainable"],
  },
  contact: {
    eyebrow: "Contact Us",
    title: "Let's define the next move.",
    copy: "Tell us where your business is now, what needs to change, and what a successful outcome looks like.",
    successTitle: "Message received.",
    successCopy: "Thank you for reaching out. The Ceasiun team will review your enquiry and respond shortly.",
    asideEyebrow: "Direct Contact",
    asideTitle: "Prefer a conversation?",
    paymentEyebrow: "Payment Options",
    paymentCopy:
      "Pakistan: Easypaisa, JazzCash, Credit Card, Bank Transfer. International: Payoneer, Mastercard, Visa.",
    faqEyebrow: "Before We Begin",
    faqTitle: "Common questions answered.",
  },
  faq: defaultFaq as [string, string][],
  services: staticServices.map((s) => ({
    slug: s.slug,
    title: s.title,
    short: s.short,
    description: s.description,
    items: [...s.items],
    highlights: [...s.highlights],
    deliverables: [...s.deliverables],
  })),
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function mergeCms(base: CmsContent, extra: unknown): CmsContent {
  if (!isRecord(extra)) return base;
  const next = structuredClone(base);
  for (const key of Object.keys(base) as (keyof CmsContent)[]) {
    const incoming = extra[key];
    if (incoming === undefined) continue;
    if (Array.isArray(base[key])) {
      if (Array.isArray(incoming) && incoming.length) {
        (next as Record<string, unknown>)[key] = incoming;
      }
      continue;
    }
    if (isRecord(base[key]) && isRecord(incoming)) {
      (next as Record<string, unknown>)[key] = { ...(base[key] as object), ...incoming };
    }
  }
  return next;
}

export function loadCms(preferPreview = false): CmsContent {
  if (typeof window === "undefined") return defaultCms;
  try {
    if (preferPreview) {
      const draft = sessionStorage.getItem(CMS_PREVIEW_KEY);
      if (draft) return mergeCms(defaultCms, JSON.parse(draft));
    }
    const published = localStorage.getItem(CMS_STORAGE_KEY);
    const settings = localStorage.getItem("ceasiun_site_settings");
    let cms = published ? mergeCms(defaultCms, JSON.parse(published)) : structuredClone(defaultCms);
    if (settings) {
      const s = JSON.parse(settings) as Partial<CmsContent["settings"]>;
      cms = { ...cms, settings: { ...cms.settings, ...s } };
    }
    return cms;
  } catch {
    return defaultCms;
  }
}

export function saveCms(content: CmsContent) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(content));
  localStorage.setItem("ceasiun_site_settings", JSON.stringify(content.settings));
  window.dispatchEvent(new Event(CMS_EVENT));
}

export function saveCmsPreview(content: CmsContent) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CMS_PREVIEW_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event(CMS_EVENT));
}

export function isCmsPreviewMode() {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("cms_preview") === "1" || window.parent !== window;
}

export function notifyCmsListeners() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CMS_EVENT));
  }
}
