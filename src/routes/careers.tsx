import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useCareerOpenings } from "@/components/public-content";
import { Layout, PageIntro, meta } from "@/components/site";

export const Route = createFileRoute("/careers")({
  head: () =>
    meta(
      "Careers at Ceasiun",
      "Explore open roles and culture at Ceasiun. We value ownership, practical judgment, and technical excellence.",
    ),
  component: CareersPage,
});

const coreValues = [
  "Own the outcome",
  "Stay curious",
  "Communicate clearly",
  "Make it maintainable",
];

function CareersPage() {
  const jobs = useCareerOpenings();
  const loading = jobs === undefined;


  return (
    <Layout>
      <PageIntro
        eyebrow="Careers"
        title="Do serious work with people who care about details."
        copy="We value clear thinking, ownership, honest communication, and the discipline to keep improving."
      />

      <section className="section shell">
        {/* Culture / Values */}
        <div className="values-grid">
          {coreValues.map((value) => (
            <article key={value}>
              <h2>{value}</h2>
              <p>
                Our culture rewards practical judgment, continuous learning, and software built to
                last.
              </p>
            </article>
          ))}
        </div>

        {/* Open Roles */}
        <div className="jobs">
          <p className="eyebrow">Open Positions</p>
          {loading ? (
            <div className="empty-proof">
              <p>Loading open roles...</p>
            </div>
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <article key={job.id}>
                <div>
                  <h2>{job.title}</h2>
                  <span>
                    {job.location} · {job.type}
                  </span>
                </div>
                <p>{job.description}</p>
                <Link to="/contact" search={{ service: "" }}>
                  Apply Now <ArrowUpRight />
                </Link>
              </article>
            ))
          ) : (
            <div className="empty-proof">
              <h3>No open roles right now.</h3>
              <p>
                Follow Ceasiun on LinkedIn and social channels to stay updated on future hiring
                announcements.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
