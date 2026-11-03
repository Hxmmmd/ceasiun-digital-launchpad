"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Layout, PageIntro, meta } from "@/components/site";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/lib/blog-posts";

const blogContent = {
  eyebrow: "Insights & Articles",
  title: "Useful thinking for digital operators.",
  copy: "Practical perspectives across the disciplines that shape modern digital growth.",
};

export default function BlogListingPage() {
  const posts = useMemo(
    () =>
      blogPosts
        .filter((post) => post.status === "published")
        .sort((a, b) => new Date(b.published_at ?? 0).getTime() - new Date(a.published_at ?? 0).getTime()),
    [],
  );
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
        eyebrow={blogContent.eyebrow}
        title={blogContent.title}
        copy={blogContent.copy}
      />

      <section className="section shell">
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

export { meta };
