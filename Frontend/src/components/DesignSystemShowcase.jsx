// Example component demonstrating the design system utilities

import { useTheme } from "../context/ThemeContext";
import { Button } from "./ui/Button";

const DesignSystemShowcase = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      {/* Header */}
      <header className="glass-strong rounded-2xl p-6 mb-8 shadow-soft animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Design System Showcase</h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl glass hover:shadow-medium transition-all duration-300"
          >
            {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </header>

      {/* Glassmorphism Examples */}
      <section className="mb-12 animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-6">Glassmorphism</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-xl p-6 shadow-soft">
            <h3 className="font-semibold mb-2">Standard Glass</h3>
            <p className="text-muted-foreground">Subtle glassmorphism effect</p>
          </div>
          <div className="glass-strong rounded-xl p-6 shadow-soft">
            <h3 className="font-semibold mb-2">Strong Glass</h3>
            <p className="text-muted-foreground">Heavy blur effect</p>
          </div>
          <div className="glass-subtle rounded-xl p-6 shadow-soft">
            <h3 className="font-semibold mb-2">Subtle Glass</h3>
            <p className="text-muted-foreground">Light transparency</p>
          </div>
        </div>
      </section>

      {/* Gradient Examples */}
      <section className="mb-12 animate-fade-in-up delay-100">
        <h2 className="text-2xl font-bold mb-6">Gradients</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="gradient-radial rounded-xl p-8 text-center shadow-medium">
            <h3 className="font-semibold text-xl">Radial Gradient</h3>
          </div>
          <div className="gradient-mesh rounded-xl p-8 text-center shadow-medium">
            <h3 className="font-semibold text-xl">Mesh Gradient</h3>
          </div>
        </div>
      </section>

      {/* Shadow Examples */}
      <section className="mb-12 animate-fade-in-up delay-200">
        <h2 className="text-2xl font-bold mb-6">Shadows</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-soft">
            <h4 className="font-semibold">Soft</h4>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-medium">
            <h4 className="font-semibold">Medium</h4>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-hard">
            <h4 className="font-semibold">Hard</h4>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-glow">
            <h4 className="font-semibold">Glow</h4>
          </div>
        </div>
      </section>

      {/* Animation Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Animations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card animate-fade-in">Fade In</div>
          <div className="card animate-fade-in-up">Fade Up</div>
          <div className="card animate-slide-in-left">Slide Left</div>
          <div className="card animate-scale-bounce">Scale Bounce</div>
          <div className="card animate-pulse-slow">Pulse Slow</div>
          <div className="card animate-glow">Glow</div>
          <div className="card animate-float">Float</div>
          <div className="card hover:animate-scale-in">Hover Scale</div>
        </div>
      </section>

      {/* Button Examples */}
      <section className="mb-12 animate-fade-in-up delay-300">
        <h2 className="text-2xl font-bold mb-6">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default" size="lg">
            Primary Button
          </Button>
          <Button variant="outline" size="lg">
            Outline Button
          </Button>
          <Button variant="ghost" size="lg">
            Ghost Button
          </Button>
          <button className="btn-primary">Custom Primary</button>
          <button className="btn-secondary">Custom Secondary</button>
        </div>
      </section>

      {/* Color Tokens */}
      <section className="mb-12 animate-fade-in-up delay-400">
        <h2 className="text-2xl font-bold mb-6">Color Tokens</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-background border border-border rounded-xl p-4">
            <div className="font-semibold">Background</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="font-semibold">Card</div>
          </div>
          <div className="bg-primary text-primary-foreground rounded-xl p-4">
            <div className="font-semibold">Primary</div>
          </div>
          <div className="bg-secondary text-secondary-foreground rounded-xl p-4">
            <div className="font-semibold">Secondary</div>
          </div>
          <div className="bg-muted text-muted-foreground rounded-xl p-4">
            <div className="font-semibold">Muted</div>
          </div>
          <div className="bg-accent text-accent-foreground rounded-xl p-4">
            <div className="font-semibold">Accent</div>
          </div>
          <div className="bg-input border border-border rounded-xl p-4">
            <div className="font-semibold">Input</div>
          </div>
          <div className="border-2 border-ring rounded-xl p-4">
            <div className="font-semibold">Ring</div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12 animate-fade-in-up delay-500">
        <h2 className="text-2xl font-bold mb-6">Typography (Outfit Font)</h2>
        <div className="space-y-4">
          <p className="text-6xl font-bold">Heading 1</p>
          <p className="text-4xl font-semibold">Heading 2</p>
          <p className="text-2xl font-medium">Heading 3</p>
          <p className="text-xl font-normal">Body Large</p>
          <p className="text-base font-normal">Body Regular</p>
          <p className="text-sm font-normal text-muted-foreground">
            Body Small
          </p>
        </div>
      </section>
    </div>
  );
};

export default DesignSystemShowcase;
