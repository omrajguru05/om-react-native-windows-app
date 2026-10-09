import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { tokens } from "../theme/tokens";
import { TODAY_NEWSPAPER } from "../data/newspaper";
import { Badge } from "../components/ui/Badge";
import { contentService } from "../services/contentService";
import type { Article } from "../types";

interface NewspaperViewProps {
  onSelectArticle: (article: Article) => void;
}

export const NewspaperView: React.FC<NewspaperViewProps> = ({ onSelectArticle }) => {
  const paper = TODAY_NEWSPAPER;

  const handleOpenSlug = (slug: string) => {
    const found = contentService.getArticleBySlug(slug);
    if (found) {
      onSelectArticle(found);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.inner}>
        {/* Masthead */}
        <View style={styles.masthead}>
          <Text style={styles.mastheadTitle}>THE MORNING DISPATCH</Text>
          <View style={styles.mastheadMeta}>
            <Text style={styles.metaItem}>{paper.date}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.metaItem}>{paper.editionNumber}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.metaItem}>DAILY COMPANION</Text>
          </View>
        </View>

        {/* Lead Headline */}
        <View style={styles.leadSection}>
          <Text style={styles.leadHeadline}>{paper.headline}</Text>
          <Text style={styles.leadSubhead}>{paper.subhead}</Text>

          <Pressable
            style={styles.leadArticleCard}
            onPress={() => handleOpenSlug(paper.leadArticle.slug)}
          >
            <View style={styles.leadHeader}>
              <Badge label="FRONT PAGE ESSAY" variant="accent" />
              <Text style={styles.leadDate}>{paper.leadArticle.date}</Text>
            </View>
            <Text style={styles.leadArticleTitle}>{paper.leadArticle.title}</Text>
            <Text style={styles.leadSummary}>{paper.leadArticle.summary}</Text>
            <Text style={styles.readPrompt}>Read full essay →</Text>
          </Pressable>
        </View>

        {/* Dispatches Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>COLLECTED DISPATCHES</Text>
          <View style={styles.dispatchesGrid}>
            {paper.dispatches.map((item) => (
              <Pressable
                key={item.slug}
                style={styles.dispatchCard}
                onPress={() => handleOpenSlug(item.slug)}
              >
                <View style={styles.dispatchHeader}>
                  <Badge label={item.category} variant="muted" />
                  <Text style={styles.dispatchDate}>{item.date}</Text>
                </View>
                <Text style={styles.dispatchTitle}>{item.title}</Text>
                <Text style={styles.dispatchSummary}>{item.summary}</Text>
                <Text style={styles.readPrompt}>Read dispatch →</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Thought of the Day */}
        <View style={styles.quoteCard}>
          <Text style={styles.quoteHeader}>INSCRIPTION</Text>
          <Text style={styles.quoteText}>{paper.thoughtOfTheDay}</Text>
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
  masthead: {
    borderBottomWidth: 2,
    borderBottomColor: tokens.colors.borderDefault,
    paddingBottom: 16,
    marginBottom: 24,
    alignItems: "center",
  },
  mastheadTitle: {
    fontFamily: tokens.fonts.sans,
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 2,
    color: tokens.colors.textPrimary,
    marginBottom: 6,
  },
  mastheadMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaItem: {
    fontFamily: tokens.fonts.mono,
    fontSize: 11,
    color: tokens.colors.textMuted,
  },
  dot: {
    marginHorizontal: 8,
    color: tokens.colors.textFaint,
  },
  leadSection: {
    marginBottom: 32,
  },
  leadHeadline: {
    fontFamily: tokens.fonts.sans,
    fontSize: 24,
    fontWeight: "700",
    color: tokens.colors.textPrimary,
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  leadSubhead: {
    fontFamily: tokens.fonts.rounded,
    fontSize: 15,
    fontStyle: "italic",
    color: tokens.colors.textSecondary,
    marginBottom: 16,
  },
  leadArticleCard: {
    backgroundColor: tokens.colors.surfacePrimary,
    borderWidth: 1,
    borderColor: tokens.colors.borderDefault,
    borderRadius: tokens.radii.lg,
    padding: 20,
    cursor: "pointer",
  } as any,
  leadHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  leadDate: {
    fontFamily: tokens.fonts.mono,
    fontSize: 11,
    color: tokens.colors.textMuted,
  },
  leadArticleTitle: {
    fontFamily: tokens.fonts.sans,
    fontSize: 18,
    fontWeight: "700",
    color: tokens.colors.textPrimary,
    marginBottom: 8,
  },
  leadSummary: {
    fontFamily: tokens.fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: tokens.colors.textSecondary,
    marginBottom: 12,
  },
  readPrompt: {
    fontFamily: tokens.fonts.sans,
    fontSize: 13,
    color: tokens.colors.accent,
    fontWeight: "600",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: tokens.fonts.mono,
    fontSize: 11,
    letterSpacing: 1,
    color: tokens.colors.textFaint,
    marginBottom: 14,
  },
  dispatchesGrid: {
    gap: 12,
  },
  dispatchCard: {
    backgroundColor: tokens.colors.surfacePrimary,
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    borderRadius: tokens.radii.md,
    padding: 16,
    cursor: "pointer",
  } as any,
  dispatchHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dispatchDate: {
    fontFamily: tokens.fonts.mono,
    fontSize: 11,
    color: tokens.colors.textMuted,
  },
  dispatchTitle: {
    fontFamily: tokens.fonts.sans,
    fontSize: 15,
    fontWeight: "600",
    color: tokens.colors.textPrimary,
    marginBottom: 6,
  },
  dispatchSummary: {
    fontFamily: tokens.fonts.sans,
    fontSize: 13,
    lineHeight: 19,
    color: tokens.colors.textSecondary,
    marginBottom: 8,
  },
  quoteCard: {
    backgroundColor: tokens.colors.surfacePrimary,
    borderLeftWidth: 3,
    borderLeftColor: tokens.colors.accent,
    borderRadius: tokens.radii.md,
    padding: 18,
    marginTop: 10,
    marginBottom: 40,
  },
  quoteHeader: {
    fontFamily: tokens.fonts.mono,
    fontSize: 10,
    letterSpacing: 1,
    color: tokens.colors.accent,
    marginBottom: 6,
  },
  quoteText: {
    fontFamily: tokens.fonts.rounded,
    fontSize: 15,
    fontStyle: "italic",
    lineHeight: 23,
    color: tokens.colors.textPrimary,
  },
});
