import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { tokens } from "../theme/tokens";
import { Avatar } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Icon } from "../components/ui/Icon";
import { PROFILE } from "../data/profile";

export const AboutView: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.inner}>
        {/* Header */}
        <View style={styles.header}>
          <Avatar size={72} />
          <Text style={styles.name}>{PROFILE.name}</Text>
          <Text style={styles.role}>{PROFILE.title}</Text>
          <View style={styles.badgeRow}>
            <Badge label={`📍 ${PROFILE.location}`} variant="muted" style={styles.badge} />
            <Badge label="Available for building" variant="accent" style={styles.badge} />
          </View>
        </View>

        {/* Bio Narrative */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>BACKGROUND & FOCUS</Text>
          <Text style={styles.paragraph}>
            I am drawn to the systems and patterns that shape the digital world, to the quiet decisions that compound into real impact, and to the discipline of turning insight into action.
          </Text>
          <Text style={styles.paragraph}>
            My work spans frontend engineering, AI evaluation pipelines, high-fidelity native applications, and systems design. Precision and clarity are the priorities.
          </Text>
        </View>

        {/* Reach Out / Connect */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>DIRECT CHANNELS</Text>
          <View style={styles.socialList}>
            {PROFILE.socials.map((s) => (
              <View key={s.label} style={styles.socialCard}>
                <View>
                  <Text style={styles.socialLabel}>{s.label}</Text>
                  <Text style={styles.socialHandle}>{s.handle}</Text>
                </View>
                <Button
                  label="Open"
                  variant="outline"
                  size="sm"
                  onPress={() => {
                    if (typeof window !== "undefined") {
                      window.open(s.url, "_blank");
                    }
                  }}
                  icon={<Icon name="external-link" size={12} color={tokens.colors.textMuted} />}
                />
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
    maxWidth: 720,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: tokens.spacing.xxl,
    paddingVertical: tokens.spacing.xxxl,
  },
  header: {
    alignItems: "center",
    marginBottom: 36,
  },
  name: {
    fontFamily: tokens.fonts.sans,
    fontSize: 26,
    fontWeight: "700",
    color: tokens.colors.textPrimary,
    marginTop: 16,
  },
  role: {
    fontFamily: tokens.fonts.sans,
    fontSize: 14,
    color: tokens.colors.accent,
    marginTop: 4,
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    fontFamily: tokens.fonts.mono,
    fontSize: 11,
    letterSpacing: 1,
    color: tokens.colors.textFaint,
    marginBottom: 12,
  },
  paragraph: {
    fontFamily: tokens.fonts.sans,
    fontSize: 15,
    lineHeight: 24,
    color: tokens.colors.textSecondary,
    marginBottom: 14,
  },
  socialList: {
    gap: 10,
  },
  socialCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: tokens.colors.surfacePrimary,
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    borderRadius: tokens.radii.md,
    padding: 14,
  },
  socialLabel: {
    fontFamily: tokens.fonts.sans,
    fontSize: 14,
    fontWeight: "600",
    color: tokens.colors.textPrimary,
  },
  socialHandle: {
    fontFamily: tokens.fonts.mono,
    fontSize: 12,
    color: tokens.colors.textMuted,
    marginTop: 2,
  },
});
