import { runYamnet } from "../ml/yamnet";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Music, Sparkles, Wine} from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import AudioRecorder from "../components/AudioRecorder";
import { fft } from "fft-js";
import { util as fftUtil } from "fft-js";
import { cocktails as drinks } from "../data/cocktailDataset";
import { detectMoodFromEmbedding } from "../ml/moodClassifier";

const Home = () => {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioFeatures, setAudioFeatures] = useState(null);
  const [detectedMood, setDetectedMood] = useState(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center justify-center px-4">
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
                      const embedding = await runYamnet(audioBuffer);

const moodPrediction = detectMoodFromEmbedding(embedding);

                      const channelData = audioBuffer.getChannelData(0);

                      // ===== FRAME-BASED AUDIO FEATURE EXTRACTION =====

                      const fftSize = 2048;
                      const sampleRate = audioBuffer.sampleRate;
                      const frequencyPerBin = sampleRate / fftSize;

                      const energyFrames = [];
                      const zcrFrames = [];
                      const centroidFrames = [];
                      const bassFrames = [];

                      // ----- Spectral Flux accumulators -----
                      let spectralFluxSum = 0;
                      let previousMagnitudes = null;

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

                        // ----- Spectral Flux -----
                        if (previousMagnitudes) {
                          let flux = 0;
                          for (let i = 0; i < magnitudes.length; i++) {
                            const diff = magnitudes[i] - previousMagnitudes[i];
                            if (diff > 0) flux += diff;
                          }
                          spectralFluxSum += flux;
                        }
                        previousMagnitudes = magnitudes;

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

                      // ----- BPM via Autocorrelation on Onset Envelope -----

                      // Half-wave rectified energy difference = onset envelope
                      const onsetEnvelope = [];
                      for (let i = 1; i < energyFrames.length; i++) {
                        const diff = energyFrames[i] - energyFrames[i - 1];
                        onsetEnvelope.push(Math.max(diff, 0));
                      }

                      function autocorrelate(buffer) {
                        const result = new Array(buffer.length).fill(0);
                        for (let lag = 0; lag < buffer.length; lag++) {
                          for (let i = 0; i < buffer.length - lag; i++) {
                            result[lag] += buffer[i] * buffer[i + lag];
                          }
                        }
                        return result;
                      }

                      // Each frame = fftSize samples; frameTime in seconds
                      const frameTime = fftSize / sampleRate;

                      // Convert lag bounds (0.3 s – 2 s) to frame indices
                      const minLag = Math.ceil(0.3 / frameTime);
                      const maxLag = Math.floor(2.0 / frameTime);

                      let bpm = 120; // sensible default

                      if (onsetEnvelope.length > maxLag) {
                        const ac = autocorrelate(onsetEnvelope);

                        let bestLag = minLag;
                        let bestVal = -Infinity;

                        for (let lag = minLag; lag <= Math.min(maxLag, ac.length - 1); lag++) {
                          if (ac[lag] > bestVal) {
                            bestVal = ac[lag];
                            bestLag = lag;
                          }
                        }

                        const period = bestLag * frameTime; // seconds per beat
                        const rawBPM = 60 / period;
                        bpm = Math.min(Math.max(Math.round(rawBPM), 60), 180);
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

                      // ----- Compute Variance (Frame Stability Measure) -----
                      const variance = (arr) => {
                        if (arr.length === 0) return 0;
                        const m = mean(arr);
                        return arr.reduce((a, b) => a + Math.pow(b - m, 2), 0) / arr.length;
                      };

                      const energyVariance = variance(energyFrames);
                      const centroidVariance = variance(centroidFrames);

                      // ----- Normalize (Volume-Independent Energy Scaling) -----

                      const maxEnergy = Math.max(...energyFrames);
                      const relativeEnergy = maxEnergy > 0 ? energyMean / maxEnergy : 0;
                      const normalizedEnergy = Math.min(relativeEnergy * 1.5, 1);

                      // Roughness (ZCR) scaled reasonably
                      const normalizedRoughness = Math.min(zcrMean * 5, 1);

                      // Brightness scaled to realistic centroid range
                      const normalizedBrightness = Math.min(centroidMean / 4000, 1);

                      // Bass is already a ratio (0–1), no need to divide again
                      const normalizedBass = Math.min(bassMean, 1);

                      // ----- Spectral Flux (average + normalize) -----
                      const spectralFlux = spectralFluxSum / (energyFrames.length || 1);
                      const normalizedFlux = Math.min(spectralFlux / 500, 1);

                      const features = {
                        energy: normalizedEnergy,
                        roughness: normalizedRoughness,
                        brightness: normalizedBrightness,
                        bass: normalizedBass,
                        dynamicRange: Math.min(Math.max(...energyFrames) - Math.min(...energyFrames), 1),
                        energyVariance,
                        brightnessVariance: centroidVariance,
                        spectralFlux: normalizedFlux,
                        bpm
                      };

                      // ===== Audio Explanation Engine =====
                      function generateAudioExplanation(features, mood) {
                        const reasons = [];

                        if (mood === "chill") {
                          if (features.energy < 0.35)
                            reasons.push("Low energy levels suggesting a calmer track");

                          if (features.roughness < 0.3)
                            reasons.push("Smooth audio texture with minimal transients");

                          if (features.dynamicRange < 0.35)
                            reasons.push("Stable dynamics indicating a relaxed sound profile");
                        }

                        if (mood === "dark") {
                          if (features.brightness < 0.35)
                            reasons.push("Low brightness indicating darker tonal characteristics");

                          if (features.bass > 0.4)
                            reasons.push("Strong bass frequencies detected");

                          if (features.dynamicRange > 0.35)
                            reasons.push("Moderate dynamic shifts contributing to a darker atmosphere");
                        }

                        if (mood === "energetic") {
                          if (features.energy > 0.55)
                            reasons.push("High energy detected in the audio");

                          if (features.brightness > 0.5)
                            reasons.push("Bright high-frequency content detected");

                          if (features.dynamicRange > 0.45)
                            reasons.push("Dynamic changes indicating an energetic track");
                        }

                        if (mood === "aggressive") {
                          if (features.roughness > 0.45)
                            reasons.push("High roughness suggesting aggressive transients");

                          if (features.dynamicRange > 0.5)
                            reasons.push("Strong dynamic range indicating punchy audio changes");

                          if (features.energy > 0.5)
                            reasons.push("Elevated energy levels detected");

                          if (features.spectralFlux > 0.4)
                            reasons.push("High spectral flux indicating rapid tonal changes and distortion");

                          if (features.bpm > 130)
                            reasons.push(`Fast tempo of ${features.bpm} BPM reinforcing aggressive intensity`);
                        }

                        if (mood === "energetic") {
                          if (features.bpm > 100 && features.bpm <= 130)
                            reasons.push(`Upbeat tempo of ${features.bpm} BPM driving energetic feel`);
                        }

                        if (mood === "chill") {
                          if (features.bpm < 80)
                            reasons.push(`Slow tempo of ${features.bpm} BPM reinforcing a relaxed vibe`);
                        }

                        return reasons;
                      }

                      setAudioFeatures(features);

                      // ===== YAMNet Prototype Classifier (authoritative mood) =====
                      const { mood: finalMood, confidence: moodConfidence, scores: moodScores } = moodPrediction;

                      // ----- BPM score boosts (applied on top of cosine scores) -----
                      if (bpm > 130)        moodScores.aggressive = (moodScores.aggressive ?? 0) + 0.20;
                      if (bpm > 100 && bpm <= 130) moodScores.energetic  = (moodScores.energetic  ?? 0) + 0.15;
                      if (bpm < 80)         moodScores.chill      = (moodScores.chill      ?? 0) + 0.15;

                      // Re-pick winner after boost
                      const boostedMood = Object.entries(moodScores)
                        .sort((a, b) => b[1] - a[1])[0][0];

                      // Map audio features to a flavor vector
                      function mapAudioToFlavor(f) {
                        return {
                          sweetness:  Math.max(0, 1 - f.brightness),
                          bitterness: f.bass,
                          strength:   f.energy,
                          freshness:  Math.min(Math.max((f.bpm - 60) / 120, 0), 1)
                        };
                      }

                      // Cosine similarity between two flavor objects
                      function computeDrinkSimilarity(audioFlavor, drinkFlavor) {
                        const keys = ['sweetness', 'bitterness', 'strength', 'freshness'];
                        let dot = 0, magA = 0, magB = 0;
                        for (const k of keys) {
                          dot  += audioFlavor[k] * drinkFlavor[k];
                          magA += audioFlavor[k] ** 2;
                          magB += drinkFlavor[k] ** 2;
                        }
                        const denom = Math.sqrt(magA) * Math.sqrt(magB);
                        return denom === 0 ? 0 : dot / denom;
                      }

                      // Pick best-matching drink via flavor similarity
                      const audioFlavor = mapAudioToFlavor(features);
                      let bestDrink = null;
                      let bestScore = -Infinity;
                      for (const d of drinks) {
                        if (!d.flavorProfile) continue;
                        const score = computeDrinkSimilarity(audioFlavor, d.flavorProfile);
                        if (score > bestScore) { bestScore = score; bestDrink = d; }
                      }
                      const recommendedDrink = bestDrink;
                      const drinkMatchScore = (bestScore + 1) / 2;

                      const explanation = generateAudioExplanation(features, boostedMood);

                      setDetectedMood({
                        mood: boostedMood,
                        confidence: moodConfidence
                      });

                      // Navigate to results page with the analysis data
                      setTimeout(() => {
                        setIsProcessing(false);

                        navigate('/results', {
                          state: {
                            audioFeatures: features,
                            detectedMood: {
                              mood: boostedMood,
                              confidence: moodConfidence,
                              scores: moodScores
                            },
                            drink: recommendedDrink,
                            drinkMatchScore: drinkMatchScore,
                            explanation: explanation,
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

    </div>
  )
}

export default Home
