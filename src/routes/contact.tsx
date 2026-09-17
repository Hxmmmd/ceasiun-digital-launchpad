import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CheckCircle2,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Layout, PageIntro, SectionHead, meta } from "@/components/site";
import { services, faq } from "@/lib/site-data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search["service"] === "string" ? search["service"] : "",
  }),
  head: () =>
    meta(
      "Contact Us",
      "Talk to Ceasiun about your next website engineering, digital marketing, AI automation, cybersecurity, or managed services contract.",
    ),
  component: ContactPage,
});

function ContactPage() {
  const search = Route.useSearch();
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
        setErrorMessage(
          "Unable to send your message right now. Please try again or reach out via WhatsApp.",
        );
      } else {
        setSubmitted(true);
      }
    } catch (err: unknown) {
      setErrorMessage("An unexpected error occurred. Please reach out directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <PageIntro
        eyebrow="Contact Us"
        title="Let’s define the next move."
        copy="Tell us where your business is now, what needs to change, and what a successful outcome looks like."
      />

      <section className="section shell contact-grid">
        {submitted ? (
          <div className="form-success">
            <CheckCircle2 />
            <h2>Message received.</h2>
            <p>
              Thank you for reaching out. The Ceasiun team will review your enquiry and respond
              shortly.
            </p>
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
              <Input name="phone" type="tel" placeholder="+92 314 0262087" />
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

        {/* Direct Contact & Social Links */}
        <aside>
          <p className="eyebrow">Direct Contact</p>
          <h2>Prefer a conversation?</h2>

          <a href="https://wa.me/923140262087" target="_blank" rel="noreferrer">
            <MessageCircle /> WhatsApp: 0314 0262087
          </a>
          <a href="tel:+923140262087">
            <Phone /> Phone: 0314 0262087
          </a>

          <div
            className="contact-socials"
            style={{ margin: "1.5rem 0", display: "grid", gap: "0.5rem" }}
          >
            <p className="eyebrow" style={{ marginTop: "1rem" }}>
              Social Channels
            </p>
            <a href="https://linkedin.com/in/ceasiun" target="_blank" rel="noreferrer">
              <Linkedin /> LinkedIn: in/ceasiun
            </a>
            <a href="https://instagram.com/ceasiun" target="_blank" rel="noreferrer">
              <Instagram /> Instagram: ceasiun
            </a>
            <a href="https://facebook.com/ceasiun" target="_blank" rel="noreferrer">
              <Facebook /> Facebook: ceasiun
            </a>
            <a href="https://x.com/ceasiun" target="_blank" rel="noreferrer">
              <Twitter /> X (Twitter): ceasiun
            </a>
            <a href="https://youtube.com/@ceasiun" target="_blank" rel="noreferrer">
              <Youtube /> YouTube: ceasiun
            </a>
            <a href="https://tiktok.com/@ceasiun" target="_blank" rel="noreferrer">
              <span className="social-text-icon">TikTok:</span> ceasiun
            </a>
            <a href="https://discord.com/invite/AkBQH7EQM4" target="_blank" rel="noreferrer">
              <span className="social-text-icon">Discord:</span> Join Community
            </a>
          </div>

          <div className="payment-info" style={{ marginTop: "1.5rem" }}>
            <p className="eyebrow">Payment Options</p>
            <p>
              <strong>Pakistan:</strong> Easypaisa, JazzCash, Credit Card, Bank Transfer.
              <br />
              <strong>International:</strong> Payoneer, Mastercard, Visa.
            </p>
          </div>
        </aside>
      </section>

      {/* FAQ Section */}
      <section className="section shell faq">
        <SectionHead eyebrow="Before We Begin" title="Common questions answered." />
        {faq.map(([question, answer]) => (
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
