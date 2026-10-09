import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { tokens } from "../../theme/tokens";

interface BadgeProps {
  label: string;
  variant?: "default" | "accent" | "muted";
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = "default", style }) => {
  const getContainerStyle = (): ViewStyle => {
    switch (variant) {
      case "accent":
        return {
          backgroundColor: tokens.colors.accentMuted,
          borderColor: tokens.colors.accentBorder,
        };
      case "muted":
        return {
          backgroundColor: tokens.colors.surfacePrimary,
          borderColor: tokens.colors.borderSubtle,
        };
      default:
        return {
          backgroundColor: tokens.colors.surfaceSecondary,
          borderColor: tokens.colors.borderDefault,
        };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "accent":
        return tokens.colors.accent;
      case "muted":
        return tokens.colors.textMuted;
      default:
        return tokens.colors.textSecondary;
    }
  };

  return (
    <View style={[styles.badge, getContainerStyle(), style]}>
      <Text style={[styles.text, { color: getTextColor() }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: tokens.radii.xs,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  text: {
    fontFamily: tokens.fonts.mono,
    fontSize: 11,
    letterSpacing: 0.2,
  },
});
