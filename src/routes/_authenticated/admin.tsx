"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bell,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Edit3,
  Eye,
  EyeOff,
  FileText,
  FolderKanban,
  Globe,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Pencil,
  Plus,
  Save,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  Sparkles,
  Trash2,
  UserCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AdminPagesEditor } from "@/components/admin-pages-editor";
import { notifyCmsListeners } from "@/lib/cms";
import { services } from "@/lib/site-data";

type MainTab =
  | "overview"
  | "users"
  | "inquiries"
  | "services"
  | "blog_posts"
  | "case_studies"
  | "testimonials"
  | "career_openings"
  | "pages"
  | "settings";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Content Editor" | "SEO Manager" | "Support";
  password: string;
  status: "Active" | "Disabled";
  createdAt: string;
}

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  status: "New" | "In Progress" | "Resolved";
  createdAt: string;
}

// ─── CMS Row types ────────────────────────────────────────────────────────────
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  body: string;
  author: string;
  cover_url: string;
  tags: string;
  status: "published" | "draft" | "hidden";
  published_at: string;
}

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  approach: string;
  result: string;
  is_visible: boolean;
  created_at: string;
}

interface Testimonial {
  id: string;
  quote: string;
  attribution: string;
  company: string;
  is_sample: boolean;
  is_visible: boolean;
  sort_order: number;
}

interface CareerOpening {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  is_visible: boolean;
  created_at: string;
}

// ─── Default seed data ────────────────────────────────────────────────────────
const defaultAdminUsers: AdminUser[] = [
  {
    id: "admin-1",
    name: "Primary Administrator",
    email: "admin@example.com",
    role: "Super Admin",
    password: "admin",
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "admin-2",
    name: "Ceasiun Master Admin",
    email: "ceasiun@gmail.com",
    role: "Super Admin",
    password: "adminpassword123",
    status: "Active",
    createdAt: new Date().toISOString(),
  },
];

const defaultInquiries: ContactInquiry[] = [
  {
    id: "inq-1",
    name: "Hammad Khan",
    email: "hammad@example.com",
    phone: "0314 0262087",
    service: "Website Development",
    budget: "$1,000 - $3,000",
    message: "We need a full-stack custom web platform built for our digital agency with high SEO ranking.",
    status: "New",
    createdAt: new Date().toISOString(),
  },
];

