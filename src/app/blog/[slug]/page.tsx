"use client"; import Page from "@/routes/blog.$slug"; export default function RoutePage({ params }: { params: { slug: string } }) { return <Page slug={params.slug} />; }
