# HackX Connection Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                     http://localhost:5173                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        │              FRONTEND (React)           │
        │          ┌─────────────────────┐        │
        │          │   Clerk React SDK   │        │
        │          │  (Authentication)   │        │
        │          └─────────┬───────────┘        │
        │                    │                    │
        │          ┌─────────▼───────────┐        │
        │          │   api.js (Axios)    │        │
        │          │  + JWT Interceptor  │        │
        │          └─────────┬───────────┘        │
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
                             │ HTTP + Authorization: Bearer <JWT>
                             │
        ┌────────────────────▼────────────────────┐
        │              BACKEND (Express)          │
        │          http://localhost:5000          │
        │                                         │
        │    ┌─────────────────────────────┐     │
        │    │    CORS Middleware          │     │
        │    │  (Allow Frontend Origin)    │     │
        │    └────────────┬────────────────┘     │
        │                 │                       │
        │    ┌────────────▼────────────────┐     │
        │    │  Clerk Middleware           │     │
        │    │  (Verify JWT Token)         │     │
        │    │  → Extract userId           │     │
        │    └────────────┬────────────────┘     │
        │                 │                       │
        │    ┌────────────▼────────────────┐     │
        │    │    Protected Routes         │     │
        │    │  /api/chat/*                │     │
        │    │  /api/reports/*             │     │
        │    │  /api/appointments/*        │     │
        │    │  /api/reminders/*           │     │
        │    └────────────┬────────────────┘     │
        │                 │                       │
        └─────────────────┼───────────────────────┘
                          │
           ┌──────────────┼──────────────┐
           │              │              │
    ┌──────▼──────┐  ┌───▼────────┐  ┌─▼──────────┐
    │   MongoDB   │  │ Cloudinary │  │   Clerk    │
    │  (Database) │  │   (Files)  │  │  (Auth)    │
    └─────────────┘  └────────────┘  └────────────┘
```

## Request Flow Example

### 1. User Sends Chat Message

```
User Types Message
       │
       ▼
┌──────────────────┐
│  ChatBox.jsx     │
│  onClick         │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ ChatContext.jsx  │
│ sendMessage()    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   api.js         │
│ chatAPI.send()   │
└────────┬─────────┘
         │
         │ GET TOKEN: await window.Clerk.session.getToken()
         │
         ▼
┌──────────────────┐
│ Request Headers  │
│ Authorization:   │
│ Bearer eyJhbG... │
└────────┬─────────┘
         │
         │ HTTP POST to http://localhost:5000/api/chat/send
         │
         ▼
┌──────────────────┐
│ Backend CORS     │
│ ✓ Origin allowed │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Clerk Middleware │
│ verifyToken()    │
│ ✓ Valid          │
│ req.userId = ... │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ chatController   │
│ sendMessage()    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ MongoDB          │
│ Save message     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Response 200 OK  │
│ { message: {...} │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Frontend UI      │
│ Display message  │
└──────────────────┘
```

## Authentication Flow

### Initial Sign In

```
User → Click "Sign In" Button
         │
         ▼
     Clerk Modal Opens
         │
         ▼
     User Enters Credentials
         │
         ▼
     Clerk Validates
         │
         ▼
     JWT Token Generated
         │
         ▼
     Token Stored in Clerk Session
     (window.Clerk.session)
         │
         ▼
     User Redirected to Dashboard
         │
         ▼
     Protected Routes Accessible
```

### Subsequent API Calls

```
Frontend Needs Data
         │
         ▼
     api.js Request Interceptor
         │
         ▼
     Get Token: window.Clerk.session.getToken()
         │
         ▼
     Add to Headers: Authorization: Bearer <token>
         │
         ▼
     Send Request to Backend
         │
         ▼
     Backend Clerk Middleware
         │
         ▼
     Verify Token with Clerk
         │
         ├─→ Valid? Continue to Route
         │
         └─→ Invalid? Return 401 Unauthorized
```

## File Upload Flow (Medical Reports)

```
User Selects File
         │
         ▼
┌──────────────────┐
│ ReportViewer.jsx │
│ handleUpload()   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Create FormData  │
│ append('report') │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   api.js         │
│ reportAPI.upload │
└────────┬─────────┘
         │
         │ Content-Type: multipart/form-data
         │ Authorization: Bearer <token>
         │
         ▼
┌──────────────────┐
│ Backend CORS     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Clerk Middleware │
│ ✓ Verify Token   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Multer Middleware│
│ Parse File       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ reportController │
│ uploadReport()   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Cloudinary     │
│ Upload File      │
│ → Get URL        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   MongoDB        │
│ Save Report Data │
│ + Cloudinary URL │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Response 200 OK  │
│ { report: {...}  │
└──────────────────┘
```

## Environment Variables Flow

### Backend

```
.env.development.local
         │
         ▼
config/env.js (imports)
         │
         ├─→ PORT → index.js (server port)
         ├─→ MONGO_DB_URI → config/db.js (database)
         ├─→ CLERK_SECRET_KEY → middleware/clerk.middleware.js
         ├─→ CLOUDINARY_* → config/cloudinary.js
         └─→ SHIVAAY_API_KEY → controllers (AI)
```

### Frontend

```
.env
         │
         ▼
import.meta.env (Vite)
         │
         ├─→ VITE_API_URL → src/services/api.js (base URL)
         └─→ VITE_CLERK_PUBLISHABLE_KEY → src/main.jsx (ClerkProvider)
```

## Port Configuration

```
┌─────────────────────────────┐
│   Frontend (Vite)           │
│   http://localhost:5173     │
│                             │
│   Development Server        │
│   Hot Module Replacement    │
└──────────────┬──────────────┘
               │
               │ API Calls
               │
               ▼
┌─────────────────────────────┐
│   Backend (Express)         │
│   http://localhost:5000     │
│                             │
│   REST API Server           │
│   /api/* routes             │
└─────────────────────────────┘
```

## CORS Configuration

```
Backend CORS Whitelist:
├─ http://localhost:5173  (Vite dev server)
└─ http://127.0.0.1:5173  (Alternative localhost)

Allowed Methods:
├─ GET     (Fetch data)
├─ POST    (Create resources)
├─ PUT     (Update resources)
├─ DELETE  (Delete resources)
└─ OPTIONS (Preflight requests)

Allowed Headers:
├─ Content-Type   (JSON/FormData)
└─ Authorization  (Bearer tokens)

Credentials: true (Allow cookies & auth headers)
```

## Technology Stack Integration

```
┌───────────────── CLIENT SIDE ─────────────────┐
│                                               │
│  React 18                                     │
│    └─ Vite (Dev Server + Build Tool)         │
│        ├─ React Router (Navigation)           │
│        ├─ TailwindCSS (Styling)              │
│        ├─ Clerk React SDK (Auth UI)          │
│        └─ Axios (HTTP Client)                │
│                                               │
└───────────────────┬───────────────────────────┘
                    │
                    │ HTTP/HTTPS
                    │
┌───────────────────▼─────── SERVER SIDE ───────┐
│                                               │
│  Node.js + Express                            │
│    ├─ Clerk SDK Node (Token Verification)    │
│    ├─ Mongoose (MongoDB ODM)                 │
│    ├─ Multer (File Upload)                   │
│    ├─ Cloudinary (File Storage)              │
│    └─ OpenAI (AI Responses)                  │
│                                               │
└───────────────────┬───────────────────────────┘
                    │
      ┌─────────────┼─────────────┐
      │             │             │
┌─────▼─────┐  ┌────▼────┐  ┌────▼─────┐
│  MongoDB  │  │Cloudinary│  │  Clerk   │
│ Database  │  │  Files   │  │   Auth   │
└───────────┘  └──────────┘  └──────────┘
```

## Security Layer

```
Every API Request:

1. Browser → Frontend
   └─ User authenticated via Clerk

2. Frontend → Backend
   └─ JWT token in Authorization header

3. Backend CORS
   └─ Verify origin is whitelisted

4. Backend Clerk Middleware
   └─ Verify JWT signature with Clerk
   └─ Extract user ID from token

5. Backend Route Handler
   └─ Access req.userId for user-specific operations

6. Database/Services
   └─ Only authenticated user's data accessed
```

---

**Legend:**

- `→` : Data flow direction
- `├─` : Branch/Split
- `└─` : End of branch
- `▼` : Flow continuation
- `✓` : Validation passed
