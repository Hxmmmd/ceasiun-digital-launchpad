import React from "react";

export function ServiceArtwork({ slug }: { slug: string }) {
  return (
    <div
      className={`service-card-artwork service-card-artwork-${slug}`}
      aria-hidden="true"
    >
      {slug === "web-development" && <WebDevelopmentVisual />}
      {(slug === "marketing" || slug === "digital-marketing") && (
        <DigitalMarketingVisual />
      )}
      {(slug === "design" || slug === "graphic-designing") && (
        <GraphicDesigningVisual />
      )}
      {(slug === "social" || slug === "social-media-management") && (
        <SocialMediaVisual />
      )}
      {(slug === "branding" || slug === "brand-identity") && (
        <BrandIdentityVisual />
      )}
      {(slug === "automation" || slug === "ai-automation") && (
        <AiAutomationVisual />
      )}
      {(slug === "security" || slug === "cyber-security") && (
        <CyberSecurityVisual />
      )}
      {(slug === "management" || slug === "website-maintenance") && (
        <WebsiteMaintenanceVisual />
      )}
      {(slug === "managed" || slug === "managed-services") && (
        <ManagedServicesVisual />
      )}
    </div>
  );
}

/**
 * 1. Web Development
 * Concept: Atmospheric pixelated code environment, wireframe browser blueprint,
 * stepped brackets, circuit bus lines, and terminal pixel matrix.
 */
function WebDevelopmentVisual() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="service-artwork-svg"
    >
      {/* Background CAD Crosshairs & Grid */}
      <g
        className="art-grid"
        stroke="currentColor"
        strokeOpacity="0.1"
        strokeWidth="0.8"
      >
        <line x1="20" y1="100" x2="180" y2="100" strokeDasharray="3 4" />
        <line x1="100" y1="20" x2="100" y2="180" strokeDasharray="3 4" />
        <path
          d="M 96 96 L 96 104 M 96 100 L 104 100"
          stroke="var(--primary)"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        <path
          d="M 156 36 L 156 44 M 152 40 L 160 40"
          stroke="var(--primary)"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
      </g>

      {/* Wireframe Browser Shell (Technical Blueprint) */}
      <g
        className="web-blueprint"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="1"
      >
        <rect x="40" y="35" width="135" height="135" rx="4" />
        <line x1="40" y1="55" x2="175" y2="55" />
        <circle
          cx="52"
          cy="45"
          r="2.5"
          fill="var(--primary)"
          fillOpacity="0.6"
          stroke="none"
        />
        <circle
          cx="60"
          cy="45"
          r="2.5"
          fill="currentColor"
          fillOpacity="0.25"
          stroke="none"
        />
        <circle
          cx="68"
          cy="45"
          r="2.5"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="none"
        />
        <rect
          x="80"
          y="42"
          width="60"
          height="6"
          rx="2"
          stroke="var(--primary)"
          strokeOpacity="0.2"
          fill="none"
        />
      </g>

      {/* Stepped Pixel Code Brackets < / > */}
      <g className="web-brackets">
        {/* Left Bracket < */}
        <g className="web-bracket-left">
          <rect
            x="76"
            y="74"
            width="6"
            height="5"
            fill="var(--primary)"
            fillOpacity="0.6"
          />
          <rect
            x="70"
            y="79"
            width="6"
            height="5"
            fill="var(--primary)"
            fillOpacity="0.75"
          />
          <rect
            x="64"
            y="84"
            width="6"
            height="5"
            fill="var(--primary)"
            fillOpacity="0.9"
          />
          <rect
            x="58"
            y="89"
            width="6"
            height="7"
            fill="var(--primary)"
            className="web-bracket-apex"
          />
          <rect
            x="64"
            y="96"
            width="6"
            height="5"
            fill="var(--primary)"
            fillOpacity="0.9"
          />
          <rect
            x="70"
            y="101"
            width="6"
            height="5"
            fill="var(--primary)"
            fillOpacity="0.75"
          />
          <rect
            x="76"
            y="106"
            width="6"
            height="5"
            fill="var(--primary)"
            fillOpacity="0.6"
          />
        </g>

        {/* Central Slash / */}
        <g className="web-slash">
          <rect
            x="108"
            y="72"
            width="5"
            height="7"
            fill="currentColor"
            fillOpacity="0.4"
          />
          <rect
            x="103"
            y="79"
            width="5"
            height="7"
            fill="currentColor"
            fillOpacity="0.5"
          />
          <rect
            x="98"
            y="86"
            width="5"
            height="7"
            fill="var(--primary)"
            fillOpacity="0.8"
          />
          <rect
            x="93"
            y="93"
            width="5"
            height="7"
            fill="var(--primary)"
            fillOpacity="0.8"
          />
          <rect
            x="88"
            y="100"
            width="5"
            height="7"
            fill="currentColor"
            fillOpacity="0.5"
          />
          <rect
            x="83"
            y="107"
            width="5"
            height="7"
            fill="currentColor"
            fillOpacity="0.4"
          />
        </g>

        {/* Right Bracket > */}
        <g className="web-bracket-right">
          <rect
            x="118"
            y="74"
            width="6"
            height="5"
            fill="var(--primary)"
            fillOpacity="0.6"
          />
          <rect
            x="124"
            y="79"
            width="6"
            height="5"
            fill="var(--primary)"
            fillOpacity="0.75"
          />
          <rect
            x="130"
            y="84"
            width="6"
            height="5"
            fill="var(--primary)"
            fillOpacity="0.9"
          />
          <rect
            x="136"
            y="89"
            width="6"
            height="7"
            fill="var(--primary)"
            className="web-bracket-apex"
          />
          <rect
            x="130"
            y="96"
            width="6"
            height="5"
            fill="var(--primary)"
            fillOpacity="0.9"
          />
          <rect
            x="124"
            y="101"
            width="6"
            height="5"
            fill="var(--primary)"
            fillOpacity="0.75"
          />
          <rect
            x="118"
            y="106"
            width="6"
            height="5"
            fill="var(--primary)"
            fillOpacity="0.6"
          />
        </g>
      </g>

      {/* Logic / Syntax Bus Lines */}
      <g className="web-syntax">
        <rect
          x="52"
          y="124"
          width="28"
          height="4"
          rx="1"
          fill="var(--primary)"
          fillOpacity="0.5"
        />
        <rect
          x="84"
          y="124"
          width="46"
          height="4"
          rx="1"
          fill="currentColor"
          fillOpacity="0.18"
        />
        <rect
          x="134"
          y="124"
          width="22"
          height="4"
          rx="1"
          fill="var(--primary)"
          fillOpacity="0.35"
        />

        <rect
          x="62"
          y="134"
          width="34"
          height="4"
          rx="1"
          fill="currentColor"
          fillOpacity="0.22"
        />
        <rect
          x="100"
          y="134"
          width="52"
          height="4"
          rx="1"
          fill="var(--primary)"
          fillOpacity="0.45"
        />

        <rect
          x="72"
          y="144"
          width="44"
          height="4"
          rx="1"
          fill="currentColor"
          fillOpacity="0.18"
        />
        <rect
          x="52"
          y="154"
          width="18"
          height="4"
          rx="1"
          fill="var(--primary)"
          fillOpacity="0.6"
        />
        <rect
          x="74"
          y="153"
          width="5"
          height="6"
          fill="var(--primary)"
          className="web-cursor"
        />
      </g>

      {/* Circuit Routing Connections */}
      <g
        className="web-circuits"
        stroke="var(--primary)"
        strokeWidth="1"
        strokeOpacity="0.35"
      >
        <path d="M 24 75 L 40 75" />
        <circle cx="22" cy="75" r="2" fill="var(--primary)" />
        <path d="M 175 110 L 192 110 L 192 135" />
        <rect
          x="189"
          y="135"
          width="5"
          height="5"
          fill="var(--primary)"
          fillOpacity="0.7"
        />
      </g>
    </svg>
  );
}

