import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { tokens } from "../../theme/tokens";
import { audioService } from "../../services/audioService";
import { Icon } from "../ui/Icon";
import type { AudioPlaybackState } from "../../types";

function formatSeconds(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export const AudioTransportBar: React.FC = () => {
  const [state, setState] = useState<AudioPlaybackState>(audioService.getState());

  useEffect(() => {
    return audioService.subscribe((s) => setState(s));
  }, []);

  if (!state.isActive) {
    return null;
  }

  const progressPercent =
    state.duration > 0 ? Math.min(100, (state.currentTime / state.duration) * 100) : 0;

  const cycleSpeed = () => {
    const nextSpeed =
      state.playbackRate === 1
        ? 1.25
        : state.playbackRate === 1.25
        ? 1.5
        : state.playbackRate === 1.5
        ? 2
        : 1;
    audioService.setPlaybackRate(nextSpeed);
  };

  return (
    <View style={styles.bar}>
      {/* Top micro progress track */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
      </View>

      <View style={styles.content}>
        {/* Left: Article info */}
        <View style={styles.leftInfo}>
          <View style={styles.iconCircle}>
            <Icon name="volume-2" size={14} color={tokens.colors.accent} />
          </View>
          <View style={styles.textColumn}>
            <Text style={styles.trackTitle} numberOfLines={1}>
              {state.title}
            </Text>
            <Text style={styles.trackAuthor}>Voice Narration • {state.author}</Text>
          </View>
        </View>

        {/* Center: Playback controls */}
        <View style={styles.centerControls}>
          <Text style={styles.timeText}>{formatSeconds(state.currentTime)}</Text>
          <Pressable
            style={styles.playButton}
            onPress={() => audioService.togglePlay()}
          >
            <Icon
              name={state.isPlaying ? "pause" : "play"}
              size={14}
              color="#000000"
            />
          </Pressable>
          <Text style={styles.timeText}>{formatSeconds(state.duration)}</Text>
        </View>

        {/* Right: Actions */}
        <View style={styles.rightActions}>
          <Pressable style={styles.speedButton} onPress={cycleSpeed}>
            <Text style={styles.speedText}>{state.playbackRate}x</Text>
          </Pressable>
          <Pressable
            style={styles.closeButton}
            onPress={() => audioService.dismiss()}
          >
            <Icon name="x" size={14} color={tokens.colors.textMuted} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    height: tokens.layout.transportBarHeight,
    backgroundColor: tokens.colors.surfaceElevated,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.borderDefault,
    position: "relative",
    zIndex: 40,
    justifyContent: "center",
  },
  progressContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: tokens.colors.surfaceSecondary,
  },
  progressBar: {
    height: "100%",
    backgroundColor: tokens.colors.accent,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: tokens.spacing.lg,
  },
  leftInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    maxWidth: 320,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: tokens.colors.accentMuted,
    borderWidth: 1,
    borderColor: tokens.colors.accentBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  textColumn: {
    marginLeft: 10,
    flex: 1,
  },
  trackTitle: {
    fontFamily: tokens.fonts.sans,
    fontSize: 13,
    fontWeight: "600",
    color: tokens.colors.textPrimary,
  },
  trackAuthor: {
    fontFamily: tokens.fonts.sans,
    fontSize: 11,
    color: tokens.colors.textMuted,
    marginTop: 1,
  },
  centerControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: tokens.colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
    cursor: "pointer",
  } as any,
  timeText: {
    fontFamily: tokens.fonts.mono,
    fontSize: 11,
    color: tokens.colors.textMuted,
    minWidth: 36,
    textAlign: "center",
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    maxWidth: 200,
  },
  speedButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: tokens.radii.xs,
    backgroundColor: tokens.colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    marginRight: 8,
    cursor: "pointer",
  } as any,
  speedText: {
    fontFamily: tokens.fonts.mono,
    fontSize: 11,
    color: tokens.colors.textSecondary,
    fontWeight: "600",
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  } as any,
});
