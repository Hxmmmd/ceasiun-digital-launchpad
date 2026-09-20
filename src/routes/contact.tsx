"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Facebook, Gamepad2, Instagram, Linkedin, MessageCircle, Music2, Phone, Twitter, Upload, Youtube } from "lucide-react";
import { Layout, PageIntro, SectionHead, meta } from "@/components/site";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCms, useCmsServices } from "@/hooks/use-cms";

function whatsappHref(value: string) {
  if (value.startsWith("http")) return value;
  return `https://wa.me/${value.replace(/[^\d]/g, "")}`;
}

function phoneHref(value: string) {
  if (value.startsWith("http")) return value;
  return `tel:${value.replace(/[^\d+]/g, "")}`;
}

type QuoteData = {
  services: string[]; goals: string[]; situation: string[]; timeline: string; budget: string;
  projectType: string; platforms: string[]; notes: string; name: string; company: string; email: string; phone: string; contactMethod: string; files: string[];
};

const serviceQuestions: Record<string, { goals: string[]; context: string[]; scope: string[] }> = {
  "Cyber Security": { goals: ["Improve overall security", "Identify vulnerabilities", "Secure an existing system", "Security audit / assessment", "Protect website or application", "Protect business infrastructure", "Prevent unauthorized access", "Improve security monitoring", "Investigate a security concern", "Other"], context: ["Website", "Web application", "Mobile application", "Business network", "Cloud infrastructure", "Servers", "Internal systems", "Other"], scope: ["Security assessment", "Vulnerability assessment", "Security hardening", "Monitoring", "Security audit", "Application security", "Infrastructure security", "Ongoing security support", "Other"] },
  "Website Development": { goals: ["Build a new website", "Establish an online presence", "Launch an e-commerce website", "Build a custom web application", "Improve user experience", "Add specific functionality", "Integrate third-party services", "Replace an existing website", "Other"], context: ["Starting from scratch", "Existing website needs improvement", "Existing domain and hosting", "Migrating from another platform", "E-commerce project", "Custom application", "Not sure yet"], scope: ["Pages and content", "E-commerce", "Dashboard", "Authentication", "API integrations", "Payment integrations", "CMS", "Custom functionality", "Other"] },
  "Social Media Management": { goals: ["Build a stronger social presence", "Increase audience engagement", "Maintain consistent posting", "Improve content quality", "Grow brand visibility", "Manage multiple platforms", "Improve social media strategy", "Other"], context: ["Existing accounts need management", "Launching new accounts", "Content already available", "Need content creation", "Multiple active platforms", "Not sure yet"], scope: ["Content calendar", "Posts and graphics", "Short-form video", "Community management", "Paid social support", "Influencer outreach", "Reporting and analytics", "Other"] },
  "Branding": { goals: ["Create a new brand identity", "Redesign an existing brand", "Build stronger visual identity", "Create a consistent brand system", "Improve brand presentation", "Prepare brand assets for digital platforms", "Other"], context: ["New business", "Existing logo needs improvement", "Existing colors and guidelines", "Brand feels inconsistent", "Repositioning the business", "Not sure yet"], scope: ["Logo and identity", "Brand strategy", "Typography and color", "Brand guidelines", "Social media kit", "Presentation and marketing assets", "Other"] },
  "AI / Automation": { goals: ["Reduce manual work", "Automate repetitive tasks", "Improve business workflows", "Automate lead handling", "Automate customer communication", "Build an AI assistant or agent", "Connect multiple business systems", "Other"], context: ["Manual process needs improvement", "Multiple tools need connecting", "Existing CRM or database", "Customer support workflow", "Internal operations", "Not sure yet"], scope: ["Workflow automation", "WhatsApp or email", "CRM integration", "AI assistant or agent", "Lead qualification", "Document automation", "Internal dashboard", "Other"] },
};
const fallbackQuestions = { goals: ["Improve business performance", "Launch something new", "Improve an existing system", "Increase efficiency", "Reach more customers", "Other"], context: ["Starting from scratch", "Existing system needs improvement", "Existing business process", "Not sure yet"], scope: ["Strategy and planning", "Implementation", "Integration", "Ongoing support", "Other"] };

