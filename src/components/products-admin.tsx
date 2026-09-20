"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { defaultProducts, PRODUCT_STORAGE_KEY, type Product } from "@/lib/products";

const blankProduct = (): Product => ({ id: `product-${Date.now()}`, slug: "new-product", name: "", industry: "", summary: "", description: "", capabilities: [], isVisible: true });

export function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  useEffect(() => { const saved = window.localStorage.getItem(PRODUCT_STORAGE_KEY); if (saved) setProducts(JSON.parse(saved)); }, []);
  const save = (next: Product[]) => { setProducts(next); window.localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(next)); window.dispatchEvent(new Event("ceasiun-products-updated")); };
  const update = (patch: Partial<Product>) => setEditing((current) => current ? { ...current, ...patch } : current);

  return <div className="admin-tab-view">
    <header className="admin-view-header"><div><p className="eyebrow">Product catalogue</p><h1>Products</h1></div><Button onClick={() => setEditing(blankProduct())}><Plus /> New Product</Button></header>
    {editing ? <div className="admin-form-grid">
      <label>Name<Input value={editing.name} onChange={(event) => update({ name: event.target.value })} /></label>
      <label>Slug<Input value={editing.slug} onChange={(event) => update({ slug: event.target.value })} /></label>
      <label>Industry<Input value={editing.industry} onChange={(event) => update({ industry: event.target.value })} /></label>
      <label>Capabilities <Input value={editing.capabilities.join(", ")} onChange={(event) => update({ capabilities: event.target.value.split(",").map((item) => item.trim()).filter(Boolean) })} /></label>
      <label className="full">Summary<Textarea value={editing.summary} onChange={(event) => update({ summary: event.target.value })} rows={3} /></label>
      <label className="full">Description<Textarea value={editing.description} onChange={(event) => update({ description: event.target.value })} rows={6} /></label>
      <div className="admin-form-actions"><Button onClick={() => { save(products.some((item) => item.id === editing.id) ? products.map((item) => item.id === editing.id ? editing : item) : [...products, editing]); setEditing(null); }}><Save /> Save Product</Button><Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button></div>
    </div> : <div className="cms-list-view">{products.map((product) => <div className="cms-row" key={product.id}><div className="cms-row-info"><strong>{product.name || "Untitled product"}</strong><span>{product.industry}</span><p className="cms-excerpt">{product.summary}</p></div><div className="cms-row-actions"><button className="action-btn toggle" type="button" onClick={() => setEditing(product)}><Pencil /> Edit</button><button className="action-btn danger" type="button" onClick={() => save(products.filter((item) => item.id !== product.id))}><Trash2 /> Delete</button></div></div>)}</div>}
  </div>;
}
