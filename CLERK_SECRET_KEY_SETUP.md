# Getting Your Clerk Secret Key

## Problem

Backend shows error: `Failed to resolve JWK during verification` and `Set the CLERK_JWT_KEY environment variable`

## Solution: Add Clerk Secret Key

### Step 1: Get Your Clerk Secret Key

1. **Go to Clerk Dashboard**: https://dashboard.clerk.com
2. **Select your application** (the one with publishable key `pk_test_Y3VkZGx5LWNhdC0xMS5jbGVyay5hY2NvdW50cy5kZXYk`)
3. **Click "API Keys"** in the left sidebar
4. **Find "Secret keys" section**
5. **Copy the Secret Key** - it starts with `sk_test_` or `sk_live_`

### Step 2: Add to Backend Environment

Open `Backend/.env.development.local` and replace this line:

```env
CLERK_SECRET_KEY="your_clerk_secret_key_here"
```

With your actual secret key:

```env
CLERK_SECRET_KEY="sk_test_your_actual_secret_key_from_clerk_dashboard"
```

### Step 3: Restart Backend

The backend will auto-reload, but if it doesn't:

```powershell
# Stop backend (Ctrl+C)
cd Backend
npm run dev
```

## What Was Fixed

### 1. Added Missing Environment Variable

```env
# BEFORE - Missing secret key
VITE_CLERK_PUBLISHABLE_KEY="pk_test_..."

# AFTER - Has both keys
CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
```

### 2. Updated Clerk Middleware

```javascript
// BEFORE - Using clerkClient.verifyToken (deprecated pattern)
const session = await clerkClient.verifyToken(token);

// AFTER - Using verifyToken directly with secret key
const verified = await verifyToken(token, {
  secretKey: CLERK_SECRET_KEY,
});
```

## Verification

After adding the key, your backend logs should show:

✅ **Success**:

```
Server started on port 5000
MongoDB Connected: ...
☁️  Cloudinary configured
```

❌ **Still failing** (if key is wrong):

```
Token verification failed: Invalid secret key
```

⚠️ **Warning** (if key is missing):

```
⚠️  CLERK_SECRET_KEY not set - authentication will fail!
```

## Testing

1. **Restart backend** with the correct secret key
2. **Refresh frontend** in browser
3. **Sign in** with Clerk
4. **Send a chat message**
5. **Check backend logs** - should NOT show token verification errors

## Where to Find Clerk Keys

### Frontend Key (Already Set)

- **Variable**: `VITE_CLERK_PUBLISHABLE_KEY`
- **Location**: `Frontend/.env`
- **Format**: `pk_test_...` or `pk_live_...`
- **Purpose**: Client-side authentication UI

### Backend Key (NEEDS TO BE SET)

- **Variable**: `CLERK_SECRET_KEY`
- **Location**: `Backend/.env.development.local`
- **Format**: `sk_test_...` or `sk_live_...`
- **Purpose**: Server-side token verification

## Important Notes

1. **Never commit secret keys to git!**

   - `.env.development.local` should be in `.gitignore`
   - Secret keys should remain private

2. **Use matching keys**

   - Both keys must be from the SAME Clerk application
   - Test keys (`pk_test_` and `sk_test_`) work together
   - Live keys (`pk_live_` and `sk_live_`) work together

3. **Test vs Production**
   - Use test keys for development
   - Use live keys for production
   - Never mix test and live keys

## Troubleshooting

### "Failed to resolve JWK"

- **Cause**: Missing or invalid `CLERK_SECRET_KEY`
- **Fix**: Add correct secret key to `.env.development.local`

### "Invalid secret key"

- **Cause**: Wrong secret key format or from different app
- **Fix**: Copy the exact secret key from Clerk dashboard

### "Token verification still fails"

- **Cause**: Keys from different Clerk applications
- **Fix**: Ensure frontend publishable key and backend secret key are from same app

## Files Modified

- ✅ `Backend/.env.development.local` - Added `CLERK_SECRET_KEY`
- ✅ `Backend/middleware/clerk.middleware.js` - Updated to use `verifyToken` with secret key
- ✅ `Backend/config/env.js` - Already exports `CLERK_SECRET_KEY`

## Next Steps

1. [ ] Go to https://dashboard.clerk.com
2. [ ] Copy your Secret Key (starts with `sk_test_`)
3. [ ] Paste into `Backend/.env.development.local`
4. [ ] Backend will auto-restart
5. [ ] Test chat functionality

---

**Once you add the correct Clerk Secret Key, authentication will work!** 🔐
