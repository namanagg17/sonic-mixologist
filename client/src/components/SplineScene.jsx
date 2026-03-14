import { useState, useCallback, lazy, Suspense, Component } from 'react'
import { motion } from 'framer-motion'
import { Wine, Music } from 'lucide-react'

const Spline = lazy(() => import('@splinetool/react-spline'))

/** Error boundary that catches Spline load / render failures gracefully */
class SplineErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

/**
 * SplineScene – Renders an interactive 3D Spline scene that responds to hover.
 *
 * Replace the `sceneUrl` prop with your own Spline scene URL.
 * To create the bartender-pouring-cocktail-with-musical-notes scene:
 *   1. Open https://spline.design and design your 3D scene.
 *   2. Add hover-based events in Spline (e.g., rotate glass, pour liquid, animate notes).
 *   3. Export or publish the scene to get a production URL.
 *   4. Pass that URL as the `sceneUrl` prop.
 */
const SplineScene = ({
  sceneUrl = 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = useCallback((splineApp) => {
    setIsLoaded(true)
    // Store reference if you need programmatic control later
    // e.g. splineApp.emitEvent('mouseHover', 'object-name')
    if (splineApp) {
      splineApp.setZoom && splineApp.setZoom(0.8)
    }
  }, [])

  if (hasError) {
    return <SplinePlaceholder />
  }

  return (
    <SplineErrorBoundary fallback={<SplinePlaceholder />}>
      <motion.div
        className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow ring that activates on hover */}
        <motion.div
          className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cocktail-gold/30 via-cocktail-amber/20 to-cocktail-purple/30 blur-lg pointer-events-none z-0"
          animate={{
            opacity: isHovered ? 0.8 : 0.2,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Spline container */}
        <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-cocktail-darker/80">
          <Suspense fallback={<SplineFallback />}>
            <Spline
              scene={sceneUrl}
              onLoad={handleLoad}
              onError={() => setHasError(true)}
              style={{ width: '100%', height: '100%' }}
            />
          </Suspense>

          {/* Loading overlay – fades out once the scene is ready */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-cocktail-darker/90 z-20">
              <SplineFallback />
            </div>
          )}

          {/* Hover hint – visible until user hovers */}
          <motion.div
            className="absolute bottom-3 left-0 right-0 text-center pointer-events-none z-20"
            animate={{ opacity: isHovered ? 0 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs text-cocktail-gold/80 bg-cocktail-darker/60 px-3 py-1 rounded-full backdrop-blur-sm">
              Hover to interact
            </span>
          </motion.div>
        </div>
      </motion.div>
    </SplineErrorBoundary>
  )
}

/** Animated placeholder shown while the Spline scene loads */
const SplineFallback = () => (
  <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
    <div className="relative">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className="text-cocktail-gold/30"
      >
        <Music className="w-12 h-12" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360, scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 text-cocktail-amber"
      >
        <Wine className="w-12 h-12" />
      </motion.div>
    </div>
    <p className="text-cocktail-gold/60 text-sm">Loading 3D scene…</p>
  </div>
)

/** Static fallback shown when the Spline scene fails to load */
const SplinePlaceholder = () => (
  <motion.div
    className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.3 }}
  >
    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cocktail-gold/20 via-cocktail-amber/10 to-cocktail-purple/20 blur-lg pointer-events-none" />
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-cocktail-darker/80 flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="text-cocktail-gold/20"
        >
          <Music className="w-20 h-20" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center text-cocktail-gold"
        >
          <Wine className="w-16 h-16" />
        </motion.div>
      </div>
      <p className="text-cocktail-gold/50 text-sm text-center px-6">
        3D scene unavailable — replace the Spline URL with your published scene
      </p>
    </div>
  </motion.div>
)

export default SplineScene
