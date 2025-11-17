# HealX.ai - AI-Powered Healthcare Assistant 🏥

A modern, full-stack healthcare management platform featuring AI-powered chat, intelligent medical report analysis, appointment booking, and smart medication reminders. Built with React, Node.js, and MongoDB.

## ✨ Key Highlights

- 🤖 **AI-Powered Chatbot** with natural language understanding
- 📄 **Smart Report Management** with AI analysis and explanations
- 📅 **Voice-Based Appointments** using NLP for natural scheduling
- 🔔 **Custom Toast Notifications** for seamless user feedback
- 📥 **Programmatic Downloads** with progress tracking
- 🔐 **Enterprise-Grade Security** with Clerk authentication
- 🌙 **Dark Mode** optimized UI/UX
- 🎤 **Voice Input Support** for hands-free interaction

## 🚀 Features

### ✅ Core Functionality

#### 1. **🤖 AI Healthcare Chatbot**

- Context-aware medical conversations
- Persistent chat history per user
- Real-time AI responses powered by Shivaay API
- Voice input with Web Speech API
- Conversation management (create, delete, switch)
- Markdown-formatted responses
- Mobile-responsive chat interface

#### 2. **📄 Medical Report Management**

- Multi-format support (PDF, JPG, PNG, JPEG)
- Cloud storage with Cloudinary (raw resource type)
- AI-powered report analysis and explanations
- **Backend proxy downloads** with proper Content-Disposition headers
- **Programmatic file downloads** using Blob API
- Secure file handling (10MB max per file)
- Report viewing with AI-generated summaries
- Text-to-speech for report summaries
- Delete reports with confirmation

#### 3. **📅 Smart Appointment Booking**

- Natural language appointment requests
- Voice-based booking with NLP parsing
- Intelligent date/time extraction
- Department and doctor selection
- Appointment history tracking
- Cancel appointments with feedback
- Status management (pending, confirmed, cancelled)
- Appointment reminders integration

#### 4. **⏰ Medication Reminders**

- Create custom medication reminders
- Track medication schedules
- Mark reminders as completed
- View pending reminders list
- Reminder notifications
- Dosage and frequency tracking

#### 5. **🔔 Custom Toast Notification System**

- **In-app notifications** (no browser alerts)
- 4 notification types: Success, Error, Warning, Info
- Animated slide-up entrance
- Auto-dismiss with configurable duration
- Manual close option
- Dark mode compatible
- Toast stacking support
- Progress feedback for async operations

#### 6. **🔐 Secure Authentication**

- Clerk authentication integration
- JWT token verification middleware
- Protected API routes
- User session management
- Automatic token refresh
- Sign-in/Sign-out flows

#### 7. **🌙 Dark Mode**

- System-wide dark theme
- Consistent color palette
- Eye-comfort optimized
- Professional medical UI design

#### 8. **🎤 Voice Input**

- Web Speech API integration
- Real-time voice transcription
- Voice-to-text for chat and appointments
- Multi-language support
- Microphone permission handling

## 🏗️ Tech Stack

### Frontend Technologies

- **React 18** - Modern UI framework with hooks
- **Vite** - Next-generation build tool with HMR
- **TailwindCSS v4** - Utility-first CSS with dark mode
- **Clerk React** - Authentication and user management
- **Axios** - Promise-based HTTP client
- **React Router v6** - Client-side routing
- **PropTypes** - Runtime type checking
- **Web Speech API** - Voice input capabilities
- **Blob API** - Client-side file handling

### Backend Technologies

- **Node.js + Express** - RESTful API server
- **MongoDB + Mongoose** - NoSQL database with ODM
- **Clerk SDK** - JWT token verification
- **Cloudinary** - Cloud-based file storage
- **Multer** - Multipart form-data handling
- **node-fetch** - Server-side HTTP requests
- **Shivaay API** - AI-powered chat responses
- **Streamifier** - Buffer to stream conversion

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Nodemon** - Auto-restart on changes
- **dotenv** - Environment variable management

## 📦 Installation & Setup

### Prerequisites

Before you begin, ensure you have:

- **Node.js** v16 or higher
- **MongoDB** (local or MongoDB Atlas)
- **Clerk Account** (free tier available)
- **Cloudinary Account** (free tier available)
- **npm** or **yarn** package manager

### Quick Start

