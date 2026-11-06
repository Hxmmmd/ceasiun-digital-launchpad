import { AdminUser, ContactInquiry } from "./admin.d";

export const defaultAdminUsers: AdminUser[] = [
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
  {
    id: "editor-1",
    name: "Sarah Jenkins",
    email: "editor@ceasiun.com",
    role: "Content Editor",
    password: "editor123",
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "seo-1",
    name: "Tariq Mahmood",
    email: "seo@ceasiun.com",
    role: "SEO Manager",
    password: "seo123",
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "support-1",
    name: "Zainab Raza",
    email: "support@ceasiun.com",
    role: "Support",
    password: "support123",
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "client-1",
    name: "Apex Global Holdings",
    email: "client@ceasiun.com",
    role: "Client",
    password: "client123",
    status: "Active",
    createdAt: new Date().toISOString(),
  },
];

export const defaultInquiries: ContactInquiry[] = [
  {
    id: "inq-1",
    name: "Hammad Khan",
    email: "hammad@example.com",
    phone: "0314 0262087",
    service: "Website Development",
    budget: "$1,000 - $3,000",
    message:
      "We need a full-stack custom web platform built for our digital agency with high SEO ranking and automated client onboarding.",
    status: "New",
    createdAt: new Date().toISOString(),
  },
  {
    id: "inq-2",
    name: "Elena Rostova",
    email: "elena@nordicscale.io",
    phone: "+44 20 7946 0912",
    service: "AI / Automation",
    budget: "$3,000 - $5,000",
    message:
      "Looking to automate customer support routing and integrate OpenAI-powered triage agents into our internal workflow.",
    status: "In Progress",
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: "inq-3",
    name: "David Chen",
    email: "d.chen@apexfin.com",
    phone: "+1 415 555 2671",
    service: "Cyber Security",
    budget: "$5,000+",
    message:
      "Conducting quarterly web penetration audit and cloud vulnerability scan for our Series-A financial platform.",
    status: "Resolved",
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
];