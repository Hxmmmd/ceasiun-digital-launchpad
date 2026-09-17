import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Layout, CTA, meta } from "@/components/site";
import { samples } from "@/lib/site-data";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const item = samples.find((x) => x.slug === params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) =>
    meta(
      loaderData?.title ?? "Case Study",
      "A Ceasiun case-study example demonstrating our Problem → Approach → Result framework.",
    ),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const item = Route.useLoaderData();

  return (
    <Layout>
      <article className="case-page shell">
        <Link to="/work">
          <ArrowLeft /> All Work
        </Link>
        <p className="eyebrow">{item.category} · Clearly Marked Sample</p>
        <h1>{item.title}</h1>
        <p className="lede">{item.summary}</p>

        {/* Case Study Structure: Problem -> Approach -> Result */}
        <div className="case-flow">
          <section>
            <span>01</span>
            <h2>Problem</h2>
            <p>
              Growing businesses often struggle with fragmented digital tools, unclear conversion
              pathways, and inefficient operational workflows that hinder growth.
            </p>
          </section>

          <section>
            <span>02</span>
            <h2>Approach</h2>
            <p>
              Audit the architecture, map user journeys, eliminate high-friction points, and execute
              modular engineering and automation in structured milestone sprints.
            </p>
          </section>

          <section>
            <span>03</span>
            <h2>Result</h2>
            <p>
              A cohesive, highly performant digital ecosystem prepared for scaling. Note: This entry
              illustrates our methodology and is not a claim regarding an unverified client.
            </p>
          </section>
        </div>
      </article>

      <CTA />
    </Layout>
  );
}
