import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { tokens } from "../../theme/tokens";
import { Avatar } from "../ui/Avatar";
import { Icon, IconName } from "../ui/Icon";
import type { NavSection } from "../../types";

interface NavItemDef {
  id: NavSection;
  label: string;
  icon: IconName;
  badge?: number;
}

const NAV_ITEMS: NavItemDef[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "writings", label: "Writings", icon: "book", badge: 55 },
  { id: "devnotes", label: "Dev Notes", icon: "file-text", badge: 18 },
  { id: "quick-ships", label: "Quick Ships", icon: "zap", badge: 17 },
  { id: "projects", label: "Projects", icon: "folder", badge: 14 },
  { id: "newspaper", label: "Daily Paper", icon: "newspaper" },
  { id: "design", label: "Design", icon: "palette" },
  { id: "about", label: "About", icon: "user" },
  { id: "cli", label: "Terminal", icon: "terminal" },
];

interface SidebarRailProps {
  currentSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  onOpenTerminal: () => void;
  onOpenSearch: () => void;
}

export const SidebarRail: React.FC<SidebarRailProps> = ({
  currentSection,
  onSelectSection,
  onOpenTerminal,
  onOpenSearch,
}) => {
  return (
    <View style={styles.rail}>
      {/* Top Profile / Identity Cell */}
      <Pressable
        onPress={() => onSelectSection("about")}
        style={styles.profileCell}
      >
        <Avatar size={34} />
        <View style={styles.profileText}>
          <Text style={styles.profileName}>Om</Text>
          <Text style={styles.profileRole}>Developer & Builder</Text>
        </View>
      </Pressable>

      {/* Navigation Links */}
      <ScrollView style={styles.navScroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeader}>EXPLORE</Text>
        {NAV_ITEMS.map((item) => {
          const isActive = currentSection === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => onSelectSection(item.id)}
              style={[styles.navItem, isActive && styles.navItemActive]}
            >
              <View style={styles.navItemLeft}>
                <Icon
                  name={item.icon}
                  size={16}
                  color={isActive ? tokens.colors.accent : tokens.colors.textMuted}
                />
                <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                  {item.label}
                </Text>
              </View>
              {item.badge !== undefined && (
                <View style={[styles.badge, isActive && styles.badgeActive]}>
                  <Text style={[styles.badgeText, isActive && styles.badgeTextActive]}>
                    {item.badge}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Bottom Shortcuts / Tools */}
      <View style={styles.footer}>
        <Pressable onPress={onOpenSearch} style={styles.footerToolBtn}>
          <Icon name="search" size={14} color={tokens.colors.textMuted} />
          <Text style={styles.footerToolLabel}>Spotlight</Text>
          <Text style={styles.footerHotkey}>^K</Text>
        </Pressable>
        <Pressable onPress={onOpenTerminal} style={styles.footerToolBtn}>
          <Icon name="terminal" size={14} color={tokens.colors.textMuted} />
          <Text style={styles.footerToolLabel}>Quake Shell</Text>
          <Text style={styles.footerHotkey}>^`</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rail: {
    width: tokens.layout.sidebarWidth,
    backgroundColor: tokens.colors.railBackground,
    borderRightWidth: 1,
    borderRightColor: tokens.colors.borderSubtle,
    height: "100%",
    justifyContent: "space-between",
  },
  profileCell: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.borderSubtle,
    cursor: "pointer",
  } as any,
  profileText: {
    marginLeft: 10,
    flex: 1,
  },
  profileName: {
    fontFamily: tokens.fonts.sans,
    fontSize: 13,
    fontWeight: "600",
    color: tokens.colors.textPrimary,
  },
  profileRole: {
    fontFamily: tokens.fonts.sans,
    fontSize: 11,
    color: tokens.colors.textMuted,
    marginTop: 1,
  },
  navScroll: {
    flex: 1,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.sm,
  },
  sectionHeader: {
    fontFamily: tokens.fonts.mono,
    fontSize: 10,
    color: tokens.colors.textFaint,
    letterSpacing: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginTop: 4,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: tokens.radii.sm,
    marginBottom: 2,
    minHeight: 36,
    cursor: "pointer",
  } as any,
  navItemActive: {
    backgroundColor: tokens.colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: tokens.colors.borderDefault,
  },
  navItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  navLabel: {
    fontFamily: tokens.fonts.sans,
    fontSize: 13,
    fontWeight: "500",
    color: tokens.colors.textSecondary,
    marginLeft: 10,
  },
  navLabelActive: {
    color: tokens.colors.textPrimary,
    fontWeight: "600",
  },
  badge: {
    backgroundColor: tokens.colors.surfacePrimary,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: tokens.radii.xs,
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
  },
  badgeActive: {
    backgroundColor: tokens.colors.accentMuted,
    borderColor: tokens.colors.accentBorder,
  },
  badgeText: {
    fontFamily: tokens.fonts.mono,
    fontSize: 10,
    color: tokens.colors.textMuted,
  },
  badgeTextActive: {
    color: tokens.colors.accent,
    fontWeight: "600",
  },
  footer: {
    padding: tokens.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.borderSubtle,
    backgroundColor: tokens.colors.railBackground,
  },
  footerToolBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: tokens.radii.sm,
    marginBottom: 2,
    cursor: "pointer",
  } as any,
  footerToolLabel: {
    fontFamily: tokens.fonts.sans,
    fontSize: 12,
    color: tokens.colors.textMuted,
    marginLeft: 8,
    flex: 1,
  },
  footerHotkey: {
    fontFamily: tokens.fonts.mono,
    fontSize: 10,
    color: tokens.colors.textFaint,
    backgroundColor: tokens.colors.surfacePrimary,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: tokens.radii.xs,
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
  },
});
