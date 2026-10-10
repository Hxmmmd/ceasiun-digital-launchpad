"use client";

import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown, Minus, Plus, Search, SlidersHorizontal, Rocket, ClipboardCheck, Truck, Headphones } from "lucide-react";
import { Layout } from "@/components/site";
import { services } from "@/lib/site-data";
import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { TestimonialCarousel } from "@/components/testimonial-carousel";


const serviceAreas = services.map((service) => ({
  slug: service.slug,
  title: service.title,
  detail: service.description,
  icon: service.icon,
  capabilities: service.items,
}));

const faqs = [
  ["What kind of businesses do you work with?", "Ceasiun supports traditional, growing and international businesses that need a dependable digital partner—from their first launch to ongoing technical operations."],
  ["How do you decide what to recommend?", "Services are selected according to your business requirements, current situation and final goals. We do not add unnecessary services or force you into irrelevant solutions."],
  ["How do projects begin?", "Every project starts with a conversation about the objective, current situation and desired outcome. From there, we define scope, milestones and a clear next step."],
  ["How are payments structured?", "Projects require a 30% advance followed by milestone-based payments. Local and international payment methods are available."],
];
const processSteps = [
  ["Discussion", "We understand your business, goals, current situation, expectations and the challenge you want to solve.", Search],
  ["Planning", "We examine requirements,define priorities, scope, milestones, responsibilities and the right direction for the work.", SlidersHorizontal], 
  ["Execute", "The agreed work is designed, developed, configured and progressed with clear momentum.", Rocket], 
  ["Review", "We test the work against the requirements, gather feedback and refine what matters.", ClipboardCheck], 
  ["Delivery", "The finished work is finalized, handed over and prepared for launch or everyday use.", Truck], 
  ["Support", "Post-delivery guidance, fixes and ongoing technical support continue where they are useful.", Headphones]]
  
const stats = [["200+", "Campaigns launched"], ["50+", "Happy clients"], ["5+", "Years experience"], ["4.9", "Client rating"]]

function CountUpMetric({ value, label }: { value: string; label: string }) {
  const numericValue = Number.parseFloat(value);
  const suffix = value.replace(String(numericValue), "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(numericValue * eased);
      if (progress < 1) requestAnimationFrame(frame);
    };
    const animationFrame = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animationFrame);
  }, [numericValue]);

  const formatted = numericValue % 1 === 0 ? Math.round(count).toString() : count.toFixed(1);
  return <div><strong>{formatted}{suffix}</strong><span>{label}</span></div>;
}

function ServiceExplorer() {
  return (
    <div className="service-cards" aria-label="Service areas">
      {serviceAreas.map((service) => {
        const ServiceIcon = service.icon;
        return (
          <Link className="service-detail service-card-static" href={`/services/${service.slug}`} key={service.title}>
            <div className="service-card-heading">
              <span className="service-card-icon"><ServiceIcon size={21} strokeWidth={1.7} aria-hidden="true" /></span>
              <h3>{service.title}</h3>
            </div>
            <p>{service.detail}</p>
            <ul aria-label={`${service.title} capabilities`}>
              {service.capabilities.map((capability) => <li key={capability}><Check size={14} strokeWidth={2.2} aria-hidden="true" /><span>{capability}</span></li>)}
            </ul>
            <span className="card-link">Explore capability <ArrowUpRight size={16} aria-hidden="true" /></span>
          </Link>
        );
      })}
    </div>
  );
}

const faqGroups = [
  { label: "General", items: faqs.slice(0, 2) },
  { label: "Services", items: [["How do projects begin?", "Every project starts with a conversation about the objective, current situation and desired outcome. From there, we define scope, milestones and a clear next step."]] },
  { label: "Payments", items: [faqs[3]] },
];

