# Clerk Authentication - Integration Guide

## ✅ Step 5 Completed: ClerkProvider Wrapper

Your application is now wrapped with ClerkProvider, making Clerk's authentication features available throughout your entire app.

## 📁 Files Modified

### `src/main.jsx`

```jsx
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
  <App />
</ClerkProvider>
```

### `.env`

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_Y3VkZGx5LWNhdC0xMS5jbGVyay5hY2NvdW50cy5kZXYk
```

## 🔐 What's Now Available

With ClerkProvider wrapping your app, you now have access to:

### Clerk Hooks

- `useUser()` - Get current user information
- `useAuth()` - Get authentication state and methods
- `useSignIn()` - Handle sign-in flows
- `useSignUp()` - Handle sign-up flows
- `useClerk()` - Access Clerk instance directly

### Clerk Components

- `<SignIn />` - Pre-built sign-in component
- `<SignUp />` - Pre-built sign-up component
- `<UserButton />` - User profile button
- `<SignInButton />` - Sign-in trigger button
- `<SignUpButton />` - Sign-up trigger button
- `<SignOutButton />` - Sign-out button

## 🚀 Next Steps

### Option 1: Use Pre-built Components (Recommended for Quick Setup)

**Update your Login page** (`src/pages/Login.jsx`):

```jsx
import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn
        routing="path"
        path="/login"
        signUpUrl="/signup"
        afterSignInUrl="/dashboard"
      />
    </div>
  );
}
```

**Create a SignUp page** (`src/pages/SignUp.jsx`):

```jsx
import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp
        routing="path"
        path="/signup"
        signInUrl="/login"
        afterSignUpUrl="/dashboard"
      />
    </div>
  );
}
```

**Add UserButton to your Navbar** (`src/components/Navbar.jsx`):

```jsx
import { UserButton, useUser } from "@clerk/clerk-react";

export default function Navbar() {
  const { isSignedIn, user } = useUser();

  return (
    <nav>
      {/* Your existing navbar */}
      {isSignedIn && (
        <div className="flex items-center gap-3">
          <span>Welcome, {user.firstName}!</span>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </nav>
  );
}
```

### Option 2: Use Custom Authentication Logic

```jsx
import { useAuth, useUser } from "@clerk/clerk-react";

function YourComponent() {
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();

  if (!isSignedIn) {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <h1>Hello {user.firstName}!</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
```

### Option 3: Protect Routes

**Update App.jsx** to add protected routes:

```jsx
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </Router>
  );
}
```

## 🎨 Styling Clerk Components

### Dark Mode Support

Clerk automatically supports your dark mode! The components will adapt to your theme.

### Custom Appearance

You can customize Clerk components to match your design:

```jsx
<ClerkProvider
  publishableKey={PUBLISHABLE_KEY}
  appearance={{
    baseTheme: "dark", // or 'light'
    variables: {
      colorPrimary: "#000000",
      colorBackground: "#ffffff",
      // Add more custom variables
    },
    elements: {
      formButtonPrimary: "bg-black text-white hover:bg-gray-800",
      card: "shadow-lg",
      // Add more custom classes
    },
  }}
>
  <App />
</ClerkProvider>
```

## 🔑 Environment Variables

Make sure your `.env` file has:

```
VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
```

**Important**: Never commit your `.env` file to version control!

## 📦 Package Installed

```json
"@clerk/clerk-react": "latest"
```

## 🧪 Testing Authentication

1. **Start your dev server**: `npm run dev`
2. **Navigate to your app**: `http://localhost:5173`
3. **Test sign-in/sign-up flows**
4. **Check user persistence** (refresh page, user should stay signed in)
5. **Test sign-out**

## 🔒 Security Best Practices

1. ✅ **Never expose secret keys** - Only use publishable key in frontend
2. ✅ **Use environment variables** - Already configured
3. ✅ **Validate on backend** - Use Clerk's backend SDKs to verify tokens
4. ✅ **Protect sensitive routes** - Use SignedIn/SignedOut components
5. ✅ **Handle errors gracefully** - Show user-friendly error messages

## 🌐 Backend Integration

To secure your backend API with Clerk:

1. **Install Clerk backend SDK** (in your Backend folder):

```bash
npm install @clerk/clerk-sdk-node
```

2. **Verify tokens in your API**:

```javascript
const { requireAuth } = require("@clerk/clerk-sdk-node");

app.get("/api/protected", requireAuth(), (req, res) => {
  // req.auth contains user info
  res.json({ userId: req.auth.userId });
});
```

## 📚 Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [React SDK Reference](https://clerk.com/docs/references/react/overview)
- [Authentication Flows](https://clerk.com/docs/authentication/overview)
- [User Management](https://clerk.com/docs/users/overview)

## ✅ Current Status

- ✅ Clerk installed
- ✅ Environment variable configured
- ✅ ClerkProvider wrapping app
- ⏳ Ready to implement authentication UI
- ⏳ Ready to protect routes
- ⏳ Ready to use Clerk hooks

## 🎯 Recommended Next Action

Update your `Login.jsx` page to use Clerk's pre-built `<SignIn />` component for instant authentication!
