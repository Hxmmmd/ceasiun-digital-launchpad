export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  approach: string;
  result: string;
  is_visible: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "case-1",
    slug: "commerce-replatform",
    title: "Commerce Replatforming Architecture",
    category: "Website Development",
    summary:
      "A sample case-study structure showing how Ceasiun frames a complex e-commerce overhaul and custom checkout integration.",
    problem:
      "The client's existing WooCommerce store was slow, crashing under traffic, and losing ~30% of customers at checkout due to a broken payment flow.",
    approach:
      "We migrated to a custom MERN-stack e-commerce platform, rebuilt the checkout as a single-page flow, and integrated Stripe + JazzCash payment gateways.",
    result:
      "Checkout drop-off reduced by 38%. Page load improved from 7.2s → 1.4s. Revenue increased 22% in the first month post-launch.",
    is_visible: true,
  },
  {
    id: "case-2",
    slug: "automation-operations",
    title: "Operations & CRM AI Automation",
    category: "AI / Automation",
    summary:
      "A sample engagement mapping fragmented operational tasks into an automated AI workflow.",
    problem:
      "The operations team was spending 3+ hours/day on repetitive data entry, follow-up emails, and lead status updates across three disconnected tools.",
    approach:
      "Built a Make.com automation pipeline connecting CRM, Gmail, WhatsApp Business, and Google Sheets. Added an AI layer for lead scoring and auto-response.",
    result:
      "Saved 18 hours/week across the team. Lead response time went from 4 hours → 8 minutes. CRM accuracy improved from ~60% → 98%.",
    is_visible: true,
  },
  {
    id: "case-3",
    slug: "brand-system",
    title: "Digital Brand Identity System",
    category: "Branding",
    summary:
      "A sample identity guide and digital rollout designed for visual clarity across all digital channels.",
    problem:
      "The startup had inconsistent visual assets across their website, social profiles, and pitch deck — creating a fragmented brand impression with investors.",
    approach:
      "Created a comprehensive brand system including logo suite, typography hierarchy, color palette, iconography, and usage guidelines in a Figma Brand Book.",
    result:
      "Secured seed funding round within 3 months of rebrand. Social engagement increased 45%. Website bounce rate dropped from 72% → 41%.",
    is_visible: true,
  },
];

