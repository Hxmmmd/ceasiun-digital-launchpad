"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Testimonial } from "@/components/public-content";

const googleLogo = "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google/default.svg";

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const visible = useMemo(() => testimonials.filter((item) => item.is_visible !== false), [testimonials]);

  useEffect(() => {
    setActive((current) => (visible.length ? current % visible.length : 0));
  }, [visible.length]);

  useEffect(() => {
    if (visible.length < 2) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % visible.length), 5000);
    return () => window.clearInterval(timer);
  }, [visible.length]);

  if (!visible.length) return null;
  const current = visible[active];
  const go = (direction: number) => setActive((index) => (index + direction + visible.length) % visible.length);

  return (
    <div className="reviews-panel" aria-roledescription="carousel" aria-label="Google client reviews">
      <div className="reviews-summary">
        <div className="google-mark">
          <img src={googleLogo} alt="Google" className="google-logo" />
          <span>Google reviews</span>
        </div>
        <div className="reviews-score">
          <strong>5.0</strong>
          <div className="star-row" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} fill="currentColor" />)}</div>
          <span>{visible.length} client reviews</span>
        </div>
      </div>
      <div className="review-stage" aria-live="polite">
        <blockquote className="review-card" key={current.id}>
          <div className="review-card-top">
            <span className="review-avatar">{current.attribution.charAt(0).toUpperCase()}</span>
            <div><strong>{current.attribution}</strong><span>{current.company}</span></div>
            <img src={googleLogo} alt="Google review" className="review-google-logo" />
          </div>
          <div className="star-row" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} fill="currentColor" />)}</div>
          <p>“{current.quote}”</p>
          <footer>{current.is_sample ? "Sample review" : "Client review"}</footer>
        </blockquote>
      </div>
      <div className="review-controls">
        <span>{String(active + 1).padStart(2, "0")} <i>/</i> {String(visible.length).padStart(2, "0")}</span>
        <div><button type="button" onClick={() => go(-1)} aria-label="Previous review"><ChevronLeft /></button><button type="button" onClick={() => go(1)} aria-label="Next review"><ChevronRight /></button></div>
      </div>
    </div>
  );
}

export { googleLogo };
