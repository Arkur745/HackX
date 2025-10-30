# ChatGPT-Style Layout Structure

## 🖼️ Visual Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                         Navbar (Top)                            │
│  HealthAI Logo    [Theme Toggle]    [Login/Signup]             │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                      Dashboard Header                           │
│  Your Health Dashboard                                          │
│  [💬 Chat]  [📄 Reports]  [📅 Appointments]                    │
└─────────────────────────────────────────────────────────────────┘
┌──────────────────┬──────────────────────────────────────────────┐
│                  │                                              │
│   ChatSidebar    │         Main Chat Panel                      │
│   (320px wide)   │         (Flex-1)                             │
│                  │                                              │
│ ┌──────────────┐ │ ┌──────────────────────────────────────────┐ │
│ │ [+ New Chat] │ │ │ [☰] Health Assistant     [🟢 Online]    │ │
│ └──────────────┘ │ └──────────────────────────────────────────┘ │
│                  │                                              │
│ ┌──────────────┐ │ ┌──────────────────────────────────────────┐ │
│ │ 🔍 Search... │ │ │                                          │ │
│ └──────────────┘ │ │  [🤖] Bot: Hello! How can I help?       │ │
│                  │ │                              [3:45 PM]   │ │
│ ┌──────────────┐ │ │                                          │ │
│ │ ● Medical    │ │ │                   User: I need help [👤] │ │
│ │   Advice...  │ │ │                              [3:46 PM]   │ │
│ │   Today      │ │ │                                          │ │
│ └──────────────┘ │ │  [🤖] Bot: Sure! What do you need?      │ │
│                  │ │                              [3:46 PM]   │ │
│ ┌──────────────┐ │ │                                          │ │
│ │   Appointment│ │ │                                          │ │
│ │   Booking... │ │ │                                          │ │
│ │   Yesterday  │ │ │                                          │ │
│ └──────────────┘ │ │                                          │ │
│                  │ │                                          │ │
│ ┌──────────────┐ │ │                                          │ │
│ │   Health     │ │ └──────────────────────────────────────────┘ │
│ │   Checkup... │ │ ┌──────────────────────────────────────────┐ │
│ │   3 days ago │ │ │ [Type message...] [🎤] [➤]              │ │
│ └──────────────┘ │ └──────────────────────────────────────────┘ │
│                  │                                              │
│ 💬 3 conversations│                                              │
│ Your chat history│                                              │
│ is secure        │                                              │
└──────────────────┴──────────────────────────────────────────────┘
```

## 📱 Mobile Layout (< 768px)

### Sidebar Closed (Default)

```
┌─────────────────────────────────────┐
│  [☰] Health Assistant  [🟢 Online] │
├─────────────────────────────────────┤
│                                     │
│  [🤖] Bot: Hello! How can I help?  │
│                       [3:45 PM]     │
│                                     │
│          User: I need help [👤]     │
│                       [3:46 PM]     │
│                                     │
│  [🤖] Bot: Sure! What do you need? │
│                       [3:46 PM]     │
│                                     │
├─────────────────────────────────────┤
│ [Type message...] [🎤] [➤]         │
└─────────────────────────────────────┘
```

### Sidebar Open (Menu Tapped)

```
┌──────────────────┬──────────────────┐
│                  │ ░░░░░░░░░░░░░░░░ │
│ ┌──────────────┐ │ ░ (Dark Overlay)│
│ │ [+ New Chat] │ │ ░░░░░░░░░░░░░░░░ │
│ └──────────────┘ │ ░░░░░░░░░░░░░░░░ │
│                  │ ░░░░░░░░░░░░░░░░ │
│ ┌──────────────┐ │ ░░░░░░░░░░░░░░░░ │
│ │ 🔍 Search... │ │ ░░░░░░░░░░░░░░░░ │
│ └──────────────┘ │ ░░░░░░░░░░░░░░░░ │
│                  │ ░░░░░░░░░░░░░░░░ │
│ ┌──────────────┐ │ ░░░░░░░░░░░░░░░░ │
│ │ ● Medical    │ │ ░░░░░░░░░░░░░░░░ │
│ │   Advice...  │ │ ░░░░░░░░░░░░░░░░ │
│ └──────────────┘ │ ░░░░░░░░░░░░░░░░ │
│                  │ ░░░░░░░░░░░░░░░░ │
│ ┌──────────────┐ │ ░░░░░░░░░░░░░░░░ │
│ │   Appointment│ │ ░░░░░░░░░░░░░░░░ │
│ └──────────────┘ │ ░░░░░░░░░░░░░░░░ │
└──────────────────┴──────────────────┘
  (Tap overlay to close)
