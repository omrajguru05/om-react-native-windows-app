import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { tokens } from "../theme/tokens";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { PROJECTS } from "../data/projects";

export const ProjectsView: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.title}>Projects & Builds</Text>
          <Text style={styles.subtitle}>
            Software tools, generative systems, and experimental applications engineered for precision.
          </Text>
        </View>

        <View style={styles.grid}>
          {PROJECTS.map((proj) => (
            <View key={proj.slug} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <Text style={styles.cardTitle}>{proj.title}</Text>
                  <Text style={styles.cardTagline}>{proj.tagline}</Text>
                </View>
                <Badge label={proj.status || "Active"} variant="accent" />
              </View>

              <Text style={styles.cardDescription}>{proj.description}</Text>

              {/* Tech Stack Tags */}
              <View style={styles.stackRow}>
                {proj.info.techStack.slice(0, 6).map((tech) => (
                  <Badge key={tech} label={tech} variant="muted" style={styles.stackBadge} />
                ))}
              </View>

              {/* Key Features */}
              {proj.features && proj.features.length > 0 ? (
                <View style={styles.featuresList}>
                  {proj.features.slice(0, 3).map((feat, idx) => (
                    <View key={idx} style={styles.featureItem}>
                      <Text style={styles.featureBullet}>•</Text>
                      <Text style={styles.featureText}>
                        <Text style={styles.featureTitle}>{feat.title}: </Text>
                        {feat.description}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : null}

              {/* CTAs */}
              {proj.ctas && proj.ctas.length > 0 ? (
                <View style={styles.ctaRow}>
                  {proj.ctas.map((cta, idx) => (
                    <Button
                      key={idx}
                      label={cta.label}
                      variant={cta.variant === "primary" ? "primary" : "outline"}
                      size="sm"
                      style={{ marginRight: 8 }}
                      onPress={() => {
                        if (typeof window !== "undefined") {
                          window.open(cta.href, "_blank");
                        }
                      }}
                      icon={
                        <Icon
                          name="external-link"
                          size={12}
                          color={cta.variant === "primary" ? "#000000" : tokens.colors.textMuted}
                        />
                      }
                    />
                  ))}
                </View>
              ) : null}
            </View>
          ))}
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
    maxWidth: 820,
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
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: tokens.fonts.sans,
    fontSize: 15,
    color: tokens.colors.textSecondary,
    lineHeight: 22,
  },
  grid: {
    gap: 16,
  },
  card: {
    backgroundColor: tokens.colors.surfacePrimary,
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    borderRadius: tokens.radii.lg,
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardHeaderLeft: {
    flex: 1,
    paddingRight: 12,
  },
  cardTitle: {
    fontFamily: tokens.fonts.sans,
    fontSize: 18,
    fontWeight: "700",
    color: tokens.colors.textPrimary,
  },
  cardTagline: {
    fontFamily: tokens.fonts.sans,
    fontSize: 13,
    color: tokens.colors.accent,
    marginTop: 2,
  },
  cardDescription: {
    fontFamily: tokens.fonts.sans,
    fontSize: 14,
    color: tokens.colors.textSecondary,
    lineHeight: 21,
    marginBottom: 14,
  },
  stackRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 14,
  },
  stackBadge: {
    marginRight: 6,
    marginBottom: 6,
  },
  featuresList: {
    backgroundColor: tokens.colors.surfaceSecondary,
    borderRadius: tokens.radii.md,
    padding: 12,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  featureBullet: {
    color: tokens.colors.accent,
    marginRight: 6,
    fontSize: 14,
  },
  featureText: {
    flex: 1,
    fontFamily: tokens.fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    color: tokens.colors.textSecondary,
  },
  featureTitle: {
    fontWeight: "600",
    color: tokens.colors.textPrimary,
  },
  ctaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
