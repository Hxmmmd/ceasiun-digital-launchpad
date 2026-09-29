"use client";
import Link from "next/link";
import { ArrowRight, Check, MoveRight } from "lucide-react";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import TechBackground from "@/components/TechBackground";
import { CountUp } from "@/components/count-up";
import { useTestimonials } from "@/components/public-content";
import { CTA, Layout, SectionHead, meta } from "@/components/site";
import { Button } from "@/components/ui/button";
import HowItWorks02 from "@/components/ui/how-it-works-02";
import { useCms, useCmsServices } from "@/hooks/use-cms";
import ShapeGrid from "@/components/ShapeGrid";

export default function HomePage() {
  const cms = useCms(); 
  const services = useCmsServices();
  const testimonials = useTestimonials();

  return (
    <Layout>
      <section style={{ width: '100%', height: '600px', position: 'relative' }} className="hero">
        {/* <TechBackground scale={1.5} gridMul={[2, 1]} digitSize={1.2} timeScale={0.5} pause={false} scanlineIntensity={0.5} glitchAmount={1} flickerAmount={1} noiseAmp={1} chromaticAberration={0} dither={0} curvature={0.1} tint="#00fdceff" mouseReact mouseStrength={0.5} pageLoadAnimation brightness={0.6}/> */}
        <ShapeGrid speed={0.5} squareSize={30} direction="up" borderColor="#c1c1c1ff" hoverFillColor="#22222" hoverTrailAmount={0} shape='hexagon'/>
        <div className="hero-shade" />
        <div className="shell hero-content">
          <p className="eyebrow">{cms.home.heroEyebrow}</p>
          <h1>{cms.home.heroTitle}</h1>
          <p>{cms.home.heroCopy}</p>
          <Button asChild size="lg" className="project-cta">
            <Link href="/contact">{cms.home.heroCta}</Link>
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
              <Link  href={`/services/${service.slug}`} className="service-card" key={service.slug}>
                <span>0{index + 1}</span>
                <Icon />
                <h3>{service.title}</h3>
                <p>{service.short}</p>
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
          <TestimonialCarousel testimonials={testimonials} />
        ) : (
          <div className="empty-proof">
            <h3>Verified client stories are being prepared.</h3>
            <p>We would rather show no claim than an unverified one.</p>
          </div>
        )}
      </section>

      <section style={{paddingTop:"0px"}} className="section home-process">
        <HowItWorks02
          eyebrow={cms.process.eyebrow}
          heading={cms.process.title}
          steps={cms.process.steps}
        />
        <div className="shell" style={{ display: "flex", justifyContent: "center", marginTop: "-1rem" }}>
          <Button asChild size="lg" className="premium-button"><Link href="/contact">Start with a clear plan</Link></Button>
        </div>
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
