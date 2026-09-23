# Ceasiun Digital Launchpad — Site Handoff

This document is a complete handoff for another AI agent working on the Ceasiun website. It explains the current site map, content model, editable areas, implementation conventions, and known behavior.

## 1. Project identity

- **Brand:** Ceasiun
- **Tagline:** Your Digital Growth Partner
- **Primary positioning:** A digital growth partner combining engineering, growth marketing, design, branding, AI/automation, cybersecurity, and managed operations.
- **Founded:** 2024
- **Team count shown in content:** 21
- **Primary contact:** `contact@ceasiun.com`
- **Phone:** `0314 0262087`
- **WhatsApp:** `+923140262087`
- **Visual direction:** Dark, editorial, premium B2B digital studio. Near-black backgrounds, warm off-white typography, mint/cyan accent, thin borders, large expressive headings, restrained motion, and responsive mobile-first layouts.

Do not introduce generic startup gradients, excessive rounded cards, emoji icons, or unrelated visual styles. Preserve the existing dark Ceasiun identity.

## 2. Runtime and structure

The project is a TanStack Start/Vite-style application currently being migrated toward Next.js App Router. There are two layers:

- `src/routes/` contains the main route components and business/UI logic.
- `src/app/` contains route wrappers used by the Next.js App Router.
- `src/components/` contains shared site UI and admin components.
- `src/lib/` contains static data, CMS helpers, product data, and utilities.
- `src/styles.css` contains the global design system and page styles.
- `src/assets/` contains local brand and work imagery.

The active migration plan is in `v0_plans/strategic-draft.md`. It recommends completing the TanStack Start to Next.js migration while preserving current content, styles, Supabase behavior, and client-side CMS behavior.

## 3. Public site map

### `/`
Homepage. Main sections include:

1. Hero / positioning statement
2. Services overview
3. Why Ceasiun / differentiators
4. Stats
5. Testimonials or approved client perspective
6. FAQ
7. CTA
8. Process preview section (the standalone Process page was removed from navigation and its content was moved to the homepage)

The homepage uses CMS content from `loadCms()` through `useCms()` where applicable. Main route component: `src/routes/index.tsx`. App wrapper: `src/app/page.tsx`.

### `/services`
Services index page showing the nine core capabilities. Main component: `src/routes/services.tsx`; wrapper: `src/app/services/page.tsx`.

### `/services/[slug]`
Dynamic service detail page. Examples:

- `/services/web-development`
- `/services/marketing`
- `/services/social`
- `/services/design`
- `/services/branding`
- `/services/automation`
- `/services/security`
- `/services/management`
- `/services/managed`

Main component: `src/routes/services.$slug.tsx`; wrapper: `src/app/services/[slug]/page.tsx`.

### `/services/[slug]/[subslug]`
Dynamic sub-service detail page. Example:

- `/services/managed/devops-managed-services`

Main component: `src/routes/services.$slug.$subslug.tsx`; wrapper: `src/app/services/[slug]/[subslug]/page.tsx`.

### `/products`
Product showcase page for Ceasiun-built products. Products represent industry-focused systems made by Ceasiun. Current default products:

- Logistics Command — Logistics & Distribution
- Clinic Flow — Healthcare
- Retail Pulse — Retail & Commerce

Main component: `src/routes/products.tsx`; wrapper: `src/app/products/page.tsx`; data model: `src/lib/products.ts`.

### `/products/[slug]`
Dynamic product detail page. Main component: `src/routes/products.$slug.tsx`; wrapper: `src/app/products/[slug]/page.tsx`.

### `/work`
Portfolio / work index page using sample case-study structures until verified client case studies are published with consent. Main component: `src/routes/work.tsx`; wrapper: `src/app/work/page.tsx`.

### `/work/[slug]`
Dynamic case-study detail page. Main component: `src/routes/work.$slug.tsx`; wrapper: `src/app/work/[slug]/page.tsx`.

### `/about`
Company story, culture, and team statistics. Main component: `src/routes/about.tsx`; wrapper: `src/app/about/page.tsx`.

