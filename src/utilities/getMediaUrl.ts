/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 *
 * Local paths (e.g. `/api/media/file/image.webp`) are kept relative so
 * Next.js image optimization treats them as local rather than fetching
 * through `remotePatterns`, which blocks private IPs since Next.js 16.
 */
export const getMediaUrl = (url: string | null | undefined, _cacheTag?: string | null): string => {
  if (!url) return ''
  // Cache-busting query strings are intentionally omitted: Next 16 image
  // optimization rejects URLs whose query string doesn't match localPatterns,
  // and Vercel deployments invalidate the CDN on every push anyway.
  return url
}
