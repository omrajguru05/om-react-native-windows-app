import type { NewspaperEdition } from "../types";

export const TODAY_NEWSPAPER: NewspaperEdition = {
  date: "October 9, 2026",
  editionNumber: "Vol. IV, No. 282",
  headline: "ON BUILDING INTENTIONAL DESKTOP COMPANIONS",
  subhead: "A study in physical motion, offline endurance, and calm software architecture.",
  leadArticle: {
    title: "Why Desktop Apps Still Matter in a Browser-First Era",
    slug: "replacing-browser-tabs-with-dedicated-tools",
    category: "writings",
    summary:
      "When software moves from a transient browser tab to a dedicated desktop window, the relationship changes. A desktop companion provides instant access, keyboard shortcuts, background audio persistence, and a focus boundary that websites struggle to maintain.",
    date: "2026-10-09",
  },
  dispatches: [
    {
      title: "The Architecture of Offline-First Systems",
      slug: "offline-first-architecture",
      category: "devnotes",
      summary:
        "Local memory and cached AST trees eliminate network spinners completely. The app boots in zero milliseconds and syncs unobtrusively in the background.",
      date: "2026-10-08",
    },
    {
      title: "Audio Narration on Native Surfaces",
      slug: "audio-narration-design",
      category: "devnotes",
      summary:
        "Docking the transport controls to the bottom window frame allows reading and listening simultaneously across articles without interruption.",
      date: "2026-10-07",
    },
    {
      title: "Crafting Terminal Emulators for Explorers",
      slug: "quake-terminal-pattern",
      category: "quick-ships",
      summary:
        "A Quake-style pull-down terminal gives keyboard enthusiasts direct access to the virtual filesystem behind the blog.",
      date: "2026-10-06",
    },
  ],
  thoughtOfTheDay:
    "“Precision is the aesthetic; composition is where creativity lives.”",
};
