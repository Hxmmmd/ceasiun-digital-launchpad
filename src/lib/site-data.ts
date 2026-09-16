import { Bot, Braces, Brush, ChartNoAxesCombined, CloudCog, Palette, ShieldCheck, Sparkles, Wrench } from "lucide-react";

export const services = [
  { slug: "engineering", title: "Website Development / Engineering", short: "High-performance websites, commerce, SaaS and custom digital products.", icon: Braces, items: ["WordPress Development", "WooCommerce", "Shopify Development", "Custom E-commerce", "MERN Stack Development", "Landing & Portfolio Pages", "Custom Websites", "SaaS Development"] },
  { slug: "marketing", title: "Digital Marketing", short: "Search, content and paid growth systems built around measurable goals.", icon: ChartNoAxesCombined, items: ["SEO", "Social Media Management", "Content Writing", "Google Ads", "Meta Ads"] },
  { slug: "social", title: "Social Media Management", short: "Always-on brand operations, publishing, outreach and community support.", icon: Sparkles, items: ["Social setup", "Platform management", "Posts & stories", "Inbox management", "Client outreach", "24/7 brand support"] },
  { slug: "design", title: "Graphic Designing", short: "Purposeful visual communication across product and brand touchpoints.", icon: Palette, items: ["UI Design", "Logo Designing", "Campaign Creative", "Digital Collateral"] },
  { slug: "branding", title: "Branding", short: "Strategy and systems that make businesses recognizable and coherent.", icon: Brush, items: ["Brand Guide & Kit", "Brand Workflow", "Brand Strategy", "Product Branding", "Social Media Branding", "Brand Consultancy"] },
  { slug: "automation", title: "AI / Automation", short: "Practical AI systems that remove repetitive work and improve discovery.", icon: Bot, items: ["Custom AI Agents", "AI Workflows", "AI Chatbots", "Sales & CRM Automation", "Business Automations", "AI Search Visibility", "AI SEO"] },
  { slug: "security", title: "Cyber Security", short: "Defensive services that protect websites and reduce operational risk.", icon: ShieldCheck, items: ["Website Penetration Testing", "DDoS Management", "SSL/TLS Certificates", "Vulnerability Assessments"] },
  { slug: "management", title: "Website Management", short: "Reliable upkeep that keeps websites fast, current and available.", icon: Wrench, items: ["Website upkeep", "Performance optimization", "Uptime monitoring", "Content updates", "Bug fixes & troubleshooting"] },
  { slug: "managed", title: "Managed Services Contract", short: "Senior technical capability without the cost of building every function in-house.", icon: CloudCog, items: ["Managed DevOps", "Managed QA Testing", "Managed System Administration", "Managed Network Administration"] },
];
export const processSteps = ["Discovery", "Planning & Strategy", "Design", "Development", "Testing & QA", "Deployment & Launch", "Post-Launch Support", "Continuous Improvement"];
export const faq = [
  ["What kind of businesses do you work with?", "Ceasiun supports startups and established businesses that need a dependable digital partner—from a focused launch to ongoing technical operations."],
  ["How do projects begin?", "Every engagement starts with discovery. We then define scope, propose the approach, agree the contract, and begin against clear milestones."],
  ["How are payments structured?", "Projects begin with a 30% advance, followed by milestone-based payments. Local and international payment methods are available."],
  ["Can Ceasiun support us after launch?", "Yes. Post-launch support, website management, continuous improvement, and monthly managed services are available."],
];
export const nav = [["Services","/services"],["Work","/work"],["Process","/process"],["About","/about"],["Blog","/blog"]] as const;
export const samples = [
 {slug:"commerce-replatform",title:"Commerce replatform concept",category:"Engineering",summary:"A sample case-study structure showing how Ceasiun would frame a complex commerce rebuild.",image:"commerce"},
 {slug:"automation-operations",title:"Operations automation concept",category:"AI / Automation",summary:"A sample engagement mapping disconnected operational tasks into one reliable workflow.",image:"automation"},
 {slug:"brand-system",title:"Digital brand system concept",category:"Branding",summary:"A sample identity and digital rollout designed for clarity across every customer touchpoint.",image:"brand"},
];
