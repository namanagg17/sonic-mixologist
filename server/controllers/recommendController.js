import { spotifyService } from '../services/spotifyService.js';
import { translationEngine } from '../services/translationEngine.js';
import { cocktailService } from '../services/cocktailService.js';
import { cache } from '../utils/cache.js';

export const recommendController = {

  // ===============================
  // Get complete recommendation
  // ===============================
  async getRecommendation(req, res) {
    try {
      const { query } = req.query;
      const { excludeIngredients, isMocktail, regenerate } = req.body || {};

      if (!query || query.trim().length === 0) {
        return res.status(400).json({ error: 'Song query is required' });
      }

      const cacheKey = cache.generateRecommendKey(query, {
        excludeIngredients: excludeIngredients || [],
        isMocktail: isMocktail || false
      });

      if (!regenerate) {
        const cachedResult = cache.get(cacheKey);
        if (cachedResult) {
          return res.json({ ...cachedResult, cached: true });
        }
      }

      // ✅ Always fetch from Spotify via Client Credentials
      let audioFeatures;
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

      const translation = translationEngine.translate(audioFeatures);

      const cocktailOptions = {
        excludeIngredients: excludeIngredients || [],
        isMocktail: isMocktail || false
      };

      let cocktail;
      try {
        cocktail = await cocktailService.getCocktailRecommendation(
          translation.recommendedDrinkName,
          cocktailOptions
        );
      } catch (cocktailError) {
        console.warn('Cocktail API failed, using fallback:', cocktailError.message);
        cocktail = {
          name: "Bartender's Choice",
          ingredients: ['Your choice of spirit', 'Mixers to taste'],
          measurements: ['2 oz', 'To taste'],
          instructions: 'Ask your bartender to create something special!',
          image: 'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg'
        };
      }

      const result = {
        song: audioFeatures.trackName,
        artist: audioFeatures.artist,
        album: audioFeatures.album,
        albumArt: audioFeatures.albumArt,
        audioFeatures: {
          energy: audioFeatures.energy,
          valence: audioFeatures.valence,
          tempo: audioFeatures.tempo,
          acousticness: audioFeatures.acousticness
        },
        moodCluster: translation.moodCluster,
        confidence: translation.confidence,
        clusterKey: translation.clusterKey,
        drink: cocktail.name,
        ingredients: cocktail.ingredients,
        measurements: cocktail.measurements,
        instructions: cocktail.instructions,
        image: cocktail.image,
        isAlcoholic: cocktail.isAlcoholic !== false,
        glass: cocktail.glass,
        category: cocktail.category,
        allPossibleDrinks: translation.allPossibleDrinks,
        timestamp: new Date().toISOString()
      };

      cache.set(cacheKey, result);

      res.json({ ...result, cached: false });

    } catch (error) {
      console.error('Recommendation error:', error);

      const fallbackResult = {
        song: req.query.query || 'Unknown Song',
        artist: 'Unknown Artist',
        album: 'Unknown Album',
        audioFeatures: {
          energy: 0.6,
          valence: 0.5,
          tempo: 120,
          acousticness: 0.3
        },
        moodCluster: "Neutral Bartender's Choice",
        confidence: 0.5,
        clusterKey: 'NEUTRAL_BARTENDERS_CHOICE',
        drink: "Bartender's Choice",
        ingredients: ['Your choice of spirit', 'Mixers to taste'],
        measurements: ['2 oz', 'To taste'],
        instructions: 'Ask your bartender to create something special!',
        image: 'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg',
        isAlcoholic: true,
        timestamp: new Date().toISOString(),
        fallback: true
      };

      res.status(200).json(fallbackResult);
    }
  },

  // ===============================
  // Multiple Recommendations
  // ===============================
  async getMultipleRecommendations(req, res) {
    try {
      const { queries, options = {} } = req.body;

      if (!queries || !Array.isArray(queries) || queries.length === 0) {
        return res.status(400).json({ error: 'Array of song queries is required' });
      }

      if (queries.length > 5) {
        return res.status(400).json({ error: 'Maximum 5 songs allowed per request' });
      }

      const results = [];

      for (const query of queries) {
        try {
          const cacheKey = cache.generateRecommendKey(query, options);
          const cachedResult = cache.get(cacheKey);

          if (cachedResult) {
            results.push({ query, ...cachedResult, cached: true });
            continue;
          }

          let audioFeatures;
          try {
            audioFeatures = await spotifyService.getTrackAudioFeatures(query);
          } catch {
            audioFeatures = {
              trackName: query,
              artist: 'Unknown Artist',
              album: 'Unknown Album',
              ...spotifyService.getDefaultAudioFeatures()
            };
          }

          const translation = translationEngine.translate(audioFeatures);
          const cocktail = await cocktailService.getCocktailRecommendation(
            translation.recommendedDrinkName,
            options
          );

          const result = {
            query,
            song: audioFeatures.trackName,
            artist: audioFeatures.artist,
            audioFeatures: {
              energy: audioFeatures.energy,
              valence: audioFeatures.valence,
              tempo: audioFeatures.tempo,
              acousticness: audioFeatures.acousticness
            },
            moodCluster: translation.moodCluster,
            confidence: translation.confidence,
            drink: cocktail.name,
            ingredients: cocktail.ingredients,
            instructions: cocktail.instructions,
            image: cocktail.image,
            cached: false
          };

          cache.set(cacheKey, result);
          results.push(result);

        } catch (error) {
          results.push({ query, error: 'Failed to generate recommendation' });
        }
      }

      res.json({ results });

    } catch (error) {
      console.error('Multiple recommendations error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // ===============================
  // Translation Only
  // ===============================
  async getTranslationOnly(req, res) {
    try {
      const { query } = req.query;

      if (!query || query.trim().length === 0) {
        return res.status(400).json({ error: 'Song query is required' });
      }

      let audioFeatures;
      try {
        audioFeatures = await spotifyService.getTrackAudioFeatures(query);
      } catch {
        audioFeatures = {
          trackName: query,
          artist: 'Unknown Artist',
          album: 'Unknown Album',
          ...spotifyService.getDefaultAudioFeatures()
        };
      }

      const translation = translationEngine.translate(audioFeatures);

      res.json({
        song: audioFeatures.trackName,
        artist: audioFeatures.artist,
        audioFeatures: {
          energy: audioFeatures.energy,
          valence: audioFeatures.valence,
          tempo: audioFeatures.tempo,
          acousticness: audioFeatures.acousticness
        },
        translation: {
          moodCluster: translation.moodCluster,
          confidence: translation.confidence,
          clusterKey: translation.clusterKey,
          recommendedDrinkName: translation.recommendedDrinkName,
          allPossibleDrinks: translation.allPossibleDrinks
        }
      });

    } catch (error) {
      console.error('Translation error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};