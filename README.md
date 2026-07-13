# UpToDate

A full-stack social media application built with **Next.js**, **Node.js**, **Express**, **MongoDB**, and **TypeScript**. Users can register, authenticate, create posts with images, react to content, and participate in threaded discussions through comments and replies.

---

## ✨ Features

### 🔐 Authentication

- JWT-based authentication
- Secure password hashing with bcrypt
- Login
- Signup
- Logout
- Protected routes
- Persistent user session

### 📝 Posts

- Create text posts
- Upload a single image per post (up to 16 MB)
- Public/Private post visibility
- Paginated feed
- Load More support

### 💬 Comments & Replies

- Nested comments
- Reply to comments
- Paginated comments
- Load More support

### 👍 Reactions

- Like / Unlike posts
- Like / Unlike comments
- Current user's reaction highlighted
- User-specific reaction tracking

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn/UI
- React Hook Form
- Zod
- TanStack Query
- Native Fetch API

## Backend

- Node.js
- Express
- MongoDB
- Mongoose
- TypeScript
- JWT Authentication
- Multer
- bcrypt
- Cookie Parser
- CORS

---

# 📁 Project Structure

```text
root
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── server.ts
│
└── frontend
    ├── app
    ├── components
    ├── hooks
    ├── services
    ├── schemas
    ├── lib
    └── types
```

---

# 🚀 Development Timeline

## Backend Foundation

- Express server setup
- MongoDB connection
- TypeScript configuration
- Middleware configuration
- Initial authentication routes

---

## User Authentication

- JWT Authentication
- Password hashing
- Signup
- Login
- Logout
- Authentication middleware
- Cookie-based authentication

---

## Social Content System

Implemented the complete backend data model for:

- Posts
- Comments
- Nested Replies
- Reactions

Including:

- Controllers
- Models
- Routes
- Database relationships

---

## Frontend Authentication

Built the authentication UI using:

- React Hook Form
- Zod validation
- Authentication hooks
- API services
- Protected routing

---

## Feed System

Implemented:

- Protected feed page
- Post creation form
- Feed UI
- Flattened login response
- User session handling

---

## Pagination

Pagination added across the application.

### Posts

- Page & limit support
- Backend pagination
- Frontend pagination hook
- Load More button

### Comments

- Independent pagination
- Load More support
- Pagination metadata

Backend now returns:

```json
{
  "page": 1,
  "limit": 20,
  "total": 135,
  "hasMore": true
}
```

---

## Comments & Replies

Implemented:

- Comment creation
- Nested replies
- Reply forms
- Reply listing
- Thread UI

---

## Reactions

Added:

- Like
- Unlike
- User-specific reactions
- Current user's reaction highlighting

The backend includes the reacting user's ID, allowing the frontend to determine whether the logged-in user has already reacted.

---

## Image Upload

Posts now support image uploads.

### Backend

- Multer middleware
- Memory storage
- 16 MB upload limit
- Image stored in MongoDB
- Controller support for `multipart/form-data`

### Frontend

- Image picker
- Image preview
- Multipart form submission
- Image rendering in the feed

---

## UI Improvements

Implemented:

- Feed cards
- Comment cards
- Reply cards
- Load More buttons
- Pagination metadata
- Protected pages
- Improved reaction UI

---

# 📡 API Overview

## Authentication

```http
POST /api/user/signup
POST /api/user/login
POST /api/user/logout
```

## Posts

```http
GET    /api/content
POST   /api/content
```

## Comments

```http
GET  /api/content/comment/:parentId
POST /api/content/comment/:parentId
```

## Replies

```http
GET /api/content/comment/:parentId/replies/:replyParentId
POST /api/content/comment/:parentId/replies/:replyParentId
```

## Reactions

```http
POST   /api/reaction/:parentId
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGODB_URI=your_database_url

JWT_SECRET=your_secret
```

Run the server:

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Run the development server:

```bash
npm run dev
```

---

# 🔄 Authentication Flow

```text
Signup
   │
   ▼
Login
   │
   ▼
JWT Cookie
   │
   ▼
Protected Routes
   │
   ▼
Feed
```

---

# 🎯 Future Improvements

- User profile pages
- Edit/Delete posts
- Edit/Delete comments
- Image optimization
- Multiple image uploads
- Search functionality
- Notifications
- Friend system
- Real-time updates (WebSockets)
- Infinite scrolling
- Cloud storage (Cloudinary/S3) instead of MongoDB image storage
- Unit & integration testing
- Docker support
- CI/CD pipeline

---

# ✅ Current Status

Completed:

- JWT Authentication
- User Management
- Protected Routes
- Post System
- Image Upload
- Comments
- Replies
- Reactions
- Pagination
- Load More
- Feed UI
- Form Validation
- Type-safe API Integration

---
