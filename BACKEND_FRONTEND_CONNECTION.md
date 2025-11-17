# Backend-Frontend Connection Setup Guide

## Overview

This guide explains how the HackX backend and frontend are connected and configured to work together.

## Architecture

### Backend (Port 5000)

- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: Clerk (JWT verification)
- **File Storage**: Cloudinary
- **API Base**: `http://localhost:5000/api`

### Frontend (Port 5173)

- **Framework**: React + Vite
- **Authentication**: Clerk React SDK
- **API Client**: Axios
- **Dev Server**: `http://localhost:5173`

## Connection Flow

```
Frontend (React) → Clerk Auth → API Request with JWT → Backend Middleware → Protected Routes
```

## Setup Instructions

### 1. Backend Configuration

#### A. Environment Variables

Create `.env.development.local` in the Backend directory:

```env
# Server
PORT=5000

# MongoDB
MONGO_DB_URI=mongodb://localhost:27017/hackx
# OR MongoDB Atlas:
# MONGO_DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hackx

# Shivaay AI
SHIVAAY_API_KEY=your_shivaay_api_key_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@your_cloud_name

# Clerk (Backend)
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
```

#### B. Install Dependencies

```bash
cd Backend
npm install
```

#### C. Start Backend Server

```bash
npm run dev
```

Server will run on `http://localhost:5000`

### 2. Frontend Configuration

#### A. Environment Variables

The `.env` file in Frontend directory should have:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# Clerk (Frontend)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
```

#### B. Install Dependencies

```bash
cd Frontend
npm install
```

#### C. Start Frontend Dev Server

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Authentication Flow

### 1. User Signs In (Frontend)

```jsx
// Clerk handles sign-in via modal
<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>
```

### 2. Token Generation

- Clerk automatically generates a JWT token
- Token is available via `window.Clerk.session.getToken()`

### 3. API Request (Frontend)

```javascript
// api.js automatically adds token to requests
const clerkToken = await window.Clerk?.session?.getToken();
config.headers.Authorization = `Bearer ${clerkToken}`;
```

### 4. Token Verification (Backend)

```javascript
// clerk.middleware.js verifies token
const session = await clerkClient.verifyToken(token);
req.userId = session.sub; // Attach user ID to request
```

### 5. Protected Route Access

```javascript
// Routes use requireAuth middleware
router.post("/send", requireAuth, sendMessage);
```

## API Endpoints

All endpoints require authentication (Bearer token in Authorization header).

### Chat

- `POST /api/chat/send` - Send a chat message
- `POST /api/chat/start` - Start or get conversation

### Reports

- `POST /api/reports/upload` - Upload medical report (multipart/form-data)

### Appointments

- `POST /api/appointments/book` - Book appointment
- `GET /api/appointments/user/:userId` - Get user appointments
- `PUT /api/appointments/cancel/:appointmentId` - Cancel appointment

### Reminders

- `POST /api/reminders/create` - Create reminder
- `GET /api/reminders/user/:userId` - Get user reminders
- `DELETE /api/reminders/delete/:reminderId` - Delete reminder
- `PUT /api/reminders/complete/:reminderId` - Complete reminder

## CORS Configuration

Backend is configured to accept requests from:

- `http://localhost:5173` (Vite dev server)
- `http://127.0.0.1:5173`

With support for:

- Credentials (cookies, auth headers)
- Methods: GET, POST, PUT, DELETE, OPTIONS
- Headers: Content-Type, Authorization

## Testing the Connection

### 1. Start Both Servers

```bash
# Terminal 1 - Backend
cd Backend
npm run dev

# Terminal 2 - Frontend
cd Frontend
npm run dev
```

### 2. Test Authentication

1. Open `http://localhost:5173`
2. Click "Sign In"
3. Complete Clerk authentication
4. Navigate to Dashboard

### 3. Test API Calls

- Open browser DevTools → Network tab
- Interact with app features (chat, reports, appointments)
- Verify API calls to `http://localhost:5000/api/*`
- Check for `Authorization: Bearer <token>` in request headers

### 4. Verify Backend Logs

Backend console should show:

```
Server started on port 5000
MongoDB connected successfully
Incoming request: POST /api/chat/send
Token verified for user: user_xxxxxxxxxxxxx
```

## Common Issues & Solutions

### Issue: CORS Errors

**Symptom**: `Access-Control-Allow-Origin` error in browser console

**Solution**:

- Verify Backend CORS config includes Frontend URL
- Check Frontend is running on port 5173
- Restart both servers

### Issue: 401 Unauthorized

**Symptom**: API returns 401 error

**Solution**:

- Verify user is signed in with Clerk
- Check `CLERK_SECRET_KEY` in Backend `.env`
- Verify `VITE_CLERK_PUBLISHABLE_KEY` in Frontend `.env`
- Check token in Network tab → Request Headers

### Issue: MongoDB Connection Failed

**Symptom**: Backend fails to start with MongoDB error

**Solution**:

- Verify MongoDB is running: `mongod` or MongoDB Compass
- Check `MONGO_DB_URI` in Backend `.env`
- Test connection: `mongosh <connection-string>`

### Issue: Cloudinary Upload Fails

**Symptom**: Report upload returns error

**Solution**:

- Verify Cloudinary credentials in Backend `.env`
- Check file size (max 10MB)
- Verify file type (PDF, JPG, PNG, DOC, DOCX)

## File Structure

```
HackX/
├── Backend/
│   ├── index.js                 # Main server file
│   ├── .env.development.local   # Environment variables
│   ├── config/
│   │   ├── env.js              # Environment config
│   │   ├── db.js               # MongoDB connection
│   │   └── cloudinary.js       # Cloudinary setup
│   ├── middleware/
│   │   └── clerk.middleware.js # Clerk authentication
│   └── routes/
│       ├── chat.routes.js      # Chat endpoints
│       ├── reports.routes.js   # Report endpoints
│       ├── appointment.routes.js
│       └── reminder.routes.js
└── Frontend/
    ├── .env                     # Frontend environment
    ├── src/
    │   ├── main.jsx            # Entry point with ClerkProvider
    │   ├── App.jsx             # Routes with SignedIn/SignedOut
    │   └── services/
    │       └── api.js          # Axios instance with interceptors
    └── vite.config.js
```

## Next Steps

1. **Configure Environment Variables**: Fill in actual values in `.env` files
2. **Set up MongoDB**: Install and start MongoDB locally or use MongoDB Atlas
3. **Configure Clerk**:
   - Get publishable key for Frontend
   - Get secret key for Backend
4. **Set up Cloudinary**: Create account and get credentials
5. **Start Development**: Run both servers and test features

## Production Deployment

For production deployment:

1. Update `VITE_API_URL` to production backend URL
2. Update CORS config in Backend to include production frontend URL
3. Use production MongoDB instance (MongoDB Atlas)
4. Use production Clerk keys
5. Set `NODE_ENV=production`
6. Use proper security headers and HTTPS

## Support

For issues or questions:

1. Check browser console for Frontend errors
2. Check Backend terminal for server errors
3. Verify environment variables are set correctly
4. Test API endpoints with Postman/Thunder Client
