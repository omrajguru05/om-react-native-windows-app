export type ContentCategory = "writings" | "devnotes" | "quick-ships" | "poetry";

export interface Article {
  slug: string;
  category: ContentCategory;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  audio: string | null;
  tldr?: string[];
  unlisted?: boolean;
  content: string;
}

export interface ProjectCTA {
  label: string;
  href: string;
  variant?: "primary" | "outline";
}

export interface ProjectInfo {
  techStack: string[];
  role: string;
  timeline: string;
  category: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectChallenge {
  title: string;
  description: string;
  solution: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: string;
  ctas: ProjectCTA[];
  info: ProjectInfo;
  gallery?: string[];
  overview: {
    summary: string;
    problem: string;
    targetAudience: string;
  };
  features: ProjectFeature[];
  technicalDetails: {
    architecture: string;
    technologies: { name: string; reason: string }[];
    challenges: ProjectChallenge[];
  };
  results: { metric: string; value: string }[];
  design?: {
    colors: string[];
    typography: string;
    style: string;
  };
  techDeepDive?: { title: string; content: string }[];
  nextSteps?: string[];
  relatedProjects?: string[];
}

export type NavSection =
  | "home"
  | "writings"
  | "devnotes"
  | "quick-ships"
  | "poetry"
  | "projects"
  | "design"
  | "about"
  | "cli"
  | "newspaper";

export interface AudioPlaybackState {
  isActive: boolean;
  isPlaying: boolean;
  title: string;
  author: string;
  audioUrl: string;
  currentTime: number;
  duration: number;
  playbackRate: number;
  articleSlug: string | null;
}

export interface SearchResult {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  date: string;
}

export interface NewspaperArticle {
  title: string;
  slug: string;
  category: string;
  summary: string;
  date: string;
}

export interface NewspaperEdition {
  date: string;
  editionNumber: string;
  headline: string;
  subhead: string;
  leadArticle: NewspaperArticle;
  dispatches: NewspaperArticle[];
  thoughtOfTheDay: string;
}
