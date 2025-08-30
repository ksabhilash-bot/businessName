import Search from "@/components/Search";
import { Filter, Heart, Lightbulb, Sparkles, Target, Zap } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Lightbulb className="text-red-400 w-6 h-6 sm:w-8 sm:h-8" />,
      title: "AI-Powered Generation",
      text: `Harness the power of advanced AI to generate unique, creative business names tailored to your industry. Our intelligent algorithm considers context, trends, and brandability to deliver names that resonate with your target audience.`,
    },
    {
      icon: <Filter className="text-red-500 w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Smart Filtering",
      text: `Refine your results with intelligent filtering options. Sort by style, length, industry relevance, and availability. Find the perfect name that matches your vision and business requirements effortlessly.`,
    },
    {
      icon: <Target className="text-red-600 w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Industry-Focused",
      text: `Get names specifically crafted for your industry. Whether you're in tech, healthcare, retail, or any other sector, our AI understands industry nuances to generate relevant and impactful business names.`,
    },
  ];

  const stats = [
    { number: "50K+", label: "Names Generated" },
    { number: "10K+", label: "Happy Users" },
    { number: "99%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-red-600/5 blur-3xl"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-red-600/10 rounded-full blur-2xl"></div>

        <div className="relative px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16">
          <div className="max-w-7xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-full px-4 py-2 mb-6 sm:mb-8">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span className="text-gray-300 text-sm font-medium">
                Powered by Advanced AI
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
              <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-300 bg-clip-text text-transparent">
                Business Name
              </span>
              <br />
              <span className="text-white">Generator with AI</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed">
              Create memorable, brandable business names in seconds. Our AI
              analyzes your industry, style preferences, and market trends to
              generate the perfect name for your venture.
            </p>

            {/* Search Component */}
            <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
              <Search />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto mb-16 sm:mb-24">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              Why Choose Our AI Generator?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Experience the future of business naming with cutting-edge AI
              technology and intelligent features designed for modern
              entrepreneurs.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 hover:bg-gray-900 hover:border-red-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-1"
              >
                {/* Icon container */}
                <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gray-800/50 rounded-xl mb-6 group-hover:bg-red-500/10 group-hover:border group-hover:border-red-500/20 transition-all duration-300">
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed line-clamp-4 group-hover:text-gray-200 transition-colors duration-300">
                    {feature.text}
                  </p>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/3 to-red-600/3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 sm:mt-24">
            <div className="bg-gray-900/50 rounded-3xl p-8 sm:p-12 border border-gray-800 backdrop-blur-sm hover:border-red-500/20 transition-colors duration-300">
              <Zap className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
                Ready to Name Your Business?
              </h3>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of entrepreneurs who've found their perfect
                business name. Start generating unique, memorable names in just
                a few clicks.
              </p>
              <button className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-red-500 hover:to-red-400 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105 border border-red-500/20">
                <Sparkles className="w-5 h-5" />
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