/**
 * 2. Digital Marketing (Pure Upward Growth Chart)
 * Concept: Authentic analytics growth chart, upward trajectory curve,
 * milestone data nodes, performance benchmark grid, and apex ROI telemetry badge.
 * (NO vertical signal bars!).
 */
function DigitalMarketingVisual() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="service-artwork-svg"
    >
      <defs>
        <linearGradient id="mkt-chart-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
          <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="mkt-line-gradient" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
          <stop offset="65%" stopColor="var(--primary)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Technical Analytics Grid & Benchmark Levels */}
      <g
        className="mkt-grid"
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="0.8"
      >
        {/* Horizontal Benchmark Lines */}
        <line x1="30" y1="156" x2="185" y2="156" strokeOpacity="0.3" />
        <line x1="36" y1="126" x2="185" y2="126" strokeDasharray="3 4" />
        <line x1="36" y1="96" x2="185" y2="96" strokeDasharray="3 4" />
        <line x1="36" y1="66" x2="185" y2="66" strokeDasharray="3 4" />
        <line x1="36" y1="36" x2="185" y2="36" strokeDasharray="3 4" />

        {/* Vertical Quarter Gridlines */}
        <line x1="36" y1="28" x2="36" y2="162" strokeOpacity="0.3" />
        <line
          x1="72"
          y1="28"
          x2="72"
          y2="156"
          strokeDasharray="2 4"
          strokeOpacity="0.08"
        />
        <line
          x1="104"
          y1="28"
          x2="104"
          y2="156"
          strokeDasharray="2 4"
          strokeOpacity="0.08"
        />
        <line
          x1="136"
          y1="28"
          x2="136"
          y2="156"
          strokeDasharray="2 4"
          strokeOpacity="0.08"
        />
        <line
          x1="170"
          y1="28"
          x2="170"
          y2="156"
          strokeDasharray="2 4"
          strokeOpacity="0.08"
        />

        {/* Axis Calibration Ticks */}
        <line
          x1="32"
          y1="126"
          x2="36"
          y2="126"
          stroke="currentColor"
          strokeOpacity="0.4"
        />
        <line
          x1="32"
          y1="96"
          x2="36"
          y2="96"
          stroke="currentColor"
          strokeOpacity="0.4"
        />
        <line
          x1="32"
          y1="66"
          x2="36"
          y2="66"
          stroke="var(--primary)"
          strokeOpacity="0.7"
        />
        <line
          x1="32"
          y1="36"
          x2="36"
          y2="36"
          stroke="var(--primary)"
          strokeOpacity="0.9"
        />
      </g>

      {/* Upward Growth Chart Area Fill */}
      <path
        d="M 36 148 L 72 134 L 104 110 L 136 72 L 170 36 L 170 156 L 36 156 Z"
        fill="url(#mkt-chart-gradient)"
        className="mkt-area-fill"
      />

      {/* Target Upward Trajectory Projection Line (Dashed Forecaster) */}
      <line
        x1="104"
        y1="110"
        x2="186"
        y2="16"
        stroke="var(--primary)"
        strokeWidth="1"
        strokeDasharray="2 3"
        strokeOpacity="0.35"
        className="mkt-projection"
      />

      {/* Primary Upward Growth Polyline (Stepping Progress) */}
      <path
        d="M 36 148 L 72 134 L 104 110 L 136 72 L 170 36"
        stroke="url(#mkt-line-gradient)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mkt-growth-line"
      />

      {/* Electric Data Surge (Draws Upward on Hover) */}
      <path
        d="M 36 148 L 72 134 L 104 110 L 136 72 L 170 36"
        stroke="#ffffff"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mkt-growth-surge"
      />

      {/* Milestone Data Nodes along the Growth Climb */}
      <g className="mkt-nodes">
        {/* Milestone 1 (Baseline) */}
        <circle
          cx="36"
          cy="148"
          r="3.5"
          fill="var(--card)"
          stroke="var(--primary)"
          strokeWidth="1.4"
          className="mkt-node mkt-node-1"
        />
        <circle cx="36" cy="148" r="1.5" fill="var(--primary)" />

        {/* Milestone 2 (Initial Traction) */}
        <circle
          cx="72"
          cy="134"
          r="3.5"
          fill="var(--card)"
          stroke="var(--primary)"
          strokeWidth="1.4"
          className="mkt-node mkt-node-2"
        />
        <circle cx="72" cy="134" r="1.5" fill="var(--primary)" />

        {/* Milestone 3 (Campaign Acceleration) */}
        <circle
          cx="104"
          cy="110"
          r="4"
          fill="var(--card)"
          stroke="var(--primary)"
          strokeWidth="1.4"
          className="mkt-node mkt-node-3"
        />
        <circle cx="104" cy="110" r="1.8" fill="#ffffff" />

        {/* Milestone 4 (Exponential Scale) */}
        <circle
          cx="136"
          cy="72"
          r="4.5"
          fill="var(--card)"
          stroke="var(--primary)"
          strokeWidth="1.6"
          className="mkt-node mkt-node-4"
        />
        <circle cx="136" cy="72" r="2" fill="var(--primary)" />

        {/* Milestone 5 (Peak ROI Apex) */}
        <circle
          cx="170"
          cy="36"
          r="6"
          fill="var(--card)"
          stroke="#ffffff"
          strokeWidth="1.8"
          className="mkt-node mkt-node-apex"
        />
        <circle cx="170" cy="36" r="2.8" fill="var(--primary)" />
      </g>

      {/* Apex Growth Telemetry Badge (Upward Trend Tag) */}
      <g className="mkt-apex-badge">
        <rect
          x="138"
          y="16"
          width="46"
          height="15"
          rx="3"
          fill="var(--card)"
          stroke="var(--primary)"
          strokeWidth="1"
          strokeOpacity="0.8"
          className="mkt-badge-box"
        />
        {/* Upward Arrow Icon ▲ */}
        <polygon
          points="147,26 150,21 153,26"
          fill="var(--primary)"
          className="mkt-badge-arrow"
        />
        {/* Metric Pulse Spark */}
        <line
          x1="157"
          y1="23.5"
          x2="178"
          y2="23.5"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="mkt-badge-bar"
        />
      </g>
    </svg>
  );
}

