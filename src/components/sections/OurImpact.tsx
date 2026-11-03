"use client";

import React, { useEffect, useRef, useState } from "react";
import "./OurImpact.css";

/**
 * Business Impact Metric Definition
 * Configurable central data model representing client and business outcomes.
 */
export interface ImpactMetric {
  id: string;
  stageCode: string;
  tag: string;
  title: string;
  targetValue: number;
  prefix?: string;
  suffix: string;
  isDecimal?: boolean;
  benchmarkContext: string;
  description: string;
  category: "growth" | "time" | "cost" | "reliability";
}

/**
 * Centralized business impact metrics data object.
 * Calibrated against verified Ceasiun client engagements and case studies.
 */
export const impactMetrics: ImpactMetric[] = [
  {
    id: "metric-revenue",
    stageCode: "// 01",
    tag: "GROWTH",
    title: "Revenue Growth",
    targetValue: 28,
    prefix: "+",
    suffix: "%",
    benchmarkContext: "Average benchmark via conversion & funnel optimization",
    description:
      "Drive business growth through conversion-focused websites, digital marketing, and stronger online visibility.",
    category: "growth",
  },
  {
    id: "metric-time",
    stageCode: "// 02",
    tag: "EFFICIENCY",
    title: "Time Recovered",
    targetValue: 18,
    prefix: "",
    suffix: " hrs/wk",
    benchmarkContext: "Calibrated from CRM & AI workflow automation cases",
    description:
      "Save valuable working hours by automating repetitive tasks and streamlining everyday business workflows.",
    category: "time",
  },
  {
    id: "metric-cost",
    stageCode: "// 03",
    tag: "OPERATIONS",
    title: "Reduced Operating Cost",
    targetValue: 30,
    prefix: "-",
    suffix: "%",
    benchmarkContext: "Achieved through consolidated digital infrastructure",
    description:
      "Reduce unnecessary operational expenses through smarter digital systems, automation, and optimized workflows.",
    category: "cost",
  },
  {
    id: "metric-uptime",
    stageCode: "// 04",
    tag: "RELIABILITY",
    title: "Website Reliability",
    targetValue: 99.9,
    prefix: "",
    suffix: "%",
    isDecimal: true,
    benchmarkContext: "Target SLA standard with 24/7 proactive monitoring",
    description:
      "Keep digital platforms reliable, secure, and accessible through proper development, maintenance, and security practices.",
    category: "reliability",
  },
];

/* -------------------------------------------------------------------------- */
/* Minimal Animated Vector Graphics (Pure, uncluttered CAD curves & surges)   */
/* -------------------------------------------------------------------------- */

/** 1. Revenue Growth Artwork: Upward Trajectory Curve */
function RevenueGrowthArtwork() {
  return (
    <div className="impact-artwork-stage" aria-hidden="true">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="growthAreaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
            <stop offset="60%" stopColor="var(--primary)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="growthLineGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
            <stop offset="70%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        {/* Minimal CAD Gridlines */}
        <g stroke="var(--border)" strokeOpacity="0.4" strokeWidth="0.8">
          <line x1="25" y1="165" x2="185" y2="165" strokeDasharray="3 4" />
          <line x1="25" y1="130" x2="185" y2="130" strokeDasharray="3 4" />
          <line x1="25" y1="95" x2="185" y2="95" strokeDasharray="3 4" />
          <line x1="25" y1="60" x2="185" y2="60" strokeDasharray="3 4" />
          <line x1="65" y1="30" x2="65" y2="175" strokeDasharray="3 4" />
          <line x1="120" y1="30" x2="120" y2="175" strokeDasharray="3 4" />
          <line x1="175" y1="30" x2="175" y2="175" strokeDasharray="3 4" />
        </g>

        {/* Shaded Area Under Curve */}
        <path
          d="M 25 155 Q 85 148, 115 110 T 175 42 L 175 165 L 25 165 Z"
          fill="url(#growthAreaFill)"
        />

        {/* Base Trajectory Line */}
        <path
          d="M 25 155 Q 85 148, 115 110 T 175 42"
          stroke="url(#growthLineGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Animated Laser Surge */}
        <path
          d="M 25 155 Q 85 148, 115 110 T 175 42"
          stroke="#ffffff"
          strokeWidth="2.4"
          strokeLinecap="round"
          className="impact-surge-line"
        />

        {/* Milestone Nodes */}
        <circle cx="65" cy="148" r="3" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.4" className="impact-growth-node" />
        <circle cx="115" cy="110" r="3.5" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.4" className="impact-growth-node impact-growth-node-2" />
        <circle cx="145" cy="74" r="3.8" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.5" className="impact-growth-node impact-growth-node-3" />

        {/* Apex Target Node */}
        <g transform="translate(175, 42)">
          <line x1="-8" y1="0" x2="8" y2="0" stroke="var(--primary)" strokeWidth="0.8" opacity="0.6" />
          <line x1="0" y1="-8" x2="0" y2="8" stroke="var(--primary)" strokeWidth="0.8" opacity="0.6" />
          <circle cx="0" cy="0" r="6" stroke="var(--primary)" strokeWidth="1" opacity="0.4" />
          <circle cx="0" cy="0" r="3.8" fill="#ffffff" className="impact-growth-apex" />
        </g>
      </svg>
    </div>
  );
}

