import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { CTA, Layout, PageIntro, meta } from "@/components/site";
import { useCms, useCmsServices } from "@/hooks/use-cms";
import { samples } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () =>
    meta(
      "Digital Services",
      "Explore Ceasiun's connected service areas across web engineering, marketing, social media, design, branding, AI automation, security, and managed operations.",
    ),
  component: ServicesPage,
});

function ServicesPage() {
  const cms = useCms();
  const services = useCmsServices();

  return (
    <Layout>
      <PageIntro
        eyebrow={cms.servicesPage.eyebrow}
        title={cms.servicesPage.title}
        copy={cms.servicesPage.copy}
      />

      <section className="section shell service-list">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <article id={service.slug} key={service.slug}>
              <div>
                <span>0{index + 1}</span>
                <Icon />
                <h2>
                  <Link to="/services/$slug" params={{ slug: service.slug }}>
                    {service.title}
                  </Link>
                </h2>
                <p>{service.short}</p>
              </div>

              <ul>
                {service.items.map((item) => (
                  <li key={item}>
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="service-card-actions">
                <Link to="/services/$slug" params={{ slug: service.slug }} className="service-detail-btn">
                  View Service Details <ArrowUpRight />
                </Link>
                <Link to="/contact" search={{ service: service.title }} className="service-contact-btn">
                  Discuss this service <ArrowUpRight />
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      <section className="section shell">
        <h2>Related work structures</h2>
        <div className="mini-grid">
          {samples.map((sample) => (
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
