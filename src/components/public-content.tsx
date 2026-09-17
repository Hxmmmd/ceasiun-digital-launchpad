import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  body: string;
  author: string;
  cover_url: string | null;
  published_at: string | null;
  tags: string[];
  status?: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  attribution: string;
  company: string;
  is_sample: boolean;
  is_visible?: boolean;
  sort_order?: number;
};

export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  approach: string;
  result: string;
  is_visible: boolean;
};

export type CareerOpening = {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  is_visible: boolean;
};

function loadLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

/** Returns published blog posts — reads from localStorage (admin-managed) with Supabase fallback */
export function usePublishedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Check if admin has managed posts locally
    const localPosts = loadLocal<Post[]>("ceasiun_blog_posts", []);
    if (localPosts.length > 0) {
      const published = localPosts
        .filter((p) => p.status === "published")
        .sort((a, b) => new Date(b.published_at ?? 0).getTime() - new Date(a.published_at ?? 0).getTime());
      setPosts(published);
      return;
    }

    // Fallback to Supabase
    supabase
      .from("blog_posts")
      .select("id,slug,title,excerpt,category,body,author,cover_url,published_at,tags,status")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .then(({ data }) => setPosts(data ?? []));
  }, []);

  return posts;
}

/** Returns a single post by slug */
export function usePost(slug: string) {
  const [post, setPost] = useState<Post | null | undefined>(undefined);

  useEffect(() => {
    const localPosts = loadLocal<Post[]>("ceasiun_blog_posts", []);
    if (localPosts.length > 0) {
      const found = localPosts.find((p) => p.slug === slug && p.status === "published");
      setPost(found ?? null);
      return;
    }

    supabase
      .from("blog_posts")
      .select("id,slug,title,excerpt,category,body,author,cover_url,published_at,tags")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle()
      .then(({ data }) => setPost(data));
  }, [slug]);

  return post;
}

/** Returns visible testimonials */
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const local = loadLocal<Testimonial[]>("ceasiun_testimonials", []);
    if (local.length > 0) {
      const visible = local
        .filter((t) => t.is_visible !== false)
        .sort((a, b) => (a.sort_order ?? 99) - (b.sort_order ?? 99));
      setTestimonials(visible);
      return;
    }

    supabase
      .from("testimonials")
      .select("id,quote,attribution,company,is_sample,is_visible,sort_order")
      .eq("is_visible", true)
      .order("sort_order")
      .then(({ data }) => setTestimonials(data ?? []));
  }, []);

  return testimonials;
}

/** Returns visible case studies */
export function useCaseStudies() {
  const [cases, setCases] = useState<CaseStudy[]>([]);

  useEffect(() => {
    const local = loadLocal<CaseStudy[]>("ceasiun_case_studies", []);
    if (local.length > 0) {
      setCases(local.filter((c) => c.is_visible));
      return;
    }

    // Supabase fallback — cast as any since table schema may differ
    supabase
      .from("case_studies")
      .select("*")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(({ data }) => setCases((data as any[] ?? []).filter((c: any) => c.is_visible !== false) as CaseStudy[]));
  }, []);

  return cases;
}

/** Returns visible career openings */
export function useCareerOpenings() {
  const [jobs, setJobs] = useState<CareerOpening[]>([]);

  useEffect(() => {
    const local = loadLocal<CareerOpening[]>("ceasiun_careers", []);
    if (local.length > 0) {
      setJobs(local.filter((c) => c.is_visible));
      return;
    }

    supabase
      .from("career_openings")
      .select("*")
      .eq("is_visible", true)
      .then(({ data }) => setJobs(data ?? []));
  }, []);

  return jobs;
}
