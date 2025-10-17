<div align="center">

# 3D Language Flashcards

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Framework](https://img.shields.io/badge/framework-Next.js%2015-purple)
![Language](https://img.shields.io/badge/language-TypeScript-blueviolet)
![Styles](https://img.shields.io/badge/UI-Tailwind%20CSS-38B2AC)
![3D](https://img.shields.io/badge/3D-Three.js%20%2B%20R3F-0A7EA4)
![Database](https://img.shields.io/badge/database-PostgreSQL-316192)
![Status](https://img.shields.io/badge/status-active-success)

</div>

## 🚀 Product Overview

**3D Language Flashcards** is a modern flashcard trainer that blends an immersive 3D flipping experience with a clean, productive workflow for creating, browsing, and practicing vocabulary across languages.

### 📋 Why use this app?

- **Engaging 3D cards** powered by React Three Fiber
- **Fast CRUD** for adding, updating, deleting cards
- **Keyboard and mouse friendly** navigation and interactions
- **Simple Postgres storage** with Prisma ORM
- **Responsive UI** that looks great on desktop and mobile

## ✨ Key Features

### 🎴 3D Card Experience
- Click to flip, drag to rotate, scroll to zoom
- Smooth transitions with versioned re-renders

### 📚 Flashcard Management
- Add single or multiple cards
- Edit in place (optional right‑click edit)
- List view with search/select and delete

### 🧭 Navigation
- Previous/Next controls, index progress bar, and keyboard arrows
- Jump to any card from the list

### ⚙️ Personalization
- Settings modal for interaction preferences (e.g., right‑click edit)

## 🏗️ Technical Architecture

- **App Router**: Next.js 15 (`src/app`)
- **API Routes**: REST endpoints under `src/app/api/cards` and `src/app/api/cards/[id]`
- **Data**: Prisma + PostgreSQL (`prisma/schema.prisma`) with seed data (`prisma/seed.ts`)
- **3D**: Three.js via `@react-three/fiber` and `@react-three/drei`
- **UI**: Tailwind CSS v4
- **State/Logic**: Custom hooks in `src/hooks`

### 💻 Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **3D**: three, @react-three/fiber, @react-three/drei
- **Backend**: Next.js API routes
- **Database/ORM**: PostgreSQL, Prisma Client

## 🎥 Demo

You can visit the demo [here](https://flipping-cards-lmww.vercel.app/)

## 🚀 Installation and Setup

### 📋 Requirements
- Node.js 18+ (recommended 20+)
- PostgreSQL 13+
- npm, pnpm, or yarn

### 🔧 1) Clone
```bash
git clone <your-repo-url>
cd flipping-cards
```

### 🔐 2) Environment
Create a `.env` file in the project root and set your Postgres connection string:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"
```

### 🗄️ 3) Install & DB Migrate
```bash
npm install
npx prisma migrate dev --name init
```

### 🌱 4) Seed Sample Data (optional)
```bash
npx prisma db seed
```

### 🏃 5) Run
```bash
npm run dev
# open http://localhost:3000
```

### 📦 Production
```bash
npm run build
npm start
```

## 🔌 API Overview

- `GET /api/cards` — list all flashcards
- `POST /api/cards` — create a flashcard
- `GET /api/cards/[id]` — get a single flashcard
- `PATCH /api/cards/[id]` — update a flashcard
- `DELETE /api/cards/[id]` — delete a flashcard

## 📈 Roadmap

- Bulk JSON add/import for cards
- Search in "View All" list
- Pagination in "View All" list
- Randomize/shuffle card order
- Option to show opposite side on next
- Optimize loading flows and data fetching
- Spaced‑repetition practice mode
- Import/Export (CSV/JSON)
- Tagging and categories with filters

## 🧩 Project Structure

```
src/
  app/
    api/
      cards/
        [id]/route.ts   # CRUD by id
        route.ts        # list/create
    page.tsx            # main UI and 3D viewer
  components/           # UI components and modals
  hooks/                # data and settings hooks
  three/                # materials and textures
prisma/
  schema.prisma         # Prisma models
  seed.ts               # seed script
```

## 🙌 Acknowledgements

- Next.js team and community
- React Three Fiber and Drei maintainers
- Prisma team

---

<div align="center">
  <img src="public/next.svg" alt="Next" width="80"/>
  <br>
  <i>Learn faster. Remember longer. In 3D.</i>
  <br>
</div>
