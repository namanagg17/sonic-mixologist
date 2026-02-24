import { motion } from 'framer-motion'
import { Wine } from 'lucide-react'
import { Music, Github, Twitter, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/yourusername/sonic-mixologist',
      icon: Github,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/yourusername',
      icon: Twitter,
    },
  ]

  return (
    <footer className="bg-cocktail-darker border-t border-cocktail-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Wine className="w-8 h-8 text-cocktail-gold" />
              <Music className="w-5 h-5 text-cocktail-amber" />
              <span className="text-xl font-cocktail text-cocktail-gradient">
                Sonic Mixologist
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Discover the perfect cocktail based on audio analysis using AI-powered mood detection.
            </p>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-cocktail-rose" />
              <span>and cocktails</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-cocktail-gold uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm text-gray-400 hover:text-cocktail-gold transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm text-gray-400 hover:text-cocktail-gold transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-sm text-gray-400 hover:text-cocktail-gold transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-cocktail-gold uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-cocktail-gold/10 text-cocktail-gold hover:bg-cocktail-gold/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            
            <div className="space-y-2 text-xs text-gray-500">
              <p>© {currentYear} Sonic Mixologist. All rights reserved.</p>
              <p>Please drink responsibly.</p>
              <p className="flex items-center space-x-1">
                <span>Powered by</span>
                <span className="text-cocktail-gold">Web Audio API</span>
                <span>&</span>
                <span className="text-cocktail-gold">FFT Analysis</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-cocktail-gold/20">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-xs text-gray-500">
              This application is for educational and entertainment purposes only.
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <a href="#terms" className="hover:text-cocktail-gold transition-colors">
                Terms of Service
              </a>
              <span>•</span>
              <a href="#privacy" className="hover:text-cocktail-gold transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
