import { useEffect } from 'react';

interface SEOOptions {
  title: string;
  description?: string;
  path?: string;
}

export function useSEO({ title, description, path }: SEOOptions) {
  useEffect(() => {
    document.title = `${title} | Shree Annapurna Restaurant & Sweet`;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
    if (path) {
      let tag = document.querySelector('link[rel="canonical"]');
      if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', 'canonical');
        document.head.appendChild(tag);
      }
      tag.setAttribute('href', path);
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [title, description, path]);
}
