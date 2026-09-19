import Page from "@/routes/blog.$slug";

export default async function RoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <Page slug={slug} />;
}
