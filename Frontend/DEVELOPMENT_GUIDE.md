# Development Guide - HealX.ai Frontend

## 🎓 For Developers

### Project Architecture

```
Frontend (React + Vite)
│
├── Routing Layer (React Router)
│   └── Routes: /, /login, /dashboard, /reports
│
├── State Management (React Context)
│   └── ChatContext: Manages chat state globally
│
├── API Layer (Axios)
│   └── services/api.js: Centralized API calls
│
├── UI Layer
│   ├── Components: Reusable UI elements
│   └── Pages: Route-specific views
│
└── Styling (TailwindCSS)
    └── Black-and-white minimalist theme
```

---

## 📝 Coding Standards

### Component Structure

```jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ComponentName = ({ prop1, prop2 }) => {
  // 1. State declarations
  const [state, setState] = useState(initial);

  // 2. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // 3. Event handlers
  const handleEvent = () => {
    // Handler logic
  };

  // 4. Render helpers (if needed)
  const renderHelper = () => {
    return <div>Helper content</div>;
  };

  // 5. Main return
  return <div className="container">{/* JSX */}</div>;
};

// PropTypes for validation
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

// Default props
ComponentName.defaultProps = {
  prop2: 0,
};

export default ComponentName;
```

### Naming Conventions

- **Components**: PascalCase (`ChatBox.jsx`)
- **Hooks**: camelCase with 'use' prefix (`useChatContext`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Functions**: camelCase (`handleSubmit`)
- **Files**: Match component name

### Styling Guidelines

**Use Tailwind utility classes:**

```jsx
// ✅ Good
<button className="px-6 py-3 bg-black text-white rounded-2xl hover:bg-gray-800">
  Click Me
</button>

// ❌ Avoid inline styles
<button style={{ padding: '12px 24px', backgroundColor: 'black' }}>
  Click Me
</button>
```

**Use custom classes for repeated patterns:**

```jsx
// ✅ Good (defined in index.css)
<button className="btn-primary">Click Me</button>

// ❌ Avoid repeating long class strings
<button className="px-6 py-3 bg-black text-white rounded-2xl...">
  Click Me
</button>
```

---

## 🔧 Common Tasks

### Adding a New Page

1. **Create page file**

   ```bash
   src/pages/NewPage.jsx
   ```

2. **Create component**

   ```jsx
   const NewPage = () => {
     return (
       <div className="min-h-screen bg-white pt-20 px-4">
         <h1>New Page</h1>
       </div>
     );
   };
   export default NewPage;
   ```

3. **Add route in App.jsx**

   ```jsx
   import NewPage from "./pages/NewPage";

   <Route path="/new" element={<NewPage />} />;
   ```

4. **Add to Navbar** (if needed)
   ```jsx
   const navLinks = [{ path: "/new", label: "New Page" }];
   ```

### Adding a New Component

1. **Create component file**

   ```bash
   src/components/NewComponent.jsx
   ```

2. **Export from index.js**

   ```jsx
   export { default as NewComponent } from "./NewComponent";
   ```

3. **Import where needed**
   ```jsx
   import { NewComponent } from "../components";
   ```

### Adding API Endpoints

Edit `src/services/api.js`:

```jsx
export const newAPI = {
  getData: () => api.get("/new-endpoint"),
  postData: (data) => api.post("/new-endpoint", data),
};
```

Use in components:

```jsx
import { newAPI } from "../services/api";

const response = await newAPI.getData();
```

### Adding Tailwind Utilities

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      'custom-color': '#123456',
    },
    spacing: {
      '128': '32rem',
    },
  },
}
```

Edit `index.css` for component classes:

```css
@layer components {
  .my-custom-class {
    @apply px-4 py-2 bg-black text-white;
  }
}
```

---

## 🐛 Debugging Tips

### React DevTools

1. Install React DevTools browser extension
2. Inspect component tree
3. Check props and state
4. Profile performance

### Console Logging

```jsx
// Component state
console.log("State:", { state1, state2 });

// API responses
console.log("API Response:", response.data);

