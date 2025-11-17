# 🚀 HackX Setup Checklist

Use this checklist to ensure your backend and frontend are properly connected and running.

## ✅ Pre-Setup Checklist

### Software Requirements

- [ ] Node.js v16 or higher installed
  ```powershell
  node --version
  ```
- [ ] npm installed
  ```powershell
  npm --version
  ```
- [ ] MongoDB installed and running OR MongoDB Atlas account
  ```powershell
  mongod --version
  ```
- [ ] Git installed (optional)
  ```powershell
  git --version
  ```

### Account Requirements

- [ ] Clerk account created at https://clerk.com
- [ ] Clerk app created and keys available
- [ ] Cloudinary account created at https://cloudinary.com
- [ ] Cloudinary credentials available
- [ ] MongoDB database ready (local or Atlas)

## 📦 Installation Checklist

### Backend Setup

- [ ] Navigate to Backend directory
  ```powershell
  cd "c:\Users\Aditya Vardhan Kheta\OneDrive\Desktop\Coding\HackX3.0\HackX\Backend"
  ```
- [ ] Install dependencies
  ```powershell
  npm install
  ```
- [ ] Verify `@clerk/clerk-sdk-node` is installed
  ```powershell
  npm list @clerk/clerk-sdk-node
  ```
- [ ] Create `.env.development.local` file
- [ ] Fill in all environment variables (see below)

### Frontend Setup

- [ ] Navigate to Frontend directory
  ```powershell
  cd "c:\Users\Aditya Vardhan Kheta\OneDrive\Desktop\Coding\HackX3.0\HackX\Frontend"
  ```
- [ ] Install dependencies
  ```powershell
  npm install
  ```
- [ ] Verify `.env` file exists
- [ ] Update Clerk publishable key in `.env`

## 🔑 Environment Variables Checklist

### Backend `.env.development.local`

Copy this template and fill in your actual values:

```env
# ✅ Server Configuration
PORT=5000

# ✅ Database
# Option 1: Local MongoDB
MONGO_DB_URI=mongodb://localhost:27017/hackx

# Option 2: MongoDB Atlas
# MONGO_DB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/hackx?retryWrites=true&w=majority

# ✅ Clerk (Get from: https://dashboard.clerk.com → API Keys)
CLERK_SECRET_KEY=sk_test_YOUR_ACTUAL_CLERK_SECRET_KEY

# ✅ Cloudinary (Get from: https://cloudinary.com/console)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@your_cloud_name

# ⚠️ Optional: Shivaay AI (if you have the key)
SHIVAAY_API_KEY=your_shivaay_api_key
```

#### Verification:

- [ ] PORT is set to 5000
- [ ] MONGO_DB_URI is valid (test with MongoDB Compass)
- [ ] CLERK*SECRET_KEY starts with `sk_test*`or`sk*live*`
- [ ] CLOUDINARY\_\* fields are filled
- [ ] File saved as `.env.development.local` (not `.txt`)

### Frontend `.env`

Verify these values:

```env
# ✅ Backend API URL (should already be correct)
VITE_API_URL=http://localhost:5000/api

# ✅ Clerk (Get from: https://dashboard.clerk.com → API Keys)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_CLERK_PUBLISHABLE_KEY
```

#### Verification:

- [ ] VITE_API_URL points to `http://localhost:5000/api`
- [ ] VITE*CLERK_PUBLISHABLE_KEY starts with `pk_test*`or`pk*live*`
- [ ] Keys match the same Clerk app as backend
- [ ] File named `.env` (not `.env.local` or `.env.development`)

## 🎯 Connection Configuration Checklist

### Backend Files Modified

- [x] `Backend/index.js` - CORS configured ✅
- [x] `Backend/config/db.js` - MongoDB connection ✅
- [x] `Backend/config/env.js` - Environment variables ✅
- [x] `Backend/middleware/clerk.middleware.js` - Created ✅
- [x] `Backend/routes/chat.routes.js` - Auth added ✅
- [x] `Backend/routes/reports.routes.js` - Auth added ✅
- [x] `Backend/routes/appointment.routes.js` - Auth added ✅
- [x] `Backend/routes/reminder.routes.js` - Auth added ✅

### Frontend Files (Already Configured)

- [x] `Frontend/src/services/api.js` - Axios with interceptors ✅
- [x] `Frontend/src/main.jsx` - ClerkProvider configured ✅
- [x] `Frontend/src/App.jsx` - Protected routes ✅

## 🚀 Starting Servers Checklist

### Start Backend

- [ ] Open Terminal 1
- [ ] Navigate to Backend directory
  ```powershell
  cd "c:\Users\Aditya Vardhan Kheta\OneDrive\Desktop\Coding\HackX3.0\HackX\Backend"
  ```
- [ ] Start server
  ```powershell
  npm run dev
  ```
- [ ] Verify output shows:
  - [ ] "Server started on port 5000"
  - [ ] "MongoDB Connected: ..." (or connection success message)
  - [ ] No error messages
- [ ] Keep this terminal running

### Start Frontend

- [ ] Open Terminal 2 (new terminal)
- [ ] Navigate to Frontend directory
  ```powershell
  cd "c:\Users\Aditya Vardhan Kheta\OneDrive\Desktop\Coding\HackX3.0\HackX\Frontend"
  ```
- [ ] Start dev server
  ```powershell
  npm run dev
  ```
- [ ] Verify output shows:
  - [ ] "VITE v5.x.x ready in xxx ms"
  - [ ] "Local: http://localhost:5173/"
  - [ ] No error messages
- [ ] Keep this terminal running

