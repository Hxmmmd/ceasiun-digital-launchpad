import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Layout, PageIntro, CTA, meta } from "@/components/site";
import { samples } from "@/lib/site-data";
import commerce from "@/assets/work-commerce.jpg";
import automation from "@/assets/work-automation.jpg";
import brand from "@/assets/work-brand.jpg";

const images = {
  commerce,
  automation,
  brand,
};

export const Route = createFileRoute("/work")({
  head: () =>
    meta(
      "Selected Work",
      "Explore Ceasiun’s case-study approach across website engineering, automation, and branding.",
    ),
  component: WorkPage,
});

function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(samples.map((sample) => sample.category))];

  const filteredSamples =
    selectedCategory === "All"
      ? samples
      : samples.filter((sample) => sample.category === selectedCategory);

  return (
    <Layout>
      <PageIntro
        eyebrow="Work & Portfolio"
        title="A record of deliberate problem solving."
        copy="Until verified client case studies are released with client consent, these sample structures demonstrate our Problem → Approach → Result framework."
      />

      <section className="section shell">
        {/* Category Filter */}
        <div className="filters">
          {categories.map((category) => (
            <button
              className={selectedCategory === category ? "selected" : ""}
              onClick={() => setSelectedCategory(category)}
              key={category}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Case Study Grid */}
        <div className="work-grid">
          {filteredSamples.map((item) => (
            <Link
              to="/work/$slug"
              params={{ slug: item.slug }}
              key={item.slug}
              className="work-card"
            >
              <img
                src={images[item.image as keyof typeof images]}
                alt={item.title}
                width={1200}
                height={800}
                loading="lazy"
              />
              <div>
                <span>{item.category} · Sample Case Study</span>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