function Faq() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [open, setOpen] = useState(0);
  const group = faqGroups[activeGroup];
  return <div className="faq-system">
    <div className="faq-tabs" role="tablist" aria-label="FAQ categories">
      {faqGroups.map((item, index) => <button key={item.label} role="tab" aria-selected={activeGroup === index} className={activeGroup === index ? "is-active" : ""} onClick={() => { setActiveGroup(index); setOpen(0); }}>{item.label}<span>{String(item.items.length).padStart(2, "0")}</span></button>)}
    </div>
    <div className="faq-list" role="tabpanel">{group.items.map(([question, answer], index) => (
      <div className={`faq-item ${open === index ? "is-open" : ""}`} key={question}>
        <button aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}><span>{question}</span>{open === index ? <Minus size={20} /> : <Plus size={20} />}</button>
        {open === index && <p>{answer}</p>}
      </div>
    ))}</div>
  </div>;
}

export default function HomePage() {
  return <Layout>
    <a className="skip-link" href="#main">Skip to content</a>
    <div id="top" className="new-home">
      <section className="new-hero" aria-labelledby="hero-title">
        <div className="hero-tech-field" aria-hidden="true">
          <div className="signal-plane signal-plane-back" />
          <div className="signal-plane signal-plane-mid" />
          <div className="signal-plane signal-plane-front" />
          <div className="signal-route route-one"><i /><i /><i /></div>
          <div className="signal-route route-two"><i /><i /><i /></div>
          <div className="signal-route route-three"><i /><i /></div>
          <span className="data-node data-node-one" /><span className="data-node data-node-two" /><span className="data-node data-node-three" />
          <div className="system-readout"><span>LIVE SYSTEM</span><b /><small>CONNECTED / 07</small></div>
        </div>
        <div className="shell new-hero-inner">
          <p className="eyebrow">Digital growth partner / Pakistan + worldwide</p>
          <h1 id="hero-title">Take your business online.<br /><em>Build it to grow.</em></h1>
          <p className="hero-lede">Websites, software and automation that fit your business—chosen around what you actually need, not what a service menu says you should buy.</p>
          <div className="hero-actions"><Link className="button button-primary" href="/start-project">Start a project <ArrowUpRight size={18} /></Link><a className="text-link" href="#approach">See how we work <ArrowUpRight size={17} /></a></div>
          <div className="hero-note"><span className="status-dot" /> Clear scope. Milestone delivery. Ongoing support when it helps.</div>
        </div>
        <div className="hero-index" aria-hidden="true">01 <span /> 07</div>
      </section>

      <section id="trust" className="trust-strip" aria-label="Ceasiun in numbers">
        <div className="shell trust-grid">
          {stats.map(([value, label]) => <CountUpMetric key={label} value={value} label={label} />)}
        </div>
      </section>

      <main id="main">
        <section id="problem" className="new-section problem-section">
          <div className="shell problem-grid">
            <div>
              <p className="eyebrow">The gap</p>
              <h2>Digital should make business clearer, not more complicated.</h2>
            </div>
            <div className="problem-copy">
              <p>Many businesses have a website that does not bring in the right opportunities, tools that do not talk to each other, or a growing list of tasks no one has time to own.</p>
              <p>The answer is not always more software, more channels or more activity. It starts with understanding what is getting in the way.</p>
              <Link className="text-link" href="/start-project">Talk through your situation <ArrowUpRight size={17} /></Link>
            </div>
          </div>
        </section>

        <section id="approach" className="new-section approach-section">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">A considered approach</p>
              <h2>Only what your business actually needs.</h2>
              <p>We understand the business, the current situation and the final goal first. Then we recommend the right services and technology—without adding unnecessary pieces.</p>
            </div>
            <div className="approach-steps" aria-label="How a project moves from question to delivery">
              {processSteps.map((item, index) => { 
                const [step, detail, Icon] = item as [string, string, ComponentType<{ size?: number; strokeWidth?: number }>]; 
                const StepIcon = Icon;
                return <article key={step} className="approach-step">
                          <div className="approach-step-top">
                            <span className="approach-index">
                              stage:&nbsp;{String(index + 1).padStart(2, "0")} 
                            </span>
                          </div>
                          <div className="approach-step-heading">
                            <span className="approach-icon">
                              <StepIcon size={18} strokeWidth={1.8} />
                            </span>
                            <h3>{step}</h3>
                          </div>
                          <p>{detail}</p>
                        </article>;
              })}
            </div>
          </div>
        </section>

        <section id="services" className="new-section services-section">
          <div className="shell">
            <div className="section-intro compact">
              <p className="eyebrow">Capabilities</p>
              <h2>One partner across the digital work.</h2>
              <p>Explore the areas we can bring together when the requirements call for it.</p>
            </div>
            <ServiceExplorer />
          </div>
        </section>

        <section id="why" className="new-section why-section">
          <div className="shell why-grid">
            <div>
              <p className="eyebrow">Why Ceasiun</p>
              <h2>Technical depth, explained plainly.</h2>
            </div>
            <div className="why-list">
              <div>
                <span>01</span>
                <h3>Requirements before recommendations</h3>
                <p>We start with the problem to solve, not a package to sell.</p>
              </div>
              <div>
                <span>02</span>
                <h3>Connected thinking</h3>
                <p>Brand, software, marketing and infrastructure can work as one system.</p>
              </div>
              <div>
                <span>03</span>
                <h3>Clarity at every milestone</h3>
                <p>You know what is being delivered, reviewed and decided next.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="new-section work-section">
          <div className="shell work-placeholder">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>Good work should be easy to verify.</h2>
            </div>
            <p>Client stories and project results will appear here as approved case studies are ready to share. We would rather show an honest blank space than make a claim without context.</p>
          </div>
        </section>

        <section id="testimonials" className="new-section testimonials-section">
          <div className="shell">
            <div className="section-intro compact">
              <p className="eyebrow">Client perspective</p>
              <h2>Built with clarity. Remembered for the difference.</h2>
              <p>The best partnerships make the work feel simpler and the next decision feel more obvious.</p>
            </div>
            <div className="testimonial-grid">
              <figure className="testimonial-card testimonial-featured">
                <div className="quote-mark">“</div>
                <blockquote>Ceasiun helped us turn a scattered digital setup into a system our team could actually use. The process was clear from the first conversation.</blockquote>
                <figcaption>
                  <strong>Operations director</strong>
                  <span>Growing services business</span>
                </figcaption>
              </figure>
              <figure className="testimonial-card">
                <div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>Thoughtful, responsive and practical. We always knew what was happening and why.</blockquote>
                <figcaption>
                  <strong>Founder</strong>
                  <span>International business</span>
                </figcaption>
              </figure>
              <div className="google-review-card">
                <div className="google-review-top">
                  <span className="google-g">G</span>
                  <div>
                    <strong>Google reviews</strong>
                    <span>Trusted by growing teams</span>
                  </div>
                </div>
                <div className="google-score">
                  <strong>4.9</strong>
                  <span className="review-stars">★★★★★</span>
                  <small>Average client rating</small>
                </div>
                <Link className="card-link" href="/start-project">Start a conversation <ArrowUpRight size={16} /></Link>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="new-section faq-section">
          <div className="shell faq-grid">
            <div className="section-intro compact">
              <p className="eyebrow">Questions, answered</p>
              <h2>Before we begin.</h2>
              <p>A few practical details about working together.</p>
            </div>
            <Faq />
          </div>
        </section>

        <section id="start" className="new-cta">
          <div className="shell">
            <p className="eyebrow">Ready when you are</p>
            <h2>Bring the situation.<br /><em>We will help shape the next step.</em></h2>
            <Link className="button button-primary" href="/start-project">Start a project <ArrowUpRight size={18} /></Link>
          </div>
        </section>
      </main>
    </div>
  </Layout>;
}
