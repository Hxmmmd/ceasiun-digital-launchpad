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
  services: string[]; serviceSelections: Record<string, { subservices: string[]; discovery: string; goals: Record<string, string[]> }>; goals: string[]; situation: string[]; timeline: string; budget: string;
  projectType: string; platforms: string[]; notes: string; name: string; company: string; email: string; phone: string; contactMethod: string; files: string[];
};

const serviceQuestions: Record<string, { subservices: string[]; goals: string[]; context: string[]; scope: string[] }> = {
  "Digital Marketing": { subservices: ["Google Ads", "Meta Ads", "Search Engine Optimization", "Lead Generation", "Campaign Management", "Conversion Optimization", "Analytics", "I'm not sure what I need"], goals: ["Generate qualified leads", "Increase sales", "Drive website traffic", "Promote a service", "Increase conversions", "Launch a campaign", "Other"], context: ["No active campaigns", "Existing campaigns need improvement", "Existing website or landing page", "Existing analytics", "Not sure yet"], scope: ["Strategy", "Campaign setup", "Landing page", "Conversion tracking", "Reporting", "Ongoing management", "Other"] },
  "Website Management": { subservices: ["Maintenance", "Content Updates", "Technical Support", "Performance Optimization", "Security Updates", "Hosting Management", "Backup Management", "Ongoing Website Management", "I'm not sure what I need"], goals: ["Keep the website secure", "Improve performance", "Keep content current", "Reduce downtime", "Get technical support", "Other"], context: ["WordPress", "Shopify", "Custom website", "Website is currently offline", "Not sure yet"], scope: ["Updates", "Bug fixes", "Monitoring", "Backups", "Security", "Content changes", "Other"] },
  "Graphic Designing": { subservices: ["Social Media Designs", "Marketing Materials", "Business Documents", "Presentation Design", "Advertising Creatives", "Promotional Graphics", "I'm not sure what I need"], goals: ["Create a consistent visual style", "Improve marketing materials", "Create social content", "Prepare a campaign", "Other"], context: ["Existing brand guidelines", "Existing assets need improvement", "New campaign", "Not sure yet"], scope: ["Single project", "Monthly design support", "Campaign assets", "Templates", "Other"] },
  "Cyber Security": { subservices: ["Web Penetration Testing", "Web Application Security", "Database Security", "Network Security", "Vulnerability Assessment", "Security Audit", "Security Hardening", "Infrastructure Security", "Cloud Security", "Security Monitoring", "I'm not sure what I need"], goals: ["Improve overall security", "Identify vulnerabilities", "Secure an existing system", "Security audit / assessment", "Protect website or application", "Protect business infrastructure", "Prevent unauthorized access", "Improve security monitoring", "Investigate a security concern", "Other"], context: ["Website", "Web application", "Mobile application", "Business network", "Cloud infrastructure", "Servers", "Internal systems", "Other"], scope: ["Security assessment", "Vulnerability assessment", "Security hardening", "Monitoring", "Security audit", "Application security", "Infrastructure security", "Ongoing security support", "Other"] },
  "Website Development": { subservices: ["Business Website", "Portfolio Website", "E-commerce Website", "Custom Web Application", "Landing Page", "CMS Website", "Web Portal", "I'm not sure what I need"], goals: ["Build a new website", "Establish an online presence", "Launch an e-commerce website", "Build a custom web application", "Improve user experience", "Add specific functionality", "Integrate third-party services", "Replace an existing website", "Other"], context: ["Starting from scratch", "Existing website needs improvement", "Existing domain and hosting", "Migrating from another platform", "E-commerce project", "Custom application", "Not sure yet"], scope: ["Pages and content", "E-commerce", "Dashboard", "Authentication", "API integrations", "Payment integrations", "CMS", "Custom functionality", "Other"] },
  "Social Media Management": { subservices: ["Content Strategy", "Content Creation", "Post Design", "Posting & Scheduling", "Account Management", "Community Management", "Platform Management", "Social Media Advertising", "Analytics / Reporting", "I'm not sure what I need"], goals: ["Build a stronger social presence", "Increase audience engagement", "Maintain consistent posting", "Improve content quality", "Grow brand visibility", "Manage multiple platforms", "Improve social media strategy", "Other"], context: ["Existing accounts need management", "Launching new accounts", "Content already available", "Need content creation", "Multiple active platforms", "Not sure yet"], scope: ["Content calendar", "Posts and graphics", "Short-form video", "Community management", "Paid social support", "Influencer outreach", "Reporting and analytics", "Other"] },
  "Branding": { subservices: ["Brand Identity", "Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy", "Brand Consultancy", "Marketing Assets", "Rebranding", "I'm not sure what I need"], goals: ["Create a new brand identity", "Redesign an existing brand", "Build stronger visual identity", "Create a consistent brand system", "Improve brand presentation", "Prepare brand assets for digital platforms", "Other"], context: ["New business", "Existing logo needs improvement", "Existing colors and guidelines", "Brand feels inconsistent", "Repositioning the business", "Not sure yet"], scope: ["Logo and identity", "Brand strategy", "Typography and color", "Brand guidelines", "Social media kit", "Presentation and marketing assets", "Other"] },
  "Managed Services": { subservices: ["DevOps Managed Services", "Marketing Managed Services", "System Administration Managed Services", "Network Administration Managed Services", "Managed QA & Automated Testing", "Technical Advisory & Architecture", "I'm not sure what I need"], goals: ["Improve operational reliability", "Reduce technical overhead", "Get ongoing technical support", "Improve infrastructure management", "Other"], context: ["Existing infrastructure", "Growing technical operations", "Need ongoing support", "Not sure yet"], scope: ["Ongoing administration", "Monitoring", "Infrastructure support", "Security and maintenance", "Technical advisory", "Other"] },
  "AI / Automation": { subservices: ["AI Workflow Automation", "AI Agents", "AI Chatbots", "AI Call Agents", "WhatsApp Automation", "Lead Qualification Automation", "CRM Automation", "Business Process Automation", "Data / Document Automation", "I'm not sure what I need"], goals: ["Reduce manual work", "Automate repetitive tasks", "Improve business workflows", "Automate lead handling", "Automate customer communication", "Build an AI assistant or agent", "Connect multiple business systems", "Other"], context: ["Manual process needs improvement", "Multiple tools need connecting", "Existing CRM or database", "Customer support workflow", "Internal operations", "Not sure yet"], scope: ["Workflow automation", "WhatsApp or email", "CRM integration", "AI assistant or agent", "Lead qualification", "Document automation", "Internal dashboard", "Other"] },
};
const fallbackQuestions = { goals: ["Improve business performance", "Launch something new", "Improve an existing system", "Increase efficiency", "Reach more customers", "Other"], context: ["Starting from scratch", "Existing system needs improvement", "Existing business process", "Not sure yet"], scope: ["Strategy and planning", "Implementation", "Integration", "Ongoing support", "Other"] };
const subserviceGoals: Record<string, { question: string; goals: string[] }> = {
  "Business Website": { question: "What are you looking to achieve with your business website?", goals: ["Present our business professionally", "Generate enquiries", "Explain our services clearly", "Improve credibility", "Make it easier for customers to contact us", "Other"] },
  "Portfolio Website": { question: "What are you looking to achieve with your portfolio website?", goals: ["Showcase my work", "Present projects professionally", "Build an online presence", "Attract potential clients", "Make my work easier to view", "Establish credibility", "Other"] },
  "E-commerce Website": { question: "What are you looking to achieve with your online store?", goals: ["Sell products online", "Improve the shopping experience", "Manage products and orders", "Accept online payments", "Increase online sales", "Other"] },
  "Custom Web Application": { question: "What are you looking to achieve with your web application?", goals: ["Build a custom workflow", "Serve customers or users online", "Replace a manual process", "Connect business systems", "Create a scalable platform", "Other"] },
  "Search Engine Optimization": { question: "What are you looking to achieve with SEO?", goals: ["Improve search engine visibility", "Increase organic traffic", "Rank for relevant search terms", "Attract more qualified visitors", "Improve local search visibility", "Improve existing search performance", "Other"] },
  "Google Ads": { question: "What would you like your Google Ads campaigns to achieve?", goals: ["Generate qualified leads", "Increase sales", "Promote a specific service", "Reach high-intent searches", "Improve campaign performance", "Other"] },
  "Meta Ads": { question: "What would you like your Meta Ads campaigns to achieve?", goals: ["Reach a relevant audience", "Generate leads", "Promote products or services", "Increase engagement", "Improve campaign performance", "Other"] },
  "Brand Consultancy": { question: "What would you like to achieve through brand consultancy?", goals: ["Clarify our brand direction", "Improve brand positioning", "Make better brand decisions", "Create a consistent brand system", "Prepare for a rebrand", "Other"] },
  "AI Call Agents": { question: "What would you like your AI call agent to handle?", goals: ["Answer common questions", "Qualify incoming leads", "Book appointments", "Handle support calls", "Route calls to the right team", "Reduce missed calls", "Other"] },
  "AI Workflow Automation": { question: "What are you looking to achieve with AI workflow automation?", goals: ["Reduce manual work", "Automate repetitive tasks", "Connect business tools", "Improve operational efficiency", "Reduce errors", "Other"] },
  "DevOps Managed Services": { question: "What are you looking to achieve with DevOps managed services?", goals: ["Improve deployment processes", "Automate CI/CD", "Improve infrastructure reliability", "Improve monitoring", "Deploy faster", "Reduce operational overhead", "Other"] },
  "Marketing Managed Services": { question: "What are you looking to achieve with marketing managed services?", goals: ["Maintain consistent marketing execution", "Generate qualified leads", "Improve campaign performance", "Keep content and channels active", "Get ongoing marketing support", "Other"] },
  "System Administration Managed Services": { question: "What do you need help with in system administration managed services?", goals: ["Manage servers", "Maintain systems", "Manage users and access", "Improve monitoring", "Manage backups", "Improve infrastructure security", "Other"] },
  "Network Administration Managed Services": { question: "What do you need help with in network administration managed services?", goals: ["Set up a network", "Manage network infrastructure", "Improve monitoring", "Troubleshoot issues", "Improve network performance", "Improve network security", "Other"] },
  "Managed QA & Automated Testing": { question: "What are you looking to achieve with managed QA and automated testing?", goals: ["Improve release confidence", "Automate regression testing", "Find bugs earlier", "Improve test coverage", "Set up QA processes", "Other"] },
  "Technical Advisory & Architecture": { question: "What do you need help with in technical advisory and architecture?", goals: ["Plan a technical roadmap", "Review system architecture", "Make better technology decisions", "Prepare for scale", "Reduce technical risk", "Other"] },
};

