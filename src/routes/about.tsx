"use client";
import { CTA, Layout, PageIntro, meta } from "@/components/site";
import { useCms } from "@/hooks/use-cms";
import Link from "next/link";

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

      <section className="section shell location-wrapper">
        <div className="location-grid">
          <div className="location-card">
            <h2 className="eyebrow">Headquarters</h2>
            <h3>Find Ceasiun</h3>
            <address>
              <strong>Ceasiun</strong><br />
              I. I. Chundrigar Road<br />
              Uni Plaza, Suite #1020<br />
              Karachi, Pakistan
            </address>
            <div className="mt-3">
              <strong>Timing:</strong>
              <p>Monday - Friday: 11:00 AM - 8:00 PM</p>
              <p>Saturday: 11:00 AM - 5:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
              <Link 
                style={{  marginTop: "20px" , display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "10px", border: "2px solid #828282ff" }}
                className="premium-button button" 
                href="https://maps.app.goo.gl/xR5ne8MuStow1pb76" target="_blank" rel="noreferrer">
                Get Directions
              </Link>
          </div>
          <div className="location-map-container">
            <iframe
              className="location-map"
              title="Ceasiun Software Company Office" 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.400283959781!2d67.00501277445741!3d24.850174777936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33ff9dd4d6471%3A0xd1c0173002762743!2sCeasiun!5e0!3m2!1sen!2s!4v1790140401067!5m2!1sen!2s" 
              width="600" 
              height="450" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
            />
          </div>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
