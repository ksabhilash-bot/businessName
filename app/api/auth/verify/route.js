import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import connectDB from "@/helpers/mongo";
import User from "@/Schema/user";
import admin from "firebase-admin";

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export async function POST(req) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token required" },
        { status: 400 }
      );
    }

    // Verify token
    const decoded = await getAuth().verifyIdToken(token);

    // Connect to DB and get user
    await connectDB();

    const user = await User.findOne({ googleId: decoded.uid });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Return sanitized user data
    const sanitizedUser = {
      id: user._id,
      googleId: user.googleId,
      email: user.email,
      name: user.name,
      picture: user.picture,
      lastLogin: user.lastLogin,
    };

    return NextResponse.json({
      success: true,
      user: sanitizedUser,
    });
  } catch (err) {
    console.error("Auth verification error:", err);

    if (err.code === "auth/id-token-expired") {
      return NextResponse.json(
        { success: false, error: "Token expired" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Verification failed" },
      { status: 401 }
    );
  }
}
