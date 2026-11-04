"use client";

import React, { useState, useEffect, useRef } from "react";
import type { ComponentType } from "react";
import {
  Search,
  SlidersHorizontal,
  Rocket,
  ClipboardCheck,
  Truck,
  Headphones,
  ChevronDown,
  X,
} from "lucide-react";
import "./ProcessTimeline.css";

export interface ProcessStage {
  id: string;
  step: number;
  stageNumber: string;
  title: string;
  description: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}

export const processStages: ProcessStage[] = [
  {
    id: "stage-discussion",
    step: 1,
    stageNumber: "01",
    title: "Discussion",
    description:
      "We understand your business, goals, current situation and expectations and the challenge you want to solve.",
    icon: Search,
  },
  {
    id: "stage-planning",
    step: 2,
    stageNumber: "02",
    title: "Planning",
    description:
      "We examine requirements, define priorities, scope, milestones and the right direction for the work.",
    icon: SlidersHorizontal,
  },
  {
    id: "stage-execute",
    step: 3,
    stageNumber: "03",
    title: "Execute",
    description:
      "The agreed work is designed, developed, configured and progressed with clear momentum.",
    icon: Rocket,
  },
  {
    id: "stage-review",
    step: 4,
    stageNumber: "04",
    title: "Review",
    description:
      "We test the work against the requirements, gather your feedback and refine what matters.",
    icon: ClipboardCheck,
  },
  {
    id: "stage-delivery",
    step: 5,
    stageNumber: "05",
    title: "Delivery",
    description:
      "The finished work is finalized, handed you over and prepared for launch or everyday use etc.",
    icon: Truck,
  },
  {
    id: "stage-support",
    step: 6,
    stageNumber: "06",
    title: "Support",
    description:
      "Post-delivery guidance, fixes and ongoing technical support continue where they are useful.",
    icon: Headphones,
  },
];

/* -------------------------------------------------------------------------- */
/* SVG Connectors with Directional Arrowheads & Animated Laser Surge          */
/* -------------------------------------------------------------------------- */

/** Horizontal Connector: Left-to-Right (→) */
function HorizontalConnectorRight() {
  return (
    <div className="timeline-desktop-connector" aria-hidden="true">
      <svg
        viewBox="0 0 100 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="timeline-connector-svg"
        preserveAspectRatio="none"
      >
        <line
          x1="2"
          y1="29"
          x2="88"
          y2="29"
          stroke="var(--border)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          strokeOpacity="0.8"
        />
        <line
          x1="2"
          y1="29"
          x2="88"
          y2="29"
          stroke="var(--primary)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="3 3"
          className="timeline-laser-surge-h"
        />
        <polygon points="86 25, 94 29, 86 33" fill="var(--primary)" />
      </svg>
    </div>
  );
}

/** Tablet Horizontal Connector: Left-to-Right (→) */
function TabletHorizontalRight() {
  return (
    <div className="timeline-tablet-connector-h" aria-hidden="true">
      <svg
        viewBox="0 0 100 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="timeline-connector-svg"
        preserveAspectRatio="none"
      >
        <line
          x1="4"
          y1="12"
          x2="88"
          y2="12"
          stroke="var(--border)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          strokeOpacity="0.8"
        />
        <line
          x1="4"
          y1="12"
          x2="88"
          y2="12"
          stroke="var(--primary)"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="timeline-laser-surge-h"
        />
        <polygon points="86 8, 94 12, 86 16" fill="var(--primary)" />
      </svg>
    </div>
  );
}

/** Tablet Horizontal Connector: Right-to-Left (←) for Row 2: Execute → Review */
function TabletHorizontalLeft() {
  return (
    <div className="timeline-tablet-connector-h" aria-hidden="true">
      <svg
        viewBox="0 0 100 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="timeline-connector-svg"
        preserveAspectRatio="none"
      >
        <line
          x1="96"
          y1="12"
          x2="12"
          y2="12"
          stroke="var(--border)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          strokeOpacity="0.8"
        />
        <line
          x1="96"
          y1="12"
          x2="12"
          y2="12"
          stroke="var(--primary)"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="timeline-laser-surge-h-rev"
        />
        <polygon points="14 8, 6 12, 14 16" fill="var(--primary)" />
      </svg>
    </div>
  );
}

