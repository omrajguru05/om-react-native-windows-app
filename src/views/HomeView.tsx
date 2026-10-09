import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { tokens } from "../theme/tokens";
import { Avatar } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Icon } from "../components/ui/Icon";
import { PROFILE } from "../data/profile";
import { contentService } from "../services/contentService";
import type { Article, NavSection } from "../types";

interface HomeViewProps {
  onSelectArticle: (article: Article) => void;
  onNavigateSection: (section: NavSection) => void;
  onOpenSearch: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectArticle,
  onNavigateSection,
  onOpenSearch,
}) => {
  const recentArticles = contentService.getRecentArticles(5);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.inner}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.avatarRow}>
            <Avatar size={56} />
            <View style={styles.heroText}>
              <Text style={styles.heroName}>{PROFILE.name}</Text>
              <Text style={styles.heroTitle}>{PROFILE.title}</Text>
            </View>
          </View>
          <Text style={styles.heroBio}>{PROFILE.bio}</Text>

          <View style={styles.heroActions}>
            <Button
              label="Explore Writings"
              variant="primary"
              onPress={() => onNavigateSection("writings")}
              icon={<Icon name="book" size={14} color="#000000" />}
            />
            <Button
              label="Quick Search"
              variant="outline"
              style={{ marginLeft: 10 }}
              onPress={onOpenSearch}
              icon={<Icon name="search" size={14} color={tokens.colors.textSecondary} />}
            />
          </View>
        </View>

        {/* Publishing Activity Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{PROFILE.stats.articles}</Text>
            <Text style={styles.statLabel}>Total Articles</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{PROFILE.stats.projects}</Text>
            <Text style={styles.statLabel}>Software Builds</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{PROFILE.stats.ships}</Text>
            <Text style={styles.statLabel}>Quick Ships</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{PROFILE.stats.yearsActive}</Text>
            <Text style={styles.statLabel}>Years Active</Text>
          </View>
        </View>

        {/* Recent Dispatches Section */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Recent Dispatches</Text>
            <Pressable onPress={() => onNavigateSection("writings")}>
              <Text style={styles.viewAllText}>View archive →</Text>
            </Pressable>
          </View>

          <View style={styles.recentList}>
            {recentArticles.map((article) => (
              <Pressable
                key={article.slug}
                style={styles.recentCard}
                onPress={() => onSelectArticle(article)}
              >
                <View style={styles.recentHeader}>
                  <Badge label={article.category} variant="accent" />
                  <Text style={styles.recentDate}>
                    {new Date(article.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Text>
                </View>
                <Text style={styles.recentCardTitle}>{article.title}</Text>
                {article.excerpt ? (
                  <Text style={styles.recentExcerpt} numberOfLines={2}>
                    {article.excerpt}
                  </Text>
                ) : null}
              </Pressable>
            ))}
          </View>
        </View>

        {/* Operating Principles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Operating Principles</Text>
          <View style={styles.principlesGrid}>
            {PROFILE.principles.map((p, idx) => (
              <View key={idx} style={styles.principleCard}>
                <Text style={styles.principleTitle}>{p.title}</Text>
                <Text style={styles.principleDesc}>{p.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  inner: {
    maxWidth: 780,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: tokens.spacing.xxl,
    paddingVertical: tokens.spacing.xxxl,
  },
  hero: {
    marginBottom: 36,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  heroText: {
    marginLeft: 14,
  },
  heroName: {
    fontFamily: tokens.fonts.sans,
    fontSize: 22,
    fontWeight: "700",
    color: tokens.colors.textPrimary,
  },
  heroTitle: {
    fontFamily: tokens.fonts.sans,
    fontSize: 13,
    color: tokens.colors.accent,
    marginTop: 2,
  },
  heroBio: {
    fontFamily: tokens.fonts.sans,
    fontSize: 16,
    lineHeight: 25,
    color: tokens.colors.textSecondary,
    marginBottom: 20,
  },
  heroActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 36,
  },
  statCard: {
    flex: 1,
    backgroundColor: tokens.colors.surfacePrimary,
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    borderRadius: tokens.radii.md,
    padding: 14,
  },
  statValue: {
    fontFamily: tokens.fonts.mono,
    fontSize: 22,
    fontWeight: "700",
    color: tokens.colors.accent,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: tokens.fonts.sans,
    fontSize: 11,
    color: tokens.colors.textMuted,
  },
  section: {
    marginBottom: 36,
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: tokens.fonts.sans,
    fontSize: 18,
    fontWeight: "600",
    color: tokens.colors.textPrimary,
  },
  viewAllText: {
    fontFamily: tokens.fonts.sans,
    fontSize: 12.5,
    color: tokens.colors.accent,
    cursor: "pointer",
  } as any,
  recentList: {
    gap: 10,
  },
  recentCard: {
    backgroundColor: tokens.colors.surfacePrimary,
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    borderRadius: tokens.radii.md,
    padding: 16,
    cursor: "pointer",
  } as any,
  recentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  recentDate: {
    fontFamily: tokens.fonts.mono,
    fontSize: 11,
    color: tokens.colors.textMuted,
  },
  recentCardTitle: {
    fontFamily: tokens.fonts.sans,
    fontSize: 15,
    fontWeight: "600",
    color: tokens.colors.textPrimary,
    marginBottom: 6,
  },
  recentExcerpt: {
    fontFamily: tokens.fonts.sans,
    fontSize: 13,
    color: tokens.colors.textMuted,
    lineHeight: 18,
  },
  principlesGrid: {
    gap: 12,
    marginTop: 12,
  },
  principleCard: {
    backgroundColor: tokens.colors.surfacePrimary,
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    borderRadius: tokens.radii.md,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: tokens.colors.accent,
  },
  principleTitle: {
    fontFamily: tokens.fonts.sans,
    fontSize: 14.5,
    fontWeight: "600",
    color: tokens.colors.textPrimary,
    marginBottom: 4,
  },
  principleDesc: {
    fontFamily: tokens.fonts.sans,
    fontSize: 13,
    lineHeight: 20,
    color: tokens.colors.textSecondary,
  },
});