## 🧪 Testing Connection Checklist

### Initial Load Test

- [ ] Open browser to `http://localhost:5173`
- [ ] Page loads without errors
- [ ] Dark mode is active
- [ ] Landing page displays correctly
- [ ] No errors in browser console (F12)

### Authentication Test

- [ ] Click "Sign In" button
- [ ] Clerk modal opens
- [ ] Complete authentication (sign in or sign up)
- [ ] Redirected to Dashboard after sign in
- [ ] User button appears in navbar
- [ ] No 401 errors in console

### Backend Connection Test

- [ ] Open Browser DevTools (F12)
- [ ] Go to Network tab
- [ ] In Dashboard, try to send a chat message
- [ ] Verify in Network tab:
  - [ ] Request goes to `http://localhost:5000/api/chat/send`
  - [ ] Request Headers include `Authorization: Bearer <token>`
  - [ ] Status code is 200 (not 401 or 500)
  - [ ] Response contains data

### Backend Logs Test

Check Terminal 1 (Backend) for:

- [ ] Incoming request logged
- [ ] No 401 or 500 errors
- [ ] "Token verified for user: ..." (if logs enabled)

### Feature Tests

- [ ] **Chat**: Send a message and get response
- [ ] **Reports**: Click upload button, select file
- [ ] **Appointments**: Open appointment form
- [ ] **Voice Input**: Click mic button (if available)

## 🐛 Troubleshooting Checklist

### Backend Won't Start

If you see errors:

- [ ] **MongoDB Connection Error**

  - [ ] Check MongoDB is running: `mongod` or MongoDB service
  - [ ] Verify MONGO_DB_URI in `.env.development.local`
  - [ ] Test connection with MongoDB Compass
  - [ ] Check firewall/network settings

- [ ] **Port Already in Use**

  - [ ] Check if port 5000 is in use
    ```powershell
    netstat -ano | findstr :5000
    ```
  - [ ] Kill process or change PORT in .env

- [ ] **Missing Environment Variables**
  - [ ] Verify `.env.development.local` exists
  - [ ] Check all required variables are set
  - [ ] Verify no typos in variable names

### Frontend Won't Start

If you see errors:

- [ ] **Port Already in Use**

  - [ ] Check if port 5173 is in use
  - [ ] Vite will auto-increment port if needed

- [ ] **Module Not Found**

  - [ ] Delete `node_modules` and reinstall
    ```powershell
    rm -r node_modules
    npm install
    ```

- [ ] **Environment Variable Issues**
  - [ ] Verify `.env` file exists in Frontend root
  - [ ] Variable names start with `VITE_`
  - [ ] Restart dev server after changing .env

### CORS Errors

If you see "blocked by CORS policy":

- [ ] Backend is running on `http://localhost:5000`
- [ ] Frontend is running on `http://localhost:5173`
- [ ] Backend CORS config includes Frontend URL
- [ ] Restart both servers
- [ ] Clear browser cache (Ctrl+Shift+Delete)

### 401 Unauthorized Errors

If API calls return 401:

- [ ] User is signed in (check user button in navbar)
- [ ] Clerk keys in both .env files are correct
- [ ] Keys are from the SAME Clerk app
- [ ] CLERK_SECRET_KEY matches CLERK_PUBLISHABLE_KEY app
- [ ] Token is in request headers (check Network tab)
- [ ] Try signing out and signing in again

### Database Errors

If data isn't saving:

- [ ] MongoDB is running and connected
- [ ] Check backend terminal for database errors
- [ ] Use MongoDB Compass to verify connection
- [ ] Check database name in connection string
- [ ] Verify user has write permissions

## ✅ Final Verification

Before considering setup complete:

- [ ] Backend server running without errors
- [ ] Frontend dev server running without errors
- [ ] Can sign in with Clerk successfully
- [ ] Dashboard loads after sign in
- [ ] Can send chat message
- [ ] API calls show in Network tab
- [ ] Backend logs show incoming requests
- [ ] No CORS errors
- [ ] No 401 errors
- [ ] No console errors

## 📚 Next Steps

Once all checks pass:

1. [ ] Read `BACKEND_FRONTEND_CONNECTION.md` for detailed info
2. [ ] Review `ARCHITECTURE_DIAGRAM.md` to understand flow
3. [ ] Test all features (chat, reports, appointments, reminders)
4. [ ] Check MongoDB to verify data is being saved
5. [ ] Customize features as needed
6. [ ] Deploy when ready (see README.md)

## 🆘 Getting Help

If you're stuck:

1. **Check Documentation**

   - [ ] `QUICK_START.md`
   - [ ] `BACKEND_FRONTEND_CONNECTION.md`
   - [ ] `CONNECTION_SUMMARY.md`

2. **Check Logs**

   - [ ] Backend terminal for errors
   - [ ] Browser console (F12) for frontend errors
   - [ ] Network tab for failed requests

3. **Verify Configuration**

   - [ ] All environment variables set
   - [ ] Keys are correct and match
   - [ ] MongoDB is accessible
   - [ ] Ports are available

4. **Common Solutions**
   - [ ] Restart both servers
   - [ ] Clear browser cache
   - [ ] Reinstall dependencies
   - [ ] Check Clerk dashboard for issues

## 📝 Notes

- Keep both terminals running while developing
- Changes to backend require server restart
- Changes to frontend auto-reload (HMR)
- Changes to .env files require restart
- MongoDB Compass helpful for debugging database

---

**Setup Complete?** ✅

You're ready to develop! Start building amazing healthcare features! 🎉

**Last Updated**: October 31, 2025
