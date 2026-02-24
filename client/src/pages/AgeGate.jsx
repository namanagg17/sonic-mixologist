import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wine, Music } from 'lucide-react'

const AgeGate = ({ onVerify }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleVerification = async (isOver21) => {
    setIsLoading(true)
    // Simulate processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))
    onVerify(isOver21)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cocktail-darker via-cocktail-dark to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card max-w-md w-full p-8 text-center"
      >
        {/* Logo/Icons */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <Wine className="w-12 h-12 text-cocktail-gold" />
            <Music className="w-8 h-8 text-cocktail-amber absolute -bottom-1 -right-1" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-cocktail text-cocktail-gradient mb-4"
        >
          Sonic Mixologist
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 mb-8 leading-relaxed"
        >
          Discover the perfect cocktail based on your favorite songs using AI-powered audio analysis
        </motion.p>

        {/* Age Verification */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <div className="bg-cocktail-gold/10 border border-cocktail-gold/20 rounded-lg p-4 mb-6">
            <p className="text-sm text-cocktail-gold mb-2">
              🍸 Age Verification Required
            </p>
            <p className="text-xs text-gray-400">
              You must be 21 years or older to access alcoholic content. 
              Non-alcoholic options are available.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleVerification(true)}
              disabled={isLoading}
              className="cocktail-button w-full text-lg py-4 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-cocktail-dark border-t-transparent rounded-full animate-spin mr-2" />
                  Verifying...
                </span>
              ) : (
                'Yes, I am 21 or older'
              )}
            </button>

            <button
              onClick={() => handleVerification(false)}
              disabled={isLoading}
              className="w-full px-6 py-3 border border-cocktail-gold/30 text-cocktail-gold rounded-lg hover:bg-cocktail-gold/10 transition-all duration-300 disabled:opacity-50"
            >
              No, I am under 21
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-gray-500 mt-6"
        >
          By entering, you agree to our terms of service and privacy policy.
          Please drink responsibly.
        </motion.p>
      </motion.div>

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cocktail-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-cocktail-amber/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cocktail-purple/5 rounded-full blur-3xl" />
      </div>
    </div>
  )
}

export default AgeGate

