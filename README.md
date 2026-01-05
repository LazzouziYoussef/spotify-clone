# Spotify Clone (Work in Progress)

![Status: In Development](https://img.shields.io/badge/Status-In%20Development-yellow)
![React](https://img.shields.io/badge/Frontend-React_19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=nodedotjs)

A full-stack Spotify Clone application currently under active development. This project serves as a learning ground for modern web technologies including React 19, Express 5, and real-time data handling.

## 🚧 Current Status

The project is currently in the **Initial Setup / Skeleton** phase.

### ✅ Implemented
*   **Project Architecture:** Monorepo-style structure separating `frontend` and `backend`.
*   **Authentication Setup:** Initial integration with [Clerk](https://clerk.com/) for secure user management.
*   **Backend Routing:** Route handlers established for Users, Songs, Albums, and Admin functions.
*   **Database Connection:** MongoDB connection logic and Mongoose models (User, Song, Album, Message).
*   **Frontend Foundation:** Vite + React + TypeScript setup with Tailwind CSS 4 configuration.

### 📅 Planned Features
*   [ ] Full Music Playback & Streaming
*   [ ] Admin Dashboard for Content Management
*   [ ] Real-time Socket.io events (currently stubbed)
*   [ ] Song & Album Upload (Cloudinary integration)
*   [ ] User Playlists & Likes

## Project Structure

```
spotify-clone/
├── backend/                 # Express Server (API & Auth)
│   ├── src/
│   │   ├── controllers/     # Logic for Auth, Admin, etc.
│   │   ├── models/          # Mongoose Schemas
│   │   └── routes/          # API Endpoint Definitions
│   └── package.json
├── frontend/                # React Client (Vite)
│   ├── src/
│   │   ├── components/      # UI Components (e.g., Shadcn UI Button)
│   │   └── App.tsx          # Main App wrapper with Auth checks
│   └── package.json
└── README.md
```

## Getting Started (Dev)

### Prerequisites
*   Node.js (v18+)
*   MongoDB Instance
*   Clerk Account

### Installation

1.  **Backend**
    ```bash
    cd backend
    npm install
    # Create .env with MONGODB_URI, CLERK_KEYS, etc.
    npm run dev
    ```

2.  **Frontend**
    ```bash
    cd frontend
    npm install
    # Create .env with VITE_CLERK_PUBLISHABLE_KEY
    npm run dev
    ```

## License

ISC