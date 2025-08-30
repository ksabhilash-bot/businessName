"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth } from "@/helpers/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      isHydrated: false,

      setUser: (userData) =>
        set({
          user: userData,
          error: null,
          loading: false,
        }),

      setLoading: (loading) => set({ loading }),

      setError: (error) =>
        set({
          error,
          loading: false,
        }),

      clearError: () => set({ error: null }),

      logout: async () => {
        set({ loading: true });
        try {
          await signOut(auth);
          set({ user: null, error: null, loading: false });
        } catch (err) {
          set({
            error: "Logout failed. Please try again.",
            loading: false,
          });
        }
      },

      // Initialize Firebase auth state listener
      initialize: () => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            // Sync with backend if user exists in Firebase
            try {
              const idToken = await firebaseUser.getIdToken();
              const response = await fetch("/api/auth/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: idToken }),
              });

              if (response.ok) {
                const data = await response.json();
                if (data.success) {
                  set({ user: data.user, loading: false });
                  return;
                }
              }
            } catch (error) {
              console.error("Auth sync failed:", error);
            }
          }
          set({ user: null, loading: false });
        });

        return unsubscribe;
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state.isHydrated = true;
        // Initialize auth listener after hydration
        setTimeout(() => state.initialize(), 0);
      },
    }
  )
);

export default useAuthStore;
