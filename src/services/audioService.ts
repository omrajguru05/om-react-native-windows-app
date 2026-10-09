import type { AudioPlaybackState } from "../types";

let state: AudioPlaybackState = {
  isActive: false,
  isPlaying: false,
  title: "",
  author: "Om",
  audioUrl: "",
  currentTime: 0,
  duration: 180,
  playbackRate: 1,
  articleSlug: null,
};

const listeners: Array<(s: AudioPlaybackState) => void> = [];

let audioElement: HTMLAudioElement | null = null;
let simulatedTimer: any = null;

function notify() {
  listeners.forEach((fn) => fn({ ...state }));
}

function initAudio() {
  if (typeof window !== "undefined" && typeof Audio !== "undefined" && !audioElement) {
    audioElement = new Audio();
    audioElement.addEventListener("timeupdate", () => {
      if (audioElement) {
        state.currentTime = audioElement.currentTime;
        if (audioElement.duration && !isNaN(audioElement.duration)) {
          state.duration = audioElement.duration;
        }
        notify();
      }
    });
    audioElement.addEventListener("ended", () => {
      state.isPlaying = false;
      state.currentTime = 0;
      notify();
    });
  }
}

export const audioService = {
  getState(): AudioPlaybackState {
    return { ...state };
  },

  subscribe(listener: (s: AudioPlaybackState) => void) {
    listeners.push(listener);
    listener({ ...state });
    return () => {
      const idx = listeners.indexOf(listener);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  },

  playTrack(params: {
    title: string;
    author?: string;
    audioUrl?: string | null;
    articleSlug: string;
  }) {
    initAudio();
    const url = params.audioUrl || "https://in1.omcdn.xyz/static/audio/sample-narration.mp3";

    state = {
      isActive: true,
      isPlaying: true,
      title: params.title,
      author: params.author || "Om",
      audioUrl: url,
      currentTime: 0,
      duration: 180,
      playbackRate: state.playbackRate,
      articleSlug: params.articleSlug,
    };

    if (audioElement) {
      audioElement.src = url;
      audioElement.playbackRate = state.playbackRate;
      audioElement.play().catch(() => {
        // Fallback to simulated playback progress if URL cannot be fetched
        startSimulatedPlayback();
      });
    } else {
      startSimulatedPlayback();
    }

    notify();
  },

  togglePlay() {
    if (!state.isActive) return;
    if (state.isPlaying) {
      this.pause();
    } else {
      this.resume();
    }
  },

  pause() {
    state.isPlaying = false;
    if (audioElement) {
      audioElement.pause();
    }
    if (simulatedTimer) {
      clearInterval(simulatedTimer);
      simulatedTimer = null;
    }
    notify();
  },

  resume() {
    state.isPlaying = true;
    if (audioElement && audioElement.src) {
      audioElement.play().catch(() => startSimulatedPlayback());
    } else {
      startSimulatedPlayback();
    }
    notify();
  },

  seek(seconds: number) {
    state.currentTime = Math.max(0, Math.min(seconds, state.duration));
    if (audioElement) {
      audioElement.currentTime = state.currentTime;
    }
    notify();
  },

  setPlaybackRate(rate: number) {
    state.playbackRate = rate;
    if (audioElement) {
      audioElement.playbackRate = rate;
    }
    notify();
  },

  dismiss() {
    this.pause();
    state.isActive = false;
    state.articleSlug = null;
    notify();
  },
};

function startSimulatedPlayback() {
  if (simulatedTimer) clearInterval(simulatedTimer);
  simulatedTimer = setInterval(() => {
    if (!state.isPlaying) {
      clearInterval(simulatedTimer);
      return;
    }
    state.currentTime += state.playbackRate;
    if (state.currentTime >= state.duration) {
      state.currentTime = 0;
      state.isPlaying = false;
      clearInterval(simulatedTimer);
    }
    notify();
  }, 1000);
}
