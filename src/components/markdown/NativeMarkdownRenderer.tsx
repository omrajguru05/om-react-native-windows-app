import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { tokens } from "../../theme/tokens";
import { CodeBlock } from "./CodeBlock";

interface NativeMarkdownRendererProps {
  content: string;
}

interface BlockToken {
  type: "h1" | "h2" | "h3" | "h4" | "p" | "code" | "quote" | "list" | "divider";
  text?: string;
  lang?: string;
  items?: string[];
}

function parseMarkdownBlocks(raw: string): BlockToken[] {
  const lines = raw.split("\n");
  const blocks: BlockToken[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Code blocks ```
    if (trimmed.startsWith("```")) {
      const lang = trimmed.replace("```", "").trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({ type: "code", text: codeLines.join("\n"), lang: lang || "text" });
      continue;
    }

    // Dividers
    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      blocks.push({ type: "divider" });
      i++;
      continue;
    }

    // Headings
    if (trimmed.startsWith("#### ")) {
      blocks.push({ type: "h4", text: trimmed.slice(5) });
      i++;
      continue;
    }
    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "h3", text: trimmed.slice(4) });
      i++;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", text: trimmed.slice(3) });
      i++;
      continue;
    }
    if (trimmed.startsWith("# ")) {
      blocks.push({ type: "h1", text: trimmed.slice(2) });
      i++;
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ""));
        i++;
      }
      blocks.push({ type: "quote", text: quoteLines.join(" ") });
      continue;
    }

    // Lists (- or *)
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const listItems: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
      ) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ type: "list", items: listItems });
      continue;
    }

    // Standard paragraph: accumulate until blank line
    const pLines: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].trim().startsWith(">") &&
      !lines[i].trim().startsWith("- ") &&
      !lines[i].trim().startsWith("* ")
    ) {
      pLines.push(lines[i]);
      i++;
    }
    blocks.push({ type: "p", text: pLines.join(" ") });
  }

  return blocks;
}

function renderInlineText(rawText: string) {
  // Regex parse for `inline code`, **bold**, *italic*, [link](url)
  const parts: React.ReactNode[] = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(rawText)) !== null) {
    if (match.index > lastIndex) {
      parts.push(rawText.substring(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <Text key={match.index} style={styles.inlineCode}>
          {token.slice(1, -1)}
        </Text>
      );
    } else if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <Text key={match.index} style={styles.boldText}>
          {token.slice(2, -2)}
        </Text>
      );
    } else if (token.startsWith("*") && token.endsWith("*")) {
      parts.push(
        <Text key={match.index} style={styles.italicText}>
          {token.slice(1, -1)}
        </Text>
      );
    } else if (token.startsWith("[") && token.includes("](")) {
      const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        parts.push(
          <Text
            key={match.index}
            style={styles.linkText}
            onPress={() => {
              if (typeof window !== "undefined") {
                window.open(linkMatch[2], "_blank");
              }
            }}
          >
            {linkMatch[1]}
          </Text>
        );
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < rawText.length) {
    parts.push(rawText.substring(lastIndex));
  }

  return parts;
}

export const NativeMarkdownRenderer: React.FC<NativeMarkdownRendererProps> = ({
  content,
}) => {
  const blocks = parseMarkdownBlocks(content);

  return (
    <View style={styles.container}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "h1":
            return (
              <Text key={idx} style={styles.h1}>
                {block.text}
              </Text>
            );
          case "h2":
            return (
              <Text key={idx} style={styles.h2}>
                {block.text}
              </Text>
            );
          case "h3":
            return (
              <Text key={idx} style={styles.h3}>
                {block.text}
              </Text>
            );
          case "h4":
            return (
              <Text key={idx} style={styles.h4}>
                {block.text}
              </Text>
            );
          case "code":
            return <CodeBlock key={idx} code={block.text || ""} language={block.lang} />;
          case "quote":
            return (
              <View key={idx} style={styles.quoteBlock}>
                <Text style={styles.quoteText}>{renderInlineText(block.text || "")}</Text>
              </View>
            );
          case "list":
            return (
              <View key={idx} style={styles.listContainer}>
                {block.items?.map((item, itemIdx) => (
                  <View key={itemIdx} style={styles.listItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.listText}>{renderInlineText(item)}</Text>
                  </View>
                ))}
              </View>
            );
          case "divider":
            return <View key={idx} style={styles.divider} />;
          case "p":
          default:
            return (
              <Text key={idx} style={styles.paragraph}>
                {renderInlineText(block.text || "")}
              </Text>
            );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: tokens.spacing.md,
  },
  h1: {
    fontFamily: tokens.fonts.sans,
    fontSize: 26,
    fontWeight: "700",
    color: tokens.colors.textPrimary,
    marginTop: 24,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: tokens.fonts.sans,
    fontSize: 20,
    fontWeight: "600",
    color: tokens.colors.textPrimary,
    marginTop: 22,
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  h3: {
    fontFamily: tokens.fonts.sans,
    fontSize: 17,
    fontWeight: "600",
    color: tokens.colors.textPrimary,
    marginTop: 18,
    marginBottom: 8,
  },
  h4: {
    fontFamily: tokens.fonts.sans,
    fontSize: 15,
    fontWeight: "600",
    color: tokens.colors.textPrimary,
    marginTop: 14,
    marginBottom: 6,
  },
  paragraph: {
    fontFamily: tokens.fonts.sans,
    fontSize: 15.5,
    lineHeight: 25,
    color: tokens.colors.textSecondary,
    marginBottom: 16,
  },
  boldText: {
    color: tokens.colors.textPrimary,
    fontWeight: "600",
  },
  italicText: {
    fontStyle: "italic",
    color: tokens.colors.textSecondary,
  },
  inlineCode: {
    fontFamily: tokens.fonts.mono,
    fontSize: 13,
    color: tokens.colors.accent,
    backgroundColor: tokens.colors.surfaceSecondary,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: tokens.radii.xs,
  },
  linkText: {
    color: tokens.colors.accent,
    textDecorationLine: "underline",
    cursor: "pointer",
  } as any,
  quoteBlock: {
    borderLeftWidth: 3,
    borderLeftColor: tokens.colors.accent,
    paddingLeft: 16,
    paddingVertical: 6,
    marginVertical: 14,
    backgroundColor: tokens.colors.surfacePrimary,
    borderRadius: tokens.radii.xs,
  },
  quoteText: {
    fontFamily: tokens.fonts.rounded,
    fontSize: 15,
    lineHeight: 24,
    color: tokens.colors.textPrimary,
    fontStyle: "italic",
  },
  listContainer: {
    marginBottom: 16,
    paddingLeft: 6,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bullet: {
    color: tokens.colors.accent,
    fontSize: 18,
    lineHeight: 22,
    marginRight: 10,
  },
  listText: {
    flex: 1,
    fontFamily: tokens.fonts.sans,
    fontSize: 15,
    lineHeight: 24,
    color: tokens.colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: tokens.colors.borderSubtle,
    marginVertical: 24,
  },
});
