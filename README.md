# Sonic Mixologist 🎵🍸

A browser-based application that listens to music through your microphone, analyzes its acoustic characteristics using DSP and a YAMNet neural network, detects the mood, and recommends a cocktail whose flavor profile matches the sound.

All processing happens locally in the browser — no audio is uploaded.

## How It Works

```
Microphone → DSP Feature Extraction → YAMNet Embedding → Mood Classification → Flavor Matching → Cocktail
```

1. **Audio Capture** — Records 5 seconds via the Web Audio API and MediaRecorder.
2. **DSP Analysis** — Frame-based FFT (2048-sample Hann-windowed frames) extracts:
   - RMS Energy (loudness)
   - Spectral Centroid (brightness)
   - Zero Crossing Rate (roughness)
   - Bass Ratio (low-frequency energy < 200 Hz)
   - Spectral Flux (timbral change between frames)
   - BPM (autocorrelation of onset envelope, clamped 60–180)
   - Dynamic Range, Energy Variance
3. **YAMNet Embedding** — Audio is passed through Google's YAMNet model (loaded via TensorFlow.js) producing 1024-dimensional frame embeddings, which are mean-pooled into a single vector.
4. **Mood Detection** — Cosine similarity is computed against pre-computed mood prototype centroids (aggressive, energetic, chill, dark), each built from 5 reference songs. BPM-based boosts refine the final classification.
5. **Cocktail Recommendation** — DSP features are mapped to a 4D flavor vector (sweetness, bitterness, strength, freshness) and matched against 47 cocktails via cosine similarity.
6. **Explanation Engine** — Rule-based reasoning generates human-readable explanations for why a mood was detected.

## Features

- **YAMNet neural network** for audio scene classification (TensorFlow.js, in-browser)
- **Frame-based FFT** with Hann windowing, spectral flux, BPM detection
- **Mood classification** with cosine similarity against trained prototypes (20 reference songs)
- **Flavor-based cocktail matching** across 47 drinks with calibrated match scores
- **Audio explanation engine** — mood-specific reasoning displayed on results
- **Age verification gate** with localStorage persistence
- **Responsive UI** with Framer Motion animations and Tailwind CSS
- **Privacy-first** — all processing happens locally, no audio leaves the device

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18, Vite 5 |
| Styling | Tailwind CSS 3, Framer Motion |
| Audio | Web Audio API, fft-js |
| ML | TensorFlow.js, YAMNet (TFHub graph model) |
| Icons | Lucide React |
| Routing | React Router DOM 6 |

## Project Structure

```
sonic-mixologist/
├── client/
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx            # Audio recording + full DSP/ML pipeline
│       │   ├── Results.jsx         # Mood, explanation, cocktail display
│       │   ├── About.jsx           # Project overview and tech details
│       │   ├── HowItWorks.jsx      # Visual pipeline walkthrough
│       │   └── AgeGate.jsx         # 21+ verification
│       ├── components/
│       │   ├── AudioRecorder.jsx   # 5-second MediaRecorder wrapper
│       │   ├── AudioFeatureDisplay.jsx  # Feature bars + BPM display
│       │   ├── DrinkCard.jsx       # Cocktail card with ingredients
│       │   ├── Navbar.jsx          # Navigation
│       │   ├── Footer.jsx          # Footer with links
│       │   ├── Layout.jsx          # Page wrapper
│       │   └── LoadingSpinner.jsx  # Animated loading state
│       ├── data/
│       │   └── cocktailDataset.js  # 47 cocktails with flavor profiles
│       └── ml/
│           ├── yamnet.js           # YAMNet model loader + inference
│           ├── moodClassifier.js   # Cosine similarity mood detection
│           ├── moodPrototypes.js   # 1024-dim prototype embeddings (20 songs)
│           └── buildPrototypes.js  # Utility for computing new prototypes
└── server/                         # Optional — health check only
    └── server.js
```

## Quick Start

```bash
# Clone the repository
git clone https://github.com/namanagg17/sonic-mixologist.git
cd sonic-mixologist

# Install client dependencies
cd client
npm install

# Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Requirements
- Node.js 16+
- A browser with Web Audio API support (Chrome, Firefox, Safari, Edge)
- Microphone access

## Mood Prototypes

The classifier uses pre-computed YAMNet embeddings from 20 reference songs (5 per mood):

| Mood | Reference Songs |
|------|----------------|
| **Aggressive** | FE!N (Travis Scott), DNA (Kendrick Lamar), Black Skinhead (Kanye West), SICKO MODE (Travis Scott), HUMBLE (Kendrick Lamar) |
| **Energetic** | Blinding Lights (The Weeknd), Titanium (David Guetta), Don't Start Now (Dua Lipa), Can't Stop (RHCP), Uptown Funk (Bruno Mars) |
| **Chill** | Perfect (Ed Sheeran), Location (Khalid), Sunset Lover (Petit Biscuit), Pink + White (Frank Ocean), Let Her Go (Passenger) |
| **Dark** | After Hours (The Weeknd), Royals (Lorde), Bury a Friend (Billie Eilish), Runaway (Kanye West), Lovely (Billie Eilish) |

## Privacy

- No audio is uploaded or stored
- All DSP and ML inference runs locally in the browser
- Age verification is stored in localStorage only

## License

MIT License

## Disclaimer

This application is for educational and entertainment purposes only.
Please drink responsibly.
