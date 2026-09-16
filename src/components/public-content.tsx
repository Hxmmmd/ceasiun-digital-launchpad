import { useEffect, useState } from "react";import { supabase } from "@/integrations/supabase/client";
export type Post={id:string;slug:string;title:string;excerpt:string;category:string;body:string;author:string;cover_url:string|null;published_at:string|null;tags:string[]};
export type Testimonial={id:string;quote:string;attribution:string;company:string;is_sample:boolean};
export function usePublishedPosts(){const [data,setData]=useState<Post[]>([]);useEffect(()=>{supabase.from("blog_posts").select("id,slug,title,excerpt,category,body,author,cover_url,published_at,tags").eq("status","published").order("published_at",{ascending:false}).then(({data})=>setData(data??[]))},[]);return data}
export function useTestimonials(){const [data,setData]=useState<Testimonial[]>([]);useEffect(()=>{supabase.from("testimonials").select("id,quote,attribution,company,is_sample").eq("is_visible",true).order("sort_order").then(({data})=>setData(data??[]))},[]);return data}