function QuoteIntake({ services, initialService, onSubmit }: { services: ReturnType<typeof useCmsServices>; initialService: string; onSubmit: (data: QuoteData) => void }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuoteData>({ services: initialService ? [initialService] : [], serviceSelections: initialService ? { [initialService]: { subservices: [], discovery: "", goals: {} } } : {}, goals: [], situation: [], timeline: "", budget: "", projectType: "", platforms: [], notes: "", name: "", company: "", email: "", phone: "", contactMethod: "Email", files: [] });
  const [errors, setErrors] = useState<string[]>([]);
  const steps = ["Services", "Direction", "Goals", "Context", "Scope", "Timeline", "About you", "Review"];
  const update = (patch: Partial<QuoteData>) => setData((current) => ({ ...current, ...patch }));
  const toggle = (key: "services" | "goals" | "situation" | "platforms", value: string) => { setErrors([]); update({ [key]: data[key].includes(value) ? data[key].filter((item) => item !== value) : [...data[key], value] }); };
  const updateServiceSelections = (service: string, patch: Partial<{ subservices: string[]; discovery: string; goals: Record<string, string[]> }>) => update({ serviceSelections: { ...data.serviceSelections, [service]: { subservices: data.serviceSelections[service]?.subservices ?? [], discovery: data.serviceSelections[service]?.discovery ?? "", goals: data.serviceSelections[service]?.goals ?? {}, ...patch } } });
  const toggleServiceSubservice = (service: string, value: string) => { const current = data.serviceSelections[service]?.subservices ?? []; const next = value.includes("not sure") ? [value] : current.includes(value) ? current.filter((item) => item !== value) : [...current.filter((item) => !item.includes("not sure")), value]; updateServiceSelections(service, { subservices: next }); setErrors([]); };
  const toggleServiceGoal = (service: string, subservice: string, value: string) => { const current = data.serviceSelections[service]?.goals?.[subservice] ?? []; updateServiceSelections(service, { goals: { ...data.serviceSelections[service]?.goals, [subservice]: current.includes(value) ? current.filter((item) => item !== value) : [...current, value] } }); setErrors([]); };
  const selected = data.services.flatMap((service) => serviceQuestions[service] ? [serviceQuestions[service]] : []).reduce((acc, item) => ({ goals: [...new Set([...acc.goals, ...item.goals])], context: [...new Set([...acc.context, ...item.context])], scope: [...new Set([...acc.scope, ...item.scope])] }), { goals: [], context: [], scope: [] } as { goals: string[]; context: string[]; scope: string[] });
  const questions = selected.goals.length ? selected : fallbackQuestions;
  const validate = () => { const nextErrors: string[] = []; if (step === 0 && !data.services.length) nextErrors.push("Please select at least one service to continue."); if (step === 1 && data.services.some((service) => { const selection = data.serviceSelections[service]; return !selection?.subservices.length || (selection.subservices.some((item) => item.includes("not sure")) && selection.discovery.trim().length < 10); })) nextErrors.push("Choose at least one option for every selected service, or tell us what you are trying to accomplish."); if (step === 2 && data.services.some((service) => (data.serviceSelections[service]?.subservices ?? []).some((subservice) => !(data.serviceSelections[service]?.goals?.[subservice] ?? []).length))) nextErrors.push("Please choose at least one goal for every selected sub-service."); if (step === 3 && !data.situation.length) nextErrors.push("Please select at least one context option."); if (step === 4 && !data.platforms.length) nextErrors.push("Please select at least one type of work."); if (step === 4 && data.notes.trim().length < 10) nextErrors.push("Please tell us a little about your project before continuing."); if (step === 5 && !data.timeline) nextErrors.push("Please select a preferred timeline."); if (step === 6) { if (!data.name.trim()) nextErrors.push("Please enter your full name."); if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(data.email)) nextErrors.push("Invalid email address. Please enter a valid email."); if (data.phone && !/^\\+?[0-9][0-9\\s().-]{6,}$/.test(data.phone)) nextErrors.push("Please enter a valid international phone number."); } setErrors(nextErrors); return nextErrors.length === 0; };
  const next = () => { if (!validate()) return; if (step === steps.length - 1) onSubmit(data); else setStep((value) => value + 1); };
  return <div className="quote-intake">
    <div className="quote-progress" aria-label={`Project enquiry: ${steps[step] ?? "Review"}`}><div className="quote-progress-track"><span style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div><div className="quote-progress-steps"><span className="active"><b>{steps[step] ?? "Review"}</b><small>{step + 1} of {steps.length} questions</small></span></div></div>
    <div className="quote-step" key={step}>
      {step === 0 && <><p className="eyebrow">01 / SERVICES</p><h2>What would you like Ceasiun to help you with?</h2><p className="quote-helper">Choose one or more capabilities. We&apos;ll shape the next questions around your selection.</p><div className="quote-options service-options">{services.map((item) => <button type="button" className={data.services.includes(item.title) ? "selected" : ""} onClick={() => { const nextServices = data.services.includes(item.title) ? data.services.filter((service) => service !== item.title) : [...data.services, item.title]; update({ services: nextServices, serviceSelections: { ...data.serviceSelections, ...(nextServices.includes(item.title) && !data.serviceSelections[item.title] ? { [item.title]: { subservices: [], discovery: "", goals: {} } } : {}) } }); setErrors([]); }} key={item.slug}>{item.icon && <item.icon /> }<span><strong>{item.title}</strong><small>{item.short}</small></span>{data.services.includes(item.title) && <Check />}</button>)}</div></>}
      {step === 1 && <><p className="eyebrow">02 / YOUR DIRECTION</p><h2>Which part of {data.services.join(" and ")} do you need?</h2><p className="quote-helper">Choose the capabilities that best describe the project. If you&apos;re not sure, select that and we&apos;ll guide you.</p><div className="service-subservice-sections">{data.services.map((service) => { const serviceData = serviceQuestions[service]; const selection = data.serviceSelections[service] ?? { subservices: [], discovery: "", goals: {} }; if (!serviceData) return null; return <section className="service-subservice-section" key={service}><div className="service-subservice-heading"><span className="service-subservice-kicker">Selected service</span><h3>{service}</h3><p>{service === "Website Development" ? "Choose the type of website or web solution you need." : service === "Graphic Designing" ? "Choose the type of visual and design work you need." : service === "Social Media Management" ? "Choose the social media activities you want us to handle." : `Choose the capabilities you need from ${service}.`}</p></div><div className="quote-chip-grid">{serviceData.subservices.map((item) => <button type="button" className={selection.subservices.includes(item) ? "selected" : ""} onClick={() => toggleServiceSubservice(service, item)} key={item}>{item}{selection.subservices.includes(item) && <Check />}</button>)}</div>{selection.subservices.some((item) => item.includes("not sure")) && <Textarea value={selection.discovery} onChange={(event) => updateServiceSelections(service, { discovery: event.target.value })} rows={5} placeholder={`Tell us what you are trying to accomplish with ${service}...`} />}</section>; })}</div></>}
      {step === 2 && <><p className="eyebrow">03 / GOALS</p><h2>What should each selected service achieve?</h2><p className="quote-helper">Choose goals for the exact sub-services you selected.</p><div className="service-subservice-sections">{data.services.map((service) => <section className="service-subservice-section" key={service}><div className="service-subservice-heading"><span className="service-subservice-kicker">{service}</span><h3>Goals for {service}</h3></div>{(data.serviceSelections[service]?.subservices ?? []).map((subservice) => { const goalData = subserviceGoals[subservice]; const goals = goalData?.goals ?? questions.goals; const selectedGoals = data.serviceSelections[service]?.goals?.[subservice] ?? []; return <div className="service-goal-group" key={subservice}><h4>{subservice}</h4><p>{goalData?.question ?? `What are you looking to achieve with ${subservice}?`}</p><div className="quote-chip-grid">{goals.map((goal) => <button type="button" className={selectedGoals.includes(goal) ? "selected" : ""} onClick={() => toggleServiceGoal(service, subservice, goal)} key={goal}>{goal}{selectedGoals.includes(goal) && <Check />}</button>)}</div></div>; })}</section>)}</div></>}
      {step === 3 && <><p className="eyebrow">04 / CONTEXT</p><h2>Where are you starting from?</h2><p className="quote-helper">Tell us about the systems, assets, or process connected to your selected services.</p><div className="quote-options"><div className="quote-chip-grid">{questions.context.map((item) => <button type="button" className={data.situation.includes(item) ? "selected" : ""} onClick={() => toggle("situation", item)} key={item}>{item}{data.situation.includes(item) && <Check />}</button>)}</div></div></>}
      {step === 4 && <><p className="eyebrow">05 / PROJECT BRIEF</p><h2>What should we build, improve, or secure?</h2><p className="quote-helper">Select the type of work you need, then describe the outcome in your own words.</p><div className="quote-options"><div className="quote-chip-grid">{questions.scope.map((item) => <button type="button" className={data.platforms.includes(item) ? "selected" : ""} onClick={() => toggle("platforms", item)} key={item}>{item}{data.platforms.includes(item) && <Check />}</button>)}</div></div><Textarea value={data.notes} onChange={(event) => update({ notes: event.target.value })} rows={7} placeholder="Tell us about the problem, audience, existing system, and what success looks like..." /><div className="quote-upload"><Upload /><label>Reference files <small>Optional · add screenshots, briefs, or brand assets</small><input type="file" multiple onChange={(event) => update({ files: Array.from(event.target.files ?? []).map((file) => file.name) })} /></label></div></>}
      {step === 5 && <><p className="eyebrow">06 / PLANNING</p><h2>When would you like to get started?</h2><div className="quote-field-grid"><label>Preferred timeline<select value={data.timeline} onChange={(event) => update({ timeline: event.target.value })}><option value="">Choose an option</option>{["ASAP", "Within 1 month", "1–3 months", "3–6 months", "Flexible", "Just researching for now"].map((item) => <option key={item}>{item}</option>)}</select></label><label>Budget direction <small>Optional · for planning context</small><select value={data.budget} onChange={(event) => update({ budget: event.target.value })}><option value="">Choose an option</option>{["Not sure yet", "Under a certain range", "Mid-range", "Higher investment", "Prefer to discuss"].map((item) => <option key={item}>{item}</option>)}</select></label></div></>}
      {step === 6 && <><p className="eyebrow">07 / YOUR DETAILS</p><h2>Who should we speak with about this project?</h2><div className="quote-field-grid"><label>Full name *<Input value={data.name} onChange={(event) => update({ name: event.target.value })} placeholder="Your name" /></label><label>Company / business<Input value={data.company} onChange={(event) => update({ company: event.target.value })} placeholder="Your company" /></label><label>Email address *<Input type="email" value={data.email} onChange={(event) => update({ email: event.target.value })} placeholder="name@company.com" /></label><label>Phone / WhatsApp<Input value={data.phone} onChange={(event) => update({ phone: event.target.value })} placeholder="Optional" /></label></div><label>Preferred contact method<select value={data.contactMethod} onChange={(event) => update({ contactMethod: event.target.value })}><option>Email</option><option>WhatsApp</option><option>Phone call</option></select></label></>}
      {step === 7 && <><p className="eyebrow">08 / REVIEW</p><h2>Ready to start the conversation?</h2><p className="quote-helper">Review your project brief. There&apos;s no pricing calculator here — we&apos;ll use this context to prepare a thoughtful response.</p><div className="quote-review"><div className="full"><span>Services, selected areas, and goals</span><strong>{data.services.map((service) => `${service} — ${(data.serviceSelections[service]?.subservices ?? []).map((subservice) => `${subservice}: ${(data.serviceSelections[service]?.goals?.[subservice] ?? []).join(", ") || "No goal selected"}`).join(" · ")}`).join(" | ")}</strong></div><div><span>Timeline</span><strong>{data.timeline || "Flexible"}</strong></div><div><span>Contact</span><strong>{data.name} · {data.email}</strong></div><div className="full"><span>Project brief</span><strong>{data.notes}</strong></div></div></>}
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
