"use client";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { Layout, CTA, meta } from "@/components/site";
import { samples } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { useCmsServices } from "@/hooks/use-cms";

const serviceNarratives: Record<string, { intro: string; outcomes: string[]; fit: string }> = {
  "web-development": {
    intro: "Your website should be more than a brochure. We design and engineer fast, conversion-focused digital products that make complex offers easy to understand and simple to act on.",
    outcomes: ["A clearer path from first visit to enquiry or checkout.", "A flexible foundation that your team can update without slowing down.", "Technical performance, accessibility, SEO, and security built into the delivery."],
    fit: "Best for teams launching a new digital product, rebuilding an outdated site, or turning a marketing site into a reliable growth channel.",
  },
  marketing: {
    intro: "We connect strategy, creative, search, and measurement into one practical growth system. Every campaign is designed around the audience, offer, and business metric that matters.",
    outcomes: ["A prioritized acquisition plan instead of disconnected tactics.", "Landing pages and campaigns aligned around one conversion journey.", "Reporting that explains what changed, why it changed, and what to do next."],
    fit: "Best for businesses that have a strong offer but need more qualified traffic, better conversion, or a repeatable acquisition engine.",
  },
  social: {
    intro: "Social media becomes valuable when it is consistent, intentional, and human. We run the day-to-day brand presence while building content systems that create trust and conversation.",
    outcomes: ["A recognizable publishing rhythm across the right channels.", "Content designed for reach, engagement, and meaningful enquiries.", "Faster community responses with clear escalation and support workflows."],
    fit: "Best for founders and teams that want an active, well-managed presence without adding a full internal content department.",
  },
  design: {
    intro: "Good design makes the right message feel obvious. We create visual systems that balance clarity, distinction, and usability across screens, campaigns, and everyday brand touchpoints.",
    outcomes: ["A visual language that stays coherent as your content grows.", "Production-ready assets sized and prepared for every channel.", "Interfaces and marketing materials that guide attention toward action."],
    fit: "Best for teams refining a product experience, launching a campaign, or replacing inconsistent visual assets with a confident system.",
  },
  branding: {
    intro: "A strong brand gives every future decision a point of view. We define the positioning, voice, visual rules, and practical toolkit your team needs to show up consistently.",
    outcomes: ["A sharper position that makes comparison easier for customers.", "Messaging and visual rules your whole team can use.", "A scalable identity system ready for new products, channels, and markets."],
    fit: "Best for new businesses, repositioning companies, and established teams whose public presence no longer matches their ambition.",
  },
  automation: {
    intro: "We turn repetitive work into dependable systems. From AI assistants to connected workflows, the goal is not novelty; it is giving your team more time for decisions, relationships, and creative work.",
    outcomes: ["Fewer manual handoffs and less duplicated data entry.", "Faster responses for prospects, customers, and internal teams.", "Documented workflows that can be monitored, improved, and safely handed over."],
    fit: "Best for businesses with repeatable processes, growing enquiry volume, or teams spending too much time moving information between tools.",
  },
  security: {
    intro: "Security work should be practical and understandable. We identify real exposure, reduce the attack surface, and give your team a prioritized path from risk discovery to resilience.",
    outcomes: ["A clearer picture of vulnerabilities and their business impact.", "Hardened access, infrastructure, and application configurations.", "Actionable remediation guidance instead of an intimidating report with no next step."],
    fit: "Best for organizations handling customer data, running revenue-critical websites, or preparing for a security review or compliance requirement.",
  },
  management: {
    intro: "A website is an operating asset, not a one-time launch. We keep it maintained, monitored, backed up, and improving so your team can focus on the business it supports.",
    outcomes: ["Fewer avoidable outages, broken updates, and performance regressions.", "A safe process for content changes, releases, and recovery.", "Ongoing technical insight through regular health and speed reviews."],
    fit: "Best for teams that need dependable technical ownership without hiring a full-time website operations team.",
  },
  managed: {
    intro: "Add senior technical capability without the weight of a full-time hiring cycle. We operate as an extension of your team across engineering, QA, cloud infrastructure, and technical decision-making.",
    outcomes: ["A dependable technical partner with clear ownership and communication.", "Stronger release quality through repeatable QA and deployment practices.", "Flexible capacity that can grow or contract with your roadmap."],
    fit: "Best for growing companies that need experienced technical execution but want to keep their team lean and focused.",
  },
};

