import { useNavigate } from "react-router-dom";
import { ArrowRight, Bot } from "lucide-react";
import { Button } from "./ui/Button";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-white dark:bg-black text-black dark:text-white bg-linear-to-b from-gray-50 to-white dark:from-black dark:via-zinc-950 dark:to-black transition-colors duration-300">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-gray-300 dark:border-white/20 bg-gray-100/80 dark:bg-white/5 backdrop-blur-sm animate-fade-in">
        <Bot className="w-4 h-4" />
        <span className="text-sm font-medium">
          AI-Powered Digital Health Assistant
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in">
        Understand Your Health.
        <br />
        <span className="text-gray-600 dark:text-gray-300">
          Talk to AI. Get Answers.
        </span>
      </h1>

      {/* Subheading */}
      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mb-12 leading-relaxed animate-fade-in">
        Upload medical reports, chat with our AI assistant via voice or text,
        and book appointments—all in one place. Available in English and Hindi.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in">
        <Button
          variant="default"
          size="lg"
          onClick={() => navigate("/dashboard")}
          className="group font-semibold text-base bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100"
        >
          Start Chatting
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate("/login")}
          className="font-semibold text-base border-2 border-gray-300 dark:border-white/20 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
        >
          Sign In / Register
        </Button>
      </div>

      {/* Floating Elements for Visual Interest */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-gray-300/20 dark:bg-white/5 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gray-300/20 dark:bg-white/5 rounded-full blur-3xl animate-pulse-slow delay-1000 pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
