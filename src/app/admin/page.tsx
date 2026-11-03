"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Sparkles,
  Trash2,
  UserCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type MainTab = "overview" | "users" | "inquiries";

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
  }
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<MainTab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error">("success");

  // Core state
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() =>
    loadLocal("ceasiun_admin_users", defaultAdminUsers)
  );
  const [newUser, setNewUser] = useState<Partial<AdminUser>>({
    name: "",
    email: "",
    role: "Super Admin",
    password: "",
    status: "Active",
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() =>
    loadLocal("ceasiun_contact_inquiries", defaultInquiries)
  );

  // Persist state
  useEffect(() => saveLocal("ceasiun_admin_users", adminUsers), [adminUsers]);
  useEffect(() => saveLocal("ceasiun_contact_inquiries", inquiries), [inquiries]);

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

  // Admin Users Management
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

  // Inquiries Management
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

  // Sign out
  async function handleSignOut() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ceasiun_demo_admin");
      localStorage.removeItem("ceasiun_active_user");
    }
    router.replace("/auth");
  }

  const tabLabel: Record<MainTab, string> = {
    overview: "Dashboard",
    users: "Admin & Users",
    inquiries: "Inquiries",
  };

  return (
    <main
      className={`admin ${sidebarOpen ? "sidebar-open" : ""} ${
        sidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <div className="admin-preload-bar" aria-hidden="true" />
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

        {/* TAB 1: OVERVIEW */}
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
              <div className="kpi-card" onClick={() => setActiveTab("inquiries")} style={{ cursor: "pointer" }}>
                <div className="kpi-icon"><Inbox /></div>
                <div>
                  <strong>{inquiries.filter((i) => i.status === "In Progress").length}</strong>
                  <span>In Progress</span>
                </div>
              </div>
              <div className="kpi-card" onClick={() => setActiveTab("inquiries")} style={{ cursor: "pointer" }}>
                <div className="kpi-icon"><CheckCircle2 /></div>
                <div>
                  <strong>{inquiries.filter((i) => i.status === "Resolved").length}</strong>
                  <span>Resolved</span>
                </div>
              </div>
            </div>

            <div className="overview-split-grid">
              <div className="overview-panel">
                <h3>Quick Actions</h3>
                <div className="action-buttons-list">
                  <Button onClick={() => setActiveTab("inquiries")}>
                    <Inbox /> View Inquiries ({inquiries.length})
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("users")}>
                    <UserPlus /> Add Admin User
                  </Button>
                </div>
              </div>

              <div className="overview-panel">
                <h3>Inquiries Summary</h3>
                <ul className="quick-users-list">
                  <li>
                    <div>
                      <strong>New Inquiries</strong>
                      <span>{inquiries.filter((i) => i.status === "New").length} requiring attention</span>
                    </div>
                    <button onClick={() => setActiveTab("inquiries")} type="button" className="action-btn toggle">
                      View
                    </button>
                  </li>
                  <li>
                    <div>
                      <strong>In Progress</strong>
                      <span>{inquiries.filter((i) => i.status === "In Progress").length} currently active</span>
                    </div>
                    <button onClick={() => setActiveTab("inquiries")} type="button" className="action-btn toggle">
                      View
                    </button>
                  </li>
                  <li>
                    <div>
                      <strong>Resolved</strong>
                      <span>{inquiries.filter((i) => i.status === "Resolved").length} completed</span>
                    </div>
                    <button onClick={() => setActiveTab("inquiries")} type="button" className="action-btn toggle">
                      View
                    </button>
                  </li>
                  <li>
                    <div>
                      <strong>Active Administrators</strong>
                      <span>{adminUsers.filter((u) => u.status === "Active").length} accounts enabled</span>
                    </div>
                    <button onClick={() => setActiveTab("users")} type="button" className="action-btn toggle">
                      Manage
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USERS */}
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
                  <label>
                    Full Name
                    <Input
                      placeholder="e.g. Hammad Khan"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Email Address
                    <Input
                      type="email"
                      placeholder="admin@ceasiun.com"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Account Password
                    <Input
                      type="text"
                      placeholder="Assign a password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Role Designation
                    <select
                      value={newUser.role}
                      onChange={(e) =>
                        setNewUser({ ...newUser, role: e.target.value as AdminUser["role"] })
                      }
                    >
                      <option value="Super Admin">Super Admin (Full Control)</option>
                      <option value="Content Editor">Content Editor</option>
                      <option value="SEO Manager">SEO Manager</option>
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
                            <button
                              type="button"
                              onClick={() => handleToggleUserStatus(user.id)}
                              className="action-btn toggle"
                            >
                              {user.status === "Active" ? "Disable" : "Enable"}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(user.id)}
                              className="action-btn delete"
                            >
                              <Trash2 />
                            </button>
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

        {/* TAB 3: INQUIRIES */}
        {activeTab === "inquiries" && (
          <div className="admin-tab-view">
            <header className="admin-view-header">
              <div>
                <p className="eyebrow">Client Submissions</p>
                <h1>Contact Inquiries Inbox</h1>
              </div>
              <div className="status-indicator">
                <span className={inquiries.filter((i) => i.status === "New").length > 0 ? "dot online" : "dot"} />
                {inquiries.filter((i) => i.status === "New").length} Unread
              </div>
            </header>

            <div className="inquiries-layout">
              {inquiries.length === 0 && (
                <div className="empty-proof">
                  <h3>No inquiries yet.</h3>
                  <p>Client messages from the contact form will appear here.</p>
                </div>
              )}
              {inquiries.map((inq) => (
                <div key={inq.id} className="inquiry-card">
                  <div className="inquiry-header">
                    <div>
                      <h3>{inq.name}</h3>
                      <p>{inq.email}{inq.phone && ` · ${inq.phone}`}</p>
                    </div>
                    <span className={`inquiry-badge ${inq.status.toLowerCase().replace(" ", "-")}`}>
                      {inq.status}
                    </span>
                  </div>
                  {inq.service && (
                    <div className="inquiry-meta">
                      <span><strong>Service:</strong> {inq.service}</span>
                      {inq.budget && <span><strong>Budget:</strong> {inq.budget}</span>}
                    </div>
                  )}
                  <div className="inquiry-body"><p>{inq.message}</p></div>
                  <div className="inquiry-actions">
                    <button onClick={() => handleInquiryStatus(inq.id, "In Progress")} className="inq-btn progress">
                      Mark In Progress
                    </button>
                    <button onClick={() => handleInquiryStatus(inq.id, "Resolved")} className="inq-btn resolve">
                      Mark Resolved
                    </button>
                    <button onClick={() => handleDeleteInquiry(inq.id)} className="inq-btn delete">
                      <Trash2 /> Delete
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
