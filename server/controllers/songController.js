import { spotifyService } from '../services/spotifyService.js';
import { cache } from '../utils/cache.js';

export const songController = {
  // Get audio features for a song
  async getSongFeatures(req, res) {
    try {
      const { query } = req.query;

      if (!query || query.trim().length === 0) {
        return res.status(400).json({ 
          error: 'Song query is required' 
        });
      }

      // Check cache first
      const cacheKey = cache.generateSongKey(query);
      const cachedResult = cache.get(cacheKey);
      
      if (cachedResult) {
        return res.json({
          ...cachedResult,
          cached: true
        });
      }

      let audioFeatures;

      // Try to get from Spotify API using Client Credentials Flow
      try {
        audioFeatures = await spotifyService.getTrackAudioFeatures(query);
      } catch (spotifyError) {
        console.warn('Spotify API failed, using default features:', spotifyError.message);
        audioFeatures = {
          trackName: query,
          artist: 'Unknown Artist',
          album: 'Unknown Album',
          ...spotifyService.getDefaultAudioFeatures()
        };
      }

      // Cache the result
      cache.set(cacheKey, audioFeatures);

      res.json({
        ...audioFeatures,
        cached: false
      });

    } catch (error) {
      console.error('Song features error:', error);
      
      // Return default features as fallback
      const fallbackFeatures = {
        trackName: query || 'Unknown Song',
        artist: 'Unknown Artist',
        album: 'Unknown Album',
        energy: 0.6,
        valence: 0.5,
        tempo: 120,
        acousticness: 0.3
      };

      res.status(200).json({
        ...fallbackFeatures,
        cached: false,
        fallback: true
      });
    }
  },

  // Get multiple songs features (batch processing)
  async getBatchSongFeatures(req, res) {
    try {
      const { queries } = req.body;

      if (!queries || !Array.isArray(queries) || queries.length === 0) {
        return res.status(400).json({ 
          error: 'Array of song queries is required' 
        });
      }

      if (queries.length > 10) {
        return res.status(400).json({ 
          error: 'Maximum 10 songs allowed per batch request' 
        });
      }

      const results = [];

      for (const query of queries) {
        if (!query || query.trim().length === 0) {
          results.push({
            query,
            error: 'Empty query'
          });
          continue;
        }

        try {
          // Check cache first
          const cacheKey = cache.generateSongKey(query);
          const cachedResult = cache.get(cacheKey);
          
          if (cachedResult) {
            results.push({
              query,
              ...cachedResult,
              cached: true
            });
            continue;
          }

          let audioFeatures;

          // Try to get from Spotify API using Client Credentials Flow
          try {
            audioFeatures = await spotifyService.getTrackAudioFeatures(query);
          } catch (spotifyError) {
            console.warn(`Spotify API failed for "${query}":`, spotifyError.message);
            audioFeatures = {
              trackName: query,
              artist: 'Unknown Artist',
              album: 'Unknown Album',
              ...spotifyService.getDefaultAudioFeatures()
            };
          }

          // Cache the result
          cache.set(cacheKey, audioFeatures);

          results.push({
            query,
            ...audioFeatures,
            cached: false
          });

        } catch (error) {
          console.error(`Error processing "${query}":`, error);
          results.push({
            query,
            error: 'Failed to process song'
          });
        }
      }

      res.json({ results });

    } catch (error) {
      console.error('Batch song features error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
