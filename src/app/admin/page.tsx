"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  EyeOff,
  FileCheck2,
  FileText,
  Filter,
  Globe,
  Inbox,
  KeyRound,
  Layers,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  PenTool,
  Plus,
  RefreshCw,
  Search,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Tag,
  Target,
  Trash2,
  TrendingUp,
  User,
  UserCheck,
  UserPlus,
  Users,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { RoleType, MainTab, AdminUser, ContactInquiry } from "./admin.d";
import { loadLocal, saveLocal } from "./admin.util";
import { defaultAdminUsers, defaultInquiries } from "./admin.data.demo";


export default function AdminDashboard() {
  const router = useRouter();

  // Authentication check
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [activeRole, setActiveRole] = useState<RoleType>("Super Admin");
  const [authChecked, setAuthChecked] = useState(false);

  // Layout states
  const [activeTab, setActiveTab] = useState<MainTab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error">("success");

  // Core Data
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() =>
    loadLocal("ceasiun_admin_users", defaultAdminUsers)
  );

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() =>
    loadLocal("ceasiun_contact_inquiries", defaultInquiries)
  );

  // New user creation form state (Admin only)
  const [newUser, setNewUser] = useState<{
    name: string;
    email: string;
    phone: string;
    role: RoleType;
    clientCompany: string;
    password: string;
    status: "Active" | "Disabled";
  }>({
    name: "",
    email: "",
    phone: "",
    role: "Content Editor",
    clientCompany: "",
    password: "",
    status: "Active",
  });

  // Search & display state for User Directory
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [showNewUserPassword, setShowNewUserPassword] = useState(false);

  // Client quick request message
  const [clientRequestText, setClientRequestText] = useState("");

  // Sync to local storage
  useEffect(() => {
    saveLocal("ceasiun_admin_users", adminUsers);
  }, [adminUsers]);

  useEffect(() => {
    saveLocal("ceasiun_contact_inquiries", inquiries);
  }, [inquiries]);

  // Check auth session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuthed = localStorage.getItem("ceasiun_demo_admin");
      const activeRaw = localStorage.getItem("ceasiun_active_user");

      if (!isAuthed && !activeRaw) {
        router.replace("/auth");
        return;
      }

      if (activeRaw) {
        try {
          const parsed = JSON.parse(activeRaw);
          setCurrentUser(parsed);
          setActiveRole(parsed.role || "Super Admin");
        } catch {
          setCurrentUser(defaultAdminUsers[0]);
          setActiveRole("Super Admin");
        }
      } else {
        setCurrentUser(defaultAdminUsers[0]);
        setActiveRole("Super Admin");
      }
      setAuthChecked(true);
    }
  }, [router]);

  function notify(msg: string, type: "success" | "error" = "success") {
    setFeedbackMessage(msg);
    setFeedbackType(type);
    setTimeout(() => setFeedbackMessage(""), 4500);
  }

  function toggleSidebar() {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 899px)").matches) {
      setSidebarOpen((open) => !open);
      return;
    }
    setSidebarCollapsed((collapsed) => !collapsed);
  }

  function selectTab(tab: MainTab) {
    // Strict Gate: Only Super Admin can access "users" tab
    if (tab === "users" && activeRole !== "Super Admin") {
      notify("Access Denied: User Management is strictly restricted to Super Administrators.", "error");
      return;
    }
    setActiveTab(tab);
    setSidebarOpen(false);
  }

  // Switch role simulator (For testing & previewing)
  function handleRoleSwitch(newRole: RoleType) {
    setActiveRole(newRole);
    setActiveTab("overview");
    notify(`Dashboard switched to ${newRole} mode.`);
  }

  // User Management (Super Admin ONLY)
  function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    if (activeRole !== "Super Admin") {
      notify("Security Exception: Only Super Admin can create accounts.", "error");
      return;
    }

    if (!newUser.email || !newUser.password) {
      notify("Email and Password are required.", "error");
      return;
    }

    const cleanEmail = newUser.email.trim().toLowerCase();
    const existing = adminUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      notify(`User with email "${cleanEmail}" already exists.`, "error");
      return;
    }

    const created: AdminUser = {
      id: `usr-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: newUser.name.trim() || cleanEmail.split("@")[0],
      email: cleanEmail,
      role: newUser.role,
      password: newUser.password,
      status: newUser.status,
      createdAt: new Date().toISOString(),
    };

    setAdminUsers((prev) => [created, ...prev]);
    setNewUser({
      name: "",
      email: "",
      phone:"",
      role: "Content Editor",
      clientCompany:"",
      password: "",
      status: "Active",
    });
    notify(`New user "${created.name}" created with role [${created.role}]!`);
  }

  function handleToggleUserStatus(id: string) {
    if (activeRole !== "Super Admin") {
      notify("Only Super Admin can modify account status.", "error");
      return;
    }
    setAdminUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Disabled" : "Active" }
          : u
      )
    );
    notify("User status updated.");
  }

  function handleDeleteUser(id: string) {
    if (activeRole !== "Super Admin") {
      notify("Only Super Admin can delete users.", "error");
      return;
    }
    if (adminUsers.length <= 1) {
      alert("At least one Super Admin account must remain in the system.");
      return;
    }
    const target = adminUsers.find((u) => u.id === id);
    if (target?.email === "admin@example.com" || target?.email === "ceasiun@gmail.com") {
      alert("Cannot delete primary master administrative accounts.");
      return;
    }

    if (confirm(`Are you sure you want to delete ${target?.name || "this user"}?`)) {
      setAdminUsers((prev) => prev.filter((u) => u.id !== id));
      notify("User deleted successfully.");
    }
  }

  // Inquiries / Support Ticket Management
  function handleInquiryStatus(id: string, status: "New" | "In Progress" | "Resolved") {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    notify(`Inquiry marked as ${status}.`);
  }

  function handleDeleteInquiry(id: string) {
    if (confirm("Delete this inquiry from records?")) {
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      notify("Inquiry removed.");
    }
  }

  // Client submit request
  function handleClientSubmitRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!clientRequestText.trim()) return;

    const newInq: ContactInquiry = {
      id: `req-${Date.now()}`,
      name: currentUser?.name || "Apex Client",
      email: currentUser?.email || "client@ceasiun.com",
      service: "Client Portal Request",
      budget: "Retainer SLA",
      message: clientRequestText.trim(),
      status: "New",
      createdAt: new Date().toISOString(),
    };

    setInquiries((prev) => [newInq, ...prev]);
    setClientRequestText("");
    notify("Your priority request was submitted to Ceasiun Engineering!");
  }

  // Sign out
  function handleSignOut() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ceasiun_demo_admin");
      localStorage.removeItem("ceasiun_active_user");
    }
    router.replace("/auth");
  }

  if (!authChecked) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-loading-spinner" />
        <p>Verifying Security Credentials...</p>
      </div>
    );
  }

  return (
    <main
      className={`admin ${sidebarOpen ? "sidebar-open" : ""} ${
        sidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <div className="admin-preload-bar" aria-hidden="true" />

      {/* SIDEBAR NAVIGATION */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/ceasiun-logo.svg" alt="Ceasiun Logo" width={36} height={36} />
          <div>
            <strong>CEASIUN</strong>
            <span className="admin-role-badge">{activeRole}</span>
          </div>
        </div>

        {/* Current User Quick Identity */}
        <div className="admin-user-identity-card">
          <div className="identity-avatar">
            {currentUser?.name ? currentUser.name[0].toUpperCase() : "A"}
          </div>
          <div className="identity-meta">
            <span className="identity-name">{currentUser?.name || "Staff Member"}</span>
            <span className="identity-email">{currentUser?.email || "user@ceasiun.com"}</span>
          </div>
        </div>

        <nav className="admin-nav-menu">
          <p className="admin-nav-group">Workspace</p>

          {/* Tab: Overview (common, but customized per role) */}
          <button
            type="button"
            className={activeTab === "overview" ? "selected" : ""}
            onClick={() => selectTab("overview")}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard Overview</span>
          </button>

          {/* ROLE GATED NAVIGATION */}
          {/* 1. Super Admin ONLY: User Management */}
          {activeRole === "Super Admin" && (
            <button
              type="button"
              className={activeTab === "users" ? "selected" : ""}
              onClick={() => selectTab("users")}
            >
              <UserCheck size={18} />
              <span>Admin & Users</span>
              <span className="nav-counter">{adminUsers.length}</span>
            </button>
          )}

          {/* 2. Inquiries: Super Admin & Support */}
          {(activeRole === "Super Admin" || activeRole === "Support") && (
            <button
              type="button"
              className={activeTab === "inquiries" ? "selected" : ""}
              onClick={() => selectTab("inquiries")}
            >
              <Inbox size={18} />
              <span>Inquiries Inbox</span>
              {inquiries.filter((i) => i.status === "New").length > 0 && (
                <span className="nav-counter alert">
                  {inquiries.filter((i) => i.status === "New").length} new
                </span>
              )}
            </button>
          )}

          {/* 3. Content Editor: Editorial pipeline */}
          {activeRole === "Content Editor" && (
            <button
              type="button"
              className={activeTab === "editorial" ? "selected" : ""}
              onClick={() => selectTab("editorial")}
            >
              <PenTool size={18} />
              <span>Editorial Pipeline</span>
              <span className="nav-counter">4 drafts</span>
            </button>
          )}

          {/* 4. SEO Manager: Search & Keywords */}
          {activeRole === "SEO Manager" && (
            <button
              type="button"
              className={activeTab === "seo" ? "selected" : ""}
              onClick={() => selectTab("seo")}
            >
              <TrendingUp size={18} />
              <span>Rankings & Vitals</span>
              <span className="nav-counter">+42%</span>
            </button>
          )}

          {/* 5. Client: Project Deliverables */}
          {activeRole === "Client" && (
            <button
              type="button"
              className={activeTab === "client-portal" ? "selected" : ""}
              onClick={() => selectTab("client-portal")}
            >
              <Layers size={18} />
              <span>Project Deliverables</span>
              <span className="nav-counter">85%</span>
            </button>
          )}

          {/* Navigation link back to live site */}
          <p className="admin-nav-group">External</p>
          <Link href="/" target="_blank" className="admin-nav-link-btn">
            <Globe size={18} />
            <span>View Live Website</span>
            <ExternalLink size={13} className="ml-auto opacity-60" />
          </Link>
        </nav>

        {/* Sidebar Footer with Sign Out */}
        <div className="admin-sidebar-footer">
          <button onClick={handleSignOut} type="button" className="signout-btn">
            <LogOut size={16} /> <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      <button
        type="button"
        className="admin-sidebar-backdrop"
        aria-label="Close admin navigation"
        onClick={() => setSidebarOpen(false)}
      />

      {/* MAIN CONTENT AREA */}
      <section className="admin-main-section">
        {/* TOPBAR */}
        <div className="admin-topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="admin-menu-toggle"
              aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="topbar-title-block">
              <span className="topbar-breadcrumb">Ceasiun System / {activeRole}</span>
              <h2 className="topbar-tab-title">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "users" && "User & Role Management"}
                {activeTab === "inquiries" && "Client Inquiries Inbox"}
                {activeTab === "editorial" && "Content & Editorial Hub"}
                {activeTab === "seo" && "SEO & Organic Growth Station"}
                {activeTab === "client-portal" && "Client Delivery Portal"}
              </h2>
            </div>
          </div>

          {/* Role Preview Switcher: Only available for Super Admin */}
          <div className="topbar-actions">
            {currentUser?.role === "Super Admin" ? (
              <div className="role-simulator-dropdown">
                <label htmlFor="role-select" className="role-select-label">
                  <Sparkles size={13} />
                  <span>Admin Role View:</span>
                </label>
                <select
                  id="role-select"
                  value={activeRole}
                  onChange={(e) => handleRoleSwitch(e.target.value as RoleType)}
                  className="role-simulator-select"
                >
                  <option value="Super Admin">Super Admin (Full Access)</option>
                  <option value="Content Editor">Content Editor Dashboard</option>
                  <option value="SEO Manager">SEO Manager Dashboard</option>
                  <option value="Support">Support Agent Dashboard</option>
                  <option value="Client">Client Portal Dashboard</option>
                </select>
              </div>
            ) : (
              <div className="role-simulator-dropdown">
                <span className="role-select-label">
                  <ShieldCheck size={13} />
                  <span>Authorized Role:</span>
                </span>
                <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                  {currentUser?.role}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Global Feedback Alert Banner */}
        {feedbackMessage && (
          <div className={`admin-alert-banner ${feedbackType}`} role="status">
            {feedbackType === "success" ? (
              <CheckCircle2 size={16} className="alert-icon" />
            ) : (
              <AlertCircle size={16} className="alert-icon" />
            )}
            <span>{feedbackMessage}</span>
            <button
              type="button"
              onClick={() => setFeedbackMessage("")}
              aria-label="Dismiss alert"
            >
              ×
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DASHBOARD TYPE 1: SUPER ADMIN DASHBOARD */}
        {/* ========================================================================= */}
        {activeRole === "Super Admin" && activeTab === "overview" && (
          <div className="admin-tab-view">
            <header className="admin-view-header">
              <div>
                <p className="eyebrow">Enterprise Command Center</p>
                <h1>Super Administrator Overview</h1>
                <p className="header-subtitle">
                  Full system privileges: manage users, provision roles, audit inquiries, and observe operational metrics.
                </p>
              </div>
              <div className="status-indicator">
                <span className="dot online" /> System Core Operational
              </div>
            </header>

            {/* KPI Cards Grid */}
            <div className="admin-kpi-grid">
              <div
                className="kpi-card"
                onClick={() => selectTab("users")}
                style={{ cursor: "pointer" }}
              >
                <div className="kpi-icon">
                  <Users />
                </div>
                <div>
                  <strong>{adminUsers.length}</strong>
                  <span>Active Accounts</span>
                </div>
                <div className="kpi-trend positive">Full RBAC Control</div>
              </div>

              <div
                className="kpi-card"
                onClick={() => selectTab("inquiries")}
                style={{ cursor: "pointer" }}
              >
                <div className="kpi-icon">
                  <Inbox />
                </div>
                <div>
                  <strong>{inquiries.filter((i) => i.status === "New").length}</strong>
                  <span>New Inquiries</span>
                </div>
                <div className="kpi-trend alert">Requires Action</div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon">
                  <ShieldCheck />
                </div>
                <div>
                  <strong>99.98%</strong>
                  <span>System Uptime</span>
                </div>
                <div className="kpi-trend positive">Zero Breaches</div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon">
                  <Zap />
                </div>
                <div>
                  <strong>5</strong>
                  <span>Dedicated Roles</span>
                </div>
                <div className="kpi-trend">RBAC Enforced</div>
              </div>
            </div>

            {/* Admin Overview Split Grid */}
            <div className="overview-split-grid">
              {/* Quick Actions Panel */}
              <div className="overview-panel">
                <div className="panel-header">
                  <h3>
                    <UserPlus size={18} /> Provision New User
                  </h3>
                  <span className="panel-tag">Super Admin Exclusive</span>
                </div>
                <p className="panel-desc">
                  Public signup is disabled. Create staff accounts and assign their customized dashboard permissions below.
                </p>
                <div className="quick-action-cta-row">
                  <Button
                    onClick={() => selectTab("users")}
                    className="btn-primary-action"
                  >
                    <UserPlus size={16} /> Open User Management & Provisioning
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => selectTab("inquiries")}
                    className="btn-secondary-action"
                  >
                    <Inbox size={16} /> Review Inquiries ({inquiries.length})
                  </Button>
                </div>
              </div>

              {/* Roles Breakdown Card */}
              <div className="overview-panel">
                <div className="panel-header">
                  <h3>
                    <Shield size={18} /> Active Role Distribution
                  </h3>
                  <span className="panel-tag">Security Policy</span>
                </div>
                <ul className="role-distribution-list">
                  <li className="role-dist-item">
                    <span className="role-tag-badge super-admin">Super Admin</span>
                    <span className="role-count">
                      {adminUsers.filter((u) => u.role === "Super Admin").length} users
                    </span>
                  </li>
                  <li className="role-dist-item">
                    <span className="role-tag-badge content-editor">Content Editor</span>
                    <span className="role-count">
                      {adminUsers.filter((u) => u.role === "Content Editor").length} users
                    </span>
                  </li>
                  <li className="role-dist-item">
                    <span className="role-tag-badge seo-manager">SEO Manager</span>
                    <span className="role-count">
                      {adminUsers.filter((u) => u.role === "SEO Manager").length} users
                    </span>
                  </li>
                  <li className="role-dist-item">
                    <span className="role-tag-badge support">Support Agent</span>
                    <span className="role-count">
                      {adminUsers.filter((u) => u.role === "Support").length} users
                    </span>
                  </li>
                  <li className="role-dist-item">
                    <span className="role-tag-badge client">Client Account</span>
                    <span className="role-count">
                      {adminUsers.filter((u) => u.role === "Client").length} users
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DASHBOARD TYPE 2: CONTENT EDITOR DASHBOARD */}
        {/* ========================================================================= */}
        {(activeRole === "Content Editor" || (activeRole !== "Super Admin" && activeTab === "editorial")) && (
          <div className="admin-tab-view role-specialized-view">
            <header className="admin-view-header">
              <div>
                <p className="eyebrow">Creative & Publishing Suite</p>
                <h1>Editorial & Content Hub</h1>
                <p className="header-subtitle">
                  Manage agency articles, client case studies, copy review cycles, and technical publication pipeline.
                </p>
              </div>
              <div className="status-indicator">
                <span className="dot online" /> Publishing Engine Ready
              </div>
            </header>

            {/* Editorial KPIs */}
            <div className="admin-kpi-grid">
              <div className="kpi-card">
                <div className="kpi-icon">
                  <BookOpen />
                </div>
                <div>
                  <strong>12</strong>
                  <span>Published Case Studies</span>
                </div>
                <div className="kpi-trend positive">+3 this month</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon">
                  <PenTool />
                </div>
                <div>
                  <strong>4</strong>
                  <span>Active Drafts</span>
                </div>
                <div className="kpi-trend">In Peer Review</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon">
                  <FileText />
                </div>
                <div>
                  <strong>48.5k</strong>
                  <span>Curated Words</span>
                </div>
                <div className="kpi-trend positive">94% Readability</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon">
                  <Sparkles />
                </div>
                <div>
                  <strong>100%</strong>
                  <span>Styleguide Alignment</span>
                </div>
                <div className="kpi-trend positive">Ceasiun Tone</div>
              </div>
            </div>

            {/* Editorial Pipeline Cards */}
            <div className="editorial-pipeline-section">
              <div className="section-title-row">
                <h3>Editorial Pipeline & Review Board</h3>
                <Button size="sm" className="btn-editor-action">
                  <Plus size={14} /> New Article Draft
                </Button>
              </div>

              <div className="editorial-board-grid">
                <div className="editorial-card in-draft">
                  <div className="editorial-card-header">
                    <span className="editorial-status-tag draft">Draft</span>
                    <span className="editorial-date">2 hrs ago</span>
                  </div>
                  <h4>Scaling Micro-frontends with Next.js 15 Server Components</h4>
                  <p>
                    Technical deep-dive on server actions, dynamic caching, and component streaming in large e-commerce platforms.
                  </p>
                  <div className="editorial-card-footer">
                    <span className="tag-pill">Website Development</span>
                    <span className="author-pill">Sarah Jenkins</span>
                  </div>
                </div>

                <div className="editorial-card in-review">
                  <div className="editorial-card-header">
                    <span className="editorial-status-tag review">In Review</span>
                    <span className="editorial-date">Yesterday</span>
                  </div>
                  <h4>Autonomous AI Agents for Customer Triage Workflows</h4>
                  <p>
                    How Ceasiun deployed automated LLM classification to reduce client support ticket resolution times by 70%.
                  </p>
                  <div className="editorial-card-footer">
                    <span className="tag-pill">AI / Automation</span>
                    <span className="author-pill">Sarah Jenkins</span>
                  </div>
                </div>

                <div className="editorial-card published">
                  <div className="editorial-card-header">
                    <span className="editorial-status-tag live">Published</span>
                    <span className="editorial-date">Nov 02, 2026</span>
                  </div>
                  <h4>Brand Identity Re-architecture for Modern Fintechs</h4>
                  <p>
                    Crafting cybernetic visual systems with vector kinetic accents and high-contrast typography.
                  </p>
                  <div className="editorial-card-footer">
                    <span className="tag-pill">Brand Identity</span>
                    <span className="author-pill">Lead Creative</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DASHBOARD TYPE 3: SEO MANAGER DASHBOARD */}
        {/* ========================================================================= */}
        {(activeRole === "SEO Manager" || (activeRole !== "Super Admin" && activeTab === "seo")) && (
          <div className="admin-tab-view role-specialized-view">
            <header className="admin-view-header">
              <div>
                <p className="eyebrow">Search Intelligence & Performance</p>
                <h1>SEO & Growth Analytics Station</h1>
                <p className="header-subtitle">
                  Real-time SERP rankings, organic keyword velocity, Core Web Vitals SLA telemetry, and indexing health.
                </p>
              </div>
              <div className="status-indicator">
                <span className="dot online" /> Googlebot Crawl Status: Normal
              </div>
            </header>

            {/* SEO Metrics Grid */}
            <div className="admin-kpi-grid">
              <div className="kpi-card">
                <div className="kpi-icon">
                  <TrendingUp />
                </div>
                <div>
                  <strong>84.2k</strong>
                  <span>Organic Impressions</span>
                </div>
                <div className="kpi-trend positive">+42.8% vs last mo</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon">
                  <Target />
                </div>
                <div>
                  <strong>#3.2</strong>
                  <span>Avg SERP Ranking</span>
                </div>
                <div className="kpi-trend positive">18 keywords in Top 3</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon">
                  <Zap />
                </div>
                <div>
                  <strong>100%</strong>
                  <span>Core Web Vitals Pass</span>
                </div>
                <div className="kpi-trend positive">LCP 0.8s · CLS 0.01</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon">
                  <Globe />
                </div>
                <div>
                  <strong>142</strong>
                  <span>Indexed URLs</span>
                </div>
                <div className="kpi-trend positive">Zero 404 Crawl Errors</div>
              </div>
            </div>

            {/* Target Keywords Engine Table */}
            <div className="seo-table-card">
              <div className="panel-header">
                <h3>
                  <Target size={18} /> Priority Keyword Tracking Engine
                </h3>
                <span className="panel-tag">Updated 10m ago</span>
              </div>
              <div className="users-table-wrapper">
                <table className="users-table seo-table">
                  <thead>
                    <tr>
                      <th>Target Search Query</th>
                      <th>SERP Position</th>
                      <th>Search Volume</th>
                      <th>CTR</th>
                      <th>30-Day Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>digital agency karachi</strong>
                      </td>
                      <td>
                        <span className="rank-badge rank-top">#1</span>
                      </td>
                      <td>8,400 / mo</td>
                      <td>18.4%</td>
                      <td>
                        <span className="trend-up">+3 positions</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>custom nextjs web development</strong>
                      </td>
                      <td>
                        <span className="rank-badge rank-top">#2</span>
                      </td>
                      <td>14,200 / mo</td>
                      <td>14.1%</td>
                      <td>
                        <span className="trend-up">+5 positions</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>ai automation agency</strong>
                      </td>
                      <td>
                        <span className="rank-badge rank-mid">#3</span>
                      </td>
                      <td>22,100 / mo</td>
                      <td>11.8%</td>
                      <td>
                        <span className="trend-up">+7 positions</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>cyber security web audit</strong>
                      </td>
                      <td>
                        <span className="rank-badge rank-mid">#4</span>
                      </td>
                      <td>6,900 / mo</td>
                      <td>8.7%</td>
                      <td>
                        <span className="trend-up">+2 positions</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>brand identity design pakistan</strong>
                      </td>
                      <td>
                        <span className="rank-badge rank-top">#1</span>
                      </td>
                      <td>5,100 / mo</td>
                      <td>21.2%</td>
                      <td>
                        <span className="trend-neutral">Stable</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DASHBOARD TYPE 4: SUPPORT AGENT DASHBOARD */}
        {/* ========================================================================= */}
        {(activeRole === "Support" && activeTab === "overview") && (
          <div className="admin-tab-view role-specialized-view">
            <header className="admin-view-header">
              <div>
                <p className="eyebrow">Client Success & Helpdesk</p>
                <h1>Support Command & Inquiries</h1>
                <p className="header-subtitle">
                  Review incoming prospective client inquiries, resolve requests, and manage response SLAs.
                </p>
              </div>
              <div className="status-indicator">
                <span className="dot online" /> Helpdesk Agent Online
              </div>
            </header>

            {/* Support KPIs */}
            <div className="admin-kpi-grid">
              <div
                className="kpi-card"
                onClick={() => selectTab("inquiries")}
                style={{ cursor: "pointer" }}
              >
                <div className="kpi-icon">
                  <Inbox />
                </div>
                <div>
                  <strong>{inquiries.filter((i) => i.status === "New").length}</strong>
                  <span>Pending Inquiries</span>
                </div>
                <div className="kpi-trend alert">Immediate SLA</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon">
                  <Clock />
                </div>
                <div>
                  <strong>12m</strong>
                  <span>Avg First Response</span>
                </div>
                <div className="kpi-trend positive">Target &lt; 30m</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon">
                  <CheckCircle2 />
                </div>
                <div>
                  <strong>96.4%</strong>
                  <span>Resolution SLA</span>
                </div>
                <div className="kpi-trend positive">Above Standard</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon">
                  <Sparkles />
                </div>
                <div>
                  <strong>4.9 / 5</strong>
                  <span>Client CSAT Score</span>
                </div>
                <div className="kpi-trend positive">98 Reviews</div>
              </div>
            </div>

            {/* Canned Quick Templates for Support */}
            <div className="support-quick-responses-card">
              <div className="panel-header">
                <h3>
                  <MessageSquare size={18} /> Canned Reply Templates
                </h3>
                <span className="panel-tag">1-Click Dispatch</span>
              </div>
              <div className="canned-templates-grid">
                <div className="template-box">
                  <strong>Agency Onboarding Timeline</strong>
                  <p>
                    "Thank you for contacting Ceasiun. Our standard project kick-off takes 3-5 business days following technical discovery..."
                  </p>
                </div>
                <div className="template-box">
                  <strong>Custom Engineering Discovery</strong>
                  <p>
                    "We have received your custom requirements. Let's schedule a 20-minute architecture review session with our lead engineer..."
                  </p>
                </div>
                <div className="template-box">
                  <strong>Cyber Security Scope Assessment</strong>
                  <p>
                    "Our penetration testing team will analyze your attack surface and deliver an executive summary report..."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DASHBOARD TYPE 5: CLIENT PORTAL DASHBOARD */}
        {/* ========================================================================= */}
        {(activeRole === "Client" && activeTab === "overview") && (
          <div className="admin-tab-view role-specialized-view client-portal-view">
            <header className="admin-view-header">
              <div>
                <p className="eyebrow">Client Dedicated Workspace</p>
                <h1>Client Project Delivery Portal</h1>
                <p className="header-subtitle">
                  Welcome, <strong>{currentUser?.name || "Valued Client"}</strong>. Track your active project deliverables, review sprint roadmaps, and submit direct requests to our engineering team.
                </p>
              </div>
              <div className="status-indicator">
                <span className="dot online" /> Sprint Active: Week 6 of 7
              </div>
            </header>

            {/* Client KPIs */}
            <div className="admin-kpi-grid">
              <div className="kpi-card">
                <div className="kpi-icon">
                  <BarChart3 />
                </div>
                <div>
                  <strong>85%</strong>
                  <span>Project Completion</span>
                </div>
                <div className="kpi-trend positive">Sprint on Schedule</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon">
                  <Calendar />
                </div>
                <div>
                  <strong>Nov 28, 2026</strong>
                  <span>Target Launch</span>
                </div>
                <div className="kpi-trend">Production Ready</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon">
                  <FileCheck2 />
                </div>
                <div>
                  <strong>6 / 7</strong>
                  <span>Milestones Approved</span>
                </div>
                <div className="kpi-trend positive">Final QA Phase</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon">
                  <UserCheck />
                </div>
                <div>
                  <strong>Hammad Khan</strong>
                  <span>Lead Engineer</span>
                </div>
                <div className="kpi-trend positive">Ceasiun Core Labs</div>
              </div>
            </div>

            {/* Interactive Project Roadmap Stepper */}
            <div className="client-roadmap-card">
              <div className="panel-header">
                <h3>
                  <Layers size={18} /> Project Milestone Trajectory
                </h3>
                <span className="panel-tag">Live Milestone Sync</span>
              </div>
              <div className="roadmap-stepper">
                <div className="milestone-step completed">
                  <div className="step-circle">✓</div>
                  <div className="step-content">
                    <h5>Discovery & Tech Architecture</h5>
                    <p>Scope document & tech stack validation completed.</p>
                  </div>
                </div>
                <div className="milestone-step completed">
                  <div className="step-circle">✓</div>
                  <div className="step-content">
                    <h5>UX Wireframes & Design System</h5>
                    <p>Figma designs approved by client leadership.</p>
                  </div>
                </div>
                <div className="milestone-step completed">
                  <div className="step-circle">✓</div>
                  <div className="step-content">
                    <h5>Full-Stack Web Engineering</h5>
                    <p>Next.js 15, Tailwind, and custom components coded.</p>
                  </div>
                </div>
                <div className="milestone-step active">
                  <div className="step-circle">4</div>
                  <div className="step-content">
                    <h5>Cyber Security & Penetration Testing</h5>
                    <p>Hardening endpoints and performance benchmarking.</p>
                  </div>
                </div>
                <div className="milestone-step pending">
                  <div className="step-circle">5</div>
                  <div className="step-content">
                    <h5>Production Handover & Domain Launch</h5>
                    <p>DNS propagation, SEO indexing, and SLA handover.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Client Request Directly */}
            <div className="overview-split-grid">
              <div className="overview-panel">
                <div className="panel-header">
                  <h3>
                    <Send size={18} /> Submit Priority Request
                  </h3>
                  <span className="panel-tag">Direct Line to Team</span>
                </div>
                <form
                  onSubmit={handleClientSubmitRequest}
                  className="client-request-form"
                >
                  <label>
                    <span>Message to Ceasiun Engineering</span>
                    <textarea
                      rows={3}
                      value={clientRequestText}
                      onChange={(e) => setClientRequestText(e.target.value)}
                      placeholder="e.g. Please update the team bio section and trigger a fresh staging deployment..."
                      required
                      className="client-textarea"
                    />
                  </label>
                  <Button type="submit" className="w-full mt-2">
                    <Send size={15} /> Send Direct Message
                  </Button>
                </form>
              </div>

              {/* Client Asset Downloads */}
              <div className="overview-panel">
                <div className="panel-header">
                  <h3>
                    <FileText size={18} /> Project Assets & Staging
                  </h3>
                  <span className="panel-tag">Secured Vault</span>
                </div>
                <ul className="client-assets-list">
                  <li>
                    <div>
                      <strong>Live Staging Preview</strong>
                      <span>staging.ceasiun.com/preview</span>
                    </div>
                    <span className="asset-status-pill">Active</span>
                  </li>
                  <li>
                    <div>
                      <strong>Figma Design Workspace</strong>
                      <span>Version 2.4 Approved</span>
                    </div>
                    <span className="asset-status-pill">Syncing</span>
                  </li>
                  <li>
                    <div>
                      <strong>Security Audit Certificate</strong>
                      <span>SOC-2 & Penetration Baseline</span>
                    </div>
                    <span className="asset-status-pill">Verified</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: USERS & ROLE MANAGEMENT (SUPER ADMIN EXCLUSIVE) */}
        {/* ========================================================================= */}
        {activeTab === "users" && activeRole === "Super Admin" && (
          <div className="admin-tab-view rbac-view-container">
            {/* Header Block */}
            <header className="admin-view-header">
              <div>
                <p className="eyebrow">Enterprise Access Control</p>
                <h1>User & Role Provisioning</h1>
                <p className="header-subtitle">
                  Public registration is permanently disabled. Super Administrators provision authorized profiles, assign granular role workspaces, and manage active directory records.
                </p>
              </div>
              <div className="status-indicator">
                <span className="dot online" /> {adminUsers.length} Registered Accounts
              </div>
            </header>

            {/* Quick Metrics Bar */}
            <div className="rbac-kpi-bar">
              <div className="rbac-kpi-item">
                <div className="rbac-kpi-icon">
                  <Users size={16} />
                </div>
                <div>
                  <strong>{adminUsers.length}</strong>
                  <span>Total Accounts</span>
                </div>
              </div>
              <div className="rbac-kpi-item">
                <div className="rbac-kpi-icon text-rose-400">
                  <Shield size={16} />
                </div>
                <div>
                  <strong>
                    {adminUsers.filter((u) => u.role === "Super Admin").length}
                  </strong>
                  <span>Super Admins</span>
                </div>
              </div>
              <div className="rbac-kpi-item">
                <div className="rbac-kpi-icon text-cyan-400">
                  <UserCheck size={16} />
                </div>
                <div>
                  <strong>
                    {
                      adminUsers.filter(
                        (u) => u.role !== "Super Admin" && u.role !== "Client"
                      ).length
                    }
                  </strong>
                  <span>Staff Operators</span>
                </div>
              </div>
              <div className="rbac-kpi-item">
                <div className="rbac-kpi-icon text-amber-400">
                  <Layers size={16} />
                </div>
                <div>
                  <strong>
                    {adminUsers.filter((u) => u.role === "Client").length}
                  </strong>
                  <span>Client Portals</span>
                </div>
              </div>
              <div className="rbac-kpi-item">
                <div className="rbac-kpi-icon text-emerald-400">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <strong>Active</strong>
                  <span>2FA Hardware Key</span>
                </div>
              </div>
            </div>

            {/* 2-Column Responsive Layout */}
            <div className="rbac-management-layout">
              {/* LEFT COLUMN: PROVISION USER ACCOUNT */}
              <div className="rbac-provision-card">
                <div className="card-laser-top" aria-hidden="true" />
                <div className="rbac-card-header">
                  <div className="rbac-squircle-icon">
                    <UserPlus size={20} />
                  </div>
                  <div className="rbac-header-copy">
                    <div className="rbac-title-row">
                      <h2>Provision User</h2>
                      <span className="rbac-restricted-badge">
                        <Lock size={10} /> RESTRICTED
                      </span>
                    </div>
                    <p className="rbac-card-subtitle">
                      Assign credentials and designated dashboard permissions.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleCreateUser} className="rbac-form">
                  {/* Full Name */}
                  <div className="rbac-input-group">
                    <label htmlFor="provision-name">Full Name</label>
                    <div className="rbac-field-wrapper">
                      <User
                        size={15}
                        className="rbac-field-icon"
                        aria-hidden="true"
                      />
                      <Input
                        id="provision-name"
                        placeholder="e.g. Sarah Jenkins"
                        value={newUser.name}
                        onChange={(e) =>
                          setNewUser({ ...newUser, name: e.target.value })
                        }
                        required
                        className="rbac-styled-input"
                      />
                    </div>
                  </div>

                  {/* Account Email */}
                  <div className="rbac-input-group">
                    <label htmlFor="provision-email">Email Address</label>
                    <div className="rbac-field-wrapper">
                      <Mail
                        size={15}
                        className="rbac-field-icon"
                        aria-hidden="true"
                      />
                      <Input
                        id="provision-email"
                        type="email"
                        placeholder="user@ceasiun.com"
                        value={newUser.email}
                        onChange={(e) =>
                          setNewUser({ ...newUser, email: e.target.value })
                        }
                        required
                        className="rbac-styled-input"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="rbac-input-group">
                    <label htmlFor="provision-password">Password</label>
                    <div className="rbac-field-wrapper">
                      <KeyRound
                        size={15}
                        className="rbac-field-icon"
                        aria-hidden="true"
                      />
                      <Input
                        id="provision-password"
                        type={showNewUserPassword ? "text" : "password"}
                        placeholder="Assign password (min 6 chars)"
                        value={newUser.password}
                        onChange={(e) =>
                          setNewUser({ ...newUser, password: e.target.value })
                        }
                        required
                        className="rbac-styled-input pr-10"
                      />
                      <button
                        type="button"
                        className="rbac-pw-toggle"
                        onClick={() => setShowNewUserPassword((prev) => !prev)}
                        aria-label={
                          showNewUserPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showNewUserPassword ? (
                          <EyeOff size={15} />
                        ) : (
                          <Eye size={15} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Role Designation */}
                  <div className="rbac-input-group">
                    <label htmlFor="provision-role">
                      Role Designation & Workspace
                    </label>
                    <div className="rbac-select-wrapper">
                      <select
                        id="provision-role"
                        value={newUser.role}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            role: e.target.value as RoleType,
                          })
                        }
                        className="rbac-styled-select"
                      >
                        <option value="Super Admin">
                          Super Admin — Full System Control & User Management
                        </option>
                        <option value="Content Editor">
                          Content Editor — Editorial Pipeline & Publishing Hub
                        </option>
                        <option value="SEO Manager">
                          SEO Manager — Search Rankings & Performance Engine
                        </option>
                        <option value="Support">
                          Support Agent — Inquiries & Helpdesk Center
                        </option>
                        <option value="Client">
                          Client Account — Project Deliverables & Milestones
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Status Segmented Control */}
                  <div className="rbac-input-group">
                    <label>Account Status</label>
                    <div className="rbac-status-segmented">
                      <button
                        type="button"
                        className={`rbac-segment-btn ${
                          newUser.status === "Active" ? "is-active" : ""
                        }`}
                        onClick={() =>
                          setNewUser({ ...newUser, status: "Active" })
                        }
                      >
                        <span className="segment-dot green" /> Active
                      </button>
                      <button
                        type="button"
                        className={`rbac-segment-btn ${
                          newUser.status === "Disabled" ? "is-active" : ""
                        }`}
                        onClick={() =>
                          setNewUser({ ...newUser, status: "Disabled" })
                        }
                      >
                        <span className="segment-dot red" /> Disabled
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    size="lg"
                    type="submit"
                    className="w-full rbac-submit-btn"
                  >
                    <UserPlus size={16} /> Create New User 
                  </Button>
                </form>
              </div>

              {/* RIGHT COLUMN: ACTIVE DIRECTORY & RBAC MATRIX */}
              <div className="rbac-directory-card">
                <div className="card-laser-top" aria-hidden="true" />
                <div className="rbac-card-header rbac-directory-header">
                  <div className="rbac-header-left">
                    <div className="rbac-squircle-icon">
                      <Users size={20} />
                    </div>
                    <div className="rbac-header-copy">
                      <div className="rbac-title-row">
                        <h2>Active Directory</h2>
                        <span className="rbac-counter-pill">
                          {adminUsers.length} Users
                        </span>
                      </div>
                      <p className="rbac-card-subtitle">
                        All registered staff and client accounts across Ceasiun RBAC.
                      </p>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="rbac-search-wrapper">
                    <Search
                      size={14}
                      className="rbac-search-icon"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                      className="rbac-search-input"
                    />
                    {userSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setUserSearchQuery("")}
                        className="rbac-search-clear"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                {/* Table */}
                <div className="rbac-table-container">
                  <table className="rbac-users-table">
                    <thead>
                      <tr>
                        <th>Personnel</th>
                        <th>Assigned Role</th>
                        <th>Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminUsers
                        .filter((u) => {
                          if (!userSearchQuery.trim()) return true;
                          const q = userSearchQuery.toLowerCase();
                          return (
                            u.name.toLowerCase().includes(q) ||
                            u.email.toLowerCase().includes(q) ||
                            u.role.toLowerCase().includes(q)
                          );
                        })
                        .map((user) => {
                          const isProtectedRoot =
                            user.email === "admin@example.com" ||
                            user.email === "ceasiun@gmail.com";

                          return (
                            <tr key={user.id} className="rbac-user-row">
                              {/* Personnel Info */}
                              <td>
                                <div className="rbac-user-meta-cell">
                                  <div
                                    className={`rbac-user-avatar role-${user.role
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}`}
                                  >
                                    {user.name.charAt(0).toUpperCase()}
                                  </div>
                                  <div className="rbac-user-text">
                                    <div className="rbac-name-row">
                                      <strong>{user.name}</strong>
                                      {isProtectedRoot && (
                                        <span
                                          className="rbac-root-badge"
                                          title="Protected Master Account"
                                        >
                                          <Shield size={10} /> ROOT
                                        </span>
                                      )}
                                    </div>
                                    <span className="rbac-user-email">
                                      {user.email}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Role */}
                              <td>
                                <span
                                  className={`rbac-role-pill role-${user.role
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`}
                                >
                                  {user.role}
                                </span>
                              </td>

                              {/* Status */}
                              <td>
                                <span
                                  className={`rbac-status-tag ${user.status.toLowerCase()}`}
                                >
                                  <span className="status-dot" />
                                  {user.status}
                                </span>
                              </td>

                              {/* Actions */}
                              <td className="text-right">
                                <div className="rbac-actions-group">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleToggleUserStatus(user.id)
                                    }
                                    className={`rbac-btn-toggle ${
                                      user.status === "Active"
                                        ? "is-active"
                                        : "is-disabled"
                                    }`}
                                    title={
                                      user.status === "Active"
                                        ? "Suspend user access"
                                        : "Activate user access"
                                    }
                                  >
                                    {user.status === "Active"
                                      ? "Disable"
                                      : "Enable"}
                                  </button>

                                  {!isProtectedRoot && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteUser(user.id)}
                                      className="rbac-btn-delete"
                                      title="Delete user permanently"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: INQUIRIES INBOX (SUPER ADMIN & SUPPORT) */}
        {/* ========================================================================= */}
        {activeTab === "inquiries" && (activeRole === "Super Admin" || activeRole === "Support") && (
          <div className="admin-tab-view">
            <header className="admin-view-header">
              <div>
                <p className="eyebrow">Client Communications</p>
                <h1>Contact Inquiries Inbox</h1>
                <p className="header-subtitle">
                  Review client leads, update request progress, and coordinate delivery scopes.
                </p>
              </div>
              <div className="status-indicator">
                <span
                  className={
                    inquiries.filter((i) => i.status === "New").length > 0
                      ? "dot online"
                      : "dot"
                  }
                />
                {inquiries.filter((i) => i.status === "New").length} Unread Leads
              </div>
            </header>

            <div className="inquiries-layout">
              {inquiries.length === 0 && (
                <div className="empty-proof">
                  <h3>No client inquiries yet.</h3>
                  <p>Inquiries submitted from the contact form will appear here automatically.</p>
                </div>
              )}
              {inquiries.map((inq) => (
                <div key={inq.id} className="inquiry-card">
                  <div className="inquiry-header">
                    <div>
                      <h3>{inq.name}</h3>
                      <p>
                        {inq.email}
                        {inq.phone && ` · ${inq.phone}`}
                      </p>
                    </div>
                    <span
                      className={`inquiry-badge ${inq.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {inq.status}
                    </span>
                  </div>

                  {inq.service && (
                    <div className="inquiry-meta">
                      <span>
                        <strong>Requested Service:</strong> {inq.service}
                      </span>
                      {inq.budget && (
                        <span>
                          <strong>Budget Range:</strong> {inq.budget}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="inquiry-body">
                    <p>{inq.message}</p>
                  </div>

                  <div className="inquiry-actions">
                    <button
                      type="button"
                      onClick={() => handleInquiryStatus(inq.id, "In Progress")}
                      className="inq-btn progress"
                    >
                      Mark In Progress
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInquiryStatus(inq.id, "Resolved")}
                      className="inq-btn resolve"
                    >
                      Mark Resolved
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteInquiry(inq.id)}
                      className="inq-btn delete"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
