"use client";
import { CTA, Layout, PageIntro, meta } from "@/components/site";
import { useCms } from "@/hooks/use-cms";

export default function ProcessPage() {
  const { process } = useCms();

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
