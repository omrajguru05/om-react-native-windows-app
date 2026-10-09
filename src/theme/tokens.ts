/**
 * Design system tokens strictly derived from om-design specification.
 * Pure black canvas, subtle 1px structural borders, emerald accents,
 * and Relative Variable typography.
 */
export const tokens = {
  colors: {
    // Pure dark canvas
    background: "#000000",
    railBackground: "#070707",
    surfacePrimary: "#0c0c0c",
    surfaceSecondary: "#141414",
    surfaceElevated: "#181818",
    surfaceModal: "#111111",

    // Structural borders
    borderSubtle: "#1c1c1c",
    borderDefault: "#262626",
    borderFocus: "#383838",

    // Accent (Emerald)
    accent: "#10b981",
    accentHover: "#059669",
    accentMuted: "rgba(16, 185, 129, 0.15)",
    accentBorder: "rgba(16, 185, 129, 0.35)",

    // Typography
    textPrimary: "#f5f5f5",
    textSecondary: "#a1a1aa",
    textMuted: "#71717a",
    textFaint: "#52525b",

    // Functional
    danger: "#ef4444",
    dangerMuted: "rgba(239, 68, 68, 0.15)",
    warning: "#f59e0b",
    info: "#3b82f6",

    // Windows & Mac Chrome controls
    captionClose: "#e81123",
    captionHover: "rgba(255, 255, 255, 0.08)",
  },

  fonts: {
    sans: 'Relative Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    rounded: 'Relative Rounded, -apple-system, BlinkMacSystemFont, sans-serif',
    mono: 'Relative Mono, Consolas, "Courier New", Courier, monospace',
  },

  radii: {
    xs: 4,
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },

  layout: {
    minTouchTarget: 44,
    sidebarWidth: 240,
    listPaneWidth: 340,
    titleBarHeight: 40,
    transportBarHeight: 64,
  },
} as const;
