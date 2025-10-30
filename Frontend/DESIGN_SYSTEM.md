# Design System Documentation

## 🎨 Overview

This design system provides a comprehensive set of utilities for building modern, responsive UIs with support for light/dark themes, glassmorphism effects, gradients, animations, and custom shadows.

---

## 🌗 Color Variables (Light & Dark Mode)

### CSS Variables

All colors are defined as CSS custom properties that automatically switch based on the theme:

```css
/* Access in CSS */
background-color: rgb(var(--color-background));
color: rgb(var(--color-foreground));

/* With opacity */
background-color: rgb(var(--color-primary) / 0.5);
```

### Tailwind Utilities

```jsx
// Background colors
<div className="bg-background text-foreground">
<div className="bg-card text-card-foreground">
<div className="bg-primary text-primary-foreground">
<div className="bg-secondary text-secondary-foreground">
<div className="bg-muted text-muted-foreground">
<div className="bg-accent text-accent-foreground">

// With opacity
<div className="bg-primary/50">  // 50% opacity
<div className="border-border/20"> // 20% opacity border
```

### Available Color Tokens

- **background** / **foreground** - Main page colors
- **card** / **card-foreground** - Card component colors
- **primary** / **primary-foreground** - Primary action colors
- **secondary** / **secondary-foreground** - Secondary action colors
- **muted** / **muted-foreground** - Muted/disabled colors
- **accent** / **accent-foreground** - Accent/highlight colors
- **border** - Border colors
- **input** - Input field backgrounds
- **ring** - Focus ring colors

---

## ✨ Glassmorphism Utilities

### Pre-built Classes

```jsx
// Standard glass effect
<div className="glass rounded-xl p-6">
  Content with glassmorphism
</div>

// Strong blur effect
<div className="glass-strong rounded-xl p-6">
  Heavily blurred background
</div>

// Subtle glass effect
<div className="glass-subtle rounded-xl p-6">
  Light glassmorphism
</div>
```

### Manual Glassmorphism

```jsx
<div className="backdrop-blur-lg bg-white/10 dark:bg-black/10 border border-white/20">
  Custom glass effect
</div>
```

### Backdrop Blur Scales

- `backdrop-blur-xs` - 2px
- `backdrop-blur-sm` - 4px
- `backdrop-blur-md` - 8px
- `backdrop-blur-lg` - 12px (default)
- `backdrop-blur-xl` - 20px
- `backdrop-blur-2xl` - 40px

---

## 🌈 Gradient Utilities

### Radial Gradients

```jsx
// Using CSS class
<div className="gradient-radial min-h-screen">
  Radial gradient background
</div>

// Using Tailwind
<div className="bg-gradient-radial from-gray-100 via-white to-gray-200">
  Custom radial gradient
</div>
```

### Mesh Gradient

```jsx
<div className="gradient-mesh min-h-screen">
  Complex mesh gradient background
</div>
```

### Gradient Glow Border

```jsx
<div className="gradient-glow rounded-xl p-6">
  Element with glowing gradient border
</div>
```

### Linear Gradients

```jsx
// Top to bottom
<div className="bg-linear-to-b from-primary to-secondary">

// Left to right
<div className="bg-linear-to-r from-blue-500 to-purple-600">

// Diagonal
<div className="bg-linear-to-br from-pink-500 via-red-500 to-yellow-500">
```

---

## 🎭 Shadow Utilities

### Pre-built Shadow Layers

```jsx
// Soft shadow (subtle elevation)
<div className="shadow-soft rounded-xl">
  Subtle shadow
</div>

// Medium shadow (standard cards)
<div className="shadow-medium rounded-xl">
  Medium shadow
</div>

// Hard shadow (prominent elements)
<div className="shadow-hard rounded-xl">
  Strong shadow
</div>

// Glow effect (attention-grabbing)
<div className="shadow-glow rounded-xl">
  Glowing shadow
</div>
```

### Combining Shadows

```jsx
<div className="shadow-soft hover:shadow-hard transition-shadow duration-300">
  Shadow changes on hover
</div>
```

**Note:** All shadows automatically adapt to dark mode with appropriate colors.

---

## 🎬 Animation Utilities

### Fade Animations

```jsx
// Simple fade in
<div className="animate-fade-in">
  Fades in
</div>

// Fade in from bottom
<div className="animate-fade-in-up">
  Fades in and moves up
</div>

// Fade in from top
<div className="animate-fade-in-down">
  Fades in and moves down
</div>
```

### Slide Animations

```jsx
// Slide in from left
<div className="animate-slide-in-left">
  Slides from left
</div>

// Slide in from right
<div className="animate-slide-in-right">
  Slides from right
</div>
```

### Scale Animations

