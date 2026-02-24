# Sonic Mixologist 🎵🍸

## Overview

Sonic Mixologist is a browser-based audio analysis application that:
1. Records live microphone input
2. Extracts audio features using FFT
3. Detects mood using weighted scoring
4. Recommends a cocktail based on audio characteristics

No external APIs are used.

## Features

- **Short-Time Fourier Transform (FFT)**
- **RMS Energy Detection**
- **Zero Crossing Rate (Roughness)**
- **Spectral Centroid (Brightness)**
- **Low Frequency Energy (Bass)**
- **Basic Tempo Estimation**
- **Weighted Mood Classification**
- **Confidence Score Calculation**
- **Fully Client-Side Processing**

## Architecture

```
Home → Audio Recording → DSP Analysis → Mood Engine → Results
```

All processing happens in-browser using Web Audio API.

## Tech Stack

- **React**
- **Vite**
- **Web Audio API**
- **fft-js**
- **framer-motion**
- **lucide-react**

## Future Improvements

- **MFCC extraction**
- **Real-time streaming analysis**
- **K-means clustering**
- **Machine learning classifier**
- **BPM refinement**

## Privacy

No audio is uploaded.
All processing happens locally in browser.

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd sonic-mixologist
```

2. Install dependencies
```bash
# Client dependencies
cd client
npm install

# Optional server dependencies
cd ../server
npm install
```

3. Start the application
```bash
# Client only (recommended)
cd client
npm run dev

# Or with optional server
cd server
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Usage

1. Click "Start Recording" to capture audio
2. Play music or make sounds near your microphone
3. Click "Stop Recording" when finished
4. View your audio analysis and cocktail recommendation
5. Share your results with friends

## Audio Analysis

The application analyzes four key audio features:

- **Energy**: Overall loudness and intensity
- **Brightness**: Frequency distribution (high vs low frequencies)
- **Roughness**: Zero crossing rate (harsh vs smooth sounds)
- **Bass**: Low frequency energy content

These features are mapped to mood clusters:
- **Energetic & Bright** → Mojito
- **Heavy & Dark** → Old Fashioned
- **Chill & Warm** → Whiskey Sour
- **Aggressive** → Negroni
- **Balanced** → Gin & Tonic

## Development

### Project Structure
```
sonic-mixologist/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── package.json
└── server/ (optional)
    ├── server.js
    └── package.json
```

### Available Scripts

#### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

#### Server (Optional)
- `npm run dev` - Start server with nodemon
- `npm run start` - Start production server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Disclaimer

This application is for educational and entertainment purposes only.
Please drink responsibly and never drink and drive.
