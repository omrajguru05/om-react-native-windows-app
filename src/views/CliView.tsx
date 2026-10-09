import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { tokens } from "../theme/tokens";
import { contentService } from "../services/contentService";
import { PROFILE } from "../data/profile";
import type { Article } from "../types";

interface CliViewProps {
  onSelectArticle: (article: Article) => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: string;
}

export const CliView: React.FC<CliViewProps> = ({ onSelectArticle }) => {
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: "welcome",
      command: "welcome",
      output: `Om Interactive Terminal [Version 1.0.0]
Type 'help' to see available system commands.
Use 'ls' to list directories, or 'cat <slug>' to read files.`,
    },
  ]);
  const inputRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = () => {
    const raw = inputVal.trim();
    if (!raw) return;

    const parts = raw.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");
    let out = "";

    switch (cmd) {
      case "help":
        out = `Available commands:
  help           Show this manual
  bio            Display Om's background & role
  ls             List virtual content directories
  writings       List recent writings
  projects       List selected engineering projects
  cat <slug>     Display contents of an article
  open <slug>    Open article in reader pane
  date           Show current system time
  clear          Clear terminal window`;
        break;

      case "bio":
        out = `${PROFILE.name} - ${PROFILE.title}
${PROFILE.bio}
Location: ${PROFILE.location}
Contact: ${PROFILE.email}`;
        break;

      case "ls":
        out = `drwxr-xr-x  writings/     (55 essays)
drwxr-xr-x  devnotes/     (18 engineering notes)
drwxr-xr-x  quick-ships/  (17 shipping dispatches)
drwxr-xr-x  projects/     (14 software builds)
-rw-r--r--  profile.json
-rw-r--r--  newspaper.md`;
        break;

      case "writings": {
        const items = contentService.getArticlesByCategory("writings").slice(0, 10);
        out = items.map((i) => `  ${i.slug.padEnd(32)} ${i.title}`).join("\n");
        break;
      }

      case "projects": {
        out = `  instant-qr-creator     Instant QR generation utility
  keycheck               Mechanical keyboard tester
  typesnap               TypeScript snapshot engine
  json-buddy             High-throughput JSON formatter
  shadow-studio          Generative shadow design tool`;
        break;
      }

      case "cat": {
        if (!arg) {
          out = "usage: cat <slug>";
        } else {
          const item = contentService.getArticleBySlug(arg);
          if (item) {
            out = `# ${item.title} [${item.category}]
Date: ${item.date}

${item.excerpt}

${item.content.slice(0, 500)}...`;
          } else {
            out = `error: '${arg}' not found`;
          }
        }
        break;
      }

      case "open": {
        if (!arg) {
          out = "usage: open <slug>";
        } else {
          const item = contentService.getArticleBySlug(arg);
          if (item) {
            onSelectArticle(item);
            return;
          } else {
            out = `error: cannot open '${arg}', not found`;
          }
        }
        break;
      }

      case "date":
        out = new Date().toString();
        break;

      case "clear":
        setLogs([]);
        setInputVal("");
        return;

      default:
        out = `Unknown command: '${cmd}'. Type 'help' for available commands.`;
    }

    setLogs((prev) => [
      ...prev,
      { id: String(Date.now()), command: raw, output: out },
    ]);
    setInputVal("");
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
  };

  return (
    <View style={styles.container}>
      <View style={styles.terminalWindow}>
        <View style={styles.windowHeader}>
          <Text style={styles.windowTitle}>terminal: bash (interactive session)</Text>
        </View>

        <ScrollView ref={scrollRef} style={styles.body} showsVerticalScrollIndicator={false}>
          {logs.map((log) => (
            <View key={log.id} style={styles.logBlock}>
              <View style={styles.promptRow}>
                <Text style={styles.prompt}>om@desktop:~$</Text>
                <Text style={styles.cmd}>{log.command}</Text>
              </View>
              <Text style={styles.output}>{log.output}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputRow}>
          <Text style={styles.prompt}>om@desktop:~$</Text>
          <TextInput
            ref={inputRef}
            value={inputVal}
            onChangeText={setInputVal}
            onSubmitEditing={handleCommand}
            placeholder="type command..."
            placeholderTextColor={tokens.colors.textFaint}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
    padding: tokens.spacing.xl,
  },
  terminalWindow: {
    flex: 1,
    backgroundColor: "#060606",
    borderWidth: 1,
    borderColor: tokens.colors.borderDefault,
    borderRadius: tokens.radii.lg,
    overflow: "hidden",
  },
  windowHeader: {
    backgroundColor: tokens.colors.surfaceSecondary,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.borderSubtle,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: 8,
  },
  windowTitle: {
    fontFamily: tokens.fonts.mono,
    fontSize: 12,
    color: tokens.colors.textMuted,
  },
  body: {
    flex: 1,
    padding: tokens.spacing.md,
  },
  logBlock: {
    marginBottom: 14,
  },
  promptRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  prompt: {
    fontFamily: tokens.fonts.mono,
    fontSize: 12.5,
    color: tokens.colors.accent,
    marginRight: 8,
  },
  cmd: {
    fontFamily: tokens.fonts.mono,
    fontSize: 12.5,
    color: tokens.colors.textPrimary,
    fontWeight: "600",
  },
  output: {
    fontFamily: tokens.fonts.mono,
    fontSize: 12,
    lineHeight: 18,
    color: tokens.colors.textSecondary,
    marginTop: 4,
    whiteSpace: "pre-wrap",
  } as any,
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.borderSubtle,
    backgroundColor: "#090909",
  },
  input: {
    flex: 1,
    fontFamily: tokens.fonts.mono,
    fontSize: 12.5,
    color: tokens.colors.textPrimary,
    outlineStyle: "none",
  } as any,
});
