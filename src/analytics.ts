const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function isGtagEnabled() {
  return Boolean(GA_MEASUREMENT_ID);
}

function loadGtagScript() {
  const scriptId = 'ga-gtag';
  if (document.getElementById(scriptId) || !GA_MEASUREMENT_ID) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.id = scriptId;
  document.head.appendChild(script);
}

export function initGoogleAnalytics() {
  if (!isGtagEnabled() || typeof window === 'undefined') {
    return;
  }

  loadGtagScript();
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
}

export function trackPageview(path: string) {
  if (!isGtagEnabled() || typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
  });
}
