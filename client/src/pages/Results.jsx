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

const Results = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const audioFeatures = location.state?.audioFeatures
  const detectedMood = location.state?.detectedMood
  const drink = location.state?.drink
  const drinkMatchScore = location.state?.drinkMatchScore
  const explanation = location.state?.explanation
  const fromAudioRecording = location.state?.fromAudioRecording

  // 🚨 Guard: if no audio features, show record first message
  if (!audioFeatures || !detectedMood || !drink) {
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
          <p className="text-gray-300 text-lg mt-2 capitalize">
            Mood: <span className="text-cocktail-gold font-semibold">{detectedMood.mood}</span>
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
              brightness: audioFeatures.brightness,
              roughness: audioFeatures.roughness,
              bass: audioFeatures.bass,
              spectralFlux: audioFeatures.spectralFlux ?? 0,
              bpm: audioFeatures.bpm ?? 120
            }} />

            <div className="mt-6">
              <p className="text-cocktail-gold font-medium mb-2">Detected Mood</p>

              <p className="text-white text-2xl font-semibold capitalize mb-1">
                {detectedMood.mood}
              </p>

              {detectedMood.confidence != null && (
                <div className="mb-4">
                  <p className="text-gray-400 text-xs mb-1">
                    Confidence: {(detectedMood.confidence * 100).toFixed(1)}%
                  </p>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-cocktail-gold h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(detectedMood.confidence * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {explanation && explanation.length > 0 && (
              <div className="mt-6">
                <p className="text-cocktail-gold font-medium">Why this mood was detected:</p>
                <ul className="text-gray-300 text-sm mt-2 list-disc list-inside">
                  {explanation.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Drink Section */}
          <div className="glass-card p-6">
            <DrinkCard drink={drink} matchScore={drinkMatchScore} />
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