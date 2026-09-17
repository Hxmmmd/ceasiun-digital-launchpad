import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, MoveRight } from "lucide-react";
import { Layout, SectionHead, CTA, meta } from "@/components/site";
import { CountUp } from "@/components/count-up";
import { useTestimonials } from "@/components/public-content";
import { services, faq } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import hero from "@/assets/ceasiun-hero.jpg";

export const Route = createFileRoute("/")({
  head: () =>
    meta(
      "Digital Growth Partner",
      "Ceasiun builds digital products, growth systems, automation, security, and managed operations for ambitious businesses.",
    ),
  component: HomePage,
});

function HomePage() {
  const testimonials = useTestimonials();

  const keyReasons = [
    "End-to-end digital capability",
    "Milestone-led delivery",
    "Post-launch partnership",
    "A 21-person specialist team",
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero">
        <img
          src={hero}
          width={1600}
          height={1008}
          alt="Abstract precision architecture representing connected digital systems"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="shell hero-content">
          <p className="eyebrow">Digital solutions · Built for growth</p>
          <h1>Digital systems that move business forward.</h1>
          <p>
            Ceasiun brings engineering, growth, automation, design, security, and managed operations
            into one accountable partnership.
          </p>
          <Button asChild size="lg">
            <Link to="/contact" search={{ service: "" }}>
              Start a project <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section shell">
        <SectionHead
          eyebrow="One partner. Nine capabilities."
          title="Built to solve the whole digital problem."
          copy="Strategy is stronger when execution is connected. Our specialists work as one team across every critical touchpoint."
        />
        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link to="/services" hash={service.slug} className="service-card" key={service.slug}>
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

      {/* Why Choose Us */}
      <section className="contrast section">
        <div className="shell split">
          <div>
            <p className="eyebrow">Why Ceasiun</p>
            <h2>Senior thinking. Practical delivery. One clear line of accountability.</h2>
          </div>
          <div className="reasons">
            {keyReasons.map((reason) => (
              <p key={reason}>
                <Check />
                {reason}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Statistics */}
      <section className="stats">
        <div className="shell stats-grid">
          <div>
            <strong>
              <CountUp value={2024} />
            </strong>
            <span>Established</span>
          </div>
          <div>
            <strong>
              <CountUp value={21} />
            </strong>
            <span>Team members</span>
          </div>
          <div>
            <strong>
              <CountUp value={9} />
            </strong>
            <span>Core capabilities</span>
          </div>
          <div>
            <strong>
              <CountUp value={8} />
            </strong>
            <span>Delivery stages</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section shell">
        <SectionHead
          eyebrow="Client perspective"
          title="Proof belongs in the open."
          copy="Only approved client feedback is published. Sample entries are always clearly identified."
        />
        {testimonials.length > 0 ? (
          <div className="quote-grid">
            {testimonials.map((item) => (
              <blockquote key={item.id}>
                <p>“{item.quote}”</p>
                <footer>
                  {item.attribution} · {item.company}
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

      {/* FAQ Section */}
      <section className="section shell faq">
        <SectionHead eyebrow="Questions, answered" title="A clear start to every engagement." />
        {faq.map(([question, answer], index) => (
          <details key={question} open={index === 0}>
            <summary>
              {question}
              <span>+</span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>

      {/* Primary CTA */}
      <CTA />
    </Layout>
  );
}
