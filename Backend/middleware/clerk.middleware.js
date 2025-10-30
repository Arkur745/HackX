import { clerkClient, verifyToken } from "@clerk/clerk-sdk-node";
import { CLERK_SECRET_KEY } from "../config/env.js";

// Verify Clerk is configured
if (!CLERK_SECRET_KEY) {
  console.warn("⚠️  CLERK_SECRET_KEY not set - authentication will fail!");
}

/**
 * Middleware to verify Clerk JWT tokens
 * This middleware extracts the token from the Authorization header
 * and verifies it with Clerk
 */
export const requireAuth = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "No authentication token provided",
      });
    }

    // Extract the token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify the token with Clerk
    try {
      // Use the verifyToken function directly with the secret key
      const verified = await verifyToken(token, {
        secretKey: CLERK_SECRET_KEY,
      });

      // Get the user ID from the verified token
      const userId = verified.sub;

      // Attach user ID to request object for use in route handlers
      req.userId = userId;
      req.clerkSession = verified;

      next();
    } catch (verifyError) {
      console.error("Token verification failed:", verifyError.message);
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid or expired token",
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Authentication failed",
    });
  }
};

/**
 * Optional middleware to extract user info but not require authentication
 * Useful for endpoints that work differently for authenticated vs non-authenticated users
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);

      try {
        const verified = await verifyToken(token, {
          secretKey: CLERK_SECRET_KEY,
        });
        req.userId = verified.sub;
        req.clerkSession = verified;
      } catch (error) {
        // Token invalid but we continue anyway since it's optional
        console.log("Optional auth: Invalid token, continuing without auth");
      }
    }

    next();
  } catch (error) {
    // Don't fail the request, just continue without auth
    next();
  }
};

/**
 * Middleware to get full user details from Clerk
 * Must be used after requireAuth middleware
 */
export const getUserDetails = async (req, res, next) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "User ID not found in request",
      });
    }

    const user = await clerkClient.users.getUser(req.userId);
    req.user = user;

    next();
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch user details",
    });
  }
};
