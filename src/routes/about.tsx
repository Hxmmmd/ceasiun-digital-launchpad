"use client";
import { CTA, Layout, PageIntro, meta } from "@/components/site";
import { useCms } from "@/hooks/use-cms";

export default function AboutPage() {
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

      <section className="section shell location-section">
        <div><p className="eyebrow">Find Ceasiun</p><h2>Let&apos;s make the next move practical.</h2><p className="muted-note">Visit our Google Business location or get directions for a conversation.</p><a className="premium-button button" href="https://share.google/naFgKU46P5H4EYIJw" target="_blank" rel="noreferrer">Open in Google Maps</a></div>
        <iframe className="location-map" title="Ceasiun location on Google Maps" src="https://www.google.com/maps?q=https://share.google/naFgKU46P5H4EYIJw&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </section>

      <CTA />
    </Layout>
  );
}
