import Page from "@/routes/services.$slug.$subslug";

export default async function RoutePage({ params }: { params: Promise<{ slug: string; subslug: string }> }) {
  const { slug, subslug } = await params;
  return <Page slug={slug} subslug={subslug} />;
}