/**
 * 3. Graphic Designing (Original First Version Artwork)
 * Concept: Drafting grid, layered canvas panels with crop marks,
 * custom vector Bézier drawing stroke with anchor points & calipers,
 * stepped color swatch matrix, and vector pen tool.
 */
function GraphicDesigningVisual() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="service-artwork-svg"
    >
      {/* Background Drafting Grid */}
      <g
        className="dsg-grid"
        stroke="var(--primary)"
        strokeOpacity="0.15"
        strokeWidth="1"
      >
        <line x1="25" y1="38" x2="175" y2="38" strokeDasharray="4 4" />
        <line x1="25" y1="88" x2="175" y2="88" strokeDasharray="4 4" />
        <line x1="25" y1="138" x2="175" y2="138" strokeDasharray="4 4" />
        <line x1="68" y1="18" x2="68" y2="175" strokeDasharray="4 4" />
        <line x1="122" y1="18" x2="122" y2="175" strokeDasharray="4 4" />
      </g>

      {/* Back Layer Canvas Panel */}
      <g className="dsg-layer-back">
        <rect
          x="64"
          y="28"
          width="112"
          height="84"
          rx="6"
          fill="var(--card)"
          fillOpacity="0.6"
          stroke="var(--primary)"
          strokeWidth="1.2"
          strokeOpacity="0.35"
        />
        <line
          x1="64"
          y1="44"
          x2="176"
          y2="44"
          stroke="var(--primary)"
          strokeWidth="1"
          strokeOpacity="0.25"
        />
        <circle cx="74" cy="36" r="2.5" fill="var(--primary)" opacity="0.6" />
        <circle cx="82" cy="36" r="2.5" fill="var(--primary)" opacity="0.4" />
      </g>

      {/* Main Front Canvas Panel */}
      <g className="dsg-layer-front">
        <rect
          x="38"
          y="54"
          width="126"
          height="104"
          rx="6"
          fill="var(--card)"
          fillOpacity="0.88"
          stroke="var(--primary)"
          strokeWidth="1.6"
          strokeOpacity="0.6"
          filter="drop-shadow(0 8px 20px rgba(0,0,0,0.5))"
        />
        {/* Canvas Corner Crop Marks ┌ ┐ └ ┘ */}
        <path
          d="M 44 68 L 44 60 L 52 60"
          stroke="var(--primary)"
          strokeWidth="1.5"
        />
        <path
          d="M 158 68 L 158 60 L 150 60"
          stroke="var(--primary)"
          strokeWidth="1.5"
        />
        <path
          d="M 44 144 L 44 152 L 52 152"
          stroke="var(--primary)"
          strokeWidth="1.5"
        />
        <path
          d="M 158 144 L 158 152 L 150 152"
          stroke="var(--primary)"
          strokeWidth="1.5"
        />
      </g>

      {/* Custom Vector Bezier Drawing Stroke */}
      <g className="dsg-vector-stroke">
        {/* Dynamic Curved Path */}
        <path
          d="M 48 138 C 78 138, 85 78, 122 80 C 148 82, 142 122, 164 122"
          stroke="var(--primary)"
          strokeWidth="2.6"
          strokeLinecap="round"
          className="dsg-curve-path"
          filter="drop-shadow(0 0 6px var(--primary))"
        />

        {/* Anchor Point 1 */}
        <rect
          x="45"
          y="134"
          width="8"
          height="8"
          rx="1"
          fill="var(--card)"
          stroke="var(--primary)"
          strokeWidth="1.8"
        />

        {/* Anchor Point 2 (Center Apex) with Tangent Handle Calipers */}
        <g className="dsg-anchor-center">
          {/* <line
            x1="100"
            y1="80"
            x2="144"
            y2="80"
            stroke="var(--foreground)"
            strokeWidth="1.2"
            strokeOpacity="0.7"
            strokeDasharray="3 3"
          />
          <circle cx="100" cy="80" r="3" fill="var(--foreground)" />
          <circle cx="144" cy="80" r="3" fill="var(--foreground)" /> */}
          {/* Main Anchor Square */}
          <rect
            x="118"
            y="76"
            width="8"
            height="8"
            rx="1"
            fill="var(--primary)"
            stroke="#ffffff"
            strokeWidth="1.4"
            filter="drop-shadow(0 0 5px var(--primary))"
          />
        </g>

        {/* Anchor Point 3 */}
        <rect
          x="160"
          y="118"
          width="8"
          height="8"
          rx="1"
          fill="var(--card)"
          stroke="var(--primary)"
          strokeWidth="1.8"
        />
      </g>

      {/* Stepped Pixel Color Swatch Matrix */}
      <g className="dsg-swatches">
        <rect
          x="50"
          y="72"
          width="11"
          height="11"
          fill="var(--primary)"
          rx="2"
          filter="drop-shadow(0 0 4px var(--primary))"
        />
        <rect
          x="63"
          y="72"
          width="11"
          height="11"
          fill="var(--primary)"
          opacity="0.65"
          rx="2"
        />
        <rect
          x="76"
          y="72"
          width="11"
          height="11"
          fill="var(--foreground)"
          opacity="0.5"
          rx="2"
        />
        <rect
          x="89"
          y="72"
          width="11"
          height="11"
          fill="var(--card)"
          stroke="var(--primary)"
          strokeWidth="1.2"
          rx="2"
        />
      </g>
    </svg>
  );
}

/**
 * 4. Social Media Management
 * Concept: Multi-node communication mesh, synchronized routing bus,
 * packet flow frames, and engagement spectrum waves.
 */
