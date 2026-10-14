"use client";

import Link from "next/link";
import { ArrowUpRight, Bot, Braces, Brush, ChartNoAxesCombined, CloudCog, Palette, ShieldCheck, Sparkles, Wrench } from "lucide-react";
// import { services } from "@/lib/site-data";
import "./ServiceList.css";

export const services = [
    {
        slug: "web-development",
        title: "Website Development",
        short: "High-performance websites, commerce platforms, SaaS and custom digital products.",
        icon: Braces,
        description:
        "Ceasiun delivers end-to-end web engineering—from high-converting WordPress & Shopify solutions to custom full-stack MERN & SaaS web applications built for speed, SEO, and scale.",
        items: [
        "Landing Pages & Portfolios",
        "E-commerce Development",
        "MERN Stack Applications",
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
        slug: "branding",
        title: "Brand Identity",
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
        slug: "managed",
        title: "Managed Services",
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
const serviceListAreas = services.map((service) => ({
    slug: service.slug,
    title: service.title,
    detail: service.description,
    icon: service.icon,
    capabilities: service.items,
}));

export function ServiceList() {
    return (
            <div className="service-list-cards" aria-label="Service areas">
                {serviceListAreas.map((service, index) => {
                    const ServiceIcon = service.icon;
                    return (
                    <Link
                        className={`service-list-detail service-list-card-static service-list-card-${service.slug}`}
                        href={`/services/${service.slug}`}
                        key={service.title}
                    >
                        <div className="service-list-card-heading">
                        <span className="service-list-card-icon">
                            <ServiceIcon size={23} strokeWidth={1.7} aria-hidden="true" />
                        </span>
                        <span className="service-list-card-number">0{index + 1}</span>
                        </div>
                        <h3>{service.title}</h3>
                        <p>{service.detail}</p>
                        <span className="card-link">
                            View service <ArrowUpRight size={16} aria-hidden="true" />
                        </span>
                    </Link>
                    );
                })}
            </div>
    );
}

export default ServiceList;