**📘 See [QUICK_START.md](QUICK_START.md) for detailed step-by-step setup instructions.**

#### 1. Clone Repository

```bash
git clone https://github.com/Arkur745/HackX.git
cd HackX
```

#### 2. Backend Setup

```bash
cd Backend
npm install

# Create environment file
# Copy .env.example to .env.development.local
# Add your credentials (see Configuration section)

npm run dev  # Starts on http://localhost:3000
```

#### 3. Frontend Setup

```bash
cd Frontend
npm install

# Create .env file with Clerk publishable key
# VITE_CLERK_PUBLISHABLE_KEY=your_key_here

npm run dev  # Starts on http://localhost:5173
```

#### 4. Access Application

Open `http://localhost:5173` in your browser and sign in with Clerk!

### Configuration

#### Backend Environment Variables

Create `Backend/.env.development.local`:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/healx
# or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/healx

# Clerk Authentication
CLERK_SECRET_KEY=your_clerk_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=3000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

#### Frontend Environment Variables

Create `Frontend/.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:3000
```

**🔧 See [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) for detailed configuration guide.**

## 🏛️ Architecture Overview

### System Design

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  React + Vite + TailwindCSS + Clerk Auth                    │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Dashboard │  │  Reports │  │   Chat   │  │   Home   │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │             │              │             │          │
│       └─────────────┴──────────────┴─────────────┘          │
│                          │                                   │
│                    ┌─────▼─────┐                            │
│                    │ API Client │                           │
│                    │  (Axios)   │                           │
│                    └─────┬─────┘                            │
└──────────────────────────┼──────────────────────────────────┘
                           │
                    JWT Bearer Token
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                       Backend API                            │
│       Node.js + Express + MongoDB + Clerk SDK               │
│                                                              │
│  ┌────────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ Clerk Middleware│  │   Multer    │  │   CORS      │     │
│  │ (Auth Verify)   │  │ (File Upload)│  │  (Security) │     │
│  └────────┬────────┘  └──────┬──────┘  └─────────────┘     │
│           │                  │                               │
│           ▼                  ▼                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │              Controllers                          │       │
│  │  • Chat       • Appointments                     │       │
│  │  • Reports    • Reminders                        │       │
│  └──────────────────┬───────────────────────────────┘       │
│                     │                                        │
│           ┌─────────┴─────────┐                             │
│           ▼                   ▼                              │
│    ┌─────────────┐     ┌─────────────┐                     │
│    │  MongoDB    │     │ Cloudinary  │                     │
│    │  (Data)     │     │  (Files)    │                     │
│    └─────────────┘     └─────────────┘                     │
└─────────────────────────────────────────────────────────────┘
```

**� See [ARCHITECTURE_DIAGRAM.md](ARCHITECTURE_DIAGRAM.md) for detailed architecture.**

### Authentication Flow

```
1. User clicks "Sign In" → Clerk hosted UI
2. Successful login → Clerk issues JWT token
3. Frontend stores token → Axios interceptor adds to requests
4. Backend receives request → Clerk middleware verifies JWT
5. Valid token → User ID extracted → Request processed
6. Invalid token → 401 Unauthorized response
```

### File Upload & Download Flow

```
Upload:
User selects file → Frontend validation → Multer middleware
→ Cloudinary upload (raw resource) → publicId + URL stored
→ MongoDB saves metadata → AI analysis triggered

