import React from "react";
import { View, StyleSheet } from "react-native";

export type IconName =
  | "search"
  | "terminal"
  | "play"
  | "pause"
  | "x"
  | "chevron-right"
  | "chevron-left"
  | "home"
  | "book"
  | "file-text"
  | "zap"
  | "folder"
  | "palette"
  | "user"
  | "newspaper"
  | "copy"
  | "check"
  | "volume-2"
  | "external-link"
  | "minus"
  | "square"
  | "command";

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 18,
  color = "#a1a1aa",
  strokeWidth = 1.75,
}) => {
  const renderPath = () => {
    switch (name) {
      case "search":
        return (
          <>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </>
        );
      case "terminal":
        return (
          <>
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </>
        );
      case "play":
        return <polygon points="5 3 19 12 5 21 5 3" fill={color} />;
      case "pause":
        return (
          <>
            <rect x="6" y="4" width="4" height="16" fill={color} />
            <rect x="14" y="4" width="4" height="16" fill={color} />
          </>
        );
      case "x":
        return (
          <>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </>
        );
      case "chevron-right":
        return <polyline points="9 18 15 12 9 6" />;
      case "chevron-left":
        return <polyline points="15 18 9 12 15 6" />;
      case "home":
        return (
          <>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </>
        );
      case "book":
        return (
          <>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </>
        );
      case "file-text":
        return (
          <>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </>
        );
      case "zap":
        return <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />;
      case "folder":
        return (
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        );
      case "palette":
        return (
          <path d="M12 2C6.49 2 2 6.49 2 12c0 4.14 2.53 7.69 6.13 9.17.44.18.87-.14.87-.61v-1.06c0-1.24 1.01-2.25 2.25-2.25h1.5c3.31 0 6-2.69 6-6 0-5.51-4.49-9.25-6.75-9.25z" />
        );
      case "user":
        return (
          <>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </>
        );
      case "newspaper":
        return (
          <>
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
            <path d="M18 14h-8" />
            <path d="M15 18h-5" />
            <path d="M10 6h8v4h-8V6Z" />
          </>
        );
      case "copy":
        return (
          <>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </>
        );
      case "check":
        return <polyline points="20 6 9 17 4 12" />;
      case "volume-2":
        return (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </>
        );
      case "external-link":
        return (
          <>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </>
        );
      case "minus":
        return <line x1="5" y1="12" x2="19" y2="12" />;
      case "square":
        return <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />;
      case "command":
        return (
          <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
        );
      default:
        return null;
    }
  };

  // Safe SVG rendering across React Native Web & DOM
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "block" }}
      >
        {renderPath()}
      </svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
