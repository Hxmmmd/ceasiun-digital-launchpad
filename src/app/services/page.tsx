"use client";
import Link from "next/link";
import { CTA, Layout, PageIntro } from "@/components/site";
import { samples } from "@/lib/site-data";
import { ServiceExplorer } from "@/components/page-components/ServiceExplorer";

const servicesPageContent = {
  eyebrow: "Services",
  title: "Capability without fragmentation.",
  copy: "Nine specialist practices, connected around the outcomes your business needs.",
};

export default function ServicesPage() {
  return (
    <Layout>
      <PageIntro
        eyebrow={servicesPageContent.eyebrow}
        title={servicesPageContent.title}
        copy={servicesPageContent.copy}
      />

      <section className="section shell">
        <ServiceExplorer />
      </section>

      <section className="section shell">
        <h2>Related work structures</h2>
        <div className="mini-grid">
          {samples.map((sample) => (
            <Link key={sample.slug} href={`/work/${sample.slug}`}>
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
