import { createFileRoute, Link, notFound } from "@tanstack/react-router";
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
import { services, samples } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { useCmsServices } from "@/hooks/use-cms";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const item = services.find((x) => x.slug === params.slug);
    if (!item) throw notFound();
    return { slug: item.slug };
  },
  head: ({ loaderData }) =>
    meta(
      services.find((item) => item.slug === loaderData?.slug)?.title ?? "Service Category",
      services.find((item) => item.slug === loaderData?.slug)?.short ??
        "Explore specialized digital services from Ceasiun across web engineering, marketing, branding, AI automation, and managed operations.",
    ),
  component: ServiceCategoryDetailPage,
});

function ServiceCategoryDetailPage() {
  const { slug } = Route.useLoaderData();
  const services = useCmsServices();
  const service = services.find((item) => item.slug === slug) ?? services[0];
  const Icon = service.icon;

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
          <Link to="/services" className="back-link">
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
              <Link to="/contact" search={{ service: service.title }}>
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
            <div key={item} className="capability-card">
              <div className="capability-num">0{idx + 1}</div>
              <h3>{item}</h3>
              <p>
                Engineered with strict adherence to industry best practices, performance standards, and scalable architecture.
              </p>
              <div className="capability-check">
                <CheckCircle2 /> Included in Practice Scope
              </div>
            </div>
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
                to="/services/$slug"
                params={{ slug: other.slug }}
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
            <Link key={sample.slug} to="/work/$slug" params={{ slug: sample.slug }}>
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
