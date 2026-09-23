"use client";
import { useEffect, useState } from "react";
import { CMS_EVENT } from "@/lib/cms";

export type Post = { id: string; slug: string; title: string; excerpt: string; category: string; body: string; author: string; cover_url: string | null; published_at: string | null; tags: string[]; status?: string };
export type Testimonial = { id: string; quote: string; attribution: string; company: string; is_sample: boolean; is_visible?: boolean; sort_order?: number };
export type CaseStudy = { id: string; slug: string; title: string; category: string; summary: string; problem: string; approach: string; result: string; is_visible: boolean };
export type CareerOpening = { id: string; title: string; location: string; type: string; description: string; is_visible: boolean };

const serviceInsightPosts: Post[] = [
  {
    id: "service-insight-web-development", slug: "website-development-as-a-business-asset", title: "Your Business Is Real. Is It Findable?", excerpt: "A website is more than a digital brochure: it is the digital home where customers verify, understand, and choose your business.", category: "Website Development", body: "## A website is your digital home\n\nCustomers research before they call, visit, or buy. A clear business website gives them a reliable place to understand what you do, see proof, and take the next step without waiting for a reply.\n\n## The right website for the right business\n\nA service company may need a focused lead-generation website. A retailer may need e-commerce. A consultant may need a portfolio. A growing operation may need a custom web application, portal, or dashboard. Web development works best when the experience follows the way the business actually operates.\n\n## What keeps it valuable\n\nLaunch is only the beginning. Hosting, domain management, security, performance, backups, and maintenance keep a website useful instead of letting it become a liability.\n\n## Where ceasiun fits\n\nceasiun builds and maintains business websites, portfolios, commerce platforms, and custom digital products around your goals, audience, and next stage of growth.", author: "Ceasiun Team", cover_url: null, published_at: "2026-09-19T00:00:00.000Z", tags: ["website development", "business website", "e-commerce"], status: "published"
  },
  {
    id: "service-insight-marketing", slug: "digital-marketing-is-a-system-not-a-tactic", title: "Digital Marketing Is a System, Not a Tactic", excerpt: "SEO, paid ads, lead generation, and measurement work best when they are connected by one clear strategy.", category: "Digital Marketing", body: "## Visibility has a sequence\n\nDigital marketing helps a business get found, get remembered, and get chosen. Search, social, paid campaigns, landing pages, and follow-up are different parts of the same customer journey.\n\n## Organic and paid work together\n\nSEO builds discoverability around the questions customers already ask. Google Ads captures active intent. Meta and Instagram Ads reach relevant audiences before they search. Each channel has a different job, and the strategy decides how they support one another.\n\n## Attention is not the finish line\n\nViews and clicks matter only when they lead somewhere useful. Clear offers, focused landing pages, lead forms, and measurement turn attention into conversations a business can follow up with.\n\n## Where ceasiun fits\n\nceasiun connects SEO, paid media, lead generation, and performance tracking into a practical plan shaped around the business.", author: "Ceasiun Team", cover_url: null, published_at: "2026-09-18T00:00:00.000Z", tags: ["digital marketing", "SEO", "Google Ads", "lead generation"], status: "published"
  },
  {
    id: "service-insight-social", slug: "social-media-management-is-brand-operations", title: "Social Media Management Is Brand Operations", excerpt: "A consistent social presence takes planning, creation, publishing, response, and daily attention.", category: "Social Media Management", body: "## Your feed is part of your first impression\n\nBefore a customer visits a website, they may check a social profile to see whether the business is active, real, and trustworthy. An abandoned or inconsistent page can create the wrong impression even when the business itself is excellent.\n\n## More than posting\n\nManaged social media includes content calendars, captions, reels, graphics, publishing, inbox responses, comment moderation, outreach, and monitoring. The goal is not to fill a schedule. It is to build a recognizable presence connected to business priorities.\n\n## Consistency creates familiarity\n\nA clear visual language and reliable rhythm help people remember a brand before they are ready to buy.\n\n## Where ceasiun fits\n\nceasiun manages strategy, content, graphics, and day-to-day account operations so your social presence stays active and on-brand.", author: "Ceasiun Team", cover_url: null, published_at: "2026-09-17T00:00:00.000Z", tags: ["social media management", "content creation", "social media strategy"], status: "published"
  },
  {
    id: "service-insight-design", slug: "graphic-design-that-makes-ideas-clear", title: "Graphic Design That Makes Ideas Clear", excerpt: "Good design is not decoration alone; it helps people understand, remember, and act.", category: "Graphic Designing", body: "## Design carries meaning\n\nA graphic, interface, presentation, or campaign asset has a job to do. Strong design makes that job easier by creating hierarchy, focus, and a visual language people can recognize.\n\n## From digital products to campaign assets\n\nUI and UX design shape how people use a product. Social graphics and banners help content stop the scroll. Presentations, pitch kits, and marketing collateral make complex ideas easier to follow.\n\n## Consistency compounds\n\nReusable components, type choices, color rules, and export standards make every future asset faster and more coherent.\n\n## Where ceasiun fits\n\nceasiun creates purposeful visual systems across product, marketing, social, presentation, and digital brand touchpoints.", author: "Ceasiun Team", cover_url: null, published_at: "2026-09-16T00:00:00.000Z", tags: ["graphic design", "UI UX design", "marketing creatives"], status: "published"
  },
  {
    id: "service-insight-branding", slug: "a-logo-is-not-a-brand", title: "A Logo Is Not a Brand", excerpt: "Branding is the consistent identity, voice, and experience people encounter across every touchpoint.", category: "Branding", body: "## The mark is only one piece\n\nA logo helps people recognize a business, but a brand is the larger feeling and expectation built through every interaction: the words, colors, typography, service experience, website, and content.\n\n## Recognition builds trust\n\nConsistency makes a business feel intentional and established. It helps customers remember the company and gives marketing, sales, and product teams a shared foundation.\n\n## Build a system, not a file\n\nA useful brand system includes positioning, voice, logo rules, typography, color, imagery, iconography, and practical guidance for using them.\n\n## Where ceasiun fits\n\nceasiun builds complete brand systems that remain coherent across websites, social channels, campaigns, presentations, and real-world materials.", author: "Ceasiun Team", cover_url: null, published_at: "2026-09-15T00:00:00.000Z", tags: ["branding", "brand identity", "logo design"], status: "published"
  },
  {
    id: "service-insight-automation", slug: "turn-repetitive-work-into-a-better-system", title: "Turn Repetitive Work Into a Better System", excerpt: "Practical automation removes avoidable manual work so teams can spend more time on decisions and customers.", category: "AI / Automation", body: "## Manual work is often a systems problem\n\nCopying data between tools, answering the same questions, chasing follow-ups, and updating records consume attention that could be used for higher-value work.\n\n## Automation should fit the workflow\n\nA useful system connects the tools a business already relies on: CRM, email, forms, messaging, databases, and internal dashboards. AI can add conversation, classification, summarization, and decision support where it is genuinely helpful.\n\n## Start with the bottleneck\n\nThe best first automation is usually a repeated process with clear inputs, predictable rules, and an obvious owner.\n\n## Where ceasiun fits\n\nceasiun designs custom agents, chatbots, CRM workflows, integrations, and AI search systems around real operational needs.", author: "Ceasiun Team", cover_url: null, published_at: "2026-09-14T00:00:00.000Z", tags: ["business automation", "AI agents", "workflow automation"], status: "published"
  },
  {
    id: "service-insight-security", slug: "security-is-part-of-the-digital-foundation", title: "Security Is Part of the Digital Foundation", excerpt: "Security is not a final checkbox; it is the ongoing practice of reducing risk across systems, access, and operations.", category: "Cyber Security", body: "## Digital trust needs a foundation\n\nWebsites, applications, customer data, and internal tools all create responsibilities. A weakness in one layer can affect availability, privacy, and confidence.\n\n## Assess before you guess\n\nPenetration testing, vulnerability reviews, threat modeling, access checks, SSL configuration, WAF setup, and malware cleanup reveal where attention is needed.\n\n## Protection is ongoing\n\nPatching, backups, monitoring, least-privilege access, and incident preparation keep security from becoming a once-a-year exercise.\n\n## Where ceasiun fits\n\nceasiun helps teams understand exposure and strengthen websites, applications, infrastructure, and recovery practices with practical defensive work.", author: "Ceasiun Team", cover_url: null, published_at: "2026-09-13T00:00:00.000Z", tags: ["cyber security", "website security", "WAF"], status: "published"
  },
  {
    id: "service-insight-management", slug: "a-website-is-not-done-at-launch", title: "A Website Is Not Done at Launch", excerpt: "Ongoing maintenance keeps a website secure, fast, current, and available as the business changes.", category: "Website Management", body: "## Launch is a milestone\n\nA website lives inside a changing environment: browsers update, plugins change, threats evolve, content needs editing, and traffic patterns shift.\n\n## Small maintenance prevents larger problems\n\nUpdates, backups, uptime checks, performance reviews, bug fixes, and staging workflows help teams catch issues before they become outages or expensive rebuilds.\n\n## Ownership creates confidence\n\nWhen someone is responsible for the technical health of the site, the business can focus on its customers instead of wondering whether the next update will break something.\n\n## Where ceasiun fits\n\nceasiun provides ongoing upkeep, monitoring, optimization, troubleshooting, backups, and technical support for sites that need to keep working.", author: "Ceasiun Team", cover_url: null, published_at: "2026-09-12T00:00:00.000Z", tags: ["website maintenance", "website management", "performance"], status: "published"
  },
  {
    id: "service-insight-managed", slug: "senior-technical-capability-without-the-overhead", title: "Senior Technical Capability Without the Overhead", excerpt: "A managed services partner can extend engineering, QA, cloud, and architecture capacity without forcing a full-time hiring cycle.", category: "Managed Services", body: "## Growth creates technical pressure\n\nAs products and operations grow, teams need reliable releases, stronger testing, infrastructure ownership, and better technical decisions. Hiring for every need is not always the right answer.\n\n## Flexible capability, clear ownership\n\nManaged services work when responsibilities, communication, priorities, and service expectations are explicit. The partner becomes an extension of the team rather than a disconnected vendor.\n\n## Build for the roadmap\n\nEngineering, QA, DevOps, system administration, and architecture support can scale with the work in front of the business.\n\n## Where ceasiun fits\n\nceasiun provides senior technical capability across delivery and operations while keeping the engagement practical, transparent, and aligned to the roadmap.", author: "Ceasiun Team", cover_url: null, published_at: "2026-09-11T00:00:00.000Z", tags: ["managed services", "DevOps", "QA", "technical advisory"], status: "published"
  },
];

