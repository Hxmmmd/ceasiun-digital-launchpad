import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/lib/site-data";
import "./ServiceExplorer.css";

const serviceAreas = services.map((service) => ({
  slug: service.slug,
  title: service.title,
  detail: service.description,
  icon: service.icon,
  capabilities: service.items,
}));

export function ServiceExplorer() {
  return (
    <div className="service-cards" aria-label="Service areas">
      {serviceAreas.map((service) => {
        const ServiceIcon = service.icon;
        return (
          <Link className="service-card-static" href={`/services/${service.slug}`} key={service.title}>
            <div className="service-card-heading">
              <span className="service-card-icon"><ServiceIcon size={21} strokeWidth={1.7} aria-hidden="true" /></span>
              <h3>{service.title}</h3>
            </div>
            <p>{service.detail}</p>
            <ul aria-label={`${service.title} capabilities`}>
              {service.capabilities.map((capability) => <li key={capability}><Check size={14} strokeWidth={2.2} aria-hidden="true" /><span>{capability}</span></li>)}
            </ul>
            <span className="card-link">Explore capability <ArrowUpRight size={16} aria-hidden="true" /></span>
          </Link>
        );
      })}
    </div>
  );
}
