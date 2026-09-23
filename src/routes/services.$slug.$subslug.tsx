"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Layers, Sparkles } from "lucide-react";
import { Layout, CTA, meta } from "@/components/site";
import { Button } from "@/components/ui/button";
import { useCmsServices } from "@/hooks/use-cms";

const slugify = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const subserviceCopy: Record<string, { intro: string; outcomes: string[]; deliverables: string[] }> = {
  "wordpress-development": { intro: "A fast, flexible WordPress experience shaped around your content, customers, and long-term growth.", outcomes: ["A maintainable editor experience for your team.", "A polished responsive interface across every device.", "Technical SEO, performance, and security foundations built in."], deliverables: ["Custom page and component system", "CMS configuration and content migration", "Performance and launch QA"] },
  "woocommerce-development": { intro: "A focused WooCommerce storefront that makes browsing, buying, and managing products feel effortless.", outcomes: ["Clear product discovery and checkout journeys.", "Reliable payment, shipping, and order workflows.", "A store structure ready for campaigns and new products."], deliverables: ["Custom storefront and product templates", "Checkout and payment integrations", "Analytics and conversion tracking"] },
  "shopify-development": { intro: "A distinctive Shopify storefront that keeps the platform simple for your team while making the customer experience unmistakably yours.", outcomes: ["A branded theme without sacrificing Shopify reliability.", "A clean mobile-first purchase path.", "Flexible merchandising and campaign sections."], deliverables: ["Custom Shopify theme sections", "Store setup and catalog structure", "Conversion and launch optimization"] },
  "seo-search-engine-optimization": { intro: "Search visibility built from technical clarity, useful content, and a realistic growth plan tied to the way your customers search.", outcomes: ["A clearer opportunity map for priority searches.", "Technical improvements that help pages get discovered.", "Content direction grounded in intent and business value."], deliverables: ["Technical SEO audit", "Keyword and competitor research", "Content and measurement roadmap"] },
};

const fallbackCopy = { intro: "A focused Ceasiun practice designed around your goals, your audience, and the practical work required to create measurable progress.", outcomes: ["A clearer plan from discovery to delivery.", "A responsive experience aligned to your brand system.", "A documented foundation your team can build on."], deliverables: ["Discovery and implementation plan", "Responsive production-ready delivery", "QA, handoff, and next-step guidance"] };

export default function ServiceSubservicePage({ slug, subslug }: { slug: string; subslug: string }) {
  const services = useCmsServices();
  const service = services.find((entry) => entry.slug === slug);
  const item = service?.items.find((entry) => slugify(entry) === subslug);
  if (!service || !item) return null;

  const copy = subserviceCopy[subslug] ?? fallbackCopy;
  const Icon = service.icon;
  return (
    <Layout>
      <main>
        <section className="subservice-hero grid-bg shell">
          <Link href={`/services/${service.slug}`} className="back-link"><ArrowLeft /> Back to {service.title}</Link>
          <div className="subservice-hero-content">
            <div className="service-icon-wrapper"><Icon /></div>
            <p className="eyebrow">{service.title} / Practice</p>
            <h1>{item}</h1>
            <p className="lede">{copy.intro}</p>
            <div className="service-hero-actions"><Button asChild size="lg"><Link href="/contact">Discuss this practice <ArrowUpRight /></Link></Button><Button asChild variant="outline" size="lg"><a href="#details">See the details <ArrowUpRight /></a></Button></div>
          </div>
        </section>

        <section id="details" className="section shell subservice-detail-grid">
          <div className="section-head"><p className="eyebrow">What this unlocks</p><h2>Practical work with a clear reason behind it.</h2><p>Every engagement stays connected to the broader {service.title.toLowerCase()} strategy, so the output is useful beyond launch day.</p></div>
          <div className="subservice-outcomes">{copy.outcomes.map((outcome) => <div className="subservice-outcome" key={outcome}><CheckCircle2 /><p>{outcome}</p></div>)}</div>
        </section>

        <section className="section shell subservice-deliverables"><div className="section-head"><p className="eyebrow">Included in scope</p><h2>What you can expect from Ceasiun.</h2></div><div className="deliverables-grid">{copy.deliverables.map((deliverable) => <div className="deliverable-card" key={deliverable}><Layers /><h3>{deliverable}</h3></div>)}</div></section>
        <section className="section shell subservice-next"><div className="subservice-next-card"><Sparkles /><div><p className="eyebrow">Next step</p><h2>Let&apos;s shape the right version of {item} for your business.</h2><p>We&apos;ll start with your goals, constraints, and current setup, then recommend the clearest path forward.</p></div><Button asChild><Link href="/contact">Start a conversation <ArrowUpRight /></Link></Button></div></section>
      </main>
      <CTA />
    </Layout>
  );
}

export { meta };
