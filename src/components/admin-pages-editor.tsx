"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Eye, Monitor, Plus, Save, Smartphone, Tablet, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  type CmsContent,
  loadCms,
  saveCms,
  saveCmsPreview,
} from "@/lib/cms";

type PageKey =
  | "home"
  | "about"
  | "process"
  | "servicesPage"
  | "work"
  | "blog"
  | "careers"
  | "contact"
  | "cta"
  | "settings"
  | "faq"
  | "services";

const pages: { key: PageKey; label: string; preview: string }[] = [
  { key: "home", label: "Home", preview: "/" },
  { key: "about", label: "About", preview: "/about" },
  { key: "process", label: "Process", preview: "/process" },
  { key: "servicesPage", label: "Services page", preview: "/services" },
  { key: "services", label: "Service details", preview: "/services" },
  { key: "work", label: "Work", preview: "/work" },
  { key: "blog", label: "Blog", preview: "/blog" },
  { key: "careers", label: "Careers", preview: "/careers" },
  { key: "contact", label: "Contact", preview: "/contact?service=" },
  { key: "faq", label: "FAQs", preview: "/" },
  { key: "cta", label: "Global CTA", preview: "/" },
  { key: "settings", label: "Header & Footer", preview: "/" },
];

function Field({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label>
      {label}
      {rows ? (
        <Textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

export function AdminPagesEditor({ onSaved }: { onSaved: (msg: string) => void }) {
  const [cms, setCms] = useState<CmsContent>(() => loadCms());
  const [page, setPage] = useState<PageKey>("home");
  const [serviceIndex, setServiceIndex] = useState(0);
  const [previewWidth, setPreviewWidth] = useState<"100%" | "768px" | "390px">("100%");
  const [showPreview, setShowPreview] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previewPath = pages.find((p) => p.key === page)?.preview ?? "/";

  useEffect(() => {
    saveCmsPreview(cms);
    const frame = iframeRef.current;
    if (frame?.contentWindow) {
      frame.contentWindow.postMessage({ type: "ceasiun-preview", payload: cms }, "*");
    }
  }, [cms]);

  const previewSrc = useMemo(
    () => `${previewPath}${previewPath.includes("?") ? "&" : "?"}cms_preview=1`,
    [previewPath],
  );

  function publish() {
    saveCms(cms);
    onSaved("Published. The live site now shows these changes.");
  }

  function updateHome<K extends keyof CmsContent["home"]>(key: K, value: CmsContent["home"][K]) {
    setCms((c) => ({ ...c, home: { ...c.home, [key]: value } }));
  }

  const currentService = cms.services[serviceIndex] ?? cms.services[0];

  return (
    <div className="wp-cms">
      <div className="wp-cms-toolbar">
        <div className="wp-cms-pages">
          {pages.map((p) => (
            <button
              key={p.key}
              type="button"
              className={page === p.key ? "selected" : ""}
              onClick={() => setPage(p.key)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="wp-cms-actions">
          <button type="button" className="preview-toggle" onClick={() => setShowPreview((v) => !v)}>
            <Eye /> {showPreview ? "Hide preview" : "Show preview"}
          </button>
          <button
            type="button"
            className={previewWidth === "100%" ? "selected" : ""}
            onClick={() => setPreviewWidth("100%")}
            aria-label="Desktop preview"
          >
            <Monitor />
          </button>
          <button
            type="button"
            className={previewWidth === "768px" ? "selected" : ""}
            onClick={() => setPreviewWidth("768px")}
            aria-label="Tablet preview"
          >
            <Tablet />
          </button>
          <button
            type="button"
            className={previewWidth === "390px" ? "selected" : ""}
            onClick={() => setPreviewWidth("390px")}
            aria-label="Mobile preview"
          >
            <Smartphone />
          </button>
          <Button className="text-black font-bold" onClick={publish}>
            <Save /> Publish
          </Button>
        </div>
      </div>

      <div className={`wp-cms-split ${showPreview ? "" : "preview-hidden"}`}>
        <div className="wp-cms-form cms-editor">
          {page === "home" && (
            <>
              <h2>Home - Hero</h2>
              <Field label="Eyebrow" value={cms.home.heroEyebrow} onChange={(v) => updateHome("heroEyebrow", v)} />
              <Field label="Headline" value={cms.home.heroTitle} onChange={(v) => updateHome("heroTitle", v)} rows={2} />
              <Field label="Supporting copy" value={cms.home.heroCopy} onChange={(v) => updateHome("heroCopy", v)} rows={4} />
              <Field label="Button label" value={cms.home.heroCta} onChange={(v) => updateHome("heroCta", v)} />
              <Field label="Hero image alt text" value={cms.home.heroAlt} onChange={(v) => updateHome("heroAlt", v)} />
              <h2>Home - Services band</h2>
              <Field label="Eyebrow" value={cms.home.servicesEyebrow} onChange={(v) => updateHome("servicesEyebrow", v)} />
              <Field label="Title" value={cms.home.servicesTitle} onChange={(v) => updateHome("servicesTitle", v)} rows={2} />
              <Field label="Copy" value={cms.home.servicesCopy} onChange={(v) => updateHome("servicesCopy", v)} rows={3} />
              <h2>Home - Why Ceasiun</h2>
              <Field label="Eyebrow" value={cms.home.whyEyebrow} onChange={(v) => updateHome("whyEyebrow", v)} />
              <Field label="Title" value={cms.home.whyTitle} onChange={(v) => updateHome("whyTitle", v)} rows={2} />
              {cms.home.whyReasons.map((reason, i) => (
                <Field
                  key={i}
                  label={`Reason ${i + 1}`}
                  value={reason}
                  onChange={(v) => {
                    const whyReasons = [...cms.home.whyReasons];
                    whyReasons[i] = v;
                    updateHome("whyReasons", whyReasons);
                  }}
                />
              ))}
              <h2>Home - Stats</h2>
              {cms.home.stats.map((stat, i) => (
                <div className="wp-inline-pair" key={i}>
                  <label>
                    Value
                    <Input
                      type="number"
                      value={stat.value}
                      onChange={(e) => {
                        const stats = [...cms.home.stats];
                        stats[i] = { ...stat, value: Number(e.target.value) };
                        updateHome("stats", stats);
                      }}
                    />
                  </label>
                  <label>
                    Label
                    <Input
                      value={stat.label}
                      onChange={(e) => {
                        const stats = [...cms.home.stats];
                        stats[i] = { ...stat, label: e.target.value };
                        updateHome("stats", stats);
                      }}
                    />
                  </label>
                </div>
              ))}
              <h2>Home - Testimonials intro</h2>
              <Field label="Eyebrow" value={cms.home.testimonialsEyebrow} onChange={(v) => updateHome("testimonialsEyebrow", v)} />
              <Field label="Title" value={cms.home.testimonialsTitle} onChange={(v) => updateHome("testimonialsTitle", v)} />
              <Field label="Copy" value={cms.home.testimonialsCopy} onChange={(v) => updateHome("testimonialsCopy", v)} rows={3} />
              <h2>Home - FAQ intro</h2>
              <Field label="Eyebrow" value={cms.home.faqEyebrow} onChange={(v) => updateHome("faqEyebrow", v)} />
              <Field label="Title" value={cms.home.faqTitle} onChange={(v) => updateHome("faqTitle", v)} />
            </>
          )}

          {page === "about" && (
            <>
              <h2>About page</h2>
              <Field label="Eyebrow" value={cms.about.eyebrow} onChange={(v) => setCms({ ...cms, about: { ...cms.about, eyebrow: v } })} />
              <Field label="Title" value={cms.about.title} onChange={(v) => setCms({ ...cms, about: { ...cms.about, title: v } })} rows={2} />
              <Field label="Intro copy" value={cms.about.copy} onChange={(v) => setCms({ ...cms, about: { ...cms.about, copy: v } })} rows={3} />
              <Field label="Story eyebrow" value={cms.about.storyEyebrow} onChange={(v) => setCms({ ...cms, about: { ...cms.about, storyEyebrow: v } })} />
              <Field label="Story title" value={cms.about.storyTitle} onChange={(v) => setCms({ ...cms, about: { ...cms.about, storyTitle: v } })} />
              <Field label="Story paragraph 1" value={cms.about.storyP1} onChange={(v) => setCms({ ...cms, about: { ...cms.about, storyP1: v } })} rows={5} />
              <Field label="Story paragraph 2" value={cms.about.storyP2} onChange={(v) => setCms({ ...cms, about: { ...cms.about, storyP2: v } })} rows={5} />
              <Field label="Culture eyebrow" value={cms.about.cultureEyebrow} onChange={(v) => setCms({ ...cms, about: { ...cms.about, cultureEyebrow: v } })} />
              <Field label="Culture title" value={cms.about.cultureTitle} onChange={(v) => setCms({ ...cms, about: { ...cms.about, cultureTitle: v } })} />
              <Field label="Culture note" value={cms.about.cultureNote} onChange={(v) => setCms({ ...cms, about: { ...cms.about, cultureNote: v } })} rows={3} />
              {cms.about.cultureStats.map((stat, i) => (
                <div className="wp-inline-pair" key={i}>
                  <label>
                    Stat
                    <Input
                      value={stat.value}
                      onChange={(e) => {
                        const cultureStats = [...cms.about.cultureStats];
                        cultureStats[i] = { ...stat, value: e.target.value };
                        setCms({ ...cms, about: { ...cms.about, cultureStats } });
                      }}
                    />
                  </label>
                  <label>
                    Label
                    <Input
                      value={stat.label}
                      onChange={(e) => {
                        const cultureStats = [...cms.about.cultureStats];
                        cultureStats[i] = { ...stat, label: e.target.value };
                        setCms({ ...cms, about: { ...cms.about, cultureStats } });
                      }}
                    />
                  </label>
                </div>
              ))}
            </>
          )}

          {page === "process" && (
            <>
              <h2>Process page</h2>
              <Field label="Eyebrow" value={cms.process.eyebrow} onChange={(v) => setCms({ ...cms, process: { ...cms.process, eyebrow: v } })} />
              <Field label="Title" value={cms.process.title} onChange={(v) => setCms({ ...cms, process: { ...cms.process, title: v } })} />
              <Field label="Copy" value={cms.process.copy} onChange={(v) => setCms({ ...cms, process: { ...cms.process, copy: v } })} rows={3} />
              {cms.process.steps.map((step, i) => (
                <div key={i} className="cms-nested-block">
                  <Field
                    label={`Step ${i + 1} title`}
                    value={step.title}
                    onChange={(v) => {
                      const steps = [...cms.process.steps];
                      steps[i] = { ...step, title: v };
                      setCms({ ...cms, process: { ...cms.process, steps } });
                    }}
                  />
                  <Field
                    label="Description"
                    value={step.description}
                    rows={3}
                    onChange={(v) => {
                      const steps = [...cms.process.steps];
                      steps[i] = { ...step, description: v };
                      setCms({ ...cms, process: { ...cms.process, steps } });
                    }}
                  />
                </div>
              ))}
              <Field label="Engagement title" value={cms.process.engagementTitle} onChange={(v) => setCms({ ...cms, process: { ...cms.process, engagementTitle: v } })} />
              <Field label="Project model label" value={cms.process.projectLabel} onChange={(v) => setCms({ ...cms, process: { ...cms.process, projectLabel: v } })} />
              <Field label="Project model copy" value={cms.process.projectCopy} onChange={(v) => setCms({ ...cms, process: { ...cms.process, projectCopy: v } })} rows={2} />
              <Field label="Retainer label" value={cms.process.retainerLabel} onChange={(v) => setCms({ ...cms, process: { ...cms.process, retainerLabel: v } })} />
              <Field label="Retainer copy" value={cms.process.retainerCopy} onChange={(v) => setCms({ ...cms, process: { ...cms.process, retainerCopy: v } })} rows={2} />
              <Field label="Payment note" value={cms.process.payment} onChange={(v) => setCms({ ...cms, process: { ...cms.process, payment: v } })} rows={2} />
            </>
          )}

          {page === "servicesPage" && (
            <>
              <h2>Services listing</h2>
              <Field label="Eyebrow" value={cms.servicesPage.eyebrow} onChange={(v) => setCms({ ...cms, servicesPage: { ...cms.servicesPage, eyebrow: v } })} />
              <Field label="Title" value={cms.servicesPage.title} onChange={(v) => setCms({ ...cms, servicesPage: { ...cms.servicesPage, title: v } })} />
              <Field label="Copy" value={cms.servicesPage.copy} onChange={(v) => setCms({ ...cms, servicesPage: { ...cms.servicesPage, copy: v } })} rows={3} />
              <p className="form-subtext">Edit each practice under “Service details”.</p>
            </>
          )}

          {page === "services" && currentService && (
            <>
              <h2>Service details</h2>
              <label>
                Practice
                <select value={serviceIndex} onChange={(e) => setServiceIndex(Number(e.target.value))}>
                  {cms.services.map((s, i) => (
                    <option key={s.slug} value={i}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </label>
              <Field
                label="Title"
                value={currentService.title}
                onChange={(v) => {
                  const services = [...cms.services];
                  services[serviceIndex] = { ...currentService, title: v };
                  setCms({ ...cms, services });
                }}
              />
              <Field
                label="Short summary"
                value={currentService.short}
                rows={3}
                onChange={(v) => {
                  const services = [...cms.services];
                  services[serviceIndex] = { ...currentService, short: v };
                  setCms({ ...cms, services });
                }}
              />
              <Field
                label="Full description"
                value={currentService.description}
                rows={5}
                onChange={(v) => {
                  const services = [...cms.services];
                  services[serviceIndex] = { ...currentService, description: v };
                  setCms({ ...cms, services });
                }}
              />
              <Field
                label="Offerings (one per line)"
                value={currentService.items.join("\n")}
                rows={8}
                onChange={(v) => {
                  const services = [...cms.services];
                  services[serviceIndex] = {
                    ...currentService,
                    items: v.split("\n").map((x) => x.trim()).filter(Boolean),
                  };
                  setCms({ ...cms, services });
                }}
              />
              <Field
                label="Highlights (one per line)"
                value={currentService.highlights.join("\n")}
                rows={5}
                onChange={(v) => {
                  const services = [...cms.services];
                  services[serviceIndex] = {
                    ...currentService,
                    highlights: v.split("\n").map((x) => x.trim()).filter(Boolean),
                  };
                  setCms({ ...cms, services });
                }}
              />
              <Field
                label="Deliverables (one per line)"
                value={currentService.deliverables.join("\n")}
                rows={5}
                onChange={(v) => {
                  const services = [...cms.services];
                  services[serviceIndex] = {
                    ...currentService,
                    deliverables: v.split("\n").map((x) => x.trim()).filter(Boolean),
                  };
                  setCms({ ...cms, services });
                }}
              />
            </>
          )}

          {page === "work" && (
            <>
              <h2>Work page intro</h2>
              <Field label="Eyebrow" value={cms.work.eyebrow} onChange={(v) => setCms({ ...cms, work: { ...cms.work, eyebrow: v } })} />
              <Field label="Title" value={cms.work.title} onChange={(v) => setCms({ ...cms, work: { ...cms.work, title: v } })} />
              <Field label="Copy" value={cms.work.copy} onChange={(v) => setCms({ ...cms, work: { ...cms.work, copy: v } })} rows={4} />
              <p className="form-subtext">Case study cards are managed in the Case Studies tab.</p>
            </>
          )}

          {page === "blog" && (
            <>
              <h2>Blog listing intro</h2>
              <Field label="Eyebrow" value={cms.blog.eyebrow} onChange={(v) => setCms({ ...cms, blog: { ...cms.blog, eyebrow: v } })} />
              <Field label="Title" value={cms.blog.title} onChange={(v) => setCms({ ...cms, blog: { ...cms.blog, title: v } })} />
              <Field label="Copy" value={cms.blog.copy} onChange={(v) => setCms({ ...cms, blog: { ...cms.blog, copy: v } })} rows={3} />
            </>
          )}

          {page === "careers" && (
            <>
              <h2>Careers page</h2>
              <Field label="Eyebrow" value={cms.careers.eyebrow} onChange={(v) => setCms({ ...cms, careers: { ...cms.careers, eyebrow: v } })} />
              <Field label="Title" value={cms.careers.title} onChange={(v) => setCms({ ...cms, careers: { ...cms.careers, title: v } })} />
              <Field label="Copy" value={cms.careers.copy} onChange={(v) => setCms({ ...cms, careers: { ...cms.careers, copy: v } })} rows={3} />
              <Field
                label="Values (one per line)"
                value={cms.careers.values.join("\n")}
                rows={5}
                onChange={(v) =>
                  setCms({
                    ...cms,
                    careers: { ...cms.careers, values: v.split("\n").map((x) => x.trim()).filter(Boolean) },
                  })
                }
              />
            </>
          )}

          {page === "contact" && (
            <>
              <h2>Contact page</h2>
              <Field label="Eyebrow" value={cms.contact.eyebrow} onChange={(v) => setCms({ ...cms, contact: { ...cms.contact, eyebrow: v } })} />
              <Field label="Title" value={cms.contact.title} onChange={(v) => setCms({ ...cms, contact: { ...cms.contact, title: v } })} />
              <Field label="Copy" value={cms.contact.copy} onChange={(v) => setCms({ ...cms, contact: { ...cms.contact, copy: v } })} rows={3} />
              <Field label="Success title" value={cms.contact.successTitle} onChange={(v) => setCms({ ...cms, contact: { ...cms.contact, successTitle: v } })} />
              <Field label="Success copy" value={cms.contact.successCopy} onChange={(v) => setCms({ ...cms, contact: { ...cms.contact, successCopy: v } })} rows={3} />
              <Field label="Sidebar eyebrow" value={cms.contact.asideEyebrow} onChange={(v) => setCms({ ...cms, contact: { ...cms.contact, asideEyebrow: v } })} />
              <Field label="Sidebar title" value={cms.contact.asideTitle} onChange={(v) => setCms({ ...cms, contact: { ...cms.contact, asideTitle: v } })} />
              <Field label="Payment eyebrow" value={cms.contact.paymentEyebrow} onChange={(v) => setCms({ ...cms, contact: { ...cms.contact, paymentEyebrow: v } })} />
              <Field label="Payment copy" value={cms.contact.paymentCopy} onChange={(v) => setCms({ ...cms, contact: { ...cms.contact, paymentCopy: v } })} rows={3} />
              <Field label="FAQ eyebrow" value={cms.contact.faqEyebrow} onChange={(v) => setCms({ ...cms, contact: { ...cms.contact, faqEyebrow: v } })} />
              <Field label="FAQ title" value={cms.contact.faqTitle} onChange={(v) => setCms({ ...cms, contact: { ...cms.contact, faqTitle: v } })} />
            </>
          )}

          {page === "faq" && (
            <>
              <h2>FAQs (home & contact)</h2>
              {cms.faq.map(([q, a], i) => (
                <div key={i} className="cms-nested-block">
                  <Field
                    label={`Question ${i + 1}`}
                    value={q}
                    onChange={(v) => {
                      const faq = cms.faq.map((pair, idx) => (idx === i ? [v, pair[1]] : pair)) as [string, string][];
                      setCms({ ...cms, faq });
                    }}
                  />
                  <Field
                    label="Answer"
                    value={a}
                    rows={3}
                    onChange={(v) => {
                      const faq = cms.faq.map((pair, idx) => (idx === i ? [pair[0], v] : pair)) as [string, string][];
                      setCms({ ...cms, faq });
                    }}
                  />
                  <button
                    type="button"
                    className="action-btn delete"
                    onClick={() => setCms({ ...cms, faq: cms.faq.filter((_, idx) => idx !== i) })}
                  >
                    <Trash2 /> Remove
                  </button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setCms({ ...cms, faq: [...cms.faq, ["New question", "Answer"]] })}
              >
                <Plus /> Add FAQ
              </Button>
            </>
          )}

          {page === "cta" && (
            <>
              <h2>Global call to action</h2>
              <Field label="Eyebrow" value={cms.cta.eyebrow} onChange={(v) => setCms({ ...cms, cta: { ...cms.cta, eyebrow: v } })} />
              <Field label="Title" value={cms.cta.title} onChange={(v) => setCms({ ...cms, cta: { ...cms.cta, title: v } })} />
              <Field label="Button" value={cms.cta.button} onChange={(v) => setCms({ ...cms, cta: { ...cms.cta, button: v } })} />
            </>
          )}

          {page === "settings" && (
            <>
              <h2>Header, footer & contact</h2>
              <Field label="Brand name" value={cms.settings.siteName} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, siteName: v } })} />
              <Field label="Tagline" value={cms.settings.tagline} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, tagline: v } })} />
              <Field label="Header button" value={cms.settings.headerCta} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, headerCta: v } })} />
              <Field label="Footer blurb" value={cms.settings.footerBlurb} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, footerBlurb: v } })} rows={2} />
              <Field label="Footer tagline" value={cms.settings.footerTagline} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, footerTagline: v } })} rows={2} />
              <Field label="Phone" value={cms.settings.phone} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, phone: v } })} />
              <Field label="WhatsApp" value={cms.settings.whatsapp} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, whatsapp: v } })} />
              <Field label="Email" value={cms.settings.email} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, email: v } })} />
              <Field label="Announcement" value={cms.settings.announcementBanner} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, announcementBanner: v } })} />
              <label>
                Banner
                <select
                  value={cms.settings.bannerActive ? "on" : "off"}
                  onChange={(e) =>
                    setCms({ ...cms, settings: { ...cms.settings, bannerActive: e.target.value === "on" } })
                  }
                >
                  <option value="on">Visible</option>
                  <option value="off">Hidden</option>
                </select>
              </label>
              <Field label="LinkedIn" value={cms.settings.linkedin} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, linkedin: v } })} />
              <Field label="Instagram" value={cms.settings.instagram} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, instagram: v } })} />
              <Field label="Facebook" value={cms.settings.facebook} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, facebook: v } })} />
              <Field label="X" value={cms.settings.x} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, x: v } })} />
              <Field label="YouTube" value={cms.settings.youtube} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, youtube: v } })} />
              <Field label="TikTok" value={cms.settings.tiktok} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, tiktok: v } })} />
              <Field label="Discord" value={cms.settings.discord} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, discord: v } })} />
            </>
          )}
        </div>

        {showPreview && (
          <div className="wp-cms-preview">
            <div className="wp-preview-frame" style={{ width: previewWidth }}>
              <iframe
                ref={iframeRef}
                title="Live website preview"
                src={previewSrc}
                onLoad={() => {
                  iframeRef.current?.contentWindow?.postMessage(
                    { type: "ceasiun-preview", payload: cms },
                    "*",
                  );
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
