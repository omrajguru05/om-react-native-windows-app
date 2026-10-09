/**
 * Sanity CDN client configured for Om's publication dataset.
 * Uses public read-only endpoint with fail-safe network timeouts.
 */
const SANITY_PROJECT_ID = "4lg3mv4v";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2024-10-01";

export async function querySanity<T>(query: string, timeoutMs = 6000): Promise<T | null> {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodedQuery}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    clearTimeout(timer);
    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return (data.result as T) ?? null;
  } catch {
    clearTimeout(timer);
    // Graceful offline fallback
    return null;
  }
}