/** 2. Time Recovered Artwork: Minimal Orbital Workflow Loop */
function TimeRecoveredArtwork() {
  return (
    <div className="impact-artwork-stage" aria-hidden="true">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="timeAreaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="timeArcGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
            <stop offset="60%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        {/* Minimal CAD Gridlines */}
        <g stroke="var(--border)" strokeOpacity="0.4" strokeWidth="0.8">
          <line x1="25" y1="165" x2="185" y2="165" strokeDasharray="3 4" />
          <line x1="25" y1="130" x2="185" y2="130" strokeDasharray="3 4" />
          <line x1="25" y1="95" x2="185" y2="95" strokeDasharray="3 4" />
          <line x1="25" y1="60" x2="185" y2="60" strokeDasharray="3 4" />
          <line x1="65" y1="30" x2="65" y2="175" strokeDasharray="3 4" />
          <line x1="120" y1="30" x2="120" y2="175" strokeDasharray="3 4" />
          <line x1="175" y1="30" x2="175" y2="175" strokeDasharray="3 4" />
        </g>

        {/* Outer Circular Track Guide */}
        <circle cx="105" cy="100" r="58" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.5" />

        {/* Soft Radial Center Core */}
        <circle cx="105" cy="100" r="30" fill="url(#timeAreaFill)" opacity="0.7" />
        <circle cx="105" cy="100" r="2.5" fill="var(--primary)" />

        {/* Base 270° Orbital Curve Line */}
        <path
          d="M 105 42 A 58 58 0 1 1 54 126"
          stroke="url(#timeArcGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Animated Laser Surge */}
        <path
          d="M 105 42 A 58 58 0 1 1 54 126"
          stroke="#ffffff"
          strokeWidth="2.4"
          strokeLinecap="round"
          className="impact-surge-line"
        />

        {/* Milestone Orbit Nodes */}
        <circle cx="105" cy="42" r="3" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.4" className="impact-growth-node" />
        <circle cx="163" cy="100" r="3.5" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.4" className="impact-growth-node impact-growth-node-2" />
        <circle cx="105" cy="158" r="3.5" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.4" className="impact-growth-node impact-growth-node-3" />

        {/* Destination Target Node */}
        <g transform="translate(54, 126)">
          <line x1="-7" y1="0" x2="7" y2="0" stroke="var(--primary)" strokeWidth="0.8" opacity="0.6" />
          <line x1="0" y1="-7" x2="0" y2="7" stroke="var(--primary)" strokeWidth="0.8" opacity="0.6" />
          <circle cx="0" cy="0" r="6" stroke="var(--primary)" strokeWidth="1" opacity="0.4" />
          <circle cx="0" cy="0" r="3.8" fill="#ffffff" className="impact-growth-apex" />
        </g>
      </svg>
    </div>
  );
}

