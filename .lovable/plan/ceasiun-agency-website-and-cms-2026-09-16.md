# Ceasiun Agency Website and CMS

## Goal
Build a premium, dark, multi-page agency website plus a secure content dashboard. Use only the supplied company facts. Sample testimonials and case studies will be clearly labeled, editable, hideable, and removable from the dashboard.

## Public website
- Create shared responsive navigation, mobile menu, contact strip, and footer.
- Build dedicated pages for Home, Services, Work, case studies, Process, About, Careers, Contact, Blog, and individual blog posts.
- Use a near-black/off-white system with one restrained cool accent, sharp editorial typography, subtle grid texture, deliberate whitespace, and restrained motion.
- Add scroll reveals, polished hover states, light depth effects, and accessible count-up statistics.
- Present all 9 service groups, the 8-step delivery process, both engagement models, payment terms/methods, factual company history, contact channels, FAQs, and contact form.
- Add category filtering and search for Work and Blog where useful.
- Include route-specific titles and social metadata, semantic headings, image descriptions, keyboard support, and reduced-motion support.

## Content and admin
- Enable email/password and Google sign-in.
- Protect the dashboard and all write operations; only administrators can manage content.
- Add content management for blog posts, project case studies, testimonials, and career openings.
- Support create, edit, publish/draft, show/hide, and delete actions as appropriate.
- Add Markdown editing for posts and case studies, cover/image uploads, tags/categories, and image previews.
- Seed clearly labeled sample posts, projects, and testimonials so the finished public site is populated without implying they are verified client claims.
- Reserve administrator access for `ceasiun@gmail.com` through a separate roles table, never through browser state or a profile field.

## Data and security
- Store posts, projects, testimonials, roles, career openings, and contact submissions in Lovable Cloud.
- Apply row-level access rules: visitors can read published/visible content and submit contact enquiries; administrators can manage all records.
- Use a dedicated public media bucket with administrator-only uploads.
- Validate all forms and privileged actions on the server.

## Verification
- Verify public navigation, filters, forms, counters, mobile menu, empty/error states, and key desktop/mobile layouts.
- Verify unauthenticated users cannot open the dashboard or mutate content.
- Run focused tests and database security checks, then inspect the final pages in the browser.

## Assumptions
- No user profile table is needed; authentication identity plus a separate role table is sufficient.
- The accent remains a restrained neutral-cool tone until official brand colors and logo files are supplied.
- Text-based Ceasiun branding is used until an official logo asset is supplied.
