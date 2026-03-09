import { Wine } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Clock, 
  Users, 
  Glasses, 
  Heart, 
  Share2, 
  ChevronDown,
  ChevronUp,
  Copy,
  Check
} from 'lucide-react'

const DrinkCard = ({ drink, matchScore }) => {
  const [showFullInstructions, setShowFullInstructions] = useState(false)
  const [copied, setCopied] = useState(false)

  // Safety guard
  if (!drink) {
    return (
      <div className="glass-card p-6 text-center">
        <p className="text-gray-400">No drink recommendation available</p>
      </div>
    )
  }

  const handleCopyInstructions = async () => {
    const instructions = `${drink.name}\n\nIngredients:\n${drink.ingredients.map((ing) => 
      `${ing.amount} ${ing.name}`
    ).join('\n')}\n\nInstructions:\n${drink.instructions}`
    
    try {
      await navigator.clipboard.writeText(instructions)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleShare = async () => {
    const shareText = `${drink.name} - Perfect cocktail match!`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: drink.name,
          text: shareText
        })
      } catch (error) {
        console.log('Share cancelled or failed')
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error('Failed to copy share text:', error)
      }
    }
  }

  const formatInstructions = (instructions) => {
    if (!instructions) return 'No instructions available'
    
    return instructions.split('.').map((sentence, index) => 
      sentence.trim() && (
        <div key={index} className="mb-2">
          {sentence.trim()}{index < instructions.split('.').length - 1 && '.'}
        </div>
      )
    )
  }

  const displayInstructions = showFullInstructions 
    ? drink.instructions 
    : drink.instructions?.substring(0, 150) + (drink.instructions?.length > 150 ? '...' : '')

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-card overflow-hidden group"
    >
      {/* Drink Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={drink.image}
          alt={drink.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://www.thecocktaildb.com/images/media/drink/wyrrwv1441207432.jpg";
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleShare}
            className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-cocktail-gold/20 transition-colors"
            aria-label="Share drink"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Badge */}
        {drink.isAlcoholic !== undefined && (
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              drink.isAlcoholic 
                ? 'bg-cocktail-rose text-white' 
                : 'bg-cocktail-mint text-white'
            }`}>
              {drink.isAlcoholic ? 'Alcoholic' : 'Mocktail'}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-2xl font-cocktail text-cocktail-gradient mb-2">
            {drink.name}
          </h3>
          
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            {drink.glass && (
              <div className="flex items-center space-x-1">
                <Wine className="w-4 h-4" />
                <span>{drink.glass}</span>
              </div>
            )}
            
            {drink.category && (
              <div className="flex items-center space-x-1">
                <span>{drink.category}</span>
              </div>
            )}
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-cocktail-gold uppercase tracking-wider mb-2">
            Ingredients
          </h4>
          <div className="space-y-1">
            {drink.ingredients?.map((ingredient, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-cocktail-gold rounded-full" />
                <span className="text-gray-300">
                  {ingredient.amount} {ingredient.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-cocktail-gold uppercase tracking-wider">
              Instructions
            </h4>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyInstructions}
                className="p-1 text-gray-400 hover:text-cocktail-gold transition-colors"
                aria-label="Copy instructions"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-cocktail-mint" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              
              {drink.instructions && drink.instructions.length > 150 && (
                <button
                  onClick={() => setShowFullInstructions(!showFullInstructions)}
                  className="p-1 text-gray-400 hover:text-cocktail-gold transition-colors"
                  aria-label={showFullInstructions ? 'Show less' : 'Show more'}
                >
                  {showFullInstructions ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-300 leading-relaxed">
            {formatInstructions(displayInstructions)}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-cocktail-gold/20">
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4 text-cocktail-rose" />
            <span className="text-xs text-gray-400">Flavor Match</span>
          </div>
          {matchScore != null && (
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-400">Match Score:</span>
              <span className="text-sm font-semibold text-cocktail-gold">
                {Math.round(matchScore * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default DrinkCard
