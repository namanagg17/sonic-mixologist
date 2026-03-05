import { motion } from "framer-motion";
import { Music, Brain, Wine, Cpu } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-cocktail text-center mb-12 text-cocktail-gradient"
        >
          About Sonic Mixologist
        </motion.h1>

        {/* Project Idea */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2 text-white">
            <Music className="text-cocktail-gold" /> The Idea
          </h2>

          <p className="text-gray-300 leading-relaxed">
            Sonic Mixologist explores the relationship between music and taste.
            The system listens to the music around you and analyzes its acoustic
            characteristics such as energy, brightness, bass intensity and
            rhythm. Based on these features, the system detects the mood of the
            music and recommends a cocktail that best matches that atmosphere.
          </p>
        </motion.section>

        {/* How it works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2 text-white">
            <Cpu className="text-cocktail-gold" /> How It Works
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              1. The system records a short audio sample using the device
              microphone.
            </p>

            <p>
              2. The audio signal is processed using digital signal processing
              techniques to extract meaningful audio features.
            </p>

            <p>
              3. These features are used to classify the mood of the music.
            </p>

            <p>
              4. A cocktail with a matching flavor profile is selected from a
              curated drink dataset.
            </p>
          </div>
        </motion.section>

        {/* Audio Analysis */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2 text-white">
            <Brain className="text-cocktail-gold" /> Audio Analysis
          </h2>

          <p className="text-gray-300 leading-relaxed">
            The application performs frame-based audio analysis using the Web
            Audio API and Fast Fourier Transform (FFT). Each audio frame is
            analyzed to extract several acoustic features:
          </p>

          <ul className="list-disc ml-6 mt-4 text-gray-300 space-y-2">
            <li>Energy – measures loudness and intensity of the music</li>
            <li>Brightness – detects the amount of high-frequency content</li>
            <li>Bass Ratio – measures low-frequency dominance</li>
            <li>Roughness – estimates the aggressiveness of the sound</li>
            <li>Dynamic Range – detects variations in loudness</li>
          </ul>
        </motion.section>

        {/* Cocktail Recommendation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2 text-white">
            <Wine className="text-cocktail-gold" /> Cocktail Recommendation
          </h2>

          <p className="text-gray-300 leading-relaxed">
            Each cocktail in the system contains a flavor profile and mood
            affinity. After the music mood is detected, the system selects a
            cocktail whose flavor characteristics best match the detected
            atmosphere of the music.
          </p>

          <p className="text-gray-300 mt-4">
            For example:
          </p>

          <ul className="list-disc ml-6 mt-2 text-gray-300 space-y-1">
            <li>Energetic music → refreshing drinks like Mojito or Margarita</li>
            <li>Aggressive music → strong drinks like Negroni or Martini</li>
            <li>Chill music → smooth drinks like Old Fashioned</li>
          </ul>
        </motion.section>

      </div>
    </div>
  );
};

export default About;
