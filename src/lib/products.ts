export type Product = {
  id: string;
  slug: string;
  name: string;
  industry: string;
  summary: string;
  description: string;
  capabilities: string[];
  isVisible: boolean;
};

export const PRODUCT_STORAGE_KEY = "ceasiun_products";

export const defaultProducts: Product[] = [
  {
    id: "product-logistics-command",
    slug: "logistics-command",
    name: "Logistics Command",
    industry: "Logistics & Distribution",
    summary: "A connected operations platform for dispatch, fleet visibility, and delivery coordination.",
    description: "Logistics Command brings fragmented delivery operations into one practical workspace, giving teams a clearer view of work in progress and the decisions that keep orders moving.",
    capabilities: ["Dispatch management", "Fleet visibility", "Operations dashboards"],
    isVisible: true,
  },
  {
    id: "product-clinic-flow",
    slug: "clinic-flow",
    name: "Clinic Flow",
    industry: "Healthcare",
    summary: "A patient coordination system designed to reduce friction from booking through follow-up.",
    description: "Clinic Flow helps healthcare teams manage appointments, patient communication, and follow-up workflows without stitching together disconnected tools.",
    capabilities: ["Appointment workflows", "Patient communication", "Follow-up automation"],
    isVisible: true,
  },
  {
    id: "product-retail-pulse",
    slug: "retail-pulse",
    name: "Retail Pulse",
    industry: "Retail & Commerce",
    summary: "A commerce intelligence product that connects customer activity, inventory signals, and growth decisions.",
    description: "Retail Pulse gives growing commerce teams a clearer operating picture across products, campaigns, and customer demand.",
    capabilities: ["Commerce analytics", "Inventory signals", "Growth reporting"],
    isVisible: true,
  },
];

export function readProducts(): Product[] {
  if (typeof window === "undefined") return defaultProducts;
  try {
    const saved = window.localStorage.getItem(PRODUCT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultProducts;
  } catch {
    return defaultProducts;
  }
}
