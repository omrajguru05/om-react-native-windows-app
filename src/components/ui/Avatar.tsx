import React from "react";
import { Image, View, StyleSheet, ViewStyle } from "react-native";
import { tokens } from "../../theme/tokens";

interface AvatarProps {
  url?: string;
  size?: number;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  url = "https://in1.omcdn.xyz/static/identity/om-avatar.png",
  size = 36,
  style,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    >
      <Image
        source={{ uri: url }}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: tokens.colors.borderDefault,
    overflow: "hidden",
  },
});