const defaultBlogPosts: BlogPost[] = [
  {
    id: "blog-demo-1",
    slug: "why-core-web-vitals-matter",
    title: "Why Core Web Vitals Matter for Your Business",
    excerpt: "Google ranks faster websites higher. Here's what Core Web Vitals are and how to improve them.",
    category: "Website Development",
    body: "## Introduction\n\nCore Web Vitals are a set of real-world, user-centered performance metrics standardized by Google.\n\n## The Three Metrics\n\n- **LCP** (Largest Contentful Paint): measures loading performance\n- **FID** (First Input Delay): measures interactivity\n- **CLS** (Cumulative Layout Shift): measures visual stability\n\n## Why They Matter\n\nSince 2021, Core Web Vitals directly influence Google's search ranking algorithm. A poor score can push you below competitors even if your content is superior.",
    author: "Ceasiun Team",
    cover_url: "",
    tags: "seo, performance, web",
    status: "published",
    published_at: new Date().toISOString(),
  },
  {
    id: "blog-demo-2",
    slug: "ai-automation-for-small-business",
    title: "5 AI Automations Every Small Business Should Use in 2025",
    excerpt: "From customer support bots to CRM automation — practical AI workflows that save hours weekly.",
    category: "AI / Automation",
    body: "## The AI Opportunity\n\nSmall businesses often can't afford large teams. AI automation bridges that gap.\n\n## Top 5 Automations\n\n- **WhatsApp AI Chatbot** for 24/7 customer queries\n- **Lead Qualification Bot** to score inbound leads automatically\n- **Invoice & Payment Reminders** via automated email/SMS\n- **Social Content Scheduler** with AI-written captions\n- **CRM Auto-update** when clients reply to emails",
    author: "Ceasiun Team",
    cover_url: "",
    tags: "ai, automation, small business",
    status: "published",
    published_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

const defaultCaseStudies: CaseStudy[] = [
  {
    id: "case-1",
    slug: "commerce-replatform",
    title: "Commerce Replatforming Architecture",
    category: "Website Development",
    summary: "A sample case-study structure showing how Ceasiun frames a complex e-commerce overhaul and custom checkout integration.",
    problem: "The client's existing WooCommerce store was slow, crashing under traffic, and losing ~30% of customers at checkout due to a broken payment flow.",
    approach: "We migrated to a custom MERN-stack e-commerce platform, rebuilt the checkout as a single-page flow, and integrated Stripe + JazzCash payment gateways.",
    result: "Checkout drop-off reduced by 38%. Page load improved from 7.2s → 1.4s. Revenue increased 22% in the first month post-launch.",
    is_visible: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "case-2",
    slug: "automation-operations",
    title: "Operations & CRM AI Automation",
    category: "AI / Automation",
    summary: "A sample engagement mapping fragmented operational tasks into an automated AI workflow.",
    problem: "The operations team was spending 3+ hours/day on repetitive data entry, follow-up emails, and lead status updates across three disconnected tools.",
    approach: "Built a Make.com automation pipeline connecting CRM, Gmail, WhatsApp Business, and Google Sheets. Added an AI layer for lead scoring and auto-response.",
    result: "Saved 18 hours/week across the team. Lead response time went from 4 hours → 8 minutes. CRM accuracy improved from ~60% → 98%.",
    is_visible: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "case-3",
    slug: "brand-system",
    title: "Digital Brand Identity System",
    category: "Branding",
    summary: "A sample identity guide and digital rollout designed for visual clarity across all digital channels.",
    problem: "The startup had inconsistent visual assets across their website, social profiles, and pitch deck — creating a fragmented brand impression with investors.",
    approach: "Created a comprehensive brand system including logo suite, typography hierarchy, color palette, iconography, and usage guidelines in a Figma Brand Book.",
    result: "Secured seed funding round within 3 months of rebrand. Social engagement increased 45%. Website bounce rate dropped from 72% → 41%.",
    is_visible: true,
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
];

const defaultTestimonials: Testimonial[] = [
  {
    id: "test-1",
    quote: "Ceasiun delivered a complete website overhaul in just 3 weeks. The result was beyond what we expected — clean, fast, and exactly on-brand.",
    attribution: "CEO, Pakistani SaaS Startup",
    company: "Confidential Client",
    is_sample: true,
    is_visible: true,
    sort_order: 1,
  },
  {
    id: "test-2",
    quote: "Their AI automation work saved our team over 20 hours per week. The WhatsApp bot alone handles 80% of our customer queries.",
    attribution: "Operations Director, E-commerce Brand",
    company: "Confidential Client",
    is_sample: true,
    is_visible: true,
    sort_order: 2,
  },
  ...[
    ["A polished digital experience that finally feels as ambitious as our company.", "Founder, Growth Company"],
    ["Clear communication, sharp execution, and a launch that exceeded our goals.", "Marketing Lead, SaaS Brand"],
    ["The team turned a complicated brief into a simple, high-performing product.", "Director, Technology Group"],
    ["We saw stronger engagement within the first month after launch.", "Brand Manager, Retail Company"],
    ["Their strategic thinking made every design and development decision count.", "Founder, Consumer Startup"],
    ["Fast, thoughtful, and genuinely invested in the outcome of our project.", "COO, Services Business"],
    ["The new platform made our internal workflow dramatically easier.", "Operations Lead, Logistics Brand"],
    ["A rare partner that brings both creative taste and technical depth.", "CEO, Digital Product"],
    ["The attention to detail across mobile and desktop was exceptional.", "Product Manager, Finance Brand"],
    ["Our website now communicates our value clearly and converts better.", "Founder, Consulting Firm"],
    ["Every milestone landed on time, with no surprises and excellent support.", "Director, Education Platform"],
    ["They helped us move from idea to a credible, scalable launch.", "Founder, Startup Studio"],
    ["The final result is clean, memorable, and much easier for customers to use.", "Head of Growth, Commerce Brand"],
    ["A dependable team with the confidence to challenge weak ideas.", "Partner, Professional Services"],
  ].map(([quote, attribution], index) => ({ id: `test-${index + 3}`, quote, attribution, company: "Confidential Client", is_sample: true, is_visible: true, sort_order: index + 3 })),
];

const defaultCareers: CareerOpening[] = [
  {
    id: "career-1",
    title: "Full-Stack Web Developer (MERN)",
    location: "Remote / Lahore, Pakistan",
    type: "Full-Time",
    description: "We are looking for a skilled MERN-stack developer to join our growing engineering team. You will work on client-facing web applications, SaaS platforms, and automation systems.",
    is_visible: true,
    created_at: new Date().toISOString(),
  },
];

// ─── Generic localStorage helpers ────────────────────────────────────────────
function loadLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveLocal<T>(key: string, value: T) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
    notifyCmsListeners();
  }
}

// ─── Blank templates per type ─────────────────────────────────────────────────
const blankBlog = (): BlogPost => ({
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  category: "Insights",
  body: "",
  author: "Ceasiun Team",
  cover_url: "",
  tags: "",
  status: "draft",
  published_at: new Date().toISOString(),
});

const blankCase = (): CaseStudy => ({
  id: "",
  slug: "",
  title: "",
  category: "Website Development",
  summary: "",
  problem: "",
  approach: "",
  result: "",
  is_visible: true,
  created_at: new Date().toISOString(),
});

const blankTestimonial = (): Testimonial => ({
  id: "",
  quote: "",
  attribution: "",
  company: "",
  is_sample: false,
  is_visible: true,
  sort_order: 99,
});

const blankCareer = (): CareerOpening => ({
  id: "",
  title: "",
  location: "Remote, Pakistan",
  type: "Full-Time",
  description: "",
  is_visible: true,
  created_at: new Date().toISOString(),
});

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<MainTab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error">("success");
  const [isSaving, setIsSaving] = useState(false);

  // ─── Core state ──────────────────────────────────────────────────────────
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() =>
    loadLocal("ceasiun_admin_users", defaultAdminUsers)
  );
  const [newUser, setNewUser] = useState<Partial<AdminUser>>({
    name: "", email: "", role: "Super Admin", password: "", status: "Active",
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() =>
    loadLocal("ceasiun_contact_inquiries", defaultInquiries)
  );

  const [siteSettings, setSiteSettings] = useState(() =>
    loadLocal("ceasiun_site_settings", {
      siteName: "Ceasiun",
      tagline: "Your Digital Growth Partner",
      phone: "0314 0262087",
      whatsapp: "+923140262087",
      email: "contact@ceasiun.com",
      announcementBanner: "🚀 Launch Sprints Available for Q4 — Reserve Your Slot Now!",
      bannerActive: true,
      linkedin: "https://linkedin.com/in/ceasiun",
      instagram: "https://instagram.com/ceasiun",
      facebook: "https://facebook.com/ceasiun",
      x: "https://x.com/ceasiun",
      youtube: "https://youtube.com/@ceasiun",
      discord: "https://discord.com/invite/AkBQH7EQM4",
    })
  );

  // ─── CMS Content State (all localStorage-backed) ──────────────────────
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() =>
    loadLocal("ceasiun_blog_posts", defaultBlogPosts)
  );
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogMode, setBlogMode] = useState<"list" | "edit">("list");

  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(() =>
    loadLocal("ceasiun_case_studies", defaultCaseStudies)
  );
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
  const [caseMode, setCaseMode] = useState<"list" | "edit">("list");

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() =>
    loadLocal("ceasiun_testimonials", defaultTestimonials)
  );
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [testMode, setTestMode] = useState<"list" | "edit">("list");

  const [careers, setCareers] = useState<CareerOpening[]>(() =>
    loadLocal("ceasiun_careers", defaultCareers)
  );
  const [editingCareer, setEditingCareer] = useState<CareerOpening | null>(null);
  const [careerMode, setCareerMode] = useState<"list" | "edit">("list");

  // ─── Persist all state ────────────────────────────────────────────────
  useEffect(() => saveLocal("ceasiun_admin_users", adminUsers), [adminUsers]);
  useEffect(() => saveLocal("ceasiun_contact_inquiries", inquiries), [inquiries]);
  useEffect(() => saveLocal("ceasiun_site_settings", siteSettings), [siteSettings]);
  useEffect(() => saveLocal("ceasiun_blog_posts", blogPosts), [blogPosts]);
  useEffect(() => saveLocal("ceasiun_case_studies", caseStudies), [caseStudies]);
  useEffect(() => saveLocal("ceasiun_testimonials", testimonials), [testimonials]);
  useEffect(() => saveLocal("ceasiun_careers", careers), [careers]);

  // ─── Helpers ──────────────────────────────────────────────────────────
  function notify(msg: string, type: "success" | "error" = "success") {
    setFeedbackMessage(msg);
    setFeedbackType(type);
    setTimeout(() => setFeedbackMessage(""), 4000);
  }

  function toggleSidebar() {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 899px)").matches) {
      setSidebarOpen((open) => !open);
      return;
    }
    setSidebarCollapsed((collapsed) => !collapsed);
  }

  function selectTab(tab: MainTab) {
    setActiveTab(tab);
    setSidebarOpen(false);
  }

  function newId() {
    return `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  }

  // ─── Admin Users ──���──────────────────���──────────────��─────────────────
  function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    if (!newUser.email || !newUser.password) return;
    const created: AdminUser = {
      id: newId(),
      name: String(newUser.name || newUser.email!.split("@")[0]),
      email: newUser.email!.trim().toLowerCase(),
      role: newUser.role || "Super Admin",
      password: newUser.password!,
      status: newUser.status || "Active",
      createdAt: new Date().toISOString(),
    };
    setAdminUsers((prev) => [created, ...prev]);
    setNewUser({ name: "", email: "", role: "Super Admin", password: "", status: "Active" });
    notify(`Admin "${created.email}" created successfully!`);
  }

  function handleToggleUserStatus(id: string) {
    setAdminUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "Active" ? "Disabled" : "Active" } : u))
    );
    notify("User status updated.");
  }

  function handleDeleteUser(id: string) {
    if (adminUsers.length <= 1) {
      alert("At least one super admin must remain.");
      return;
    }
    if (confirm("Are you sure you want to delete this admin user?")) {
      setAdminUsers((prev) => prev.filter((u) => u.id !== id));
      notify("User deleted.");
    }
  }

  // ─── Inquiries ─────────��───────────────────────────────────────────────
  function handleInquiryStatus(id: string, status: "New" | "In Progress" | "Resolved") {
    setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
    notify("Inquiry status updated.");
  }

  function handleDeleteInquiry(id: string) {
    if (confirm("Delete this client inquiry?")) {
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      notify("Inquiry deleted.");
    }
  }

  // ─── Blog CRUD ────────────────────────────────────────────────────────
  function saveBlog() {
    if (!editingBlog) return;
    const isNew = !editingBlog.id;
    const item = isNew ? { ...editingBlog, id: newId() } : editingBlog;
    if (isNew) {
      setBlogPosts((prev) => [item, ...prev]);
    } else {
      setBlogPosts((prev) => prev.map((p) => (p.id === item.id ? item : p)));
    }
    setBlogMode("list");
    setEditingBlog(null);
    notify(isNew ? "Blog post created!" : "Blog post updated!");
  }

  function deleteBlog(id: string) {
    if (confirm("Delete this blog post permanently?")) {
      setBlogPosts((prev) => prev.filter((p) => p.id !== id));
      notify("Blog post deleted.");
    }
  }

  function toggleBlogVisibility(id: string) {
    setBlogPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "hidden" ? "published" : "hidden" }
          : p
      )
    );
    notify("Blog post visibility toggled.");
  }

  // ─── Case Studies CRUD ────────────────────────────────────────────────
  function saveCase() {
    if (!editingCase) return;
    const isNew = !editingCase.id;
    const item = isNew ? { ...editingCase, id: newId() } : editingCase;
    if (isNew) {
      setCaseStudies((prev) => [item, ...prev]);
    } else {
      setCaseStudies((prev) => prev.map((c) => (c.id === item.id ? item : c)));
    }
    setCaseMode("list");
    setEditingCase(null);
    notify(isNew ? "Case study created!" : "Case study updated!");
  }

  function deleteCase(id: string) {
    if (confirm("Delete this case study permanently?")) {
      setCaseStudies((prev) => prev.filter((c) => c.id !== id));
      notify("Case study deleted.");
    }
  }

  function toggleCaseVisibility(id: string) {
    setCaseStudies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, is_visible: !c.is_visible } : c))
    );
    notify("Case study visibility toggled.");
  }

  // ─── Testimonials CRUD ────────────────────────────────────────────────
  function saveTestimonial() {
    if (!editingTestimonial) return;
    const isNew = !editingTestimonial.id;
    const item = isNew ? { ...editingTestimonial, id: newId() } : editingTestimonial;
    if (isNew) {
      setTestimonials((prev) => [...prev, item]);
    } else {
      setTestimonials((prev) => prev.map((t) => (t.id === item.id ? item : t)));
    }
    setTestMode("list");
    setEditingTestimonial(null);
    notify(isNew ? "Testimonial created!" : "Testimonial updated!");
  }

  function deleteTestimonial(id: string) {
    if (confirm("Delete this testimonial permanently?")) {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      notify("Testimonial deleted.");
    }
  }

  function toggleTestimonialVisibility(id: string) {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_visible: !t.is_visible } : t))
    );
    notify("Testimonial visibility toggled.");
  }

  // ─── Careers CRUD ─────────────────────────────────────────────────────
  function saveCareer() {
    if (!editingCareer) return;
    const isNew = !editingCareer.id;
    const item = isNew ? { ...editingCareer, id: newId() } : editingCareer;
    if (isNew) {
      setCareers((prev) => [item, ...prev]);
    } else {
      setCareers((prev) => prev.map((c) => (c.id === item.id ? item : c)));
    }
    setCareerMode("list");
    setEditingCareer(null);
    notify(isNew ? "Career opening created!" : "Career opening updated!");
  }

  function deleteCareer(id: string) {
    if (confirm("Delete this career opening permanently?")) {
      setCareers((prev) => prev.filter((c) => c.id !== id));
      notify("Career opening deleted.");
    }
  }

  function toggleCareerVisibility(id: string) {
    setCareers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, is_visible: !c.is_visible } : c))
    );
    notify("Career visibility toggled.");
  }

  // ─── Sign out ─────────────────────────────────────────────────────────
  async function handleSignOut() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ceasiun_demo_admin");
      localStorage.removeItem("ceasiun_active_user");
    }
    router.replace("/auth");
  }

  // ─── Tab label helper ─────────────────────────────────────────────────
  const tabLabel: Record<MainTab, string> = {
    overview: "Dashboard",
    users: "Admin & Users",
    inquiries: "Inquiries",
    services: "Services",
    blog_posts: "Blog Articles",
    case_studies: "Case Studies",
    testimonials: "Testimonials",
    career_openings: "Careers",
    pages: "Pages & Preview",
    settings: "Site Settings",
  };

  // ─── STATUS BADGE HELPER ──────────────────────────────────────────────
  function BlogStatusBadge({ status }: { status: BlogPost["status"] }) {
    const colors: Record<string, string> = {
      published: "status-pill active",
      draft: "status-pill draft",
      hidden: "status-pill disabled",
    };
    return <span className={colors[status] || "status-pill"}>{status}</span>;
  }

  function VisibilityBadge({ visible }: { visible: boolean }) {
    return (
      <span className={visible ? "status-pill active" : "status-pill disabled"}>
        {visible ? "Visible" : "Hidden"}
      </span>
    );
  }

  // ─── Render ────────────────────────────────────────────────────────────
  return (
    <main
      className={`admin ${sidebarOpen ? "sidebar-open" : ""} ${
        sidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/ceasiun-logo.svg" alt="Ceasiun Logo" width={38} height={38} />
          <div>
            <strong>CEASIUN</strong>
            <span>Admin Command Center</span>
          </div>
        </div>

        <nav className="admin-nav-menu">
          <p className="admin-nav-group">Main</p>
          {(["overview", "users", "inquiries"] as MainTab[]).map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "selected" : ""}
              onClick={() => selectTab(tab)}
              type="button"
            >
              {tab === "overview" && <LayoutDashboard />}
              {tab === "users" && <UserCheck />}
              {tab === "inquiries" && <Inbox />}
              {tabLabel[tab]}
              {tab === "users" && ` (${adminUsers.length})`}
              {tab === "inquiries" && ` (${inquiries.filter((i) => i.status === "New").length} new)`}
            </button>
          ))}

          <p className="admin-nav-group">Content Management</p>
          {(["blog_posts", "case_studies", "testimonials", "career_openings"] as MainTab[]).map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "selected" : ""}
              onClick={() => {
                selectTab(tab);
                setBlogMode("list");
                setCaseMode("list");
                setTestMode("list");
                setCareerMode("list");
              }}
              type="button"
            >
              {tab === "blog_posts" && <FileText />}
              {tab === "case_studies" && <FolderKanban />}
              {tab === "testimonials" && <MessageSquareQuote />}
              {tab === "career_openings" && <Users />}
              {tabLabel[tab]}
              {tab === "blog_posts" && ` (${blogPosts.length})`}
              {tab === "case_studies" && ` (${caseStudies.length})`}
              {tab === "testimonials" && ` (${testimonials.length})`}
              {tab === "career_openings" && ` (${careers.length})`}
            </button>
          ))}

          <p className="admin-nav-group">Configuration</p>
          <button
            className={activeTab === "pages" ? "selected" : ""}
            onClick={() => selectTab("pages")}
            type="button"
          >
            <Globe /> Pages & Preview
          </button>
          <button
            className={activeTab === "services" ? "selected" : ""}
            onClick={() => selectTab("services")}
            type="button"
          >
            <Briefcase /> Services Practices
          </button>
          <button
            className={activeTab === "settings" ? "selected" : ""}
            onClick={() => selectTab("settings")}
            type="button"
          >
            <Settings /> Site Settings
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <button onClick={handleSignOut} type="button" className="signout-btn">
            <LogOut /> Sign Out
          </button>
        </div>
      </aside>
      <button
        type="button"
        className="admin-sidebar-backdrop"
        aria-label="Close admin navigation"
        onClick={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <section className="admin-main-section">
        <div className="admin-topbar">
          <button
            type="button"
            className="admin-menu-toggle"
            aria-label={sidebarOpen ? "Close admin navigation" : "Toggle admin navigation"}
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>
          <span>{tabLabel[activeTab]}</span>
        </div>
        {feedbackMessage && (
          <div className={`admin-alert-banner ${feedbackType}`}>
            <Sparkles className="alert-icon" />
            <span>{feedbackMessage}</span>
            <button onClick={() => setFeedbackMessage("")}>×</button>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 1: OVERVIEW
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === "overview" && (
          <div className="admin-tab-view">
            <header className="admin-view-header">
              <div>
                <p className="eyebrow">Ceasiun Administration</p>
                <h1>Dashboard Overview</h1>
              </div>
              <div className="status-indicator">
                <span className="dot online" /> System Operational
              </div>
            </header>

            <div className="admin-kpi-grid">
              <div className="kpi-card" onClick={() => setActiveTab("users")} style={{ cursor: "pointer" }}>
                <div className="kpi-icon"><UserCheck /></div>
                <div>
                  <strong>{adminUsers.length}</strong>
                  <span>Admin Accounts</span>
                </div>
              </div>
              <div className="kpi-card" onClick={() => setActiveTab("inquiries")} style={{ cursor: "pointer" }}>
                <div className="kpi-icon"><Inbox /></div>
                <div>
                  <strong>{inquiries.filter((i) => i.status === "New").length}</strong>
                  <span>New Inquiries</span>
                </div>
              </div>
              <div className="kpi-card" onClick={() => setActiveTab("blog_posts")} style={{ cursor: "pointer" }}>
                <div className="kpi-icon"><FileText /></div>
                <div>
                  <strong>{blogPosts.filter((p) => p.status === "published").length}</strong>
                  <span>Published Posts</span>
                </div>
              </div>
              <div className="kpi-card" onClick={() => setActiveTab("case_studies")} style={{ cursor: "pointer" }}>
                <div className="kpi-icon"><FolderKanban /></div>
                <div>
                  <strong>{caseStudies.filter((c) => c.is_visible).length}</strong>
                  <span>Active Case Studies</span>
                </div>
              </div>
            </div>

            <div className="overview-split-grid">
              <div className="overview-panel">
                <h3>Quick Actions</h3>
                <div className="action-buttons-list">
                  <Button onClick={() => { setActiveTab("blog_posts"); setBlogMode("edit"); setEditingBlog(blankBlog()); }}>
                    <Plus /> New Blog Article
                  </Button>
                  <Button variant="outline" onClick={() => { setActiveTab("case_studies"); setCaseMode("edit"); setEditingCase(blankCase()); }}>
                    <Plus /> New Case Study
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("inquiries")}>
                    <Inbox /> View Inquiries ({inquiries.length})
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("users")}>
                    <UserPlus /> Add Admin User
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("settings")}>
                    <Settings /> Site Settings
                  </Button>
                </div>
              </div>

              <div className="overview-panel">
                <h3>Content Summary</h3>
                <ul className="quick-users-list">
                  <li>
                    <div><strong>Blog Articles</strong><span>{blogPosts.filter(p=>p.status==="published").length} published · {blogPosts.filter(p=>p.status==="draft").length} draft · {blogPosts.filter(p=>p.status==="hidden").length} hidden</span></div>
                    <button onClick={() => setActiveTab("blog_posts")} type="button" className="action-btn toggle">Manage</button>
                  </li>
                  <li>
                    <div><strong>Case Studies</strong><span>{caseStudies.filter(c=>c.is_visible).length} visible · {caseStudies.filter(c=>!c.is_visible).length} hidden</span></div>
                    <button onClick={() => setActiveTab("case_studies")} type="button" className="action-btn toggle">Manage</button>
                  </li>
                  <li>
                    <div><strong>Testimonials</strong><span>{testimonials.filter(t=>t.is_visible).length} visible · {testimonials.filter(t=>!t.is_visible).length} hidden</span></div>
                    <button onClick={() => setActiveTab("testimonials")} type="button" className="action-btn toggle">Manage</button>
                  </li>
                  <li>
                    <div><strong>Career Openings</strong><span>{careers.filter(c=>c.is_visible).length} active · {careers.filter(c=>!c.is_visible).length} hidden</span></div>
                    <button onClick={() => setActiveTab("career_openings")} type="button" className="action-btn toggle">Manage</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 2: USERS
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === "users" && (
          <div className="admin-tab-view">
            <header className="admin-view-header">
              <div>
                <p className="eyebrow">Access Control</p>
                <h1>User & Admin Management</h1>
              </div>
            </header>

            <div className="users-tab-layout">
              <div className="user-form-card">
                <h2><UserPlus /> Create New Admin or User</h2>
                <p className="form-subtext">New users can sign in immediately with their email & password.</p>
                <form onSubmit={handleCreateUser} className="admin-user-form">
                  <label>Full Name<Input placeholder="e.g. Hammad Khan" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} required /></label>
                  <label>Email Address<Input type="email" placeholder="admin@ceasiun.com" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required /></label>
                  <label>Account Password<Input type="text" placeholder="Assign a password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required /></label>
                  <label>
                    Role Designation
                    <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value as AdminUser["role"] })}>
                      <option value="Super Admin">Super Admin (Full Control)</option>
                      <option value="Content Editor">Content Editor (CMS Only)</option>
                      <option value="SEO Manager">SEO Manager (Articles & Tags)</option>
                      <option value="Support">Support Agent (Inquiries)</option>
                    </select>
                  </label>
                  <Button size="lg" className="w-full text-black font-bold">
                    <UserPlus /> Create Administrator Account
                  </Button>
                </form>
              </div>

              <div className="user-list-card">
                <h2><Users /> Existing Administrators ({adminUsers.length})</h2>
                <div className="users-table-wrapper">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminUsers.map((user) => (
                        <tr key={user.id}>
                          <td><strong>{user.name}</strong></td>
                          <td>{user.email}</td>
                          <td><span className="role-tag">{user.role}</span></td>
                          <td><span className={`status-pill ${user.status.toLowerCase()}`}>{user.status}</span></td>
                          <td className="user-table-actions">
                            <button type="button" onClick={() => handleToggleUserStatus(user.id)} className="action-btn toggle">
                              {user.status === "Active" ? "Disable" : "Enable"}
                            </button>
                            <button type="button" onClick={() => handleDeleteUser(user.id)} className="action-btn delete"><Trash2 /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 3: INQUIRIES
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === "inquiries" && (
          <div className="admin-tab-view">
            <header className="admin-view-header">
              <div>
                <p className="eyebrow">Client Submissions</p>
                <h1>Contact Inquiries Inbox</h1>
              </div>
              <div className="status-indicator">
                <span className={inquiries.filter(i=>i.status==="New").length > 0 ? "dot online" : "dot"} />
                {inquiries.filter(i=>i.status==="New").length} Unread
              </div>
            </header>

            <div className="inquiries-layout">
              {inquiries.length === 0 && (
                <div className="empty-proof"><h3>No inquiries yet.</h3><p>Client messages from the contact form will appear here.</p></div>
              )}
              {inquiries.map((inq) => (
                <div key={inq.id} className="inquiry-card">
                  <div className="inquiry-header">
                    <div>
                      <h3>{inq.name}</h3>
                      <p>{inq.email}{inq.phone && ` · ${inq.phone}`}</p>
                    </div>
                    <span className={`inquiry-badge ${inq.status.toLowerCase().replace(" ", "-")}`}>{inq.status}</span>
                  </div>
                  {inq.service && (
                    <div className="inquiry-meta">
                      <span><strong>Service:</strong> {inq.service}</span>
                      {inq.budget && <span><strong>Budget:</strong> {inq.budget}</span>}
                    </div>
                  )}
                  <div className="inquiry-body"><p>{inq.message}</p></div>
                  <div className="inquiry-actions">
                    <button onClick={() => handleInquiryStatus(inq.id, "In Progress")} className="inq-btn progress">Mark In Progress</button>
                    <button onClick={() => handleInquiryStatus(inq.id, "Resolved")} className="inq-btn resolve">Mark Resolved</button>
                    <button onClick={() => handleDeleteInquiry(inq.id)} className="inq-btn delete"><Trash2 /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 4: BLOG POSTS — Full CRUD
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === "blog_posts" && (
          <div className="admin-tab-view">
            <header className="admin-view-header">
              <div>
                <p className="eyebrow">Content Management</p>
                <h1>Blog Articles</h1>
              </div>
              {blogMode === "list" ? (
                <Button onClick={() => { setEditingBlog(blankBlog()); setBlogMode("edit"); }}>
                  <Plus /> New Article
                </Button>
              ) : (
                <Button variant="outline" onClick={() => { setBlogMode("list"); setEditingBlog(null); }}>
                  <ArrowLeft /> Back to List
                </Button>
              )}
            </header>

            {blogMode === "list" && (
              <div className="cms-list-view">
                {blogPosts.length === 0 && (
                  <div className="empty-proof"><h3>No blog articles yet.</h3><p>Click "New Article" to create your first post.</p></div>
                )}
                {blogPosts.map((post) => (
                  <div key={post.id} className="cms-row">
                    <div className="cms-row-info">
                      <strong>{post.title}</strong>
                      <span>{post.category} · {post.author}</span>
                      <p className="cms-excerpt">{post.excerpt}</p>
                    </div>
                    <div className="cms-row-meta">
                      <BlogStatusBadge status={post.status} />
                      <span className="cms-date">{new Date(post.published_at).toLocaleDateString()}</span>
                    </div>
                    <div className="cms-row-actions">
                      <button
                        type="button"
                        title={post.status === "hidden" ? "Make Visible" : "Hide Post"}
                        onClick={() => toggleBlogVisibility(post.id)}
                        className="action-btn toggle"
                      >
                        {post.status === "hidden" ? <Eye /> : <EyeOff />}
                        {post.status === "hidden" ? "Show" : "Hide"}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setEditingBlog(post); setBlogMode("edit"); }}
                        className="action-btn toggle"
                      >
                        <Pencil /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteBlog(post.id)}
                        className="action-btn delete"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {blogMode === "edit" && editingBlog && (
              <div className="cms-editor">
                <h2>{editingBlog.id ? "Edit Article" : "Create New Article"}</h2>
                <div className="cms-editor-grid">
                  <div className="cms-editor-main">
                    <label>Article Title *
                      <Input value={editingBlog.title} onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })} placeholder="Enter article title..." />
                    </label>
                    <label>URL Slug
                      <Input value={editingBlog.slug} onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })} placeholder="e.g. why-seo-matters" />
                    </label>
                    <label>Short Excerpt / Summary
                      <Textarea rows={2} value={editingBlog.excerpt} onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })} placeholder="A 1–2 sentence summary shown on the blog listing page..." />
                    </label>
                    <label>Article Body (Markdown supported)
                      <Textarea rows={14} value={editingBlog.body} onChange={(e) => setEditingBlog({ ...editingBlog, body: e.target.value })} placeholder={"## Introduction\n\nWrite your article here. Use ## for headings, - for bullet points, > for quotes."} />
                    </label>
                  </div>
                  <div className="cms-editor-sidebar">
                    <label>Category
                      <select value={editingBlog.category} onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}>
                        <option>Insights</option>
                        <option>Website Development</option>
                        <option>Digital Marketing</option>
                        <option>AI / Automation</option>
                        <option>Cyber Security</option>
                        <option>Branding</option>
                        <option>Social Media</option>
                        <option>Graphic Design</option>
                        <option>Business Strategy</option>
                      </select>
                    </label>
                    <label>Author
                      <Input value={editingBlog.author} onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })} placeholder="Ceasiun Team" />
                    </label>
                    <label>Tags (comma-separated)
                      <Input value={editingBlog.tags} onChange={(e) => setEditingBlog({ ...editingBlog, tags: e.target.value })} placeholder="seo, web, marketing" />
                    </label>
                    <label>Cover Image URL
                      <Input value={editingBlog.cover_url} onChange={(e) => setEditingBlog({ ...editingBlog, cover_url: e.target.value })} placeholder="https://..." />
                    </label>
                    <label>Publish Status
                      <select value={editingBlog.status} onChange={(e) => setEditingBlog({ ...editingBlog, status: e.target.value as BlogPost["status"] })}>
                        <option value="published">Published (visible on site)</option>
                        <option value="draft">Draft (not visible)</option>
                        <option value="hidden">Hidden (archived)</option>
                      </select>
                    </label>
                    <label>Published Date
                      <Input type="date" value={editingBlog.published_at?.slice(0, 10)} onChange={(e) => setEditingBlog({ ...editingBlog, published_at: new Date(e.target.value).toISOString() })} />
                    </label>
                    <Button className="w-full text-black font-bold" onClick={saveBlog}>
                      <Save /> {editingBlog.id ? "Update Article" : "Publish Article"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 5: CASE STUDIES — Full CRUD
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === "case_studies" && (
          <div className="admin-tab-view">
            <header className="admin-view-header">
              <div>
                <p className="eyebrow">Portfolio</p>
                <h1>Case Studies</h1>
              </div>
              {caseMode === "list" ? (
                <Button onClick={() => { setEditingCase(blankCase()); setCaseMode("edit"); }}>
                  <Plus /> New Case Study
                </Button>
              ) : (
                <Button variant="outline" onClick={() => { setCaseMode("list"); setEditingCase(null); }}>
                  <ArrowLeft /> Back to List
                </Button>
              )}
            </header>

            {caseMode === "list" && (
              <div className="cms-list-view">
                {caseStudies.length === 0 && (
                  <div className="empty-proof"><h3>No case studies yet.</h3><p>Click "New Case Study" to add your first.</p></div>
                )}
                {caseStudies.map((cs) => (
                  <div key={cs.id} className="cms-row">
                    <div className="cms-row-info">
                      <strong>{cs.title}</strong>
                      <span>{cs.category}</span>
                      <p className="cms-excerpt">{cs.summary}</p>
                    </div>
                    <div className="cms-row-meta">
                      <VisibilityBadge visible={cs.is_visible} />
                    </div>
                    <div className="cms-row-actions">
                      <button type="button" onClick={() => toggleCaseVisibility(cs.id)} className="action-btn toggle">
                        {cs.is_visible ? <EyeOff /> : <Eye />}
                        {cs.is_visible ? "Hide" : "Show"}
                      </button>
                      <button type="button" onClick={() => { setEditingCase(cs); setCaseMode("edit"); }} className="action-btn toggle">
                        <Pencil /> Edit
                      </button>
                      <button type="button" onClick={() => deleteCase(cs.id)} className="action-btn delete">
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {caseMode === "edit" && editingCase && (
              <div className="cms-editor">
                <h2>{editingCase.id ? "Edit Case Study" : "Create New Case Study"}</h2>
                <div className="cms-editor-grid">
                  <div className="cms-editor-main">
                    <label>Project Title *
                      <Input value={editingCase.title} onChange={(e) => setEditingCase({ ...editingCase, title: e.target.value })} placeholder="e.g. E-commerce Replatforming for XYZ Brand" />
                    </label>
                    <label>URL Slug
                      <Input value={editingCase.slug} onChange={(e) => setEditingCase({ ...editingCase, slug: e.target.value })} placeholder="e.g. xyz-brand-replatform" />
                    </label>
                    <label>Short Summary
                      <Textarea rows={2} value={editingCase.summary} onChange={(e) => setEditingCase({ ...editingCase, summary: e.target.value })} placeholder="A 1–2 sentence overview shown on the Work page..." />
                    </label>
                    <label>Problem Statement
                      <Textarea rows={4} value={editingCase.problem} onChange={(e) => setEditingCase({ ...editingCase, problem: e.target.value })} placeholder="What challenge was the client facing?" />
                    </label>
                    <label>Execution Approach
                      <Textarea rows={4} value={editingCase.approach} onChange={(e) => setEditingCase({ ...editingCase, approach: e.target.value })} placeholder="How did Ceasiun solve it?" />
                    </label>
                    <label>Results & Outcomes
                      <Textarea rows={4} value={editingCase.result} onChange={(e) => setEditingCase({ ...editingCase, result: e.target.value })} placeholder="What measurable results were delivered?" />
                    </label>
                  </div>
                  <div className="cms-editor-sidebar">
                    <label>Category
                      <select value={editingCase.category} onChange={(e) => setEditingCase({ ...editingCase, category: e.target.value })}>
                        <option>Website Development</option>
                        <option>Digital Marketing</option>
                        <option>AI / Automation</option>
                        <option>Cyber Security</option>
                        <option>Branding</option>
                        <option>Graphic Design</option>
                        <option>Social Media</option>
                        <option>Managed Services</option>
                      </select>
                    </label>
                    <label>Visibility
                      <select value={editingCase.is_visible ? "visible" : "hidden"} onChange={(e) => setEditingCase({ ...editingCase, is_visible: e.target.value === "visible" })}>
                        <option value="visible">Visible on site</option>
                        <option value="hidden">Hidden</option>
                      </select>
                    </label>
                    <Button className="w-full text-black font-bold" onClick={saveCase}>
                      <Save /> {editingCase.id ? "Update Case Study" : "Create Case Study"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 6: TESTIMONIALS — Full CRUD
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === "testimonials" && (
          <div className="admin-tab-view">
            <header className="admin-view-header">
              <div>
                <p className="eyebrow">Social Proof</p>
                <h1>Testimonials</h1>
                <p className="form-subtext">Manage the rotating Google-style review carousel. Reviews advance automatically every 5 seconds.</p>
  </div>
              {testMode === "list" ? (
                <Button onClick={() => { setEditingTestimonial(blankTestimonial()); setTestMode("edit"); }}>
                  <Plus /> Add Testimonial
                </Button>
              ) : (
                <Button variant="outline" onClick={() => { setTestMode("list"); setEditingTestimonial(null); }}>
                  <ArrowLeft /> Back to List
                </Button>
              )}
            </header>

            {testMode === "list" && (
              <div className="cms-list-view">
                {testimonials.length === 0 && (
                  <div className="empty-proof"><h3>No testimonials yet.</h3><p>Add your first client testimonial above.</p></div>
                )}
                {testimonials.map((t) => (
                  <div key={t.id} className="cms-row">
                    <div className="cms-row-info">
                      <strong>"{t.quote.slice(0, 80)}{t.quote.length > 80 ? "..." : ""}"</strong>
                      <span>{t.attribution} · {t.company}</span>
                    </div>
                    <div className="cms-row-meta">
                      <VisibilityBadge visible={t.is_visible} />
                    </div>
                    <div className="cms-row-actions">
                      <button type="button" onClick={() => toggleTestimonialVisibility(t.id)} className="action-btn toggle">
                        {t.is_visible ? <EyeOff /> : <Eye />}
                        {t.is_visible ? "Hide" : "Show"}
                      </button>
                      <button type="button" onClick={() => { setEditingTestimonial(t); setTestMode("edit"); }} className="action-btn toggle">
                        <Pencil /> Edit
                      </button>
                      <button type="button" onClick={() => deleteTestimonial(t.id)} className="action-btn delete">
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {testMode === "edit" && editingTestimonial && (
              <div className="cms-editor">
                <h2>{editingTestimonial.id ? "Edit Testimonial" : "Add New Testimonial"}</h2>
                <div className="cms-editor-simple">
                  <label>Client Quote *
                    <Textarea rows={4} value={editingTestimonial.quote} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })} placeholder="Paste the client's testimonial quote here..." />
                  </label>
                  <label>Client Name / Attribution *
                    <Input value={editingTestimonial.attribution} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, attribution: e.target.value })} placeholder="e.g. CEO, Tech Startup" />
                  </label>
                  <label>Company Name
                    <Input value={editingTestimonial.company} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })} placeholder="e.g. Confidential Client" />
                  </label>
                  <label>Sort Order
                    <Input type="number" value={editingTestimonial.sort_order} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, sort_order: Number(e.target.value) })} />
                  </label>
                  <label>Visibility
                    <select value={editingTestimonial.is_visible ? "visible" : "hidden"} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, is_visible: e.target.value === "visible" })}>
                      <option value="visible">Visible on site</option>
                      <option value="hidden">Hidden</option>
                    </select>
                  </label>
                  <Button className="w-full text-black font-bold" onClick={saveTestimonial}>
                    <Save /> {editingTestimonial.id ? "Update Testimonial" : "Add Testimonial"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 7: CAREER OPENINGS — Full CRUD
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === "career_openings" && (
          <div className="admin-tab-view">
            <header className="admin-view-header">
              <div>
                <p className="eyebrow">Hiring</p>
                <h1>Career Openings</h1>
              </div>
              {careerMode === "list" ? (
                <Button onClick={() => { setEditingCareer(blankCareer()); setCareerMode("edit"); }}>
                  <Plus /> Add Opening
                </Button>
              ) : (
                <Button variant="outline" onClick={() => { setCareerMode("list"); setEditingCareer(null); }}>
                  <ArrowLeft /> Back to List
                </Button>
              )}
            </header>

            {careerMode === "list" && (
              <div className="cms-list-view">
                {careers.length === 0 && (
                  <div className="empty-proof"><h3>No career openings yet.</h3><p>Click "Add Opening" to post a new job.</p></div>
                )}
                {careers.map((c) => (
                  <div key={c.id} className="cms-row">
                    <div className="cms-row-info">
                      <strong>{c.title}</strong>
                      <span>{c.location} · {c.type}</span>
                      <p className="cms-excerpt">{c.description.slice(0, 100)}{c.description.length > 100 ? "..." : ""}</p>
                    </div>
                    <div className="cms-row-meta">
                      <VisibilityBadge visible={c.is_visible} />
                    </div>
                    <div className="cms-row-actions">
                      <button type="button" onClick={() => toggleCareerVisibility(c.id)} className="action-btn toggle">
                        {c.is_visible ? <EyeOff /> : <Eye />}
                        {c.is_visible ? "Hide" : "Show"}
                      </button>
                      <button type="button" onClick={() => { setEditingCareer(c); setCareerMode("edit"); }} className="action-btn toggle">
                        <Pencil /> Edit
                      </button>
                      <button type="button" onClick={() => deleteCareer(c.id)} className="action-btn delete">
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {careerMode === "edit" && editingCareer && (
              <div className="cms-editor">
                <h2>{editingCareer.id ? "Edit Career Opening" : "Post New Opening"}</h2>
                <div className="cms-editor-simple">
                  <label>Job Title *
                    <Input value={editingCareer.title} onChange={(e) => setEditingCareer({ ...editingCareer, title: e.target.value })} placeholder="e.g. Full-Stack Developer (MERN)" />
                  </label>
                  <label>Location
                    <Input value={editingCareer.location} onChange={(e) => setEditingCareer({ ...editingCareer, location: e.target.value })} placeholder="e.g. Remote / Lahore, Pakistan" />
                  </label>
                  <label>Employment Type
                    <select value={editingCareer.type} onChange={(e) => setEditingCareer({ ...editingCareer, type: e.target.value })}>
                      <option>Full-Time</option>
                      <option>Part-Time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                      <option>Freelance</option>
                    </select>
                  </label>
                  <label>Job Description *
                    <Textarea rows={6} value={editingCareer.description} onChange={(e) => setEditingCareer({ ...editingCareer, description: e.target.value })} placeholder="Describe the role, responsibilities, and requirements..." />
                  </label>
                  <label>Visibility
                    <select value={editingCareer.is_visible ? "visible" : "hidden"} onChange={(e) => setEditingCareer({ ...editingCareer, is_visible: e.target.value === "visible" })}>
                      <option value="visible">Active (visible on Careers page)</option>
                      <option value="hidden">Hidden (paused hiring)</option>
                    </select>
                  </label>
                  <Button className="w-full text-black font-bold" onClick={saveCareer}>
                    <Save /> {editingCareer.id ? "Update Opening" : "Post Opening"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 8: SERVICES (read-only directory)
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === "pages" && (
          <div className="admin-tab-view">
            <header className="admin-view-header">
              <div>
                <p className="eyebrow">Visual CMS</p>
                <h1>Pages & Live Preview</h1>
              </div>
            </header>
            <AdminPagesEditor onSaved={(msg) => notify(msg)} />
          </div>
        )}

        {activeTab === "services" && (
          <div className="admin-tab-view">
            <header className="admin-view-header">
              <div>
                <p className="eyebrow">Practice Directory</p>
                <h1>Services & Capabilities</h1>
              </div>
            </header>
            <div className="services-admin-grid">
              {services.map((service, idx) => (
                <div key={service.slug} className="service-admin-card">
                  <div className="service-admin-head">
                    <span>Practice 0{idx + 1}</span>
                    <h3>{service.title}</h3>
                  </div>
                  <p>{service.short}</p>
                  <div className="service-items-chip-list">
                    {service.items.map((item) => (
                      <span key={item} className="item-chip">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════�����══════════════════════════════���══════════════════
            TAB 9: SITE SETTINGS
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === "settings" && (
          <div className="admin-tab-view">
            <header className="admin-view-header">
              <div>
                <p className="eyebrow">Global Configuration</p>
                <h1>Website Settings & Social Links</h1>
              </div>
              <Button onClick={() => notify("Global site settings saved!")}>
                <Save /> Save Settings
              </Button>
            </header>

            <div className="settings-grid">
              <div className="settings-card">
                <h2>Company Identity & Contact</h2>
                <label>Brand Title<Input value={siteSettings.siteName} onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })} /></label>
                <label>Tagline<Input value={siteSettings.tagline} onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })} /></label>
                <label>Contact Phone<Input value={siteSettings.phone} onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })} /></label>
                <label>WhatsApp Link<Input value={siteSettings.whatsapp} onChange={(e) => setSiteSettings({ ...siteSettings, whatsapp: e.target.value })} /></label>
                <label>Contact Email<Input value={siteSettings.email} onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })} /></label>
              </div>

              <div className="settings-card">
                <h2>Announcement Banner</h2>
                <label>Banner Text<Input value={siteSettings.announcementBanner} onChange={(e) => setSiteSettings({ ...siteSettings, announcementBanner: e.target.value })} /></label>
                <label>Banner Status
                  <select value={siteSettings.bannerActive ? "active" : "hidden"} onChange={(e) => setSiteSettings({ ...siteSettings, bannerActive: e.target.value === "active" })}>
                    <option value="active">Active (shown on site)</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </label>

                <h2 style={{ marginTop: "1.5rem" }}>Social Media Channels</h2>
                <label>LinkedIn<Input value={siteSettings.linkedin} onChange={(e) => setSiteSettings({ ...siteSettings, linkedin: e.target.value })} /></label>
                <label>Instagram<Input value={siteSettings.instagram} onChange={(e) => setSiteSettings({ ...siteSettings, instagram: e.target.value })} /></label>
                <label>Facebook<Input value={siteSettings.facebook} onChange={(e) => setSiteSettings({ ...siteSettings, facebook: e.target.value })} /></label>
                <label>X (Twitter)<Input value={siteSettings.x} onChange={(e) => setSiteSettings({ ...siteSettings, x: e.target.value })} /></label>
                <label>YouTube<Input value={siteSettings.youtube} onChange={(e) => setSiteSettings({ ...siteSettings, youtube: e.target.value })} /></label>
                <label>Discord<Input value={siteSettings.discord} onChange={(e) => setSiteSettings({ ...siteSettings, discord: e.target.value })} /></label>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