/** 3. Reduced Operating Costs Artwork: Simple Downward Trajectory Curve (Direct mirror of Growth) */
function ReducedCostArtwork() {
  return (
    <div className="impact-artwork-stage" aria-hidden="true">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="costAreaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
            <stop offset="60%" stopColor="var(--primary)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="costLineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Minimal CAD Gridlines */}
        <g stroke="var(--border)" strokeOpacity="0.4" strokeWidth="0.8">
          <line x1="25" y1="165" x2="185" y2="165" strokeDasharray="3 4" />
          <line x1="25" y1="130" x2="185" y2="130" strokeDasharray="3 4" />
          <line x1="25" y1="95" x2="185" y2="95" strokeDasharray="3 4" />
          <line x1="25" y1="60" x2="185" y2="60" strokeDasharray="3 4" />
          <line x1="65" y1="30" x2="65" y2="175" strokeDasharray="3 4" />
          <line x1="120" y1="30" x2="120" y2="175" strokeDasharray="3 4" />
          <line x1="175" y1="30" x2="175" y2="175" strokeDasharray="3 4" />
        </g>

        {/* Shaded Area Under Curve */}
        <path
          d="M 25 42 Q 85 50, 115 90 T 175 155 L 175 165 L 25 165 Z"
          fill="url(#costAreaFill)"
        />

        {/* Base Downward Trajectory Line */}
        <path
          d="M 25 42 Q 85 50, 115 90 T 175 155"
          stroke="url(#costLineGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Animated Laser Surge Gliding Downward */}
        <path
          d="M 25 42 Q 85 50, 115 90 T 175 155"
          stroke="#ffffff"
          strokeWidth="2.4"
          strokeLinecap="round"
          className="impact-surge-line"
        />

        {/* Milestone Optimization Nodes */}
        <circle cx="25" cy="42" r="3.8" fill="var(--card)" stroke="#ffffff" strokeWidth="1.5" className="impact-growth-apex" />
        <circle cx="85" cy="62" r="3.5" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.4" className="impact-growth-node" />
        <circle cx="115" cy="90" r="3.5" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.4" className="impact-growth-node impact-growth-node-2" />
        <circle cx="145" cy="128" r="3" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.4" className="impact-growth-node impact-growth-node-3" />

        {/* Target Lean Baseline Node with Coordinate Crosshair */}
        <g transform="translate(175, 155)">
          <line x1="-8" y1="0" x2="8" y2="0" stroke="var(--primary)" strokeWidth="0.8" opacity="0.6" />
          <line x1="0" y1="-8" x2="0" y2="8" stroke="var(--primary)" strokeWidth="0.8" opacity="0.6" />
          <circle cx="0" cy="0" r="6" stroke="var(--primary)" strokeWidth="1" opacity="0.4" />
          <circle cx="0" cy="0" r="3.8" fill="#ffffff" className="impact-growth-apex" />
        </g>
      </svg>
    </div>
  );
}

