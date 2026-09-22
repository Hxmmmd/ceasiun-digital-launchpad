import Link from "next/link";

export function BlogSidebar({ headings }: { headings: string[] }) {
  return (
    <aside className="blog-sidebar" aria-label="On this page">
      <p className="eyebrow">On this page <span aria-hidden="true">↘</span></p>
      <div className="blog-sidebar-list">
        {headings.map((heading, index) => (
          <a href={`#section-${index + 1}`} key={heading}>
            <strong>{String(index + 1).padStart(2, "0")}</strong>
            <span>{heading}</span>
          </a>
        ))}
      </div>
      <Link className="sidebar-back" href="/blog">All insights</Link>
    </aside>
  );
}
