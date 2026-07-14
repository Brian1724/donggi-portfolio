export const FALLBACK_SITE_URL = "https://www.donggi.my";
export const RESERVED_WEBHOOK_HOST = "martin.donggi.my";

function normalizeSiteUrl(value: string | undefined) {
  const candidate = value?.trim() || FALLBACK_SITE_URL;

  try {
    const url = new URL(candidate);

    if (url.host === RESERVED_WEBHOOK_HOST) {
      return FALLBACK_SITE_URL;
    }

    return url.origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const metadataBase = new URL(siteUrl);
export const siteHost = metadataBase.host;

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, metadataBase).toString();
}
