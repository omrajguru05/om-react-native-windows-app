import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import { tokens } from "../../theme/tokens";
import { contentService } from "../../services/contentService";
import { Icon } from "../ui/Icon";
import { Badge } from "../ui/Badge";
import type { Article } from "../../types";

interface SpotlightSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SpotlightSearchModal: React.FC<SpotlightSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults(contentService.getRecentArticles(8));
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      setResults(contentService.search(query));
    } else {
      setResults(contentService.getRecentArticles(8));
    }
  }, [query]);

  if (!isOpen) return null;

  return (
    <View style={styles.backdrop}>
      <Pressable style={styles.dismissOverlay} onPress={onClose} />
      <View style={styles.dialog}>
        {/* Search Input Bar */}
        <View style={styles.inputBar}>
          <Icon name="search" size={16} color={tokens.colors.accent} />
          <TextInput
            ref={inputRef}
            value={query}
            onChangeText={setQuery}
            placeholder="Search articles, dev notes, quick ships, tags..."
            placeholderTextColor={tokens.colors.textMuted}
            style={styles.input}
          />
          <Pressable onPress={onClose} style={styles.closeKeyPill}>
            <Text style={styles.escText}>ESC</Text>
          </Pressable>
        </View>

        {/* Results List */}
        <ScrollView style={styles.resultsList} showsVerticalScrollIndicator={false}>
          <Text style={styles.resultsHeader}>
            {query.trim() ? `RESULTS (${results.length})` : "RECENT PUBLICATIONS"}
          </Text>

          {results.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No matching documents found</Text>
            </View>
          ) : (
            results.map((item) => (
              <Pressable
                key={item.slug}
                style={styles.resultItem}
                onPress={() => {
                  onSelectArticle(item);
                  onClose();
                }}
              >
                <View style={styles.resultMain}>
                  <View style={styles.itemHeader}>
                    <Badge label={item.category} variant="accent" />
                    <Text style={styles.itemDate}>
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Text>
                  </View>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  {item.excerpt ? (
                    <Text style={styles.itemExcerpt} numberOfLines={2}>
                      {item.excerpt}
                    </Text>
                  ) : null}
                </View>
                <Icon name="chevron-right" size={14} color={tokens.colors.textMuted} />
              </Pressable>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  dismissOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dialog: {
    width: "90%",
    maxWidth: 640,
    maxHeight: 520,
    backgroundColor: tokens.colors.surfaceModal,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
    borderColor: tokens.colors.borderFocus,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.borderSubtle,
    backgroundColor: tokens.colors.surfacePrimary,
  },
  input: {
    flex: 1,
    fontFamily: tokens.fonts.sans,
    fontSize: 15,
    color: tokens.colors.textPrimary,
    marginLeft: 12,
    outlineStyle: "none",
  } as any,
  closeKeyPill: {
    backgroundColor: tokens.colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: tokens.colors.borderDefault,
    borderRadius: tokens.radii.xs,
    paddingHorizontal: 6,
    paddingVertical: 2,
    cursor: "pointer",
  } as any,
  escText: {
    fontFamily: tokens.fonts.mono,
    fontSize: 10,
    color: tokens.colors.textMuted,
  },
  resultsList: {
    padding: tokens.spacing.md,
    maxHeight: 440,
  },
  resultsHeader: {
    fontFamily: tokens.fonts.mono,
    fontSize: 10,
    letterSpacing: 1,
    color: tokens.colors.textFaint,
    marginBottom: tokens.spacing.sm,
    paddingHorizontal: 4,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: tokens.radii.md,
    marginBottom: 6,
    backgroundColor: tokens.colors.surfacePrimary,
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    cursor: "pointer",
  } as any,
  resultMain: {
    flex: 1,
    paddingRight: 12,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  itemDate: {
    fontFamily: tokens.fonts.mono,
    fontSize: 11,
    color: tokens.colors.textMuted,
    marginLeft: 8,
  },
  itemTitle: {
    fontFamily: tokens.fonts.sans,
    fontSize: 14.5,
    fontWeight: "600",
    color: tokens.colors.textPrimary,
    marginBottom: 3,
  },
  itemExcerpt: {
    fontFamily: tokens.fonts.sans,
    fontSize: 12.5,
    color: tokens.colors.textMuted,
    lineHeight: 18,
  },
  emptyState: {
    paddingVertical: 36,
    alignItems: "center",
  },
  emptyText: {
    fontFamily: tokens.fonts.sans,
    fontSize: 13,
    color: tokens.colors.textMuted,
  },
});
