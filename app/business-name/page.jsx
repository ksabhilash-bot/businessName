"use client";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generatePrompt } from "@/helpers/prompt";
import useQueryStore from "@/store/queryStore";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { query, setQuery, resetQuery } = useQueryStore();
  const [loading, setLoading] = useState(false);

  const fetchBusinessName = async () => {
    try {
      setLoading(true);

      const prompt =
        generatePrompt(query) +
        "\nIMPORTANT: Return only valid JSON without any extra text, markdown, or explanation.";

      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      // Extract JSON
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in response");

      const parsed = JSON.parse(jsonMatch[0]);

      // Replace names directly
      setQuery({ names: parsed.names });
    } catch (error) {
      console.error("Error fetching business names:", error);
    } finally {
      setLoading(false);
    }
  };

  const clean = () => {
    resetQuery();
  };

  return (
    <div className="min-h-screen bg-gray-900 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="pt-8 pb-6 sm:pt-12 sm:pb-8">
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl text-center border-b border-gray-700 pb-4">
            Business Name Generator
          </h1>
        </div>

        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-8 pb-8">
        
          <div className="w-full xl:w-80 xl:flex-shrink-0">
            <Sidebar />
          </div>

          <div className="flex-1 min-w-0">
            <div className="border border-gray-700 rounded-lg p-4 sm:p-6 bg-gray-800/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-red-500 font-semibold text-xl sm:text-2xl">
                  Business Names
                </h2>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button
                    onClick={fetchBusinessName}
                    disabled={loading}
                    className="w-full sm:w-auto min-w-[120px]"
                  >
                    {loading ? "Generating..." : "Generate"}
                  </Button>
                  <Button
                    onClick={clean}
                    variant="outline"
                    className="w-full sm:w-auto text-white hover:text-black"
                  >
                    Clear
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
                {query?.names?.length > 0 ? (
                  query.names.map((name, index) => (
                    <div
                      key={index}
                      className="bg-gray-700 text-white p-3 sm:p-4 rounded-lg text-center hover:bg-gray-600 transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer break-words"
                    >
                      <span className="text-sm sm:text-base font-medium">
                        {name}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 sm:py-16">
                    <div className="text-gray-400 text-base sm:text-lg">
                      No names generated yet.
                    </div>
                    <div className="text-gray-500 text-sm mt-2">
                      Fill in the details and click "Generate" to get started.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