function SocialMediaVisual() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="service-artwork-svg"
    >
      {/* Network Routing Bus */}
      <g
        className="soc-bus"
        stroke="var(--primary)"
        strokeWidth="1"
        strokeOpacity="0.4"
      >
        <path d="M 97 62 L 115 62 L 115 95" strokeDasharray="3 3" />
        <path d="M 148 76 L 130 95" strokeDasharray="3 3" />
        <path d="M 101 130 L 116 130 L 115 112" strokeDasharray="4 2" />
        <path d="M 130 115 L 175 145" strokeDasharray="2 2" />
      </g>

      {/* Central Mesh Hub */}
      <g className="soc-hub">
        <rect
          x="116"
          y="96"
          width="20"
          height="20"
          rx="3"
          stroke="var(--primary)"
          strokeWidth="1.2"
          fill="none"
          className="soc-hub-frame"
        />
        <rect
          x="122"
          y="102"
          width="8"
          height="8"
          fill="var(--primary)"
          opacity="0.85"
          rx="1"
        />
        <circle cx="126" cy="106" r="2" fill="#ffffff" />
      </g>

      {/* Module 1: Chat Wireframe */}
      <g className="soc-chat">
        <rect
          x="36"
          y="42"
          width="62"
          height="38"
          rx="4"
          stroke="var(--primary)"
          strokeWidth="1"
          strokeOpacity="0.45"
          fill="none"
        />
        <polygon
          points="44,80 52,80 44,86"
          stroke="var(--primary)"
          strokeWidth="1"
          strokeOpacity="0.45"
          fill="var(--primary)"
        />
        <rect
          x="44"
          y="50"
          width="32"
          height="3"
          rx="1"
          fill="var(--primary)"
          opacity="0.75"
        />
        <rect
          x="44"
          y="57"
          width="44"
          height="3"
          rx="1"
          fill="currentColor"
          opacity="0.25"
        />
        <rect
          x="44"
          y="64"
          width="22"
          height="3"
          rx="1"
          fill="currentColor"
          opacity="0.18"
        />
        <circle
          cx="90"
          cy="50"
          r="3"
          fill="var(--primary)"
          className="soc-pip"
        />
      </g>

      {/* Module 2: Media Card Wireframe */}
      <g className="soc-media">
        <rect
          x="128"
          y="38"
          width="44"
          height="44"
          rx="4"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeOpacity="0.25"
          fill="none"
        />
        <rect
          x="134"
          y="44"
          width="32"
          height="22"
          rx="2"
          stroke="var(--primary)"
          strokeWidth="0.8"
          strokeOpacity="0.35"
          fill="none"
        />
        <polygon
          points="148,50 154,55 148,60"
          fill="var(--primary)"
          opacity="0.7"
        />
        <rect
          x="135"
          y="71"
          width="8"
          height="3"
          rx="1"
          fill="var(--primary)"
          opacity="0.5"
        />
      </g>

      {/* Module 3: Audio Spectrum Waveform Frame */}
      <g className="soc-spectrum">
        <rect
          x="44"
          y="108"
          width="58"
          height="38"
          rx="3"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeOpacity="0.25"
          fill="none"
        />
        <rect
          x="50"
          y="115"
          width="24"
          height="3"
          rx="1"
          fill="currentColor"
          opacity="0.4"
        />
        <g className="soc-waveform">
          <rect
            x="80"
            y="133"
            width="3"
            height="9"
            fill="var(--primary)"
            opacity="0.4"
          />
          <rect
            x="50"
            y="132"
            width="3"
            height="10"
            fill="var(--primary)"
            opacity="0.5"
          />
          <rect
            x="56"
            y="129"
            width="3"
            height="13"
            fill="var(--primary)"
            opacity="0.75"
          />
          <rect 
            x="62" 
            y="126" 
            width="3" 
            height="16" 
            fill="var(--primary)" 
          />
          <rect
            x="68"
            y="130"
            width="3"
            height="12"
            fill="var(--primary)"
            opacity="0.7"
          />
          <rect
            x="74"
            y="127"
            width="3"
            height="15"
            fill="var(--primary)"
            opacity="0.85"
          />
          
          <rect
            x="86"
            y="131"
            width="3"
            height="11"
            fill="var(--primary)"
            opacity="0.6"
          />
        </g>
      </g>

      {/* Dynamic Data Packets */}
      <g className="soc-packets">
        <rect
          x="144"
          y="124"
          width="5"
          height="5"
          fill="var(--primary)"
          opacity="1"
        />
        <rect
          x="159"
          y="134"
          width="4"
          height="4"
          fill="var(--primary)"
          opacity="1"
        />
        <rect
          x="173"
          y="144"
          width="5"
          height="5"
          fill="var(--primary)"
          opacity="0.7"
        />
      </g>
    </svg>
  );
}

/**
 * 5. Brand Identity
 * Concept: Golden-ratio drafting framework, radial alignment guides,
 * faceted geometric sigil, and technical measurement calipers.
 */
function BrandIdentityVisual() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="service-artwork-svg"
    >
      {/* Golden Ratio Drafting Arcs & Axes */}
      <g
        className="brd-guides"
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="0.8"
      >
        <circle cx="110" cy="100" r="74" strokeDasharray="3 3" />
        <circle cx="110" cy="100" r="46" strokeDasharray="2 3" />
        <circle
          cx="110"
          cy="100"
          r="24"
          stroke="var(--primary)"
          strokeOpacity="0.3"
        />
        <line x1="25" y1="100" x2="195" y2="100" strokeDasharray="4 4" />
        <line x1="110" y1="15" x2="110" y2="185" strokeDasharray="4 4" />
        <line x1="42" y1="32" x2="178" y2="168" strokeOpacity="0.08" />
        <line x1="42" y1="168" x2="178" y2="32" strokeOpacity="0.08" />
      </g>

      {/* Registration Crosses & Scale Calipers */}
      <g className="brd-bounds" stroke="var(--primary)" strokeWidth="1">
        <path d="M 48 42 L 48 36 L 54 36" />
        <path d="M 172 42 L 172 36 L 166 36" />
        <path d="M 48 158 L 48 164 L 54 164" />
        <path d="M 172 158 L 172 164 L 166 164" />
        <line x1="75" y1="36" x2="75" y2="32" />
        <line x1="110" y1="36" x2="110" y2="30" stroke="currentColor" />
        <line x1="145" y1="36" x2="145" y2="32" />
      </g>

      {/* Abstract Interlocking Geometric Sigil */}
      <g className="brd-sigil">
        <polygon
          points="110,48 152,74 152,126 110,152 68,126 68,74"
          stroke="var(--primary)"
          strokeWidth="1.5"
          fill="none"
          className="brd-sigil-frame"
        />
        <polygon
          points="110,48 110,100 68,74"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeOpacity="0.25"
          fill="var(--primary)"
          fillOpacity="0.12"
        />
        <polygon
          points="152,74 110,100 152,126"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeOpacity="0.25"
          fill="var(--primary)"
          fillOpacity="0.08"
        />
        <polygon
          points="110,152 110,100 68,126"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeOpacity="0.25"
          fill="currentColor"
          fillOpacity="0.06"
        />

        <polygon
          points="110,76 130,100 110,124 90,100"
          fill="var(--primary)"
          className="brd-core-rhombus"
        />
        <polygon
          points="110,84 122,100 110,116 98,100"
          fill="#ffffff"
          opacity="0.9"
        />
      </g>

      {/* Coordinate & Token Ticks */}
      <g className="brd-tokens">
        <rect
          x="36"
          y="86"
          width="5"
          height="5"
          fill="var(--primary)"
          opacity="0.75"
        />
        <rect
          x="36"
          y="96"
          width="5"
          height="5"
          fill="currentColor"
          opacity="0.35"
        />
        <rect
          x="36"
          y="106"
          width="5"
          height="5"
          fill="var(--primary)"
          opacity="0.25"
        />
        <rect
          x="178"
          y="86"
          width="5"
          height="5"
          fill="var(--primary)"
          opacity="0.35"
        />
        <rect
          x="178"
          y="96"
          width="5"
          height="5"
          fill="var(--primary)"
          opacity="0.8"
        />
      </g>
    </svg>
  );
}

