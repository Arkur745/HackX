# Theme System Visual Guide

## 🎨 Light Mode vs Dark Mode Comparison

### Color Palette

```
┌─────────────────────────────────────────────────────────────────┐
│                     LIGHT MODE (MindTrack Style)                │
├─────────────────────────────────────────────────────────────────┤
│ Background    │ #FFFFFF → #FAFAFA (radial gradient)            │
│ Foreground    │ #000000 (pure black)                           │
│ Card          │ #FFFFFF (pure white)                           │
│ Primary       │ #000000 (black buttons)                        │
│ Secondary     │ #F5F5F5 (gray-100)                             │
│ Muted         │ #737373 (gray-500)                             │
│ Border        │ #E5E5E5 (gray-200)                             │
│ Glass BG      │ rgba(255, 255, 255, 0.9)                       │
│ Glass Border  │ rgba(0, 0, 0, 0.08)                            │
│ Shadow        │ rgba(0, 0, 0, 0.06) - soft black               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                  DARK MODE (Black Glass Aesthetic)              │
├─────────────────────────────────────────────────────────────────┤
│ Background    │ #000000 (pure black)                           │
│ Foreground    │ #FFFFFF (pure white)                           │
│ Card          │ #171717 (gray-900)                             │
│ Primary       │ #FFFFFF (white buttons)                        │
│ Secondary     │ #262626 (gray-800)                             │
│ Muted         │ #A3A3A3 (gray-400)                             │
│ Border        │ #27272A (zinc-800)                             │
│ Glass BG      │ rgba(0, 0, 0, 0.7)                             │
│ Glass Border  │ rgba(255, 255, 255, 0.1)                       │
│ Shadow        │ rgba(255, 255, 255, 0.05) - soft white         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🖼️ Component Comparison

### Navbar

#### Light Mode

```
┌────────────────────────────────────────────────────────────┐
│  [❤️] HealthAI     Home  Dashboard  Reports   [☀️]  Login │
│                                                            │
│  White BG (90% opacity) + backdrop blur                   │
│  Black text, gray-200 border                              │
└────────────────────────────────────────────────────────────┘
```

#### Dark Mode

```
┌────────────────────────────────────────────────────────────┐
│  [🖤] HealthAI     Home  Dashboard  Reports   [🌙]  Login │
│                                                            │
│  Black BG (50% opacity) + backdrop blur                   │
│  White text, white/10 border                              │
└────────────────────────────────────────────────────────────┘
```

---

### Hero Section

#### Light Mode

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│         🩺 AI-Powered Mental Health Platform               │
│                                                             │
│              Track your mood.                               │
│           Understand your mind.                             │
│                                                             │
│   Daily check-ins analyzed by AI for better mental         │
│   health insights. Connect patients and doctors            │
│   for continuous care.                                      │
│                                                             │
│     [◼️ I'm a Patient →]  [□ I'm a Doctor]                 │
│                                                             │
│  Background: radial-gradient(#FAFAFA → #FFF)               │
│  Badge: White pill with black border                       │
│  Buttons: Black filled, white outlined                     │
│  Text: Black on white                                      │
└─────────────────────────────────────────────────────────────┘
```

#### Dark Mode

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│         🩺 AI-Powered Mental Health Platform               │
│                                                             │
│              Track your mood.                               │
│           Understand your mind.                             │
│                                                             │
│   Daily check-ins analyzed by AI for better mental         │
│   health insights. Connect patients and doctors            │
│   for continuous care.                                      │
│                                                             │
│     [◻️ I'm a Patient →]  [◼️ I'm a Doctor]                 │
│                                                             │
│  Background: Pure black with gradient blur circles         │
│  Badge: Black pill with white border                       │
│  Buttons: White filled, black outlined                     │
│  Text: White on black                                      │
└─────────────────────────────────────────────────────────────┘
```

---

### Chat Interface

#### Light Mode

```
┌──────────────┬────────────────────────────────────────────┐
│              │  [☰] Health Assistant      [🟢 Online]    │
│ ┌──────────┐ ├────────────────────────────────────────────┤
│ │ + New    │ │                                            │
│ │   Chat   │ │  [🤖] Bot: Hello! How can I help?         │
│ └──────────┘ │                            [3:45 PM]       │
│              │                                            │
│ 🔍 Search... │            User: I need help [👤]          │
│              │                            [3:46 PM]       │
│ ● Medical    │                                            │
│   Advice...  │  [🤖] Bot: Sure! What do you need?        │
│   Today      │                            [3:46 PM]       │
│              │                                            │
│ White sidebar│  White main panel                         │
│ Light glass  │  Light messages                           │
│ Black text   │  Black text                               │
└──────────────┴────────────────────────────────────────────┘
```

#### Dark Mode

```
┌──────────────┬────────────────────────────────────────────┐
│              │  [☰] Health Assistant      [🟢 Online]    │
│ ┌──────────┐ ├────────────────────────────────────────────┤
│ │ + New    │ │                                            │
│ │   Chat   │ │  [🤖] Bot: Hello! How can I help?         │
│ └──────────┘ │                            [3:45 PM]       │
│              │                                            │
│ 🔍 Search... │            User: I need help [👤]          │
│              │                            [3:46 PM]       │
│ ● Medical    │                                            │
│   Advice...  │  [🤖] Bot: Sure! What do you need?        │
│   Today      │                            [3:46 PM]       │
│              │                                            │
│ Black sidebar│  Black main panel                         │
│ Dark glass   │  Glass messages                           │
│ White text   │  White text                               │
└──────────────┴────────────────────────────────────────────┘
```

---

### Dashboard Cards

#### Light Mode

```
┌─────────────────────────────────────────────────────────┐
│  📊 Your Health Dashboard                              │
│                                                         │
│  [💬 Chat] [📄 Reports] [📅 Appointments]              │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Schedule New Appointment                       │   │
│  │  ───────────────────────────────────────────    │   │
│  │  Doctor: _____________________                  │   │
│  │  Date: _______  Time: _______                   │   │
│  │  [Cancel] [Schedule]                            │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  White BG, black text, soft shadows                    │
│  Cards: white with gray-200 borders                    │
└─────────────────────────────────────────────────────────┘
```

#### Dark Mode

```
┌─────────────────────────────────────────────────────────┐
│  📊 Your Health Dashboard                              │
│                                                         │
│  [💬 Chat] [📄 Reports] [📅 Appointments]              │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Schedule New Appointment                       │   │
│  │  ───────────────────────────────────────────    │   │
│  │  Doctor: _____________________                  │   │
│  │  Date: _______  Time: _______                   │   │
│  │  [Cancel] [Schedule]                            │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Black BG, white text, soft white glow                 │
│  Cards: gray-900 with white/10 borders                 │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Button Styles

