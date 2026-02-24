import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Music, Sparkles, TrendingUp,Wine} from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import AudioRecorder from "../components/AudioRecorder";
import { fft } from "fft-js";
import { util as fftUtil } from "fft-js";

const Home = () => {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioFeatures, setAudioFeatures] = useState(null);
  const [detectedMood, setDetectedMood] = useState(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-cocktail-gold/10 via-transparent to-cocktail-purple/10" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4"
                >
                  <Music className="w-16 h-16 text-cocktail-gold/20" />
                </motion.div>
                <Wine className="w-16 h-16 text-cocktail-gold relative z-10" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-cocktail text-cocktail-gradient mb-6">
              Sonic Mixologist
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Transform your favorite songs into perfect cocktail recommendations
            </p>

            <div className="flex flex-col items-center space-y-4 mb-12">
              <div className="flex items-center space-x-2 text-cocktail-gold">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium">AI-Powered Audio Analysis</span>
              </div>
            </div>
          </motion.div>

          {/* Audio Recording Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="mt-8 flex flex-col items-center">
              {!isProcessing ? (
                <AudioRecorder
                  onAudioCaptured={async (blob) => {
                    setIsProcessing(true);
                    
                    try {
                      const arrayBuffer = await blob.arrayBuffer();
                      const audioContext = new AudioContext();
                      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

                      const channelData = audioBuffer.getChannelData(0);

                      // RMS Energy
                      let sum = 0;
                      for (let i = 0; i < channelData.length; i++) {
                        sum += channelData[i] * channelData[i];
                      }
                      const rms = Math.sqrt(sum / channelData.length);

                      // Zero Crossing Rate
                      let zeroCrossings = 0;
                      for (let i = 1; i < channelData.length; i++) {
                        if (
                          (channelData[i - 1] >= 0 && channelData[i] < 0) ||
                          (channelData[i - 1] < 0 && channelData[i] >= 0)
                        ) {
                          zeroCrossings++;
                        }
                      }
                      const zcr = zeroCrossings / channelData.length;

                      // Spectral Centroid + Bass
                      const fftSize = 2048;
                      const sampleRate = audioBuffer.sampleRate;
                      const frequencyPerBin = sampleRate / fftSize;

                      let centroidSum = 0;
                      let windowCount = 0;
                      let bassSum = 0;

                      for (let start = 0; start < channelData.length - fftSize; start += fftSize) {
                        const segment = channelData.slice(start, start + fftSize);

                        const phasors = fft(segment);
                        const magnitudes = fftUtil.fftMag(phasors);

                        let numerator = 0;
                        let denominator = 0;

                        for (let i = 0; i < magnitudes.length; i++) {
                          const frequency = i * frequencyPerBin;
                          numerator += frequency * magnitudes[i];
                          denominator += magnitudes[i];

                          // Bass detection (<200Hz)
                          if (frequency < 200) {
                            bassSum += magnitudes[i];
                          }
                        }

                        if (denominator > 0) {
                          centroidSum += numerator / denominator;
                          windowCount++;
                        }
                      }

                      const spectralCentroid =
                        windowCount > 0 ? centroidSum / windowCount : 0;

                      // Normalize
                      const normalizedEnergy = Math.min(rms * 10, 1);
                      const normalizedRoughness = Math.min(zcr * 5, 1);
                      const normalizedBrightness = Math.min(spectralCentroid / 5000, 1);
                      const normalizedBass = Math.min(bassSum / 10000, 1);

                      const features = {
                        energy: normalizedEnergy,
                        roughness: normalizedRoughness,
                        brightness: normalizedBrightness,
                        bass: normalizedBass
                      };

                      setAudioFeatures(features);

                      // Mood Logic
                      let mood = "Balanced";

                      if (normalizedEnergy > 0.7 && normalizedBrightness > 0.6) {
                        mood = "Energetic & Bright";
                      } else if (normalizedEnergy > 0.6 && normalizedBrightness < 0.4) {
                        mood = "Heavy & Dark";
                      } else if (normalizedEnergy < 0.4 && normalizedBrightness < 0.4) {
                        mood = "Chill & Warm";
                      } else if (normalizedRoughness > 0.6) {
                        mood = "Aggressive";
                      }

                      const moodToDrinkMap = {
                        "Energetic & Bright": "Mojito",
                        "Heavy & Dark": "Old Fashioned",
                        "Chill & Warm": "Whiskey Sour",
                        "Aggressive": "Negroni",
                        "Balanced": "Gin & Tonic"
                      };

                      const recommendedDrink = moodToDrinkMap[mood];

                      setDetectedMood({
                        mood,
                        drink: recommendedDrink
                      });

                      // Navigate to results page with the analysis data
setTimeout(() => {
  setIsProcessing(false);
  navigate('/results', { 
    state: { 
      audioFeatures: features,
      detectedMood: { mood, drink: recommendedDrink },
      fromAudioRecording: true
    } 
  });
}, 1000);
                      
                    } catch (error) {
                      console.error('Audio processing error:', error);
                      setIsProcessing(false);
                    }
                  }}
                />
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <LoadingSpinner />
                  <p className="text-white text-center">
                    {audioFeatures ? 'Analysis complete! Redirecting...' : 'Processing your audio...'}
                  </p>
                  {audioFeatures && (
                    <div className="text-white text-center space-y-1">
                      <p>Energy: {audioFeatures.energy.toFixed(2)}</p>
                      <p>Brightness: {audioFeatures.brightness.toFixed(2)}</p>
                      <p>Roughness: {audioFeatures.roughness.toFixed(2)}</p>
                      <p>Bass: {audioFeatures.bass.toFixed(2)}</p>
                      <p className="mt-2 text-cocktail-gold font-semibold">
                        Recommended Drink: {detectedMood?.drink}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Background decorations */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-cocktail-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-cocktail-amber/5 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-20 px-4 bg-cocktail-darker/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-cocktail text-cocktail-gradient mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 text-lg">
              Discover the science behind sonic mixology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Audio Analysis',
                description: 'Our AI analyzes energy, valence, tempo, and acousticness to understand the song\'s mood.',
                color: 'cocktail-purple'
              },
              {
                icon: Wine,
                title: 'Perfect Match',
                description: 'We translate the audio profile into a mood cluster and recommend the perfect cocktail.',
                color: 'cocktail-gold'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${feature.color}/20 flex items-center justify-center group-hover:bg-${feature.color}/30 transition-colors`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