### `/blog`
Insights and articles index. Main component: `src/routes/blog.tsx`; wrapper: `src/app/blog/page.tsx`.

### `/blog/[slug]`
Dynamic article detail page. Main component: `src/routes/blog.$slug.tsx`; wrapper: `src/app/blog/[slug]/page.tsx`.

### `/careers`
Careers page with Ceasiun values and opportunities. Main component: `src/routes/careers.tsx`; wrapper: `src/app/careers/page.tsx`.

### `/contact`
Multi-step project discovery form. Main component: `src/routes/contact.tsx`; wrapper: `src/app/contact/page.tsx`.

The flow collects:

1. Contact details
2. Services
3. Selected sub-services / direction
4. Goals
5. Current context
6. Scope / deliverables
7. Project notes and files
8. Review and submission

Important behavior:

- Service-specific options must remain service-specific.
- Goals describe the desired outcome.
- Context describes the current setup, assets, systems, or readiness.
- Scope describes requested deliverables, work areas, or ongoing support.
- Do not use Cyber Security options as fallback options for Graphic Designing, Branding, Website Development, or unrelated services.
- Phone input formats international numbers while typing. Example: `+923001234567` becomes `+92 300 1234567`.
- Phone label displays optional status beside the heading: `Phone / WhatsApp (optional)`.
- Email and phone validation trim whitespace.
- The `service` query parameter can preselect a service.

### `/auth`
Authentication page. Main component: `src/routes/auth.tsx`; wrapper: `src/app/auth/page.tsx`.

### `/admin`
Authenticated admin dashboard. Main component: `src/routes/_authenticated/admin.tsx`; wrapper: `src/app/admin/page.tsx`.

### Legal routes

- `/privacy-policy`
- `/terms-and-conditions`
- `/disclaimer`

Their route components are in `src/routes/` and wrappers are in `src/app/`.

### Error routes

- `src/app/error.tsx`
- `src/app/not-found.tsx`

Do not remove the error reporting behavior when changing these files.

## 4. Core service content

The canonical static service data is `src/lib/site-data.ts`, exported as `services`.

### Website Development
Slug: `web-development`

Sub-services:

- WordPress Development
- WooCommerce Development
- Shopify Development
- Custom E-commerce Platforms
- MERN Stack Applications
- Landing Pages & Portfolios
- Custom Corporate Websites
- SaaS Product Development

Positioning: high-performance websites, commerce platforms, SaaS, and custom digital products.

### Digital Marketing
Slug: `marketing`

Sub-services:

- SEO (Search Engine Optimization)
- Social Media Marketing
- Content Writing & Strategy
- Google Ads (PPC & Search)
- Meta Ads (Facebook & Instagram)

Positioning: measurable search, content, and paid growth systems.

### Social Media Management
Slug: `social`

Sub-services:

- Social Media Account Setup & Optimization
- Multi-Platform Brand Management
- Posts, Reels & Stories Visual Creation
- Customer Inbox & Comment Moderation
- B2B & B2C Client Outreach
- 24/7 Brand Monitoring & Support

Positioning: always-on brand operations, publishing, outreach, and support.

### Graphic Designing
Slug: `design`

Sub-services:

- UI / UX Design for Web & Mobile
- Logo & Brand Icon Design
- Digital Marketing Collateral
- Social Media Graphics & Banners
- Presentation Decks & Pitch Kits

Positioning: visual communication across product, UI, logo, marketing collateral, and digital touchpoints.

### Branding
Slug: `branding`

Sub-services:

- Brand Guide & Brand Book
- Brand Strategy & Positioning
- Product & Package Branding
- Social Media Brand Systems
- Typography & Color Palette
- Brand Consultancy & Audits

Positioning: recognizable, coherent strategy and visual identity systems.

### AI / Automation
Slug: `automation`

Sub-services:

- Custom AI Agent Development
- Automated Workflow Integration
- AI Chatbot Development for Web & WhatsApp
- Sales & Lead CRM Automation
- Internal Business Process Automations
- AI Search Engine Visibility (LLM Optimization)
- AI-Powered SEO Systems

Positioning: practical AI systems, agents, bots, and workflows that remove manual work.