/**
 * 6. AI Automation (Elevated)
 * Concept: Autonomous agent workflow architecture, 3x3 neural synaptic matrix die,
 * binary ingestion trigger, logic decision diamond, and self-healing feedback pipeline.
 */
function AiAutomationVisual() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="service-artwork-svg"
    >
      {/* Background Neural Circuit Matrix Grid */}
      {/* <g
        className="ai-grid"
        stroke="currentColor"
        strokeOpacity="0.1"
        strokeWidth="0.8"
      >
        <line x1="20" y1="42" x2="185" y2="42" strokeDasharray="3 4" />
        <line x1="20" y1="96" x2="185" y2="96" strokeDasharray="3 4" />
        <line x1="20" y1="150" x2="185" y2="150" strokeDasharray="3 4" />
        <line x1="56" y1="20" x2="56" y2="180" strokeDasharray="3 4" />
        <line x1="110" y1="20" x2="110" y2="180" strokeDasharray="3 4" />
      </g> */}

      {/* Stage 1: Event Trigger / Input Webhook (Left Terminal) */}
      <g className="ai-trigger-node">
        <rect
          x="24"
          y="78"
          width="30"
          height="38"
          rx="3"
          stroke="var(--primary)"
          strokeWidth="1.2"
          strokeOpacity="0.5"
          fill="var(--primary)"
          fillOpacity="0.06"
          className="ai-terminal-box"
        />
        {/* Terminal Header */}
        <line
          x1="24"
          y1="88"
          x2="54"
          y2="88"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="0.8"
          // strokeDasharray="3 4"
        />
        <circle cx="29" cy="83" r="1.5" fill="var(--primary)" />
        <circle cx="34" cy="83" r="1.5" fill="currentColor" opacity="0.3" />
        {/* Binary Stream Pips */}
        <rect
          x="28"
          y="93"
          width="7"
          height="3"
          rx="0.5"
          fill="var(--primary)"
          opacity="0.8"
        />
        <rect
          x="38"
          y="93"
          width="11"
          height="3"
          rx="0.5"
          fill="currentColor"
          opacity="0.3"
        />
        <rect
          x="28"
          y="100"
          width="13"
          height="3"
          rx="0.5"
          fill="currentColor"
          opacity="0.3"
        />
        <rect
          x="44"
          y="100"
          width="5"
          height="3"
          rx="0.5"
          fill="var(--primary)"
          opacity="0.8"
        />
      </g>

      {/* Ingestion Conduit Bus (Left -> Center) */}
      <g
        className="ai-bus-inlet"
        stroke="var(--primary)"
        strokeWidth="1.4"
        strokeOpacity="0.6"
      >
        <path d="M 54 96 L 82 96" className="ai-bus-inlet-line" />
        {/* Inflow Direction Chevron */}
        <polygon points="67,93 72,96 67,99" fill="var(--primary)" />
      </g>

      {/* Stage 2: Central Neural Processing Die (Silicon NPU Core) */}
      <g className="ai-npu-die">
        {/* Silicon Package Carrier */}
        <rect
          x="82"
          y="68"
          width="56"
          height="56"
          rx="5"
          stroke="var(--primary)"
          strokeWidth="1.5"
          strokeOpacity="0.75"
          fill="none"
          className="ai-npu-carrier"
        />

        {/* Silicon Bus Pins (Top, Bottom, Left, Right) */}
        <g
          className="ai-npu-pins"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1"
        >
          <line x1="94" y1="68" x2="94" y2="62" />
          <line
            x1="104"
            y1="68"
            x2="104"
            y2="60"
            stroke="var(--primary)"
            strokeOpacity="0.7"
          />
          <line
            x1="114"
            y1="68"
            x2="114"
            y2="60"
            stroke="var(--primary)"
            strokeOpacity="0.7"
          />
          <line x1="126" y1="68" x2="126" y2="62" />

          <line x1="94" y1="124" x2="94" y2="130" />
          <line
            x1="104"
            y1="124"
            x2="104"
            y2="132"
            stroke="var(--primary)"
            strokeOpacity="0.7"
          />
          <line
            x1="114"
            y1="124"
            x2="114"
            y2="132"
            stroke="var(--primary)"
            strokeOpacity="0.7"
          />
          <line x1="126" y1="124" x2="126" y2="130" />
        </g>

        {/* 3x3 Neural Synapse Matrix (Interconnected Synaptic Pathways) */}
        <g
          className="ai-synapses"
          stroke="var(--primary)"
          strokeWidth="0.8"
          strokeOpacity="0.35"
        >
          {/* Horizontal Synapses */}
          <line x1="94" y1="80" x2="126" y2="80" />
          <line
            x1="94"
            y1="96"
            x2="126"
            y2="96"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />
          <line x1="94" y1="112" x2="126" y2="112" />
          {/* Vertical Synapses */}
          <line x1="94" y1="80" x2="94" y2="112" />
          <line
            x1="110"
            y1="80"
            x2="110"
            y2="112"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />
          <line x1="126" y1="80" x2="126" y2="112" />
          {/* Diagonal Cross-Synapses */}
          <line x1="94" y1="80" x2="126" y2="112" strokeDasharray="2 2" />
          <line x1="94" y1="112" x2="126" y2="80" strokeDasharray="2 2" />
        </g>

        {/* 3x3 Neural Synapse Nodes */}
        <g className="ai-nodes">
          {/* Row 1 */}
          <circle
            cx="94"
            cy="80"
            r="2.5"
            fill="var(--primary)"
            opacity="0.6"
            className="ai-node-p1"
          />
          <circle
            cx="110"
            cy="80"
            r="3"
            fill="var(--primary)"
            opacity="0.8"
            className="ai-node-p2"
          />
          <circle
            cx="126"
            cy="80"
            r="2.5"
            fill="var(--primary)"
            opacity="0.6"
            className="ai-node-p3"
          />

          {/* Row 2 (Central Core Hub) */}
          <circle
            cx="94"
            cy="96"
            r="3"
            fill="var(--primary)"
            opacity="0.8"
            className="ai-node-p4"
          />
          <circle
            cx="110"
            cy="96"
            r="4.5"
            fill="#ffffff"
            className="ai-node-core"
          />
          <circle cx="110" cy="96" r="2" fill="var(--primary)" />
          <circle
            cx="126"
            cy="96"
            r="3"
            fill="var(--primary)"
            opacity="0.8"
            className="ai-node-p5"
          />

          {/* Row 3 */}
          <circle
            cx="94"
            cy="112"
            r="2.5"
            fill="var(--primary)"
            opacity="0.6"
            className="ai-node-p6"
          />
          <circle
            cx="110"
            cy="112"
            r="3"
            fill="var(--primary)"
            opacity="0.8"
            className="ai-node-p7"
          />
          <circle
            cx="126"
            cy="112"
            r="2.5"
            fill="var(--primary)"
            opacity="0.6"
            className="ai-node-p8"
          />
        </g>
      </g>

      {/* Stage 3: Autonomous Branching Execution Engine (Right) */}
      <g
        className="ai-branching"
        stroke="var(--primary)"
        strokeWidth="1.2"
        strokeOpacity="0.6"
      >
        {/* Branch Alpha (Upper: LLM Agent Inference & Action Dispatcher) */}
        <path d="M 138 90 L 154 68 L 176 68" className="ai-route-alpha" />
        <rect
          x="176"
          y="62"
          width="14"
          height="12"
          rx="2"
          fill="var(--primary)"
          className="ai-agent-disp"
        />
        {/* <circle cx="168" cy="68" r="1.5" fill="#ffffff" /> */}

        {/* Branch Beta (Lower: Autonomous Logic Gate) */}
        <path d="M 138 102 L 154 124 L 188 124" className="ai-route-beta" />
        {/* Decision Diamond Logic Gate */}
        {/* <polygon
          points="168,124 176,116 184,124 176,132"
          stroke="var(--primary)"
          strokeWidth="1.4"
          fill="none"
          className="ai-gate-diamond"
        /> */}
        <circle cx="176" cy="124" r="2" fill="var(--primary)" />

        {/* Self-Healing Loop Conduit (Returning Underneath) */}
        <path
          d="M 176 132 L 176 154 L 110 154 L 110 132"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.25"
          strokeDasharray="3 3"
          className="ai-feedback-loop"
        />
        <polygon
          points="110,132 107,137 113,137"
          fill="currentColor"
          opacity="1"
        />
      </g>
    </svg>
  );
}