```

## 🎨 Component Hierarchy

```
Dashboard
├── Gradient Background Mesh
│   ├── Top-left blur circle
│   └── Bottom-right blur circle
│
├── Dashboard Header
│   ├── Title: "Your Health Dashboard"
│   └── Subtitle
│
├── Tabs (Glassmorphism)
│   ├── 💬 Chat (Active)
│   ├── 📄 Reports
│   └── 📅 Appointments
│
└── ChatBox (Two-Column Layout)
    │
    ├── ChatSidebar (Left Column)
    │   ├── Header
    │   │   └── [+ New Chat] Button
    │   │
    │   ├── Search Input
    │   │   └── 🔍 Search icon + input field
    │   │
    │   ├── Conversations List (Scrollable)
    │   │   ├── Conversation Item 1
    │   │   │   ├── Title (truncated)
    │   │   │   ├── Last message preview
    │   │   │   ├── Timestamp
    │   │   │   └── 🗑️ Delete button (hover)
    │   │   ├── Conversation Item 2
    │   │   └── ...
    │   │
    │   └── Footer Info
    │       ├── Conversation count
    │       └── Security message
    │
    └── Main Chat Panel (Right Column)
        │
        ├── Chat Header (Glassmorphism)
        │   ├── [☰/✕] Mobile Menu Toggle
        │   ├── Title: "Health Assistant"
        │   ├── Subtitle: "Your AI health companion"
        │   └── Status: [🟢] Online
        │
        ├── Error Banner (Conditional)
        │   └── Error message + Close button
        │
        ├── Messages Area (Scrollable)
        │   ├── Empty State (No messages)
        │   │   ├── Chat icon
        │   │   ├── "Start a conversation"
        │   │   └── Description
        │   │
        │   └── Message List
        │       ├── MessageBubble (Bot)
        │       │   ├── [🤖] Bot Avatar
        │       │   ├── Message text
        │       │   ├── Timestamp
        │       │   └── [🔊] Listen button
        │       │
        │       ├── MessageBubble (User)
        │       │   ├── Message text
        │       │   ├── Timestamp
        │       │   └── [👤] User Avatar
        │       │
        │       └── Typing Indicator (Conditional)
        │           └── Bouncing dots animation
        │
        ├── Voice Input Modal (Conditional)
        │   ├── VoiceInput Component
        │   └── Cancel Button
        │
        └── Input Area (Fixed Bottom)
            ├── Textarea (Auto-expanding)
            ├── [🎤] Voice Button
            ├── [➤] Send Button
            └── [⏹️] Stop Speaking Button (Conditional)
```

## 🎯 Interaction Flow

```
User Action                    → System Response
─────────────────────────────────────────────────────────────
1. Opens Dashboard             → Shows Chat tab (default)
2. Clicks "New Chat"           → Creates new conversation
                               → Clears messages
                               → Focuses on conversation
3. Types message               → Displays in textarea
4. Presses Enter or Send       → Adds user message bubble
                               → Shows typing indicator
                               → Sends to backend/API
                               → Adds bot response bubble
                               → Updates conversation title (first msg)
                               → Updates last message in sidebar
5. Clicks conversation         → Switches to that conversation
                               → Loads conversation messages
6. Searches conversations      → Filters sidebar list
7. Hovers conversation         → Shows delete button
8. Clicks delete               → Confirms deletion
                               → Removes from sidebar
                               → Clears messages if active
9. Clicks voice button         → Opens voice modal
                               → Starts recording
                               → Transcribes speech
                               → Auto-sends message
10. Mobile: Taps menu          → Slides in sidebar
                               → Shows overlay
11. Mobile: Taps overlay       → Closes sidebar
12. Mobile: Selects conv       → Switches conversation
                               → Auto-closes sidebar
```

## 📊 State Management Flow

```
ChatContext
├── conversations: Array<Conversation>
│   └── Conversation {
│       id: string (unique)
│       title: string (auto-generated from first message)
│       lastMessage: string (preview)
│       createdAt: ISO timestamp
│       updatedAt: ISO timestamp
│   }
│
├── currentConversation: string (conversation ID)
│
├── messages: Array<Message>
│   └── Message {
│       id: number (timestamp)
│       text: string
│       sender: "user" | "bot"
│       timestamp: ISO string
│       isVoice: boolean
│   }
│
├── loading: boolean (API calls)
├── error: string | null
└── isTyping: boolean (bot response)

Actions:
├── sendMessage(text, isVoice)
│   ├── Auto-creates conversation if none exists
│   ├── Adds user message immediately
│   ├── Calls backend API
│   ├── Adds bot response
│   └── Updates conversation metadata
│
├── createNewConversation()
│   ├── Generates unique ID
│   ├── Creates conversation object
│   ├── Sets as current
│   └── Clears messages
│
├── setCurrentConversation(id)
│   └── Loads messages for conversation
│
└── deleteConversation(id)
    ├── Confirms with user
    ├── Removes from list
    └── Clears if currently active
```

## 🎨 Design Tokens Used

```css
/* Colors */
--color-background: Light/Dark mode adaptive
--color-foreground: Text color
--color-card: Card backgrounds
--color-muted-foreground: Secondary text
--color-primary: Brand color
--color-accent: Accent color

/* Glassmorphism */
bg-card/95 backdrop-blur-lg      /* Sidebar */
bg-card/80 backdrop-blur-lg      /* Header */
bg-white/5 backdrop-blur-sm      /* Bot messages */
bg-black/50 backdrop-blur-sm     /* Mobile overlay */

/* Shadows */
shadow-soft    /* Subtle elevation */
shadow-md      /* Medium elevation */

/* Borders */
border-white/10    /* Seamless minimal borders */

/* Spacing */
w-80           /* Sidebar width (320px) */
px-4 py-3      /* Consistent padding */
gap-2, gap-3   /* Element spacing */

/* Transitions */
duration-200   /* Quick interactions */
duration-300   /* Standard transitions */
ease-in-out    /* Smooth animations */
```

---

This diagram provides a comprehensive view of the ChatGPT-style layout structure, component hierarchy, interaction flows, and design system! 🎨
