import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CMS_EVENT } from "@/lib/cms";

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

function useLocalRefresh(onRefresh: () => void, deps: unknown[] = []) {
  useEffect(() => {
    onRefresh();
    window.addEventListener(CMS_EVENT, onRefresh);
    window.addEventListener("storage", onRefresh);
    return () => {
      window.removeEventListener(CMS_EVENT, onRefresh);
      window.removeEventListener("storage", onRefresh);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function usePublishedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useLocalRefresh(() => {
    const localPosts = loadLocal<Post[]>("ceasiun_blog_posts", []);
    if (localPosts.length > 0) {
      setPosts(
        localPosts
          .filter((p) => p.status === "published")
          .sort((a, b) => new Date(b.published_at ?? 0).getTime() - new Date(a.published_at ?? 0).getTime()),
      );
      return;
    }
    supabase
      .from("blog_posts")
      .select("id,slug,title,excerpt,category,body,author,cover_url,published_at,tags,status")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .then(({ data }) => setPosts(data ?? []));
  });

  return posts;
}

export function usePost(slug: string) {
  const [post, setPost] = useState<Post | null | undefined>(undefined);

  useLocalRefresh(() => {
    const localPosts = loadLocal<Post[]>("ceasiun_blog_posts", []);
    if (localPosts.length > 0) {
      setPost(localPosts.find((p) => p.slug === slug && p.status === "published") ?? null);
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

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useLocalRefresh(() => {
    const local = loadLocal<Testimonial[]>("ceasiun_testimonials", []);
    if (local.length > 0) {
      setTestimonials(
        local.filter((t) => t.is_visible !== false).sort((a, b) => (a.sort_order ?? 99) - (b.sort_order ?? 99)),
      );
      return;
    }
    supabase
      .from("testimonials")
      .select("id,quote,attribution,company,is_sample,is_visible,sort_order")
      .eq("is_visible", true)
      .order("sort_order")
      .then(({ data }) => setTestimonials(data ?? []));
  });

  return testimonials;
}

export function useCaseStudies() {
  const [cases, setCases] = useState<CaseStudy[]>([]);

  useLocalRefresh(() => {
    const local = loadLocal<CaseStudy[]>("ceasiun_case_studies", []);
    if (local.length > 0) {
      setCases(local.filter((c) => c.is_visible));
      return;
    }
    supabase
      .from("case_studies")
      .select("*")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(({ data }) =>
        setCases(((data as any[] | null) ?? []).filter((c: any) => c.is_visible !== false) as CaseStudy[]),
      );
  });

  return cases;
}

export function useCareerOpenings() {
  const [jobs, setJobs] = useState<CareerOpening[]>([]);

  useLocalRefresh(() => {
    const local = loadLocal<CareerOpening[]>("ceasiun_careers", []);
    if (local.length > 0) {
      setJobs(local.filter((c) => c.is_visible));
      return;
    }
    supabase.from("career_openings").select("*").eq("is_visible", true).then(({ data }) => setJobs(data ?? []));
  });

  return jobs;
}
