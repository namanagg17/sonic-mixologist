import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Music
} from 'lucide-react'

import LoadingSpinner from '../components/LoadingSpinner'
import DrinkCard from '../components/DrinkCard'
import AudioFeatureDisplay from '../components/AudioFeatureDisplay'

// Helper functions for drink data
const getIngredientsForDrink = (drink) => {
  const drinkRecipes = {
    'Mojito': ['Light rum', 'Fresh mint', 'Sugar', 'Lime juice', 'Soda water'],
    'Old Fashioned': ['Bourbon', 'Sugar', 'Angostura bitters', 'Orange peel'],
    'Whiskey Sour': ['Whiskey', 'Lemon juice', 'Sugar', 'Egg white'],
    'Negroni': ['Gin', 'Campari', 'Sweet vermouth'],
    'Gin & Tonic': ['Gin', 'Tonic water', 'Lime wedge']
  }
  return drinkRecipes[drink] || ['Spirit', 'Mixer', 'Garnish']
}

const getMeasurementsForDrink = (drink) => {
  const drinkMeasurements = {
    'Mojito': ['2 oz', '8-10 leaves', '2 tsp', '1 oz', '4 oz'],
    'Old Fashioned': ['2.5 oz', '1 cube', '2 dashes', '1 peel'],
    'Whiskey Sour': ['2 oz', '1 oz', '0.75 oz', '1 egg white'],
    'Negroni': ['1 oz', '1 oz', '1 oz'],
    'Gin & Tonic': ['2 oz', '4 oz', '1 wedge']
  }
  return drinkMeasurements[drink] || ['2 oz', '4 oz', '1 unit']
}

const getInstructionsForDrink = (drink) => {
  const drinkInstructions = {
    'Mojito': 'Muddle mint leaves with sugar and lime juice. Add rum and top with soda water. Garnish with mint sprig.',
    'Old Fashioned': 'Muddle sugar with bitters. Add bourbon and stir. Express orange peel oils over drink and garnish.',
    'Whiskey Sour': 'Shake whiskey, lemon juice, sugar, and egg white with ice. Strain into glass and garnish.',
    'Negroni': 'Stir all ingredients with ice. Strain into rocks glass with fresh ice. Garnish with orange peel.',
    'Gin & Tonic': 'Pour gin over ice in tall glass. Top with tonic water. Garnish with lime wedge.'
  }
  return drinkInstructions[drink] || 'Combine ingredients in glass with ice. Stir well and garnish.'
}

const Results = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const audioFeatures = location.state?.audioFeatures
  const detectedMood = location.state?.detectedMood
  const fromAudioRecording = location.state?.fromAudioRecording

  // 🚨 Guard: if no audio features, show record first message
  if (!audioFeatures || !detectedMood) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p className="text-gray-400 text-lg">Record Audio First</p>
        <button 
          onClick={() => navigate('/')} 
          className="cocktail-button"
        >
          Go to Recording
        </button>
      </div>
    )
  }

  const handleBack = () => {
    navigate('/')
  }

  // Create drink data from detected mood
  const drinkData = {
    name: detectedMood.drink,
    ingredients: getIngredientsForDrink(detectedMood.drink),
    measurements: getMeasurementsForDrink(detectedMood.drink),
    instructions: getInstructionsForDrink(detectedMood.drink),
    isAlcoholic: true,
    glass: 'Cocktail glass',
    category: 'Classic Cocktail'
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-cocktail-gold"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-cocktail text-cocktail-gradient">
            Audio Analysis Results
          </h1>
          <p className="text-gray-300 text-lg mt-2">
            Mood: {detectedMood.mood}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Audio Section */}
          <div className="glass-card p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Music size={20} />
              <h2 className="text-xl font-semibold">Audio Analysis</h2>
            </div>

            <AudioFeatureDisplay features={{
              energy: audioFeatures.energy,
              valence: audioFeatures.energy, // Using energy as valence proxy
              tempo: 120, // Default tempo
              acousticness: 1 - audioFeatures.energy // Inverse energy as acousticness
            }} />

            <div className="mt-6">
              <p className="text-cocktail-gold font-medium">
                Detected Mood
              </p>
              <p className="text-white text-lg">
                {detectedMood.mood}
              </p>
              <p className="text-gray-400 text-sm">
                Based on audio analysis
              </p>
            </div>
          </div>

          {/* Drink Section */}
          <div className="glass-card p-6">
            <DrinkCard drink={drinkData} />
          </div>

        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-400">
          Generated from audio recording
        </div>

      </div>
    </div>
  )
}

export default Results