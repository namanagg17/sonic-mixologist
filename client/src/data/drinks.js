export const drinks = [
  {
    id: "mojito",
    name: "Mojito",
    moodAffinity: ["energetic", "chill"],
    flavorProfile: {
      sweetness: 0.7,
      bitterness: 0.1,
      strength: 0.3,
      freshness: 0.9
    },
    ingredients: [
      { name: "White rum", amount: "2 oz" },
      { name: "Fresh lime juice", amount: "1 oz" },
      { name: "Simple syrup", amount: "0.75 oz" },
      { name: "Mint leaves", amount: "8-10 leaves" },
      { name: "Soda water", amount: "Top with" }
    ],
    instructions: "Muddle mint leaves with simple syrup and lime juice. Add rum and fill glass with crushed ice. Top with soda water and stir gently. Garnish with mint sprig.",
    glass: "Highball",
    garnish: "Mint sprig",
    image: "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg"
  },
  {
    id: "old-fashioned",
    name: "Old Fashioned",
    moodAffinity: ["dark", "chill"],
    flavorProfile: {
      sweetness: 0.4,
      bitterness: 0.3,
      strength: 0.8,
      freshness: 0.2
    },
    ingredients: [
      { name: "Bourbon or rye whiskey", amount: "2 oz" },
      { name: "Sugar", amount: "1 cube (1 tsp)" },
      { name: "Angostura bitters", amount: "2-3 dashes" },
      { name: "Water", amount: "1 tsp" },
      { name: "Orange peel", amount: "1 strip" }
    ],
    instructions: "Muddle sugar cube with bitters and water. Add whiskey and large ice cube. Stir until chilled. Express orange peel oils over drink and drop in peel.",
    glass: "Rocks glass",
    garnish: "Orange peel",
    image: "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg"
  },
  {
    id: "negroni",
    name: "Negroni",
    moodAffinity: ["dark", "aggressive"],
    flavorProfile: {
      sweetness: 0.3,
      bitterness: 0.7,
      strength: 0.7,
      freshness: 0.4
    },
    ingredients: [
      { name: "Gin", amount: "1 oz" },
      { name: "Campari", amount: "1 oz" },
      { name: "Sweet vermouth", amount: "1 oz" },
      { name: "Orange peel", amount: "1 strip" }
    ],
    instructions: "Combine gin, Campari, and sweet vermouth in mixing glass with ice. Stir until well-chilled. Strain into rocks glass over fresh ice. Express orange peel oils over drink.",
    glass: "Rocks glass",
    garnish: "Orange peel",
    image: "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg"
  },
  {
    id: "whiskey-sour",
    name: "Whiskey Sour",
    moodAffinity: ["energetic", "chill"],
    flavorProfile: {
      sweetness: 0.5,
      bitterness: 0.2,
      strength: 0.6,
      freshness: 0.8
    },
    ingredients: [
      { name: "Bourbon whiskey", amount: "2 oz" },
      { name: "Fresh lemon juice", amount: "0.75 oz" },
      { name: "Simple syrup", amount: "0.5 oz" },
      { name: "Egg white", amount: "1 (optional)" }
    ],
    instructions: "Dry shake all ingredients without ice if using egg white. Then shake with ice. Strain into coupe glass. Garnish with cherry and orange slice.",
    glass: "Coupe",
    garnish: "Cherry and orange slice",
    image: "https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg"
  },
  {
    id: "margarita",
    name: "Margarita",
    moodAffinity: ["energetic", "chill"],
    flavorProfile: {
      sweetness: 0.4,
      bitterness: 0.2,
      strength: 0.5,
      freshness: 0.9
    },
    ingredients: [
      { name: "Tequila blanco", amount: "2 oz" },
      { name: "Fresh lime juice", amount: "1 oz" },
      { name: "Cointreau or triple sec", amount: "1 oz" },
      { name: "Salt", amount: "For rim" }
    ],
    instructions: "Run lime wedge around rim of glass and dip in salt. Shake tequila, lime juice, and Cointreau with ice. Strain into glass with fresh ice.",
    glass: "Margarita or coupe",
    garnish: "Lime wheel",
    image: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg"
  },
  {
    id: "martini",
    name: "Martini",
    moodAffinity: ["dark", "aggressive"],
    flavorProfile: {
      sweetness: 0.1,
      bitterness: 0.3,
      strength: 0.9,
      freshness: 0.3
    },
    ingredients: [
      { name: "Gin", amount: "2.5 oz" },
      { name: "Dry vermouth", amount: "0.5 oz" },
      { name: "Orange bitters", amount: "1 dash (optional)" }
    ],
    instructions: "Stir gin and vermouth with ice until very cold. Strain into chilled coupe or martini glass. Garnish with lemon twist or olive.",
    glass: "Coupe or martini glass",
    garnish: "Lemon twist or olive",
    image: "https://www.thecocktaildb.com/images/media/drink/71t8581504353095.jpg"
  }
];
