import {
  Bot,
  Braces,
  Brush,
  ChartNoAxesCombined,
  CloudCog,
  Palette,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

export const services = [
  {
    slug: "web-development",
    title: "Website Development",
    short: "High-performance websites, commerce platforms, SaaS and custom digital products.",
    icon: Braces,
    description:
      "Ceasiun delivers end-to-end web engineering—from high-converting WordPress & Shopify solutions to custom full-stack MERN & SaaS web applications built for speed, SEO, and scale.",
    items: [
      "WordPress Development",
      "WooCommerce Development",
      "Shopify Development",
      "Custom E-commerce Platforms",
      "MERN Stack Applications",
      "Landing Pages & Portfolios",
      "Custom Corporate Websites",
      "SaaS Product Development",
    ],
    highlights: [
      "Sub-second load speeds & Core Web Vitals optimization",
      "Mobile-first responsive UX across all devices",
      "Clean, scalable code architecture & modular components",
      "Built-in search engine optimization and security hardening",
    ],
    deliverables: [
      "Fully customized codebase & database setup",
      "Admin dashboard with content management capability",
      "Payment gateway & API integrations",
      "Post-launch QA testing and launch deployment",
    ],
  },
  {
    slug: "marketing",
    title: "Digital Marketing",
    short: "Search, content and paid growth systems built around measurable business goals.",
    icon: ChartNoAxesCombined,
    description:
      "Data-driven marketing strategies that generate qualified leads, boost conversion rates, and build repeatable revenue streams across Google, Meta, and search platforms.",
    items: [
      "SEO (Search Engine Optimization)",
      "Social Media Marketing",
      "Content Writing & Strategy",
      "Google Ads (PPC & Search)",
      "Meta Ads (Facebook & Instagram)",
    ],
    highlights: [
      "ROI-focused campaign structures and ad copy",
      "Comprehensive keyword research & competitor analysis",
      "Custom analytics & weekly performance dashboards",
      "A/B testing for landing page conversion optimization",
    ],
    deliverables: [
      "Complete ad account setup & audience targeting",
      "Monthly performance reporting and strategy calls",
      "SEO technical audits and backlink acquisition strategy",
      "High-converting ad creative copy and assets",
    ],
  },
  {
    slug: "social",
    title: "Social Media Management",
    short: "Always-on brand operations, content publishing, outreach and 24/7 support.",
    icon: Sparkles,
    description:
      "Complete social channel management to build an active, engaged community. We handle content creation, posting schedules, inbox responses, and strategic outreach on your behalf.",
    items: [
      "Social Media Account Setup & Optimization",
      "Multi-Platform Brand Management",
      "Posts, Reels & Stories Visual Creation",
      "Customer Inbox & Comment Moderation",
      "B2B & B2C Client Outreach",
      "24/7 Brand Monitoring & Support",
    ],
    highlights: [
      "Consistent visual identity across all social channels",
      "Proactive engagement to convert followers into clients",
      "Structured content calendars planned weeks in advance",
      "Dedicated account managers for rapid turnarounds",
    ],
    deliverables: [
      "Monthly content calendars with copy and visuals",
      "Community engagement & DM response workflows",
      "Outreach campaigns targeting ideal client profiles",
      "Growth metrics and audience demographic reports",
    ],
  },
  {
    slug: "design",
    title: "Graphic Designing",
    short:
      "Purposeful visual communication across product, UI, logo, and digital brand touchpoints.",
    icon: Palette,
    description:
      "Elevated visual graphics that capture attention and communicate your brand's authority across UI design, marketing collateral, social posts, and digital assets.",
    items: [
      "UI / UX Design for Web & Mobile",
      "Logo & Brand Icon Design",
      "Digital Marketing Collateral",
      "Social Media Graphics & Banners",
      "Presentation Decks & Pitch Kits",
    ],
    highlights: [
      "Modern aesthetic grounded in UX research",
      "Pixel-perfect visual assets exported for web & print",
      "Figma design tokens & UI design systems",
      "Fast turnarounds with iterative feedback cycles",
    ],
    deliverables: [
      "High-resolution PNG, SVG, PDF, and source files",
      "Figma workspace links with complete design specs",
      "Responsive UI component libraries",
      "Versatile logo variations for light/dark themes",
    ],
  },
  {
    slug: "branding",
    title: "Branding",
    short: "Strategy and visual identity systems that make businesses recognizable and coherent.",
    icon: Brush,
    description:
      "Strategic visual branding that elevates market positioning. We establish comprehensive brand guides, messaging frameworks, and visual assets that make your business unforgettable.",
    items: [
      "Brand Guide & Brand Book",
      "Brand Strategy & Positioning",
      "Product & Package Branding",
      "Social Media Brand Systems",
      "Typography & Color Palette",
      "Brand Consultancy & Audits",
    ],
    highlights: [
      "Distinctive market positioning against competitors",
      "Cohesive design tokens used across all touchpoints",
      "Clear brand voice and messaging guidelines",
      "Future-proof assets ready for scale",
    ],
    deliverables: [
      "Comprehensive Brand Guidelines (PDF & digital format)",
      "Typography hierarchy and curated color palettes",
      "Logo usage rules and iconography set",
      "Brand story & elevator pitch framework",
    ],
  },
  {
    slug: "automation",
    title: "AI / Automation",
    short:
      "Practical AI systems, custom agents, and workflows that remove manual work and improve discovery.",
    icon: Bot,
    description:
      "Deploy custom AI agents, automated workflow pipelines, and conversational bots that save hundreds of hours of manual effort while maximizing customer engagement.",
    items: [
      "Custom AI Agent Development",
      "Automated Workflow Integration",
      "AI Chatbot Development for Web & WhatsApp",
      "Sales & Lead CRM Automation",
      "Internal Business Process Automations",
      "AI Search Engine Visibility (LLM Optimization)",
      "AI-Powered SEO Systems",
    ],
    highlights: [
      "Zero-code / low-code and custom API automation pipelines",
      "LLM integration (OpenAI, Gemini, Claude, Llama)",
      "24/7 automated customer support and lead qualification",
      "Enhanced visibility in AI search engines (Perplexity, ChatGPT, Gemini)",
    ],
    deliverables: [
      "Custom AI bot/agent deployed on your website or messaging channel",
      "Zapier / Make / n8n workflow pipeline setup",
      "CRM & database sync integrations",
      "Staff training and operational documentation",
    ],
  },
  {
    slug: "security",
    title: "Cyber Security",
    short: "Defensive services that protect websites, data assets, and operational continuity.",
    icon: ShieldCheck,
    description:
      "Rigorous website penetration testing, vulnerability assessments, and active defense mechanisms to safeguard your digital assets against threats, data leaks, and downtime.",
    items: [
      "Website Penetration Testing",
      "DDoS Mitigation & Management",
      "SSL / TLS Infrastructure Setup",
      "Security Vulnerability Audits",
      "Malware Removal & Cleanups",
      "Web Application Firewall (WAF) Setup",
    ],
    highlights: [
      "Comprehensive threat modeling and penetration reports",
      "Proactive patch management and exploit prevention",
      "Hardened server & database access controls",
      "Compliance checks for data privacy and storage",
    ],
    deliverables: [
      "Detailed penetration test report with vulnerability ratings",
      "Remediation roadmap & security patches applied",
      "WAF & Cloudflare security configuration",
      "24/7 security monitoring setup",
    ],
  },
  {
    slug: "management",
    title: "Website Management",
    short:
      "Reliable upkeep, security, and optimization that keeps websites fast, current and available.",
    icon: Wrench,
    description:
      "Hassle-free, ongoing maintenance for your website. We handle updates, speed optimizations, uptime monitoring, backups, content edits, and technical troubleshooting.",
    items: [
      "Continuous Website Upkeep & Plugin Updates",
      "Performance & Speed Optimization",
      "24/7 Uptime & Server Health Monitoring",
      "Regular Content & Asset Updates",
      "Bug Fixes & Technical Troubleshooting",
      "Automated Cloud Backups & Recovery",
    ],
    highlights: [
      "99.9% guaranteed uptime support",
      "Daily/Weekly automated cloud backups",
      "Priority response times for bug fixes",
      "Monthly speed & health diagnostic reports",
    ],
    deliverables: [
      "Dedicated developer support hours each month",
      "Staging environment for safe update testing",
      "Performance report showing loading metrics",
      "Emergency recovery guarantee in case of server crashes",
    ],
  },
  {
    slug: "managed",
    title: "Managed Services Contract",
    short:
      "Senior technical capability and engineering operations without the overhead of full-time hiring.",
    icon: CloudCog,
    description:
      "Scale your engineering, QA, and cloud infrastructure operations with Ceasiun's dedicated technical team. Get senior-level expertise on a flexible monthly contract basis.",
    items: [
      "DevOps Managed Services",
      "Marketing Managed Services",
      "System Administration Managed Services",
      "Network Administration Managed Services",
      "Managed QA & Automated Testing",
      "Technical Advisory & Architecture",
    ],
    highlights: [
      "Flexible scaling without long-term recruitment risk",
      "Senior DevOps & QA engineers integrated with your team",
      "Transparent sprint management and daily standups",
      "Cost efficiency compared to full-time in-house hiring",
    ],
    deliverables: [
      "Dedicated team members with clear SLA commitments",
      "CI/CD pipeline architecture & deployment management",
      "Automated test suites & quality gate setup",
      "Weekly executive reporting on technical health",
    ],
  },
];

export const processSteps = [
  "Discovery",
  "Planning & Strategy",
  "Design",
  "Development",
  "Testing & QA",
  "Deployment & Launch",
  "Post-Launch Support",
  "Continuous Improvement",
];

export const faq = [
  [
    "What kind of businesses do you work with?",
    "Ceasiun supports startups and growing businesses that need a dependable digital partner—for initial launches or ongoing technical operations.",
  ],
  [
    "How do engagements begin?",
    "Every engagement starts with discovery. We define the objective, scope out the solution, propose a clear timeline, and agree on contract terms before starting.",
  ],
  [
    "How are payments structured?",
    "Projects require a 30% advance, followed by milestone-based payments. We accept local Pakistan payment methods (Easypaisa, JazzCash, Credit Card, Bank Transfer) and international methods (Payoneer, Mastercard, Visa).",
  ],
  [
    "Can Ceasiun support us after launch?",
    "Yes. We offer post-launch support, website management, performance monitoring, continuous improvement, and monthly managed services contracts.",
  ],
];

export const nav = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Work", "/work"],
  ["Products", "/products"],
  ["About", "/about"],
  ["Blog", "/blog"],
] as const;

export const samples = [
  {
    slug: "commerce-replatform",
    title: "Commerce Replatforming Architecture",
    category: "Engineering",
    summary:
      "A sample case-study structure showing how Ceasiun frames a complex e-commerce overhaul and custom checkout integration.",
    image: "commerce",
  },
  {
    slug: "automation-operations",
    title: "Operations & CRM AI Automation",
    category: "AI / Automation",
    summary:
      "A sample engagement mapping fragmented operational tasks into an automated AI workflow.",
    image: "automation",
  },
  {
    slug: "brand-system",
    title: "Digital Brand Identity System",
    category: "Branding",
    summary:
      "A sample identity guide and digital rollout designed for visual clarity across all digital channels.",
    image: "brand",
  },
];
