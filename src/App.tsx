import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { tokens } from "./theme/tokens";
import { DesktopTitleBar } from "./components/chrome/DesktopTitleBar";
import { AudioTransportBar } from "./components/chrome/AudioTransportBar";
import { AdaptiveSplitView } from "./components/layout/AdaptiveSplitView";
import { SpotlightSearchModal } from "./components/modals/SpotlightSearchModal";
import { QuakeTerminalModal } from "./components/modals/QuakeTerminalModal";
import { contentService } from "./services/contentService";
import { audioService } from "./services/audioService";
import {
  initKeyboardService,
  subscribeShortcuts,
} from "./services/keyboardService";
import type { NavSection, Article, ContentCategory } from "./types";

export const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<NavSection>("home");
  const [activeArticle, setActiveArticle] = useState<Article | null>(() => {
    const list = contentService.getRecentArticles(1);
    return list.length > 0 ? list[0] : null;
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isSynced, setIsSynced] = useState(false);

  // Initialize keyboard service & Sanity background sync
  useEffect(() => {
    initKeyboardService();

    const unsubscribeShortcuts = subscribeShortcuts((action) => {
      switch (action) {
        case "toggleSearch":
          setIsSearchOpen((prev) => !prev);
          break;
        case "toggleTerminal":
          setIsTerminalOpen((prev) => !prev);
          break;
        case "closeModal":
          setIsSearchOpen(false);
          setIsTerminalOpen(false);
          break;
        case "toggleAudio":
          audioService.togglePlay();
          break;
        case "nextArticle": {
          if (
            currentSection === "writings" ||
            currentSection === "devnotes" ||
            currentSection === "quick-ships" ||
            currentSection === "poetry"
          ) {
            const list = contentService.getArticlesByCategory(
              currentSection as ContentCategory
            );
            if (activeArticle) {
              const idx = list.findIndex((a) => a.slug === activeArticle.slug);
              if (idx !== -1 && idx < list.length - 1) {
                setActiveArticle(list[idx + 1]);
              }
            }
          }
          break;
        }
        case "prevArticle": {
          if (
            currentSection === "writings" ||
            currentSection === "devnotes" ||
            currentSection === "quick-ships" ||
            currentSection === "poetry"
          ) {
            const list = contentService.getArticlesByCategory(
              currentSection as ContentCategory
            );
            if (activeArticle) {
              const idx = list.findIndex((a) => a.slug === activeArticle.slug);
              if (idx > 0) {
                setActiveArticle(list[idx - 1]);
              }
            }
          }
          break;
        }
      }
    });

    // Background sync with Sanity
    contentService.syncWithSanity().then((success) => {
      if (success) {
        setIsSynced(true);
      }
    });

    return () => {
      unsubscribeShortcuts();
    };
  }, [currentSection, activeArticle]);

  const handleSelectArticle = (article: Article) => {
    setActiveArticle(article);
    setCurrentSection(article.category);
  };

  const getSectionTitle = () => {
    switch (currentSection) {
      case "home":
        return "Home";
      case "writings":
        return "Writings";
      case "devnotes":
        return "Dev Notes";
      case "quick-ships":
        return "Quick Ships";
      case "projects":
        return "Projects";
      case "design":
        return "Design";
      case "about":
        return "About";
      case "cli":
        return "Terminal";
      case "newspaper":
        return "Daily Paper";
      default:
        return "Journal";
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={tokens.colors.railBackground} />
      <View style={styles.windowFrame}>
        {/* Title Bar */}
        <DesktopTitleBar
          currentSectionTitle={getSectionTitle()}
          onOpenSearch={() => setIsSearchOpen(true)}
          isSyncedWithSanity={isSynced}
        />

        {/* Main 3-Pane View */}
        <View style={styles.mainCanvas}>
          <AdaptiveSplitView
            currentSection={currentSection}
            onSelectSection={setCurrentSection}
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            activeArticle={activeArticle}
            onSelectArticle={handleSelectArticle}
          />
        </View>

        {/* Global Bottom Audio Transport Bar */}
        <AudioTransportBar />

        {/* Spotlight Search Overlay */}
        <SpotlightSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectArticle={handleSelectArticle}
        />

        {/* Quake Terminal Dropdown */}
        <QuakeTerminalModal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          onSelectArticle={handleSelectArticle}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  windowFrame: {
    flex: 1,
    backgroundColor: tokens.colors.background,
    overflow: "hidden",
  },
  mainCanvas: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
});
