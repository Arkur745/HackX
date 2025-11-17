# Quick Start Guide - HealX.ai Frontend

## 🚀 Running the Application

### 1. Start Backend First

```bash
cd Backend
npm install
npm start
```

Backend will run on `http://localhost:5000`

### 2. Start Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📝 Default Test Credentials

**Email**: `email@test.com`  
**Password**: `password123`

## 🎯 Key Features & How to Use

### 1. **Landing Page** (`/`)

- Showcases features of the health assistant
- CTA buttons to start chat or login
- Responsive design with animations

### 2. **Login/Register** (`/login`)

- Toggle between login and register modes
- Form validation
- Stores JWT token on successful auth

### 3. **Dashboard** (`/dashboard`)

**Three Tabs:**

#### **Chat Tab**

- Type messages or click microphone for voice input
- AI responds with explanations
- Click "Listen" button to hear bot responses (TTS)
- Smooth animations and typing indicators

#### **Reports Tab**

- View uploaded medical reports
- Click "Explain in Simple Terms" for AI explanation
- Choose language: English or Hindi
- Listen to explanations with TTS

#### **Appointments Tab**

- Schedule new appointments
- Fill form with date, time, department
- View all scheduled appointments
- Cancel appointments

### 4. **Reports Page** (`/reports`)

- Upload medical reports (PDF, JPG, PNG)
- Max file size: 10MB
- Get AI explanations
- Delete reports

## 🎨 Design Features

### Color Scheme

- **Primary**: Black (#000000)
- **Secondary**: White (#FFFFFF)
- **Accent**: Gray scale

### Typography

- **Font**: Inter, Poppins, Manrope
- **Sizes**: Responsive (text-sm to text-5xl)

### Components

All components follow the minimalist black-and-white theme:

- Rounded corners (`rounded-2xl`)
- Subtle shadows (`shadow-md`, `shadow-lg`)
- Smooth transitions (`duration-300`)
- Hover effects with scale

## 🔊 Voice Features

### Voice Input (Speech-to-Text)

1. Click microphone button in chat
2. Speak your message
3. Text appears in real-time
4. Auto-sends when done

### Text-to-Speech

1. Bot sends response
2. Click "Listen" button below message
3. Browser reads message aloud
4. Stop button appears while speaking

### Language Support

- English (en-US)
- Hindi (hi-IN)

## 📱 Responsive Breakpoints

- **Mobile**: `< 640px` - Single column, hamburger menu
- **Tablet**: `640px - 1024px` - Two columns
- **Desktop**: `> 1024px` - Full layout

## 🛠️ Troubleshooting

### Voice Input Not Working?

- Allow microphone permissions in browser
- Use HTTPS or localhost
- Check browser compatibility (Chrome/Edge recommended)

### API Connection Failed?

- Verify backend is running on port 5000
- Check `.env` file has correct `VITE_API_URL`
- Check browser console for CORS errors

### Tailwind Classes Not Working?

- Restart dev server: `Ctrl+C` then `npm run dev`
- Clear cache: `npm cache clean --force`

## 📂 File Organization

```
src/
├── components/     # Reusable components
├── pages/          # Route pages
├── services/       # API layer
├── context/        # State management
├── App.jsx         # Root component with router
└── index.css       # Global styles
```

## 🎭 Demo Flow

1. **Visit Home** → See features
2. **Login** → Use demo credentials
3. **Dashboard → Chat** → Ask "What is diabetes?"
4. **Try Voice** → Click mic, speak
5. **Listen** → Click Listen button on bot response
6. **Reports Tab** → View empty state (upload not connected yet)
7. **Appointments** → Schedule a mock appointment

## 🔐 Security Notes

- JWT tokens stored in localStorage
- Automatic token injection in API calls
- Protected routes redirect to login
- Logout clears token

## 🚀 Deployment Checklist

- [ ] Update `VITE_API_URL` in `.env` to production backend URL
- [ ] Run `npm run build`
- [ ] Test `dist/` folder locally with `npm run preview`
- [ ] Deploy to Vercel/Netlify
- [ ] Configure environment variables on hosting platform
- [ ] Test voice features on HTTPS

## 💡 Tips

1. **Use Chrome/Edge** for best voice API support
2. **Enable microphone** when prompted
3. **Use headphones** to avoid echo in voice chat
4. **Check console** for detailed error messages
5. **Refresh page** if state seems stuck

## 📞 Support

Open an issue on GitHub or contact the development team.

---

**Enjoy building with HealX.ai! 🏥💬🎤**