/**
 * 7. Cyber Security
 * Concept: Segmented cyber shield blueprint, cryptographic cipher rings,
 * firewall scan vector, and security verification nodes.
 */
function CyberSecurityVisual() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="service-artwork-svg"
    >
      {/* Perimeter Grid & Crosshairs */}
      <g
        className="sec-grid"
        stroke="currentColor"
        strokeOpacity="0.1"
        strokeWidth="0.8"
      >
        <circle cx="115" cy="100" r="76" strokeDasharray="3 4" />
        <line x1="40" y1="100" x2="190" y2="100" strokeDasharray="2 3" />
        <line x1="115" y1="25" x2="115" y2="175" strokeDasharray="2 3" />
      </g>

      {/* Segmented Shield Geometry */}
      <g className="sec-shield">
        <polygon
          points="70,44 115,28 160,44 148,60 115,48 82,60"
          stroke="var(--primary)"
          strokeWidth="1"
          strokeOpacity="0.6"
          fill="none"
        />
        <polygon
          points="68,52 80,66 80,118 68,138 56,92"
          stroke="var(--primary)"
          strokeWidth="1"
          strokeOpacity="0.45"
          fill="none"
        />
        <polygon
          points="162,52 174,92 162,138 150,118 150,66"
          stroke="var(--primary)"
          strokeWidth="1"
          strokeOpacity="0.45"
          fill="none"
        />
        <polygon
          points="68,144 115,182 162,144 148,136 115,162 82,136"
          stroke="var(--primary)"
          strokeWidth="1"
          strokeOpacity="0.6"
          fill="none"
        />

        <path
          d="M 82 64 L 115 52 L 148 64 L 148 116 C 148 142 115 160 115 160 C 115 160 82 142 82 116 Z"
          stroke="var(--primary)"
          strokeWidth="1.6"
          fill="none"
          className="sec-shield-frame"
        />
      </g>

      {/* Cryptographic Cipher Rings */}
      <g className="sec-cipher">
        <circle
          cx="115"
          cy="104"
          r="22"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeOpacity="0.25"
          strokeDasharray="6 4"
        />
        <circle
          cx="115"
          cy="104"
          r="14"
          stroke="var(--primary)"
          strokeWidth="1.4"
          className="sec-cipher-inner"
        />
        <rect x="112" y="97" width="6" height="8" rx="1" fill="#ffffff" />
        <polygon points="115,106 119,113 111,113" fill="var(--primary)" />
      </g>

      {/* Circuit Protection Leads */}
      <g
        className="sec-leads"
        stroke="var(--primary)"
        strokeWidth="0.8"
        strokeOpacity="0.4"
      >
        <path d="M 88 80 L 102 80 L 102 92" />
        <rect x="85" y="78" width="4" height="4" fill="var(--primary)" />
        <path d="M 142 80 L 128 80 L 128 92" />
        <rect x="141" y="78" width="4" height="4" fill="var(--primary)" />
        <path d="M 115 124 L 115 142" />
        <circle cx="115" cy="144" r="2" fill="var(--primary)" />
      </g>

      {/* Firewall Scanline */}
      <g className="sec-scan">
        <line
          x1="50"
          y1="70"
          x2="180"
          y2="70"
          stroke="var(--primary)"
          strokeWidth="1.6"
          className="sec-scanline"
        />
      </g>

      {/* Perimeter Status Nodes */}
      <g className="sec-nodes">
        <rect
          x="42"
          y="44"
          width="5"
          height="5"
          fill="var(--primary)"
          opacity="0.75"
        />
        <rect
          x="182"
          y="44"
          width="5"
          height="5"
          fill="var(--primary)"
          opacity="0.75"
        />
        <rect
          x="42"
          y="156"
          width="5"
          height="5"
          fill="var(--primary)"
          opacity="0.4"
        />
        <rect
          x="182"
          y="156"
          width="5"
          height="5"
          fill="var(--primary)"
          opacity="0.4"
        />
      </g>
    </svg>
  );
}

