"use client";
import React, { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  BookmarkIcon,
  Copy,
  ExternalLink,
  Heart,
  Star,
  Trash2,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SavedNamesPage = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect unauthorized users
  useEffect(() => {
    if (!user) {
      router.replace("/"); // redirect
    }
  }, [user, router]);

  // Fetch saved names
  useEffect(() => {
    if (!user) return;

    const fetchSavedNames = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/savename?email=${user.email}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch names");

        const savedNames = data.names?.[0]?.savedNames || [];
        setNames(savedNames);
      } catch (error) {
        console.error("Error fetching saved names:", error);
        toast.error("Failed to load saved names");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedNames();
  }, [user]);

  // Copy name to clipboard
  const copyToClipboard = async (name) => {
    try {
      await navigator.clipboard.writeText(name);
      toast.success("Name copied to clipboard!");
    } catch {
      toast.error("Failed to copy name");
    }
  };

  // Delete a saved name
  const deleteName = async (nameId) => {
    try {
      const res = await fetch("/api/savename", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: nameId, email: user.email }),
      });

      if (!res.ok) throw new Error("Failed to delete name");

      setNames((prev) => prev.filter((item) => item._id !== nameId));
      toast.success("Name deleted successfully!");
    } catch {
      toast.error("Failed to delete name");
    }
  };

  if (!user) {
    return null; // prevents flashing before redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-amber-500/20 rounded-full">
              <BookmarkIcon className="h-8 w-8 text-amber-500" />
            </div>
            <h1 className="text-4xl font-bold text-white">Your Saved Names</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Manage and explore your collection of business names
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-amber-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                Loading your saved names...
              </p>
            </div>
          </div>
        ) : names.length > 0 ? (
          <>
            {/* Stats Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span>
                  <Star className="inline h-4 w-4 mr-1 text-amber-500" />
                  {names.length} Names Saved
                </span>
                <span>
                  <Heart className="inline h-4 w-4 mr-1 text-red-500" />
                  Your Collection
                </span>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="text-gray-300 border-gray-600 hover:bg-gray-700 mt-2 sm:mt-0"
                onClick={() => {
                  const namesText = names
                    .map((item) => `${item.name} (${item.keyword})`)
                    .join("\n");
                  navigator.clipboard.writeText(namesText);
                  toast.success("All names copied to clipboard!");
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>

            {/* Names Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {names.map((item, index) => (
                <Card
                  key={item._id}
                  className="group bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 transform hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2 break-words leading-tight">
                          {item.name}
                        </h3>
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {item.keyword}
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-500 opacity-50">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(item.name)}
                        className="flex-1 text-gray-400 hover:text-white hover:bg-gray-600"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteName(item._id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          // Empty State
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="p-6 bg-gray-800/30 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <BookmarkIcon className="h-12 w-12 text-gray-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                No Saved Names Yet
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Start generating business names and save your favorites to build
                your collection.
              </p>
              <Button
                onClick={() => router.push("/")}
                className="bg-amber-500 hover:bg-amber-600 text-black font-medium"
              >
                Generate Names Now
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedNamesPage;
