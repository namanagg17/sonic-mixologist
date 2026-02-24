class TranslationEngine {
  constructor() {
    // Define weights for each audio feature
    this.weights = {
      energy: 0.4,      // 40%
      valence: 0.4,     // 40%
      tempo: 0.1,       // 10%
      acousticness: 0.1 // 10%
    };

    // Define flavor clusters with their characteristics
    this.clusters = {
      BOLD_BITTER: {
        name: 'Bold & Bitter',
        characteristics: {
          energy: { min: 0.7, max: 1.0, weight: 0.5 },
          valence: { min: 0.0, max: 0.4, weight: 0.3 },
          tempo: { min: 0.6, max: 1.0, weight: 0.1 },
          acousticness: { min: 0.0, max: 0.3, weight: 0.1 }
        },
        drinkTypes: ['Old Fashioned', 'Negroni', 'Manhattan', 'Boulevardier']
      },
      SWEET_LIGHT: {
        name: 'Sweet & Light',
        characteristics: {
          energy: { min: 0.0, max: 0.4, weight: 0.3 },
          valence: { min: 0.6, max: 1.0, weight: 0.5 },
          tempo: { min: 0.0, max: 0.4, weight: 0.1 },
          acousticness: { min: 0.4, max: 1.0, weight: 0.1 }
        },
        drinkTypes: ['Mojito', 'Piña Colada', 'Margarita', 'Daiquiri']
      },
      SOUR_SHARP: {
        name: 'Sour & Sharp',
        characteristics: {
          energy: { min: 0.5, max: 0.8, weight: 0.3 },
          valence: { min: 0.3, max: 0.6, weight: 0.3 },
          tempo: { min: 0.5, max: 0.8, weight: 0.2 },
          acousticness: { min: 0.2, max: 0.5, weight: 0.2 }
        },
        drinkTypes: ['Whiskey Sour', 'Sidecar', 'Margarita', 'Lemon Drop']
      },
      CREAMY_SMOOTH: {
        name: 'Creamy & Smooth',
        characteristics: {
          energy: { min: 0.0, max: 0.3, weight: 0.2 },
          valence: { min: 0.5, max: 0.8, weight: 0.3 },
          tempo: { min: 0.0, max: 0.3, weight: 0.2 },
          acousticness: { min: 0.6, max: 1.0, weight: 0.3 }
        },
        drinkTypes: ['White Russian', 'Brandy Alexander', 'Grasshopper', 'Irish Coffee']
      },
      EFFERVESCENT_REFRESHING: {
        name: 'Effervescent & Refreshing',
        characteristics: {
          energy: { min: 0.4, max: 0.7, weight: 0.3 },
          valence: { min: 0.5, max: 0.8, weight: 0.3 },
          tempo: { min: 0.6, max: 1.0, weight: 0.3 },
          acousticness: { min: 0.3, max: 0.6, weight: 0.1 }
        },
        drinkTypes: ['Mimosa', 'French 75', 'Aperol Spritz', 'Moscow Mule']
      },
      DARK_SPIRIT_FORWARD: {
        name: 'Dark & Spirit-Forward',
        characteristics: {
          energy: { min: 0.3, max: 0.6, weight: 0.2 },
          valence: { min: 0.2, max: 0.5, weight: 0.3 },
          tempo: { min: 0.2, max: 0.5, weight: 0.2 },
          acousticness: { min: 0.0, max: 0.4, weight: 0.3 }
        },
        drinkTypes: ['Sazerac', 'Old Fashioned', 'Manhattan', 'Rob Roy']
      },
      FRUITY_TROPICAL: {
        name: 'Fruity & Tropical',
        characteristics: {
          energy: { min: 0.5, max: 0.8, weight: 0.3 },
          valence: { min: 0.6, max: 1.0, weight: 0.4 },
          tempo: { min: 0.4, max: 0.7, weight: 0.2 },
          acousticness: { min: 0.2, max: 0.5, weight: 0.1 }
        },
        drinkTypes: ['Mai Tai', 'Zombie', 'Hurricane', 'Blue Hawaiian']
      },
      NEUTRAL_BARTENDERS_CHOICE: {
        name: 'Neutral Bartender\'s Choice',
        characteristics: {
          energy: { min: 0.3, max: 0.7, weight: 0.25 },
          valence: { min: 0.3, max: 0.7, weight: 0.25 },
          tempo: { min: 0.3, max: 0.7, weight: 0.25 },
          acousticness: { min: 0.3, max: 0.7, weight: 0.25 }
        },
        drinkTypes: ['Gin & Tonic', 'Vodka Soda', 'Rum & Coke', 'Classic Martini']
      }
    };
  }

  // Normalize tempo to 0-1 scale (typical range 60-200 BPM)
  normalizeTempo(tempo) {
    const minTempo = 60;
    const maxTempo = 200;
    return Math.max(0, Math.min(1, (tempo - minTempo) / (maxTempo - minTempo)));
  }

  // Calculate how well audio features match a cluster
  calculateClusterScore(audioFeatures, cluster) {
    let totalScore = 0;
    let totalWeight = 0;

    const normalizedFeatures = {
      energy: audioFeatures.energy,
      valence: audioFeatures.valence,
      tempo: this.normalizeTempo(audioFeatures.tempo),
      acousticness: audioFeatures.acousticness
    };

    Object.keys(cluster.characteristics).forEach(feature => {
      const char = cluster.characteristics[feature];
      const featureValue = normalizedFeatures[feature];
      
      // Calculate how well the feature fits within the cluster's range
      let featureScore = 0;
      
      if (featureValue >= char.min && featureValue <= char.max) {
        // Perfect fit within range
        featureScore = 1.0;
      } else if (featureValue < char.min) {
        // Below range - calculate distance penalty
        featureScore = Math.max(0, 1 - (char.min - featureValue));
      } else {
        // Above range - calculate distance penalty
        featureScore = Math.max(0, 1 - (featureValue - char.max));
      }

      // Apply weights
      const weightedScore = featureScore * char.weight;
      totalScore += weightedScore;
      totalWeight += char.weight;
    });

    return totalWeight > 0 ? totalScore / totalWeight : 0;
  }

  // Find the best matching cluster for given audio features
  findBestCluster(audioFeatures) {
    let bestCluster = null;
    let bestScore = -1;

    Object.keys(this.clusters).forEach(clusterKey => {
      const cluster = this.clusters[clusterKey];
      const score = this.calculateClusterScore(audioFeatures, cluster);
      
      if (score > bestScore) {
        bestScore = score;
        bestCluster = {
          key: clusterKey,
          name: cluster.name,
          score: bestScore,
          drinkTypes: cluster.drinkTypes
        };
      }
    });

    return bestCluster;
  }

  // Get a random drink from the cluster's drink types
  getRandomDrinkFromCluster(cluster) {
    if (!cluster || !cluster.drinkTypes || cluster.drinkTypes.length === 0) {
      return 'Bartender\'s Choice';
    }
    
    const randomIndex = Math.floor(Math.random() * cluster.drinkTypes.length);
    return cluster.drinkTypes[randomIndex];
  }

  // Main translation method
  translate(audioFeatures) {
    try {
      // Validate input
      if (!audioFeatures || typeof audioFeatures !== 'object') {
        throw new Error('Invalid audio features input');
      }

      // Find best matching cluster
      const cluster = this.findBestCluster(audioFeatures);
      
      if (!cluster) {
        // Fallback to neutral cluster
        return {
          moodCluster: 'Neutral Bartender\'s Choice',
          recommendedDrinkName: 'Bartender\'s Choice',
          confidence: 0.5,
          clusterKey: 'NEUTRAL_BARTENDERS_CHOICE'
        };
      }

      // Get specific drink recommendation
      const recommendedDrink = this.getRandomDrinkFromCluster(cluster);

      return {
        moodCluster: cluster.name,
        recommendedDrinkName: recommendedDrink,
        confidence: cluster.score,
        clusterKey: cluster.key,
        allPossibleDrinks: cluster.drinkTypes
      };
    } catch (error) {
      console.error('Translation engine error:', error);
      // Return fallback result
      return {
        moodCluster: 'Neutral Bartender\'s Choice',
        recommendedDrinkName: 'Bartender\'s Choice',
        confidence: 0.5,
        clusterKey: 'NEUTRAL_BARTENDERS_CHOICE'
      };
    }
  }

  // Get detailed scoring information (for debugging/analytics)
  getDetailedScoring(audioFeatures) {
    const results = {};
    
    Object.keys(this.clusters).forEach(clusterKey => {
      const cluster = this.clusters[clusterKey];
      const score = this.calculateClusterScore(audioFeatures, cluster);
      
      results[clusterKey] = {
        name: cluster.name,
        score: score,
        drinkTypes: cluster.drinkTypes
      };
    });

    return results;
  }
}

export const translationEngine = new TranslationEngine();
