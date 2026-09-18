"use client";
import { useEffect, useState } from "react";
import { CMS_EVENT } from "@/lib/cms";

export type Post = { id: string; slug: string; title: string; excerpt: string; category: string; body: string; author: string; cover_url: string | null; published_at: string | null; tags: string[]; status?: string };
export type Testimonial = { id: string; quote: string; attribution: string; company: string; is_sample: boolean; is_visible?: boolean; sort_order?: number };
export type CaseStudy = { id: string; slug: string; title: string; category: string; summary: string; problem: string; approach: string; result: string; is_visible: boolean };
export type CareerOpening = { id: string; title: string; location: string; type: string; description: string; is_visible: boolean };

function loadLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
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
  useLocalRefresh(() => setPosts(loadLocal<Post[]>("ceasiun_blog_posts", []).filter((p) => p.status === "published").sort((a, b) => new Date(b.published_at ?? 0).getTime() - new Date(a.published_at ?? 0).getTime())));
  return posts;
}

export function usePost(slug: string) {
  const [post, setPost] = useState<Post | null | undefined>(undefined);
  useLocalRefresh(() => setPost(loadLocal<Post[]>("ceasiun_blog_posts", []).find((p) => p.slug === slug && p.status === "published") ?? null), [slug]);
  return post;
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  useLocalRefresh(() => setTestimonials(loadLocal<Testimonial[]>("ceasiun_testimonials", []).filter((t) => t.is_visible !== false).sort((a, b) => (a.sort_order ?? 99) - (b.sort_order ?? 99))));
  return testimonials;
}

export function useCaseStudies() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  useLocalRefresh(() => setCases(loadLocal<CaseStudy[]>("ceasiun_case_studies", []).filter((c) => c.is_visible)));
  return cases;
}

export function useCareerOpenings() {
  const [jobs, setJobs] = useState<CareerOpening[]>([]);
  useLocalRefresh(() => setJobs(loadLocal<CareerOpening[]>("ceasiun_careers", []).filter((c) => c.is_visible)));
  return jobs;
}
