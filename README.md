---

# Abantu Pictures / Zibuyile Gumede Portfolio

### High-Performance Distributed Media Delivery System

This repository contains the source code for the Zibuyile Gumede cinematography portfolio, a **React-based Single Page Application (SPA)** optimized for millisecond-latency asset delivery in high-latency environments (specifically South Africa).

## 🏗 System Architecture & Design Principles

The project utilizes a **Decoupled Architecture** to separate UI logic from heavy media assets, leveraging edge computing to minimize the Critical Rendering Path.

### 1. Distributed Asset Pipeline

Instead of monolithic asset hosting, this system uses a **multi-node delivery strategy**:

* **Computation Node (Cloudinary):** Handles real-time **Deterministic URL Transformations**. It utilizes AI-driven compression (`q_auto`) and format selection (`f_auto`) to serve AVIF/WebP assets based on browser capabilities.
* **Edge Delivery (Vercel):** The frontend is deployed on a **Global Edge Network**, ensuring the static bundle is served from the nearest Point of Presence (PoP) in South Africa.
* **Streaming Node (YouTube API):** Externalized video delivery to reduce server-side bandwidth and utilize YouTube's global CDN.

### 2. Performance Optimization (The "Blur-Up" Technique)

To optimize **Largest Contentful Paint (LCP)**, the system implements a **Progressive Enhancement** strategy:

* **Low-Quality Image Placeholders (LQIP):** A 50px Gaussian-blurred fragment is served instantly (`e_blur:1000`).
* **Asynchronous Hydration:** The high-resolution asset is fetched concurrently. Once the `onLoad` event triggers, a CSS transition handles the alpha-channel swap between the placeholder and the source.

## 🛠 Tech Stack

* **Frontend:** React 18 with TypeScript for type-safe property drilling.
* **Styling:** Tailwind CSS for utility-first responsive design.
* **Icons:** Lucide-React for tree-shakeable SVG assets.
* **Infrastructure:** Vercel for CI/CD and hosting.

## 🧪 Technical Implementation Details

### Custom Masonry Grid

The grid utilizes CSS-only **Column-Count logic** to avoid the high execution cost of JavaScript-based masonry libraries, maintaining **Zero Runtime Overhead** for layout calculations.

```bash
# Key Utilities
- src/utils/cloudinary.ts: Dynamic transformation logic for millisecond asset delivery.
- src/components/VideoThumbnail: Handles the Blur-Up lifecycle and tech-spec metadata.

```

### Cinematic UI Polish

* **Anamorphic Scaling:** Layouts utilize a **2.39:1 aspect ratio** to maintain consistency with professional cinematography standards.
* **Custom Event Listeners:** A global `CustomCursor` tracks mouse coordinates to provide context-aware "Play" micro-interactions over video zones.

## 🚀 Deployment & Development

### Local Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Configure Cloudinary Environment Variables.
4. Run development server: `npm run dev`.

### Git Standards

The project maintains a strict separation between **Authentication (SSH)** and **Identity (Git Config)** to manage multiple developer profiles (e.g., `leparalamapra` vs `realthabanglukhetho`).

---

**Would you like me to add a "Telemetry" section to this README describing how you plan to integrate your BMW 335i custom telemetry data into the UAIE framework?**


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
