"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Facebook, Instagram, Linkedin, MessageCircle, Phone, Twitter, Youtube } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Layout, PageIntro, SectionHead, meta } from "@/components/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCms, useCmsServices } from "@/hooks/use-cms";

function whatsappHref(value: string) {
  if (value.startsWith("http")) return value;
  return `https://wa.me/${value.replace(/[^\d]/g, "")}`;
}

function phoneHref(value: string) {
  return `tel:${value.replace(/[^\d+]/g, "")}`;
}

export default function ContactPage() {
  const searchParams = useSearchParams();
  const search = { service: searchParams.get("service") ?? "" };
  const cms = useCms();
  const services = useCmsServices();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      service: String(formData.get("service") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const { error } = await supabase.from("contact_submissions").insert(payload);
      if (error) {
        setErrorMessage("Unable to send your message right now. Please try again or reach out via WhatsApp.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please reach out directly.");
    } finally {
      setLoading(false);
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
          <form onSubmit={handleSubmit}>
            <label>
              Full Name *
              <Input name="name" minLength={2} placeholder="Your name" required />
            </label>

            <label>
              Email Address *
              <Input name="email" type="email" placeholder="name@company.com" required />
            </label>

            <label>
              Phone / WhatsApp
              <Input name="phone" type="tel" placeholder={cms.settings.phone} />
            </label>

            <label>
              Service Interested In *
              <select name="service" defaultValue={search.service} required>
                <option value="">Choose a service category</option>
                {services.map((item) => (
                  <option key={item.slug} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="full">
              Project Brief / Message *
              <Textarea
                name="message"
                minLength={10}
                placeholder="Tell us about your project, goals, and ideal timeline..."
                required
                rows={7}
              />
            </label>

            {errorMessage && <p className="form-message">{errorMessage}</p>}

            <Button disabled={loading} size="lg">
              {loading ? "Sending Enquiry..." : "Send Enquiry"}
            </Button>
          </form>
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
              <span className="social-text-icon">TikTok:</span> ceasiun
            </a>
            <a href={cms.settings.discord} target="_blank" rel="noreferrer">
              <span className="social-text-icon">Discord:</span> Join Community
            </a>
          </div>

          <div className="payment-info" style={{ marginTop: "1.5rem" }}>
            <p className="eyebrow">{cms.contact.paymentEyebrow}</p>
            <p>{cms.contact.paymentCopy}</p>
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