/**
 * 8. Website Maintenance (Elevated)
 * Concept: 24/7 high-availability infrastructure telemetry console, 99.99% uptime index gauge,
 * dual-tier server cluster nodes, 360° radar sweep, and real-time heartbeat latency monitor.
 */
function WebsiteMaintenanceVisual() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="service-artwork-svg"
    >
      {/* Background Precision Telemetry Grid */}
      <g
        className="mnt-grid"
        stroke="currentColor"
        strokeOpacity="0.1"
        strokeWidth="0.8"
      >
        <line x1="20" y1="45" x2="180" y2="45" strokeDasharray="3 4" />
        <line x1="20" y1="92" x2="180" y2="92" strokeDasharray="3 4" />
        <line x1="20" y1="140" x2="180" y2="140" strokeDasharray="3 4" />
        <line x1="105" y1="20" x2="105" y2="180" strokeDasharray="3 4" />
      </g>

      {/* Central 99.99% Uptime Circular Telemetry Gauge */}
      <g className="mnt-uptime-gauge">
        {/* Outer Calibrated Index Scale (280-degree Arc) */}
        <path
          d="M 64 122 A 52 52 0 1 1 146 122"
          stroke="var(--primary)"
          strokeWidth="1.4"
          strokeOpacity="0.45"
          strokeDasharray="7 4"
          className="mnt-gauge-outer"
        />

        {/* Precision Radial Calibration Graduation Ticks */}
        <g
          className="mnt-dial-ticks"
          stroke="var(--primary)"
          strokeWidth="1.2"
          strokeOpacity="0.6"
        >
          <line x1="105" y1="36" x2="105" y2="42" strokeWidth="1.6" />
          <line x1="152" y1="92" x2="158" y2="92" strokeWidth="1.6" />
          <line x1="52" y1="92" x2="58" y2="92" strokeWidth="1.6" />
          <line x1="139" y1="58" x2="144" y2="53" />
          <line x1="71" y1="58" x2="66" y2="53" />
          <line x1="142" y1="116" x2="147" y2="120" />
          <line x1="68" y1="116" x2="63" y2="120" />
        </g>

        {/* 360° Rotating Radar Ping Scanner Beam */}
        <line
          x1="105"
          y1="92"
          x2="150"
          y2="66"
          stroke="var(--primary)"
          strokeWidth="1.6"
          className="mnt-radar-sweep"
        />
      </g>

      {/* Dual-Tier High-Availability Server Infrastructure Cluster (Core) */}
      <g className="mnt-server-cluster">
        {/* Main Server Enclosure Rack */}
        <rect
          x="86"
          y="70"
          width="38"
          height="44"
          rx="3"
          stroke="var(--primary)"
          strokeWidth="1.5"
          strokeOpacity="0.8"
          fill="var(--card)"
          fillOpacity="0.8"
          className="mnt-rack-chassis"
        />

        {/* Tier 1: Application Server Node */}
        <g className="mnt-blade-1">
          <rect
            x="90"
            y="74"
            width="30"
            height="15"
            rx="1.5"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="0.8"
            fill="var(--primary)"
            fillOpacity="0.08"
          />
          {/* Live Ping LED Status Array */}
          <circle
            cx="95"
            cy="81.5"
            r="1.8"
            fill="var(--primary)"
            className="mnt-led-1"
          />
          <circle
            cx="101"
            cy="81.5"
            r="1.8"
            fill="var(--primary)"
            opacity="0.6"
            className="mnt-led-2"
          />
          <circle
            cx="107"
            cy="81.5"
            r="1.8"
            fill="#ffffff"
            className="mnt-led-3"
          />
          <rect
            x="112"
            y="80"
            width="5"
            height="3"
            rx="0.5"
            fill="var(--primary)"
            opacity="0.5"
          />
        </g>

        {/* Tier 2: Redundant Database & Storage Node */}
        <g className="mnt-blade-2">
          <rect
            x="90"
            y="93"
            width="30"
            height="15"
            rx="1.5"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="0.8"
            fill="var(--primary)"
            fillOpacity="0.08"
          />
          {/* Storage Read/Write Status Array */}
          <circle
            cx="95"
            cy="100.5"
            r="1.8"
            fill="var(--primary)"
            className="mnt-led-4"
          />
          <rect
            x="100"
            y="99"
            width="8"
            height="3"
            rx="0.5"
            fill="var(--primary)"
            opacity="0.75"
          />
          <rect
            x="110"
            y="99"
            width="7"
            height="3"
            rx="0.5"
            fill="#ffffff"
            opacity="0.9"
          />
        </g>
      </g>

      {/* Real-Time Network Latency / Oscilloscope Telemetry Monitor (Below) */}
      <g className="mnt-telemetry-monitor">
        {/* CRT / Diagnostic Display Enclosure */}
        <rect
          x="32"
          y="136"
          width="144"
          height="28"
          rx="3"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeOpacity="0.2"
          fill="var(--primary)"
          fillOpacity="0.03"
        />
        {/* Grid Scale Inside Monitor */}
        <line
          x1="32"
          y1="150"
          x2="176"
          y2="150"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeDasharray="2 3"
          strokeWidth="0.8"
        />
        <line
          x1="104"
          y1="136"
          x2="104"
          y2="164"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeDasharray="2 3"
          strokeWidth="0.8"
        />

        {/* Continuous Ping / Heartbeat Latency Trace */}
        <path
          d="M 36 150 L 72 150 L 77 141 L 82 159 L 87 144 L 92 155 L 97 150 L 136 150 L 141 143 L 146 150 L 172 150"
          stroke="var(--primary)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mnt-ecg-trace"
        />
      </g>

      {/* Cloud-To-Edge Auto-Sync Conduit (Top Overhead Data Pipe) */}
      <g className="mnt-sync-conduit">
        <path
          d="M 50 48 L 50 34 L 105 34"
          stroke="var(--primary)"
          strokeWidth="0.9"
          strokeOpacity="0.4"
          strokeDasharray="2 2"
        />
        <path
          d="M 160 48 L 160 34 L 105 34"
          stroke="var(--primary)"
          strokeWidth="0.9"
          strokeOpacity="0.4"
          strokeDasharray="2 2"
        />
        {/* Overhead Server Health Status Node */}
        <circle
          cx="105"
          cy="34"
          r="3.5"
          fill="var(--primary)"
          className="mnt-sync-hub"
        />
        <circle cx="105" cy="34" r="1.5" fill="#ffffff" />
        {/* Live Active Signal Beacon */}
        <circle
          cx="172"
          cy="92"
          r="3"
          fill="var(--primary)"
          className="mnt-status-beacon"
        />
      </g>
    </svg>
  );
}

