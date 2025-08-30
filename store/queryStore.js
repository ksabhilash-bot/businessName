"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useQueryStore = create(
  persist(
    (set) => ({
      query: {
        keyword: "",
        description: "Something modern",
        nameStyle: "Auto",
        randomness: "Medium",
        names: [],
      },
      setQuery: (newValues) =>
        set((state) => ({
          query: { ...state.query, ...newValues }, // merge changes
        })),
      resetQuery: () =>
        set({
          query: {
            keyword: "",
            description: "",
            nameStyle: "",
            randomness: "",
            names: [],
          },
        }),
      setNameStyle: (nameStyle) =>
        set((state) => ({ query: { ...state.query, nameStyle } })),
      setRandomness: (randomness) =>
        set((state) => ({ query: { ...state.query, randomness } })),
    }),
    {
      name: "query-storage",
      partialize: (state) => ({ query: state.query }),
    }
  )
);

export default useQueryStore;
