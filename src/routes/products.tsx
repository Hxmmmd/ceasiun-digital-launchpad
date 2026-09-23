"use client";

import Link from "next/link";
import { CTA, Layout, PageIntro } from "@/components/site";
import { Button } from "@/components/ui/button";
import { readProducts, type Product } from "@/lib/products";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => setProducts(readProducts().filter((product) => product.isVisible)), []);

  return (
    <Layout>
      <PageIntro eyebrow="Products" title="Digital products built for real industries." copy="We turn recurring industry problems into focused products that make daily work clearer, faster, and easier to operate." />
      <section className="section shell product-grid" aria-label="Ceasiun products">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <p className="eyebrow">{product.industry}</p>
            <h2>{product.name}</h2>
            <p>{product.summary}</p>
            <div className="product-capabilities">
              {product.capabilities.map((capability) => <span key={capability}>{capability}</span>)}
            </div>
            <Button asChild variant="outline" className="premium-button"><Link href={`/products/${product.slug}`}>Explore product</Link></Button>
          </article>
        ))}
      </section>
      <CTA />
    </Layout>
  );
}
