"use client";
import { CTA, Layout, PageIntro, meta } from "@/components/site";

const processContent = {
  eyebrow: "Delivery Process",
  title: "Clarity at every stage.",
  copy: "A disciplined eight-step method keeps strategy, craft, and execution moving seamlessly in the same direction.",
  steps: [
    {
      title: "Discussion",
      description: "Clarifying business goals, project requirements, expectations, scope, and key challenges.",
    },
    {
      title: "Discovery",
      description: "Understand the business, user needs, technical constraints, and strategic opportunities.",
    },
    {
      title: "Planning",
      description: "Define clear priorities, target outcomes, project milestones, and team responsibilities.",
    },
    {
      title: "Contract",
      description: "Confirming responsibilities, project terms, milestones, payment structure, and contractual commitments.",
    },
    {
      title: "Execute",
      description: "Transforming the approved plan into design, development, implementation, and measurable deliverables.",
    },
    {
      title: "Review",
      description: "Validating the work, addressing feedback, resolving issues, and refining the final outcome.",
    },
    {
      title: "Delivery",
      description: "Completing final checks, preparing handover, and delivering the approved solution and project assets.",
    },
    {
      title: "Support",
      description: "Maintaining the delivered solution, resolving post-launch issues, and supporting ongoing improvements.",
    },
  ],
  engagementTitle: "Two engagement models built for flexibility.",
  projectLabel: "Project-Based",
  projectCopy: "Discover -> Propose -> Contract -> Execute -> Review -> Complete -> Deliver",
  retainerLabel: "Monthly Retainer",
  retainerCopy: "Discover -> Propose -> Contract -> Onboard -> Execute -> Report -> Renew",
  payment:
    "Payment structure: 30% advance required to initiate work, followed by milestone-based payments.",
};

export default function ProcessPage() {
  const process = processContent;

  return (
    <Layout>
      <PageIntro eyebrow={process.eyebrow} title={process.title} copy={process.copy} />

      <section className="section shell timeline">
        {process.steps.map((step, index) => (
          <article key={`${step.title}-${index}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </article>
        ))}
      </section>

      <section className="contrast section">
        <div className="shell">
          <h2>{process.engagementTitle}</h2>
          <div className="engagement-grid">
            <article>
              <span>{process.projectLabel}</span>
              <p>{process.projectCopy}</p>
            </article>

            <article>
              <span>{process.retainerLabel}</span>
              <p>{process.retainerCopy}</p>
            </article>
          </div>

          <p className="payment">{process.payment}</p>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}

export { meta };
