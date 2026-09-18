import { createFileRoute } from "@tanstack/react-router";
import { CTA, Layout, PageIntro, meta } from "@/components/site";
import { useCms } from "@/hooks/use-cms";

export const Route = createFileRoute("/about")({
  head: () =>
    meta(
      "About Ceasiun",
      "Founded in 2024 by Hammad Hanif, Ceasiun is a digital growth partner agency with a team of 21 specialists.",
    ),
  component: AboutPage,
});

function AboutPage() {
  const { about } = useCms();

  return (
    <Layout>
      <PageIntro eyebrow={about.eyebrow} title={about.title} copy={about.copy} />

      <section className="section shell split story">
        <div>
          <p className="eyebrow">{about.storyEyebrow}</p>
          <h2>{about.storyTitle}</h2>
        </div>
        <div>
          <p>{about.storyP1}</p>
          <p>{about.storyP2}</p>
        </div>
      </section>

      <section className="team-band">
        <div className="shell">
          <p className="eyebrow">{about.cultureEyebrow}</p>
          <h2>{about.cultureTitle}</h2>
          <div className="culture-grid">
            {about.cultureStats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <p className="muted-note">{about.cultureNote}</p>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
