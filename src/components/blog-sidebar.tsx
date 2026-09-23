"use client";

import { useState } from "react";
import Link from "next/link";

export function BlogSidebar({ headings }: { headings: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className={`blog-sidebar${isOpen ? " is-open" : ""}`} aria-label="On this page">
      <button className="blog-sidebar-toggle" type="button" aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>
        <span><span className="eyebrow">On this page</span><span className="blog-sidebar-count">{headings.length} sections</span></span>
        <span className="blog-sidebar-chevron" aria-hidden="true">↘</span>
      </button>
      <div className="blog-sidebar-content">
      <div className="blog-sidebar-list">
        {headings.map((heading, index) => (
          <a href={`#section-${index + 1}`} key={heading}>
            <strong>{String(index + 1).padStart(2, "0")}</strong>
            <span>{heading}</span>
          </a>
        ))}
      </div>
      <Link className="sidebar-back" href="/blog">All insights</Link>
      </div>
    </aside>
  );
}
