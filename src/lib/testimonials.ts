export type Testimonial = {
  id: string;
  quote: string;
  attribution: string;
  company: string;
  is_sample: boolean;
  is_visible?: boolean;
  sort_order?: number;
};

export const testimonials: Testimonial[] = [
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
  {
    id: "test-3",
    quote: "A polished digital experience that feels exactly right for our brand.",
    attribution: "Founder, Growth Company",
    company: "Confidential Client",
    is_sample: true,
    is_visible: true,
    sort_order: 3,
  },
  {
    id: "test-4",
    quote: "Clear communication, sharp execution, and a smooth launch.",
    attribution: "Marketing Lead, SaaS Brand",
    company: "Confidential Client",
    is_sample: true,
    is_visible: true,
    sort_order: 4,
  },
  {
    id: "test-5",
    quote: "They turned a complicated brief into a simple, high-performing product.",
    attribution: "Director, Technology Group",
    company: "Confidential Client",
    is_sample: true,
    is_visible: true,
    sort_order: 5,
  },
  {
    id: "test-6",
    quote: "The team was thoughtful, responsive, and easy to work with.",
    attribution: "Brand Manager, Retail Company",
    company: "Confidential Client",
    is_sample: true,
    is_visible: true,
    sort_order: 6,
  },
  {
    id: "test-7",
    quote: "Their strategic thinking made every design decision count.",
    attribution: "Founder, Consumer Startup",
    company: "Confidential Client",
    is_sample: true,
    is_visible: true,
    sort_order: 7,
  },
  {
    id: "test-8",
    quote: "Fast delivery, strong ideas, and excellent attention to detail.",
    attribution: "COO, Services Business",
    company: "Confidential Client",
    is_sample: true,
    is_visible: true,
    sort_order: 8,
  },
  {
    id: "test-9",
    quote: "The new platform made our workflow much easier.",
    attribution: "Operations Lead, Logistics Brand",
    company: "Confidential Client",
    is_sample: true,
    is_visible: true,
    sort_order: 9,
  },
  {
    id: "test-10",
    quote: "A dependable partner with both creative taste and technical depth.",
    attribution: "CEO, Digital Product",
    company: "Confidential Client",
    is_sample: true,
    is_visible: true,
    sort_order: 10,
  },
];