Download:
User clicks download → Backend proxy endpoint
→ Fetch from Cloudinary → Content-Disposition header
→ Stream to client → Programmatic download with Blob API
→ Toast notification (success/error)
```

## 📡 API Documentation

### Base URL

```
Development: http://localhost:3000
Production: https://your-api-domain.com
```

### Authentication

All endpoints require Bearer token authentication:

```
Authorization: Bearer <clerk_jwt_token>
```

### Endpoints

#### Chat API

```
POST   /api/chat/send              # Send message and get AI response
POST   /api/chat/start             # Start new conversation
GET    /api/chat/conversations     # Get user's conversations
DELETE /api/chat/:conversationId   # Delete conversation
GET    /api/chat/:conversationId   # Get conversation messages
```

#### Reports API

```
GET    /api/reports                  # Get user's reports
POST   /api/reports/upload           # Upload new report
GET    /api/reports/download/:id     # Download report (proxy)
DELETE /api/reports/:id              # Delete report
POST   /api/reports/:id/explain      # Get AI explanation
```

#### Appointments API

```
GET    /api/appointments             # Get user's appointments
POST   /api/appointments             # Book appointment
DELETE /api/appointments/:id         # Cancel appointment
PATCH  /api/appointments/:id/status  # Update appointment status
```

#### Reminders API

```
GET    /api/reminders                # Get user's reminders
POST   /api/reminders                # Create reminder
PATCH  /api/reminders/:id            # Update reminder
DELETE /api/reminders/:id            # Delete reminder
```

#### User API

```
GET    /api/users/profile            # Get user profile
PATCH  /api/users/profile            # Update user profile
```

**📚 See [BACKEND_FRONTEND_CONNECTION.md](BACKEND_FRONTEND_CONNECTION.md) for detailed API specs.**

## 📁 Project Structure

```
HackX/
├── Backend/                      # Express API Server
│   ├── config/                  # Configuration files
│   │   ├── cloudinary.js       # Cloudinary setup & upload
│   │   ├── db.js               # MongoDB connection
│   │   └── env.js              # Environment validation
│   ├── controllers/             # Business logic
│   │   ├── appointmentController.js
│   │   ├── chatController.js
│   │   ├── reminderController.js
│   │   └── reportController.js  # Upload, download, explain
│   ├── middleware/              # Request middleware
│   │   ├── clerk.middleware.js  # JWT verification
│   │   └── multer.middleware.js # File upload handling
│   ├── models/                  # Mongoose schemas
│   │   ├── appointments.models.js
│   │   ├── conversations.model.js
│   │   ├── feedback.models.js
│   │   ├── medicalReports.models.js
│   │   ├── messages.model.js
│   │   ├── reminders.models.js
│   │   └── users.models.js
│   ├── routes/                  # API route definitions
│   │   ├── appointment.routes.js
│   │   ├── chat.routes.js
│   │   ├── reminder.routes.js
│   │   ├── reports.routes.js
│   │   └── user.routes.js
│   ├── utils/                   # Utility functions
│   │   └── shivaayAPI.js       # AI API integration
│   ├── storage/                 # Storage utilities
│   │   └── stm.js              # Short-term memory
│   ├── index.js                 # Server entry point
│   └── package.json
│
├── Frontend/                     # React + Vite Application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── AppointmentForm.jsx
│   │   │   ├── ChatBox.jsx
│   │   │   ├── ChatSidebar.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── LandingNavbar.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ReportViewer.jsx    # Report display with AI summary
│   │   │   ├── ThemeToggle.jsx
│   │   │   ├── Toast.jsx          # Toast notification component
│   │   │   ├── VoiceInput.jsx
│   │   │   └── ui/
│   │   │       └── Button.jsx
│   │   ├── pages/               # Route pages
│   │   │   ├── Dashboard.jsx    # Main dashboard (3 tabs)
│   │   │   ├── Home.jsx         # Landing page
│   │   │   ├── Login.jsx        # Login page (legacy)
│   │   │   └── Reports.jsx      # Report management page
│   │   ├── context/             # React context providers
│   │   │   ├── ChatContext.jsx  # Chat state management
│   │   │   └── ThemeContext.jsx # Theme state
│   │   ├── hooks/               # Custom React hooks
│   │   │   └── useToast.js      # Toast notification hook
│   │   ├── services/            # API client
│   │   │   └── api.js           # Axios configuration & endpoints
│   │   ├── lib/                 # Utilities
│   │   │   └── utils.js
│   │   ├── assets/              # Static assets
│   │   ├── App.jsx              # Root component
│   │   ├── main.jsx             # Entry point with Clerk
│   │   └── index.css            # Global styles + animations
│   ├── public/                  # Public assets
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # TailwindCSS config
│   ├── postcss.config.js        # PostCSS config
│   └── package.json
│
├── Documentation/                # Project documentation
│   ├── QUICK_START.md           # Quick setup guide
│   ├── SETUP_CHECKLIST.md       # Complete setup checklist
│   ├── ARCHITECTURE_DIAGRAM.md  # System architecture
│   ├── BACKEND_FRONTEND_CONNECTION.md
│   ├── CLERK_AUTH_SETUP.md
│   ├── REPORT_UPLOAD_FEATURE.md
│   └── [Various fix/feature docs]
│
└── README.md                     # This file
```

### Key Files Explained

#### Backend

- **`index.js`** - Express server setup, middleware, routes, MongoDB connection
- **`reportController.js`** - Handles report upload to Cloudinary, AI analysis, backend proxy downloads
- **`chatController.js`** - Manages conversations, messages, AI chat integration
- **`clerk.middleware.js`** - Verifies Clerk JWT tokens, extracts userId

#### Frontend

- **`main.jsx`** - App entry point with ClerkProvider wrapper
- **`Dashboard.jsx`** - Main app interface with 3 tabs (Chat, Appointments, Reports)
- **`Toast.jsx`** - Custom toast notification component (4 types)
- **`useToast.js`** - Hook for managing toast state and display
- **`api.js`** - Axios instance with auth interceptor, all API calls

## 🎨 Key Features Deep Dive

### Toast Notification System

Custom in-app notifications replacing browser alerts:

```jsx
// Import hook
import { useToast } from "../hooks/useToast";