function QuoteIntake({ services, initialService, onSubmit }: { services: ReturnType<typeof useCmsServices>; initialService: string; onSubmit: (data: QuoteData) => void }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuoteData>({ services: initialService ? [initialService] : [], goals: [], situation: [], timeline: "", budget: "", projectType: "", platforms: [], notes: "", name: "", company: "", email: "", phone: "", contactMethod: "Email", files: [] });
  const [errors, setErrors] = useState<string[]>([]);
  const steps = ["Services", "Goals", "Context", "Scope", "Timeline", "About you", "Review"];
  const update = (patch: Partial<QuoteData>) => setData((current) => ({ ...current, ...patch }));
  const toggle = (key: "services" | "goals" | "situation" | "platforms", value: string) => { setErrors([]); update({ [key]: data[key].includes(value) ? data[key].filter((item) => item !== value) : [...data[key], value] }); };
  const selected = data.services.flatMap((service) => serviceQuestions[service] ? [serviceQuestions[service]] : []).reduce((acc, item) => ({ goals: [...new Set([...acc.goals, ...item.goals])], context: [...new Set([...acc.context, ...item.context])], scope: [...new Set([...acc.scope, ...item.scope])] }), { goals: [], context: [], scope: [] } as { goals: string[]; context: string[]; scope: string[] });
  const questions = selected.goals.length ? selected : fallbackQuestions;
  const validate = () => { const nextErrors: string[] = []; if (step === 0 && !data.services.length) nextErrors.push("Please select at least one service to continue."); if (step === 1 && !data.goals.length) nextErrors.push("Please select at least one relevant goal."); if (step === 2 && !data.situation.length) nextErrors.push("Please select at least one context option."); if (step === 3 && !data.platforms.length) nextErrors.push("Please select at least one type of work."); if (step === 3 && data.notes.trim().length < 10) nextErrors.push("Please tell us a little about your project before continuing."); if (step === 4 && !data.timeline) nextErrors.push("Please select a preferred timeline."); if (step === 5) { if (!data.name.trim()) nextErrors.push("Please enter your full name."); if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(data.email)) nextErrors.push("Invalid email address. Please enter a valid email."); if (data.phone && !/^\\+?[0-9][0-9\\s().-]{6,}$/.test(data.phone)) nextErrors.push("Please enter a valid international phone number."); } setErrors(nextErrors); return nextErrors.length === 0; };
  const next = () => { if (!validate()) return; if (step === steps.length - 1) onSubmit(data); else setStep((value) => value + 1); };
  return <div className="quote-intake">
    <div className="quote-progress" aria-label={`Project enquiry progress, ${step + 1} of ${steps.length}`}><div className="quote-progress-track"><span style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div><div className="quote-progress-steps">{steps.map((label, index) => <span className={index <= step ? "active" : ""} key={label}><b>{String(index + 1).padStart(2, "0")}</b>{label}</span>)}</div></div>
    <div className="quote-step" key={step}>
      {step === 0 && <><p className="eyebrow">01 / SERVICES</p><h2>What would you like Ceasiun to help you with?</h2><p className="quote-helper">Choose one or more capabilities. We&apos;ll shape the next questions around your selection.</p><div className="quote-options service-options">{services.map((item) => <button type="button" className={data.services.includes(item.title) ? "selected" : ""} onClick={() => toggle("services", item.title)} key={item.slug}>{item.icon && <item.icon /> }<span><strong>{item.title}</strong><small>{item.short}</small></span>{data.services.includes(item.title) && <Check />}</button>)}</div></>}
      {step === 1 && <><p className="eyebrow">02 / DIRECTION</p><h2>What are you looking to achieve?</h2><p className="quote-helper">Questions tailored to {data.services.join(", ")}.</p><div className="quote-options"><div className="quote-chip-grid">{questions.goals.map((item) => <button type="button" className={data.goals.includes(item) ? "selected" : ""} onClick={() => toggle("goals", item)} key={item}>{item}{data.goals.includes(item) && <Check />}</button>)}</div></div></>}
      {step === 2 && <><p className="eyebrow">03 / CONTEXT</p><h2>Where are you starting from?</h2><p className="quote-helper">Tell us about the systems, assets, or process connected to your selected services.</p><div className="quote-options"><div className="quote-chip-grid">{questions.context.map((item) => <button type="button" className={data.situation.includes(item) ? "selected" : ""} onClick={() => toggle("situation", item)} key={item}>{item}{data.situation.includes(item) && <Check />}</button>)}</div></div></>}
      {step === 3 && <><p className="eyebrow">04 / PROJECT BRIEF</p><h2>What should we build, improve, or secure?</h2><p className="quote-helper">Select the type of work you need, then describe the outcome in your own words.</p><div className="quote-options"><div className="quote-chip-grid">{questions.scope.map((item) => <button type="button" className={data.platforms.includes(item) ? "selected" : ""} onClick={() => toggle("platforms", item)} key={item}>{item}{data.platforms.includes(item) && <Check />}</button>)}</div></div><Textarea value={data.notes} onChange={(event) => update({ notes: event.target.value })} rows={7} placeholder="Tell us about the problem, audience, existing system, and what success looks like..." /><div className="quote-upload"><Upload /><label>Reference files <small>Optional · add screenshots, briefs, or brand assets</small><input type="file" multiple onChange={(event) => update({ files: Array.from(event.target.files ?? []).map((file) => file.name) })} /></label></div></>}
      {step === 4 && <><p className="eyebrow">05 / PLANNING</p><h2>When would you like to get started?</h2><div className="quote-field-grid"><label>Preferred timeline<select value={data.timeline} onChange={(event) => update({ timeline: event.target.value })}><option value="">Choose an option</option>{["ASAP", "Within 1 month", "1–3 months", "3–6 months", "Flexible", "Just researching for now"].map((item) => <option key={item}>{item}</option>)}</select></label><label>Budget direction <small>Optional · for planning context</small><select value={data.budget} onChange={(event) => update({ budget: event.target.value })}><option value="">Choose an option</option>{["Not sure yet", "Under a certain range", "Mid-range", "Higher investment", "Prefer to discuss"].map((item) => <option key={item}>{item}</option>)}</select></label></div></>}
      {step === 5 && <><p className="eyebrow">06 / YOUR DETAILS</p><h2>Who should we speak with about this project?</h2><div className="quote-field-grid"><label>Full name *<Input value={data.name} onChange={(event) => update({ name: event.target.value })} placeholder="Your name" /></label><label>Company / business<Input value={data.company} onChange={(event) => update({ company: event.target.value })} placeholder="Your company" /></label><label>Email address *<Input type="email" value={data.email} onChange={(event) => update({ email: event.target.value })} placeholder="name@company.com" /></label><label>Phone / WhatsApp<Input value={data.phone} onChange={(event) => update({ phone: event.target.value })} placeholder="Optional" /></label></div><label>Preferred contact method<select value={data.contactMethod} onChange={(event) => update({ contactMethod: event.target.value })}><option>Email</option><option>WhatsApp</option><option>Phone call</option></select></label></>}
      {step === 6 && <><p className="eyebrow">07 / REVIEW</p><h2>Ready to start the conversation?</h2><p className="quote-helper">Review your project brief. There&apos;s no pricing calculator here — we&apos;ll use this context to prepare a thoughtful response.</p><div className="quote-review"><div><span>Services</span><strong>{data.services.join(", ")}</strong></div><div><span>Goals</span><strong>{data.goals.join(", ") || "Not specified"}</strong></div><div><span>Timeline</span><strong>{data.timeline || "Flexible"}</strong></div><div><span>Contact</span><strong>{data.name} · {data.email}</strong></div><div className="full"><span>Project brief</span><strong>{data.notes}</strong></div></div></>}
    </div>
    {errors.length > 0 && <div className="quote-errors" role="alert" aria-live="polite">{errors.map((error) => <p key={error}>{error}</p>)}</div>}
    <div className="quote-actions">{step > 0 && <button type="button" className="quote-back" onClick={() => { setErrors([]); setStep((value) => value - 1); }}><ArrowLeft /> Back</button>}<button type="button" className="quote-next" onClick={next}>{step === steps.length - 1 ? "Request a Quote" : "Continue"}<ArrowRight /></button></div>
  </div>;
}

