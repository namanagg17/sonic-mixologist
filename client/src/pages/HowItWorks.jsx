import { motion } from "framer-motion";
import { Music, Cpu, Activity, Brain, Wine } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Music,
      title: "Audio Capture",
      description:
        "The application records a short audio sample using the device microphone. This audio sample represents the music currently playing in the environment."
    },
    {
      icon: Cpu,
      title: "Signal Processing",
      description:
        "The recorded audio is processed using the Web Audio API. The signal is divided into small frames and analyzed using Fast Fourier Transform (FFT) to examine the frequency spectrum."
    },
    {
      icon: Activity,
      title: "Feature Extraction",
      description:
        "Several acoustic features are extracted from the audio signal including energy, brightness, bass ratio, roughness, and dynamic range."
    },
    {
      icon: Brain,
      title: "Mood Classification",
      description:
        "A weighted scoring system analyzes the extracted features and determines the mood of the music such as energetic, aggressive, chill, or dark."
    },
    {
      icon: Wine,
      title: "Cocktail Recommendation",
      description:
        "Based on the detected mood, the system selects a cocktail from a curated dataset where each drink is mapped to specific musical moods."
    }
  ];

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-cocktail text-center mb-12 text-cocktail-gradient"
        >
          How Sonic Mixologist Works
        </motion.h1>

        {/* Visual Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16"
        >
          <div className="glass-card p-6 text-center">
            <Music className="w-10 h-10 text-cocktail-gold mx-auto mb-2" />
            <p className="text-white font-medium">Audio Capture</p>
          </div>

          <div className="text-cocktail-gold text-2xl">→</div>

          <div className="glass-card p-6 text-center">
            <Cpu className="w-10 h-10 text-cocktail-gold mx-auto mb-2" />
            <p className="text-white font-medium">DSP Analysis</p>
          </div>

          <div className="text-cocktail-gold text-2xl">→</div>

          <div className="glass-card p-6 text-center">
            <Brain className="w-10 h-10 text-cocktail-gold mx-auto mb-2" />
            <p className="text-white font-medium">Mood Detection</p>
          </div>

          <div className="text-cocktail-gold text-2xl">→</div>

          <div className="glass-card p-6 text-center">
            <Wine className="w-10 h-10 text-cocktail-gold mx-auto mb-2" />
            <p className="text-white font-medium">Cocktail Match</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-card p-8 rounded-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-8 h-8 text-cocktail-gold" />
                  <h2 className="text-2xl font-semibold text-white">
                    {step.title}
                  </h2>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default HowItWorks;
