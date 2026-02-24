# Sonic Mixologist

A cross-domain recommendation engine that converts Spotify audio features into cocktail or mocktail recommendations using a custom translation algorithm.

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **State Management**: React Query
- **Hosting**: Vercel (Frontend), Render (Backend)
- **Caching**: In-memory with Redis-ready architecture

## Features

- Spotify OAuth 2.0 Authentication
- Audio feature extraction (Energy, Valence, Tempo, Acousticness)
- Custom translation engine with weighted scoring
- Cocktail API integration via TheCocktailDB
- Responsive dark cocktail aesthetic UI
- Caching layer for performance
- Mocktail mode and ingredient filtering

## Quick Start

### Prerequisites
- Node.js 18+ installed
- Spotify Developer Account (for full functionality)

### Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Add your Spotify credentials to .env
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
cp .env.example .env
# Set VITE_API_URL=http://localhost:3001/api
npm run dev
```

### Access the Application
- Frontend: http://localhost:5173
- Backend Health: http://localhost:3001/health

## Environment Variables

### Backend (.env)
```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3001/auth/spotify/callback
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:5173
```

## API Endpoints

- `GET /api/auth/spotify` - Initiate Spotify OAuth
- `GET /api/auth/spotify/callback` - OAuth callback
- `GET /api/song?query=<song_name>` - Get song audio features
- `GET /api/recommend?query=<song_name>` - Get drink recommendation

## Deployment

### Frontend (Vercel)
1. Connect repository to Vercel
2. Set `VITE_API_URL` environment variable
3. Deploy automatically on push to main

### Backend (Render)
1. Connect repository to Render
2. Set all environment variables
3. Deploy automatically on push to main

## Translation Logic

The translation engine uses a weighted scoring system:
- Energy (40%): High energy → Bold & Bitter
- Valence (40%): High valence → Sweet & Light
- Tempo (10%): Fast tempo → Effervescent & Refreshing
- Acousticness (10%): High acousticness → Creamy & Smooth

## License

MIT
