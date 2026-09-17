import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageIntro, CTA, meta } from "@/components/site";
import { processSteps } from "@/lib/site-data";

export const Route = createFileRoute("/process")({
  head: () =>
    meta(
      "Our Process",
      "Explore Ceasiun’s eight-stage delivery process, project-based model, and monthly retainer engagement workflows.",
    ),
  component: ProcessPage,
});

const stepDescriptions = [
  "Understand the business, user needs, technical constraints, and strategic opportunities.",
  "Define clear priorities, target outcomes, project milestones, and team responsibilities.",
  "Shape user experiences, UI components, and brand guidelines before writing production code.",
  "Engineer resilient frontends, backends, and integrations in controlled, reviewable stages.",
  "Rigorous testing for performance, security, responsiveness, accessibility, and functional requirements.",
  "Execute a smooth production deployment with monitoring, DNS setup, and launch readiness checks.",
  "Stabilize infrastructure, resolve initial user feedback, and provide continuous technical support.",
  "Measure analytics, review growth data, and iteratively improve what drives business performance.",
];

function ProcessPage() {
  return (
    <Layout>
      <PageIntro
        eyebrow="Delivery Process"
        title="Clarity at every stage."
        copy="A disciplined eight-step method keeps strategy, craft, and execution moving seamlessly in the same direction."
      />

      {/* Eight-Step Delivery Process */}
      <section className="section shell timeline">
        {processSteps.map((step, index) => (
          <article key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{step}</h2>
            <p>{stepDescriptions[index]}</p>
          </article>
        ))}
      </section>

      {/* Engagement Models & Payment Terms */}
      <section className="contrast section">
        <div className="shell">
          <h2>Two engagement models built for flexibility.</h2>
          <div className="engagement-grid">
            <article>
              <span>Project-Based</span>
              <p>Discover → Propose → Contract → Execute → Review → Complete → Deliver</p>
            </article>

            <article>
              <span>Monthly Retainer</span>
              <p>Discover → Propose → Contract → Onboard → Execute → Report → Renew</p>
            </article>
          </div>

          <p className="payment">
            Payment structure: 30% advance required to initiate work, followed by milestone-based
            payments.
          </p>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
