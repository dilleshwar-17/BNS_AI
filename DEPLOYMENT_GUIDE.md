# BNS AI - Deployment & Usage Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Gemini API key (optional - for enhanced features)

### Installation & Running

```bash
# Clone the repository
git clone https://github.com/dilleshwar-17/BNS_AI.git
cd BNS_AI

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

---

## ✨ Key Features

### 1. **No Authentication Required**
- The application launches directly to the workspace
- No login screen or authentication flow
- Immediate access to all features

### 2. **Professional Logo**
- New BNS AI logo with legal + AI design elements
- Combines scales of justice with neural network patterns
- Professional color palette (navy blue, sky blue, silver)

### 3. **Admin Access via Long-Press**
- **Hold the logo for 5 seconds** to access the admin dashboard
- Visual feedback with pulsing border during press
- Admin portal provides system management features

### 4. **Terminology Updates**
- Removed all "Operating System" references
- Now called "Legal Intelligence Platform"
- Updated all UI text and descriptions

### 5. **Core Features**
- **Workspace**: Chat interface for legal queries
- **Dashboard**: Overview of legal updates and metrics
- **Deep Research**: Advanced legal research tools
- **Legal Drafting**: Document generation and templates
- **Compare Acts**: Side-by-side comparison of legal provisions
- **Knowledge Graph**: Visual representation of legal relationships
- **Admin Portal**: System management and configuration

---

## 🎯 Usage Guide

### Accessing the Application

1. **Start the app**: `npm run dev`
2. **Open browser**: Navigate to `http://localhost:5173`
3. **Instant access**: You're automatically logged in as a regular user

### Using the Workspace

- **Ask Questions**: Type legal queries in the input field
- **Voice Mode**: Click the microphone icon for voice input
- **Copy Responses**: Use the copy button to save answers
- **Download**: Export responses as text files
- **Regenerate**: Retry the same query for different responses

### Accessing Admin Dashboard

1. **Locate the logo** in the top-left corner
2. **Press and hold** the logo for 5 seconds
3. **Visual feedback**: Border will pulse during the press
4. **Admin access**: Dashboard opens automatically after 5 seconds

### Using Other Features

- **Dashboard**: View legal updates and recent activity
- **Research**: Conduct deep legal research with structured plans
- **Drafting**: Generate legal documents from templates
- **Compare**: Compare old and new legal provisions
- **Knowledge Graph**: Explore legal relationships visually

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```bash
# Optional - for Gemini API integration
VITE_GEMINI_API_KEY=your_api_key_here

# Optional - API configuration
VITE_API_BASE_URL=http://localhost:3001/api
VITE_API_TIMEOUT=30000

# Optional - Feature flags
VITE_ENABLE_VOICE_MODE=true
VITE_ENABLE_DEEP_RESEARCH=true
VITE_ENABLE_LEGAL_DRAFTING=true
VITE_ENABLE_COMPARE_ACTS=true
VITE_ENABLE_KNOWLEDGE_GRAPH=true
```

---

## 📦 Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 🏗️ Project Structure

```
BNS_AI/
├── src/
│   ├── components/          # React components
│   │   ├── WorkspaceView.tsx
│   │   ├── DashboardView.tsx
│   │   ├── AdminPortalView.tsx
│   │   ├── Sidebar.tsx
│   │   └── ...
│   ├── services/            # API and database services
│   │   ├── api.ts
│   │   └── bnsVectorDB.ts
│   ├── utils/               # Utility functions
│   │   ├── validation.ts
│   │   ├── errorHandler.ts
│   │   └── config.ts
│   ├── types.ts             # TypeScript type definitions
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── dist/                    # Build output
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎨 UI Components

### Orb Component
- Animated visualization showing AI state
- States: idle, thinking, processing, speaking, listening, completed, error
- Particle effects and neural network visualization

### Sidebar Navigation
- Quick access to all features
- Responsive design for mobile
- Admin controls for system management

### Message Display
- Streaming text animation
- Citation display
- Case law references
- Confidence scores

---

## 🔐 Security Notes

1. **No Real Authentication**: This is a demo application
2. **Mock API**: All responses are simulated
3. **Client-Side Only**: No backend persistence
4. **For Production**: Implement real authentication and backend

---

## 🚨 Troubleshooting

### Application Won't Start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Logo Long-Press Not Working
- Ensure you're holding the mouse button for full 5 seconds
- Watch for the pulsing border animation
- Release after 5 seconds to complete the action

### Build Errors
```bash
# Check TypeScript
npm run lint

# Clean build
npm run clean
npm run build
```

---

## 📚 Documentation Files

- **IMPROVEMENTS.md**: Detailed technical improvements
- **SETUP_IMPROVEMENTS.md**: Setup and utility guide
- **DEPLOYMENT_GUIDE.md**: This file

---

## 🔄 Recent Updates

### Version 4.0.2
- ✅ Professional BNS AI logo added
- ✅ No-auth access implemented
- ✅ Long-press admin access (5 seconds)
- ✅ Removed "OS" terminology
- ✅ Improved error handling
- ✅ Input validation utilities
- ✅ Configuration management
- ✅ Bug fixes (regenerate button)

---

## 🤝 Contributing

When making changes:
1. Follow existing code style
2. Test thoroughly
3. Update documentation
4. Create descriptive commit messages
5. Push to GitHub

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Check configuration settings
4. Review the documentation files

---

## 📄 License

SPDX-License-Identifier: Apache-2.0

---

**Last Updated**: 2026-07-13
**Version**: 4.0.2
**Status**: Production Ready
