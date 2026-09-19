"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
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
    const timer = window.setInterval(() => setActive((current) => (current + 1) % visible.length), 6000);
    return () => window.clearInterval(timer);
  }, [visible.length]);

  if (!visible.length) return null;
  const go = (direction: number) => setActive((index) => (index + direction + visible.length) % visible.length);
  const slides = Array.from({ length: visible.length + 2 }, (_, index) => visible[index % visible.length]);

  return (
    <div className="reviews-panel" aria-roledescription="carousel" aria-label="Google client reviews">
      <div className="reviews-intro">
        <span className="eyebrow">Our clients&apos; testimonials</span>
        <h3>What our<br />clients say?</h3>
        <div className="reviews-score">
          <strong>5.0</strong>
          <div className="star-row" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} fill="currentColor" />)}</div>
          <span>{visible.length} client reviews</span>
        </div>
        <div className="review-controls">
          <span>{String(active + 1).padStart(2, "0")} <i>/</i> {String(visible.length).padStart(2, "0")}</span>
          <div><button type="button" onClick={() => go(-1)} aria-label="Previous review"><ChevronLeft /></button><button type="button" onClick={() => go(1)} aria-label="Next review"><ChevronRight /></button></div>
        </div>
      </div>
      <div className="reviews-carousel-area">
        <div className="reviews-brand"><img src={googleLogo} alt="Google" className="google-logo" /><span>Google reviews</span></div>
        <div className="review-stage" aria-live="polite">
        <div className="review-track" style={{ "--review-count": visible.length, transform: `translate3d(calc(-${active} * (var(--slide-width) + 1rem)), 0, 0)` } as CSSProperties}>
          {slides.map((review, index) => (
            <blockquote className="review-card" key={`${review.id}-${index}`}>
              <div className="review-card-top">
                <span className="review-avatar">{review.attribution.charAt(0).toUpperCase()}</span>
                <div><strong>{review.attribution}</strong><span>{review.company}</span></div>
                <img src={googleLogo} alt="Google review" className="review-google-logo" />
              </div>
              <div className="star-row" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, starIndex) => <Star key={starIndex} fill="currentColor" />)}</div>
              <p>“{review.quote}”</p>
              <footer>{review.is_sample ? "Sample review" : "Client review"}</footer>
            </blockquote>
          ))}
        </div>
        </div>
        <div className="review-dots" aria-label="Review slides">
          {visible.slice(0, Math.min(6, visible.length)).map((review, index) => (
            <button key={review.id} type="button" className={index === active % Math.min(6, visible.length) ? "active" : ""} onClick={() => setActive(index)} aria-label={`Show review ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export { googleLogo };
