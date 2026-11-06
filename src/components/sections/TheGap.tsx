"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, ChevronRight, ShieldCheck, Search, Sliders, Network, ArrowRight } from "lucide-react";
import "./TheGap.css";

export interface GapData {
  id: string;
  number: string;
  title: string;
  line: string;
  meaning: string;
  consequence: string;
  tags: string[];
  evidence?: string;
}

export const GAPS: GapData[] = [
  {
    id: "visibility",
    number: "01",
    title: "Visibility",
    line: "Customers look for you. They find someone else.",
    meaning:
      "Buyers search, use maps and AI assistants, and read reviews before they call. A business that isn’t surfaced there isn’t considered.",
    consequence: "Demand that exists but never reaches you.",
    tags: ["Website", "Social Media", "Digital Marketing"],
  },
  {
    id: "trust",
    number: "02",
    title: "Trust",
    line: "Your work is credible. Your presence isn’t yet.",
    meaning:
      "People judge quality from the screen first. Dated design, inconsistent branding and thin reviews read as risk.",
    consequence: "Good businesses get passed over for better-presented ones.",
    tags: ["Branding", "Website"],
    evidence: "“97% of consumers read reviews of local businesses. BrightLocal, 2026 (US).”",
  },
  {
    id: "conversion",
    number: "03",
    title: "Conversion",
    line: "Interest that goes nowhere.",
    meaning:
      "Slow pages, unclear next steps and slow replies let interested people drift away.",
    consequence: "You pay to attract attention you can’t turn into customers.",
    tags: ["Website", "AI Automation"],
    evidence: "“Bounce probability rises 32% as page load goes from 1s to 3s. Google, 2017.”",
  },
  {
    id: "operations",
    number: "04",
    title: "Operations",
    line: "Work that depends on people remembering.",
    meaning:
      "Enquiries in chat threads, orders in notebooks, invoices in spreadsheets, with manual hand-offs between them.",
    consequence: "Time and accuracy lost to repetition. Growth adds chaos before it adds revenue.",
    tags: ["AI Automation"],
  },
  {
    id: "foundation",
    number: "05",
    title: "Foundation",
    line: "Growth outpaces the infrastructure.",
    meaning:
      "Hosting, systems, networks and security set up for yesterday’s size.",
    consequence: "Downtime, exposure to attack, and a ceiling on how far you can grow.",
    tags: ["Managed Services", "Cybersecurity"],
    evidence: "“Ransomware featured in 88% of SMB breaches. Verizon DBIR, 2025 edition.”",
  },
];

