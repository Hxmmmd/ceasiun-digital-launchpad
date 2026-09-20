"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CTA, Layout, PageIntro } from "@/components/site";
import { defaultProducts, readProducts, type Product } from "@/lib/products";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => setProduct(readProducts().find((item) => item.slug === slug && item.isVisible) ?? defaultProducts.find((item) => item.slug === slug) ?? null), [slug]);

  if (!product) return <Layout><PageIntro eyebrow="Product" title="Product not found" copy="This product may have been unpublished or moved." /><CTA /></Layout>;

  return (
    <Layout>
      <PageIntro eyebrow={product.industry} title={product.name} copy={product.summary} />
      <section className="section shell product-detail">
        <Link href="/products" className="text-link"><ArrowLeft /> Back to products</Link>
        <div className="product-detail-copy"><p>{product.description}</p><div className="product-capabilities">{product.capabilities.map((capability) => <span key={capability}>{capability}</span>)}</div></div>
      </section>
      <CTA />
    </Layout>
  );
}