// In component
const { showToast, toasts, removeToast, success, error, warning, info } =
  useToast();

// Usage
success("Report uploaded successfully!");
error("Failed to upload report");
info("Downloading report...");
warning("File size exceeds limit");

// Render toasts
<div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
  {toasts.map((toast) => (
    <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
  ))}
</div>;
```

**Features:**

- 4 types with distinct colors and icons
- Auto-dismiss after 3 seconds (configurable)
- Manual close button
- Animated slide-up entrance
- Dark mode compatible
- Toast stacking

### Programmatic File Downloads

Backend proxy approach for secure, tracked downloads:

```javascript
// Backend: reportController.js
async function downloadReport(req, res) {
  // Verify user owns the report
  const report = await MedicalReport.findOne({
    _id: reportId,
    userId: req.auth.userId,
  });

  // Fetch from Cloudinary
  const response = await fetch(report.reportUrl);
  const buffer = await response.buffer();

  // Set headers for download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

  // Stream to client
  res.send(buffer);
}

// Frontend: Reports.jsx
const handleDownloadReport = async (report) => {
  info(`Downloading ${report.reportName}...`);

  const response = await reportAPI.downloadReport(report._id);
  const blob = new Blob([response.data], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = report.reportName;
  link.click();

  URL.revokeObjectURL(url);
  success(`${report.reportName} downloaded successfully!`);
};
```

**Benefits:**

- Proper filename with extension (.pdf)
- No browser default download UI
- Progress feedback with toasts
- Secure (requires authentication)
- Tracked downloads (server logs)

## 📚 Documentation

### Setup Guides

- **[QUICK_START.md](QUICK_START.md)** - Step-by-step setup guide for new developers
- **[SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)** - Complete configuration checklist

### Architecture & Design

- **[ARCHITECTURE_DIAGRAM.md](ARCHITECTURE_DIAGRAM.md)** - System architecture overview
- **[BACKEND_FRONTEND_CONNECTION.md](BACKEND_FRONTEND_CONNECTION.md)** - API connection details
- **[Frontend/DESIGN_SYSTEM.md](Frontend/DESIGN_SYSTEM.md)** - UI/UX design system

### Feature Documentation

- **[REPORT_UPLOAD_FEATURE.md](REPORT_UPLOAD_FEATURE.md)** - Report upload implementation
- **[REPORT_MANAGEMENT_FEATURES.md](REPORT_MANAGEMENT_FEATURES.md)** - Report features guide
- **[Frontend/CLERK_AUTH_SETUP.md](Frontend/CLERK_AUTH_SETUP.md)** - Authentication setup

### Development Guides

- **[Frontend/DEVELOPMENT_GUIDE.md](Frontend/DEVELOPMENT_GUIDE.md)** - Frontend development guide
- **[CONNECTION_SUMMARY.md](CONNECTION_SUMMARY.md)** - Connection troubleshooting

### Bug Fixes & Improvements

- **[CHAT_PERSISTENCE_COMPLETE_FIX.md](CHAT_PERSISTENCE_COMPLETE_FIX.md)** - Chat persistence fix
- **[APPOINTMENT_FIX.md](APPOINTMENT_FIX.md)** - Appointment booking fixes
- **[REPORTS_PAGE_FIX.md](REPORTS_PAGE_FIX.md)** - Reports page improvements

## 🐛 Troubleshooting

### Common Issues

| Issue                           | Symptoms                          | Solution                                                                                                                                            |
| ------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend won't start**         | MongoDB connection error          | • Verify MongoDB is running<br>• Check `MONGODB_URI` in .env<br>• Test connection with `mongosh`                                                    |
| **CORS errors**                 | Network errors in browser console | • Verify `FRONTEND_URL` in backend .env<br>• Check CORS config in index.js<br>• Restart both servers                                                |
| **Authentication fails**        | 401 errors on API calls           | • Verify Clerk keys match same app<br>• Check user is signed in<br>• Clear cookies and re-login<br>• Inspect token in Network tab                   |
| **File upload fails**           | Upload stuck or 400 error         | • Check file size < 10MB<br>• Verify Cloudinary credentials<br>• Check allowed file types<br>• Inspect Network tab for errors                       |
| **Downloads not working**       | Generic "file" downloads          | • Verify backend proxy endpoint working<br>• Check Content-Disposition headers<br>• Test with curl or Postman<br>• Check browser console for errors |
| **Chat not persisting**         | Messages disappear on refresh     | • Verify conversationId in localStorage<br>• Check MongoDB connection<br>• Inspect messages collection<br>• Clear localStorage and create new chat  |
| **Toast notifications missing** | Alerts still showing              | • Verify Toast component imported<br>• Check useToast hook setup<br>• Ensure Toast container in JSX<br>• Check z-index not blocked                  |

### Debug Checklist

1. **Backend Issues:**

   ```bash
   # Check server logs
   cd Backend
   npm run dev
   # Look for startup errors, MongoDB connection status
   ```

2. **Frontend Issues:**

   ```bash
   # Check browser console (F12)
   # Look for:
   # - Network errors (401, 404, 500)
   # - CORS errors
   # - JavaScript errors
   ```

3. **Database Issues:**

   ```bash
   # Connect to MongoDB
   mongosh "mongodb://localhost:27017/healx"
   # Check collections
   show collections
   # Query data
   db.users.find()
   db.medicalreports.find()
   ```

4. **Authentication Issues:**
   ```javascript
   // In browser console
   localStorage.getItem("clerk-db-jwt"); // Should have token
   // In Network tab, check Authorization header in requests
   ```

### Environment Variable Checklist

**Backend** (`Backend/.env.development.local`):

- [ ] `MONGODB_URI` - MongoDB connection string
- [ ] `CLERK_SECRET_KEY` - Clerk secret key (starts with `sk_`)
- [ ] `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- [ ] `CLOUDINARY_API_KEY` - Cloudinary API key
- [ ] `CLOUDINARY_API_SECRET` - Cloudinary API secret
- [ ] `PORT` - Server port (default: 3000)
- [ ] `FRONTEND_URL` - Frontend URL for CORS

**Frontend** (`Frontend/.env`):

- [ ] `VITE_CLERK_PUBLISHABLE_KEY` - Clerk publishable key (starts with `pk_`)
- [ ] `VITE_API_URL` - Backend API URL (default: http://localhost:3000)

**💡 Tip:** Use `.env.example` files as templates!

## 🚀 Deployment

### Prerequisites

- Production MongoDB instance (MongoDB Atlas recommended)
- Clerk production app
- Cloudinary account
- Hosting platform accounts (Vercel, Render, Railway, etc.)

### Backend Deployment (Railway/Render)

1. **Create New Service:**

   - Connect GitHub repository
   - Select `Backend` folder as root directory

2. **Environment Variables:**

   ```env
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/healx
   CLERK_SECRET_KEY=sk_live_xxxxx
   CLOUDINARY_CLOUD_NAME=your_cloud
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   NODE_ENV=production
   PORT=3000
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

3. **Deploy:**

   - Railway: Auto-deploys on push
   - Render: Configure build command `npm install` and start command `npm start`

4. **Get API URL:**
   - Save your backend URL (e.g., `https://your-app.railway.app`)

### Frontend Deployment (Vercel/Netlify)

1. **Create New Project:**

   - Connect GitHub repository
   - Select `Frontend` folder as root directory

2. **Build Settings:**

   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

3. **Environment Variables:**

   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
   VITE_API_URL=https://your-backend.railway.app
   ```

4. **Deploy:**

   - Vercel/Netlify auto-deploys on push

5. **Update Backend CORS:**
   - Add production frontend URL to backend `FRONTEND_URL` env variable

### Post-Deployment

1. **Update Clerk Settings:**

   - Add production URLs to allowed origins
   - Update redirect URLs

2. **Test Deployment:**

   - Sign in/out flow
   - File upload and download
   - Chat functionality
   - API endpoints

3. **Monitor:**
   - Check server logs for errors
   - Monitor MongoDB performance
   - Set up error tracking (Sentry, etc.)

**📖 Detailed deployment guide:** [DEPLOYMENT.md](DEPLOYMENT.md) (coming soon)

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**

- [ ] Sign in with Clerk
- [ ] Sign out clears session
- [ ] Protected routes redirect to login
- [ ] Token refreshes automatically

**Reports:**

- [ ] Upload PDF (< 10MB)
- [ ] Upload image (JPG, PNG)
- [ ] Download report with correct filename
- [ ] View AI-generated summary
- [ ] Delete report (with confirmation)
- [ ] Toast notifications appear

**Chat:**

- [ ] Start new conversation
- [ ] Send text messages
- [ ] Send voice messages
- [ ] AI responds correctly
- [ ] Switch between conversations
- [ ] Delete conversations
- [ ] Chat persists on refresh

**Appointments:**

- [ ] Book appointment with voice
- [ ] Book appointment manually
- [ ] View appointment list
- [ ] Cancel appointment
- [ ] Toast notifications appear

**Reminders:**

- [ ] Create medication reminder
- [ ] View pending reminders
- [ ] Mark reminder as completed
- [ ] Delete reminder

### Future Enhancements

- [ ] Unit tests with Jest/Vitest
- [ ] Integration tests with Cypress
- [ ] E2E tests for critical flows
- [ ] API endpoint tests with Supertest
- [ ] Performance testing
- [ ] Accessibility testing

## 🔐 Security

### Implemented Security Measures

- **Authentication:** Clerk JWT token verification on every API request
- **Authorization:** User-specific data access (reports, chats, appointments)
- **File Upload Validation:**
  - File type whitelist (PDF, JPG, PNG, JPEG)
  - File size limit (10MB)
  - Malicious file detection via MIME type
- **CORS Configuration:** Restricted to frontend domain
- **Environment Variables:** Sensitive credentials in .env files (gitignored)
- **Input Sanitization:** MongoDB injection prevention with Mongoose
- **HTTPS:** Required in production
- **Rate Limiting:** (Recommended: Add express-rate-limit)

### Security Best Practices

1. **Never commit .env files** - Use .env.example as template
2. **Rotate API keys regularly** - Especially Clerk and Cloudinary keys
3. **Use HTTPS in production** - Enable SSL certificates
4. **Implement rate limiting** - Prevent API abuse
5. **Regular dependency updates** - `npm audit fix` periodically
6. **Monitor logs** - Track suspicious activity

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Getting Started

1. **Fork the repository**

   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/HackX.git
   cd HackX
   ```

3. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**

   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

5. **Test your changes**

   - Run backend: `cd Backend && npm run dev`
   - Run frontend: `cd Frontend && npm run dev`
   - Test all affected features

6. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

7. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

8. **Open a Pull Request**
   - Go to original repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

### Contribution Guidelines

- **Code Style:** Follow existing patterns (ESLint config)
- **Commits:** Use conventional commit messages
  - `feat:` - New feature
  - `fix:` - Bug fix
  - `docs:` - Documentation changes
  - `style:` - Code style changes (formatting)
  - `refactor:` - Code refactoring
  - `test:` - Test additions/changes
  - `chore:` - Build/config changes
- **Documentation:** Update README and relevant docs
- **Testing:** Test all changes thoroughly
- **Pull Requests:**
  - One feature per PR
  - Clear description of changes
  - Reference any related issues

### Areas for Contribution

- 🐛 **Bug Fixes** - Check Issues tab for reported bugs
- ✨ **New Features** - Propose and implement new functionality
- 📚 **Documentation** - Improve guides and add examples
- 🎨 **UI/UX** - Enhance design and user experience
- ⚡ **Performance** - Optimize code and queries
- 🧪 **Testing** - Add unit/integration tests
- ♿ **Accessibility** - Improve WCAG compliance
- 🌍 **Internationalization** - Add multi-language support

## 🗺️ Roadmap

### Phase 1: Core Features ✅ (Completed)

- [x] User authentication with Clerk
- [x] AI-powered chatbot
- [x] Medical report upload and management
- [x] Appointment booking system
- [x] Medication reminders
- [x] Toast notification system
- [x] Dark mode UI

### Phase 2: Enhancements (In Progress)

- [ ] Real-time notifications with WebSockets
- [ ] Advanced report analytics dashboard
- [ ] Multi-language support (i18n)
- [ ] Mobile app (React Native)
- [ ] Email notifications for appointments
- [ ] SMS reminders integration
- [ ] Doctor/Patient role separation

### Phase 3: Advanced Features (Planned)

- [ ] Telemedicine video calls
- [ ] Prescription management
- [ ] Lab test tracking
- [ ] Health metrics visualization (charts)
- [ ] Family member accounts
- [ ] Insurance integration
- [ ] Emergency contact system

### Phase 4: Enterprise (Future)

- [ ] Multi-tenant support
- [ ] Hospital/clinic management
- [ ] Billing and invoicing
- [ ] Reporting and analytics
- [ ] Compliance (HIPAA, GDPR)
- [ ] Admin dashboard
- [ ] White-label options

## 📊 Performance

### Current Metrics

- **Backend Response Time:** < 200ms (average)
- **Frontend Load Time:** < 2s (initial load)
- **File Upload:** Supports up to 10MB files
- **Chat Response:** < 3s (AI processing)
- **Database Queries:** Indexed for fast retrieval

### Optimization Strategies

- MongoDB indexing on frequently queried fields
- Cloudinary CDN for fast file delivery
- React code splitting and lazy loading
- Axios request caching
- Efficient state management with Context API

## 📱 Browser Support

| Browser       | Version | Support |
| ------------- | ------- | ------- |
| Chrome        | Latest  | ✅ Full |
| Firefox       | Latest  | ✅ Full |
| Safari        | Latest  | ✅ Full |
| Edge          | Latest  | ✅ Full |
| Mobile Safari | iOS 14+ | ✅ Full |
| Chrome Mobile | Latest  | ✅ Full |

**Note:** Voice input requires browser support for Web Speech API.

## � License

This project is licensed under the **ISC License**.

```
ISC License

Copyright (c) 2024 HealX.ai Team

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

## 👥 Team

**HealX.ai Development Team**

Built with ❤️ for **HackX 3.0**

### Core Contributors

- Full-stack development
- UI/UX design
- AI integration
- DevOps and deployment

### Acknowledgments

- **Clerk** - Authentication platform
- **Cloudinary** - File storage solution
- **MongoDB** - Database provider
- **Shivaay AI** - AI chat API
- **React Community** - Frontend framework
- **TailwindCSS** - Styling framework

## 🆘 Support

### Get Help

- **📖 Documentation:** Check the `/Documentation` folder
- **🐛 Issues:** Report bugs on [GitHub Issues](https://github.com/Arkur745/HackX/issues)
- **💬 Discussions:** Ask questions in [GitHub Discussions](https://github.com/Arkur745/HackX/discussions)
- **📧 Email:** Contact the team at [your-email@example.com]

### FAQ

**Q: Can I use this for production?**  
A: Yes, but ensure proper security measures, use production databases, and comply with healthcare regulations (HIPAA, GDPR).

**Q: Is this HIPAA compliant?**  
A: Not out-of-the-box. Additional security measures, encryption, and audit logging are required for HIPAA compliance.

**Q: Can I customize the AI responses?**  
A: Yes, modify the `shivaayAPI.js` file to integrate your preferred AI service (OpenAI, Anthropic, etc.).

**Q: How do I add more file types?**  
A: Update the `allowedTypes` array in `multer.middleware.js` and adjust file handling logic.

**Q: Can I self-host?**  
A: Absolutely! Deploy backend on any Node.js hosting and frontend on static hosting. See Deployment section.

## 🌟 Star History

If you find this project helpful, please consider giving it a ⭐ on GitHub!

```bash
git clone https://github.com/Arkur745/HackX.git
cd HackX
# Happy coding! 🚀
```

---

**Made with 💙 by the HealX.ai Team | Built for HackX 3.0 Hackathon**

**Need Help?** Check our comprehensive documentation or create an issue!

**Want to Contribute?** See our Contributing guidelines above!
