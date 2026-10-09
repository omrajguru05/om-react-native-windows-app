import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { tokens } from "../theme/tokens";
import { Badge } from "../components/ui/Badge";

export const DesignPrinciplesView: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <Badge label="System v2.0" variant="accent" />
          <Text style={styles.title}>Design System & Craft</Text>
          <Text style={styles.subtitle}>
            A calm, precise, systems-minded design language. Restrained, structural, and built to last.
          </Text>
        </View>

        {/* Core Principles */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>CORE FOUNDATIONS</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>1. Precision Over Decoration</Text>
            <Text style={styles.cardBody}>
              Depth earns attention here; ornament does not. Every surface should read like it was built by someone who thinks in patterns and builds things meant to endure.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>2. Language is Part of the Interface</Text>
            <Text style={styles.cardBody}>
              A confusing or cluttered label is as much a usability flaw as a broken layout. Eliminate filler copy, pseudo labels, and decorative pill badges.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>3. Apple HIG & Universal Simplicity</Text>
            <Text style={styles.cardBody}>
              Every interface must pass the Grandma Test: an everyday person with zero technical background can use it effortlessly. Hide computational complexity behind calm, obvious surfaces.
            </Text>
          </View>
        </View>

        {/* Typography System */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>TYPOGRAPHY TOKENS</Text>
          <View style={styles.typeSample}>
            <Text style={styles.typeLabel}>THE RELATIVE SANS VARIABLE (PRIMARY UI & HEADINGS)</Text>
            <Text style={styles.sampleSans}>
              The quick brown fox jumps over the lazy dog. 1234567890
            </Text>
          </View>

          <View style={styles.typeSample}>
            <Text style={styles.typeLabel}>THE RELATIVE ROUNDED VARIABLE (WARM ACCENTS & QUOTES)</Text>
            <Text style={styles.sampleRounded}>
              “Precision is the aesthetic; composition is where creativity lives.”
            </Text>
          </View>

          <View style={styles.typeSample}>
            <Text style={styles.typeLabel}>THE RELATIVE MONO VARIABLE (CODE & SYSTEM METADATA)</Text>
            <Text style={styles.sampleMono}>
              const accent = tokens.colors.accent; // #10b981
            </Text>
          </View>
        </View>

        {/* Color Palette */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>PALETTE TOKENS</Text>
          <View style={styles.paletteRow}>
            <View style={styles.paletteItem}>
              <View style={[styles.colorBox, { backgroundColor: tokens.colors.background }]} />
              <Text style={styles.colorName}>Background</Text>
              <Text style={styles.colorHex}>#000000</Text>
            </View>
            <View style={styles.paletteItem}>
              <View style={[styles.colorBox, { backgroundColor: tokens.colors.surfacePrimary }]} />
              <Text style={styles.colorName}>Surface Primary</Text>
              <Text style={styles.colorHex}>#0C0C0C</Text>
            </View>
            <View style={styles.paletteItem}>
              <View style={[styles.colorBox, { backgroundColor: tokens.colors.borderDefault }]} />
              <Text style={styles.colorName}>Border Default</Text>
              <Text style={styles.colorHex}>#262626</Text>
            </View>
            <View style={styles.paletteItem}>
              <View style={[styles.colorBox, { backgroundColor: tokens.colors.accent }]} />
              <Text style={styles.colorName}>Emerald Accent</Text>
              <Text style={styles.colorHex}>#10B981</Text>
            </View>
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
  header: {
    marginBottom: 32,
  },
  title: {
    fontFamily: tokens.fonts.sans,
    fontSize: 28,
    fontWeight: "700",
    color: tokens.colors.textPrimary,
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: tokens.fonts.sans,
    fontSize: 15,
    color: tokens.colors.textSecondary,
    lineHeight: 22,
  },
  section: {
    marginBottom: 36,
  },
  sectionHeader: {
    fontFamily: tokens.fonts.mono,
    fontSize: 11,
    letterSpacing: 1,
    color: tokens.colors.textFaint,
    marginBottom: 12,
  },
  card: {
    backgroundColor: tokens.colors.surfacePrimary,
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    borderRadius: tokens.radii.md,
    padding: 16,
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: tokens.fonts.sans,
    fontSize: 15,
    fontWeight: "600",
    color: tokens.colors.textPrimary,
    marginBottom: 4,
  },
  cardBody: {
    fontFamily: tokens.fonts.sans,
    fontSize: 13.5,
    lineHeight: 21,
    color: tokens.colors.textSecondary,
  },
  typeSample: {
    backgroundColor: tokens.colors.surfacePrimary,
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    borderRadius: tokens.radii.md,
    padding: 16,
    marginBottom: 10,
  },
  typeLabel: {
    fontFamily: tokens.fonts.mono,
    fontSize: 10,
    color: tokens.colors.accent,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  sampleSans: {
    fontFamily: tokens.fonts.sans,
    fontSize: 16,
    color: tokens.colors.textPrimary,
    lineHeight: 22,
  },
  sampleRounded: {
    fontFamily: tokens.fonts.rounded,
    fontSize: 16,
    color: tokens.colors.textPrimary,
    fontStyle: "italic",
    lineHeight: 24,
  },
  sampleMono: {
    fontFamily: tokens.fonts.mono,
    fontSize: 13,
    color: tokens.colors.accent,
    lineHeight: 20,
  },
  paletteRow: {
    flexDirection: "row",
    gap: 12,
  },
  paletteItem: {
    flex: 1,
    backgroundColor: tokens.colors.surfacePrimary,
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    borderRadius: tokens.radii.md,
    padding: 10,
    alignItems: "center",
  },
  colorBox: {
    width: "100%",
    height: 44,
    borderRadius: tokens.radii.xs,
    borderWidth: 1,
    borderColor: tokens.colors.borderDefault,
    marginBottom: 8,
  },
  colorName: {
    fontFamily: tokens.fonts.sans,
    fontSize: 11,
    fontWeight: "600",
    color: tokens.colors.textPrimary,
  },
  colorHex: {
    fontFamily: tokens.fonts.mono,
    fontSize: 10,
    color: tokens.colors.textMuted,
    marginTop: 2,
  },
});
