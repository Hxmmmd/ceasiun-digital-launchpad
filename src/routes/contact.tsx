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

const goals = ["Generate more leads", "Increase sales", "Build an online presence", "Improve brand image", "Automate business processes", "Improve customer experience", "Improve security", "Launch a new product/service"];
const situations = ["Starting from scratch", "We already have a website", "We already have social media", "We already have branding", "Existing system needs improvement", "We need ongoing management", "Not sure yet"];

function QuoteIntake({ services, initialService, onSubmit }: { services: ReturnType<typeof useCmsServices>; initialService: string; onSubmit: (data: QuoteData) => void }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuoteData>({ services: initialService ? [initialService] : [], goals: [], situation: [], timeline: "", budget: "", projectType: "", platforms: [], notes: "", name: "", company: "", email: "", phone: "", contactMethod: "Email", files: [] });
  const steps = ["Services", "Goals", "Context", "Scope", "Timeline", "About you", "Review"];
  const update = (patch: Partial<QuoteData>) => setData((current) => ({ ...current, ...patch }));
  const toggle = (key: "services" | "goals" | "situation" | "platforms", value: string) => update({ [key]: data[key].includes(value) ? data[key].filter((item) => item !== value) : [...data[key], value] });
  const canContinue = step === 0 ? data.services.length > 0 : step === 5 ? Boolean(data.name && data.email && /\\S+@\\S+\\.\\S+/.test(data.email)) : step === 3 ? data.notes.length >= 10 : true;
  const next = () => { if (!canContinue) return; if (step === steps.length - 1) onSubmit(data); else setStep((value) => value + 1); };
  return <div className="quote-intake">
    <div className="quote-progress" aria-label={`Project enquiry progress, ${step + 1} of ${steps.length}`}><div className="quote-progress-track"><span style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div><div className="quote-progress-steps">{steps.map((label, index) => <span className={index <= step ? "active" : ""} key={label}><b>{String(index + 1).padStart(2, "0")}</b>{label}</span>)}</div></div>
    <div className="quote-step" key={step}>
      {step === 0 && <><p className="eyebrow">01 / SERVICES</p><h2>What would you like Ceasiun to help you with?</h2><p className="quote-helper">Choose one or more capabilities. We&apos;ll shape the next questions around your selection.</p><div className="quote-options service-options">{services.map((item) => <button type="button" className={data.services.includes(item.title) ? "selected" : ""} onClick={() => toggle("services", item.title)} key={item.slug}>{item.icon && <item.icon /> }<span><strong>{item.title}</strong><small>{item.short}</small></span>{data.services.includes(item.title) && <Check />}</button>)}</div></>}
      {step === 1 && <><p className="eyebrow">02 / DIRECTION</p><h2>What are you looking to achieve?</h2><p className="quote-helper">Select the outcomes that matter most to your business right now.</p><div className="quote-options"><div className="quote-chip-grid">{goals.map((item) => <button type="button" className={data.goals.includes(item) ? "selected" : ""} onClick={() => toggle("goals", item)} key={item}>{item}{data.goals.includes(item) && <Check />}</button>)}</div></div></>}
      {step === 2 && <><p className="eyebrow">03 / CONTEXT</p><h2>Where are you starting from?</h2><p className="quote-helper">This helps us understand the opportunity before we recommend a direction.</p><div className="quote-options"><div className="quote-chip-grid">{situations.map((item) => <button type="button" className={data.situation.includes(item) ? "selected" : ""} onClick={() => toggle("situation", item)} key={item}>{item}{data.situation.includes(item) && <Check />}</button>)}</div></div></>}
      {step === 3 && <><p className="eyebrow">04 / PROJECT BRIEF</p><h2>Tell us what you want to build, improve, or automate.</h2><p className="quote-helper">Share the problem, the audience, what you already have, and what success looks like.</p><Textarea value={data.notes} onChange={(event) => update({ notes: event.target.value })} rows={9} placeholder="We are trying to... Our current situation is... We would like Ceasiun to help us..." /><div className="quote-upload"><Upload /><label>Reference files <small>Optional · add screenshots, briefs, or brand assets</small><input type="file" multiple onChange={(event) => update({ files: Array.from(event.target.files ?? []).map((file) => file.name) })} /></label></div></>}
      {step === 4 && <><p className="eyebrow">05 / PLANNING</p><h2>When would you like to get started?</h2><div className="quote-field-grid"><label>Preferred timeline<select value={data.timeline} onChange={(event) => update({ timeline: event.target.value })}><option value="">Choose an option</option>{["ASAP", "Within 1 month", "1–3 months", "3–6 months", "Flexible", "Just researching for now"].map((item) => <option key={item}>{item}</option>)}</select></label><label>Budget direction <small>Optional · for planning context</small><select value={data.budget} onChange={(event) => update({ budget: event.target.value })}><option value="">Choose an option</option>{["Not sure yet", "Under a certain range", "Mid-range", "Higher investment", "Prefer to discuss"].map((item) => <option key={item}>{item}</option>)}</select></label></div></>}
      {step === 5 && <><p className="eyebrow">06 / YOUR DETAILS</p><h2>Who should we speak with about this project?</h2><div className="quote-field-grid"><label>Full name *<Input value={data.name} onChange={(event) => update({ name: event.target.value })} placeholder="Your name" /></label><label>Company / business<Input value={data.company} onChange={(event) => update({ company: event.target.value })} placeholder="Your company" /></label><label>Email address *<Input type="email" value={data.email} onChange={(event) => update({ email: event.target.value })} placeholder="name@company.com" /></label><label>Phone / WhatsApp<Input value={data.phone} onChange={(event) => update({ phone: event.target.value })} placeholder="Optional" /></label></div><label>Preferred contact method<select value={data.contactMethod} onChange={(event) => update({ contactMethod: event.target.value })}><option>Email</option><option>WhatsApp</option><option>Phone call</option></select></label></>}
      {step === 6 && <><p className="eyebrow">07 / REVIEW</p><h2>Ready to start the conversation?</h2><p className="quote-helper">Review your project brief. There&apos;s no pricing calculator here — we&apos;ll use this context to prepare a thoughtful response.</p><div className="quote-review"><div><span>Services</span><strong>{data.services.join(", ")}</strong></div><div><span>Goals</span><strong>{data.goals.join(", ") || "Not specified"}</strong></div><div><span>Timeline</span><strong>{data.timeline || "Flexible"}</strong></div><div><span>Contact</span><strong>{data.name} · {data.email}</strong></div><div className="full"><span>Project brief</span><strong>{data.notes}</strong></div></div></>}
    </div>
    <div className="quote-actions">{step > 0 && <button type="button" className="quote-back" onClick={() => setStep((value) => value - 1)}><ArrowLeft /> Back</button>}<button type="button" className="quote-next" onClick={next} disabled={!canContinue}>{step === steps.length - 1 ? "Request a Quote" : "Continue"}<ArrowRight /></button></div>
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