/**
 * 9. Managed Services
 * Concept: Multi-tier enterprise server blade wireframe, rack rails,
 * status LED matrix, and high-speed fiber bus.
 */
function ManagedServicesVisual() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="service-artwork-svg"
    >
      {/* Rack Rails */}
      <g
        className="mng-rails"
        stroke="currentColor"
        strokeOpacity="0.15"
        strokeWidth="1"
      >
        <line x1="38" y1="24" x2="38" y2="178" />
        <line x1="168" y1="24" x2="168" y2="178" />
        <circle cx="38" cy="36" r="1.5" fill="currentColor" fillOpacity="0.3" />
        <circle cx="38" cy="74" r="1.5" fill="currentColor" fillOpacity="0.3" />
        <circle
          cx="38"
          cy="112"
          r="1.5"
          fill="currentColor"
          fillOpacity="0.3"
        />
        <circle
          cx="38"
          cy="150"
          r="1.5"
          fill="currentColor"
          fillOpacity="0.3"
        />

        <circle
          cx="168"
          cy="36"
          r="1.5"
          fill="currentColor"
          fillOpacity="0.3"
        />
        <circle
          cx="168"
          cy="74"
          r="1.5"
          fill="currentColor"
          fillOpacity="0.3"
        />
        <circle
          cx="168"
          cy="112"
          r="1.5"
          fill="currentColor"
          fillOpacity="0.3"
        />
        <circle
          cx="168"
          cy="150"
          r="1.5"
          fill="currentColor"
          fillOpacity="0.3"
        />
      </g>

      {/* Blade Chassis 1 */}
      <g className="mng-blade mng-blade-1">
        <rect
          x="44"
          y="32"
          width="118"
          height="34"
          rx="3"
          stroke="var(--primary)"
          strokeWidth="1"
          strokeOpacity="0.45"
          fill="none"
        />
        <line
          x1="52"
          y1="42"
          x2="98"
          y2="42"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <line
          x1="52"
          y1="48"
          x2="98"
          y2="48"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <line
          x1="52"
          y1="54"
          x2="98"
          y2="54"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <rect
          x="110"
          y="42"
          width="4"
          height="4"
          fill="var(--primary)"
          className="mng-led-1"
        />
        <rect
          x="118"
          y="42"
          width="4"
          height="4"
          fill="var(--primary)"
          opacity="0.35"
          className="mng-led-2"
        />
        <rect
          x="126"
          y="42"
          width="4"
          height="4"
          fill="#ffffff"
          opacity="0.8"
          className="mng-led-3"
        />
        <rect
          x="134"
          y="42"
          width="4"
          height="4"
          fill="var(--primary)"
          className="mng-led-4"
        />
      </g>

      {/* Blade Chassis 2 */}
      <g className="mng-blade mng-blade-2">
        <rect
          x="44"
          y="74"
          width="118"
          height="34"
          rx="3"
          stroke="var(--primary)"
          strokeWidth="1.2"
          strokeOpacity="0.6"
          fill="none"
        />
        <rect
          x="52"
          y="80"
          width="18"
          height="22"
          rx="1"
          stroke="var(--primary)"
          strokeWidth="0.8"
          strokeOpacity="0.3"
          fill="none"
        />
        <rect
          x="74"
          y="80"
          width="18"
          height="22"
          rx="1"
          stroke="var(--primary)"
          strokeWidth="0.8"
          strokeOpacity="0.3"
          fill="none"
        />
        <rect
          x="96"
          y="80"
          width="18"
          height="22"
          rx="1"
          stroke="var(--primary)"
          strokeWidth="0.8"
          strokeOpacity="0.3"
          fill="none"
        />
        <rect
          x="122"
          y="84"
          width="4"
          height="4"
          fill="var(--primary)"
          className="mng-led-2"
        />
        <rect
          x="130"
          y="84"
          width="4"
          height="4"
          fill="var(--primary)"
          className="mng-led-1"
        />
        <rect
          x="122"
          y="92"
          width="4"
          height="4"
          fill="#ffffff"
          opacity="0.5"
          className="mng-led-4"
        />
        <rect
          x="130"
          y="92"
          width="4"
          height="4"
          fill="var(--primary)"
          className="mng-led-3"
        />
      </g>

      {/* Blade Chassis 3 */}
      <g className="mng-blade mng-blade-3">
        <rect
          x="44"
          y="116"
          width="118"
          height="34"
          rx="3"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.3"
          fill="none"
        />
        <line
          x1="52"
          y1="126"
          x2="98"
          y2="126"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <line
          x1="52"
          y1="132"
          x2="98"
          y2="132"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <line
          x1="52"
          y1="138"
          x2="98"
          y2="138"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <rect
          x="110"
          y="126"
          width="4"
          height="4"
          fill="var(--primary)"
          className="mng-led-3"
        />
        <rect
          x="118"
          y="126"
          width="4"
          height="4"
          fill="#ffffff"
          opacity="0.6"
          className="mng-led-1"
        />
        <rect
          x="126"
          y="126"
          width="4"
          height="4"
          fill="var(--primary)"
          className="mng-led-4"
        />
        <rect
          x="134"
          y="126"
          width="4"
          height="4"
          fill="var(--primary)"
          opacity="0.35"
          className="mng-led-2"
        />
      </g>

      {/* Fiber Trunk Bus */}
      <g
        className="mng-bus"
        stroke="var(--primary)"
        strokeWidth="1.2"
        strokeOpacity="0.45"
      >
        <path d="M 162 48 L 180 48 L 180 90 L 162 90" />
        <path d="M 180 90 L 180 132 L 162 132" />
        <path d="M 180 48 L 180 20 L 140 20" strokeDasharray="3 2" />
        <rect x="178" y="46" width="4" height="4" fill="var(--primary)" />
        <rect x="178" y="88" width="4" height="4" fill="#ffffff" />
        <rect x="178" y="130" width="4" height="4" fill="var(--primary)" />
      </g>
    </svg>
  );
}
