declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function isGoogleAnalyticsEnabled() {
  return Boolean(GA_MEASUREMENT_ID);
}

export function pageview(url: string) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

export function trackEvent(action: string, params?: Record<string, string | number | boolean>) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", action, params);
}
