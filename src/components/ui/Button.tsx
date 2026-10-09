import React, { useState } from "react";
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { tokens } from "../../theme/tokens";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = "secondary",
  size = "md",
  icon,
  style,
  textStyle,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getContainerStyle = (): ViewStyle => {
    const base: ViewStyle = {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: tokens.radii.md,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      minHeight: size === "sm" ? 32 : size === "lg" ? 48 : 40,
      paddingHorizontal: size === "sm" ? 12 : size === "lg" ? 20 : 16,
      transition: "all 0.15s ease",
    } as any;

    if (variant === "primary") {
      return {
        ...base,
        backgroundColor: isHovered ? tokens.colors.accentHover : tokens.colors.accent,
      };
    }

    if (variant === "outline") {
      return {
        ...base,
        backgroundColor: isHovered ? tokens.colors.surfaceSecondary : "transparent",
        borderWidth: 1,
        borderColor: isHovered ? tokens.colors.borderFocus : tokens.colors.borderDefault,
      };
    }

    if (variant === "ghost") {
      return {
        ...base,
        backgroundColor: isHovered ? tokens.colors.captionHover : "transparent",
      };
    }

    // Default secondary
    return {
      ...base,
      backgroundColor: isHovered ? tokens.colors.surfaceElevated : tokens.colors.surfacePrimary,
      borderWidth: 1,
      borderColor: isHovered ? tokens.colors.borderFocus : tokens.colors.borderSubtle,
    };
  };

  const getTextStyle = (): TextStyle => {
    return {
      fontFamily: tokens.fonts.sans,
      fontSize: size === "sm" ? 13 : size === "lg" ? 15 : 14,
      fontWeight: variant === "primary" ? "600" : "500",
      color: variant === "primary" ? "#000000" : tokens.colors.textPrimary,
      marginLeft: icon ? 8 : 0,
    };
  };

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={[getContainerStyle(), style]}
    >
      {icon}
      <Text style={[getTextStyle(), textStyle]}>{label}</Text>
    </Pressable>
  );
};
