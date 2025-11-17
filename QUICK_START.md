# HackX Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:

- ✅ Node.js installed (v16 or higher)
- ✅ MongoDB installed and running OR MongoDB Atlas connection string
- ✅ Clerk account with app created
- ✅ Cloudinary account with credentials

## Step 1: Configure Backend Environment

1. Open `Backend/.env.development.local`
2. Replace the placeholder values:

```env
# Required: Your MongoDB connection
MONGO_DB_URI=mongodb://localhost:27017/hackx

# Required: Get from https://clerk.dev dashboard → API Keys
CLERK_SECRET_KEY=sk_test_your_actual_clerk_secret_key

# Required: Get from https://cloudinary.com dashboard
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret

# Optional: If you have Shivaay AI key
SHIVAAY_API_KEY=your_shivaay_key
```

## Step 2: Configure Frontend Environment

1. Open `Frontend/.env`
2. Verify/update:

```env
# Should already be set correctly
VITE_API_URL=http://localhost:5000/api

# Required: Get from Clerk dashboard → API Keys
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_clerk_publishable_key
```

## Step 3: Start Backend Server

Open a terminal and run:

```powershell
cd "c:\Users\Aditya Vardhan Kheta\OneDrive\Desktop\Coding\HackX3.0\HackX\Backend"
npm run dev
```

You should see:

```
Server started on port 5000
MongoDB connected successfully
```

## Step 4: Start Frontend Server

Open a **new terminal** and run:

```powershell
cd "c:\Users\Aditya Vardhan Kheta\OneDrive\Desktop\Coding\HackX3.0\HackX\Frontend"
npm run dev
```

You should see:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## Step 5: Test the Connection

1. Open browser to `http://localhost:5173`
2. Click **"Sign In"** button
3. Complete Clerk authentication
4. You should be redirected to Dashboard
5. Test features:
   - ✅ Chat with AI
   - ✅ Upload medical report
   - ✅ Book appointment (with voice input)
   - ✅ View reports

## Verification Checklist

### Backend is Working:

- [ ] Terminal shows "Server started on port 5000"
- [ ] Terminal shows "MongoDB connected successfully"
- [ ] No error messages in terminal

### Frontend is Working:

- [ ] Browser opens to `http://localhost:5173`
- [ ] Page loads without errors
- [ ] Dark mode is active
- [ ] Sign In button appears

### Connection is Working:

- [ ] Can sign in with Clerk
- [ ] Dashboard loads after sign in
- [ ] Chat sends messages (check Network tab)
- [ ] API calls show in Backend terminal

### Authentication is Working:

- [ ] API requests include `Authorization: Bearer <token>` header
- [ ] Backend verifies token successfully
- [ ] Protected routes are accessible

## Troubleshooting

### Backend won't start

```powershell
# Check if port 5000 is in use
netstat -ano | findstr :5000

# If in use, kill the process or change PORT in .env
```

### MongoDB connection fails

```powershell
# Check if MongoDB is running
mongod --version

# Start MongoDB service
net start MongoDB

# OR use MongoDB Atlas connection string
```

### Clerk authentication fails

- Verify publishable key in Frontend `.env`
- Verify secret key in Backend `.env`
- Check Clerk dashboard for app status
- Ensure keys match the same Clerk app

### CORS errors in browser

- Verify Frontend is on `http://localhost:5173`
- Restart both servers
- Clear browser cache

### API calls fail

- Check Backend terminal for errors
- Check browser DevTools → Console for errors
- Check browser DevTools → Network tab for failed requests
- Verify authorization token is present

## What's Connected

✅ **Authentication**: Clerk JWT tokens verified on backend
✅ **CORS**: Backend accepts requests from frontend
✅ **API Integration**: Frontend `api.js` configured for backend
✅ **Protected Routes**: All API endpoints require authentication
✅ **File Upload**: Multer + Cloudinary for medical reports
✅ **Database**: MongoDB for persistent storage

## Next Steps

Once both servers are running:

1. **Test Chat**: Send a message in the chat interface
2. **Test Reports**: Upload a medical report (PDF/image)
3. **Test Appointments**: Book an appointment using voice or form
4. **Check Database**: Use MongoDB Compass to verify data is saved
5. **Monitor Backend**: Watch terminal for API request logs

## Production Deployment

When ready for production:

1. Update environment variables for production
2. Deploy backend (Railway, Render, Heroku, etc.)
3. Update `VITE_API_URL` to production backend URL
4. Deploy frontend (Vercel, Netlify, etc.)
5. Update Clerk allowed origins
6. Update backend CORS config

## Getting Help

If you encounter issues:

1. Check this guide's Troubleshooting section
2. Review `BACKEND_FRONTEND_CONNECTION.md` for detailed info
3. Check browser console and backend terminal for error messages
4. Verify all environment variables are set correctly
