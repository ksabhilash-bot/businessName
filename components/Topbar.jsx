"use client";
import { Bell, LogIn, LogOut, Loader2, AlertCircle, Save } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";
import { auth, provider } from "@/helpers/firebase";
import { signInWithPopup } from "firebase/auth";
import { Button } from "./ui/button";

const Navbar = () => {
  const {
    user,
    loading,
    error,
    isHydrated,
    setUser,
    setLoading,
    setError,
    clearError,
    logout,
  } = useAuthStore();

  const [mounted, setMounted] = useState(false);
  console.log("user", user);

  useEffect(() => {
    setMounted(true);
    // Clear errors after 5 seconds
    if (error) {
      const timer = setTimeout(clearError, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleLogin = async () => {
    setLoading(true);
    clearError();

    try {
      // Firebase popup login
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const idToken = await firebaseUser.getIdToken();

      // Send token to API
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      } else {
        throw new Error(data.error || "Login failed");
      }
    } catch (err) {
      let errorMessage = "Login failed. Please try again.";

      if (err.code === "auth/popup-closed-by-user") {
        errorMessage = "Login cancelled by user.";
      } else if (err.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your connection.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Prevent hydration mismatch
  if (!mounted || !isHydrated) {
    return (
      <nav className="fixed top-0 left-0 w-full bg-black text-white z-10 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4 md:p-6">
          <Link
            href="/"
            className="text-3xl md:text-4xl font-bold text-red-600"
          >
            NameForge
          </Link>
          <div className="w-6 h-6"></div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-black text-white z-10 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4 md:p-6">
          {/* Brand */}
          <Link
            href="/"
            className="text-3xl md:text-4xl font-bold text-red-600"
          >
            NameForge
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Bell className="hidden md:flex w-6 h-6 cursor-pointer hover:text-red-500 transition-colors" />

            {user ? (
              <div className="flex items-center gap-3">
                <img
                  src={user.picture}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-gray-600"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name
                    )}&background=ef4444&color=fff`;
                  }}
                />
                <Button>
                  <Link href={`/savedname`} alt="saved names">
                    <Save size={18} />
                  </Link>
                </Button>
                <span className="hidden md:block text-sm font-medium">
                  {user.name}
                </span>
                <button
                  onClick={logout}
                  disabled={loading}
                  className="flex items-center gap-1 bg-red-600 px-3 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <LogOut size={18} />
                  )}
                  <span className="hidden md:block">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                disabled={loading}
                className="flex items-center gap-1 bg-blue-600 px-3 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <LogIn size={18} />
                )}
                <span className="hidden md:block">Login</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Error Toast */}
      {error && (
        <div className="fixed top-20 right-4 z-50 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-sm">
          <AlertCircle size={20} />
          <span className="text-sm flex-1">{error}</span>
          <button
            onClick={clearError}
            className="text-white hover:text-gray-200 text-lg leading-none"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
