import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Layout, meta } from "@/components/site";
import { usePost } from "@/components/public-content";

export const Route = createFileRoute("/blog/$slug")({
  head: () => meta("Insight Article", "Read the latest practical insight from Ceasiun."),
  component: BlogPostPage,
});

function RenderProseContent({ body }: { body: string }) {
  if (!body) return null;

  const lines = body.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = (keyPrefix: number) => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${keyPrefix}`} style={{ paddingLeft: "1.5rem", margin: "1rem 0" }}>
          {currentList.map((item, i) => (
            <li key={i} style={{ margin: "0.4rem 0" }}>
              {item}
            </li>
          ))}
        </ul>,
      );
      currentList = [];
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      currentList.push(trimmed.slice(2));
      return;
    }

    flushList(idx);

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={idx} style={{ fontSize: "1.4rem", margin: "2rem 0 1rem" }}>
          {trimmed.slice(4)}
        </h3>,
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={idx} style={{ fontSize: "1.8rem", margin: "2.5rem 0 1rem" }}>
          {trimmed.slice(3)}
        </h2>,
      );
    } else if (trimmed.startsWith("> ")) {
      elements.push(
        <blockquote
          key={idx}
          style={{
            borderLeft: "3px solid var(--primary)",
            paddingLeft: "1rem",
            margin: "1.5rem 0",
            fontStyle: "italic",
          }}
        >
          {trimmed.slice(2)}
        </blockquote>,
      );
    } else if (trimmed.length > 0) {
      elements.push(
        <p key={idx} style={{ margin: "1.2rem 0", lineHeight: "1.8" }}>
          {trimmed}
        </p>,
      );
    }
  });

  flushList(lines.length);

  return <div className="prose">{elements}</div>;
}

function BlogPostPage() {
  const { slug } = Route.useParams();
  const post = usePost(slug);


  if (post === undefined) {
    return <div className="loading">Loading article...</div>;
  }

  if (!post) {
    return (
      <Layout>
        <div className="section shell" style={{ paddingTop: "10rem" }}>
          <h1>Insight Article Not Found</h1>
          <p style={{ margin: "1.5rem 0" }}>
            The article you are looking for does not exist or has been removed.
          </p>
          <Link to="/blog">Return to Insights</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="article shell">
        <Link to="/blog">
          <ArrowLeft /> All Insights
        </Link>
        <p className="eyebrow">{post.category}</p>
        <h1>{post.title}</h1>
        <p className="lede">{post.excerpt}</p>

        <div className="byline">
          By {post.author}
          {post.published_at &&
            ` · ${new Date(post.published_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}`}
        </div>

        {post.cover_url && (
          <img
            src={post.cover_url}
            alt={post.title}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        )}

        <RenderProseContent body={post.body} />
      </article>
    </Layout>
  );
}