export default function ServiceCategoryDetailPage({ slug }: { slug: string }) {
  const services = useCmsServices();
  const service = services.find((item) => item.slug === slug) ?? services[0];
  const Icon = service.icon;
  const narrative = serviceNarratives[service.slug] ?? serviceNarratives["web-development"];

  // Filter related samples or case studies
  const relatedSamples = samples.filter((sample) =>
    sample.category.toLowerCase().includes(service.slug.toLowerCase()) ||
    service.title.toLowerCase().includes(sample.category.toLowerCase())
  );
  const displaySamples = relatedSamples.length > 0 ? relatedSamples : samples;

  // Next and previous service navigation
  const currentIndex = services.findIndex((s) => s.slug === service.slug);
  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <Layout>
      {/* Service Detail Intro Hero */}
      <section className="service-detail-hero grid-bg shell">
        <div className="service-detail-nav">
          <Link  href="/services" className="back-link">
            <ArrowLeft /> All Services
          </Link>
          <span className="service-badge">Practice 0{currentIndex + 1} of 0{services.length}</span>
        </div>

        <div className="service-hero-main">
          <div className="service-icon-wrapper">
            <Icon className="hero-service-icon" />
          </div>
          <p className="eyebrow">Ceasiun Practice Area</p>
          <h1>{service.title}</h1>
          <p className="lede">
            {service.description || service.short}
          </p>

          <div className="service-hero-actions">
            <Button asChild size="lg">
              <Link  href="/contact">
                Discuss {service.title} <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#capabilities">
                Explore Capabilities <ChevronRight />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="section shell service-story-grid">
        <div className="section-head">
          <p className="eyebrow">The Approach</p>
          <h2>Built around the way your business actually works.</h2>
          <p>{narrative.intro}</p>
        </div>
        <div className="service-story-panel">
          <p className="eyebrow">What changes after delivery</p>
          <ul>
            {narrative.outcomes.map((outcome) => <li key={outcome}><CheckCircle2 />{outcome}</li>)}
          </ul>
          <p className="service-fit"><strong>Good fit:</strong> {narrative.fit}</p>
        </div>
      </section>

      {/* Core Sub-Services / Capabilities List */}
      <section id="capabilities" className="section shell">
        <div className="section-head">
          <p className="eyebrow">Capabilities & Offerings</p>
          <h2>Specialized capabilities within {service.title}.</h2>
          <p>
            Modular, high-performance solutions tailored to your technical and operational objectives.
          </p>
        </div>

        <div className="capabilities-grid">
          {service.items.map((item, idx) => (
            <Link key={item} href={`/services/${service.slug}/${item.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`} className="capability-card">
              <div className="capability-num">0{idx + 1}</div>
              <h3>{item}</h3>
              <p>
                Engineered with strict adherence to industry best practices, performance standards, and scalable architecture.
              </p>
              <div className="capability-check">
                <CheckCircle2 /> Included in Practice Scope
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Highlights & Strategic Advantages */}
      {service.highlights && service.highlights.length > 0 && (
        <section className="section shell contrast-card-section">
          <div className="contrast-card">
            <div className="section-head">
              <p className="eyebrow">Why Ceasiun</p>
              <h2>The Ceasiun standard for {service.title}.</h2>
              <p>
                We do not build generic deliverables. Every system is engineered for measurable impact, reliability, and scale.
              </p>
            </div>

            <div className="highlights-grid">
              {service.highlights.map((highlight, idx) => (
                <div key={idx} className="highlight-item">
                  <Sparkles className="highlight-icon" />
                  <p>{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Deliverables Scope Breakdown */}
      {service.deliverables && service.deliverables.length > 0 && (
        <section className="section shell">
          <div className="section-head">
            <p className="eyebrow">What You Get</p>
            <h2>Tangible deliverables & operational outputs.</h2>
            <p>
              Clear, structured handoffs with full asset ownership and technical documentation.
            </p>
          </div>

          <div className="deliverables-grid">
            {service.deliverables.map((deliverable, idx) => (
              <div key={idx} className="deliverable-card">
                <Check className="deliverable-icon" />
                <h4>{deliverable}</h4>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4-Step Execution Process for this Service */}
      <section className="section shell">
        <div className="section-head">
          <p className="eyebrow">How We Deliver</p>
          <h2>Structured execution model.</h2>
          <p>
            From requirements discovery to ongoing support, our milestone-based process ensures full alignment.
          </p>
        </div>

        <div className="case-flow">
          <section>
            <span>01</span>
            <h2>Discovery & Requirements</h2>
            <p>
              Audit current infrastructure, define technical constraints, align business objectives, and agree on clear milestone deliverables.
            </p>
          </section>

          <section>
            <span>02</span>
            <h2>Strategy & Architecture</h2>
            <p>
              Formulate system architecture, UI prototypes, or campaign frameworks designed specifically for your target audience.
            </p>
          </section>

          <section>
            <span>03</span>
            <h2>Execution Sprints</h2>
            <p>
              Rapid, modular engineering and content creation with constant progress updates and quality assurance testing.
            </p>
          </section>

          <section>
            <span>04</span>
            <h2>Launch & Support</h2>
            <p>
              Deployment under strict uptime guarantees followed by ongoing monitoring, updates, and continuous optimization.
            </p>
          </section>
        </div>
      </section>

      {/* Category Navigation Switcher */}
      <section className="section shell service-switcher-section">
        <div className="section-head">
          <p className="eyebrow">Explore Practices</p>
          <h2>Other service practices by Ceasiun.</h2>
        </div>

        <div className="switcher-grid">
          {otherServices.map((other) => {
            const OtherIcon = other.icon;
            return (
              <Link
                key={other.slug}
                 href={`/services/${other.slug}`}
                className="switcher-card"
              >
                <div className="switcher-card-head">
                  <OtherIcon />
                  <ArrowRight />
                </div>
                <h3>{other.title}</h3>
                <p>{other.short}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Related Samples / Case Studies */}
      <section className="section shell">
        <div className="section-head">
          <p className="eyebrow">Case Studies</p>
          <h2>Related work & implementation structures.</h2>
        </div>
        <div className="mini-grid">
          {displaySamples.map((sample) => (
            <Link key={sample.slug}  href={`/work/${sample.slug}`}>
              <span>{sample.category}</span>
              <h3>{sample.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