export default function ContactPage() {
  const searchParams = useSearchParams();
  const search = { service: searchParams.get("service") ?? "" };
  const cms = useCms();
  const services = useCmsServices();
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(payload: QuoteData) {
    setErrorMessage("");
    try {
      const submissions = JSON.parse(localStorage.getItem("ceasiun_contact_submissions") ?? "[]");
      localStorage.setItem("ceasiun_contact_submissions", JSON.stringify([...submissions, { ...payload, created_at: new Date().toISOString() }]));
      setSubmitted(true);
    } catch {
      setErrorMessage("Unable to save your project brief right now. Please reach out directly.");
    }
  }

  return (
    <Layout>
      <PageIntro eyebrow={cms.contact.eyebrow} title={cms.contact.title} copy={cms.contact.copy} />

      <section className="section shell contact-grid">
        {submitted ? (
          <div className="form-success">
            <CheckCircle2 />
            <h2>{cms.contact.successTitle}</h2>
            <p>{cms.contact.successCopy}</p>
          </div>
        ) : (
          <QuoteIntake services={services} initialService={search.service} onSubmit={handleSubmit} />
        )}

        <aside>
          <p className="eyebrow">{cms.contact.asideEyebrow}</p>
          <h2>{cms.contact.asideTitle}</h2>

          <a href={whatsappHref(cms.settings.whatsapp)} target="_blank" rel="noreferrer">
            <MessageCircle /> WhatsApp: {cms.settings.phone}
          </a>
          <a href={phoneHref(cms.settings.phone)}>
            <Phone /> Phone: {cms.settings.phone}
          </a>

          <div className="contact-socials" style={{ margin: "1.5rem 0", display: "grid", gap: "0.5rem" }}>
            <p className="eyebrow" style={{ marginTop: "1rem" }}>
              Social Channels
            </p>
            <a href={cms.settings.linkedin} target="_blank" rel="noreferrer">
              <Linkedin /> LinkedIn
            </a>
            <a href={cms.settings.instagram} target="_blank" rel="noreferrer">
              <Instagram /> Instagram
            </a>
            <a href={cms.settings.facebook} target="_blank" rel="noreferrer">
              <Facebook /> Facebook
            </a>
            <a href={cms.settings.x} target="_blank" rel="noreferrer">
              <Twitter /> X (Twitter)
            </a>
            <a href={cms.settings.youtube} target="_blank" rel="noreferrer">
              <Youtube /> YouTube
            </a>
            <a href={cms.settings.tiktok} target="_blank" rel="noreferrer">
              <Music2 aria-hidden="true" /> TikTok
            </a>
            <a href={cms.settings.discord} target="_blank" rel="noreferrer">
              <Gamepad2 aria-hidden="true" /> Discord Join Community
            </a>
          </div>

        </aside>
      </section>

      <section className="section shell faq">
        <SectionHead eyebrow={cms.contact.faqEyebrow} title={cms.contact.faqTitle} />
        {cms.faq.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <span>+</span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
    </Layout>
  );
}
