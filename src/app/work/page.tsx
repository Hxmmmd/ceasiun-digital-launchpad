"use client";
import Link from "next/link";
import { useState } from "react";
import { CTA, Layout, PageIntro, meta } from "@/components/site";
import { caseStudies } from "@/lib/case-studies";
import automation from "@/assets/work-automation.jpg";
import brand from "@/assets/work-brand.jpg";
import commerce from "@/assets/work-commerce.jpg";

const images = [commerce, automation, brand];

const workContent = {
  eyebrow: "Work & Portfolio",
  title: "A record of deliberate problem solving.",
  copy: "Until verified client case studies are released with client consent, these sample structures demonstrate our Problem -> Approach -> Result framework.",
};

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const cases = caseStudies.filter((item) => item.is_visible);
  const categories = ["All", ...new Set(cases.map((item) => item.category))];
  const filteredCases =
    selectedCategory === "All" ? cases : cases.filter((item) => item.category === selectedCategory);

  return (
    <Layout>
      <PageIntro eyebrow={workContent.eyebrow} title={workContent.title} copy={workContent.copy} />

      <section className="section shell">
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

        <div className="work-grid">
          {filteredCases.map((item, index) => (
            <Link href={`/work/${item.slug}`} key={item.id} className="work-card">
              <img
                src={images[index % images.length].src}
                alt={item.title}
                width={1200}
                height={800}
                loading="lazy"
              />
              <div>
                <span>{item.category} - Case Study</span>
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

export { meta };
