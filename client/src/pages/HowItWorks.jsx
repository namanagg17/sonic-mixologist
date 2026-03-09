import { motion } from "framer-motion";
import { Mic, BarChart2, Brain, Smile, Wine, Activity } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const steps = [
  {
    number: "01",
    icon: Mic,
    title: "Audio Capture",
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/20",
    accent: "text-blue-400",
    dot: "bg-blue-500",
    description: "You record a short audio sample through your browser microphone. No audio leaves your device — the stream is processed entirely in-browser using the Web Audio API.",
    pills: ["Web Audio API", "MediaRecorder", "Browser-local"],
  },
  {
    number: "02",
    icon: BarChart2,
    title: "DSP Feature Extraction",
    color: "from-purple-500/20 to-purple-600/10 border-purple-500/20",
    accent: "text-purple-400",
    dot: "bg-purple-500",
    description: "The audio buffer is divided into overlapping FFT frames. Five acoustic features are extracted from each frame and averaged across the full recording.",
    pills: ["RMS Energy", "Spectral Centroid", "Bass Ratio", "Spectral Flux", "BPM"],
    detail: [
      { label: "Energy", desc: "Overall loudness and dynamic intensity" },
      { label: "Brightness", desc: "Balance of high vs low frequencies" },
      { label: "Bass Ratio", desc: "Weight of sub-bass energy" },
      { label: "Spectral Flux", desc: "Rate of spectral change — detects distortion" },
      { label: "Tempo (BPM)", desc: "Estimated via onset autocorrelation" },
    ],
  },
  {
    number: "03",
    icon: Brain,
    title: "YAMNet AI Embedding",
    color: "from-amber-500/20 to-amber-600/10 border-amber-500/20",
    accent: "text-amber-400",
    dot: "bg-amber-500",
    description: "The audio signal is passed through YAMNet — Google's pretrained audio neural network running locally via TensorFlow.js. Each 0.96-second frame produces a 1024-dimensional embedding vector. Frames are mean-pooled into one vector.",
    pills: ["YAMNet", "TensorFlow.js", "1024-dim vector", "Mean pooling"],
  },
  {
    number: "04",
    icon: Smile,
    title: "Mood Detection",
    color: "from-rose-500/20 to-rose-600/10 border-rose-500/20",
    accent: "text-rose-400",
    dot: "bg-rose-500",
    description: "The mean embedding is compared against four mood prototype centroids — Aggressive, Energetic, Chill, and Dark — each learned by averaging YAMNet embeddings from real training songs. Cosine similarity scores determine the closest mood. BPM boosts are applied as a final adjustment.",
    pills: ["Cosine Similarity", "Prototype Classification", "4 Mood Classes", "BPM Boost"],
  },
  {
    number: "05",
    icon: Wine,
    title: "Cocktail Recommendation",
    color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/20",
    accent: "text-emerald-400",
    dot: "bg-emerald-500",
    description: "DSP features are mapped to a four-dimensional flavor vector (sweetness, bitterness, strength, freshness). This vector is compared against all 47 cocktails using cosine similarity. The highest-scoring drink is recommended with a calibrated match percentage.",
    pills: ["Flavor Vector", "47 Cocktails", "Cosine Similarity", "Match Score"],
  },
];

function StepCard({ step, index }) {
  const Icon = step.icon;
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      custom={index}
      viewport={{ once: true, margin: "-60px" }}
      className="relative flex gap-6"
    >
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full ${step.dot} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg`}>
          {index + 1}
        </div>
        {index < steps.length - 1 && (
          <div className="w-px flex-1 mt-3 bg-white/10" />
        )}
      </div>

      <div className={`flex-1 mb-10 bg-gradient-to-br ${step.color} border rounded-2xl p-6`}>
        <div className="flex items-center gap-3 mb-3">
          <Icon size={20} className={step.accent} />
          <span className={`text-xs font-mono font-bold ${step.accent} opacity-60`}>
            STEP {step.number}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
        <p className="text-white/60 leading-relaxed text-sm mb-4">{step.description}</p>

        {step.detail && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {step.detail.map(({ label, desc }) => (
              <div key={label} className="bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                <p className={`text-xs font-semibold ${step.accent} mb-0.5`}>{label}</p>
                <p className="text-white/40 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {step.pills.map((p) => (
            <span key={p} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
              {p}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white px-4 py-16">
      <div className="max-w-2xl mx-auto">

        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm mb-6">
            <Activity size={14} /> System Architecture
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-amber-400">Works</span>
          </h1>
          <p className="text-white/50 text-lg max-w-lg mx-auto leading-relaxed">
            A five-stage pipeline combining digital signal processing and machine learning to match music to cocktails.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" custom={0}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-1 flex-wrap mb-14"
        >
          {["Audio", "DSP", "YAMNet", "Mood", "Cocktail"].map((label, i, arr) => (
            <div key={label} className="flex items-center gap-1">
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-xs font-mono">
                {label}
              </span>
              {i < arr.length - 1 && <span className="text-white/20 text-xs">→</span>}
            </div>
          ))}
        </motion.div>

        <div>
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>

        <motion.p
          variants={fadeUp} initial="hidden" whileInView="show" custom={6}
          viewport={{ once: true }}
          className="text-center text-white/30 text-sm mt-4"
        >
          All processing runs locally in your browser. No audio is ever uploaded to a server.
        </motion.p>

      </div>
    </div>
  );
};

export default HowItWorks;
