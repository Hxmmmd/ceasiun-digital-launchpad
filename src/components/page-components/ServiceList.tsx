"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site-data";
import { ServiceArtwork } from "./ServiceArtwork";
import "./ServiceList.css";

export { services };

const serviceListAreas = services.map((service) => ({
    slug: service.slug,
    title: service.title,
    detail: service.description,
    icon: service.icon,
}));

export function ServiceList() {
    return (
        <div className="service-list-cards" aria-label="Service areas">
            {serviceListAreas.map((service, index) => {
                const ServiceIcon = service.icon;
                return (
                    <Link
                        className={`service-list-detail service-list-card-static service-list-card-${service.slug}`}
                        href={`/services/${service.slug}`}
                        key={service.slug}
                    >
                        <ServiceArtwork slug={service.slug} />
                        <div className="service-list-card-heading">
                            <span className="service-list-card-icon">
                                <ServiceIcon size={22} strokeWidth={1.7} aria-hidden="true" />
                            </span>
                            <span className="service-list-card-number">0{index + 1}</span>
                        </div>
                        <h3>{service.title}</h3>
                        <p>{service.detail}</p>
                        <span className="card-link">
                            View service <ArrowUpRight size={16} aria-hidden="true" />
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}

export default ServiceList;