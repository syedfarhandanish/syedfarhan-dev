'use client';

import { useEffect } from 'react';
import { captureInstallPrompt, clearInstallPrompt } from '@/lib/pwa';

/** Registers the service worker (production only) and captures the install prompt. */
export default function ServiceWorker() {
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', captureInstallPrompt);
    window.addEventListener('appinstalled', clearInstallPrompt);

    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      const register = () =>
        navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' }).catch(() => {
          /* offline support is optional — the site works without it */
        });
      if (document.readyState === 'complete') register();
      else window.addEventListener('load', register, { once: true });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', captureInstallPrompt);
      window.removeEventListener('appinstalled', clearInstallPrompt);
    };
  }, []);
  return null;
}
