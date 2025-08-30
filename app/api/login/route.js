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
        { success: false, error: "Token is required" },
        { status: 400 }
      );
    }

    // Verify Firebase ID Token
    let decoded;
    try {
      decoded = await getAuth().verifyIdToken(token);
    } catch (authError) {
      console.error("Token verification failed:", authError);
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    // Create or update user
    const user = await User.findOneAndUpdate(
      { googleId: decoded.uid },
      {
        googleId: decoded.uid,
        email: decoded.email,
        name: decoded.name || decoded.email.split("@")[0],
        picture: decoded.picture,
        lastLogin: new Date(),
      },
      { new: true, upsert: true }
    );

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
      user: sanitizedUser 
    });

  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}