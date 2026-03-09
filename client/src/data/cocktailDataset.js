export const cocktails = [
  {
    id: "negroni",
    name: "Negroni",
    flavorProfile: { sweetness: 0.3, bitterness: 0.8, strength: 0.7, freshness: 0.2 },
    ingredients: [
      { name: "Gin", amount: "1 oz" },
      { name: "Campari", amount: "1 oz" },
      { name: "Sweet Vermouth", amount: "1 oz" }
    ],
    instructions: "Add all ingredients to a mixing glass with ice. Stir until well chilled, about 30 seconds. Strain into a rocks glass over a large ice cube. Express orange peel over the drink and use as garnish.",
    glass: "Rocks Glass",
    garnish: "Orange Peel",
    image: "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg"
  },
  {
    id: "margarita",
    name: "Margarita",
    flavorProfile: { sweetness: 0.4, bitterness: 0.2, strength: 0.5, freshness: 0.9 },
    ingredients: [
      { name: "Tequila Blanco", amount: "2 oz" },
      { name: "Fresh Lime Juice", amount: "1 oz" },
      { name: "Cointreau", amount: "1 oz" },
      { name: "Salt", amount: "For rim" }
    ],
    instructions: "Run a lime wedge around the rim of a chilled glass and dip it in salt. Shake tequila, lime juice, and Cointreau with ice. Strain into the prepared glass over fresh ice. Garnish with a lime wheel.",
    glass: "Margarita Glass",
    garnish: "Lime Wheel",
    image: "https://www.thecocktaildb.com/images/media/drink/wpxpvu1439905379.jpg"
  },
  {
    id: "daiquiri",
    name: "Daiquiri",
    flavorProfile: { sweetness: 0.5, bitterness: 0.1, strength: 0.5, freshness: 0.9 },
    ingredients: [
      { name: "White Rum", amount: "2 oz" },
      { name: "Fresh Lime Juice", amount: "0.75 oz" },
      { name: "Simple Syrup", amount: "0.75 oz" }
    ],
    instructions: "Combine rum, lime juice, and simple syrup in a shaker with ice. Shake vigorously until well chilled. Double-strain into a chilled coupe glass. Garnish with a lime wheel.",
    glass: "Coupe",
    garnish: "Lime Wheel",
    image: "https://www.thecocktaildb.com/images/media/drink/usuuur1439906797.jpg"
  },
  {
    id: "whiskey-sour",
    name: "Whiskey Sour",
    flavorProfile: { sweetness: 0.5, bitterness: 0.3, strength: 0.6, freshness: 0.6 },
    ingredients: [
      { name: "Bourbon", amount: "2 oz" },
      { name: "Fresh Lemon Juice", amount: "0.75 oz" },
      { name: "Simple Syrup", amount: "0.75 oz" },
      { name: "Egg White", amount: "1 (optional)" }
    ],
    instructions: "If using egg white, dry shake all ingredients first. Add ice and shake again vigorously. Strain into a rocks glass over fresh ice. Garnish with an orange slice and a cherry.",
    glass: "Rocks Glass",
    garnish: "Orange Slice and Cherry",
    image: "https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg"
  },
  {
    id: "moscow-mule",
    name: "Moscow Mule",
    flavorProfile: { sweetness: 0.4, bitterness: 0.1, strength: 0.4, freshness: 0.8 },
    ingredients: [
      { name: "Vodka", amount: "2 oz" },
      { name: "Fresh Lime Juice", amount: "0.5 oz" },
      { name: "Ginger Beer", amount: "4 oz" }
    ],
    instructions: "Fill a copper mug with ice. Add vodka and lime juice, then top with ginger beer. Stir gently to combine. Garnish with a lime wheel and fresh mint.",
    glass: "Copper Mug",
    garnish: "Lime Wheel and Mint",
    image: "https://www.thecocktaildb.com/images/media/drink/3pylqc1504370988.jpg"
  },
  {
    id: "mai-tai",
    name: "Mai Tai",
    flavorProfile: { sweetness: 0.7, bitterness: 0.2, strength: 0.6, freshness: 0.6 },
    ingredients: [
      { name: "White Rum", amount: "1 oz" },
      { name: "Dark Rum", amount: "1 oz" },
      { name: "Orange Curaçao", amount: "0.5 oz" },
      { name: "Orgeat Syrup", amount: "0.5 oz" },
      { name: "Fresh Lime Juice", amount: "0.75 oz" }
    ],
    instructions: "Combine all ingredients in a shaker with ice. Shake until chilled. Strain over crushed ice in a tiki glass. Float dark rum on top. Garnish with a mint sprig and lime wheel.",
    glass: "Tiki Glass",
    garnish: "Mint Sprig and Lime Wheel",
    image: "https://www.thecocktaildb.com/images/media/drink/twyrrp1439907470.jpg"
  },
  {
    id: "pina-colada",
    name: "Piña Colada",
    flavorProfile: { sweetness: 0.9, bitterness: 0.0, strength: 0.4, freshness: 0.5 },
    ingredients: [
      { name: "White Rum", amount: "2 oz" },
      { name: "Coconut Cream", amount: "1.5 oz" },
      { name: "Pineapple Juice", amount: "3 oz" }
    ],
    instructions: "Blend all ingredients with a cup of ice until smooth. Pour into a chilled hurricane glass. Garnish with a pineapple slice and a maraschino cherry.",
    glass: "Hurricane Glass",
    garnish: "Pineapple Slice and Cherry",
    image: "https://www.thecocktaildb.com/images/media/drink/cpf4j51504371346.jpg"
  },
  {
    id: "cosmopolitan",
    name: "Cosmopolitan",
    flavorProfile: { sweetness: 0.5, bitterness: 0.1, strength: 0.5, freshness: 0.7 },
    ingredients: [
      { name: "Citrus Vodka", amount: "1.5 oz" },
      { name: "Cointreau", amount: "0.5 oz" },
      { name: "Cranberry Juice", amount: "0.75 oz" },
      { name: "Fresh Lime Juice", amount: "0.5 oz" }
    ],
    instructions: "Shake all ingredients with ice until well chilled. Strain into a chilled cocktail glass. Garnish with a flamed orange twist.",
    glass: "Cocktail Glass",
    garnish: "Orange Twist",
    image: "https://www.thecocktaildb.com/images/media/drink/kpsajh1504368362.jpg"
  },
  {
    id: "martini",
    name: "Martini",
    flavorProfile: { sweetness: 0.1, bitterness: 0.3, strength: 0.9, freshness: 0.3 },
    ingredients: [
      { name: "Gin", amount: "2.5 oz" },
      { name: "Dry Vermouth", amount: "0.5 oz" },
      { name: "Orange Bitters", amount: "1 dash" }
    ],
    instructions: "Stir gin and vermouth with ice until very cold, about 30 seconds. Strain into a chilled martini glass. Express a lemon twist over the surface and either drop in or discard.",
    glass: "Martini Glass",
    garnish: "Lemon Twist or Olive",
    image: "https://www.thecocktaildb.com/images/media/drink/71t8581504353095.jpg"
  },
  {
    id: "old-fashioned",
    name: "Old Fashioned",
    flavorProfile: { sweetness: 0.4, bitterness: 0.3, strength: 0.8, freshness: 0.2 },
    ingredients: [
      { name: "Bourbon or Rye", amount: "2 oz" },
      { name: "Angostura Bitters", amount: "2 dashes" },
      { name: "Sugar", amount: "1 cube" },
      { name: "Water", amount: "1 tsp" }
    ],
    instructions: "Place sugar cube in glass, add bitters and water, and muddle until dissolved. Add a large ice cube and pour whiskey over it. Stir gently. Express an orange peel over the glass.",
    glass: "Rocks Glass",
    garnish: "Orange Peel and Cherry",
    image: "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg"
  },
  {
    id: "manhattan",
    name: "Manhattan",
    flavorProfile: { sweetness: 0.4, bitterness: 0.5, strength: 0.8, freshness: 0.1 },
    ingredients: [
      { name: "Rye or Bourbon", amount: "2 oz" },
      { name: "Sweet Vermouth", amount: "1 oz" },
      { name: "Angostura Bitters", amount: "2 dashes" }
    ],
    instructions: "Stir all ingredients with ice until well chilled. Strain into a chilled coupe or cocktail glass. Garnish with a maraschino cherry.",
    glass: "Coupe",
    garnish: "Maraschino Cherry",
    image: "https://www.thecocktaildb.com/images/media/drink/yk70e31606771240.jpg"
  },
  {
    id: "tom-collins",
    name: "Tom Collins",
    flavorProfile: { sweetness: 0.5, bitterness: 0.1, strength: 0.3, freshness: 0.9 },
    ingredients: [
      { name: "Gin", amount: "2 oz" },
      { name: "Fresh Lemon Juice", amount: "1 oz" },
      { name: "Simple Syrup", amount: "0.75 oz" },
      { name: "Club Soda", amount: "Top with" }
    ],
    instructions: "Combine gin, lemon juice, and syrup in a shaker with ice. Shake and strain into a Collins glass over ice. Top with club soda. Garnish with a lemon slice and cherry.",
    glass: "Collins Glass",
    garnish: "Lemon Slice and Cherry",
    image: "https://www.thecocktaildb.com/images/media/drink/7cll921606854636.jpg"
  },
  {
    id: "paloma",
    name: "Paloma",
    flavorProfile: { sweetness: 0.4, bitterness: 0.3, strength: 0.4, freshness: 0.9 },
    ingredients: [
      { name: "Tequila Blanco", amount: "2 oz" },
      { name: "Fresh Grapefruit Juice", amount: "2 oz" },
      { name: "Fresh Lime Juice", amount: "0.5 oz" },
      { name: "Agave Syrup", amount: "0.5 oz" },
      { name: "Club Soda", amount: "Top with" },
      { name: "Salt", amount: "For rim" }
    ],
    instructions: "Salt the rim of a glass. Combine tequila, grapefruit juice, lime juice, and agave in a shaker with ice. Shake and strain over fresh ice. Top with soda. Garnish with a grapefruit slice.",
    glass: "Highball Glass",
    garnish: "Grapefruit Slice",
    image: "https://www.thecocktaildb.com/images/media/drink/samm5j1513706393.jpg"
  },
  {
    id: "sidecar",
    name: "Sidecar",
    flavorProfile: { sweetness: 0.4, bitterness: 0.2, strength: 0.6, freshness: 0.6 },
    ingredients: [
      { name: "Cognac", amount: "2 oz" },
      { name: "Cointreau", amount: "0.75 oz" },
      { name: "Fresh Lemon Juice", amount: "0.75 oz" },
      { name: "Sugar", amount: "For rim" }
    ],
    instructions: "Sugar the rim of a chilled coupe. Shake cognac, Cointreau, and lemon juice with ice until well chilled. Double-strain into the prepared glass. Garnish with a lemon twist.",
    glass: "Coupe",
    garnish: "Lemon Twist",
    image: "https://www.thecocktaildb.com/images/media/drink/sivxxp1472719107.jpg"
  },
  {
    id: "french-75",
    name: "French 75",
    flavorProfile: { sweetness: 0.4, bitterness: 0.1, strength: 0.6, freshness: 0.8 },
    ingredients: [
      { name: "Gin", amount: "1 oz" },
      { name: "Fresh Lemon Juice", amount: "0.75 oz" },
      { name: "Simple Syrup", amount: "0.5 oz" },
      { name: "Champagne", amount: "Top with" }
    ],
    instructions: "Shake gin, lemon juice, and simple syrup with ice. Strain into a chilled champagne flute. Top with champagne. Garnish with a lemon twist.",
    glass: "Champagne Flute",
    garnish: "Lemon Twist",
    image: "https://www.thecocktaildb.com/images/media/drink/hrxfbl1606773109.jpg"
  },
  {
    id: "boulevardier",
    name: "Boulevardier",
    flavorProfile: { sweetness: 0.3, bitterness: 0.8, strength: 0.8, freshness: 0.1 },
    ingredients: [
      { name: "Bourbon", amount: "1.5 oz" },
      { name: "Campari", amount: "1 oz" },
      { name: "Sweet Vermouth", amount: "1 oz" }
    ],
    instructions: "Stir all ingredients with ice until well chilled. Strain into a chilled coupe or over a large ice cube in a rocks glass. Garnish with an orange twist or cherry.",
    glass: "Coupe or Rocks Glass",
    garnish: "Orange Twist",
    image: "https://www.thecocktaildb.com/images/media/drink/km84qi1513705868.jpg"
  },
  {
    id: "dark-n-stormy",
    name: "Dark 'n' Stormy",
    flavorProfile: { sweetness: 0.4, bitterness: 0.2, strength: 0.5, freshness: 0.6 },
    ingredients: [
      { name: "Dark Rum", amount: "2 oz" },
      { name: "Ginger Beer", amount: "4 oz" },
      { name: "Fresh Lime Juice", amount: "0.5 oz" }
    ],
    instructions: "Fill a highball glass with ice. Pour ginger beer and lime juice in first. Float dark rum on top by pouring it over the back of a spoon. Garnish with a lime wedge.",
    glass: "Highball Glass",
    garnish: "Lime Wedge",
    image: "https://www.thecocktaildb.com/images/media/drink/vvprxu1441204329.jpg"
  },
  {
    id: "mint-julep",
    name: "Mint Julep",
    flavorProfile: { sweetness: 0.6, bitterness: 0.1, strength: 0.7, freshness: 0.8 },
    ingredients: [
      { name: "Bourbon", amount: "2.5 oz" },
      { name: "Simple Syrup", amount: "0.5 oz" },
      { name: "Fresh Mint", amount: "8-10 leaves" }
    ],
    instructions: "Gently muddle mint with syrup in a julep cup. Fill with crushed ice and add bourbon. Stir until the cup frosts. Top with more crushed ice and a bouquet of mint. Dust with powdered sugar.",
    glass: "Julep Cup",
    garnish: "Mint Bouquet",
    image: "https://www.thecocktaildb.com/images/media/drink/squyyq1439907312.jpg"
  },
  {
    id: "aperol-spritz",
    name: "Aperol Spritz",
    flavorProfile: { sweetness: 0.5, bitterness: 0.5, strength: 0.2, freshness: 0.7 },
    ingredients: [
      { name: "Aperol", amount: "2 oz" },
      { name: "Prosecco", amount: "3 oz" },
      { name: "Club Soda", amount: "Splash" }
    ],
    instructions: "Fill a wine glass with ice. Pour in prosecco first, then Aperol, then a splash of soda. Stir gently. Garnish with an orange slice.",
    glass: "Wine Glass",
    garnish: "Orange Slice",
    image: "https://www.thecocktaildb.com/images/media/drink/iloasq1587661955.jpg"
  },
  {
    id: "gimlet",
    name: "Gimlet",
    flavorProfile: { sweetness: 0.5, bitterness: 0.1, strength: 0.6, freshness: 0.8 },
    ingredients: [
      { name: "Gin", amount: "2 oz" },
      { name: "Fresh Lime Juice", amount: "0.75 oz" },
      { name: "Simple Syrup", amount: "0.75 oz" }
    ],
    instructions: "Shake gin, lime juice, and simple syrup with ice until very cold. Double-strain into a chilled coupe glass. Garnish with a lime wheel.",
    glass: "Coupe",
    garnish: "Lime Wheel",
    image: "https://www.thecocktaildb.com/images/media/drink/3xgldt1513707271.jpg"
  },
  {
    id: "caipirinha",
    name: "Caipirinha",
    flavorProfile: { sweetness: 0.5, bitterness: 0.1, strength: 0.6, freshness: 0.8 },
    ingredients: [
      { name: "Cachaça", amount: "2 oz" },
      { name: "Lime", amount: "Half, cut into wedges" },
      { name: "Sugar", amount: "2 tsp" }
    ],
    instructions: "Place lime wedges and sugar in a rocks glass. Muddle firmly to extract juice and oils. Fill the glass with crushed ice and pour cachaça over it. Stir well.",
    glass: "Rocks Glass",
    garnish: "Lime Wedge",
    image: "https://www.thecocktaildb.com/images/media/drink/jgvn7p1582484435.jpg"
  },
  {
    id: "long-island-iced-tea",
    name: "Long Island Iced Tea",
    flavorProfile: { sweetness: 0.4, bitterness: 0.1, strength: 0.9, freshness: 0.5 },
    ingredients: [
      { name: "Vodka", amount: "0.5 oz" },
      { name: "Gin", amount: "0.5 oz" },
      { name: "White Rum", amount: "0.5 oz" },
      { name: "Tequila Blanco", amount: "0.5 oz" },
      { name: "Triple Sec", amount: "0.5 oz" },
      { name: "Fresh Lemon Juice", amount: "0.75 oz" },
      { name: "Simple Syrup", amount: "0.5 oz" },
      { name: "Cola", amount: "Top with" }
    ],
    instructions: "Combine spirits, lemon juice, and syrup in a shaker with ice. Shake and strain into a Collins glass over ice. Top with a splash of cola and stir gently. Garnish with a lemon wedge.",
    glass: "Collins Glass",
    garnish: "Lemon Wedge",
    image: "https://www.thecocktaildb.com/images/media/drink/wyrrwv1441207432.jpg"
  },
  {
    id: "tequila-sunrise",
    name: "Tequila Sunrise",
    flavorProfile: { sweetness: 0.7, bitterness: 0.1, strength: 0.4, freshness: 0.6 },
    ingredients: [
      { name: "Tequila Blanco", amount: "2 oz" },
      { name: "Orange Juice", amount: "4 oz" },
      { name: "Grenadine", amount: "0.5 oz" }
    ],
    instructions: "Pour tequila into a chilled highball glass over ice. Add orange juice and stir gently. Slowly pour grenadine down the inside of the glass — it will sink to create the sunrise effect. Do not stir. Garnish with an orange slice.",
    glass: "Highball Glass",
    garnish: "Orange Slice and Cherry",
    image: "https://www.thecocktaildb.com/images/media/drink/quqyqp1480879103.jpg"
  },
  {
    id: "bellini",
    name: "Bellini",
    flavorProfile: { sweetness: 0.7, bitterness: 0.1, strength: 0.2, freshness: 0.8 },
    ingredients: [
      { name: "Peach Purée", amount: "2 oz" },
      { name: "Prosecco", amount: "4 oz" }
    ],
    instructions: "Pour peach purée into a chilled champagne flute. Slowly pour prosecco over the purée. Stir very gently with a long spoon to combine. Serve immediately.",
    glass: "Champagne Flute",
    garnish: "Peach Slice",
    image: "https://www.thecocktaildb.com/images/media/drink/eaag491504367543.jpg"
  },
  {
    id: "sazerac",
    name: "Sazerac",
    flavorProfile: { sweetness: 0.3, bitterness: 0.4, strength: 0.9, freshness: 0.2 },
    ingredients: [
      { name: "Rye Whiskey", amount: "2 oz" },
      { name: "Peychaud's Bitters", amount: "3 dashes" },
      { name: "Sugar", amount: "1 cube" },
      { name: "Absinthe", amount: "Rinse" }
    ],
    instructions: "Rinse a chilled rocks glass with absinthe and discard the excess. In a separate glass, muddle sugar with bitters. Add rye and ice and stir until cold. Strain into the absinthe-rinsed glass. Garnish with a lemon peel.",
    glass: "Rocks Glass",
    garnish: "Lemon Peel",
    image: "https://www.thecocktaildb.com/images/media/drink/vvpxwy1439907208.jpg"
  },
  {
    id: "singapore-sling",
    name: "Singapore Sling",
    flavorProfile: { sweetness: 0.7, bitterness: 0.3, strength: 0.5, freshness: 0.6 },
    ingredients: [
      { name: "Gin", amount: "1.5 oz" },
      { name: "Cherry Heering", amount: "0.5 oz" },
      { name: "Cointreau", amount: "0.25 oz" },
      { name: "Bénédictine", amount: "0.25 oz" },
      { name: "Pineapple Juice", amount: "4 oz" },
      { name: "Fresh Lime Juice", amount: "0.5 oz" },
      { name: "Grenadine", amount: "0.25 oz" },
      { name: "Angostura Bitters", amount: "1 dash" }
    ],
    instructions: "Shake all ingredients with ice. Strain into a Collins glass over ice. Garnish with a pineapple slice and a maraschino cherry.",
    glass: "Collins Glass",
    garnish: "Pineapple Slice and Cherry",
    image: "https://www.thecocktaildb.com/images/media/drink/utohqq1513706877.jpg"
  },
  {
    id: "zombie",
    name: "Zombie",
    flavorProfile: { sweetness: 0.6, bitterness: 0.2, strength: 0.9, freshness: 0.5 },
    ingredients: [
      { name: "White Rum", amount: "1 oz" },
      { name: "Gold Rum", amount: "1 oz" },
      { name: "Dark Rum", amount: "1 oz" },
      { name: "Overproof Rum", amount: "0.5 oz" },
      { name: "Pineapple Juice", amount: "1.5 oz" },
      { name: "Lime Juice", amount: "0.75 oz" },
      { name: "Grenadine", amount: "0.5 oz" },
      { name: "Falernum", amount: "0.5 oz" }
    ],
    instructions: "Blend or shake all rums, juices, grenadine, and falernum with ice. Pour into a tiki glass. Float overproof rum on top and carefully ignite before serving. Garnish with mint and a lime wheel.",
    glass: "Tiki Glass",
    garnish: "Mint and Lime Wheel",
    image: "https://www.thecocktaildb.com/images/media/drink/2en3jk1509557725.jpg"
  },
  {
    id: "clover-club",
    name: "Clover Club",
    flavorProfile: { sweetness: 0.6, bitterness: 0.1, strength: 0.5, freshness: 0.6 },
    ingredients: [
      { name: "Gin", amount: "2 oz" },
      { name: "Fresh Lemon Juice", amount: "0.75 oz" },
      { name: "Raspberry Syrup", amount: "0.5 oz" },
      { name: "Egg White", amount: "1" }
    ],
    instructions: "Combine all ingredients and dry shake without ice. Add ice and shake vigorously. Double-strain into a chilled coupe. Garnish with a few fresh raspberries.",
    glass: "Coupe",
    garnish: "Fresh Raspberries",
    image: "https://www.thecocktaildb.com/images/media/drink/t0iugg1509556712.jpg"
  },
  {
    id: "rusty-nail",
    name: "Rusty Nail",
    flavorProfile: { sweetness: 0.5, bitterness: 0.2, strength: 0.8, freshness: 0.1 },
    ingredients: [
      { name: "Scotch Whisky", amount: "2 oz" },
      { name: "Drambuie", amount: "0.75 oz" }
    ],
    instructions: "Build in a rocks glass over a large ice cube. Add Scotch first, then Drambuie. Stir gently a few times to combine. Garnish with a lemon twist.",
    glass: "Rocks Glass",
    garnish: "Lemon Twist",
    image: "https://www.thecocktaildb.com/images/media/drink/yqsvtw1478252982.jpg"
  },
  {
    id: "white-russian",
    name: "White Russian",
    flavorProfile: { sweetness: 0.8, bitterness: 0.2, strength: 0.6, freshness: 0.0 },
    ingredients: [
      { name: "Vodka", amount: "2 oz" },
      { name: "Kahlúa", amount: "1 oz" },
      { name: "Heavy Cream", amount: "1 oz" }
    ],
    instructions: "Fill a rocks glass with ice. Add vodka and Kahlúa. Gently pour cream over the back of a spoon so it floats on top. Stir lightly before drinking.",
    glass: "Rocks Glass",
    garnish: "None",
    image: "https://www.thecocktaildb.com/images/media/drink/vsrupw1472405732.jpg"
  },
  {
    id: "black-russian",
    name: "Black Russian",
    flavorProfile: { sweetness: 0.5, bitterness: 0.4, strength: 0.7, freshness: 0.0 },
    ingredients: [
      { name: "Vodka", amount: "2 oz" },
      { name: "Kahlúa", amount: "1 oz" }
    ],
    instructions: "Fill a rocks glass with ice. Add vodka and Kahlúa. Stir gently to combine. Serve as is.",
    glass: "Rocks Glass",
    garnish: "None",
    image: "https://www.thecocktaildb.com/images/media/drink/2k5gbb1504367689.jpg"
  },
  {
    id: "vesper",
    name: "Vesper",
    flavorProfile: { sweetness: 0.1, bitterness: 0.2, strength: 0.9, freshness: 0.3 },
    ingredients: [
      { name: "Gin", amount: "3 oz" },
      { name: "Vodka", amount: "1 oz" },
      { name: "Lillet Blanc", amount: "0.5 oz" }
    ],
    instructions: "Combine all ingredients in a shaker with ice. Shake until extremely cold. Strain into a chilled martini glass. Garnish with a large lemon twist.",
    glass: "Martini Glass",
    garnish: "Lemon Twist",
    image: "https://www.thecocktaildb.com/images/media/drink/xt1ux71504370554.jpg"
  },
  {
    id: "corpse-reviver-2",
    name: "Corpse Reviver #2",
    flavorProfile: { sweetness: 0.3, bitterness: 0.2, strength: 0.6, freshness: 0.8 },
    ingredients: [
      { name: "Gin", amount: "0.75 oz" },
      { name: "Cointreau", amount: "0.75 oz" },
      { name: "Lillet Blanc", amount: "0.75 oz" },
      { name: "Fresh Lemon Juice", amount: "0.75 oz" },
      { name: "Absinthe", amount: "Rinse" }
    ],
    instructions: "Rinse a chilled coupe with absinthe. Shake all other ingredients with ice until cold. Double-strain into the glass. Garnish with a cherry.",
    glass: "Coupe",
    garnish: "Cherry",
    image: "https://www.thecocktaildb.com/images/media/drink/rqxvqv1472668229.jpg"
  },
  {
    id: "aviation",
    name: "Aviation",
    flavorProfile: { sweetness: 0.4, bitterness: 0.1, strength: 0.6, freshness: 0.6 },
    ingredients: [
      { name: "Gin", amount: "2 oz" },
      { name: "Maraschino Liqueur", amount: "0.5 oz" },
      { name: "Crème de Violette", amount: "0.25 oz" },
      { name: "Fresh Lemon Juice", amount: "0.75 oz" }
    ],
    instructions: "Shake all ingredients with ice until cold. Double-strain into a chilled coupe. Garnish with a maraschino cherry.",
    glass: "Coupe",
    garnish: "Maraschino Cherry",
    image: "https://www.thecocktaildb.com/images/media/drink/trbplb1606855233.jpg"
  },
  {
    id: "paper-plane",
    name: "Paper Plane",
    flavorProfile: { sweetness: 0.4, bitterness: 0.5, strength: 0.6, freshness: 0.5 },
    ingredients: [
      { name: "Bourbon", amount: "0.75 oz" },
      { name: "Aperol", amount: "0.75 oz" },
      { name: "Amaro Nonino", amount: "0.75 oz" },
      { name: "Fresh Lemon Juice", amount: "0.75 oz" }
    ],
    instructions: "Combine equal parts of all ingredients in a shaker with ice. Shake until cold. Double-strain into a chilled coupe. No garnish needed.",
    glass: "Coupe",
    garnish: "None",
    image: "https://www.thecocktaildb.com/images/media/drink/rqpypv1468923888.jpg"
  },
  {
    id: "penicillin",
    name: "Penicillin",
    flavorProfile: { sweetness: 0.4, bitterness: 0.2, strength: 0.7, freshness: 0.5 },
    ingredients: [
      { name: "Blended Scotch", amount: "2 oz" },
      { name: "Fresh Lemon Juice", amount: "0.75 oz" },
      { name: "Honey-Ginger Syrup", amount: "0.75 oz" },
      { name: "Islay Scotch", amount: "0.25 oz float" }
    ],
    instructions: "Shake blended Scotch, lemon juice, and honey-ginger syrup with ice. Strain into a rocks glass over a large ice cube. Float Islay Scotch on top. Garnish with candied ginger.",
    glass: "Rocks Glass",
    garnish: "Candied Ginger",
    image: "https://www.thecocktaildb.com/images/media/drink/9074xb1504370889.jpg"
  },
  {
    id: "last-word",
    name: "Last Word",
    flavorProfile: { sweetness: 0.4, bitterness: 0.3, strength: 0.6, freshness: 0.7 },
    ingredients: [
      { name: "Gin", amount: "0.75 oz" },
      { name: "Green Chartreuse", amount: "0.75 oz" },
      { name: "Maraschino Liqueur", amount: "0.75 oz" },
      { name: "Fresh Lime Juice", amount: "0.75 oz" }
    ],
    instructions: "Combine equal parts of all ingredients in a shaker with ice. Shake until cold. Double-strain into a chilled coupe. Garnish with a maraschino cherry.",
    glass: "Coupe",
    garnish: "Maraschino Cherry",
    image: "https://www.thecocktaildb.com/images/media/drink/6kos3r1504371959.jpg"
  },
  {
    id: "bees-knees",
    name: "Bee's Knees",
    flavorProfile: { sweetness: 0.6, bitterness: 0.1, strength: 0.6, freshness: 0.7 },
    ingredients: [
      { name: "Gin", amount: "2 oz" },
      { name: "Fresh Lemon Juice", amount: "0.75 oz" },
      { name: "Honey Syrup", amount: "0.75 oz" }
    ],
    instructions: "Shake all ingredients with ice until cold. Double-strain into a chilled coupe glass. Garnish with a lemon twist.",
    glass: "Coupe",
    garnish: "Lemon Twist",
    image: "https://www.thecocktaildb.com/images/media/drink/tx8ne41582475326.jpg"
  },
  {
    id: "americano",
    name: "Americano",
    flavorProfile: { sweetness: 0.3, bitterness: 0.7, strength: 0.2, freshness: 0.4 },
    ingredients: [
      { name: "Campari", amount: "1.5 oz" },
      { name: "Sweet Vermouth", amount: "1.5 oz" },
      { name: "Club Soda", amount: "Top with" }
    ],
    instructions: "Build in a rocks glass over ice. Add Campari and sweet vermouth, then top with soda. Stir gently. Garnish with an orange slice.",
    glass: "Rocks Glass",
    garnish: "Orange Slice",
    image: "https://www.thecocktaildb.com/images/media/drink/trwruu1478253126.jpg"
  },
  {
    id: "cuba-libre",
    name: "Cuba Libre",
    flavorProfile: { sweetness: 0.6, bitterness: 0.2, strength: 0.4, freshness: 0.5 },
    ingredients: [
      { name: "Dark Rum", amount: "2 oz" },
      { name: "Fresh Lime Juice", amount: "0.5 oz" },
      { name: "Cola", amount: "4 oz" }
    ],
    instructions: "Fill a highball glass with ice. Squeeze lime juice over the ice, then drop in the wedge. Add rum and top with cola. Stir briefly. Garnish with a lime wedge.",
    glass: "Highball Glass",
    garnish: "Lime Wedge",
    image: "https://www.thecocktaildb.com/images/media/drink/wmkbfj1606853905.jpg"
  },
  {
    id: "mojito",
    name: "Mojito",
    flavorProfile: { sweetness: 0.7, bitterness: 0.1, strength: 0.3, freshness: 0.9 },
    ingredients: [
      { name: "White Rum", amount: "2 oz" },
      { name: "Fresh Lime Juice", amount: "1 oz" },
      { name: "Simple Syrup", amount: "0.75 oz" },
      { name: "Mint Leaves", amount: "8-10 leaves" },
      { name: "Soda Water", amount: "Top with" }
    ],
    instructions: "Muddle mint leaves with simple syrup and lime juice. Add rum and fill with crushed ice. Top with soda water and stir gently. Garnish with a mint sprig.",
    glass: "Highball Glass",
    garnish: "Mint Sprig",
    image: "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg"
  },
  {
    id: "spritz-veneziano",
    name: "Spritz Veneziano",
    flavorProfile: { sweetness: 0.4, bitterness: 0.6, strength: 0.2, freshness: 0.6 },
    ingredients: [
      { name: "Select Aperitivo", amount: "2 oz" },
      { name: "Prosecco", amount: "3 oz" },
      { name: "Club Soda", amount: "Splash" }
    ],
    instructions: "Fill a wine glass with ice. Add prosecco first, then the aperitivo, then a splash of soda. Stir once. Garnish with a green olive and orange slice.",
    glass: "Wine Glass",
    garnish: "Green Olive and Orange Slice",
    image: "https://www.thecocktaildb.com/images/media/drink/iloasq1587661955.jpg"
  },
  {
    id: "sex-on-the-beach",
    name: "Sex on the Beach",
    flavorProfile: { sweetness: 0.8, bitterness: 0.1, strength: 0.3, freshness: 0.6 },
    ingredients: [
      { name: "Vodka", amount: "1.5 oz" },
      { name: "Peach Schnapps", amount: "0.5 oz" },
      { name: "Orange Juice", amount: "2 oz" },
      { name: "Cranberry Juice", amount: "2 oz" }
    ],
    instructions: "Build over ice in a highball glass. Add vodka and peach schnapps, then fill with equal parts orange juice and cranberry juice. Stir gently. Garnish with an orange slice.",
    glass: "Highball Glass",
    garnish: "Orange Slice",
    image: "https://www.thecocktaildb.com/images/media/drink/twsvwr1469097741.jpg"
  },
  {
    id: "espresso-martini",
    name: "Espresso Martini",
    flavorProfile: { sweetness: 0.5, bitterness: 0.6, strength: 0.7, freshness: 0.0 },
    ingredients: [
      { name: "Vodka", amount: "2 oz" },
      { name: "Kahlúa", amount: "0.5 oz" },
      { name: "Fresh Espresso", amount: "1 oz" },
      { name: "Simple Syrup", amount: "0.25 oz" }
    ],
    instructions: "Shake all ingredients hard with ice to produce a thick foam. Double-strain into a chilled martini glass. Garnish with three coffee beans.",
    glass: "Martini Glass",
    garnish: "Three Coffee Beans",
    image: "https://www.thecocktaildb.com/images/media/drink/n0sx531504372951.jpg"
  },
  {
    id: "amaretto-sour",
    name: "Amaretto Sour",
    flavorProfile: { sweetness: 0.7, bitterness: 0.2, strength: 0.4, freshness: 0.5 },
    ingredients: [
      { name: "Amaretto", amount: "2 oz" },
      { name: "Cask-Proof Bourbon", amount: "0.75 oz" },
      { name: "Fresh Lemon Juice", amount: "1 oz" },
      { name: "Simple Syrup", amount: "0.25 oz" },
      { name: "Egg White", amount: "1" }
    ],
    instructions: "Dry shake all ingredients without ice. Add ice and shake vigorously. Double-strain into a rocks glass over ice. Garnish with an orange peel and a cherry.",
    glass: "Rocks Glass",
    garnish: "Orange Peel and Cherry",
    image: "https://www.thecocktaildb.com/images/media/drink/xnzc541493070211.jpg"
  },
  {
    id: "gin-and-tonic",
    name: "Gin and Tonic",
    flavorProfile: { sweetness: 0.2, bitterness: 0.5, strength: 0.4, freshness: 0.7 },
    ingredients: [
      { name: "Gin", amount: "2 oz" },
      { name: "Tonic Water", amount: "4 oz" }
    ],
    instructions: "Fill a highball glass with ice. Add gin and top with tonic water. Stir gently once. Garnish with a lime wedge or cucumber slice.",
    glass: "Highball Glass",
    garnish: "Lime Wedge or Cucumber",
    image: "https://www.thecocktaildb.com/images/media/drink/qcgz0t1643821443.jpg"
  },
  {
    id: "jungle-bird",
    name: "Jungle Bird",
    flavorProfile: { sweetness: 0.5, bitterness: 0.5, strength: 0.6, freshness: 0.5 },
    ingredients: [
      { name: "Dark Rum", amount: "1.5 oz" },
      { name: "Campari", amount: "0.75 oz" },
      { name: "Pineapple Juice", amount: "1.5 oz" },
      { name: "Fresh Lime Juice", amount: "0.5 oz" },
      { name: "Simple Syrup", amount: "0.5 oz" }
    ],
    instructions: "Shake all ingredients with ice until cold. Strain into a tiki glass over ice. Garnish with a pineapple chunk and a lime wheel.",
    glass: "Tiki Glass",
    garnish: "Pineapple Chunk and Lime Wheel",
    image: "https://www.thecocktaildb.com/images/media/drink/47mgcr1574030174.jpg"
  }
];
