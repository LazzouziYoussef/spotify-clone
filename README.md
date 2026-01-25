# Spotify Clone

![Status: Complete](https://img.shields.io/badge/Status-Complete-brightgreen)
![React](https://img.shields.io/badge/Frontend-React_19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=nodedotjs)

A full-stack Spotify Clone application built with the MERN stack (MongoDB, Express, React, Node.js). This project serves as a learning ground for modern web technologies including React 19, Express 5, and real-time data handling.

**Project Status:** This project is complete as of January 25, 2026. All core requirements have been met.

## ✅ Core Features

- **Full-Stack Architecture:** Monorepo structure with a React frontend and a Node.js/Express backend.
- **Secure Authentication:** User management via [Clerk](https://clerk.com/), including protected routes, OAuth 2.0 (Google), and JWT-based API authorization.
- **Real-time Communication:** 
    - **Live Chat:** Real-time messaging between users using Socket.io.
    - **Friends Activity:** A sidebar displaying users' online status and their current listening activity.
- **Complete Music Playback System:** 
    - Global playback state management with Zustand (`usePlayerStore`).
    - Features include play/pause, next/previous track, volume control, a seekable progress bar, and track autoplay.
    - Synchronized `AudioPlayer` component for robust HTML5 audio playback.
- **Content Management:**
    - **Admin Dashboard:** A dedicated UI for managing songs and albums, viewing platform statistics, and performing content uploads.
    - **Cloudinary Integration:** Robust media hosting for song audio and album artwork.
    - **Automated Metadata Extraction:** Automatically extracts metadata (title, artist, album, year, genre) and embedded cover art from audio files during upload.
- **Dynamic Frontend:**
    - **Responsive Layout:** A Spotify-like interface built with `react-resizable-panels`.
    - **Component-Based UI:** Built with Radix UI primitives and styled with Tailwind CSS.
    - **Data-Driven Pages:** Pages for viewing albums, discovering featured content, and interacting with the player.
    - **Smooth UX:** Includes loading skeletons for asynchronous data fetching states.
- **Robust Backend:**
    - **RESTful API:** Comprehensive API for handling songs, albums, users, chat, playlists, and admin functions.
    - **Database Seeding:** Scripts to populate the database with initial song and album data.
    - **Centralized Error Handling:** Production-ready error middleware for consistent API responses.

## API Endpoints

### Authentication

- `POST /api/auth/callback` - Handle Clerk OAuth callback and sync user to the database.

### Songs

- `GET /api/songs` - Get all songs
- `GET /api/songs/featured` - Get featured songs (6 random songs)
- `GET /api/songs/made-for-you` - Get personalized songs (4 random songs)
- `GET /api/songs/trending` - Get trending songs (4 random songs)
- `GET /api/songs/:id` - Get a song by its ID.

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
- `GET /api/users/messages/:userId` - Get chat messages between two users (Authenticated).

### Playlists

- `POST /api/users/playlist` - Create a new playlist
- `GET /api/users/playlists` - Get all playlists
- `GET /api/users/playlists/:PlaylistId` - Get playlist by ID

### Stats

- `GET /api/stats` - Get platform statistics including songs, users, albums, and unique artists count (Admin only)

## Frontend Architecture

### Authentication Flow

1. User clicks "Continue with Google" (`SignInOAuthButton`).
2. Clerk redirects to Google OAuth.
3. OAuth callback redirects to `/sso-callback`.
4. Final redirect to `/auth-callback` with Clerk token.
5. `AuthCallBackPage` syncs the user with the backend via a `POST` request to `/api/auth/callback`.
6. The `authProvider` component wraps the application and sets the authorization header for all axios requests using the token from Clerk.
7. API requests include `Authorization: Bearer <token>` header.

### Client-Side Routing

- `/` - `HomePage` wrapped in `MainLayout`.
- `/chat` - `ChatPage` for real-time messaging, wrapped in `MainLayout`.
- `/albums/:albumId` - `AlbumPage` wrapped in `MainLayout`.
- `/sso-callback` - Clerk OAuth redirect handler.
- `/auth-callback` - `AuthCallBackPage` for token extraction and user synchronization.
- `/admin` - Admin dashboard for content management.

### Key Components

- **MainLayout:** The core application wrapper providing the resizable 3-pane layout (Sidebar, Content, Friends).
- **FriendsActivity:** Displays a list of users/friends and their real-time listening status.
- **ChatPage Components:**
    - `UsersList`: Displays a list of users to chat with.
	- `ChatHeader`: Displays information about the selected user.
	- `MessageInput`: The input field for sending messages.
- **TopBar:** Navigation bar with admin link (currently hardcoded to not show), sign in/out buttons.
- **AudioPlayer:** Handles synchronized HTML5 audio playback and state updates.
- **SignInOAuthButton:** Google OAuth integration with Clerk.
- **authProvider:** A component that wraps the application and sets the authorization header for axios requests.
- **Axios Instance:** Pre-configured HTTP client with baseURL (`http://localhost:8080/api`).
- **UI System:** Built with Radix UI primitives and Tailwind CSS (`Button`, `Card`, `Resizable`, `ScrollArea`).

## Project Structure

```
spotify-clone/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── lib/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── seeds/
└── frontend/
    ├── public/
    │   ├── albums/
    │   ├── cover-images/
    │   └── songs/
    └── src/
        ├── components/
        ├── layout/
        ├── lib/
        ├── pages/
        ├── providers/
        ├── stores/
        └── types/
```

## Getting Started

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
    - `PORT` - Server port (default: 8080)
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

## Version History

### `v1.0.0` - Project Completion
- **Date:** January 25, 2026
- **Status:** Final project completion. All core requirements met.

## Acknowledgments

This project was inspired by the comprehensive tutorial: [Advanced Spotify Clone: Build & Deploy a MERN Stack Spotify Application with React.js](https://www.youtube.com/watch?v=4sbklcQ0EXc&t=4553s)

## License

ISC