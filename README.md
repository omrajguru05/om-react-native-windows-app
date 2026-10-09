# Om — Desktop Companion

A native desktop application for Windows and macOS built with React Native (`react-native-windows` and `react-native-macos`), translating the digital archive, writings, software builds, and interactive systems of Om into a fast, tactile desktop tool.

---

## Highlights

- **3-Pane Master-Detail Architecture**: Compact navigation rail, filterable items column, and reader canvas. Automatically collapses on smaller windows.
- **Offline-First & Zero Latency**: All 93 articles, dev notes, shipping logs, and builds are bundled into local memory for instant startup without network spinners.
- **Background Sanity Synchronization**: Asynchronously checks Sanity CDN (`4lg3mv4v`) when connected to seamlessly merge newly published articles.
- **Native Markdown AST Renderer**: Pure React Native rendering for headings, lists, quotes, callouts, and syntax-highlighted code blocks with copy actions.
- **Persistent Global Audio Narration**: A docked bottom transport bar for voice audio narration, persisting as you navigate across articles, with seek scrub, play/pause, and 1x/1.25x/1.5x/2x speed controls.
- **Interactive Quake Terminal**: A pull-down terminal emulator (`Ctrl+\`` or `Cmd+\``) with a virtual filesystem supporting `ls`, `cat`, `writings`, `projects`, `bio`, and `clear`.
- **Spotlight Search**: Global fuzzy search (`Ctrl+K` or `Cmd+K`) to jump directly to any essay, note, or project.
- **Integrated Unified Title Bar**: Frameless dark title bar with window controls, breadcrumb path, and sync status indicator.
- **Design Language**: Pure black canvas (`#000000`), emerald accents (`#10b981`), structural borders, and Relative variable typography.

---

## Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl+K` / `Cmd+K` | Global Spotlight Search |
| `Ctrl+\`` / `Cmd+\`` | Toggle Quake Terminal Dropdown |
| `Space` | Toggle Audio Narration Play/Pause |
| `[` | Previous Article |
| `]` | Next Article |
| `Esc` | Close Active Modal or Terminal |

---

## Directory Structure

```
om-react-native-windows-app/
├── windows/                # Native Windows (WinUI / MSBuild) project
│   ├── om-desktop.sln
│   └── om-desktop/
├── macos/                  # Native macOS (AppKit / CocoaPods) project
│   ├── Podfile
│   └── om-desktop/
├── src/
│   ├── components/
│   │   ├── chrome/         # Desktop title bar, sidebar rail, audio player bar
│   │   ├── layout/         # Adaptive 3-pane split view
│   │   ├── markdown/       # Native AST markdown parser & syntax code blocks
│   │   ├── modals/         # Spotlight search & Quake terminal modals
│   │   └── ui/             # Buttons, avatars, badges, icons
│   ├── data/
│   │   ├── offlineBundle.ts# 93 pre-compiled offline articles
│   │   ├── projects.ts     # Software builds portfolio data
│   │   ├── profile.ts      # Bio, pursuits, and activity stats
│   │   └── newspaper.ts    # Morning dispatch edition data
│   ├── services/
│   │   ├── contentService.ts  # Offline + live sync manager
│   │   ├── sanityClient.ts    # Sanity CDN client
│   │   ├── audioService.ts    # Narration audio controller
│   │   └── keyboardService.ts # Global desktop shortcut listener
│   ├── theme/
│   │   └── tokens.ts       # om-design color, typography, and spacing tokens
│   ├── types/
│   │   └── index.ts        # Typed interfaces
│   ├── App.tsx             # Root desktop application
│   └── index.tsx           # Application entry point
├── public/fonts/           # Relative Sans, Rounded, and Mono variable fonts
├── package.json
└── tsconfig.json
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Fast Desktop Development Preview
Launch the instant desktop runner with hot module replacement:
```bash
npm run dev
```

### 3. Build & Verify
Run strict TypeScript typechecking and production bundle compilation:
```bash
npm run build
```

### 4. Running Native Windows Target
Prerequisites: Visual Studio 2022 with Desktop development with C++ and Windows 10/11 SDK.
```bash
npm run windows
```

### 5. Running Native macOS Target
Prerequisites: macOS with Xcode and CocoaPods.
```bash
cd macos && pod install && cd ..
npm run macos
```