export function TheGap() {
  const [activeStop, setActiveStop] = useState(0);
  const [expandedMeaning, setExpandedMeaning] = useState<Record<string, boolean>>({});
  const [trustView, setTrustView] = useState<"dated" | "credible">("dated");
  const [opsView, setOpsView] = useState<"manual" | "automated">("manual");
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleMeaning = (id: string) => {
    setExpandedMeaning((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentGap = GAPS[activeStop];

  // Stop positions on the signature chart (viewBox 0 0 760 320)
  const stopCoordinates = [
    { x: 160, y: 242 },
    { x: 280, y: 218 },
    { x: 400, y: 184 },
    { x: 520, y: 146 },
    { x: 640, y: 104 },
  ];

  return (
    <section
      id="the-gap"
      ref={sectionRef}
      className="new-section gap-section"
      aria-labelledby="gap-title"
    >
      <div className="shell gap-shell">
        {/* Section Intro */}
        <div className="gap-header">
          <p className="eyebrow">THE GAP</p>
          <h2 id="gap-title">
            Your business is further ahead than your <em>digital presence.</em>
          </h2>
          <p className="gap-intro">
            Most online growth problems aren’t about effort. They’re gaps between
            a good business and the systems that should carry it to customers.
            Here’s where they usually open up.
          </p>
        </div>

        {/* Signature Hero Graphic: Potential vs Present Curve */}
        <div className="gap-signature-card" aria-label="Potential versus present digital delivery chart">
          <div className="gap-signature-topbar">
            <div className="gap-signature-legend">
              <span className="legend-item potential">
                <span className="legend-line dashed" /> Business potential
              </span>
              <span className="legend-item present">
                <span className="legend-line solid" /> What your digital presence delivers today
              </span>
            </div>
            <span className="gap-illustrative-tag">ILLUSTRATIVE • NO NUMERICAL SCALE</span>
          </div>

          <div className="gap-svg-wrapper">
            <svg
              viewBox="0 0 760 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="gap-potential-chart"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="gapWedgeFill" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.04" />
                  <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.22" />
                </linearGradient>
                <pattern id="gapGridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
                </pattern>
              </defs>

              {/* Background Grid */}
              <rect x="70" y="40" width="630" height="230" fill="url(#gapGridPattern)" />

              {/* Qualitative Axis Lines */}
              <path d="M 70 270 L 710 270" stroke="rgba(255, 255, 255, 0.16)" strokeWidth="1.5" />
              <path d="M 70 270 L 70 30" stroke="rgba(255, 255, 255, 0.16)" strokeWidth="1.5" />

              {/* Axis Qualitative Labels */}
              <text x="690" y="292" fill="var(--muted-foreground)" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em" textAnchor="end">
                TIME →
              </text>
              <text x="32" y="45" fill="var(--muted-foreground)" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em" transform="rotate(-90 32 45)" textAnchor="end">
                BUSINESS GROWTH ↑
              </text>

              {/* Wedge Area: Unrealised potential */}
              <path
                d="M 80 260 C 220 240 430 140 680 50 L 680 215 C 440 235 240 255 80 260 Z"
                fill="url(#gapWedgeFill)"
                className="gap-wedge-path"
              />

              {/* Wedge Text Annotation */}
              <text
                x="450"
                y="155"
                fill="var(--primary)"
                fontSize="11"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                letterSpacing="0.16em"
                opacity="0.85"
                textAnchor="middle"
              >
                UNREALISED POTENTIAL
              </text>

              {/* Dashed White Curve: Business potential rising */}
              <path
                d="M 80 260 C 220 240 430 140 680 50"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                strokeLinecap="round"
                className="gap-curve-potential"
              />

              {/* Solid Cyan Curve: Digital delivery rising slowly */}
              <path
                d="M 80 260 C 240 255 440 235 680 215"
                stroke="var(--primary)"
                strokeWidth="2.75"
                strokeLinecap="round"
                className="gap-curve-present"
              />

              {/* 5 Labelled Stop Guideline Connectors & Markers */}
              {stopCoordinates.map((coord, idx) => {
                const isActive = activeStop === idx;
                const isPassed = activeStop >= idx;
                const gap = GAPS[idx];
                return (
                  <g
                    key={gap.id}
                    className={`gap-chart-node ${isActive ? "is-active" : ""} ${isPassed ? "is-passed" : ""}`}
                    onClick={() => setActiveStop(idx)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Jump to Gap ${gap.number}: ${gap.title}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveStop(idx);
                      }
                    }}
                  >
                    {/* Vertical connecting hairline */}
                    <line
                      x1={coord.x}
                      y1={coord.y - 18}
                      x2={coord.x}
                      y2={coord.y + 18}
                      stroke={isActive ? "var(--primary)" : "rgba(255, 255, 255, 0.2)"}
                      strokeWidth={isActive ? "1.5" : "1"}
                      strokeDasharray="3 3"
                    />

                    {/* Outer glow ring when active */}
                    {isActive && (
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r="14"
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="1.5"
                        opacity="0.65"
                        className="gap-pulse-ring"
                      />
                    )}

                    {/* Central marker node */}
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r={isActive ? "7" : "5"}
                      fill={isActive ? "var(--primary)" : isPassed ? "#ffffff" : "var(--card)"}
                      stroke={isActive ? "#ffffff" : "rgba(255, 255, 255, 0.5)"}
                      strokeWidth="2"
                    />

                    {/* Micro Stop Badge */}
                    <text
                      x={coord.x}
                      y={coord.y - 24}
                      fill={isActive ? "var(--primary)" : "var(--muted-foreground)"}
                      fontSize="10"
                      fontFamily="var(--font-mono)"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      {gap.number} {gap.title}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive Stop Quick-Selector Pills */}
          <div className="gap-stop-selector" role="tablist" aria-label="Five structural gaps">
            {GAPS.map((gap, index) => {
              const isSelected = activeStop === index;
              return (
                <button
                  key={gap.id}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`gap-panel-${gap.id}`}
                  className={`gap-stop-pill ${isSelected ? "is-active" : ""}`}
                  onClick={() => setActiveStop(index)}
                >
                  <span className="stop-pill-num">{gap.number}</span>
                  <span className="stop-pill-title">{gap.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Stage: Companion Visual + Gap Detail Panel */}
        <div
          id={`gap-panel-${currentGap.id}`}
          className="gap-active-stage"
          role="tabpanel"
          aria-label={`Details for gap ${currentGap.number}: ${currentGap.title}`}
        >
          {/* Left Companion Graphic: Custom Minimal SVG/HTML Architecture */}
          <div className="gap-companion-stage" aria-label={`Visual simulation for ${currentGap.title}`}>
            <div className="companion-stage-header">
              <span className="companion-badge">
                <span className="companion-badge-dot" /> STOP {currentGap.number} // {currentGap.title.toUpperCase()}
              </span>
              <span className="companion-type-tag">COMPANION WIREFRAME</span>
            </div>

            <div className="companion-visual-display">
              {/* Graphic 1: Visibility */}
              {activeStop === 0 && (
                <div className="companion-art-visibility">
                  <div className="abstract-search-bar">
                    <Search size={14} className="search-icon" aria-hidden="true" />
                    <span className="search-query">“high quality service providers near me”</span>
                  </div>

                  <div className="search-results-stack">
                    <div className="search-result-item competitor-item">
                      <div className="result-rank-col">
                        <span className="rank-badge rank-1">#1</span>
                      </div>
                      <div className="result-details">
                        <div className="result-bar-title wide" />
                        <div className="result-meta-row">
                          <span className="result-chip">4.9 ★ (120+ reviews)</span>
                          <span className="result-chip cyan">Indexed in AI & Maps</span>
                        </div>
                      </div>
                    </div>

                    <div className="search-result-item client-empty-item">
                      <div className="result-rank-col">
                        <span className="rank-badge empty-rank">?</span>
                      </div>
                      <div className="result-details">
                        <div className="result-client-void">
                          <span className="void-cross">✕</span>
                          <span>Your business should be here — invisible to active demand</span>
                        </div>
                        <div className="result-bar-skeleton short" />
                      </div>
                    </div>

                    <div className="search-result-item dimmed-item">
                      <div className="result-rank-col">
                        <span className="rank-badge dim">#2</span>
                      </div>
                      <div className="result-details">
                        <div className="result-bar-title med" />
                        <div className="result-bar-skeleton med" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Graphic 2: Trust */}
              {activeStop === 1 && (
                <div className="companion-art-trust">
                  <div className="trust-view-toggle-bar">
                    <button
                      type="button"
                      className={`trust-tab-btn ${trustView === "dated" ? "is-active" : ""}`}
                      onClick={() => setTrustView("dated")}
                    >
                      Dated / Fragmented
                    </button>
                    <button
                      type="button"
                      className={`trust-tab-btn ${trustView === "credible" ? "is-active" : ""}`}
                      onClick={() => setTrustView("credible")}
                    >
                      Clean / Credible (Ceasiun)
                    </button>
                  </div>

                  <div className={`trust-card-wireframe state-${trustView}`}>
                    {trustView === "dated" ? (
                      <div className="dated-profile-box">
                        <div className="dated-header">
                          <div className="dated-broken-avatar" />
                          <div className="dated-lines">
                            <span className="dated-bad-title">Unregistered Digital Domain</span>
                            <span className="dated-sub">Inconsistent logos • No verified badges</span>
                          </div>
                        </div>
                        <div className="dated-warning-box">
                          <span className="alert-badge">PERCEIVED RISK</span>
                          <p>Thin reviews and outdated UI make high-quality businesses look uncertain.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="credible-profile-box">
                        <div className="credible-header">
                          <div className="credible-avatar">
                            <ShieldCheck size={20} className="shield-icon" aria-hidden="true" />
                          </div>
                          <div className="credible-info">
                            <div className="credible-name">
                              Verified Business Authority <span className="verified-pill">ACTIVE</span>
                            </div>
                            <span className="credible-sub">Cohesive identity • Modern typography • Verified client proof</span>
                          </div>
                        </div>
                        <div className="credible-proof-bar">
                          <span className="proof-indicator">HIGH CONFIDENCE SCORE</span>
                          <span className="proof-status">Eliminates screening hesitation</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Graphic 3: Conversion */}
              {activeStop === 2 && (
                <div className="companion-art-conversion">
                  <div className="funnel-container">
                    <div className="funnel-tier tier-1">
                      <div className="funnel-bar">
                        <span className="tier-name">1. Inbound Visitors & Ad Traffic</span>
                      </div>
                    </div>
                    <div className="funnel-leak-callout">
                      <span className="leak-arrow">↳</span>
                      <span className="leak-text">Drop-off: 3s+ load latency & confusing layout</span>
                    </div>

                    <div className="funnel-tier tier-2">
                      <div className="funnel-bar">
                        <span className="tier-name">2. Engaged Page Readers</span>
                      </div>
                    </div>
                    <div className="funnel-leak-callout">
                      <span className="leak-arrow">↳</span>
                      <span className="leak-text">Drop-off: Unclear next step & slow reply form</span>
                    </div>

                    <div className="funnel-tier tier-3">
                      <div className="funnel-bar active-tier">
                        <span className="tier-name">3. Qualified Inquiries & Customers</span>
                      </div>
                    </div>
                  </div>
                  <span className="conversion-sub-tag">ILLUSTRATIVE FUNNEL LEAK MODEL</span>
                </div>
              )}

              {/* Graphic 4: Operations */}
              {activeStop === 3 && (
                <div className="companion-art-operations">
                  <div className="ops-view-toggle-bar">
                    <button
                      type="button"
                      className={`ops-tab-btn ${opsView === "manual" ? "is-active" : ""}`}
                      onClick={() => setOpsView("manual")}
                    >
                      Fragmented Memory
                    </button>
                    <button
                      type="button"
                      className={`ops-tab-btn ${opsView === "automated" ? "is-active" : ""}`}
                      onClick={() => setOpsView("automated")}
                    >
                      Connected Pipeline
                    </button>
                  </div>

                  {opsView === "manual" ? (
                    <div className="ops-scatter-grid">
                      <div className="ops-node node-chat">
                        <span className="node-icon">💬</span>
                        <span className="node-lbl">Chat Threads</span>
                        <span className="node-alert">Forgotten leads</span>
                      </div>
                      <div className="ops-dashed-arrow arrow-1">⇢</div>
                      <div className="ops-node node-notes">
                        <span className="node-icon">📓</span>
                        <span className="node-lbl">Notebooks</span>
                        <span className="node-alert">Manual entry</span>
                      </div>
                      <div className="ops-dashed-arrow arrow-2">⇢</div>
                      <div className="ops-node node-sheets">
                        <span className="node-icon">📊</span>
                        <span className="node-lbl">Spreadsheets</span>
                        <span className="node-alert">Duplicate work</span>
                      </div>
                    </div>
                  ) : (
                    <div className="ops-pipeline-flow">
                      <div className="pipe-step">
                        <span className="pipe-dot" />
                        <span className="pipe-title">Single Intake</span>
                      </div>
                      <div className="pipe-cable"><span className="cable-pulse" /></div>
                      <div className="pipe-step">
                        <span className="pipe-dot" />
                        <span className="pipe-title">Automated CRM</span>
                      </div>
                      <div className="pipe-cable"><span className="cable-pulse delay" /></div>
                      <div className="pipe-step active-pipe">
                        <span className="pipe-dot" />
                        <span className="pipe-title">Instant Dispatch</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Graphic 5: Foundation */}
              {activeStop === 4 && (
                <div className="companion-art-foundation">
                  <div className="foundation-chart-stage">
                    <svg viewBox="0 0 380 180" fill="none" className="foundation-svg" aria-hidden="true">
                      {/* Gridlines */}
                      <line x1="20" y1="150" x2="360" y2="150" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                      <line x1="20" y1="80" x2="360" y2="80" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                      {/* Capacity Ceiling Line */}
                      <line x1="20" y1="65" x2="360" y2="65" stroke="oklch(0.65 0.22 25)" strokeWidth="2" strokeDasharray="5 4" />
                      <text x="355" y="55" fill="oklch(0.7 0.2 25)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em" textAnchor="end">
                        CURRENT INFRASTRUCTURE CEILING
                      </text>

                      {/* Growth Curve Flattening / Breaking at Ceiling */}
                      <path
                        d="M 30 145 C 100 135 180 110 240 68 L 350 68"
                        stroke="var(--primary)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Bottleneck Marker */}
                      <circle cx="240" cy="68" r="6" fill="oklch(0.65 0.22 25)" stroke="#ffffff" strokeWidth="2" />
                      <text x="240" y="94" fill="oklch(0.8 0.15 25)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">
                        COLLISION / CEILING
                      </text>
                    </svg>
                  </div>
                  <div className="foundation-warning-footnote">
                    Exposure to downtime, breach vulnerabilities, and scaling bottlenecks.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Gap Details Card */}
          <div className="gap-detail-card">
            <div className="gap-detail-meta">
              <span className="gap-card-number">{currentGap.number} // 05</span>
              <span className="gap-card-status">ACTIVE GAP</span>
            </div>

            <h3 className="gap-card-title">{currentGap.title}</h3>
            <p className="gap-card-line">{currentGap.line}</p>

            <div className="gap-card-consequence-box">
              <span className="consequence-label">THE BUSINESS CONSEQUENCE</span>
              <p className="consequence-text">{currentGap.consequence}</p>
            </div>

            {/* Expandable "Meaning" Drawer */}
            <div className="gap-meaning-section">
              <button
                type="button"
                className="gap-meaning-toggle"
                aria-expanded={expandedMeaning[currentGap.id] || false}
                onClick={() => toggleMeaning(currentGap.id)}
              >
                <span>Why this gap opens up</span>
                <ChevronDown
                  size={16}
                  className={`toggle-chevron ${expandedMeaning[currentGap.id] ? "is-expanded" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {expandedMeaning[currentGap.id] && (
                <div className="gap-meaning-drawer">
                  <p>{currentGap.meaning}</p>
                </div>
              )}
            </div>

            {/* Evidence Citation */}
            {currentGap.evidence && (
              <div className="gap-evidence-caption">
                <span className="evidence-cite">{currentGap.evidence}</span>
              </div>
            )}

            {/* Ceasiun's Part Service Tags */}
            <div className="gap-services-attribution">
              <span className="attribution-label">CEASIUN’S PART:</span>
              <div className="attribution-tags">
                {currentGap.tags.map((tag) => (
                  <span key={tag} className="gap-service-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Next / Previous Quick Buttons */}
            <div className="gap-step-nav">
              <button
                type="button"
                className="gap-step-btn prev"
                disabled={activeStop === 0}
                onClick={() => setActiveStop((prev) => Math.max(0, prev - 1))}
                aria-label="Previous gap"
              >
                ← Prev Gap
              </button>
              <button
                type="button"
                className="gap-step-btn next"
                disabled={activeStop === GAPS.length - 1}
                onClick={() => setActiveStop((prev) => Math.min(GAPS.length - 1, prev + 1))}
                aria-label="Next gap"
              >
                Next Gap →
              </button>
            </div>
          </div>
        </div>

        {/* Final State Banner: Closing Statement & CTA */}
        <div className="gap-closing-band">
          <div className="gap-closing-copy">
            <div className="all-stops-indicator">
              <span className="stops-dot complete" />
              <span>FIVE STRUCTURAL GAPS MAPPED</span>
            </div>
            <p className="closing-statement">
              Not every business has every gap. Ceasiun starts by finding which
              ones are yours, then closes those and nothing more.
            </p>
          </div>
          <div className="gap-closing-action">
            <Link className="button button-primary gap-cta-button" href="/contact">
              Find your gaps <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TheGap;

