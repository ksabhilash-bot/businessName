import Search from "@/components/Search";
import { Filter, Heart, Lightbulb } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Lightbulb className="text-primary w-8 h-8" />,
      title: "Generate Idea",
      text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ratione
      velit culpa eos reprehenderit iste, veritatis quis adipisci consequuntur...`,
    },
    {
      icon: <Filter className="text-primary w-8 h-8" />,
      title: "Filter Result",
      text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ratione
      velit culpa eos reprehenderit iste, veritatis quis adipisci consequuntur...`,
    },
    {
      icon: <Heart className="text-primary w-8 h-8" />,
      title: "Save Favorites",
      text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ratione
      velit culpa eos reprehenderit iste, veritatis quis adipisci consequuntur...`,
    },
  ];

  return (
    <div className="w-full p-4 min-h-screen flex flex-col items-center gap-10">
      {/* Heading */}
      <h1 className="text-white text-2xl md:text-4xl font-bold text-center">
        Business Name Generator with AI
      </h1>

      {/* Search Bar */}
      <Search />

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-gray-900 rounded-xl p-6 flex flex-col gap-4 shadow-lg"
          >
            <div className="flex items-center gap-3">
              {feature.icon}
              <h4 className="text-white text-lg font-semibold">{feature.title}</h4>
            </div>
            <p className="text-white/80 overflow-y-scroll scrollbar-hide max-h-48 pr-2">
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