### Light Mode

```
Primary Button:    [⬛ Submit]     (Black BG, White text)
Secondary Button:  [⬜ Cancel]     (White BG, Black text, Black border)
Ghost Button:      [ Settings ]   (Transparent, Black text)
```

### Dark Mode

```
Primary Button:    [⬜ Submit]     (White BG, Black text)
Secondary Button:  [⬛ Cancel]     (Black BG, White text, White border)
Ghost Button:      [ Settings ]   (Transparent, White text)
```

---

## 🔄 Toggle Animation

```
Light Mode Toggle:
┌──────┐
│  ☀️  │  → Click →
└──────┘
           Rotate 90° + Fade out

           ↓

┌──────┐
│  🌙  │  (Dark Mode Active)
└──────┘

Dark Mode Toggle:
┌──────┐
│  🌙  │  → Click →
└──────┘
           Rotate -90° + Fade out

           ↓

┌──────┐
│  ☀️  │  (Light Mode Active)
└──────┘
```

**Animation Details**:

- Duration: 300ms
- Timing: ease-in-out
- Properties: `rotate`, `scale`, `opacity`
- Smooth interpolation between states

---

## 📱 Responsive Behavior

### Desktop (≥ 768px)

- Toggle button in navbar (top-right)
- Fixed size: 40x40px
- Hover effect: `bg-muted`

### Mobile (< 768px)

- Toggle button in mobile menu
- Full-width display option
- Touch-optimized (48x48px minimum)

---

## ✨ Transition Timeline

```
User clicks toggle
      ↓
localStorage updated (immediate)
      ↓
Theme state changes (immediate)
      ↓
HTML class updated: .dark ⇄ .light (immediate)
      ↓
CSS variables transition (500ms)
      ↓
  - background-color
  - color
  - border-color
  - backdrop-filter
  - box-shadow
      ↓
Theme fully applied (0.5s total)
```

---

## 🎨 Glassmorphism Comparison

### Light Mode Glass

```
background: rgba(255, 255, 255, 0.9)
backdrop-filter: blur(12px)
border: 1px solid rgba(0, 0, 0, 0.08)
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06)
```

**Effect**: Frosted white glass with subtle black borders

### Dark Mode Glass

```
background: rgba(0, 0, 0, 0.7)
backdrop-filter: blur(12px)
border: 1px solid rgba(255, 255, 255, 0.1)
box-shadow: 0 8px 32px rgba(255, 255, 255, 0.05)
```

**Effect**: Frosted black glass with subtle white borders

---

## 🏆 MindTrack Comparison

| Feature    | MindTrack (Light)      | HealthAI (Light)       | Match? |
| ---------- | ---------------------- | ---------------------- | ------ |
| Background | White radial gradient  | White radial gradient  | ✅     |
| Text       | Black (#000)           | Black (#000)           | ✅     |
| Cards      | White with soft shadow | White with soft shadow | ✅     |
| Buttons    | Black filled           | Black filled           | ✅     |
| Borders    | Subtle gray            | Subtle gray-200        | ✅     |
| Badge      | White pill             | White pill             | ✅     |
| Typography | Clean, bold            | Clean, bold (Outfit)   | ✅     |
| Spacing    | Generous               | Generous               | ✅     |
| Shadows    | Soft, minimal          | Soft, minimal          | ✅     |

**Result**: Perfect match! ✨

---

This visual guide provides a comprehensive comparison of the theme system across all major UI states and components.
