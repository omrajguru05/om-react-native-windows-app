import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { tokens } from "../theme/tokens";
import { NativeMarkdownRenderer } from "../components/markdown/NativeMarkdownRenderer";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Avatar } from "../components/ui/Avatar";
import { Icon } from "../components/ui/Icon";
import { audioService } from "../services/audioService";
import type { Article } from "../types";

interface ArticleDetailViewProps {
  article: Article;
  onNextArticle?: () => void;
  onPrevArticle?: () => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  onNextArticle,
  onPrevArticle,
}) => {
  const wordCount = article.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 220));

  const handleListen = () => {
    audioService.playTrack({
      title: article.title,
      author: article.author || "Om",
      audioUrl: article.audio,
      articleSlug: article.slug,
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.innerContent}>
        {/* Top Metadata & Actions Header */}
        <View style={styles.metaHeader}>
          <View style={styles.metaLeft}>
            <Badge label={article.category} variant="accent" />
            <Text style={styles.dateText}>
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.readTimeText}>{readTime} min read</Text>
          </View>

          <Button
            label="Listen"
            variant="outline"
            size="sm"
            onPress={handleListen}
            icon={<Icon name="volume-2" size={13} color={tokens.colors.accent} />}
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>{article.title}</Text>

        {/* Author Byline */}
        <View style={styles.byline}>
          <Avatar size={28} />
          <View style={styles.bylineText}>
            <Text style={styles.bylineName}>{article.author || "Om"}</Text>
            <Text style={styles.bylineDesc}>Published to digital archive</Text>
          </View>
        </View>

        {/* Excerpt Lead */}
        {article.excerpt ? (
          <View style={styles.excerptBox}>
            <Text style={styles.excerptText}>{article.excerpt}</Text>
          </View>
        ) : null}

        {/* TLDR Callout Box */}
        {article.tldr && article.tldr.length > 0 ? (
          <View style={styles.tldrBox}>
            <Text style={styles.tldrHeader}>KEY TAKEAWAYS</Text>
            {article.tldr.map((point, idx) => (
              <View key={idx} style={styles.tldrItem}>
                <Text style={styles.tldrBullet}>—</Text>
                <Text style={styles.tldrPoint}>{point}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* Tags */}
        {article.tags && article.tags.length > 0 ? (
          <View style={styles.tagsContainer}>
            {article.tags.map((tag) => (
              <Badge key={tag} label={`#${tag}`} variant="muted" style={styles.tag} />
            ))}
          </View>
        ) : null}

        <View style={styles.divider} />

        {/* Markdown Article Body */}
        <NativeMarkdownRenderer content={article.content} />

        {/* Article Footer Navigation */}
        <View style={styles.footerNav}>
          {onPrevArticle ? (
            <Pressable onPress={onPrevArticle} style={styles.navButton}>
              <Icon name="chevron-left" size={14} color={tokens.colors.textMuted} />
              <Text style={styles.navButtonText}>Previous post</Text>
            </Pressable>
          ) : (
            <View />
          )}

          {onNextArticle ? (
            <Pressable onPress={onNextArticle} style={styles.navButton}>
              <Text style={styles.navButtonText}>Next post</Text>
              <Icon name="chevron-right" size={14} color={tokens.colors.textMuted} />
            </Pressable>
          ) : (
            <View />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
    height: "100%",
  },
  innerContent: {
    maxWidth: 760,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: tokens.spacing.xxl,
    paddingVertical: tokens.spacing.xxxl,
  },
  metaHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  metaLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontFamily: tokens.fonts.mono,
    fontSize: 12,
    color: tokens.colors.textMuted,
    marginLeft: 10,
  },
  dot: {
    marginHorizontal: 6,
    color: tokens.colors.textFaint,
    fontSize: 12,
  },
  readTimeText: {
    fontFamily: tokens.fonts.mono,
    fontSize: 12,
    color: tokens.colors.textMuted,
  },
  title: {
    fontFamily: tokens.fonts.sans,
    fontSize: 32,
    fontWeight: "700",
    color: tokens.colors.textPrimary,
    lineHeight: 40,
    letterSpacing: -0.6,
    marginBottom: 16,
  },
  byline: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  bylineText: {
    marginLeft: 10,
  },
  bylineName: {
    fontFamily: tokens.fonts.sans,
    fontSize: 13,
    fontWeight: "600",
    color: tokens.colors.textPrimary,
  },
  bylineDesc: {
    fontFamily: tokens.fonts.sans,
    fontSize: 11,
    color: tokens.colors.textMuted,
  },
  excerptBox: {
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: tokens.colors.accent,
    marginVertical: 14,
  },
  excerptText: {
    fontFamily: tokens.fonts.rounded,
    fontSize: 17,
    lineHeight: 27,
    color: tokens.colors.textSecondary,
    fontStyle: "italic",
  },
  tldrBox: {
    backgroundColor: tokens.colors.surfacePrimary,
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    borderRadius: tokens.radii.md,
    padding: 16,
    marginVertical: 18,
  },
  tldrHeader: {
    fontFamily: tokens.fonts.mono,
    fontSize: 11,
    color: tokens.colors.accent,
    letterSpacing: 1,
    marginBottom: 10,
  },
  tldrItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  tldrBullet: {
    color: tokens.colors.accent,
    marginRight: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  tldrPoint: {
    flex: 1,
    fontFamily: tokens.fonts.sans,
    fontSize: 14,
    lineHeight: 21,
    color: tokens.colors.textSecondary,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 16,
  },
  tag: {
    marginRight: 6,
    marginBottom: 6,
  },
  divider: {
    height: 1,
    backgroundColor: tokens.colors.borderSubtle,
    marginVertical: 20,
  },
  footerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: tokens.colors.borderSubtle,
    paddingTop: 24,
    marginTop: 48,
    marginBottom: 64,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: tokens.radii.sm,
    backgroundColor: tokens.colors.surfacePrimary,
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    cursor: "pointer",
  } as any,
  navButtonText: {
    fontFamily: tokens.fonts.sans,
    fontSize: 13,
    color: tokens.colors.textSecondary,
    marginHorizontal: 6,
  },
});
