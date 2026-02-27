import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Music, Sparkles, TrendingUp,Wine} from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import AudioRecorder from "../components/AudioRecorder";
import { fft } from "fft-js";
import { util as fftUtil } from "fft-js";
import { drinks } from "../data/drinks";

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

                      // ===== FRAME-BASED AUDIO FEATURE EXTRACTION =====

                      const fftSize = 2048;
                      const sampleRate = audioBuffer.sampleRate;
                      const frequencyPerBin = sampleRate / fftSize;

                      const energyFrames = [];
                      const zcrFrames = [];
                      const centroidFrames = [];
                      const bassFrames = [];

                      for (let start = 0; start < channelData.length - fftSize; start += fftSize) {
                        let segment = channelData.slice(start, start + fftSize);

                        // Apply Hann Window
                        for (let i = 0; i < segment.length; i++) {
                          segment[i] *=
                            0.5 *
                            (1 - Math.cos((2 * Math.PI * i) / (segment.length - 1)));
                        }

                        // ----- RMS (Energy) per frame -----
                        let frameEnergy = 0;
                        for (let i = 0; i < segment.length; i++) {
                          frameEnergy += segment[i] * segment[i];
                        }
                        frameEnergy = Math.sqrt(frameEnergy / segment.length);
                        energyFrames.push(frameEnergy);

                        // ----- Zero Crossing Rate per frame -----
                        let zeroCrossings = 0;
                        for (let i = 1; i < segment.length; i++) {
                          if (
                            (segment[i - 1] >= 0 && segment[i] < 0) ||
                            (segment[i - 1] < 0 && segment[i] >= 0)
                          ) {
                            zeroCrossings++;
                          }
                        }
                        zcrFrames.push(zeroCrossings / segment.length);

                        // ----- FFT -----
                        const phasors = fft(segment);
                        const magnitudes = fftUtil.fftMag(phasors);

                        let numerator = 0;
                        let denominator = 0;

                        let bassEnergy = 0;
                        let midEnergy = 0;
                        let highEnergy = 0;

                        for (let i = 0; i < magnitudes.length; i++) {
                          const frequency = i * frequencyPerBin;
                          const magnitude = magnitudes[i];

                          numerator += frequency * magnitude;
                          denominator += magnitude;

                          // Frequency band separation
                          if (frequency < 200) {
                            bassEnergy += magnitude;
                          } else if (frequency < 2000) {
                            midEnergy += magnitude;
                          } else {
                            highEnergy += magnitude;
                          }
                        }

                        if (denominator > 0) {
                          const centroid = numerator / denominator;
                          centroidFrames.push(centroid);
                        }

                        const totalEnergy = bassEnergy + midEnergy + highEnergy;

                        if (totalEnergy > 0) {
                          bassFrames.push(bassEnergy / totalEnergy);
                        }
                      }

                      // ----- Compute Means -----
                      const mean = (arr) =>
                        arr.length > 0
                          ? arr.reduce((a, b) => a + b, 0) / arr.length
                          : 0;

                      const energyMean = mean(energyFrames);

                      // ===== Silence Detection =====
                      // If overall RMS energy is extremely low, treat as no music detected
                      if (energyMean < 0.01) {
                        console.warn("Silence or very low audio detected");
                        setIsProcessing(false);
                        alert("No significant music detected. Please increase volume or move closer to the speaker.");
                        return;
                      }

                      const zcrMean = mean(zcrFrames);
                      const centroidMean = mean(centroidFrames);
                      const bassMean = mean(bassFrames);
                      console.log("Bass Ratio Mean:", bassMean);

                      // ----- Compute Variance (Frame Stability Measure) -----
                      const variance = (arr) => {
                        if (arr.length === 0) return 0;
                        const m = mean(arr);
                        return arr.reduce((a, b) => a + Math.pow(b - m, 2), 0) / arr.length;
                      };

                      const energyVariance = variance(energyFrames);
                      const centroidVariance = variance(centroidFrames);

                      // ----- Normalize (Volume-Independent Energy Scaling) -----

                      // Make energy relative to the loudest frame in this clip
                      const maxFrameEnergy = Math.max(...energyFrames, 0.00001);
                      const relativeEnergy = energyMean / maxFrameEnergy;

                      const normalizedEnergy = Math.min(relativeEnergy, 1);

                      // Roughness (ZCR) scaled reasonably
                      const normalizedRoughness = Math.min(zcrMean * 5, 1);

                      // Brightness scaled to realistic centroid range
                      const normalizedBrightness = Math.min(centroidMean / 4000, 1);

                      // Bass is already a ratio (0–1), no need to divide again
                      const normalizedBass = Math.min(bassMean, 1);

                      const features = {
                        energy: normalizedEnergy,
                        roughness: normalizedRoughness,
                        brightness: normalizedBrightness,
                        bass: normalizedBass,
                        energyVariance,
                        brightnessVariance: centroidVariance
                      };

                      setAudioFeatures(features);

                      // ===== Weighted Mood Classification Engine (Gated Version) =====

                      // Gate chill so it only activates for truly low energy tracks
                      const chillBase =
                        normalizedEnergy < 0.4
                          ? (1 - normalizedEnergy) * 0.6 +
                            (1 - normalizedRoughness) * 0.25 +
                            (1 - energyVariance) * 0.15
                          : 0;

                      const moodScores = {
                        energetic:
                          normalizedEnergy * 0.5 +
                          normalizedBrightness * 0.3 +
                          energyVariance * 0.2,

                        dark:
                          normalizedEnergy * 0.35 +
                          (1 - normalizedBrightness) * 0.4 +
                          normalizedBass * 0.25,

                        chill: chillBase,

                        aggressive:
                          normalizedRoughness * 0.45 +
                          normalizedEnergy * 0.35 +
                          energyVariance * 0.2
                      };

                      // Sort moods by score (highest first)
                      const sortedMoods = Object.entries(moodScores).sort(
                        (a, b) => b[1] - a[1]
                      );

                      const [topMood, topScore] = sortedMoods[0];
                      const [, secondScore] = sortedMoods[1];

                      // Confidence = difference between top two scores
                      const confidence = topScore - secondScore;

                      // Lookup drink from structured dataset
                      const recommendedDrink = drinks.find(d =>
                        d.moodAffinity.includes(topMood)
                      );

                      setDetectedMood({
                        mood: topMood,
                        confidence
                      });

                      // Navigate to results page with the analysis data
setTimeout(() => {
  setIsProcessing(false);

  navigate('/results', {
    state: {
      audioFeatures: features,
      detectedMood: {
        mood: topMood,
        confidence
      },
      drink: recommendedDrink,
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