const defaultTestimonials: Testimonial[] = [
  ["Ceasiun delivered a complete website overhaul in just 3 weeks. The result was beyond what we expected — clean, fast, and exactly on-brand.", "CEO, Pakistani SaaS Startup"],
  ["Their AI automation work saved our team over 20 hours per week. The WhatsApp bot alone handles 80% of our customer queries.", "Operations Director, E-commerce Brand"],
    ["A polished digital experience that feels exactly right for our brand.", "Founder, Growth Company"],
    ["Clear communication, sharp execution, and a smooth launch.", "Marketing Lead, SaaS Brand"],
    ["They turned a complicated brief into a simple, high-performing product.", "Director, Technology Group"],
    ["The team was thoughtful, responsive, and easy to work with.", "Brand Manager, Retail Company"],
    ["Their strategic thinking made every design decision count.", "Founder, Consumer Startup"],
    ["Fast delivery, strong ideas, and excellent attention to detail.", "COO, Services Business"],
    ["The new platform made our workflow much easier.", "Operations Lead, Logistics Brand"],
    ["A dependable partner with both creative taste and technical depth.", "CEO, Digital Product"],
].map(([quote, attribution], index) => ({ id: `default-test-${index + 1}`, quote, attribution, company: "Confidential Client", is_sample: true, is_visible: true, sort_order: index + 1 }));

function loadLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function useLocalRefresh(onRefresh: () => void, deps: unknown[] = []) {
  useEffect(() => {
    onRefresh();
    window.addEventListener(CMS_EVENT, onRefresh);
    window.addEventListener("storage", onRefresh);
    return () => {
      window.removeEventListener(CMS_EVENT, onRefresh);
      window.removeEventListener("storage", onRefresh);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function usePublishedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  useLocalRefresh(() => {
    const saved = loadLocal<Post[]>("ceasiun_blog_posts", []);
    const savedSlugs = new Set(saved.map((post) => post.slug));
    const merged = [...saved, ...serviceInsightPosts.filter((post) => !savedSlugs.has(post.slug))];
    setPosts(merged.filter((p) => p.status === "published").sort((a, b) => new Date(b.published_at ?? 0).getTime() - new Date(a.published_at ?? 0).getTime()));
  });
  return posts;
}

export function usePost(slug: string) {
  const [post, setPost] = useState<Post | null | undefined>(undefined);
  useLocalRefresh(() => {
    const saved = loadLocal<Post[]>("ceasiun_blog_posts", []);
    const savedPost = saved.find((p) => p.slug === slug && p.status === "published");
    const seededPost = serviceInsightPosts.find((p) => p.slug === slug && p.status === "published");
    setPost(savedPost ?? seededPost ?? null);
  }, [slug]);
  return post;
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  useLocalRefresh(() => {
    const saved = loadLocal<Testimonial[]>("ceasiun_testimonials", []);
    const combined = saved.length >= 10
      ? saved
      : [...saved, ...defaultTestimonials.filter((item) => !saved.some((entry) => entry.id === item.id)).slice(0, 10 - saved.length)];
    setTestimonials(combined.filter((t) => t.is_visible !== false).sort((a, b) => (a.sort_order ?? 99) - (b.sort_order ?? 99)));
  });
  return testimonials;
}

export function useCaseStudies() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  useLocalRefresh(() => setCases(loadLocal<CaseStudy[]>("ceasiun_case_studies", []).filter((c) => c.is_visible)));
  return cases;
}

export function useCareerOpenings() {
  const [jobs, setJobs] = useState<CareerOpening[]>([]);
  useLocalRefresh(() => setJobs(loadLocal<CareerOpening[]>("ceasiun_careers", []).filter((c) => c.is_visible)));
  return jobs;
}
