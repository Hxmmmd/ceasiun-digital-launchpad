import { Layout, PageIntro } from "@/components/site";

const sections = [
  ["1. Introduction", "This Privacy Policy explains how Ceasiun collects, uses, and protects information when you visit our website or contact us about our services. It applies to visitors, prospective clients, and current clients who interact with us through this website."],
  ["2. Who We Are", "Ceasiun is a digital solutions and growth partner agency, established in 2024, offering website development, digital marketing, social media management, branding, AI automation, and related digital services to businesses."],
  ["3. Information We Collect", "When you contact us or request a quote, we may collect your name, email address, phone number, company name, and project or inquiry details that you choose to share. We may also receive basic technical information from your browser or device as part of standard website operation."],
  ["4. How We Use Information", "We use information to respond to inquiries, prepare proposals, communicate about projects, provide and improve our website, maintain security, prevent misuse, and meet applicable legal or business administration obligations. We do not use submitted information for unrelated purposes."],
  ["5. Cookies and Similar Technologies", "This website may use strictly necessary cookies or similar technologies required for the site to function. Any non-essential analytics or advertising technologies will be disclosed here before they are used."],
  ["6. Third-Party Services", "We may use service providers for hosting, website operation, communication, email delivery, or other business functions. Providers that process personal information will be reviewed and listed as our technical setup evolves."],
  ["7. Data Sharing", "We may share information with service providers helping us operate the website or deliver services, professional advisers where necessary, and authorities when legally required. We do not sell personal information."],
  ["8. Data Retention", "We retain personal information only for as long as reasonably necessary for the purposes described in this policy, including legal, accounting, security, and dispute-resolution requirements."],
  ["9. Data Security", "We use reasonable technical and organizational measures intended to protect information from unauthorized access, loss, or misuse. No internet transmission or electronic storage method is completely secure."],
  ["10. International Data Transfers", "Depending on the services and infrastructure used, information may be processed in countries other than your own. The countries involved depend on the providers actively used by the website and will be updated when confirmed."],
  ["11. User Rights and Privacy Requests", "Depending on where you live and the laws that apply to you, you may have rights to access, correct, delete, restrict, object to, or receive a copy of your personal information. Contact us to exercise an applicable right or ask a question."],
  ["12. Children's Privacy", "This website is intended for businesses and individuals seeking professional digital services. It is not directed at children, and we do not knowingly collect personal information from children."],
  ["13. Third-Party Links", "Our website may contain links to third-party websites. We are not responsible for their privacy practices or content, so please review their policies before providing information."],
  ["14. Changes to This Privacy Policy", "We may update this Privacy Policy from time to time. The current version will be posted on this page with its effective and last-updated dates."],
];

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <PageIntro eyebrow="Legal" title="Privacy Policy" copy="How Ceasiun handles information shared through our website and services." />
      <main className="shell legal-page">
        <div className="legal-meta"><span>Effective date: 19 September 2026</span><span>Last updated: 19 September 2026</span></div>
        <div className="legal-content">
          <aside className="legal-toc"><p className="eyebrow">On this page</p>{sections.map(([title]) => <a key={title} href={`#${title.slice(3).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{title}</a>)}<a href="#contact-us">15. Contact Us</a></aside>
          <article>
            {sections.map(([title, body]) => <section id={title.slice(3).toLowerCase().replace(/[^a-z0-9]+/g, "-")} key={title}><h2>{title}</h2><p>{body}</p></section>)}
            <section id="contact-us"><h2>15. Contact Us</h2><p>If you have questions about this Privacy Policy or how your information is handled, contact us for privacy requests or general inquiries.</p><p><strong>WhatsApp / Phone:</strong> +92 314 0262087</p></section>
          </article>
        </div>
      </main>
    </Layout>
  );
}