```jsx
// Simple scale in
<div className="animate-scale-in">
  Scales up
</div>

// Scale with bounce
<div className="animate-scale-bounce">
  Scales with bounce effect
</div>
```

### Other Animations

```jsx
// Slow pulse
<div className="animate-pulse-slow">
  Slow pulsing
</div>

// Glow effect
<div className="animate-glow">
  Glowing animation
</div>

// Float effect
<div className="animate-float">
  Floating up and down
</div>

// Shimmer effect
<div className="animate-shimmer">
  Shimmer animation
</div>
```

### Animation Delays

```jsx
<div className="animate-fade-in-up delay-100">Delay 100ms</div>
<div className="animate-fade-in-up delay-200">Delay 200ms</div>
<div className="animate-fade-in-up delay-300">Delay 300ms</div>
```

---

## 🔤 Typography (Outfit Font)

### Font Family

```jsx
// Default (already applied to body)
<p className="font-sans">Text in Outfit font</p>

// Explicit Outfit
<h1 className="font-outfit">Explicit Outfit font</h1>
```

### Font Weights

```jsx
<p className="font-thin">      {/* 100 */}</p>
<p className="font-extralight"> {/* 200 */}</p>
<p className="font-light">     {/* 300 */}</p>
<p className="font-normal">    {/* 400 */}</p>
<p className="font-medium">    {/* 500 */}</p>
<p className="font-semibold">  {/* 600 */}</p>
<p className="font-bold">      {/* 700 */}</p>
<p className="font-extrabold"> {/* 800 */}</p>
<p className="font-black">     {/* 900 */}</p>
```

---

## 🎯 Complete Component Examples

### Glassmorphic Card

```jsx
<div className="glass rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in-up">
  <h3 className="text-xl font-semibold mb-2">Card Title</h3>
  <p className="text-muted-foreground">Card content with glassmorphism</p>
</div>
```

### Hero Section with Gradient

```jsx
<section className="gradient-radial min-h-screen flex items-center justify-center">
  <div className="text-center space-y-6 animate-fade-in">
    <h1 className="text-6xl font-bold">Welcome</h1>
    <p className="text-xl text-muted-foreground">Subtitle text</p>
  </div>
</section>
```

### Animated Button

```jsx
<button
  className="bg-primary text-primary-foreground px-6 py-3 rounded-xl 
                   shadow-medium hover:shadow-hard hover:scale-105 
                   active:scale-95 transition-all duration-300"
>
  Click Me
</button>
```

### Feature Card Grid

```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {features.map((feature, index) => (
    <div
      key={index}
      className="card shadow-soft hover:shadow-medium 
                 animate-fade-in-up transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </div>
  ))}
</div>
```

### Glassmorphic Navbar

```jsx
<nav className="glass-strong fixed top-0 left-0 right-0 z-50 px-6 py-4">
  <div className="flex items-center justify-between">
    <div className="font-bold text-xl">Logo</div>
    <div className="flex gap-4">
      <a href="#" className="hover:text-primary transition-colors">
        Home
      </a>
      <a href="#" className="hover:text-primary transition-colors">
        About
      </a>
    </div>
  </div>
</nav>
```

---

## 🎨 Theme Toggle Integration

The theme system works with the `ThemeContext`:

```jsx
import { useTheme } from "./context/ThemeContext";

function Component() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>{isDark ? "☀️ Light" : "🌙 Dark"}</button>
  );
}
```

---

## 🚀 Best Practices

1. **Use CSS Variables** - They automatically adapt to theme changes
2. **Combine Utilities** - Mix glassmorphism with shadows and animations
3. **Smooth Transitions** - Always add `transition-all duration-300` for theme changes
4. **Animation Timing** - Use delays for staggered animations
5. **Accessibility** - Ensure sufficient contrast in both themes
6. **Performance** - Use `will-change` sparingly for heavy animations

---

## 📦 Quick Reference

### Common Patterns

```jsx
// Glassmorphic card with animation
className = "glass rounded-xl p-6 shadow-soft animate-fade-in-up";

// Gradient background
className = "gradient-radial from-primary/10 to-secondary/10";

// Interactive button
className =
  "bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-medium hover:shadow-hard hover:scale-105 active:scale-95 transition-all duration-300";

// Responsive text
className = "text-2xl md:text-4xl lg:text-6xl font-bold";

// Theme-aware colors
className = "bg-background text-foreground border border-border";
```

---

## 🔧 Customization

To customize colors, edit the CSS variables in `src/index.css`:

```css
:root {
  --color-primary: 0 0 0; /* RGB values */
}

.dark {
  --color-primary: 255 255 255;
}
```

To add custom animations, extend `tailwind.config.js`:

```js
keyframes: {
  myAnimation: {
    '0%': { /* ... */ },
    '100%': { /* ... */ }
  }
}
```

---

**Happy Building! 🎉**
