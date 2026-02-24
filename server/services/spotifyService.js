import axios from 'axios';
import { Buffer } from 'buffer';

class SpotifyService {
  constructor() {
    this.baseURL = 'https://api.spotify.com/v1';
    this.tokenURL = 'https://accounts.spotify.com/api/token';
    this.clientAccessToken = null;
    this.tokenExpiresAt = null;
  }

  // ==========================
  // Get Client Credentials Token
  // ==========================
  async getClientCredentialsToken() {
    // Check if we have a valid cached token
    if (this.clientAccessToken && this.tokenExpiresAt && Date.now() < this.tokenExpiresAt) {
      return this.clientAccessToken;
    }

    try {
      const body = new URLSearchParams();
      body.append('grant_type', 'client_credentials');

      const basicAuth = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString('base64');

      const response = await axios.post(
        this.tokenURL,
        body.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${basicAuth}`
          }
        }
      );

      // Cache the token with 5-minute buffer before expiration
      this.clientAccessToken = response.data.access_token;
      this.tokenExpiresAt = Date.now() + (response.data.expires_in - 300) * 1000;

      return this.clientAccessToken;

    } catch (error) {
      console.error('Client credentials token error:', error.response?.data || error.message);
      throw new Error('Failed to get client credentials token');
    }
  }

  // ==========================
  // Search Track
  // ==========================
  async searchTrack(query) {
    const accessToken = await this.getClientCredentialsToken();
    
    try {
      const response = await axios.get(`${this.baseURL}/search`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          q: query,
          type: 'track',
          limit: 1,
          market: 'US'
        }
      });

      if (!response.data.tracks.items.length) {
        throw new Error('No track found');
      }

      const track = response.data.tracks.items[0];
      
      // Get additional artist information for genre data
      try {
        const artistResponse = await axios.get(`${this.baseURL}/artists/${track.artists[0].id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        
        // Merge artist data into track object
        track.artists[0] = {
          ...track.artists[0],
          ...artistResponse.data
        };
      } catch (artistError) {
        console.log('Could not fetch artist genres, using defaults');
      }

      return track;

    } catch (error) {
      console.error('Search error:', error.response?.data || error.message);
      throw new Error('Failed to search for track');
    }
  }

  // ==========================
  // Get Audio Features (Limited with Client Credentials)
  // ==========================
  async getAudioFeatures(trackId, trackData = null) {
    // Since Client Credentials Flow doesn't have access to Audio Features API,
    // we'll estimate features based on track metadata and genre information
    
    try {
      // Try the real API first in case it works
      const accessToken = await this.getClientCredentialsToken();
      
      const response = await axios.get(
        `${this.baseURL}/audio-features/${trackId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      const features = response.data;
      return {
        energy: features.energy ?? 0.5,
        valence: features.valence ?? 0.5,
        tempo: features.tempo ?? 120,
        acousticness: features.acousticness ?? 0.5
      };

    } catch (error) {
      console.log('Audio Features API not available, estimating from metadata...');
      
      // Fallback: estimate features based on available track data
      return this.estimateAudioFeatures(trackData);
    }
  }

  // ==========================
  // Estimate Audio Features from Metadata
  // ==========================
  estimateAudioFeatures(trackData) {
    if (!trackData) {
      return this.getDefaultAudioFeatures();
    }

    const features = { ...this.getDefaultAudioFeatures() };
    
    // Basic heuristics based on track metadata
    const genres = trackData.artists?.[0]?.genres || [];
    const popularity = trackData.popularity || 50;
    const durationMs = trackData.duration_ms || 180000;
    
    // Adjust based on genres (very basic estimation)
    if (genres.some(g => g.includes('rock') || g.includes('metal'))) {
      features.energy = 0.8;
      features.valence = 0.6;
      features.tempo = 140;
    } else if (genres.some(g => g.includes('pop') || g.includes('dance'))) {
      features.energy = 0.7;
      features.valence = 0.7;
      features.tempo = 120;
    } else if (genres.some(g => g.includes('acoustic') || g.includes('folk'))) {
      features.energy = 0.4;
      features.valence = 0.5;
      features.acousticness = 0.8;
      features.tempo = 100;
    } else if (genres.some(g => g.includes('electronic') || g.includes('edm'))) {
      features.energy = 0.9;
      features.valence = 0.6;
      features.tempo = 128;
    }
    
    // Adjust based on popularity
    if (popularity > 70) {
      features.energy = Math.min(1, features.energy + 0.1);
      features.valence = Math.min(1, features.valence + 0.1);
    }
    
    return features;
  }

  // ==========================
  // Full Flow: Search + Features
  // ==========================
  async getTrackAudioFeatures(query) {
    try {
      const track = await this.searchTrack(query);
      const audioFeatures = await this.getAudioFeatures(track.id, track);

      return {
        trackName: track.name,
        artist: track.artists[0]?.name || 'Unknown Artist',
        album: track.album.name,
        albumArt: track.album.images[0]?.url,
        ...audioFeatures
      };

    } catch (error) {
      console.error('Complete flow error:', error.message);
      throw error;
    }
  }

  // ==========================
  // Fallback Audio Features
  // ==========================
  getDefaultAudioFeatures() {
    return {
      energy: 0.6,
      valence: 0.5,
      tempo: 120,
      acousticness: 0.3
    };
  }
}

export const spotifyService = new SpotifyService();