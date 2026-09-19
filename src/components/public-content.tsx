"use client";
import { useEffect, useState } from "react";
import { CMS_EVENT } from "@/lib/cms";

export type Post = { id: string; slug: string; title: string; excerpt: string; category: string; body: string; author: string; cover_url: string | null; published_at: string | null; tags: string[]; status?: string };
export type Testimonial = { id: string; quote: string; attribution: string; company: string; is_sample: boolean; is_visible?: boolean; sort_order?: number };
export type CaseStudy = { id: string; slug: string; title: string; category: string; summary: string; problem: string; approach: string; result: string; is_visible: boolean };
export type CareerOpening = { id: string; title: string; location: string; type: string; description: string; is_visible: boolean };

const defaultTestimonials: Testimonial[] = [
  ["Ceasiun delivered a complete website overhaul in just 3 weeks. The result was beyond what we expected — clean, fast, and exactly on-brand.", "CEO, Pakistani SaaS Startup"],
  ["Their AI automation work saved our team over 20 hours per week. The WhatsApp bot alone handles 80% of our customer queries.", "Operations Director, E-commerce Brand"],
  ["A polished digital experience that finally feels as ambitious as our company.", "Founder, Growth Company"],
  ["Clear communication, sharp execution, and a launch that exceeded our goals.", "Marketing Lead, SaaS Brand"],
  ["The team turned a complicated brief into a simple, high-performing product.", "Director, Technology Group"],
  ["We saw stronger engagement within the first month after launch.", "Brand Manager, Retail Company"],
  ["Their strategic thinking made every design and development decision count.", "Founder, Consumer Startup"],
  ["Fast, thoughtful, and genuinely invested in the outcome of our project.", "COO, Services Business"],
  ["The new platform made our internal workflow dramatically easier.", "Operations Lead, Logistics Brand"],
  ["A rare partner that brings both creative taste and technical depth.", "CEO, Digital Product"],
  ["The attention to detail across mobile and desktop was exceptional.", "Product Manager, Finance Brand"],
  ["Our website now communicates our value clearly and converts better.", "Founder, Consulting Firm"],
  ["Every milestone landed on time, with no surprises and excellent support.", "Director, Education Platform"],
  ["They helped us move from idea to a credible, scalable launch.", "Founder, Startup Studio"],
  ["The final result is clean, memorable, and much easier for customers to use.", "Head of Growth, Commerce Brand"],
  ["A dependable team with the confidence to challenge weak ideas.", "Partner, Professional Services"],
].map(([quote, attribution], index) => ({ id: `default-test-${index + 1}`, quote, attribution, company: "Confidential Client", is_sample: true, is_visible: true, sort_order: index + 1 }));

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
  useLocalRefresh(() => setTestimonials(loadLocal<Testimonial[]>("ceasiun_testimonials", defaultTestimonials).filter((t) => t.is_visible !== false).sort((a, b) => (a.sort_order ?? 99) - (b.sort_order ?? 99))));
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
