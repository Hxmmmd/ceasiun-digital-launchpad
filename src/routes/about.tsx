import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageIntro, CTA, meta } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () =>
    meta(
      "About Ceasiun",
      "Founded in 2024 by Hammad Hanif, Ceasiun is a digital growth partner agency with a team of 21 specialists.",
    ),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <PageIntro
        eyebrow="About Ceasiun"
        title="A digital partner built for long-term accountability."
        copy="Ceasiun helps businesses go digital and grow through connected engineering, marketing, automation, and managed operations."
      />

      {/* Company Story */}
      <section className="section shell split story">
        <div>
          <p className="eyebrow">Our Story</p>
          <h2>Started focused. Growing deliberately.</h2>
        </div>
        <div>
          <p>
            Founded in 2024 by Hammad Hanif, Ceasiun began with a core team of 10 digital
            specialists. Today, our team has grown to 21 people working across software engineering,
            growth marketing, visual design, AI automation, cybersecurity, and managed
            infrastructure.
          </p>
          <p>
            Our growth is driven by a simple model: understand the client's real business challenge,
            assemble the right specialist capabilities, and maintain clear accountability through
            execution and post-launch support.
          </p>
        </div>
      </section>

      {/* Team & Culture */}
      <section className="team-band">
        <div className="shell">
          <p className="eyebrow">Team & Culture</p>
          <h2>Different disciplines. Shared standards.</h2>
          <div className="culture-grid">
            <div>
              <strong>21</strong>
              <span>Team members</span>
            </div>
            <div>
              <strong>9</strong>
              <span>Connected practices</span>
            </div>
            <div>
              <strong>1</strong>
              <span>Delivery culture</span>
            </div>
          </div>
          <p className="muted-note">
            Detailed team profiles and photography will be published upon verification. Ceasiun does
            not display placeholder staff or unverified client claims.
          </p>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
