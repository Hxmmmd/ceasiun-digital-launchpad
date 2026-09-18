import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useCaseStudies } from "@/components/public-content";
import { CTA, Layout, meta } from "@/components/site";
import { samples } from "@/lib/site-data";

export const Route = createFileRoute("/work/$slug")({
  head: () => meta("Case Study", "A Ceasiun case-study example demonstrating our Problem to Approach to Result framework."),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { slug } = Route.useParams();
  const cmsCases = useCaseStudies();
  const fallback = samples.find((sample) => sample.slug === slug);
  const item =
    cmsCases.find((study) => study.slug === slug) ??
    (fallback
      ? {
          id: fallback.slug,
          slug: fallback.slug,
          title: fallback.title,
          category: fallback.category,
          summary: fallback.summary,
          problem:
            "Growing businesses often struggle with fragmented digital tools, unclear conversion pathways, and inefficient operational workflows that hinder growth.",
          approach:
            "Audit the architecture, map user journeys, eliminate high-friction points, and execute modular engineering and automation in structured milestone sprints.",
          result:
            "A cohesive, highly performant digital ecosystem prepared for scaling. This entry illustrates our methodology and is not a claim regarding an unverified client.",
          is_visible: true,
        }
      : null);

  if (!item) {
    return (
      <Layout>
        <div className="section shell" style={{ paddingTop: "10rem" }}>
          <h1>Case Study Not Found</h1>
          <p style={{ margin: "1.5rem 0" }}>The case study you are looking for does not exist or is hidden.</p>
          <Link to="/work">Return to Work</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="case-page shell">
        <Link to="/work">
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
