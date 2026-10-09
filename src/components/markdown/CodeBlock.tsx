import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { tokens } from "../../theme/tokens";
import { Icon } from "../ui/Icon";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "bash" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.lang}>{language}</Text>
        <Pressable style={styles.copyBtn} onPress={handleCopy}>
          <Icon
            name={copied ? "check" : "copy"}
            size={12}
            color={copied ? tokens.colors.accent : tokens.colors.textMuted}
          />
          <Text style={[styles.copyText, copied && { color: tokens.colors.accent }]}>
            {copied ? "Copied" : "Copy"}
          </Text>
        </Pressable>
      </View>
      <View style={styles.codeWrapper}>
        <Text style={styles.codeText} selectable>
          {code}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.colors.surfacePrimary,
    borderWidth: 1,
    borderColor: tokens.colors.borderDefault,
    borderRadius: tokens.radii.md,
    marginVertical: tokens.spacing.md,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: tokens.colors.surfaceSecondary,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.borderSubtle,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  lang: {
    fontFamily: tokens.fonts.mono,
    fontSize: 11,
    color: tokens.colors.textMuted,
    textTransform: "lowercase",
  },
  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: tokens.radii.xs,
    cursor: "pointer",
  } as any,
  copyText: {
    fontFamily: tokens.fonts.mono,
    fontSize: 10,
    color: tokens.colors.textMuted,
    marginLeft: 4,
  },
  codeWrapper: {
    padding: 14,
    overflowX: "auto",
  } as any,
  codeText: {
    fontFamily: tokens.fonts.mono,
    fontSize: 12.5,
    lineHeight: 20,
    color: "#e4e4e7",
  },
});
