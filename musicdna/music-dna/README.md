# 🧬 Music DNA Engine

Transform your Spotify listening history into an interactive 3D DNA helix visualization. Each track becomes a glowing node in a rotating double-helix structure, positioned and colored based on its unique audio characteristics.

## ✨ Features

### 🎨 3D DNA Helix Visualization
- **Interactive 3D rendering** powered by Three.js
- Your top 50 Spotify tracks visualized as a rotating DNA double-helix
- Each track is represented as a glowing sphere node with real-time metadata
- **Smart positioning** based on audio features:
  - **Radius from center**: Determined by danceability
  - **Height**: Vertical distribution along the helix
  - **Rotation**: Angular position creating the spiral effect

### 🌈 Dynamic Color Coding
- **Neon Cyan (#00f2ff)**: Tracks with high valence (happy/energetic vibes)
- **Deep Purple (#7000ff)**: Tracks with low valence (melancholic/introspective vibes)
- Emissive glow effect on all nodes for visual impact

### 🎵 Interactive Track Exploration
- **Click any node** to reveal detailed track information
- View album artwork, track name, and artist
- Visual energy bar showing track intensity
- **Auto-playback** integration with Spotify

### 📊 Identity Score
- Personalized music identity metric calculated from your listening patterns
- Formula: `(Σ(energy + valence) / (tracks × 2)) × 100`
- Displays as a prominent score on the interface

### 🔮 AI-Powered Search (Beta)
- Search for tracks by describing a vibe or mood
- "Oracle" search interface for natural language queries
- Future integration with Gemini AI for advanced recommendations

### 🎧 Spotify Playback Control
- Seamless playback through Spotify Web Playback API
- Control your music directly from the visualization
- Real-time synchronization with your Spotify account

## 🚀 Prerequisites

Before you begin, ensure you have:

- **Spotify Premium Account** (required for Web Playback API)
- **Spotify Developer Account** (free at [developer.spotify.com](https://developer.spotify.com/dashboard))
- **Modern web browser** with WebGL support (Chrome, Firefox, Edge, Safari)
- **Local development server** (cannot run from `file://` protocol)

## 📦 Installation

1. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd music-dna
   ```

2. **Set up a local development server**
   
   Choose one of the following methods:
   
   **Using Python:**
   ```bash
   # Python 3
   python -m http.server 8000
   ```
   
   **Using Node.js:**
   ```bash
   # Install http-server globally
   npm install -g http-server
   
   # Run server
   http-server -p 8000
   ```
   
   **Using PHP:**
   ```bash
   php -S localhost:8000
   ```

3. **Navigate to the application**
   ```
   http://localhost:8000
   ```

## ⚙️ Configuration

### Required: Spotify API Setup

1. **Create a Spotify App**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Click "Create App"
   - Fill in the app details:
     - **App Name**: Music DNA Engine (or your choice)
     - **App Description**: 3D music visualization
     - **Redirect URI**: `http://localhost:8000` (or your server URL)
   - Accept the terms and create

2. **Get your Client ID**
   - From your app dashboard, copy the **Client ID**

3. **Update auth.js**
   - Open [auth.js](auth.js)
   - Replace `'YOUR_SPOTIFY_CLIENT_ID'` on line 6 with your actual Client ID:
   ```javascript
   const CLIENT_ID = 'your_actual_client_id_here';
   ```

4. **Configure Redirect URI**
   - In your Spotify app settings, add your redirect URI:
     - Development: `http://localhost:8000`
     - Production: `https://yourdomain.com`
   - **Important**: The redirect URI must match exactly (including trailing slashes)

### OAuth Scopes

The application requests the following Spotify permissions:
- `user-top-read` - Access your top tracks
- `user-read-private` - Read your user profile
- `user-read-email` - Access your email address
- `streaming` - Control playback on your devices
- `user-modify-playback-state` - Modify your playback state

## 🎮 Usage

### First-Time Setup

1. **Launch the application** in your browser
2. Click the **"Connect Identity"** button
3. You'll be redirected to Spotify to authorize the app
4. **Grant permissions** and you'll be redirected back
5. The button will change to **"Identity Linked"** (purple background)
6. Your DNA helix will automatically build with your top 50 tracks

### Exploring Your Music DNA

1. **Watch the helix rotate** - The DNA structure spins continuously
2. **Click on any node** (glowing sphere) to:
   - View track details panel
   - See album artwork
   - Check the energy level
   - Auto-play the track on Spotify
3. **Observe the colors**:
   - Bright cyan tracks = Happy, energetic songs
   - Deep purple tracks = Melancholic, introspective songs

### Using AI Search

1. Enter a vibe or mood description in the search bar
   - Examples: "late night driving", "summer party", "rainy day"
2. Click the **✨ sparkle button**
3. The Oracle will search for matching tracks
4. First result will auto-play

## 🔬 How It Works

### DNA Helix Mapping Algorithm

Each of your top 50 tracks is positioned in 3D space using this logic:

```javascript
// Radius from center (based on danceability)
radius = 2 + (danceability × 3)

// Height along Y-axis
y = (trackIndex × 0.25) - 6

// Rotation angle (creates spiral)
angle = trackIndex × 0.4 radians

// Final position
x = radius × cos(angle)
z = radius × sin(angle)
```

### Color Psychology

- **Valence > 0.5**: Neon Cyan (#00f2ff) - Positive, uplifting tracks
- **Valence ≤ 0.5**: Deep Purple (#7000ff) - Contemplative, moody tracks

### Identity Score Calculation

Your musical identity is quantified as:

```
Identity Score = (Σ(energy + valence) / (total_tracks × 2)) × 100
```

This represents the overall emotional intensity and positivity of your music taste.

## 🛠️ Technologies

### Core Stack
- **Three.js** (v0.160.0) - 3D graphics rendering
- **Spotify Web API** - Music data and playback
- **Vanilla JavaScript** (ES6 modules) - Application logic
- **Web Crypto API** - Secure OAuth PKCE authentication

### APIs Used
- **Spotify Web API**
  - `/v1/me/top/tracks` - Fetch top tracks
  - `/v1/audio-features` - Get audio characteristics
  - `/v1/me/player/play` - Playback control
  - `/v1/search` - Track search
- **Spotify Web Playback SDK** - In-browser playback

### Design & UX
- Custom CSS with glassmorphism effects
- Backdrop filters and blur effects
- Responsive animations
- Gradient backgrounds

## 📁 Project Structure

```
music-dna/
├── index.html          # Main HTML structure
├── script.js           # Core application logic & 3D rendering
├── auth.js             # Spotify OAuth 2.0 PKCE authentication
├── lyrics.js           # Placeholder for future lyrics feature
├── style.css           # Glassmorphism UI styling
└── README.md           # This file
```

### File Breakdown

- **[auth.js](auth.js)** - Handles Spotify authentication flow with PKCE (Proof Key for Code Exchange)
- **[script.js](script.js)** - Main engine containing:
  - Three.js scene setup and rendering
  - Data fetching from Spotify API
  - Helix construction algorithm
  - Interactive event handlers
  - UI state management
- **[index.html](index.html)** - UI elements including canvas, search bar, stats panel, player controls
- **[style.css](style.css)** - Modern glassmorphic design with animations

## 🚧 Future Enhancements

### Planned Features
- **Gemini AI Integration** - Advanced natural language search for mood-based recommendations
- **Lyrics Display** - Show synchronized lyrics for currently playing tracks
- **Mobile Optimization** - Touch controls and responsive design improvements
- **Token Refresh** - Automatic renewal of expired access tokens
- **Loading States** - Visual feedback during data fetching
- **Playlist Export** - Save discovered tracks to Spotify playlists
- **Time Range Selection** - Toggle between short/medium/long-term listening history
- **VR/AR Support** - Immersive 3D exploration

### Known Limitations
- Requires Spotify Premium for playback features
- AI search currently uses basic Spotify search (Gemini integration pending)
- Limited error handling for edge cases
- Token expires after 1 hour (manual re-authentication required)

## 🐛 Troubleshooting

### "Invalid Client" Error
- Verify your Client ID in [auth.js](auth.js) is correct
- Ensure no extra spaces or quotes around the Client ID

### "Invalid Redirect URI" Error
- Check that your redirect URI in Spotify Dashboard matches exactly
- Include or exclude trailing slash consistently
- For local development, use `http://localhost:8000`

### Helix Not Loading
- Open browser console (F12) to check for errors
- Verify you're logged into Spotify Premium account
- Ensure you've authorized all requested permissions
- Clear localStorage and re-authenticate:
  ```javascript
  localStorage.clear()
  location.reload()
  ```

### Playback Not Working
- **Spotify Premium is required** for Web Playback API
- Check that Spotify is not playing on another device
- Ensure browser allows autoplay (check browser settings)

### "Cannot read from file://" Error
- You must run the app through a local server
- See [Installation](#-installation) section for server setup

### WebGL Not Supported
- Update your browser to the latest version
- Enable hardware acceleration in browser settings
- Try a different browser (Chrome recommended)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.

## 👨‍💻 Developer Notes

- Built during an active sprint (references to "Day 2" in code comments)
- Clean, modular architecture ready for AI feature expansion
- Uses PKCE flow for enhanced OAuth security
- Designed for easy extension and customization

## 🙏 Acknowledgments

- **Spotify** for the comprehensive Web API and audio features
- **Three.js** for making WebGL accessible
- **The music community** for inspiring creative visualizations

---

**Made with 🎵 and ✨ for music lovers**

*Visualize your musical identity in 3D*
