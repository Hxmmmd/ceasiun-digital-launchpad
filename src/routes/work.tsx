"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCaseStudies } from "@/components/public-content";
import { CTA, Layout, PageIntro, meta } from "@/components/site";
import { useCms } from "@/hooks/use-cms";
import { samples } from "@/lib/site-data";
import automation from "@/assets/work-automation.jpg";
import brand from "@/assets/work-brand.jpg";
import commerce from "@/assets/work-commerce.jpg";

const images = [commerce, automation, brand];

export default function WorkPage() {
  const { work } = useCms();
  const cmsCases = useCaseStudies();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const cases = useMemo(() => {
    if (cmsCases.length > 0) return cmsCases;
    return samples.map((sample) => ({
      id: sample.slug,
      slug: sample.slug,
      title: sample.title,
      category: sample.category,
      summary: sample.summary,
      problem: "",
      approach: "",
      result: "",
      is_visible: true,
    }));
  }, [cmsCases]);

  const categories = ["All", ...new Set(cases.map((item) => item.category))];
  const filteredCases =
    selectedCategory === "All" ? cases : cases.filter((item) => item.category === selectedCategory);

  return (
    <Layout>
      <PageIntro eyebrow={work.eyebrow} title={work.title} copy={work.copy} />

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
            <Link  href={`/work/${item.slug}`} key={item.id} className="work-card">
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