### Cyber Security
Slug: `security`

Sub-services:

- Website Penetration Testing
- DDoS Mitigation & Management
- SSL / TLS Infrastructure Setup
- Security Vulnerability Audits
- Malware Removal & Cleanups
- Web Application Firewall (WAF) Setup

Positioning: defensive services that protect websites, data, and operational continuity.

### Website Management
Slug: `management`

Sub-services:

- Continuous Website Upkeep & Plugin Updates
- Performance & Speed Optimization
- 24/7 Uptime & Server Health Monitoring
- Regular Content & Asset Updates
- Bug Fixes & Technical Troubleshooting
- Automated Cloud Backups & Recovery

Positioning: ongoing upkeep, security, optimization, monitoring, and support.

### Managed Services Contract
Slug: `managed`

Sub-services:

- DevOps Managed Services
- Marketing Managed Services
- System Administration Managed Services
- Network Administration Managed Services
- Managed QA & Automated Testing
- Technical Advisory & Architecture

Positioning: senior technical capability and engineering operations without full-time hiring overhead.

## 5. Site navigation

Canonical navigation is exported as `nav` in `src/lib/site-data.ts`:

```text
Home       /
Services   /services
Work       /work
Products   /products
About      /about
Blog       /blog
```

The old standalone `/process` route was removed from the App Router and replaced by homepage process content. Do not restore it unless specifically requested.

Shared header, mobile navigation, footer, and CTA behavior are in `src/components/site.tsx`.

## 6. CMS and editable content

CMS implementation is in `src/lib/cms.ts` and `src/hooks/use-cms.ts`.

Important constants:

- `CMS_STORAGE_KEY = "ceasiun_cms_pages"`
- `CMS_PREVIEW_KEY = "ceasiun_cms_preview"`
- `CMS_EVENT = "ceasiun-cms-updated"`

The canonical default content object is `defaultCms` in `src/lib/cms.ts`. It contains:

- `settings`
- `cta`
- `home`
- `about`
- `process`
- `servicesPage`
- `work`
- `blog`
- `careers`
- `contact`
- `faq`
- `services`

The process CMS content includes:

- `eyebrow`
- `title`
- `copy`
- eight `steps` with title and description
- `engagementTitle`
- `projectLabel`
- `projectCopy`
- `retainerLabel`
- `retainerCopy`
- `payment`

The homepage process preview should use `cms.process`. If editing the process content, update the CMS data shape and admin editor consistently.

CMS currently uses browser storage for editing/preview behavior. Do not replace it with a new persistence layer without checking existing patterns and user requirements.

## 7. Admin panel

Admin route: `/admin`.

Main admin implementation: `src/routes/_authenticated/admin.tsx`.

Shared page editor: `src/components/admin-pages-editor.tsx`.

The admin dashboard includes content sections such as:

- Site settings
- Homepage/page content
- Services
- Blog posts
- Case studies
- Products
- Testimonials
- Careers/openings or other content controls present in the current dashboard

Products admin component: `src/components/products-admin.tsx`.

Product storage:

- `PRODUCT_STORAGE_KEY = "ceasiun_products"`
- `defaultProducts` in `src/lib/products.ts`
- `readProducts()` reads browser localStorage and falls back to defaults

Product fields:

```ts
{
  id: string;
  slug: string;
  name: string;
  industry: string;
  summary: string;
  description: string;
  capabilities: string[];
  isVisible: boolean;
}
```

When adding product editing functionality, preserve:

- unique stable IDs
- URL-safe slugs
- visible/hidden state
- detail page lookup by slug
- capability list editing
- responsive admin UI
- no hardcoded product rendering outside the data layer

## 8. Product content

Products are not generic portfolio items. They represent repeatable or industry-focused digital products created by Ceasiun.

Current examples:

### Logistics Command
Industry: Logistics & Distribution

Summary: A connected operations platform for dispatch, fleet visibility, and delivery coordination.

Capabilities:

- Dispatch management
- Fleet visibility
- Operations dashboards

### Clinic Flow
Industry: Healthcare

