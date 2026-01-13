# Spotify Clone (Work in Progress)

![Status: In Development](https://img.shields.io/badge/Status-In%20Development-yellow)
![React](https://img.shields.io/badge/Frontend-React_19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=nodedotjs)

A full-stack Spotify Clone application built with the MERN stack (MongoDB, Express, React, Node.js). This project serves as a learning ground for modern web technologies including React 19, Express 5, and real-time data handling.

## 🚧 Current Status

The project is currently in the **Initial Setup / Skeleton** phase.

### ✅ Implemented

- **Project Architecture:** Monorepo-style structure separating `frontend` and `backend`.
- **Authentication Setup:** Integration with [Clerk](https://clerk.com/) for secure user management with protected routes.
- **Backend Routing:** Route handlers established for Users, Songs, Albums, Admin functions, and Stats.
- **Database Connection:** MongoDB connection logic and Mongoose models (User, Song, Album, Message).
- **Frontend Foundation:** Vite + React + TypeScript setup with Tailwind CSS 4 configuration.
- **File Upload System:** Integration with `express-fileupload` for handling audio and image uploads.
- **Cloudinary Integration:** Media hosting for song audio files and album artwork.
- **Admin Functionality:** Admin routes for creating and deleting songs and albums with proper authorization.
- **Error Handling:** Centralized error handling middleware for production-ready responses.

### 📅 Planned Features

- [ ] Full Music Playback & Streaming
- [ ] Admin Dashboard UI for Content Management
- [ ] Real-time Socket.io events (currently stubbed)
- [ ] User Playlists & Likes
- [ ] Search and Filtering

## API Endpoints

### Authentication

- `POST /api/auth/callback` - Handle Clerk OAuth callback

### Songs

- `GET /api/songs` - Get all songs (Admin only)
- `GET /api/songs/featured` - Get featured songs (6 random songs)
- `GET /api/songs/made-for-you` - Get personalized songs (4 random songs)
- `GET /api/songs/trending` - Get trending songs (4 random songs)

### Albums

- `GET /api/albums` - Get all albums
- `GET /api/albums/:AlbumId` - Get album by ID with songs

### Admin

- `POST /api/admin/songs` - Create new song (Admin only)
- `DELETE /api/admin/songs/:id` - Delete song (Admin only)
- `POST /api/admin/albums` - Create new album (Admin only)
- `DELETE /api/admin/albums/:id` - Delete album (Admin only)
- `GET /api/admin/check` - Check admin status

### Users

- `GET /api/users` - Get all users except current user (Authenticated)

### Stats

- `GET /api/stats` - Get platform statistics including songs, users, albums, and unique artists count (Admin only)

## Project Structure

```
spotify-clone/
├── backend/                 # MERN Backend - Express Server (API & Auth)
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

- Node.js (v18+)
- MongoDB Instance
- Clerk Account
- Cloudinary Account (for media hosting)

### Installation

1.  **Backend**

    ```bash
    cd backend
    npm install
    cp .env.sample .env
    # Edit .env with your credentials
    npm run dev
    ```

    **Backend Environment Variables:**
    - `PORT` - Server port (default: 5000)
    - `MONGODB_URI` - MongoDB connection string
    - `ADMIN_EMAIL` - Email address for admin access
    - `NODE_ENV` - Environment (development/production)
    - `CLOUDINARY_API_KEY` - Cloudinary API key
    - `CLOUDINARY_API_SECRET` - Cloudinary API secret
    - `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
    - `CLERK_PUBLISHABLE_KEY` - Clerk frontend key
    - `CLERK_SECRET_KEY` - Clerk backend secret key

2.  **Frontend**

    ```bash
    cd frontend
    npm install
    cp .env.sample .env
    # Edit .env with your Clerk key
    npm run dev
    ```

    **Frontend Environment Variables:**
    - `VITE_CLERK_PUBLISHABLE_KEY` - Clerk frontend publishable key

## License

ISC