/** Tablet Vertical Connector: Top-to-Bottom (↓) */
function TabletDownConnector() {
  return (
    <svg
      viewBox="0 0 24 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="timeline-connector-svg"
      aria-hidden="true"
    >
      <line
        x1="12"
        y1="2"
        x2="12"
        y2="38"
        stroke="var(--border)"
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />
      <line
        x1="12"
        y1="2"
        x2="12"
        y2="38"
        stroke="var(--primary)"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="timeline-laser-surge-v"
      />
      <polygon points="8 36, 12 44, 16 36" fill="var(--primary)" />
    </svg>
  );
}

/** Mobile Vertical Connector: Top-to-Bottom (↓) */
function MobileVerticalConnector() {
  return (
    <div className="timeline-mobile-connector" aria-hidden="true">
      <svg
        viewBox="0 0 24 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="timeline-connector-svg"
      >
        <line
          x1="12"
          y1="2"
          x2="12"
          y2="24"
          stroke="var(--border)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
        <line
          x1="12"
          y1="2"
          x2="12"
          y2="24"
          stroke="var(--primary)"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="timeline-laser-surge-v"
        />
        <polygon points="8 22, 12 30, 16 22" fill="var(--primary)" />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Interactive Process Stage Node Component                                   */
/* -------------------------------------------------------------------------- */
interface NodeProps {
  stage: ProcessStage;
  isActive: boolean;
  align?: "left" | "center" | "right";
  wrapperClass?: string;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onToggle: () => void;
  onClose: () => void;
}

function ProcessNode({
  stage,
  isActive,
  align = "center",
  wrapperClass = "timeline-desktop-node-wrapper",
  onHoverStart,
  onHoverEnd,
  onToggle,
  onClose,
}: NodeProps) {
  const IconComponent = stage.icon;

  const alignClass =
    align === "left"
      ? "popover-align-left"
      : align === "right"
      ? "popover-align-right"
      : "popover-align-center";

  return (
    <div className={wrapperClass}>
      <div
        className={`timeline-node ${isActive ? "is-active" : ""}`}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onFocus={onHoverStart}
        onBlur={onHoverEnd}
        onClick={onToggle}
        aria-haspopup="dialog"
        aria-expanded={isActive}
        aria-label={`Stage ${stage.step}: ${stage.title}. Click to view details.`}
      >
        <div className="timeline-icon-box">
          <span className="timeline-stage-badge">{stage.stageNumber}</span>
          <IconComponent size={22} strokeWidth={1.8} />
        </div>
        <span className="timeline-node-title">{stage.title}</span>
        <span className="timeline-node-hint">Stage {stage.step}</span>
      </div>

      {/* Floating Popover Tooltip */}
      {isActive && (
        <div
          role="dialog"
          aria-label={`${stage.title} detail`}
          className={`timeline-popover ${alignClass}`}
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
        >
          <div className="timeline-popover-header">
            <span className="timeline-popover-stage">STAGE {stage.stageNumber}</span>
            <button
              type="button"
              className="timeline-popover-close"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close stage details"
            >
              <X size={12} />
            </button>
          </div>
          <h4 className="timeline-popover-title">{stage.title}</h4>
          <p className="timeline-popover-desc">{stage.description}</p>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main ProcessTimeline Component                                             */
/* -------------------------------------------------------------------------- */
export default function ProcessTimeline() {
  const [activeStageId, setActiveStageId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popover when pressing Escape or clicking outside
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveStageId(null);
      }
    }

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setActiveStageId(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = (id: string) => {
    setActiveStageId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      ref={containerRef}
      className="process-timeline-wrapper"
      role="region"
      aria-label="Interactive 6-step workflow timeline"
    >
      {/* ====================================================================
          1. Desktop Layout (Single Row: 6 Stages with 5 Connectors: >= 1024px)
          Discussion → Planning → Execute → Review → Delivery → Support
          ==================================================================== */}
      <div className="timeline-desktop" role="list">
        {processStages.map((stage, index) => {
          const isLast = index === processStages.length - 1;
          const isActive = activeStageId === stage.id;

          // Edge-aware alignment to completely prevent horizontal overflow
          const align =
            index === 0
              ? "left"
              : index === processStages.length - 1
              ? "right"
              : "center";

          return (
            <React.Fragment key={stage.id}>
              <ProcessNode
                stage={stage}
                isActive={isActive}
                align={align}
                wrapperClass="timeline-desktop-node-wrapper"
                onHoverStart={() => setActiveStageId(stage.id)}
                onHoverEnd={() => setActiveStageId(null)}
                onToggle={() => handleToggle(stage.id)}
                onClose={() => setActiveStageId(null)}
              />
              {!isLast && <HorizontalConnectorRight />}
            </React.Fragment>
          );
        })}
      </div>

      {/* ====================================================================
          2. Tablet Layout (Zigzag Serpentine: 2 Columns x 3 Rows: 641px - 1023px)
          Row 1: Discussion (01) → Planning (02)
          Down: Planning (02) ↓ Execute (03) on right
          Row 2: Review (04) ← Execute (03) (Right-to-Left)
          Down: Review (04) ↓ Delivery (05) on left
          Row 3: Delivery (05) → Support (06)
          ==================================================================== */}
      <div className="timeline-tablet" role="list">
        {/* Row 1: Discussion (01) → Planning (02) */}
        <div className="timeline-tablet-row">
          <ProcessNode
            stage={processStages[0]}
            isActive={activeStageId === processStages[0].id}
            align="left"
            wrapperClass="timeline-tablet-node-wrapper"
            onHoverStart={() => setActiveStageId(processStages[0].id)}
            onHoverEnd={() => setActiveStageId(null)}
            onToggle={() => handleToggle(processStages[0].id)}
            onClose={() => setActiveStageId(null)}
          />
          <TabletHorizontalRight />
          <ProcessNode
            stage={processStages[1]}
            isActive={activeStageId === processStages[1].id}
            align="right"
            wrapperClass="timeline-tablet-node-wrapper"
            onHoverStart={() => setActiveStageId(processStages[1].id)}
            onHoverEnd={() => setActiveStageId(null)}
            onToggle={() => handleToggle(processStages[1].id)}
            onClose={() => setActiveStageId(null)}
          />
          <TabletHorizontalRight />
          <ProcessNode
            stage={processStages[2]}
            isActive={activeStageId === processStages[2].id}
            align="left"
            wrapperClass="timeline-tablet-node-wrapper"
            onHoverStart={() => setActiveStageId(processStages[2].id)}
            onHoverEnd={() => setActiveStageId(null)}
            onToggle={() => handleToggle(processStages[2].id)}
            onClose={() => setActiveStageId(null)}
          />
          
        </div>

        {/* Downward transition on Right: Planning (Row 1) → Execute (Row 2) */}
        <div className="timeline-tablet-down-slot-right">
          <TabletDownConnector />
        </div>

        {/* Row 2: Review (04) ← Execute (03) */}
        <div className="timeline-tablet-row">
          {/* <ProcessNode
            stage={processStages[3]}
            isActive={activeStageId === processStages[3].id}
            align="right"
            wrapperClass="timeline-tablet-node-wrapper"
            onHoverStart={() => setActiveStageId(processStages[3].id)}
            onHoverEnd={() => setActiveStageId(null)}
            onToggle={() => handleToggle(processStages[3].id)}
            onClose={() => setActiveStageId(null)}
          /> */}
          <ProcessNode
            stage={processStages[5]}
            isActive={activeStageId === processStages[5].id}
            align="right"
            wrapperClass="timeline-tablet-node-wrapper"
            onHoverStart={() => setActiveStageId(processStages[5].id)}
            onHoverEnd={() => setActiveStageId(null)}
            onToggle={() => handleToggle(processStages[5].id)}
            onClose={() => setActiveStageId(null)}
          />
          <TabletHorizontalLeft />
          <ProcessNode
            stage={processStages[4]}
            isActive={activeStageId === processStages[4].id}
            align="right"
            wrapperClass="timeline-tablet-node-wrapper"
            onHoverStart={() => setActiveStageId(processStages[4].id)}
            onHoverEnd={() => setActiveStageId(null)}
            onToggle={() => handleToggle(processStages[4].id)}
            onClose={() => setActiveStageId(null)}
          />
          <TabletHorizontalLeft />
          <ProcessNode
            stage={processStages[3]}
            isActive={activeStageId === processStages[3].id}
            align="left"
            wrapperClass="timeline-tablet-node-wrapper"
            onHoverStart={() => setActiveStageId(processStages[3].id)}
            onHoverEnd={() => setActiveStageId(null)}
            onToggle={() => handleToggle(processStages[3].id)}
            onClose={() => setActiveStageId(null)}
          />
          
         
        </div>

        {/* Downward transition on Left: Review (Row 2) → Delivery (Row 3) */}
        {/* <div className="timeline-tablet-down-slot-left">
          <TabletDownConnector />
        </div> */}

      </div>

      {/* ====================================================================
          3. Mobile Layout (Vertical Timeline Stack: <= 640px)
          Discussion ↓ Planning ↓ Execute ↓ Review ↓ Delivery ↓ Support
          ==================================================================== */}
      <div className="timeline-mobile" role="list">
        <div className="timeline-tablet-row">
          <ProcessNode
            stage={processStages[0]}
            isActive={activeStageId === processStages[0].id}
            align="left"
            wrapperClass="timeline-tablet-node-wrapper"
            onHoverStart={() => setActiveStageId(processStages[0].id)}
            onHoverEnd={() => setActiveStageId(null)}
            onToggle={() => handleToggle(processStages[0].id)}
            onClose={() => setActiveStageId(null)}
          />
          <TabletHorizontalRight />
          <ProcessNode
            stage={processStages[1]}
            isActive={activeStageId === processStages[1].id}
            align="right"
            wrapperClass="timeline-tablet-node-wrapper"
            onHoverStart={() => setActiveStageId(processStages[1].id)}
            onHoverEnd={() => setActiveStageId(null)}
            onToggle={() => handleToggle(processStages[1].id)}
            onClose={() => setActiveStageId(null)}
          />
          {/* <TabletHorizontalRight /> */}
          
          
        </div>

        {/* Downward transition on Right: Planning (Row 1) → Execute (Row 2) */}
        <div className="timeline-mobile-down-slot-right">
          <TabletDownConnector />
        </div>

        {/* Row 2: Review (04) ← Execute (03) */}
        <div className="timeline-tablet-row">
          <ProcessNode
            stage={processStages[3]}
            isActive={activeStageId === processStages[3].id}
            align="right"
            wrapperClass="timeline-tablet-node-wrapper"
            onHoverStart={() => setActiveStageId(processStages[3].id)}
            onHoverEnd={() => setActiveStageId(null)}
            onToggle={() => handleToggle(processStages[3].id)}
            onClose={() => setActiveStageId(null)}
          />
          <TabletHorizontalLeft />
          <ProcessNode
            stage={processStages[2]}
            isActive={activeStageId === processStages[2].id}
            align="left"
            wrapperClass="timeline-tablet-node-wrapper"
            onHoverStart={() => setActiveStageId(processStages[2].id)}
            onHoverEnd={() => setActiveStageId(null)}
            onToggle={() => handleToggle(processStages[2].id)}
            onClose={() => setActiveStageId(null)}
          />
        </div>

        {/* Downward transition on Left: Review (Row 2) → Delivery (Row 3) */}
        <div className="timeline-tablet-down-slot-left">
          <TabletDownConnector />
        </div>

        <div className="timeline-tablet-row">
          <ProcessNode
            stage={processStages[4]}
            isActive={activeStageId === processStages[4].id}
            align="right"
            wrapperClass="timeline-tablet-node-wrapper"
            onHoverStart={() => setActiveStageId(processStages[4].id)}
            onHoverEnd={() => setActiveStageId(null)}
            onToggle={() => handleToggle(processStages[4].id)}
            onClose={() => setActiveStageId(null)}
          />
          <TabletHorizontalRight />
          <ProcessNode
            stage={processStages[5]}
            isActive={activeStageId === processStages[5].id}
            align="right"
            wrapperClass="timeline-tablet-node-wrapper"
            onHoverStart={() => setActiveStageId(processStages[5].id)}
            onHoverEnd={() => setActiveStageId(null)}
            onToggle={() => handleToggle(processStages[5].id)}
            onClose={() => setActiveStageId(null)}
          />
          
          
        </div>

      </div>
    </div>
  );
}