/** 4. Website Reliability Artwork: Minimal Live Heartbeat Signal */
function WebsiteReliabilityArtwork() {
  return (
    <div className="impact-artwork-stage" aria-hidden="true">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ecgAreaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="ecgLineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
            <stop offset="60%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        {/* Minimal CAD Gridlines */}
        <g stroke="var(--border)" strokeOpacity="0.4" strokeWidth="0.8">
          <line x1="25" y1="165" x2="185" y2="165" strokeDasharray="3 4" />
          <line x1="25" y1="130" x2="185" y2="130" strokeDasharray="3 4" />
          <line x1="25" y1="95" x2="185" y2="95" strokeDasharray="3 4" />
          <line x1="25" y1="60" x2="185" y2="60" strokeDasharray="3 4" />
          <line x1="65" y1="30" x2="65" y2="175" strokeDasharray="3 4" />
          <line x1="120" y1="30" x2="120" y2="175" strokeDasharray="3 4" />
          <line x1="175" y1="30" x2="175" y2="175" strokeDasharray="3 4" />
        </g>

        {/* Shaded Area Under Wave */}
        <path
          d="M 25 100 L 65 100 L 75 75 L 85 125 L 95 45 L 105 155 L 115 80 L 125 100 L 175 100 L 175 165 L 25 165 Z"
          fill="url(#ecgAreaFill)"
        />

        {/* Base Heartbeat Wave Line */}
        <path
          d="M 25 100 L 65 100 L 75 75 L 85 125 L 95 45 L 105 155 L 115 80 L 125 100 L 175 100"
          stroke="url(#ecgLineGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Animated Laser Surge */}
        <path
          d="M 25 100 L 65 100 L 75 75 L 85 125 L 95 45 L 105 155 L 115 80 L 125 100 L 175 100"
          stroke="#ffffff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="impact-surge-line"
        />

        {/* Heartbeat Peak Nodes */}
        <circle cx="65" cy="100" r="3" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.4" className="impact-growth-node" />
        <circle cx="95" cy="45" r="3.5" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.5" className="impact-growth-node impact-growth-node-2" />
        <circle cx="105" cy="155" r="3.5" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.5" className="impact-growth-node impact-growth-node-3" />
        <circle cx="125" cy="100" r="3" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.4" className="impact-growth-node" />

        {/* Live Steady State Node with Coordinate Crosshair */}
        <g transform="translate(175, 100)">
          <line x1="-8" y1="0" x2="8" y2="0" stroke="var(--primary)" strokeWidth="0.8" opacity="0.6" />
          <line x1="0" y1="-8" x2="0" y2="8" stroke="var(--primary)" strokeWidth="0.8" opacity="0.6" />
          <circle cx="0" cy="0" r="6" stroke="var(--primary)" strokeWidth="1" opacity="0.4" />
          <circle cx="0" cy="0" r="3.8" fill="#ffffff" className="impact-growth-apex" />
        </g>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Dynamic Count-Up Hook with prefers-reduced-motion support                  */
/* -------------------------------------------------------------------------- */
function useMetricCountUp(target: number, isDecimal: boolean, isVisible: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    const duration = 1200; // ms
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setValue(target * easeOut);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setValue(target);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [target, isVisible]);

  if (isDecimal) {
    return value.toFixed(1);
  }
  return Math.round(value).toString();
}

/* -------------------------------------------------------------------------- */
/* Individual Impact Metric Card Component                                    */
/* -------------------------------------------------------------------------- */
function ImpactCard({
  metric,
  isInView,
}: {
  metric: ImpactMetric;
  isInView: boolean;
}) {
  const formattedCount = useMetricCountUp(metric.targetValue, !!metric.isDecimal, isInView);

  const renderArtwork = () => {
    switch (metric.category) {
      case "growth":
        return <RevenueGrowthArtwork />;
      case "time":
        return <TimeRecoveredArtwork />;
      case "cost":
        return <ReducedCostArtwork />;
      case "reliability":
        return <WebsiteReliabilityArtwork />;
      default:
        return null;
    }
  };

  return (
    <article
      className="impact-card"
      aria-labelledby={`impact-metric-${metric.id}`}
    >
      {/* Integrated Atmospheric CAD Vector Artwork */}
      {renderArtwork()}

      {/* Crisp Foreground Content Layer */}
      <div className="impact-card-content-layer">
        <div>
          {/* Card Top: Stage Code & Category Tag */}
          <div className="impact-card-header">
            <span className="impact-card-index">
              <span className="impact-card-index-dot" aria-hidden="true" />
              {metric.stageCode}
            </span>
            <span className="impact-card-tag">{metric.tag}</span>
          </div>

          {/* Metric Value Display */}
          <div className="impact-metric-row">
            {metric.prefix && (
              <span style={{height: '100%', justifyContent: 'center', alignSelf: 'center'}} className="impact-metric-prefix" aria-hidden="true">

                {metric.prefix}
              </span>
            )}
            <span className="impact-metric-val" aria-hidden="true">
              {formattedCount}
            </span>
            <span className="impact-metric-suffix" aria-hidden="true">
              {metric.suffix}
            </span>
            <span className="sr-only">
              {metric.prefix || ""}
              {metric.targetValue}
              {metric.suffix}
            </span>
          </div>

          {/* Card Text Content */}
          <div className="impact-card-body">
            <h3 id={`impact-metric-${metric.id}`} className="impact-card-title">
              {metric.title}
            </h3>
            <p className="impact-card-desc">{metric.description}</p>
          </div>
        </div>

        {/* Transparent Benchmark Footnote */}
        {/* <div className="impact-card-footnote">
          {metric.benchmarkContext}
        </div> */}
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Section Export                                                        */
/* -------------------------------------------------------------------------- */
export default function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{marginBottom: "1rem"}} 
      id="impact"
      ref={sectionRef}
      className="impact-section"
      aria-labelledby="impact-section-title"
    >
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}} className="shell">
        {/* Section Header */}
        <header style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "2rem" }} className="impact-header section-intro">
          <p className="eyebrow">Measurable Outcomes</p>
          <h2 style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} id="impact-section-title">
            Digital Work. <br />
            <em>Real Business Impact.</em>
          </h2>
          <p style={{ textAlign: "center"}}>
            We help businesses grow revenue, increase efficiency, and reduce costs with technology-driven solutions.
          </p>
        </header>

        {/* 4 Impact Metric Cards Grid */}
        <div
          className="impact-grid"
          role="region"
          aria-label="Key business outcomes and metrics"
        >
          {impactMetrics.map((metric) => (
            <ImpactCard
              key={metric.id}
              metric={metric}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
