/**
 * Analytics stub for tracking user events
 * In production, integrate with your analytics provider (e.g., Google Analytics, Mixpanel)
 */

export type AnalyticsEvent =
  | 'view_calculator'
  | 'calculate'
  | 'export_pdf'
  | 'contact_click'
  | 'language_toggle'
  | 'cta_click'
  | 'wallet_connected'
  | 'wallet_disconnected'
  | 'dashboard_view'
  | 'address_copied'

interface AnalyticsProperties {
  [key: string]: string | number | boolean | undefined
}

export function trackEvent(event: AnalyticsEvent, properties?: AnalyticsProperties): void {
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event, properties)
  }
  
  // In production, send to analytics provider
  // Example: window.gtag?.('event', event, properties)
  // Example: window.mixpanel?.track(event, properties)
  
  // Emit custom event for tracking
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('kustodyfi:analytics', {
        detail: { event, properties, timestamp: new Date().toISOString() },
      })
    )
  }
}