Summary: A patient coordination system designed to reduce friction from booking through follow-up.

Capabilities:

- Appointment workflows
- Patient communication
- Follow-up automation

### Retail Pulse
Industry: Retail & Commerce

Summary: A commerce intelligence product connecting customer activity, inventory signals, and growth decisions.

Capabilities:

- Commerce analytics
- Inventory signals
- Growth reporting

## 9. Work and content honesty rules

Current work entries are sample structures until verified client case studies are approved. The CMS copy explicitly says sample entries demonstrate the Problem → Approach → Result framework.

Do not invent client names, logos, revenue numbers, testimonials, team profiles, or case-study outcomes. Unverified content should be labeled as sample/demo content or omitted.

## 10. Design system guidance

- Use semantic existing tokens from `src/styles.css`.
- Prefer Flexbox for one-dimensional layouts and CSS Grid for structured card/list layouts.
- Keep layouts mobile-first.
- Use no more than a small accessible palette: near-black, warm off-white, muted gray, mint/cyan accent, and border gray.
- Keep typography editorial and high contrast.
- Use semantic elements: `header`, `main`, `section`, `article`, `nav`, `footer`.
- Add meaningful alt text to images.
- Reuse Lucide icons and existing UI primitives rather than drawing complex SVGs.
- Preserve visible focus states and keyboard accessibility.
- Avoid unnecessary absolute positioning.

## 11. Important implementation rules

- Inspect the active route and related data before editing.
- Keep `src/routes` and `src/app` wrappers consistent.
- When adding a new route, add both the route component and App Router wrapper where the migration structure requires it.
- Use `next/link` and Next navigation APIs in the final App Router implementation.
- Await async Next.js route parameters in Next.js 16 pages and route handlers.
- Do not use localStorage for new general application persistence unless the feature intentionally follows the existing CMS/product browser-storage model.
- Do not expose service-role credentials to client components.
- Preserve Supabase auth and content behavior when touching admin or public content.
- Do not remove existing comments that act as design-system or tooling markers.
- Run the project build after structural changes and use browser verification for user-visible routes.
- Sync Git after changes are complete.

## 12. Recent work and known history

Recent completed changes include:

- Added the Products navigation item and product pages.
- Added product admin controls.
- Moved process content into the homepage.
- Expanded the contact wizard with service-specific goals, context, and scope.
- Added live international phone formatting and clearer optional phone UI.
- Fixed service-specific contact flow fallbacks and runtime errors.
- The attempted expanded homepage process/engagement-model update was reverted. Current behavior is the pre-expansion homepage process layout unless a future change explicitly re-adds the larger section.

## 13. Safe next-agent workflow

1. Read this file and `v0_plans/strategic-draft.md`.
2. Inspect the relevant route component, App Router wrapper, data source, and CSS before editing.
3. Preserve the existing Ceasiun visual language.
4. Make the smallest complete change.
5. Verify the affected route in a browser at the current responsive viewport and at desktop if layout changed.
6. Run the build when route structure, dependencies, or production behavior changes.
7. Commit/sync the final changes.

## 14. Quick file index

```text
src/lib/site-data.ts              Static services, nav, FAQ, process stage names, samples
src/lib/cms.ts                    Default CMS content, merge/load helpers, CMS keys
src/lib/products.ts               Product model, defaults, localStorage reader
src/hooks/use-cms.ts              CMS React hook and update behavior
src/components/site.tsx           Header, nav, footer, shared shell
src/components/admin-pages-editor.tsx  Admin CMS page editor
src/components/products-admin.tsx Product admin panel
src/routes/index.tsx              Homepage
src/routes/contact.tsx            Contact wizard
src/routes/services.tsx           Services index
src/routes/services.$slug.tsx    Service detail
src/routes/services.$slug.$subslug.tsx Sub-service detail
src/routes/products.tsx           Products index
src/routes/products.$slug.tsx     Product detail
src/routes/_authenticated/admin.tsx Admin dashboard
src/styles.css                    Global design system and page styling
```

This handoff is intended to be given directly to another AI coding agent. It should treat the current codebase as the source of truth whenever this document and implementation differ.
