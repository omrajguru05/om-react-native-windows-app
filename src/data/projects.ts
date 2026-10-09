export interface Project {
    slug: string;
    title: string;
    tagline: string;
    description: string;
    status: string;
    ctas: {
        label: string;
        href: string;
        variant?: "primary" | "outline";
    }[];
    info: {
        techStack: string[];
        role: string;
        timeline: string;
        category: string;
    };
    gallery?: string[];
    overview: {
        summary: string;
        problem: string;
        targetAudience: string;
    };
    features: {
        title: string;
        description: string;
    }[];
    technicalDetails: {
        architecture: string;
        technologies: {
            name: string;
            reason: string;
        }[];
        challenges: {
            title: string;
            description: string;
            solution: string;
        }[];
    };
    results: {
        metric: string;
        value: string;
    }[];
    design?: {
        colors: string[];
        typography: string;
        style: string;
    };
    techDeepDive?: {
        title: string;
        content: string;
    }[];
    nextSteps: string[];
    relatedProjects: string[]; // slugs
}

export const PROJECTS: Project[] = [
    {
        slug: "instant-qr-creator",
        title: "Instant QR Creator",
        tagline: "A PROFESSIONAL QR CODE TOOLKIT, BUILT FOR SPEED.",
        description: "A fully client-side QR code generator that handles everything from simple URLs to complex vCards and UPI payments. No sign-ups, no watermarks, no server uploads. Your data never leaves your browser.",
        status: "LIVE / FEB 2025",
        ctas: [
            { label: "TRY IT NOW", href: "https://qr.omrajguru.co.in", variant: "primary" },
            { label: "VIEW SOURCE", href: "#", variant: "outline" }
        ],
        info: {
            techStack: ["Vite 5", "React 18", "TypeScript", "Tailwind CSS 3", "Radix UI", "ShadCN", "qr-code-styling", "jsPDF", "JSZip", "Vercel"],
            role: "Solo Developer",
            timeline: "Feb 2025 - Present",
            category: "Developer Tools / Utility",
        },
        gallery: [
            "https://cdn.omrajguru.co.in/projects/qr/1.png",
            "https://cdn.omrajguru.co.in/projects/qr/2.png",
            "https://cdn.omrajguru.co.in/projects/qr/3.png"
        ],
        overview: {
            summary: "A privacy-first QR code toolkit that runs entirely in the browser. Supports 7 QR data types (URL, WiFi, vCard, UPI, Calendar, SMS, Email), full visual customization, batch processing, PDF export, and built-in scan testing. The entire data pipeline is browser-local. No backend processes your data.",
            problem: "Most QR code generators online are bloated with ads, force you to create accounts, slap watermarks on free downloads, or straight up upload your data to their servers. WiFi passwords, contact cards, payment links - that's sensitive information being sent to a random server just to generate a square image.\n\nI wanted something that works entirely in the browser. You type, it generates. You download, it's yours. No backend processing your data, no accounts, no limits.",
            targetAudience: "Small business owners generating QR codes for restaurant menus, payment links, or WiFi access. Developers who need batch processing for hundreds of codes. Designers who want full color and style control. Anyone who values privacy and doesn't want to upload their WiFi password to a random website.",
        },
        features: [
            {
                title: "7 QR Code Types",
                description: "Not just URLs. Generate QR codes for WiFi credentials (auto-connect on scan), vCards (full contact cards), UPI payment links, calendar events (iCal format), SMS messages, and email drafts. Each type has a dedicated form with proper field validation."
            },
            {
                title: "Full Visual Customization",
                description: "Foreground and background color pickers with hex input. Five dot styles (square, rounded, dots, classy, extra-rounded). Three corner square styles. Two corner dot styles. Four error correction levels (L/M/Q/H). Three size presets. Logo image embedding with automatic error correction adjustment."
            },
            {
                title: "Real-Time Preview with Readability Score",
                description: "The QR code re-renders instantly as you change any option. A badge shows a readability score (Good/Fair/Poor) calculated from error correction level, data density, and color contrast using luminance differencing."
            },
            {
                title: "Multi-Format Download",
                description: "Download as PNG, SVG, or JPEG with proper filenames. Optional watermark/label text rendered below the QR code using Canvas API before blob extraction."
            },
            {
                title: "PDF Export",
                description: "Export to print-ready PDF in A4 or business card (89×51mm) layout. QR code centered with label text below. Uses jsPDF for entirely client-side generation."
            },
            {
                title: "Batch Processing",
                description: "Paste multiple URLs/texts (one per line) or upload a CSV file. Generates all QR codes with current style settings and packages them into a ZIP file for download. All processing happens in the browser using JSZip."
            },
            {
                title: "Templates & History",
                description: "Save current style settings as named templates for reuse. Last 10 generated QR codes stored in localStorage with full option restoration. One-click to restore any previous QR code."
            },
            {
                title: "QR Scan Testing",
                description: "Built-in camera scanner using the BarcodeDetector API. Scan your generated QR code to verify it encodes the correct data. Shows match/mismatch status with the input data."
            },
            {
                title: "URL Shortening",
                description: "Toggle to shorten URLs before encoding. Uses a Vercel serverless function to proxy is.gd API (bypassing browser CORS restrictions). Shorter URLs produce less dense, more scannable QR codes."
            },
            {
                title: "Embed Code Generation",
                description: "Generate an HTML <img> tag using the QR Server API for embedding QR codes directly in websites. One-click copy to clipboard."
            }
        ],
        technicalDetails: {
            architecture: "Static SPA built with Vite + React, served from Vercel's Edge CDN. Entire data pipeline is browser-local: QR string building -> canvas rendering -> blob download. The only external call is URL shortening via a Vercel serverless function (/api/shorten) proxying is.gd.",
            technologies: [
                { name: "Framework", reason: "Vite 5 + React 18 - sub-second HMR, optimized static output. No SSR needed for a pure client-side tool." },
                { name: "Language", reason: "TypeScript - 7 distinct QR data types (WiFiData, VCardData, UPIData, etc.) need compile-time safety." },
                { name: "Styling", reason: "Tailwind CSS 3 - utility-first with HSL design tokens. JetBrains Mono gives the app a technical, tool-like aesthetic." },
                { name: "UI Components", reason: "Radix UI + ShadCN - accessible primitives, unstyled by default, full styling control." },
                { name: "QR Engine", reason: "qr-code-styling - full visual customization (dot shapes, corner styles, gradients, logo embedding) with canvas/SVG output." },
                { name: "Export", reason: "jsPDF for client-side PDF generation, JSZip + file-saver for batch ZIP creation and download." },
                { name: "Hosting", reason: "Vercel Edge CDN with immutable asset caching, vendor chunk splitting, and security headers." },
                { name: "Serverless", reason: "Vercel Functions with Fluid Compute for the URL shortening proxy." }
            ],
            challenges: [
                {
                    title: "Client-Side Data Pipeline",
                    description: "Building the entire QR generation, styling, and export pipeline without any server-side processing.",
                    solution: "Used qr-code-styling for canvas rendering, Canvas API for watermarks, FileReader for logo embedding, and blob extraction for downloads - all browser-native APIs."
                },
                {
                    title: "CORS for URL Shortening",
                    description: "is.gd doesn't send CORS headers for browser-direct requests, blocking client-side URL shortening.",
                    solution: "Created a Vercel serverless function (/api/shorten) as a proxy. Uses Fluid Compute for concurrent request handling on a single instance."
                },
                {
                    title: "Vendor Bundle Optimization",
                    description: "Large dependency tree (React, Radix UI, QR library, PDF/ZIP libs, Recharts) creating oversized bundles.",
                    solution: "Vite's manualChunks splits the bundle into 5 cacheable groups. Users who visit twice only re-download what actually changed."
                }
            ]
        },
        results: [
            { metric: "Load Time", value: "< 2s" },
            { metric: "Data Privacy", value: "100% Client-Side" },
            { metric: "QR Types", value: "7" },
            { metric: "Export Formats", value: "PNG, SVG, JPEG, PDF, ZIP" }
        ],
        design: {
            colors: ["HSL Design Tokens (Dark Theme)", "#000000 (Background)", "#ffffff (Foreground)"],
            typography: "JetBrains Mono (Monospace, Tool Aesthetic)",
            style: "Dark mode, technical/developer-focused, precision UI with monospace typography"
        },
        techDeepDive: [
            {
                title: "Why Vite + React (Not Next.js)",
                content: "This is a tool, not a content site. There's no SEO-critical dynamic content, no server-side rendering needed, no API routes for data fetching. Everything happens client-side: the QR code is generated in a canvas, styled with options, and downloaded as a blob.\n\nVite gives sub-second hot reload during development and produces optimized static bundles. The entire app ships as a single index.html with hashed JS/CSS chunks. Vercel serves it from a CDN edge. Cold load to interactive is under 2 seconds on average connections.\n\nNext.js would add SSR/RSC complexity for zero benefit here. A framework should match the problem. This problem is 'render a canvas in the browser fast.'"
            },
            {
                title: "Why qr-code-styling (Not qrcode.js)",
                content: "Most QR libraries give you a black-and-white grid and call it a day. qr-code-styling gives full control over dot shapes (rounded, classy, extra-rounded), corner square styles, corner dot styles, colors, gradients, and logo embedding with automatic error correction adjustment.\n\nThe library renders to a canvas element and exposes getRawData() for blob extraction. This means downloads are just file-saver's saveAs() with a proper filename - no server roundtrip, no blob URL UUID problems.\n\nFor the live preview, the library re-instantiates on every option change and appends to a ref-tracked div. React handles the reactivity; the library handles the rendering. Clean separation."
            },
            {
                title: "Why Client-Side Everything",
                content: "The entire data pipeline is browser-local:\n\n1. QR String Building - buildQRString() takes structured data (WiFi credentials, vCard fields, UPI params) and formats it into standard QR encoding strings.\n\n2. Canvas Rendering - QRCodeStyling generates the QR as a canvas/SVG element.\n\n3. Download - getRawData('png'|'svg') extracts the blob, saveAs() triggers the browser download.\n\n4. History & Templates - localStorage with JSON serialization. Last 10 QR codes stored.\n\n5. Logo Embedding - FileReader.readAsDataURL() converts the uploaded image to base64 in-memory.\n\n6. Watermark - Canvas API draws text below the QR image before blob extraction.\n\n7. PDF Export - jsPDF renders the QR canvas to a PDF document entirely in-memory.\n\nThe only external call is URL shortening, which goes through a Vercel serverless function (/api/shorten) that proxies to is.gd because is.gd doesn't send CORS headers for browser-direct requests."
            },
            {
                title: "Why Tailwind CSS",
                content: "Same reasoning as the portfolio site. Utility-first styling means I write components and style them in the same file. The dark theme uses CSS custom properties (--background, --foreground) defined in index.css, and Tailwind references them via bg-background, text-foreground, etc.\n\nThe monospace typography (JetBrains Mono) gives the entire app a technical, tool-like aesthetic that matches the audience - developers and power users who expect precision from their tools."
            },
            {
                title: "Why TypeScript",
                content: "The app has seven distinct QR data types, each with their own interface (WiFiData, VCardData, UPIData, EventData, SMSData, EmailData, plus plain text). TypeScript guarantees that buildQRString() receives the correct shape for each type. When I added UPI support, the compiler immediately flagged every form handler that needed updating.\n\nThe QROptions interface ensures the preview, customization panel, and download handler all agree on what options look like. Add a new option in one place, TypeScript shows you every component that needs to handle it."
            },
            {
                title: "Vercel Deployment Strategy",
                content: "The app is a static SPA served from Vercel's edge CDN with specific optimizations:\n\nSPA Rewrites - All routes fallback to index.html so client-side routing works on direct navigation and page refresh.\n\nImmutable Asset Caching - Hashed JS/CSS bundles in /assets/ get Cache-Control: public, max-age=31536000, immutable. Users cache vendor chunks forever; only the entry chunk changes on deploys.\n\nVendor Chunk Splitting - Vite's manualChunks splits the bundle into 5 cacheable groups: React core, Radix UI components, QR library, export libs (jsPDF + JSZip + file-saver), and Recharts.\n\nSecurity Headers - X-Content-Type-Options: nosniff, X-Frame-Options: DENY, X-XSS-Protection, strict referrer policy, and camera-only permissions policy.\n\nFluid Compute - The /api/shorten function uses Vercel Fluid Compute for concurrent request handling on a single instance."
            },
            {
                title: "SEO Strategy",
                content: "Even though this is a client-side SPA, SEO is handled through structured data and meta optimization:\n\nJSON-LD markup for WebApplication (with feature list, pricing, and aggregate rating), Organization, BreadcrumbList, and FAQPage (5 Q&As targeting common search queries).\n\n17 targeted keywords covering variations: 'QR code generator', 'free QR code', 'QR code maker', 'custom QR code', 'bulk QR codes', 'WiFi QR code', 'vCard QR code'.\n\nCanonical URL, XML sitemap, robots.txt, max-image-preview:large for rich search results."
            }
        ],
        nextSteps: [
            "Cloud-synced history and templates via Vercel Blob Storage",
            "Shareable QR code links (generate -> share URL -> anyone can download)",
            "AI-powered QR art (style transfer on QR patterns)",
            "Analytics dashboard (scan count tracking via redirect proxy)"
        ],
        relatedProjects: ["portfolio", "css-unit-converter"]
    },
    {
        slug: "ibbe",
        title: "IBBE",
        tagline: "THE UNFAIR ADVANTAGE.",
        description: "IBBE is the global launchpad where ambitious students bypass the waiting room of life to build companies, secure funding, and run the world before they even graduate.",
        status: "EST. 2025 / SYSTEM ONLINE",
        ctas: [
            { label: "JOIN THE NETWORK", href: "https://ibbe.in", variant: "primary" },
            { label: "EXPLORE LIBRARY", href: "#", variant: "outline" }
        ],
        info: {
            techStack: ["React", "Vite", "TypeScript", "Tailwind CSS", "Supabase", "TanStack Query", "AWS Amplify", "Resend"],
            role: "Lead Developer",
            timeline: "Est. 2025 (Pre-launch)",
            category: "EdTech / Student Entrepreneurship Platform",
        },
        gallery: [
            "https://cdn.omrajguru.co.in/projects/ibbe.in/Screenshot%202026-02-05%20081441-front.png",
            "https://cdn.omrajguru.co.in/projects/ibbe.in/Screenshot%202026-02-05%20081452-front.png",
            "https://cdn.omrajguru.co.in/projects/ibbe.in/Screenshot%202026-02-05%20081452-front.png",
            "https://cdn.omrajguru.co.in/projects/ibbe.in/Screenshot%202026-02-05%20081515-front.png",
            "https://cdn.omrajguru.co.in/projects/ibbe.in/Screenshot%202026-02-05%20081526-front.png"
        ],
        overview: {
            summary: "IBBE is an entrepreneurship ecosystem connecting students, schools, and companies. It treats education as 'doing' rather than simulating. Students build real products, earn certifications based on actual launches, and get connected to a network of founders and companies looking for proven talent.",
            problem: "Traditional education often traps students in the 'waiting room of life', delaying real-world impact until after graduation.",
            targetAudience: "Ambitious Students, Forward-thinking Schools, and Innovative Companies.",
        },
        features: [
            {
                title: "Field Manuals",
                description: "Downloadable guides (127, 98, 89 pages) on topics like 'Turning Homework into Empires'."
            },
            {
                title: "The Protocol",
                description: "4-step journey: Learn by Doing → Build Your Cartel → Launch Your Vision → Carry the Standard."
            },
            {
                title: "Multi-Stakeholder Platform",
                description: "Separate value props and dashboards for students, schools, and companies."
            },
            {
                title: "IBBE Certification",
                description: "Verifiable proof of building real things, based on actual product launches."
            },
            {
                title: "Waitlist System",
                description: "Robust email collection and management integrated with Resend."
            },
            {
                title: "Admin Dashboards",
                description: "Comprehensive management for meetings, writers, and leadership."
            },
            {
                title: "News/Journal",
                description: "EditorJS-powered content system for the internal journal."
            }
        ],
        technicalDetails: {
            architecture: "Client-side rendered React app with Supabase backend and AWS Amplify for hosting/storage.",
            technologies: [
                { name: "Frontend", reason: "React 18, TypeScript, Vite + SWC for performance." },
                { name: "Styling", reason: "Tailwind CSS, Shadcn/UI, Radix Primitives for brutalist-inspired design." },
                { name: "State", reason: "TanStack React Query for efficient data fetching." },
                { name: "Backend", reason: "Supabase (Auth, DB, Edge Functions)." },
                { name: "Storage", reason: "AWS S3 + CloudFront / Amplify." },
                { name: "Email", reason: "Resend for reliable transactional emails." },
                { name: "Analytics", reason: "PostHog for user behavior tracking." }
            ],
            challenges: [
                {
                    title: "Pre-launch Waitlist Scaling",
                    description: "Handling influx of student interest before full platform launch.",
                    solution: "Optimized waitlist system with Resend integration."
                }
            ]
        },
        results: [
            { metric: "Phase", value: "Pre-Launch" },
            { metric: "Status", value: "Waitlist Mode" },
            { metric: "Operations", value: "Admin Dashboards Live" }
        ],
        design: {
            colors: ["#f7f2e9 (Cream)", "#1a1a1a (Charcoal)", "#2962ff (Blue)", "#ffd60a (Yellow)", "#ff453a (Red)", "#28c76f (Green)"],
            typography: "Inter (Body), Uppercase Bold Headings",
            style: "Brutalist-inspired, thick borders, card-based, sticker elements, shadow offsets"
        },
        techDeepDive: [
            {
                title: "Component Architecture: React",
                content: "Because this platform has like five different personalities. You've got the public landing page, student dashboards, school admin views, company portals, writer management systems. Each one needed its own logic, its own state, its own data flows. React's component architecture let me build once and remix everywhere. The student signup flow? Same components powering the school onboarding, just different props and validation rules.\n\nThe reusability factor was huge. I built a card component with those thick borders and shadow offsets, used it everywhere. Field manual previews, dashboard widgets, news articles, all the same base structure. When I wanted to tweak the brutalist aesthetic, I changed one file and everything updated.\n\nReact's ecosystem matters too. I needed form validation, drag-drop interfaces for the admin dashboards, infinite scroll for the journal. All of that exists already. I spent time building ibbe-specific features instead of reinventing date pickers."
            },
            {
                title: "Development Workflow: Vite & SWC",
                content: "Vite because I value my sanity. Hot module replacement that actually works. I change a color in Tailwind, the page updates instantly without losing state. Working on the admin dashboard with live data, making tweaks, seeing results immediately. That feedback loop keeps you in flow state instead of context-switching every 30 seconds while `webpack` rebuilds.\n\nSWC for the TypeScript compilation because it's absurdly fast. The entire app rebuilds in milliseconds. When you're iterating on complex dashboard layouts with nested components, that speed difference compounds. I could try five different approaches to the meeting scheduler interface in the time it would take `Create React App` to reload once.\n\nThe dev server starts in under a second. Cold starts feel instant. That matters when you're jumping between projects or coming back after a break. Zero friction getting back into the code."
            },
            {
                title: "Data Integrity: TypeScript",
                content: "TypeScript caught so many bugs before they became production fires. The Supabase schema has like 15 tables. `Students`, `schools`, `companies`, `certifications`, `meetings`, `applications`, `journal entries`. Keeping track of which fields are optional, which IDs reference what, that gets messy fast.\n\nWhen I refactored the certification system to include skill tags and verification timestamps, TypeScript showed me every single place that needed updating. The student profile component, the admin approval flow, the API endpoints, the email templates. Without types, I would've shipped broken edge cases and found out through bug reports.\n\nThe autocomplete is addictive. I type `student.` and get every available property. I know what data I have access to without checking documentation or database schemas. Writing the company dashboard where they browse certified students, TypeScript told me exactly what filters and sorts were possible based on the actual data structure.\n\nInterface definitions became living documentation. A new developer (or me in three months) can look at the types and understand the entire data model. What's a `Protocol` step? What fields does a `Field Manual` have? It's right there in the code, always up to date because if it's wrong, nothing compiles."
            },
            {
                title: "Design System: Tailwind CSS",
                content: "Tailwind let me build the brutalist aesthetic without fighting CSS specificity wars. I wanted thick borders, hard shadows, cream backgrounds, aggressive spacing. With traditional CSS, I'd be writing classes like `.card-border-thick-charcoal-shadow-offset` and maintaining a sprawling stylesheet. Tailwind lets me write `border-4 border-charcoal shadow-[8px_8px_0px_0px_#1a1a1a]` right in the JSX and move on.\n\nThe utility-first approach matched how I think about design. I see a component, I know it needs padding, rounded corners, a background. I add the classes directly instead of naming another abstraction layer. When I wanted to adjust the shadow offset across all cards, I used the Tailwind config. One change, everywhere updates.\n\nResponsive design became trivial. The admin dashboards needed to work on laptops for school administrators but also on tablets for students checking certification status. Tailwind's breakpoint prefixes (`md:grid-cols-3` `lg:grid-cols-4`) made that obvious and maintainable. I built mobile-first, added complexity at larger breakpoints.\n\nThe JIT compiler meant I could use arbitrary values for the specific brand colors. That exact yellow (`#ffd60a`), that specific blue (`#2962ff`). No preprocessor setup, no custom CSS files, just `bg-[#ffd60a]` and it works. File size stayed tiny because it only includes classes actually used."
            },
            {
                title: "Interface Standards: shadcn/ui & Radix",
                content: "`shadcn/ui` gave me production-ready components that matched the brutalist vibe. `Dialogs`, `dropdowns`, `command palettes`, all accessible by default through Radix primitives underneath. I customized the hell out of them to fit ibbe's aesthetic but the foundation was solid.\n\nRadix handles all the gnarly accessibility concerns. Keyboard navigation, screen readers, focus management, ARIA attributes. The meeting scheduler has date pickers, time selectors, form validation. Making that accessible from scratch would take weeks. Radix gave me that for free, I just styled it with Tailwind to look aggressive instead of corporate.\n\nThe copy-paste philosophy meant I owned the code. These components live in my repo, not `node_modules`. When I needed the dialog to have that thick border and offset shadow, I just edited the component file. No fighting library styles, no CSS specificity hacks, total control.\n\nComposition patterns made complex UIs manageable. The student dashboard has tabs, each tab has cards, cards have dropdowns and modals. Radix's primitive approach let me nest these however I needed. The company browse interface has filtering dropdowns that trigger command palettes that open detail modals. All of it just works together."
            },
            {
                title: "State Synchronization: TanStack Query",
                content: "TanStack Query saved me from server state chaos. Every dashboard pulls data from Supabase. Student profiles, certification status, meeting schedules, journal entries, field manual downloads. Managing that with `useState` would've been a nightmare of loading flags, error states, and stale data.\n\nThe caching strategy meant students saw instant updates. They submit a certification application, the UI updates immediately while the mutation runs in the background. If it fails, it rolls back automatically. If it succeeds, related queries invalidate and refetch. I wrote the happy path, TanStack Query handled all the edge cases.\n\nPrefetching made the experience feel fast. When a company admin hovers over a student profile card, TanStack Query prefetches that student's full details. By the time they click, the data's already there. The modal opens instantly with complete information. Feels like magic, took three lines of code.\n\nThe devtools were clutch during development. I could see exactly what queries were active, what data they returned, when they refetched. Debugging why the meeting dashboard showed stale data after an update became trivial. I could see the cache, force refetches, inspect query states. Shipping features got faster because finding bugs got easier."
            },
            {
                title: "Backend Services: Supabase",
                content: "Supabase gave me auth, database, and APIs without duct-taping three services together. Students sign up with email, schools use magic links, companies get invited through admin-generated tokens. All of that lives in Supabase Auth with Row Level Security policies protecting each user type's data.\n\nThe PostgreSQL database meant I could use real relational structures. Certifications reference students and protocol steps. Applications link students to companies. Meetings connect multiple parties with status tracking. Junction tables, foreign keys, cascading deletes, all the things that make data integrity possible. Plus I could write raw SQL when the query builder got clumsy.\n\nEdge functions handled server-side logic. SendGrid email triggers, certification approval workflows, analytics events to PostHog. These run on Supabase's infrastructure, geographically close to users. The webhook that processes new waitlist signups and sends welcome emails runs in under 200ms globally.\n\nReal-time subscriptions made admin dashboards feel alive. When a student submits a certification request, the admin panel updates instantly. No polling, no refresh buttons, it just appears. School administrators see new enrollments the moment they happen. That immediacy changes how people interact with the platform.\n\nRow Level Security policies were the security model. Students can only read their own profile and public company listings. Schools see their enrolled students but nothing from other institutions. Companies view certified students but not internal school data. These rules live in the database, enforced at the PostgreSQL level. Even if my React code has bugs, the database refuses unauthorized access."
            },
            {
                title: "Asset Distribution: AWS S3 & CloudFront",
                content: "The field manuals are big PDFs. 127 pages, 98 pages, 89 pages. Hosting those in Supabase storage would work but gets expensive at scale. S3 is dirt cheap for storage, CloudFront makes downloads fast globally. A student in Singapore gets the same fast download as someone in New York.\n\nCloudFront's edge locations cache the PDFs close to users. First request might be slow, every subsequent download is instant. Students download these repeatedly, reference them while building. That caching matters. Plus I can set aggressive cache headers because the content rarely changes.\n\nS3's durability guarantee means those files won't just disappear. Educational content needs to stick around. Students bookmark these, reference them months later. S3's 99.999999999% durability gives me peace of mind that ibbe's core content library is solid.\n\nThe separation of concerns helped too. Supabase handles dynamic data (user profiles, certifications, real-time updates). S3 handles static assets (PDFs, images, eventually video content). Each service does what it's good at. I'm not trying to make a database serve files or a CDN manage user sessions."
            },
            {
                title: "Transactional Messaging: Resend",
                content: "Resend replaced SendGrid because the developer experience is just better. Sending certification approval emails, welcome sequences, meeting reminders. Resend's API is cleaner, their React email templates let me write emails in JSX with the same components as the web app. Design consistency across every touchpoint.\n\nThe email testing workflow actually works. I can preview emails in development, send test emails to myself, iterate quickly. With SendGrid I was debugging email templates by sending live emails and hoping. Resend shows me exactly what students will see before I ship.\n\nDeliverability has been rock solid. Certification emails land in inboxes, not spam folders. Welcome emails arrive within seconds. Resend handles SPF, DKIM, DMARC configuration. I pointed DNS records, verified the domain, everything just worked.\n\nThe analytics matter for a platform like this. I can see open rates on welcome emails, click-through on certification notifications. If students aren't opening meeting reminders, I know to tweak the subject lines. That feedback loop improves communication over time."
            },
            {
                title: "Deployment Infrastructure: AWS Amplify",
                content: "Amplify handles hosting and CI/CD without me thinking about it. I push to main, Amplify builds and deploys automatically. Environment variables stay secure, preview deployments work for feature branches. The whole deployment pipeline just exists.\n\nThe global CDN means the landing page loads fast everywhere. Students discovering ibbe from different continents get the same snappy experience. Amplify's edge network handles that distribution. I build once, it deploys everywhere.\n\nBranch previews changed how I work. Every pull request gets its own URL. I can share feature work with the team before merging. Stakeholders see actual working versions instead of screenshots. Feedback happens on real builds, not mockups.\n\nThe atomic deployments prevent broken states. Either the whole build succeeds and goes live, or it fails and the previous version stays up. No half-deployed apps, no missing assets, no broken states in production."
            },
            {
                title: "Product Analytics: PostHog",
                content: "PostHog tracks what matters for growth. Which field manuals get downloaded most? Where do students drop off in the signup flow? Do companies actually browse certified students or just sign up and ghost? These questions need data.\n\nThe session recordings are gold. I can watch actual users navigate the platform. Where they hesitate, what confuses them, which features they ignore. A school administrator spent three minutes looking for the student import feature. I moved it to the main nav. That insight came from watching one session recording.\n\nFeature flags let me test changes safely. Rolling out the new certification flow? Ship it to 10% of students first. If completion rates drop, rollback instantly. If they improve, gradually increase to 100%. No big bang deploys, controlled experimentation.\n\nThe self-hosted option means student data stays private. Educational platforms have privacy concerns. PostHog runs on my infrastructure, data doesn't leave to third-party analytics services. Compliance gets easier, trust increases."
            }
        ],
        nextSteps: [
            "Official Launch on April 17",
            "Expand Field Manual Library",
            "Onboard first cohort of schools"
        ],
        relatedProjects: ["jobs-ibbe", "portfolio"]
    },

    {
        slug: "portfolio",
        title: "Portfolio Website",
        tagline: "MY DIGITAL GARDEN & SHOWCASE.",
        description: "A personal portfolio website built with Next.js and MDX to showcase my projects and thoughts. It serves as a living document of my engineering journey.",
        status: "LIVE / V1.0",
        ctas: [
            { label: "VIEW SOURCE", href: "https://github.com/omrajguru", variant: "primary" },
            { label: "READ WRITINGS", href: "/writings", variant: "outline" }
        ],
        info: {
            techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "MDX", "Framer Motion"],
            role: "Solo Developer",
            timeline: "Jan 2024 - Present",
            category: "Personal Brand / Digital Garden",
        },
        gallery: [
            "https://cdn.omrajguru.co.in/projects/portfolio-website/1.png",
            "https://cdn.omrajguru.co.in/projects/portfolio-website/2.png",
            "https://cdn.omrajguru.co.in/projects/portfolio-website/3.png",
            "https://cdn.omrajguru.co.in/projects/portfolio-website/4.png",
            "https://cdn.omrajguru.co.in/projects/portfolio-website/5.png",
            "https://cdn.omrajguru.co.in/projects/portfolio-website/6.png"
        ],
        overview: {
            summary: "A personal portfolio built with Next.js and MDX to showcase my projects, thoughts, and engineering work. It features in-depth project breakdowns, technical blog posts, and a clean, content-first design.",
            problem: "Most developer portfolios are just grids of project cards with a GitHub link. They show what you built but skip everything interesting. The decisions you made, why you picked one approach over another, the stuff that went wrong and how you fixed it. I wanted a place where I could actually explain my work instead of just displaying it.\n\nI also needed something flexible. Long articles, code examples, screenshots, maybe embedded demos. A traditional CMS would lock me into their structure. I wanted full control over how things look and work.",
            targetAudience: "Recruiters trying to understand how I think. Other engineers who want to see real implementation details. Anyone who cares about the craft, the process, the reasoning behind the work.",
        },
        features: [
            {
                title: "MDX Content Engine",
                description: "Write content in Markdown, embed interactive React components directly in the flow."
            },
            {
                title: "Bento Grid Layout",
                description: "A modern, responsive grid system for showcasing key stats and links."
            },
            {
                title: "Code Highlighting",
                description: "Custom-built code block styling within project narratives."
            },
            {
                title: "Dynamic Project Data",
                description: "Centralized data source feeding the homepage, listing, and detail pages."
            },
            {
                title: "Dark Mode Default",
                description: "A developer-centric aesthetic with high contrast and focus."
            }
        ],
        technicalDetails: {
            architecture: "Static Site Generation (SSG) with Next.js App Router.",
            technologies: [
                { name: "Framework", reason: "Next.js 14 for Server Components and SSG." },
                { name: "Styling", reason: "Tailwind CSS v4 for zero-runtime styling." },
                { name: "Content", reason: "MDX for mixing content with code." },
                { name: "Type Safety", reason: "TypeScript for robust data modeling." }
            ],
            challenges: [
                {
                    title: "Image Optimization",
                    description: "Serving high-res gallery images without hurting LCP.",
                    solution: "Used Cloudflare R2 + Next.js Image optimization."
                }
            ]
        },
        results: [
            { metric: "Performance", value: "100" },
            { metric: "SEO", value: "100" },
            { metric: "Best Practices", value: "100" }
        ],
        design: {
            colors: ["#000000 (Black)", "#ffffff (White)", "#a1a1aa (Zinc-400)"],
            typography: "Inter (UI), JetBrains Mono (Code)",
            style: "Minimalist, Content-First, Monochrome, Bento-Grid"
        },
        techDeepDive: [
            {
                title: "Why Next.js App Router",
                content: "The App Router uses React Server Components by default. That means pages that are just text and images get sent as plain HTML with basically zero JavaScript. For a content site, that's huge. Everything loads fast because browsers have less work to do.\n\nThe project detail pages get built ahead of time using `generateStaticParams`. Next.js looks at my project data, generates every `/project/[slug]` page during the build, and serves them as static files from a CDN. Someone clicks a link, they get instant HTML. No server processing, no loading states, just the page.\n\nI also like that data fetching happens right in the component file. The project page fetches its own content from my config files directly. Everything lives together instead of being scattered across API routes and `useEffect` hooks."
            },
            {
                title: "Why MDX",
                content: "MDX lets me write in Markdown but use React components when I need them. Most of the time I'm just writing paragraphs and lists like normal. But if I want to show how a button works, I can import the actual component and drop it right in the text. People see the real thing instead of a screenshot.\n\nI set up a system that splits each MDX file into two parts. The frontmatter at the top (title, date, tags) becomes metadata I can query. The content body gets compiled separately. So I can do things like \"find all projects from 2024 that use TypeScript\" while still writing everything in regular Markdown files. It's like a database but the source files are just text I can edit in any editor.\n\nAll the MDX compilation happens during the build. When someone visits the site, the processing is already done. They get the final HTML immediately."
            },
            {
                title: "Why Tailwind CSS",
                content: "Tailwind keeps me moving. I write a component and style it right there in the same file. No jumping between JavaScript and CSS files, no thinking up class names, no wondering if changing one style will break something else.\n\nI defined all my colors and spacing values in the Tailwind config once. Things like `bg-background` and `text-foreground` instead of specific hex codes. When I wanted to switch to the monochrome look, I just updated those definitions. Every component using those tokens updated automatically. The brutalist borders and shadows are just utility classes like `border-2` and `shadow-lg`.\n\nIf I ever want to redesign, I change the config file and everything flows through. I'm styling with a system instead of fighting individual CSS rules."
            },
            {
                title: "Why TypeScript",
                content: "TypeScript catches mistakes before they become problems. I defined what a project object looks like: it needs a title, slug, tech stack, image gallery. If I add a new project and forget the description field, the build breaks immediately and tells me exactly what's missing.\n\nThis saved me when I reorganized how the tech deep dive sections work. I changed the data structure, and TypeScript showed me every single place in the UI that needed updating. Without it, I would've shipped broken pages and found out through 404 errors or weird layouts.\n\nIt also makes adding features easier. I know exactly what data I have access to at any point. The autocomplete shows me valid fields. I spend less time checking documentation and more time building."
            }
        ],
        nextSteps: ["Add Dark/Light mode toggle", "Integrate Spotify 'Now Playing'", "Add refined page transitions"],
        relatedProjects: ["ibbe", "css-unit-converter"]
    },
    {
        slug: "css-unit-converter",
        title: "CSS Unit Converter",
        tagline: "A PROFESSIONAL CSS UNIT CONVERTER, BUILT FOR SPEED.",
        description: "A lightning-fast, zero-noise CSS unit converter that runs entirely in the browser. Supports 7 distinct CSS units (px, rem, em, vw, vh, %, pt) with real-time translation across all of them based on customizable base font sizes and viewport dimensions.",
        status: "LIVE / FEB 2025",
        ctas: [
            { label: "TRY IT NOW", href: "https://css.omrajguru.co.in", variant: "primary" },
            { label: "VIEW SOURCE", href: "#", variant: "outline" }
        ],
        info: {
            techStack: ["Vite 5", "React 18", "TypeScript", "Tailwind CSS 3", "Radix UI", "Shadcn UI", "Lucide React", "Space Mono"],
            role: "Solo Developer",
            timeline: "Feb 2025 - Present",
            category: "Developer Tools / Utility",
        },
        gallery: [
            "https://cdn.omrajguru.co.in/projects/css/Screenshot%202026-03-05%20185858-front.png"
        ],
        overview: {
            summary: "A lightning-fast, zero-noise CSS unit converter that runs entirely in the browser. Supports 7 distinct CSS units (px, rem, em, vw, vh, %, pt) with real-time translation across all of them based on customizable base font sizes and viewport dimensions. Designed for precision, minimalism, and speed.",
            problem: "Most CSS unit converters online are bloated with ads, require multiple clicks to change between units, or don't allow you to set custom viewport contexts (like specific width and height). When you are deep into responsive design, you need to know exactly how your `px` values translate to `vw` or `rem` instantly.\n\nI wanted something that works at the speed of thought. You type a number, and you immediately see its equivalent in every other CSS unit. No ads, no page reloads, no cluttered UI.",
            targetAudience: "Frontend developers, UI/UX designers, and anyone working meticulously with responsive web design. If you frequently need to convert `px` to `rem` for accessibility or calculate `vw` for fluid typography, this tool serves as your instant reference.",
        },
        features: [
            {
                title: "Real-Time Omnidirectional Conversion",
                description: "Type any value into the input field and choose your source unit. The app instantly translates it into px, rem, em, vw, vh, %, and pt simultaneously across a responsive grid."
            },
            {
                title: "Contextually Aware",
                description: "Change the base font size or viewport dimensions in the settings panel. All conversions update live based on your custom context."
            },
            {
                title: "Keyboard-First Workflow",
                description: "Hit Cmd/Ctrl+K from anywhere in the app to instantly focus the input field and select its contents. No need to reach for the mouse."
            },
            {
                title: "Copy as CSS Variables",
                description: "Generate a perfectly formatted :root block containing all current unit conversions as CSS variables, ready to be copied to your clipboard with a single click."
            },
            {
                title: "URL State Synchronization",
                description: "Your current input value and source unit are automatically synced to the URL. Share a link like /?v=24&u=px with a colleague."
            },
            {
                title: "Zero Tracking, Zero Ads",
                description: "A pure, privacy-first tool. No analytics scripts, no tracking cookies, no ads. Built solely to solve a problem efficiently."
            }
        ],
        technicalDetails: {
            architecture: "Vite + React SPA with entirely client-side conversion logic and local state management.",
            technologies: [
                { name: "Framework", reason: "Vite 5 + React 18 - blazing fast HMR, optimized static output. No SSR needed for a pure client-side mathematical tool." },
                { name: "Language", reason: "TypeScript - strict typing for unit definitions, conversion context, and mathematical operations." },
                { name: "Styling", reason: "Tailwind CSS 3 - utility-first with custom CSS variables. Styled for a technical, precise aesthetic." },
                { name: "UI Components", reason: "Radix UI + Shadcn UI - accessible, composable primitives with full styling control and sonner for toast notifications." },
                { name: "Icons & Fonts", reason: "Lucide React for crisp iconography and Space Mono for a technical, developer-centric typography." }
            ],
            challenges: []
        },
        results: [
            { metric: "Units Supported", value: "7" },
            { metric: "Latency", value: "0ms (Client-side)" },
            { metric: "Privacy", value: "Zero Tracking" }
        ],
        design: {
            colors: ["Technical Dark Theme", "#000000 (Background)", "#ffffff (Foreground)"],
            typography: "Space Mono / JetBrains Mono (Monospace, technical typography)",
            style: "Minimalist, technical, tool-like, monochrome"
        },
        techDeepDive: [
            {
                title: "Why Vite + React",
                content: "This is a high-performance utility tool. There's no SEO-critical dynamic content that requires server-side rendering, and no backend data to fetch. Everything happens client-side: mathematical unit conversions based on a central context state.\n\nVite provides sub-second hot module replacement during development and produces highly optimized static bundles for production. The result is an application that loads almost instantaneously and computes conversions without any network latency."
            },
            {
                title: "Why Client-Side Everything",
                content: "The conversion engine is entirely local to the browser:\n\n1. Global State Context - A central state manages the base font size (default 16px) and viewport dimensions (1920x1080).\n\n2. Instant Translation - The conversion logic normalizes any input to `px` first, and then instantly fans it out to all 7 target units.\n\n3. URL State Synchronization - The input value and source unit are synced naturally to the URL search parameters (`?v=16&u=px`), allowing you to bookmark or share specific conversions with your team without any database.\n\n4. CSS Variable Export - A built-in clipboard utility maps the current results into a `:root` CSS variable block, ready to be copied to your stylesheet."
            },
            {
                title: "Why Tailwind CSS & Shadcn UI",
                content: "Utility-first styling allows for rapid UI assembly while keeping the codebase tight. The custom dark theme is driven by CSS variables combined with Tailwind's utility classes. Radix UI primitives provide accessible, unstyled components that guarantee perfect keyboard navigation and screen reader support out of the box.\n\nThe typography choice (monospace space-mono/JetBrains) gives the interface a deeply technical, tool-like aesthetic—exactly what power users expect from a developer tool."
            },
            {
                title: "Why TypeScript",
                content: "When converting between 7 different units (`CSSUnit` type), you need absolute certainty. The `ALL_UNITS` array and strict typing ensure that the conversion algorithms never miss a unit or mishandle a string. TypeScript guarantees that the context always contains the correct `baseFontSize`, `viewportWidth`, and `viewportHeight` as numbers, preventing silent NaN errors during mathematical operations."
            }
        ],
        nextSteps: ["Keyboard shortcut enhancements", "Additional unit support (ch, ex)", "Exporting to more formats (SCSS, Less)"],
        relatedProjects: ["instant-qr-creator", "portfolio"],
    },
    {
        slug: "shadow-studio",
        title: "Shadow Studio",
        tagline: "A PROFESSIONAL-GRADE MULTI-LAYER SHADOW ENGINE, BUILT FOR PRECISION.",
        description: "A precision-engineered box-shadow generator that treats shadows as high-fidelity design assets. Shadow Studio allows designers and developers to stack multiple shadow layers, fine-tune them with granular controls, and instantly export the results as CSS, Tailwind CDN tokens, or custom variables.",
        status: "LIVE / FEB 2025",
        ctas: [
            { label: "TRY IT NOW", href: "https://shadow.omrajguru.co.in", variant: "primary" },
            { label: "VIEW SOURCE", href: "https://github.com/omrajguru05/shadow-studio", variant: "outline" }
        ],
        info: {
            techStack: ["Vite", "React", "TypeScript", "Tailwind CSS", "Shadcn UI", "Radix UI", "Lucide React", "Vercel"],
            role: "Solo Developer",
            timeline: "Feb 2025 - Present",
            category: "Developer Tools / Utility",
        },
        gallery: [
            "https://cdn.omrajguru.co.in/projects/shadow/Screenshot%202026-03-06%20154153-front.png"
        ],
        overview: {
            summary: "A precision-engineered box-shadow generator that treats shadows as high-fidelity design assets. Shadow Studio allows designers and developers to stack multiple shadow layers, fine-tune them with granular controls, and instantly export the results as CSS, Tailwind CDN tokens, or custom variables. It bridges the gap between static design tools and production-ready code.",
            problem: "Most online shadow generators only support a single layer, leading to flat, unrealistic results. Professional UI design (like that of Apple or Stripe) relies on 'layered shadows'—multiple offsets and blurs stacked together to simulate depth and diffusion. Achieving this manually in CSS is tedious, involving constant context-switching between the browser inspector and the code editor.",
            targetAudience: "Product designers who want to export pixel-perfect elevation styles. Frontend developers who need to quickly generate and test complex shadows in both light and dark modes. UI enthusiasts who value the technical 'feel' of a tool that prioritizes utility and speed over-bloat.",
        },
        features: [
            {
                title: "Multi-Layer Compositing",
                description: "Stack an unlimited number of shadow layers. Each layer has independent controls for X/Y offset, blur radius, spread, and opacity."
            },
            {
                title: "Intelligent Presets",
                description: "One-click access to curated shadow styles—from 'Subtle' and 'Elevated' to 'Sharp' and 'Glow'—serving as a starting point for further customization."
            },
            {
                title: "Triple-Export System",
                description: "Instantly copy code in three formats: standard CSS box-shadow, Tailwind CSS configuration tokens, or CSS Custom Variables (--var)."
            },
            {
                title: "Dual-Mode Preview",
                description: "A dedicated toggle to test how shadows look on deep charcoal (#000) versus clean white (#FFF) backgrounds, ensuring contrast consistency."
            },
            {
                title: "URL State Sync",
                description: "Your entire design is encoded into the URL. Refresh the page or share the link with a teammate to restore the exact layer configuration."
            },
            {
                title: "Keyboard-First Workflow",
                description: "Use Cmd+K (or Ctrl+K) to instantly jump to the first slider, enabling a rapid feedback loop for power users."
            },
            {
                title: "Interactive CSS Output",
                description: "A syntax-highlighted code panel that updates in real-time as you tweak individual layers, with built-in copy-to-clipboard functionality."
            }
        ],
        technicalDetails: {
            architecture: "Vite + React SPA focusing on high-performance utility and zero-latency rendering. Uses URL search parameters for state persistence, making every design shareable without a backend.",
            technologies: [
                { name: "Vite + React", reason: "Sub-second HMR and lightweight client-side state management. Priority is zero-latency response to slider inputs." },
                { name: "TypeScript", reason: "Strong typing for the ShadowLayer interface ensures data integrity across components." },
                { name: "Tailwind CSS", reason: "Rapid UI iterations and consistent design tokens for dark/light mode." },
                { name: "Radix UI / Shadcn", reason: "Accessible, high-quality primitives for complex inputs like sliders and switches." },
                { name: "Lucide React", reason: "Clean, consistent vector icons for UI interactions." },
                { name: "Vercel", reason: "Automatic edge deployments and global CDN for lightning-fast loading." }
            ],
            challenges: [
                {
                    title: "Multi-Layer Engine",
                    description: "Scaling from single-layer output to a complex engine matching Figma's workflow.",
                    solution: "Built a core logic around an array of ShadowLayer objects, mapping over them to generate comma-separated box-shadow values."
                },
                {
                    title: "URL Persistence",
                    description: "Storing complex design states without a database.",
                    solution: "Encoded the entire state into an 's' parameter in the URL, updating via window.history.replaceState for every slider movement."
                }
            ]
        },
        results: [
            { metric: "Latency", value: "0ms" },
            { metric: "State", value: "URL-Persistent" },
            { metric: "Export Formats", value: "3" }
        ],
        design: {
            colors: ["#000000 (Black)", "#ffffff (White)", "JetBrains Mono (Monospace)"],
            typography: "JetBrains Mono (Technical aesthetic)",
            style: "Studio design language, high-contrast borders, dot-grid background, hardware-like interface"
        },
        techDeepDive: [
            {
                title: "Why Vite + React (Not Next.js)",
                content: "Shadow Studio is a high-performance utility tool, not a content-driven site. The priority is sub-second responsiveness to user input (sliders) and zero-latency rendering. Vite provides an optimized dev environment and a lean production build that loads almost instantly. Since there is no SEO-critical dynamic content that requires Server-Side Rendering (SSR), Next.js would have introduced unnecessary complexity (RSC, hydrated state lag) for a purely client-side canvas and UI-heavy experience."
            },
            {
                title: "Why Multi-Layer Engine (Not Single Layer)",
                content: "The core logic in shadow.ts is built around an array of ShadowLayer objects. Most generators output a single string; Shadow Studio maps over a layer collection to generate complex, comma-separated box-shadow values. This architecture allows for features like 'preset stacking' and independent toggling of individual layers, mimicking the layer-based workflow of Figma."
            },
            {
                title: "Why URL-Persistence (Search Params)",
                content: "Instead of a database, Shadow Studio uses the URL search parameters to store the entire state of the shadow design. Every slider movement updates the ?s= encoded string via window.history.replaceState. This makes every design 'shareable' by simply copying the URL. It ensures that the state is local-first, privacy-respecting, and requires zero backend infrastructure."
            }
        ],
        nextSteps: ["Preset Marketplace", "SVG Filter Export", "Layer Reordering UI"],
        relatedProjects: ["css-unit-converter", "portfolio", "json-buddy"]
    },
    {
        slug: "json-buddy",
        title: "JSON Buddy",
        tagline: "LIGHTWEIGHT, BLISTERINGLY FAST JSON MANIPULATION FOR DEVELOPERS.",
        description: "A high-performance, privacy-first JSON utility that prioritizes speed and developer experience. JSON Buddy is designed to be a permanent browser tab for developers who need to quickly format, minify, or validate JSON without the bloat of traditional online tools.",
        status: "LIVE / MAR 2026",
        ctas: [
            { label: "TRY IT NOW", href: "https://json.omrajguru.co.in", variant: "primary" },
            { label: "VIEW SOURCE", href: "https://github.com/omrajguru05/json-buddy", variant: "outline" }
        ],
        info: {
            techStack: ["Vite", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn UI", "Radix UI", "Lucide React", "Vercel"],
            role: "Solo Developer",
            timeline: "Mar 2026 - Present",
            category: "Developer Tools / Utility",
        },
        gallery: [
            "https://cdn.omrajguru.co.in/projects/json/Screenshot%202026-03-06%20160446-front.png"
        ],
        overview: {
            summary: "A high-performance, privacy-first JSON utility that prioritizes speed and developer experience. JSON Buddy is designed to be a permanent browser tab for developers who need to quickly format, minify, or validate JSON without the bloat of traditional online tools. It bridges the gap between raw data and readable, production-ready code.",
            problem: "Many online JSON formatters are cluttered with ads, track user data, or have sluggish interfaces that lag with large payloads. Developers often have to choose between a 'pretty' UI and a 'fast' tool. Achieving simple formatting often involves navigating slow, heavy websites.",
            targetAudience: "Frontend engineers debugging API responses. Backend developers validating configurations. Data scientists cleaning up JSON exports. Anyone who values privacy and needs a tool that responds as fast as they can type.",
        },
        features: [
            {
                title: "Pretty Print & Minify",
                description: "Instantly switch between readable 'Pretty' formatting with custom indentation and compact 'Minify' modes for production-ready strings."
            },
            {
                title: "Real-Time Validation",
                description: "Continuous syntax checking that provides instant feedback on errors, including precise line and column numbers for quick debugging."
            },
            {
                title: "Custom Indentation",
                description: "Toggle between 2-space and 4-space indentation to match your project's coding standards with a single click."
            },
            {
                title: "One-Click Export",
                description: "Rapidly copy formatted JSON to your clipboard or download it as a .json file for immediate use in your codebase."
            },
            {
                title: "Privacy-First Architecture",
                description: "Your JSON never leaves your browser. Zero network requests and zero tracking ensure your data remains completely private."
            },
            {
                title: "Keyboard-First Workflow",
                description: "Use Cmd+K (or Ctrl+K) to instantly jump to the input field, enabling a rapid feedback loop for power users."
            },
            {
                title: "Visual Feedback",
                description: "Subtle micro-animations and border pulses provide immediate confirmation of input processing and successful actions."
            }
        ],
        technicalDetails: {
            architecture: "Client-side focused React application optimization for high-performance parsing and zero-latency UI responses.",
            technologies: [
                { name: "Vite + React", reason: "Sub-second HMR and lightweight client-side state management. Priority is zero-latency response to user input." },
                { name: "TypeScript", reason: "Strong typing for JSON parsing and error handling ensures data integrity." },
                { name: "Tailwind CSS", reason: "Rapid UI iterations and consistent design tokens for a clean IDE feel." },
                { name: "Framer Motion", reason: "Smooth, high-performance micro-animations for interactive elements." },
                { name: "Radix UI / Shadcn", reason: "Accessible, high-quality primitives for tooltips, toasts, and layout." },
                { name: "Lucide React", reason: "Clean, consistent vector icons for UI interactions (Copy, Save, Clear)." },
                { name: "Vercel", reason: "Automatic edge deployments and global CDN for lightning-fast loading." }
            ],
            challenges: [
                {
                    title: "Privacy-First Processing",
                    description: "Ensuring sensitive data remains local while maintaining high performance.",
                    solution: "Performed all JSON parsing and formatting in the browser's main thread, eliminating server roundtrips and data exposure."
                }
            ]
        },
        results: [
            { metric: "Latency", value: "0ms" },
            { metric: "Privacy", value: "100% Client-Side" },
            { metric: "Export", value: "JSON / Clipboard" }
        ],
        design: {
            colors: ["#000000 (Black)", "#ffffff (White)", "JetBrains Mono (Monospace)"],
            typography: "JetBrains Mono (Technical aesthetic)",
            style: "IDE-inspired design, technical, clean, monochrome layout"
        },
        techDeepDive: [
            {
                title: "Why Vite + React (Not Next.js)",
                content: "JSON Buddy is a high-performance utility tool, not a content-driven site. The priority is sub-second responsiveness to user input and zero-latency rendering. Vite provides an optimized dev environment and a lean production build that loads almost instantly. Since there is no SEO-critical dynamic content that requires Server-Side Rendering (SSR), Next.js would have introduced unnecessary complexity (RSC, hydrated state lag) for a purely client-side experience."
            },
            {
                title: "Why Privacy-First Processing",
                content: "Security and speed. All JSON parsing and formatting happen in the browser's main thread. This ensures zero latency and total privacy—your data never hits a server. It ensures that sensitive data processed through the tool remains entirely local to the user's machine."
            },
            {
                title: "Why Framer Motion (Not CSS Transitions)",
                content: "The UI requires high-fidelity micro-animations, such as the border pulse on input, that feel premium and responsive. Framer Motion allows for declarative, complex animations that are easier to maintain and feel more fluid than standard CSS transitions, enhancing the overall user experience."
            }
        ],
        nextSteps: ["JSON Schema Validation", "Diff/Comparison View", "Auto-Fix Common Syntax Errors"],
        relatedProjects: ["shadow-studio", "instant-qr-creator", "portfolio"]
    }
];

export function getProject(slug: string) {
    return PROJECTS.find(p => p.slug === slug);
}
