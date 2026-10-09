import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { tokens } from "../../theme/tokens";
import { Icon } from "../ui/Icon";

interface DesktopTitleBarProps {
  currentSectionTitle: string;
  onOpenSearch: () => void;
  isSyncedWithSanity?: boolean;
}

export const DesktopTitleBar: React.FC<DesktopTitleBarProps> = ({
  currentSectionTitle,
  onOpenSearch,
  isSyncedWithSanity = false,
}) => {
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  return (
    <View style={styles.titleBar}>
      {/* Left: Window Title & Sync Pill */}
      <View style={styles.leftGroup}>
        <View style={styles.appBadge}>
          <Text style={styles.appName}>Om</Text>
        </View>
        <Text style={styles.divider}>/</Text>
        <Text style={styles.sectionTitle}>{currentSectionTitle}</Text>
        <View style={styles.syncStatus}>
          <View
            style={[
              styles.syncDot,
              { backgroundColor: isSyncedWithSanity ? tokens.colors.accent : "#52525b" },
            ]}
          />
          <Text style={styles.syncText}>
            {isSyncedWithSanity ? "Live Synced" : "Offline Ready"}
          </Text>
        </View>
      </View>

      {/* Center: Spotlight Search Quick Launcher */}
      <Pressable
        onPress={onOpenSearch}
        style={styles.searchPill}
        onHoverIn={() => setHoveredBtn("search")}
        onHoverOut={() => setHoveredBtn(null)}
      >
        <Icon name="search" size={13} color={tokens.colors.textMuted} />
        <Text style={styles.searchText}>Search articles, dev notes, projects...</Text>
        <View style={styles.shortcutBadge}>
          <Text style={styles.shortcutText}>Ctrl K</Text>
        </View>
      </Pressable>

      {/* Right: Caption Buttons (Minimize, Maximize, Close) */}
      <View style={styles.captionButtons}>
        <Pressable
          style={[
            styles.captionBtn,
            hoveredBtn === "min" && { backgroundColor: tokens.colors.captionHover },
          ]}
          onHoverIn={() => setHoveredBtn("min")}
          onHoverOut={() => setHoveredBtn(null)}
          onPress={() => {
            if ((window as any)?.electronAPI?.minimize) {
              (window as any).electronAPI.minimize();
            }
          }}
        >
          <Icon name="minus" size={12} color={tokens.colors.textSecondary} />
        </Pressable>
        <Pressable
          style={[
            styles.captionBtn,
            hoveredBtn === "max" && { backgroundColor: tokens.colors.captionHover },
          ]}
          onHoverIn={() => setHoveredBtn("max")}
          onHoverOut={() => setHoveredBtn(null)}
          onPress={() => {
            if ((window as any)?.electronAPI?.maximize) {
              (window as any).electronAPI.maximize();
            }
          }}
        >
          <Icon name="square" size={10} color={tokens.colors.textSecondary} />
        </Pressable>
        <Pressable
          style={[
            styles.captionBtn,
            styles.closeBtn,
            hoveredBtn === "close" && { backgroundColor: tokens.colors.captionClose },
          ]}
          onHoverIn={() => setHoveredBtn("close")}
          onHoverOut={() => setHoveredBtn(null)}
          onPress={() => {
            if ((window as any)?.electronAPI?.close) {
              (window as any).electronAPI.close();
            }
          }}
        >
          <Icon
            name="x"
            size={12}
            color={hoveredBtn === "close" ? "#ffffff" : tokens.colors.textSecondary}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleBar: {
    height: tokens.layout.titleBarHeight,
    backgroundColor: tokens.colors.railBackground,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.borderSubtle,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: tokens.spacing.md,
    userSelect: "none",
    WebkitAppRegion: "drag",
    zIndex: 50,
  } as any,
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    WebkitAppRegion: "no-drag",
  } as any,
  appBadge: {
    backgroundColor: tokens.colors.surfaceSecondary,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: tokens.radii.xs,
    borderWidth: 1,
    borderColor: tokens.colors.borderDefault,
  },
  appName: {
    fontFamily: tokens.fonts.sans,
    fontSize: 12,
    fontWeight: "700",
    color: tokens.colors.textPrimary,
  },
  divider: {
    marginHorizontal: 8,
    color: tokens.colors.borderFocus,
    fontSize: 12,
  },
  sectionTitle: {
    fontFamily: tokens.fonts.sans,
    fontSize: 12,
    fontWeight: "500",
    color: tokens.colors.textSecondary,
    marginRight: 10,
  },
  syncStatus: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: tokens.radii.full,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  syncDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  syncText: {
    fontFamily: tokens.fonts.mono,
    fontSize: 10,
    color: tokens.colors.textMuted,
  },
  searchPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: tokens.colors.surfacePrimary,
    borderWidth: 1,
    borderColor: tokens.colors.borderDefault,
    borderRadius: tokens.radii.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: 280,
    cursor: "pointer",
    WebkitAppRegion: "no-drag",
  } as any,
  searchText: {
    fontFamily: tokens.fonts.sans,
    fontSize: 11,
    color: tokens.colors.textMuted,
    marginLeft: 6,
    flex: 1,
  },
  shortcutBadge: {
    backgroundColor: tokens.colors.surfaceSecondary,
    borderRadius: tokens.radii.xs,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
  },
  shortcutText: {
    fontFamily: tokens.fonts.mono,
    fontSize: 9,
    color: tokens.colors.textMuted,
  },
  captionButtons: {
    flexDirection: "row",
    height: "100%",
    WebkitAppRegion: "no-drag",
  } as any,
  captionBtn: {
    width: 44,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  } as any,
  closeBtn: {},
});
