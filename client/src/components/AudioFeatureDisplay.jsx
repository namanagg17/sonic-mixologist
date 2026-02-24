import { motion } from 'framer-motion'

const AudioFeatureDisplay = ({ features }) => {

  if (!features) {
    return null
  }

  const {
    energy = 0,
    valence = 0,
    tempo = 0,
    acousticness = 0
  } = features

  const FeatureBar = ({ label, value }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-sm text-gray-400">
        <span>{label}</span>
        <span>{Math.round(value * 100)}%</span>
      </div>
      <div className="w-full bg-cocktail-darker rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          transition={{ duration: 0.8 }}
          className="h-2 bg-gradient-to-r from-cocktail-gold to-cocktail-amber rounded-full"
        />
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <FeatureBar label="Energy" value={energy} />
      <FeatureBar label="Valence" value={valence} />
      <FeatureBar label="Acousticness" value={acousticness} />

      <div className="space-y-1">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Tempo</span>
          <span>{Math.round(tempo)} BPM</span>
        </div>
        <div className="text-cocktail-gold font-semibold">
          {Math.round(tempo)} BPM
        </div>
      </div>
    </div>
  )
}

export default AudioFeatureDisplay