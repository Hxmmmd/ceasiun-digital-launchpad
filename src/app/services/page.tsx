"use client";
import Link from "next/link";
import { CTA, Layout, PageIntro} from "@/components/site";
import { useCms } from "@/hooks/use-cms";
import { samples } from "@/lib/site-data";
import { ServiceExplorer } from "@/components/page-components/ServiceExplorer";

export default function ServicesPage() {
  const cms = useCms();

  return (
    <Layout>
      <PageIntro
        eyebrow={cms.servicesPage.eyebrow}
        title={cms.servicesPage.title}
        copy={cms.servicesPage.copy}
      />

      <section className="section shell">
        <ServiceExplorer />
      </section>

      <section className="section shell">
        <h2>Related work structures</h2>
        <div className="mini-grid">
          {samples.map((sample) => (
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
