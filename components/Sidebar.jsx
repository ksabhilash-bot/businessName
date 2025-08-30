"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { nameStyle, Randomness } from "@/helpers/constant";
import useQueryStore from "@/store/queryStore";
import { Input } from "./ui/input";

const Sidebar = () => {
  const { query, setNameStyle, setRandomness, setQuery } = useQueryStore();

  const handleNameStyle = (nameStyle) => {
    setNameStyle(nameStyle);
  };

  const handleRandomness = (randomness) => {
    setRandomness(randomness);
  };

  const keywordChange = (e) => {
    setQuery({ keyword: e.target.value });
  };

  const descriptionChange = (e) => {
    setQuery({ description: e.target.value });
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardContent className="p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* Name Style Section */}
        <div>
          <h3 className="text-white text-lg sm:text-xl font-semibold mb-4">
            Name Style
          </h3>
          <RadioGroup
            value={`${query?.nameStyle || "Auto"}`}
            onValueChange={handleNameStyle}
            className="space-y-3"
          >
            {nameStyle.map((obj) => (
              <Label
                className="flex items-start gap-3 border border-gray-600 p-3 sm:p-4 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors"
                key={`namestyle${obj.id}`}
                htmlFor={`namestyle${obj.id}`}
              >
                <RadioGroupItem
                  value={obj.name}
                  id={`namestyle${obj.id}`}
                  className="mt-0.5 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-white font-medium text-sm sm:text-base">
                    {obj.name}
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">
                    {obj.description}
                  </p>
                </div>
              </Label>
            ))}
          </RadioGroup>
        </div>

        {/* Randomness Section */}
        <div>
          <h3 className="text-white text-lg sm:text-xl font-semibold mb-4">
            Randomness
          </h3>
          <RadioGroup
            value={`${query?.randomness || ""}`}
            onValueChange={handleRandomness}
            className="space-y-3"
          >
            {Randomness.map((obj) => (
              <Label
                className="flex items-start gap-3 border border-gray-600 p-3 sm:p-4 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors"
                key={`randomness${obj.id}`}
                htmlFor={`randomness${obj.id}`}
              >
                <RadioGroupItem
                  value={obj.name}
                  id={`randomness${obj.id}`}
                  className="mt-0.5 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-white font-medium text-sm sm:text-base">
                    {obj.name}
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">
                    {obj.description}
                  </p>
                </div>
              </Label>
            ))}
          </RadioGroup>
        </div>

        {/* Input Fields Section */}
        <div className="space-y-5">
          {/* Keyword Input */}
          <div>
            <Label className="text-white text-base sm:text-lg font-medium mb-2 block">
              Keyword
            </Label>
            <Input
              placeholder="Enter keyword..."
              className="text-white bg-gray-700 border-gray-600 focus:border-amber-500 focus:ring-amber-500/20 w-full"
              name="keyword"
              onChange={keywordChange}
              value={`${query?.keyword || ""}`}
            />
          </div>

          {/* Description Input */}
          <div>
            <Label className="text-white text-base sm:text-lg font-medium mb-2 block">
              Description
            </Label>
            <Input
              className="text-white bg-gray-700 border-gray-600 focus:border-amber-500 focus:ring-amber-500/20 w-full"
              onChange={descriptionChange}
              name="description"
              value={`${query?.description || ""}`}
              placeholder="Describe your business..."
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
