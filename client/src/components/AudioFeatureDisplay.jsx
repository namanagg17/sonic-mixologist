import { motion } from 'framer-motion'

const AudioFeatureDisplay = ({ features }) => {

  if (!features) {
    return null
  }

  const {
    energy = 0,
    brightness = 0,
    roughness = 0,
    bass = 0,
    spectralFlux = 0,
    bpm = 120,
  } = features

  const FeatureBar = ({ label, value, color = 'from-cocktail-gold to-cocktail-amber' }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-sm text-gray-400">
        <span>{label}</span>
        <span>{(value * 100).toFixed(1)}%</span>
      </div>
      <div className="w-full bg-cocktail-darker rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(value * 100, 100)}%` }}
          transition={{ duration: 0.8 }}
          className={`h-2 bg-gradient-to-r ${color} rounded-full`}
        />
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      <FeatureBar label="Energy" value={energy} />
      <FeatureBar label="Brightness" value={brightness} />
      <FeatureBar label="Roughness" value={roughness} />
      <FeatureBar label="Bass" value={bass} />
      <FeatureBar
        label="Spectral Flux"
        value={spectralFlux}
        color="from-cocktail-purple to-cocktail-gold"
      />

      {/* BPM — shown as a plain metric, not a 0-1 bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Tempo (BPM)</span>
          <span className="text-cocktail-gold font-semibold">{bpm} BPM</span>
        </div>
        <div className="w-full bg-cocktail-darker rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((bpm - 60) / 120) * 100}%` }}
            transition={{ duration: 0.8 }}
            className="h-2 bg-gradient-to-r from-cocktail-amber to-cocktail-purple rounded-full"
          />
        </div>
        <p className="text-xs text-gray-500">
          {bpm < 80 ? 'Slow' : bpm <= 100 ? 'Moderate' : bpm <= 130 ? 'Upbeat' : 'Fast'}
        </p>
      </div>
    </div>
  )
}

export default AudioFeatureDisplay