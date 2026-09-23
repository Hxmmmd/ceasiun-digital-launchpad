"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { usePublishedPosts } from "@/components/public-content";
import { Layout, PageIntro, meta } from "@/components/site";
import { Input } from "@/components/ui/input";
import { useCms } from "@/hooks/use-cms";
import { BlogSidebar } from "@/components/blog-sidebar";

export default function BlogListingPage() {
  const { blog } = useCms();
  const posts = usePublishedPosts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(posts.map((post) => post.category).filter(Boolean))];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch = (post.title + " " + post.excerpt)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <Layout>
      <PageIntro
        eyebrow={blog.eyebrow}
        title={blog.title}
        copy={blog.copy}
      />

      <section className="section shell blog-page-layout">
        <BlogSidebar headings={["Search insights", "Browse categories", "Latest articles"]} />
        <div>
        {/* Search & Category Filter Tools */}
        <div className="blog-tools">
          <label>
            <Search />
            <Input
              aria-label="Search articles"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search insights by topic or keyword..."
            />
          </label>

          {categories.length > 1 && (
            <div className="filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={selectedCategory === category ? "selected" : ""}
                  onClick={() => setSelectedCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Post Grid or Empty State */}
        {filteredPosts.length > 0 ? (
          <div className="post-grid">
            {filteredPosts.map((post) => (
              <Link
                 href={`/blog/${post.slug}`}
                key={post.id}
                className="post-card"
              >
                <span>{post.category}</span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <small>
                  By {post.author}
                  {post.published_at && ` - ${new Date(post.published_at).toLocaleDateString()}`}
                </small>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-proof">
            <h3>No published insights yet.</h3>
            <p>The Ceasiun team is currently preparing initial articles and guides.</p>
          </div>
        )}
        </div>
      </section>
    </Layout>
  );
}
