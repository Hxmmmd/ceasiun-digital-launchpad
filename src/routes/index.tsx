"use client";
import Link from "next/link";
import { ArrowRight, Check, MoveRight } from "lucide-react";
import { CountUp } from "@/components/count-up";
import { useTestimonials } from "@/components/public-content";
import { CTA, Layout, SectionHead, meta } from "@/components/site";
import { Button } from "@/components/ui/button";
import { useCms, useCmsServices } from "@/hooks/use-cms";
import hero from "@/assets/ceasiun-hero.jpg";

export default function HomePage() {
  const cms = useCms();
  const services = useCmsServices();
  const testimonials = useTestimonials();

  return (
    <Layout>
      <section className="hero">
        <img src={hero.src} width={1600} height={1008} alt={cms.home.heroAlt} fetchPriority="high" />
        <div className="hero-shade" />
        <div className="shell hero-content">
          <p className="eyebrow">{cms.home.heroEyebrow}</p>
          <h1>{cms.home.heroTitle}</h1>
          <p>{cms.home.heroCopy}</p>
          <Button asChild size="lg">
            <Link  href="/contact">
              {cms.home.heroCta} <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      <section className="section shell">
        <SectionHead
          eyebrow={cms.home.servicesEyebrow}
          title={cms.home.servicesTitle}
          copy={cms.home.servicesCopy}
        />
        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link  href="/services" className="service-card" key={service.slug}>
                <span>0{index + 1}</span>
                <Icon />
                <h3>{service.title}</h3>
                <p>{service.short}</p>
                <MoveRight />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="contrast section">
        <div className="shell split">
          <div>
            <p className="eyebrow">{cms.home.whyEyebrow}</p>
            <h2>{cms.home.whyTitle}</h2>
          </div>
          <div className="reasons">
            {cms.home.whyReasons.map((reason) => (
              <p key={reason}>
                <Check />
                {reason}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="shell stats-grid">
          {cms.home.stats.map((stat) => (
            <div key={stat.label}>
              <strong>
                <CountUp value={stat.value} />
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section shell">
        <SectionHead
          eyebrow={cms.home.testimonialsEyebrow}
          title={cms.home.testimonialsTitle}
          copy={cms.home.testimonialsCopy}
        />
        {testimonials.length > 0 ? (
          <div className="quote-grid">
            {testimonials.map((item) => (
              <blockquote key={item.id}>
                <p>"{item.quote}"</p>
                <footer>
                  {item.attribution} - {item.company}
                  {item.is_sample && <em>Sample</em>}
                </footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <div className="empty-proof">
            <h3>Verified client stories are being prepared.</h3>
            <p>We would rather show no claim than an unverified one.</p>
          </div>
        )}
      </section>

      <section className="section shell faq">
        <SectionHead eyebrow={cms.home.faqEyebrow} title={cms.home.faqTitle} />
        {cms.faq.map(([question, answer], index) => (
          <details key={question} open={index === 0}>
            <summary>
              {question}
              <span>+</span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>

      <CTA />
    </Layout>
  );
}
