import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import { tokens } from "../../theme/tokens";
import { contentService } from "../../services/contentService";
import { PROFILE } from "../../data/profile";
import { Icon } from "../ui/Icon";
import type { Article } from "../../types";

interface QuakeTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: string;
}

export const QuakeTerminalModal: React.FC<QuakeTerminalModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
}) => {
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: "init",
      command: "om --version",
      output: "om-desktop v1.0.0 (Windows & macOS Native). Type 'help' for commands.",
    },
  ]);
  const inputRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 50);
    }
  }, [isOpen]);

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
  help           Show this list of commands
  bio            About Om, role, and focus
  ls             List virtual system files and directories
  writings       List recent published articles
  projects       List selected engineering projects
  cat <slug>     Display contents or summary of an article
  open <slug>    Navigate to article in reader
  date           Current local time
  clear          Clear the terminal screen
  exit           Close the terminal`;
        break;

      case "bio":
        out = `${PROFILE.name} - ${PROFILE.title}
${PROFILE.bio}
Location: ${PROFILE.location}
Email: ${PROFILE.email}`;
        break;

      case "ls":
        out = `directories:
  writings/     (55 essays & articles)
  devnotes/     (18 engineering notes)
  quick-ships/  (17 shipping logs)
  projects/     (14 software builds)

files:
  profile.json
  newspaper.md
  principles.txt`;
        break;

      case "writings": {
        const items = contentService.getArticlesByCategory("writings").slice(0, 8);
        out = items.map((i) => `  * ${i.slug.padEnd(30)} ${i.title}`).join("\n");
        break;
      }

      case "projects": {
        out = `  * instant-qr-creator           Instant QR generation utility
  * keycheck                     Mechanical keyboard tester
  * typesnap                     Typescript AST snapshot engine
  * json-buddy                   High-throughput JSON formatter
  * shadow-studio                Generative shadow design tool`;
        break;
      }

      case "cat": {
        if (!arg) {
          out = "usage: cat <slug>";
        } else {
          const found = contentService.getArticleBySlug(arg);
          if (found) {
            out = `# ${found.title} (${found.date})
${found.excerpt}

${found.content.slice(0, 300)}...`;
          } else {
            out = `error: document '${arg}' not found`;
          }
        }
        break;
      }

      case "open": {
        if (!arg) {
          out = "usage: open <slug>";
        } else {
          const target = contentService.getArticleBySlug(arg);
          if (target) {
            onSelectArticle(target);
            onClose();
            return;
          } else {
            out = `error: cannot open '${arg}', not found`;
          }
        }
        break;
      }

      case "date":
        out = new Date().toLocaleString();
        break;

      case "clear":
        setLogs([]);
        setInputVal("");
        return;

      case "exit":
        onClose();
        setInputVal("");
        return;

      default:
        out = `command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setLogs((prev) => [
      ...prev,
      { id: String(Date.now()), command: raw, output: out },
    ]);
    setInputVal("");
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 40);
  };

  if (!isOpen) return null;

  return (
    <View style={styles.backdrop}>
      <Pressable style={styles.dismissOverlay} onPress={onClose} />
      <View style={styles.terminalContainer}>
        {/* Terminal Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Icon name="terminal" size={13} color={tokens.colors.accent} />
            <Text style={styles.title}>Quake Terminal Dropdown (Ctrl+`)</Text>
          </View>
          <Pressable onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>ESC to close</Text>
          </Pressable>
        </View>

        {/* Scrollable output area */}
        <ScrollView
          ref={scrollRef}
          style={styles.logArea}
          showsVerticalScrollIndicator={false}
        >
          {logs.map((log) => (
            <View key={log.id} style={styles.logItem}>
              <View style={styles.promptRow}>
                <Text style={styles.promptSymbol}>om@desktop:~$</Text>
                <Text style={styles.promptCommand}>{log.command}</Text>
              </View>
              <Text style={styles.output}>{log.output}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Input line */}
        <View style={styles.inputRow}>
          <Text style={styles.promptSymbol}>om@desktop:~$</Text>
          <TextInput
            ref={inputRef}
            value={inputVal}
            onChangeText={setInputVal}
            onSubmitEditing={handleCommand}
            placeholder="type a command (try 'help')..."
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
  backdrop: {
    position: "absolute",
    top: tokens.layout.titleBarHeight,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 90,
  },
  dismissOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  terminalContainer: {
    width: "100%",
    height: "55%",
    maxHeight: 460,
    backgroundColor: "#050505",
    borderBottomWidth: 2,
    borderBottomColor: tokens.colors.accent,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: tokens.colors.surfacePrimary,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.borderSubtle,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: 6,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: tokens.fonts.mono,
    fontSize: 11,
    color: tokens.colors.textSecondary,
    marginLeft: 8,
  },
  closeBtn: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    cursor: "pointer",
  } as any,
  closeText: {
    fontFamily: tokens.fonts.mono,
    fontSize: 10,
    color: tokens.colors.textMuted,
  },
  logArea: {
    flex: 1,
    padding: tokens.spacing.md,
  },
  logItem: {
    marginBottom: 12,
  },
  promptRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  promptSymbol: {
    fontFamily: tokens.fonts.mono,
    fontSize: 12,
    color: tokens.colors.accent,
    marginRight: 8,
  },
  promptCommand: {
    fontFamily: tokens.fonts.mono,
    fontSize: 12,
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
    backgroundColor: "#080808",
  },
  input: {
    flex: 1,
    fontFamily: tokens.fonts.mono,
    fontSize: 12.5,
    color: tokens.colors.textPrimary,
    outlineStyle: "none",
  } as any,
});
