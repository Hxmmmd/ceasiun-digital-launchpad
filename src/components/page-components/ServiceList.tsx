 "use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { services } from "@/data/site-data";
import { ServiceArtwork } from "./ServiceArtwork";
import "./ServiceList.css";

export { services };

const serviceListAreas = services.map((service) => ({
    slug: service.slug,
    title: service.title,
    detail: service.description,
    icon: service.icon,
}));

const GAP = 16;

export function ServiceList() {
    const [activeIndex, setActiveIndex] = useState(1);
    const [cardWidth, setCardWidth] = useState(356);
    const [viewportWidth, setViewportWidth] = useState(1100);
    const [isDesktop3Col, setIsDesktop3Col] = useState(true);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const rackRef = useRef<HTMLDivElement>(null);
    const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Pointer tracking
    const isPointerDown = useRef(false);
    const pointerStartX = useRef(0);
    const hasMovedFar = useRef(false);
    const isInitialMounted = useRef(false);

    // Default card focus: Card 01 on mobile (<768px), Card 02 on desktop/larger screens
    useEffect(() => {
        if (!isInitialMounted.current) {
            isInitialMounted.current = true;
            if (typeof window !== "undefined") {
                const isMobile = window.innerWidth < 768;
                setActiveIndex(isMobile ? 0 : 1);
            }
        }
    }, []);

    // Compute exact dimensions so that exactly 3 cards fit on desktop and 1 card on mobile
    const computeDimensions = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const availableWidth = container.clientWidth;
        if (!availableWidth) return;

        if (availableWidth >= 768) {
            // Desktop / Tablet Landscape: 3-Card Centered Stage
            setIsDesktop3Col(true);
            const maxCardW = 356;
            const maxTotalStage = 3 * maxCardW + 2 * GAP; // ~1100px
            const actualStageWidth = Math.min(availableWidth, maxTotalStage);
            const computedCardWidth = Math.floor((actualStageWidth - 2 * GAP) / 3);
            const finalCardWidth = Math.max(computedCardWidth, 260);
            const finalViewportWidth = finalCardWidth * 3 + 2 * GAP;

            setCardWidth(finalCardWidth);
            setViewportWidth(finalViewportWidth);
        } else {
            // Mobile: 1-Card Centered Stage
            setIsDesktop3Col(false);
            const finalCardWidth = Math.min(availableWidth - 20, 345);
            setCardWidth(finalCardWidth);
            setViewportWidth(finalCardWidth);
        }
    }, []);

    useEffect(() => {
        computeDimensions();
        const container = containerRef.current;
        if (!container) return;

        const observer = new ResizeObserver(() => {
            computeDimensions();
        });
        observer.observe(container);

        return () => observer.disconnect();
    }, [computeDimensions]);

    // Keep active chip centered in the index rack on mobile
    useEffect(() => {
        const pill = pillRefs.current[activeIndex];
        const rack = rackRef.current;
        if (pill && rack) {
            const pillLeft = pill.offsetLeft - rack.offsetLeft;
            const pillWidth = pill.offsetWidth;
            const rackWidth = rack.offsetWidth;
            const targetScroll = pillLeft - rackWidth / 2 + pillWidth / 2;
            rack.scrollTo({
                left: Math.max(0, targetScroll),
                behavior: "smooth",
            });
        }
    }, [activeIndex]);

    const handlePrev = () => {
        if (activeIndex > 0) {
            setActiveIndex((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (activeIndex < serviceListAreas.length - 1) {
            setActiveIndex((prev) => prev + 1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            handlePrev();
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            handleNext();
        }
    };

    // Pointer drag / swipe handlers
    const handlePointerDown = (e: React.PointerEvent) => {
        if (e.button !== 0) return;
        isPointerDown.current = true;
        pointerStartX.current = e.clientX;
        hasMovedFar.current = false;
        setIsDragging(true);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isPointerDown.current) return;
        const deltaX = e.clientX - pointerStartX.current;
        if (Math.abs(deltaX) > 6) {
            hasMovedFar.current = true;
        }

        // Dampen at bounds
        let dampedDelta = deltaX;
        if (
            (activeIndex === 0 && deltaX > 0) ||
            (activeIndex === serviceListAreas.length - 1 && deltaX < 0)
        ) {
            dampedDelta = deltaX * 0.28;
        }

        setDragOffset(dampedDelta);
    };

    const handlePointerUp = () => {
        if (!isPointerDown.current) return;
        isPointerDown.current = false;
        setIsDragging(false);

        const threshold = 40;
        if (dragOffset < -threshold && activeIndex < serviceListAreas.length - 1) {
            setActiveIndex((prev) => prev + 1);
        } else if (dragOffset > threshold && activeIndex > 0) {
            setActiveIndex((prev) => prev - 1);
        }

        setDragOffset(0);
    };

    const handlePointerCancel = () => {
        isPointerDown.current = false;
        setIsDragging(false);
        setDragOffset(0);
    };

    const handleCardClick = (e: React.MouseEvent, index: number) => {
        if (hasMovedFar.current) {
            e.preventDefault();
            return;
        }

        // If clicking a neighbor card, bring it to the CENTER instead of navigating away
        if (index !== activeIndex) {
            e.preventDefault();
            setActiveIndex(index);
        }
    };

    // Mathematical translation formula:
    // When isDesktop3Col: (viewportWidth - cardWidth) / 2 = cardWidth + GAP = S.
    // Base translate = (1 - activeIndex) * (cardWidth + GAP).
    // Center card is ALWAYS at index activeIndex.
    const baseTranslate = (viewportWidth - cardWidth) / 2 - activeIndex * (cardWidth + GAP);
    const finalTranslateX = baseTranslate + dragOffset;

    const activeService = serviceListAreas[activeIndex] || serviceListAreas[0];
    const canPrev = activeIndex > 0;
    const canNext = activeIndex < serviceListAreas.length - 1;

    return (
        <div className="services-showcase-container" ref={containerRef}>
            {/* 1. Compact Service Index: Displays all 9 services simultaneously */}
            {/* <nav
                className="services-index-rack"
                ref={rackRef}
                role="tablist"
                aria-label="Direct service category index"
            >
                {serviceListAreas.map((service, index) => {
                    const isSelected = activeIndex === index;
                    return (
                        <button
                            key={service.slug}
                            ref={(el) => {
                                pillRefs.current[index] = el;
                            }}
                            type="button"
                            role="tab"
                            aria-selected={isSelected}
                            aria-controls={`service-card-${service.slug}`}
                            className={`services-index-chip ${isSelected ? "is-active" : ""}`}
                            onClick={() => setActiveIndex(index)}
                        >
                            <span className="chip-number">0{index + 1}</span>
                            <span className="chip-title">{service.title}</span>
                        </button>
                    );
                })}
            </nav> */}

            {/* 2. Interactive Status & Controls Strip */}
            <div className="services-status-strip">
                <div className="services-status-info">
                    <span className="status-live-dot" aria-hidden="true" />
                    <span className="status-label">
                        <strong className="status-number">0{activeIndex + 1}</strong>
                        <span className="status-sep">/</span>
                        <span className="status-total">09</span>
                        <span className="status-dash" aria-hidden="true">—</span>
                        <span className="status-title">{activeService.title}</span>
                    </span>
                </div>

                <div className="services-controls-cluster">
                    <div className="services-nav-buttons" role="group" aria-label="Service navigation">
                        <button
                            type="button"
                            className="services-nav-btn prev"
                            onClick={handlePrev}
                            disabled={!canPrev}
                            aria-label="Previous service"
                        >
                            <ChevronLeft size={18} strokeWidth={2} />
                        </button>
                        <button
                            type="button"
                            className="services-nav-btn next"
                            onClick={handleNext}
                            disabled={!canNext}
                            aria-label="Next service"
                        >
                            <ChevronRight size={18} strokeWidth={2} />
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. Hairline Progress Bar */}
            <div className="services-progress-rail" aria-hidden="true">
                <div
                    className="services-progress-fill"
                    style={{
                        width: `${((activeIndex + 1) / serviceListAreas.length) * 100}%`,
                    }}
                />
            </div>

            {/* 4. Centered 3-Card Stage (Max 3 visible cards, Center card is active) */}
            <div
                className="services-3card-stage"
                style={{ width: `${viewportWidth}px` }}
                onKeyDown={handleKeyDown}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerCancel}
                onPointerCancel={handlePointerCancel}
                tabIndex={0}
                role="region"
                aria-label="Services centered carousel. Use arrow keys or controls to browse."
            >
                <div
                    className="services-3card-track"
                    style={{
                        transform: `translate3d(${finalTranslateX}px, 0, 0)`,
                        transition: isDragging
                            ? "none"
                            : "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                >
                    {serviceListAreas.map((service, index) => {
                        const ServiceIcon = service.icon;
                        const isCenter = activeIndex === index;
                        const isNeighbor = Math.abs(activeIndex - index) === 1;
                        const isFar = Math.abs(activeIndex - index) > 1;

                        const slideClass = isCenter
                            ? "is-active-center"
                            : isNeighbor
                            ? "is-neighbor-slide"
                            : "is-hidden-slide";

                        return (
                            <div
                                key={service.slug}
                                id={`service-card-${service.slug}`}
                                className={`services-3card-slide ${slideClass}`}
                                style={{
                                    width: `${cardWidth}px`,
                                    flex: `0 0 ${cardWidth}px`,
                                    maxWidth: `${cardWidth}px`,
                                }}
                            >
                                <Link
                                    className={`service-list-detail service-list-card-static service-list-card-${service.slug}`}
                                    href={`/services/${service.slug}`}
                                    onClick={(e) => handleCardClick(e, index)}
                                    tabIndex={isCenter ? 0 : -1}
                                    aria-current={isCenter ? "true" : undefined}
                                >
                                    <ServiceArtwork slug={service.slug} />
                                    <div className="service-list-card-heading">
                                        <span className="service-list-card-icon">
                                            <ServiceIcon size={22} strokeWidth={1.7} aria-hidden="true" />
                                        </span>
                                        <span className="service-list-card-number">0{index + 1}</span>
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p>{service.detail}</p>
                                    <span className="card-link">
                                        View service <ArrowUpRight size={16} aria-hidden="true" />
                                    </span>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 5. Subtle Mobile Drag Hint */}
            <div className="services-mobile-footer" aria-hidden="true">
                <span className="services-drag-hint">
                    <span className="drag-hint-pulse" />
                    Swipe or use arrows to navigate services
                </span>
            </div>
        </div>
    );
}

export default ServiceList;
