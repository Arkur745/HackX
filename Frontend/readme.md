# Voice and Chat-Based Digital Health Assistant - Frontend

A modern, minimalist React-based frontend for a digital health assistant application. Built with Vite, React Router, TailwindCSS, and featuring voice-enabled chat capabilities.

## 🎨 Design Philosophy

- **Black & White Minimalist**: Clean, professional design using only black, white, and grayscale colors
- **Responsive**: Mobile-first design that works seamlessly across all devices
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Modern**: Smooth animations, transitions, and hover effects

## ✨ Features

### 🗣️ Voice & Chat Interface

- Real-time text chat with AI assistant
- Voice input using Web Speech API
- Text-to-speech responses using Speech Synthesis API
- Multilingual support (English, Hindi)
- Typing indicators and smooth animations

### 📄 Medical Report Management

- Upload medical reports (PDF, JPG, PNG)
- AI-powered explanations in simple language
- Multilingual explanations
- Text-to-speech for report explanations
- Secure document storage

### 📅 Appointment Scheduling

- Easy appointment booking form
- Date and time selection
- Department and doctor preferences
- Appointment management (view, cancel)

### 🔐 User Authentication

- Secure login and registration
- JWT-based authentication
- Protected routes

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Routing**: React Router DOM v6
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Voice APIs**: Web Speech API, Speech Synthesis API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see Backend README)

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your backend API URL:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Navbar.jsx
│   ├── ChatBox.jsx
│   ├── MessageBubble.jsx
│   ├── VoiceInput.jsx
│   ├── AppointmentForm.jsx
│   └── ReportViewer.jsx
├── pages/             # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   └── Reports.jsx
├── services/          # API service layer
│   └── api.js
├── context/           # React Context
│   └── ChatContext.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## 🎨 Design System

### Custom TailwindCSS Classes

- `.btn-primary` - Black button with white text
- `.btn-secondary` - White button with black border
- `.input-field` - Styled form input
- `.card` - White card with shadow
- `.modal-overlay` - Full-screen modal backdrop

### Color Palette

- **Black**: `#000000`
- **White**: `#FFFFFF`
- **Gray Scale**: Custom palette (100-900)

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Note**: Voice features require browser support for Web Speech API.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Output in `dist/` directory. Deploy to Vercel, Netlify, or any static hosting service.

---

**Built with ❤️ for HackX3.0**
