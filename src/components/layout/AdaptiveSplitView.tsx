import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, ScaledSize } from "react-native";
import { tokens } from "../../theme/tokens";
import { SidebarRail } from "../chrome/SidebarRail";
import { ArticleListView } from "../../views/ArticleListView";
import { ArticleDetailView } from "../../views/ArticleDetailView";
import { HomeView } from "../../views/HomeView";
import { ProjectsView } from "../../views/ProjectsView";
import { DesignPrinciplesView } from "../../views/DesignPrinciplesView";
import { AboutView } from "../../views/AboutView";
import { CliView } from "../../views/CliView";
import { NewspaperView } from "../../views/NewspaperView";
import { contentService } from "../../services/contentService";
import type { NavSection, Article, ContentCategory } from "../../types";

interface AdaptiveSplitViewProps {
  currentSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  onOpenTerminal: () => void;
  onOpenSearch: () => void;
  activeArticle: Article | null;
  onSelectArticle: (article: Article) => void;
}

export const AdaptiveSplitView: React.FC<AdaptiveSplitViewProps> = ({
  currentSection,
  onSelectSection,
  onOpenTerminal,
  onOpenSearch,
  activeArticle,
  onSelectArticle,
}) => {
  const [windowDimensions, setWindowDimensions] = useState<ScaledSize>(
    Dimensions.get("window")
  );

  useEffect(() => {
    const sub = Dimensions.addEventListener("change", ({ window }) => {
      setWindowDimensions(window);
    });
    return () => sub?.remove?.();
  }, []);

  const isArticleSection =
    currentSection === "writings" ||
    currentSection === "devnotes" ||
    currentSection === "quick-ships" ||
    currentSection === "poetry";

  const getCategoryTitle = () => {
    switch (currentSection) {
      case "writings":
        return "Writings";
      case "devnotes":
        return "Dev Notes";
      case "quick-ships":
        return "Quick Ships";
      case "poetry":
        return "Poetry";
      default:
        return "Articles";
    }
  };

  const currentCategoryArticles = isArticleSection
    ? contentService.getArticlesByCategory(currentSection as ContentCategory)
    : [];

  const handleNextArticle = () => {
    if (!activeArticle || currentCategoryArticles.length === 0) return;
    const idx = currentCategoryArticles.findIndex((a) => a.slug === activeArticle.slug);
    if (idx !== -1 && idx < currentCategoryArticles.length - 1) {
      onSelectArticle(currentCategoryArticles[idx + 1]);
    }
  };

  const handlePrevArticle = () => {
    if (!activeArticle || currentCategoryArticles.length === 0) return;
    const idx = currentCategoryArticles.findIndex((a) => a.slug === activeArticle.slug);
    if (idx > 0) {
      onSelectArticle(currentCategoryArticles[idx - 1]);
    }
  };

  const renderDetailContent = () => {
    switch (currentSection) {
      case "home":
        return (
          <HomeView
            onSelectArticle={onSelectArticle}
            onNavigateSection={onSelectSection}
            onOpenSearch={onOpenSearch}
          />
        );
      case "projects":
        return <ProjectsView />;
      case "design":
        return <DesignPrinciplesView />;
      case "about":
        return <AboutView />;
      case "cli":
        return <CliView onSelectArticle={onSelectArticle} />;
      case "newspaper":
        return <NewspaperView onSelectArticle={onSelectArticle} />;
      case "writings":
      case "devnotes":
      case "quick-ships":
      case "poetry":
      default:
        if (activeArticle) {
          return (
            <ArticleDetailView
              article={activeArticle}
              onNextArticle={handleNextArticle}
              onPrevArticle={handlePrevArticle}
            />
          );
        }
        return (
          <HomeView
            onSelectArticle={onSelectArticle}
            onNavigateSection={onSelectSection}
            onOpenSearch={onOpenSearch}
          />
        );
    }
  };

  const isWide = windowDimensions.width > 900;

  return (
    <View style={styles.container}>
      {/* Pane 1: Left Navigation Rail */}
      <SidebarRail
        currentSection={currentSection}
        onSelectSection={(s) => {
          onSelectSection(s);
          if (s === "writings" || s === "devnotes" || s === "quick-ships" || s === "poetry") {
            const list = contentService.getArticlesByCategory(s as ContentCategory);
            if (list.length > 0 && (!activeArticle || activeArticle.category !== s)) {
              onSelectArticle(list[0]);
            }
          }
        }}
        onOpenTerminal={onOpenTerminal}
        onOpenSearch={onOpenSearch}
      />

      {/* Pane 2: Middle Items List (Only for collection sections) */}
      {isArticleSection && isWide && (
        <ArticleListView
          category={currentSection as ContentCategory}
          categoryTitle={getCategoryTitle()}
          articles={currentCategoryArticles}
          selectedArticle={activeArticle}
          onSelectArticle={onSelectArticle}
        />
      )}

      {/* Pane 3: Right Detail Canvas */}
      <View style={styles.detailPane}>{renderDetailContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: tokens.colors.background,
    overflow: "hidden",
  },
  detailPane: {
    flex: 1,
    height: "100%",
    backgroundColor: tokens.colors.background,
  },
});
