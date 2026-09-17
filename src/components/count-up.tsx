import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function CountUp({ value, suffix = "", duration = 1200 }: CountUpProps) {
  const [current, setCurrent] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;

      const startTime = performance.now();

      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        // Cubic ease-out formula
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCurrent(Math.round(value * easeOut));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
      observer.disconnect();
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={elementRef}>
      {current}
      {suffix}
    </span>
  );
}
