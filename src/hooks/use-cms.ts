import { useEffect, useState } from "react";
import {
  CMS_EVENT,
  CMS_PREVIEW_KEY,
  defaultCms,
  isCmsPreviewMode,
  loadCms,
  type CmsContent,
} from "@/lib/cms";
import { services as staticServices } from "@/lib/site-data";

export function useCms(): CmsContent {
  const [content, setContent] = useState<CmsContent>(() =>
    typeof window === "undefined" ? defaultCms : loadCms(isCmsPreviewMode()),
  );

  useEffect(() => {
    const refresh = () => setContent(loadCms(isCmsPreviewMode()));
    refresh();
    window.addEventListener(CMS_EVENT, refresh);
    window.addEventListener("storage", refresh);
    const onMessage = (event: MessageEvent) => {
      if (event.data?.type === "ceasiun-preview" && event.data.payload) {
        sessionStorage.setItem(CMS_PREVIEW_KEY, JSON.stringify(event.data.payload));
        refresh();
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener(CMS_EVENT, refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return content;
}

export function useCmsServices() {
  const cms = useCms();
  return staticServices.map((base) => {
    const override = cms.services.find((s) => s.slug === base.slug);
    if (!override) return base;
    return {
      ...base,
      title: override.title,
      short: override.short,
      description: override.description,
      items: override.items?.length ? override.items : base.items,
      highlights: override.highlights?.length ? override.highlights : base.highlights,
      deliverables: override.deliverables?.length ? override.deliverables : base.deliverables,
    };
  });
}
