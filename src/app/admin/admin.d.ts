export type RoleType =
  | "Super Admin"
  | "Content Editor"
  | "SEO Manager"
  | "Support"
  | "Client";

export type MainTab =
  | "overview"
  | "users"
  | "inquiries"
  | "editorial"
  | "seo"
  | "tickets"
  | "client-portal";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  password?: string;
  status: "Active" | "Disabled";
  createdAt: string;
}

export interface ContactInquiry {
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