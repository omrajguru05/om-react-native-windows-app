import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import { tokens } from "../theme/tokens";
import { Icon } from "../components/ui/Icon";
import { Badge } from "../components/ui/Badge";
import type { Article, ContentCategory } from "../types";

interface ArticleListViewProps {
  category: ContentCategory;
  categoryTitle: string;
  articles: Article[];
  selectedArticle: Article | null;
  onSelectArticle: (article: Article) => void;
}

export const ArticleListView: React.FC<ArticleListViewProps> = ({
  categoryTitle,
  articles,
  selectedArticle,
  onSelectArticle,
}) => {
  const [filterQuery, setFilterQuery] = useState("");

  const filtered = articles.filter((a) => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <View style={styles.container}>
      {/* Pane Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>{categoryTitle}</Text>
          <Badge label={`${articles.length} items`} variant="muted" />
        </View>
        {/* Quick Filter */}
        <View style={styles.searchBox}>
          <Icon name="search" size={13} color={tokens.colors.textMuted} />
          <TextInput
            value={filterQuery}
            onChangeText={setFilterQuery}
            placeholder={`Filter ${categoryTitle.toLowerCase()}...`}
            placeholderTextColor={tokens.colors.textMuted}
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* List */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No items match filter</Text>
          </View>
        ) : (
          filtered.map((item) => {
            const isSelected = selectedArticle?.slug === item.slug;
            const wordCount = item.content.split(/\s+/).length;
            const readTime = Math.max(1, Math.ceil(wordCount / 220));

            return (
              <Pressable
                key={item.slug}
                onPress={() => onSelectArticle(item)}
                style={[styles.itemCard, isSelected && styles.itemCardSelected]}
              >
                <View style={styles.itemMeta}>
                  <Text style={styles.itemDate}>
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.readTime}>{readTime} min read</Text>
                </View>

                <Text
                  style={[styles.itemTitle, isSelected && styles.itemTitleSelected]}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>

                {item.excerpt ? (
                  <Text style={styles.itemExcerpt} numberOfLines={2}>
                    {item.excerpt}
                  </Text>
                ) : null}
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: tokens.layout.listPaneWidth,
    backgroundColor: tokens.colors.railBackground,
    borderRightWidth: 1,
    borderRightColor: tokens.colors.borderSubtle,
    height: "100%",
  },
  header: {
    padding: tokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.borderSubtle,
    backgroundColor: tokens.colors.railBackground,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontFamily: tokens.fonts.sans,
    fontSize: 16,
    fontWeight: "700",
    color: tokens.colors.textPrimary,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: tokens.colors.surfacePrimary,
    borderWidth: 1,
    borderColor: tokens.colors.borderDefault,
    borderRadius: tokens.radii.sm,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    fontFamily: tokens.fonts.sans,
    fontSize: 12,
    color: tokens.colors.textPrimary,
    marginLeft: 6,
    outlineStyle: "none",
  } as any,
  list: {
    flex: 1,
    padding: tokens.spacing.sm,
  },
  empty: {
    paddingVertical: 32,
    alignItems: "center",
  },
  emptyText: {
    fontFamily: tokens.fonts.sans,
    fontSize: 12,
    color: tokens.colors.textMuted,
  },
  itemCard: {
    padding: 12,
    borderRadius: tokens.radii.md,
    backgroundColor: "transparent",
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "transparent",
    cursor: "pointer",
  } as any,
  itemCardSelected: {
    backgroundColor: tokens.colors.surfaceSecondary,
    borderColor: tokens.colors.borderDefault,
    borderLeftWidth: 3,
    borderLeftColor: tokens.colors.accent,
  },
  itemMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  itemDate: {
    fontFamily: tokens.fonts.mono,
    fontSize: 10.5,
    color: tokens.colors.textMuted,
  },
  dot: {
    marginHorizontal: 4,
    color: tokens.colors.textFaint,
    fontSize: 10,
  },
  readTime: {
    fontFamily: tokens.fonts.mono,
    fontSize: 10.5,
    color: tokens.colors.textMuted,
  },
  itemTitle: {
    fontFamily: tokens.fonts.sans,
    fontSize: 13.5,
    fontWeight: "600",
    color: tokens.colors.textPrimary,
    marginBottom: 4,
    lineHeight: 18,
  },
  itemTitleSelected: {
    color: tokens.colors.textPrimary,
  },
  itemExcerpt: {
    fontFamily: tokens.fonts.sans,
    fontSize: 12,
    color: tokens.colors.textMuted,
    lineHeight: 16,
  },
});
