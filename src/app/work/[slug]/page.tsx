"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CTA, Layout, meta } from "@/components/site";
import { caseStudies } from "@/data/case-studies";
import { useParams } from "next/navigation";

export default function RoutePage() {
  const { slug } = useParams<{ slug: string }>();
  const item = caseStudies.find((study) => study.slug === slug && study.is_visible);

  if (!item) {
    return (
      <Layout>
        <div className="section shell" style={{ paddingTop: "10rem" }}>
          <h1>Case Study Not Found</h1>
          <p style={{ margin: "1.5rem 0" }}>The case study you are looking for does not exist or is hidden.</p>
          <Link href="/work">Return to Work</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="case-page shell">
        <Link href="/work">
          <ArrowLeft /> All Work
        </Link>
        <p className="eyebrow">{item.category} - Case Study</p>
        <h1>{item.title}</h1>
        <p className="lede">{item.summary}</p>

        <div className="case-flow">
          <section>
            <span>01</span>
            <h2>Problem</h2>
            <p>{item.problem}</p>
          </section>

          <section>
            <span>02</span>
            <h2>Approach</h2>
            <p>{item.approach}</p>
          </section>

          <section>
            <span>03</span>
            <h2>Result</h2>
            <p>{item.result}</p>
          </section>
        </div>
      </article>

      <CTA />
    </Layout>
  );
}

export { meta };
