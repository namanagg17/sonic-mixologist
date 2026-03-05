import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Wine } from 'lucide-react'
import { Music, Menu, X, Github, ExternalLink } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'How it Works', href: '/how-it-works' },
  ]

  return (
    <nav className="bg-cocktail-darker/80 backdrop-blur-lg border-b border-cocktail-gold/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Wine className="w-8 h-8 text-cocktail-gold group-hover:text-cocktail-amber transition-colors" />
              <Music className="w-5 h-5 text-cocktail-amber absolute -bottom-1 -right-1" />
            </motion.div>
            <span className="text-xl font-cocktail text-cocktail-gradient hidden sm:block">
              Sonic Mixologist
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-cocktail-gold ${
                  location.pathname === item.href
                    ? 'text-cocktail-gold'
                    : 'text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* GitHub Link */}
            <a
              href="https://github.com/yourusername/sonic-mixologist"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-2 text-sm text-gray-400 hover:text-cocktail-gold transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-cocktail-gold hover:bg-cocktail-gold/10 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-cocktail-gold/20"
          >
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-cocktail-gold hover:bg-cocktail-gold/10 ${
                    location.pathname === item.href
                      ? 'text-cocktail-gold bg-cocktail-gold/10'
                      : 'text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 mt-4 border-t border-cocktail-gold/20">
                <a
                  href="https://github.com/yourusername/sonic-mixologist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-400 hover:text-cocktail-gold transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View on GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
