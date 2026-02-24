import { motion } from 'framer-motion'
import { Wine, Music } from 'lucide-react'

const LoadingSpinner = ({ 
  size = 'medium', 
  message = 'Loading...', 
  showIcons = true 
}) => {

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      
      {/* Animated Icons */}
      {showIcons && (
        <div className="relative">
          
          {/* Music rotating background */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className={`${sizeClasses[size]} text-cocktail-gold/30`}
          >
            <Music className="w-full h-full" />
          </motion.div>
          
          {/* Wine icon rotating opposite */}
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
            className={`absolute inset-0 ${sizeClasses[size]} text-cocktail-amber`}
          >
            <Wine className="w-full h-full" />
          </motion.div>
        </div>
      )}

      {/* Spinning Ring */}
      <div className="relative">
        <div className={`${sizeClasses[size]} border-2 border-cocktail-gold/20 rounded-full`} />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-0 ${sizeClasses[size]} border-2 border-cocktail-gold rounded-full border-t-transparent border-r-transparent`}
        />
      </div>

      {/* Message */}
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-cocktail-gold text-center max-w-xs"
        >
          {message}
        </motion.p>
      )}

      {/* Decorative bars animation */}
      <div className="flex items-center space-x-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="w-2 h-8 bg-gradient-to-t from-cocktail-gold to-cocktail-amber rounded-full"
          />
        ))}
      </div>
    </div>
  )
}


// Compact spinner version
export const CompactSpinner = ({ size = 'small' }) => {

  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  }

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${sizeClasses[size]} border-2 border-cocktail-gold rounded-full border-t-transparent border-r-transparent`}
    />
  )
}

export default LoadingSpinner