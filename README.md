# 🏠 Home Board

A personal home dashboard built with **Next.js**.

## 🧱 Tech Stack

- **Next.js 16 (App Router)**
- **TypeScript**
- **styled-components** (UI styling)
- **lucide-react** (icons)
- **SQLite** (via `better-sqlite3`)
- **Prettier + ESLint**

---

## 📦 Installation of dependencies

`npm install`

## 🗄 Database Setup (SQLite)

This project uses a **local SQLite database** stored in a single file: `/data/homeboard.db`

### 🚀 Initialize the Database

The DB is created automatically and seeded with example data.

#### Run `npm run db:init`

This will:
✅ Create the database file  
✅ Create all tables  
✅ Seed initial data (only if DB is empty)

### 🧬 Database Structure

Can be found in the `migrate.ts` file

## 🏃 Run the App

`npm run dev`

Then open: `http://localhost:3000`

## 🧠 Future Ideas

- Add todos
- Edit todos
- Delete todos
- Shopping list
- Dashboard (overview of all sections)
- Home control (connect Home Assistant for smart device control)
- Calendar view of events (sync with Google calendar)
- User management