// Props
console.log("Props received:", props);
```

### Network Tab

1. Open DevTools → Network
2. Filter by XHR/Fetch
3. Check request/response
4. Verify headers and payloads

### Common Issues

**Issue: Tailwind classes not applying**

- Solution: Restart dev server (`Ctrl+C`, then `npm run dev`)

**Issue: API calls failing**

- Check: Backend running?
- Check: CORS configured?
- Check: Auth token present?

**Issue: Voice input not working**

- Check: HTTPS or localhost?
- Check: Microphone permissions?
- Check: Browser support?

**Issue: Routes not working**

- Check: Route path correct?
- Check: Component imported?
- Check: Navbar link correct?

---

## 🧪 Testing Guide

### Manual Testing Checklist

**Authentication**

- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Register new user
- [ ] Logout clears token
- [ ] Protected routes redirect

**Chat**

- [ ] Send text message
- [ ] Receive bot response
- [ ] Use voice input
- [ ] Listen to bot response (TTS)
- [ ] Auto-scroll works
- [ ] Typing indicator shows

**Reports**

- [ ] Upload valid file
- [ ] Upload invalid file (rejected)
- [ ] View report details
- [ ] Get explanation
- [ ] Switch language (EN/HI)
- [ ] Listen to explanation
- [ ] Delete report

**Appointments**

- [ ] Fill form completely
- [ ] Submit appointment
- [ ] View appointment list
- [ ] Cancel appointment
- [ ] Form validation works

**Responsive Design**

- [ ] Test on mobile (< 640px)
- [ ] Test on tablet (640-1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Hamburger menu on mobile
- [ ] All features accessible

---

## 📦 Build & Deploy

### Development Build

```bash
npm run dev
```

- Hot reload enabled
- Source maps included
- Fast refresh

### Production Build

```bash
npm run build
```

- Minified code
- Tree shaking
- Optimized assets
- Output: `dist/` folder

### Preview Production

```bash
npm run preview
```

- Test production build locally
- Verify optimizations

### Deploy to Vercel

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Login**

   ```bash
   vercel login
   ```

3. **Deploy**

   ```bash
   vercel
   ```

4. **Set Environment Variables**

   - Go to Vercel dashboard
   - Project Settings → Environment Variables
   - Add: `VITE_API_URL=https://your-backend.com/api`

5. **Redeploy**
   ```bash
   vercel --prod
   ```

---

## 🎨 Design System Reference

### Colors

```jsx
// Backgrounds
bg - black; // #000000
bg - white; // #FFFFFF
bg - gray - 50; // Lightest
bg - gray - 900; // Darkest

// Text
text - black;
text - white;
text - gray - 600;
```

### Typography

```jsx
// Sizes
text-xs    // 0.75rem
text-sm    // 0.875rem
text-base  // 1rem
text-lg    // 1.125rem
text-xl    // 1.25rem
text-2xl   // 1.5rem
text-3xl   // 1.875rem
text-4xl   // 2.25rem
text-5xl   // 3rem

// Weights
font-light   // 300
font-normal  // 400
font-medium  // 500
font-semibold // 600
font-bold    // 700
```

### Spacing

```jsx
// Padding
p - 2; // 0.5rem
p - 4; // 1rem
p - 6; // 1.5rem
p - 8; // 2rem

// Margin
m - 2, m - 4, m - 6, m - 8;

// Gap
gap - 2, gap - 4, gap - 6;
```

### Borders

```jsx
// Radius
rounded-xl   // 0.75rem
rounded-2xl  // 1rem
rounded-full // 9999px

// Width
border    // 1px
border-2  // 2px
border-4  // 4px
```

### Shadows

```jsx
shadow-md  // Medium
shadow-lg  // Large
shadow-xl  // Extra large
shadow-2xl // 2X large
```

---

## 🚀 Performance Tips

1. **Lazy Loading**

   ```jsx
   const Dashboard = lazy(() => import("./pages/Dashboard"));
   ```

2. **Memoization**

   ```jsx
   const memoizedValue = useMemo(() => compute(a, b), [a, b]);
   ```

3. **Debouncing**

   ```jsx
   const debouncedSearch = useCallback(
     debounce((query) => search(query), 300),
     []
   );
   ```

4. **Image Optimization**
   - Use appropriate formats (WebP)
   - Lazy load images
   - Optimize file sizes

---

## 📚 Resources

- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [TailwindCSS Docs](https://tailwindcss.com)
- [React Router Docs](https://reactrouter.com)
- [Axios Docs](https://axios-http.com)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

---

## 💬 Getting Help

1. Check this guide
2. Review component code
3. Check browser console
4. Review network tab
5. Search error message
6. Ask team for help

---

**Happy Coding! 🚀**
