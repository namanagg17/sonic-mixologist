import axios from 'axios';

class CocktailService {
  constructor() {
    this.baseURL = 'https://www.thecocktaildb.com/api/json/v1/1';
    this.fallbackCocktails = [
      {
        name: 'Bartender\'s Choice',
        ingredients: ['Your choice of spirit', 'Mixers to taste', 'Fresh garnish'],
        measurements: ['2 oz', 'To taste', 'As needed'],
        instructions: 'Ask your bartender to create something special based on your preferences!',
        image: 'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg'
      }
    ];
  }

  // Search cocktail by name
  async searchCocktailByName(name) {
    try {
      const response = await axios.get(`${this.baseURL}/search.php`, {
        params: { s: name }
      });

      if (response.data.drinks && response.data.drinks.length > 0) {
        return this.formatCocktailData(response.data.drinks[0]);
      }

      return null;
    } catch (error) {
      console.error('Cocktail search error:', error.message);
      return null;
    }
  }

  // Get random cocktail
  async getRandomCocktail() {
    try {
      const response = await axios.get(`${this.baseURL}/random.php`);

      if (response.data.drinks && response.data.drinks.length > 0) {
        return this.formatCocktailData(response.data.drinks[0]);
      }

      return null;
    } catch (error) {
      console.error('Random cocktail error:', error.message);
      return null;
    }
  }

  // Filter cocktails by ingredient (exclude certain ingredients)
  async filterByIngredient(excludeIngredients = []) {
    try {
      // Get a list of all cocktails first
      const response = await axios.get(`${this.baseURL}/filter.php`, {
        params: { a: 'Alcoholic' } // Get alcoholic cocktails by default
      });

      if (!response.data.drinks) {
        return null;
      }

      // For each cocktail, get detailed info and check ingredients
      const validCocktails = [];
      const sampleSize = Math.min(10, response.data.drinks.length); // Limit API calls

      for (let i = 0; i < sampleSize; i++) {
        const cocktail = response.data.drinks[i];
        const details = await this.getCocktailDetails(cocktail.idDrink);
        
        if (details && !this.containsExcludedIngredients(details, excludeIngredients)) {
          validCocktails.push(details);
        }
      }

      if (validCocktails.length > 0) {
        return validCocktails[Math.floor(Math.random() * validCocktails.length)];
      }

      return null;
    } catch (error) {
      console.error('Filter by ingredient error:', error.message);
      return null;
    }
  }

  // Get detailed cocktail information by ID
  async getCocktailDetails(cocktailId) {
    try {
      const response = await axios.get(`${this.baseURL}/lookup.php`, {
        params: { i: cocktailId }
      });

      if (response.data.drinks && response.data.drinks.length > 0) {
        return this.formatCocktailData(response.data.drinks[0]);
      }

      return null;
    } catch (error) {
      console.error('Cocktail details error:', error.message);
      return null;
    }
  }

  // Format cocktail data from API response
  formatCocktailData(drink) {
    const ingredients = [];
    const measurements = [];

    // Extract ingredients and measurements (API provides them as separate fields)
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measurement = drink[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {
        ingredients.push(ingredient.trim());
        measurements.push(measurement ? measurement.trim() : '');
      }
    }

    return {
      name: drink.strDrink,
      ingredients,
      measurements,
      instructions: drink.strInstructions || 'No instructions available',
      image: drink.strDrinkThumb || 'https://via.placeholder.com/300x300?text=Cocktail',
      category: drink.strCategory,
      glass: drink.strGlass,
      isAlcoholic: drink.strAlcoholic === 'Alcoholic'
    };
  }

  // Check if cocktail contains excluded ingredients
  containsExcludedIngredients(cocktail, excludeIngredients) {
    if (!excludeIngredients || excludeIngredients.length === 0) {
      return false;
    }

    const cocktailIngredients = cocktail.ingredients.map(ing => 
      ing.toLowerCase().trim()
    );

    return excludeIngredients.some(excluded => 
      cocktailIngredients.some(ingredient => 
        ingredient.includes(excluded.toLowerCase().trim())
      )
    );
  }

  // Get mocktail (non-alcoholic) version
  async getMocktail() {
    try {
      const response = await axios.get(`${this.baseURL}/filter.php`, {
        params: { a: 'Non_Alcoholic' }
      });

      if (response.data.drinks && response.data.drinks.length > 0) {
        // Get details for a random mocktail
        const randomCocktail = response.data.drinks[
          Math.floor(Math.random() * response.data.drinks.length)
        ];
        return await this.getCocktailDetails(randomCocktail.idDrink);
      }

      return null;
    } catch (error) {
      console.error('Mocktail error:', error.message);
      return null;
    }
  }

  // Main method to get cocktail recommendation
  async getCocktailRecommendation(drinkName, options = {}) {
    const { 
      excludeIngredients = [], 
      isMocktail = false,
      useRandom = false 
    } = options;

    try {
      let cocktail = null;

      // Priority 1: Try to find specific cocktail by name
      if (!useRandom && drinkName && !isMocktail) {
        cocktail = await this.searchCocktailByName(drinkName);
      }

      // Priority 2: Filter by excluded ingredients
      if (!cocktail && !isMocktail && excludeIngredients.length > 0) {
        cocktail = await this.filterByIngredient(excludeIngredients);
      }

      // Priority 3: Get mocktail if requested
      if (!cocktail && isMocktail) {
        cocktail = await this.getMocktail();
      }

      // Priority 4: Get random cocktail
      if (!cocktail) {
        cocktail = await this.getRandomCocktail();
      }

      // Fallback: Return default cocktail
      if (!cocktail) {
        cocktail = this.fallbackCocktails[0];
      }

      return cocktail;
    } catch (error) {
      console.error('Cocktail recommendation error:', error);
      return this.fallbackCocktails[0];
    }
  }

  // Get multiple cocktail options for a mood cluster
  async getCocktailOptionsForCluster(clusterKey, options = {}) {
    const clusterDrinkMap = {
      'BOLD_BITTER': ['Old Fashioned', 'Negroni', 'Manhattan'],
      'SWEET_LIGHT': ['Mojito', 'Piña Colada', 'Margarita'],
      'SOUR_SHARP': ['Whiskey Sour', 'Sidecar', 'Margarita'],
      'CREAMY_SMOOTH': ['White Russian', 'Brandy Alexander', 'Irish Coffee'],
      'EFFERVESCENT_REFRESHING': ['Mimosa', 'French 75', 'Aperol Spritz'],
      'DARK_SPIRIT_FORWARD': ['Sazerac', 'Old Fashioned', 'Manhattan'],
      'FRUITY_TROPICAL': ['Mai Tai', 'Zombie', 'Hurricane'],
      'NEUTRAL_BARTENDERS_CHOICE': ['Gin & Tonic', 'Vodka Soda', 'Rum & Coke']
    };

    const drinkNames = clusterDrinkMap[clusterKey] || ['Margarita'];
    const cocktailOptions = [];

    // Try to get details for each drink type
    for (const drinkName of drinkNames.slice(0, 3)) { // Limit to 3 options
      const cocktail = await this.searchCocktailByName(drinkName);
      if (cocktail) {
        cocktailOptions.push(cocktail);
      }
    }

    // If no cocktails found, get random ones
    if (cocktailOptions.length === 0) {
      for (let i = 0; i < 3; i++) {
        const cocktail = await this.getRandomCocktail();
        if (cocktail) {
          cocktailOptions.push(cocktail);
        }
      }
    }

    return cocktailOptions;
  }
}

export const cocktailService = new CocktailService();
