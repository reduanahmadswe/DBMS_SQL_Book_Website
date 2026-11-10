import { useEffect } from 'react';
import { siteConfig } from '../../site.config';

function setMeta(sel: string, attr: 'content' | 'href', value: string): void {
  document.head.querySelector(sel)?.setAttribute(attr, value);
}

/** প্রতিটি পেজের title / description / canonical / OG ট্যাগ হালনাগাদ করে (SPA-তে)। */
export function usePageMeta(title: string | null, description?: string, path = ''): void {
  useEffect(() => {
    const full = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
    const desc = description ?? siteConfig.description;
    document.title = full;
    setMeta('meta[name="description"]', 'content', desc);
    setMeta('meta[property="og:title"]', 'content', full);
    setMeta('meta[property="og:description"]', 'content', desc);
    setMeta('meta[name="twitter:title"]', 'content', full);
    setMeta('meta[name="twitter:description"]', 'content', desc);
    const url = `${siteConfig.baseUrl}${path}`;
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:url"]', 'content', url);
  }, [title, description, path]);
}
