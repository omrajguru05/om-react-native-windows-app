import { OFFLINE_ARTICLES } from "../data/offlineBundle";
import { querySanity } from "./sanityClient";
import type { Article, ContentCategory } from "../types";

let cachedArticles: Article[] = [...OFFLINE_ARTICLES];
const listeners: Array<(articles: Article[]) => void> = [];

export const contentService = {
  getArticles(): Article[] {
    return cachedArticles;
  },

  getArticlesByCategory(category: ContentCategory): Article[] {
    return cachedArticles.filter((a) => a.category === category && !a.unlisted);
  },

  getArticleBySlug(slug: string): Article | undefined {
    return cachedArticles.find((a) => a.slug === slug);
  },

  getRecentArticles(limit = 6): Article[] {
    return cachedArticles.filter((a) => !a.unlisted).slice(0, limit);
  },

  search(queryText: string): Article[] {
    const q = queryText.toLowerCase().trim();
    if (!q) return [];
    return cachedArticles
      .filter((a) => !a.unlisted)
      .filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.content.toLowerCase().includes(q)
      )
      .slice(0, 15);
  },

  subscribe(listener: (articles: Article[]) => void) {
    listeners.push(listener);
    return () => {
      const idx = listeners.indexOf(listener);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  },

  async syncWithSanity(): Promise<boolean> {
    const groq = `*[_type in ["writing", "devNote", "quickShip"] && !(_id in path("drafts.**"))] | order(date desc) {
      "slug": slug.current,
      "category": select(
        _type == "writing" => "writings",
        _type == "devNote" => "devnotes",
        _type == "quickShip" => "quick-ships",
        "writings"
      ),
      title,
      date,
      excerpt,
      author,
      tags,
      "audio": coalesce(audio, null),
      unlisted,
      "content": coalesce(content, "")
    }`;

    const remoteItems = await querySanity<any[]>(groq);
    if (!remoteItems || !Array.isArray(remoteItems) || remoteItems.length === 0) {
      return false;
    }

    const mergedMap = new Map<string, Article>();
    // First seed with offline
    OFFLINE_ARTICLES.forEach((a) => mergedMap.set(a.slug, a));
    // Overlay remote updates
    remoteItems.forEach((r) => {
      if (r.slug) {
        mergedMap.set(r.slug, {
          slug: r.slug,
          category: r.category || "writings",
          title: r.title || r.slug,
          date: r.date || new Date().toISOString(),
          excerpt: typeof r.excerpt === "string" ? r.excerpt : "",
          author: r.author || "Om",
          tags: Array.isArray(r.tags) ? r.tags : [],
          audio: r.audio || null,
          unlisted: !!r.unlisted,
          content: typeof r.content === "string" ? r.content : "",
        });
      }
    });

    cachedArticles = Array.from(mergedMap.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    listeners.forEach((fn) => fn(cachedArticles));
    return true;
  },
};
