"use client";

import Page from "@/routes/services.$slug.$subslug";

export default function RoutePage({ params }: { params: { slug: string; subslug: string } }) {
  return <Page slug={params.slug} subslug={params.subslug} />;
}
