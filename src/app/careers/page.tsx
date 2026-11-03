"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Layout, PageIntro, meta } from "@/components/site";

const careersContent = {
  eyebrow: "Careers",
  title: "Do serious work with people who care about details.",
  copy: "We value clear thinking, ownership, honest communication, and the discipline to keep improving.",
  values: ["Own the outcome", "Stay curious", "Communicate clearly", "Make it maintainable"],
};

const careerOpenings = [
  {
    id: "career-1",
    title: "Full-Stack Web Developer (MERN)",
    location: "Remote / Lahore, Pakistan",
    type: "Full-Time",
    description:
      "We are looking for a skilled MERN-stack developer to join our growing engineering team. You will work on client-facing web applications, SaaS platforms, and automation systems.",
    is_visible: true,
  },
];

export default function CareersPage() {
  const jobs = careerOpenings.filter((c) => c.is_visible);

  return (
    <Layout>
      <PageIntro
        eyebrow={careersContent.eyebrow}
        title={careersContent.title}
        copy={careersContent.copy}
      />

      <section className="section shell">
        <div className="values-grid">
          {careersContent.values.map((value) => (
            <article key={value}>
              <h2>{value}</h2>
              <p>Our culture rewards practical judgment, continuous learning, and software built to last.</p>
            </article>
          ))}
        </div>

        <div className="jobs">
          <p className="eyebrow">Open Positions</p>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <article key={job.id}>
                <div>
                  <h2>{job.title}</h2>
                  <span>
                    {job.location} - {job.type}
                  </span>
                </div>
                <p>{job.description}</p>
                <Link href="/contact">
                  Apply Now <ArrowUpRight />
                </Link>
              </article>
            ))
          ) : (
            <div className="empty-proof">
              <h3>No open roles right now.</h3>
              <p>Follow Ceasiun on LinkedIn and social channels to stay updated on future hiring announcements.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export { meta };
