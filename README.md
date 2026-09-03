<div align="center">

# 🌐 BUSINESS.IN
### Hyperlocal AI Commercial Location Feasibility & Monte Carlo Decision Simulator

[![Live Demo](https://img.shields.io/badge/Live_App-business--in.onrender.com-00FF85?style=for-the-badge&logo=render&logoColor=black)](https://business-in.onrender.com)
[![Next.js](https://img.shields.io/badge/Next.js_16-Turbopack-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma_ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Evaluate demand, footfall density, competitor cannibalization, commercial rents, and investment payback horizons across Bengaluru's prime commercial corridors before deploying capital.**

[Explore Live Demo](https://business-in.onrender.com) • [Simulator Studio](https://business-in.onrender.com/dashboard) • [API & Documentation](#-api-architecture) • [Quickstart](#-quickstart)

---

</div>

## 📌 Executive Summary

Starting or expanding a brick-and-mortar business in Bengaluru is fraught with capital risk—skyrocketing commercial rents, rapid micro-market shifts, and aggressive competitor saturation.

**BUSINESS.IN** replaces intuition and guesswork with quantitative due diligence. Combining geospatial pedestrian telemetry, corridor benchmarks, and a high-performance **10,000-draw stochastic Monte Carlo simulation engine**, BUSINESS.IN models the real-world probabilistic viability of cafés, retail stores, restaurants, and salons across Bengaluru.

---

## ✨ Key Capabilities

### ⚡ 1. 10,000-Draw Stochastic Monte Carlo Engine
- Generates 10,000 algorithmic draws per simulation adjusting for footfall variance, ticket size volatility, seasonal demand drops, and landlord rent escalation.
- Calculates probabilistic 3-tier outcomes:
  - **Worst-Case (P10)**: Low-end revenue baseline with extended break-even projections.
  - **Expected-Case (P50)**: Median viability with steady-state operating margins.
  - **Best-Case (P90)**: Upper-bound revenue potential during peak market traction.
- Dynamically derives **Sensitivity Indices** (Footfall Resilience Buffer and Rent-to-Revenue Safety Thresholds).

### 🗺️ 2. Geospatial Map & Micro-Market Catchments
- Interactive geospatial canvas built with **Leaflet** and custom reactive map pins.
- Dynamic catchment buffers configurable from **0.5 km to 5.0 km**.
- Drag-and-drop location pinning with real-time reverse coordinate intelligence and corridor snapping.

### 📡 3. Live Catchment Radar & Micro-Demographics
- **Active Radar Telemetry**: Real-time pedestrian density index, transit connectivity scoring (Namma Metro proximity), and catchment income brackets.
- **Tech Workforce Concentration**: Ratio of IT/GCC corporate workers within the designated trade area.
- **Weekend Footfall Surge Factor**: Quantifies discretionary leisure shopping vs. weekday corporate traffic.

### 🏙️ 4. Native Bengaluru Corridor Intelligence
Built-in empirical baseline metrics for top commercial corridors:
- **Indiranagar 100ft Road** (High footfall, prime F&B cluster, premium rent per sq. ft.)
- **Koramangala 80ft Road** (Youth demographic, high dining frequency, startup density)
- **HSR Layout Sector 1** (Residential-commercial hybrid, neighborhood retail & café hub)
- **Whitefield ITPL Main Road** (Corporate tech corridor, high lunch hour demand)
- **JP Nagar 24th Main** (Dense South Bengaluru residential catchment)
- **MG Road / Brigade Road** (Central Business District, tourist & retail traffic)

### 💳 5. Production Billing & UPI Payments
- Built-in **Google Pay & Navi UPI QR Code Switcher** with real-time WebP asset optimization.
- **1-Click Mobile Intent Deep-Linking**: Opens UPI apps (GPay, PhonePe, Paytm, Cred, BHIM) seamlessly on mobile devices.
- **Anti-Fraud UTR Validation Engine**:
  - Enforces strict 12-digit numeric Indian UPI UTR syntax (`/^\d{12}$/`).
  - Blocks sequential and dummy test numbers (`000000000000`, `123456789012`, `112233445566`).
  - Database-backed duplicate UTR rejection.
  - Real-time **"Pending Admin Verification"** reconciliation queue.

### 📊 6. Investor Due Diligence Reports
- **CSV Data Export**: Complete simulation assumptions, revenue distributions, and financial metrics.
- **Printable Investor PDF**: Formatted executive summary dossiers suitable for landlords, partners, and angel investors.

### 🔍 7. Enterprise SEO & AI Search Engine Discovery
- **Rich Schema.org (JSON-LD)**: `WebSite` with Sitelinks SearchBox, `SoftwareApplication` (BusinessApplication), and `Organization` metadata.
- **Progressive Web App**: Full `manifest.webmanifest` and mobile application indexing.
- **AI Context File**: Public `/llms.txt` endpoint optimized for search indexing by ChatGPT, Perplexity, Claude, and Gemini.

---

## 🛠️ Architecture & Tech Stack

```mermaid
graph TD
    A[Client Browser / Mobile] -->|HTTPS| B[Next.js 16 App Router]
    B --> C[Tailwind CSS & Framer Motion UI]
    B --> D[Leaflet 3D Geospatial Engine]
    B --> E[10k Monte Carlo Worker]
    B -->|API Routes| F[Next.js Server Handlers]
    F -->|ORM| G[Prisma ORM]
    G -->|SQL Queries| H[(PostgreSQL Database)]
    F -->|UPI Proof Processing| I[Admin Verification Queue]
```

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16 (Turbopack)](https://nextjs.org/) with App Router |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) with Custom Design Tokens |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Mapping** | [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/) |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) via [Prisma ORM](https://www.prisma.io/) |
| **Auth & Sessions**| Encrypted HTTP-only cookies with cryptographic tokens |
| **Hosting** | [Render](https://render.com/) Containerized Cloud Platform |

---

## 📂 Repository Structure

```text
business-in/
├── web/
│   ├── app/                      # Next.js App Router (Pages, Layouts, API routes)
│   │   ├── api/
│   │   │   ├── auth/             # Login, register, logout, me, verification
│   │   │   ├── billing/          # Orders, proof upload, UPI status check
│   │   │   ├── projects/         # Project workspaces & Monte Carlo runs
│   │   │   └── admin/            # Audit logs, role gating, payment approvals
│   │   ├── dashboard/            # Fullscreen Simulator Studio & parameters
│   │   ├── analysis/             # Feasibility screening & corridor compare
│   │   ├── billing/              # Pro tier QR payment & UTR verification
│   │   ├── llms.txt/             # AI discovery route for LLM web searchers
│   │   ├── manifest.ts           # Dynamic PWA Web App Manifest
│   │   ├── robots.ts             # Search engine crawler policies
│   │   ├── sitemap.ts            # Dynamic multi-route XML sitemap
│   │   ├── globals.css           # Design tokens, WCAG AAA colors & glassmorphism
│   │   └── layout.tsx            # Global metadata, Schema.org JSON-LD, SEO
│   ├── components/
│   │   ├── billing/              # UpgradeModal & UPI verification dialogs
│   │   ├── landing/              # Hero, Features, Stats, HowItWorks, CTA
│   │   ├── layout/               # Navbar, Footer, CookiePreferencesModal
│   │   ├── simulator/            # LiveIntelligenceRadar, TrajectoryForecast
│   │   ├── MapView.tsx           # Leaflet reactive canvas with custom SVG pin
│   │   └── SimulatorClient.tsx   # Core simulation interface & Monte Carlo runner
│   ├── prisma/
│   │   └── schema.prisma         # Database schema (Users, Projects, Payments, Proofs)
│   ├── public/                   # Optimized WebP assets, logos, and QR codes
│   └── package.json
└── README.md
```

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm** or **pnpm**
- **PostgreSQL**: Local instance or hosted connection string (e.g. Supabase, Neon, Render)

### 1. Clone the Repository
```bash
git clone https://github.com/Prachethsingh/business.in.git
cd business.in/web
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the `web/` directory:
```env
# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# PostgreSQL Database Connection
DATABASE_URL="postgresql://username:password@localhost:5432/business_in?schema=public"

# Session & Security
SESSION_SECRET="generate-a-strong-random-32-character-secret-here"

# Environment
NODE_ENV="development"
```

### 4. Initialize Database
```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Local Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔌 Core API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user account | No |
| `POST` | `/api/auth/login` | Authenticate and obtain session cookie | No |
| `GET` | `/api/auth/me` | Fetch active user profile and Pro tier status | Yes |
| `POST` | `/api/projects` | Create a new location scenario project | Yes |
| `POST` | `/api/projects/:id/simulations` | Execute 10,000-draw Monte Carlo run | Yes |
| `GET` | `/api/billing/status` | Real-time check of UPI payment & Pro status | Yes |
| `POST` | `/api/billing/orders/:id/proof` | Submit 12-digit Indian UPI UTR proof | Yes |
| `GET` | `/api/admin/dashboard` | Platform metrics & reconciliation queue | Admin |

---

## 🔒 Security & Best Practices

- **Zero Client-Side Trust**: Financial calculations and database transactions run exclusively on the server runtime.
- **Strict Input Validation**: All numeric, geographic, and UTR parameters pass strict Zod/Regex sanity checks.
- **High-Contrast Accessibility (WCAG AAA)**: Fully compliant contrast ratios for clear readability under all lighting conditions.
- **Secure Authentication**: HttpOnly, SameSite, and Secure session tokens prevent cross-site scripting (XSS) and token hijacking.

---

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

**Built with precision for Bengaluru's next generation of entrepreneurs & retail leaders.**

[Visit BUSINESS.IN](https://business-in.onrender.com) • [Report Issue](https://github.com/Prachethsingh/business.in/issues)

</div>
