import { motion } from "framer-motion";
import {
  Mic, Brain, Wine, Shield, Database,
  Layers, Music
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const Section = ({ icon: Icon, title, children, index }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    custom={index}
    viewport={{ once: true }}
    className="bg-white/5 border border-white/10 rounded-2xl p-8"
  >
    <div className="flex items-center gap-3 mb-5">
      <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
        <Icon size={22} />
      </div>
      <h2 className="text-xl font-semibold text-white">{title}</h2>
    </div>
    {children}
  </motion.div>
);

const Badge = ({ label }) => (
  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full
    bg-amber-500/10 text-amber-300 border border-amber-500/20 mr-2 mb-2">
    {label}
  </span>
);

const TechGroup = ({ heading, items }) => (
  <div className="mb-5">
    <p className="text-xs uppercase tracking-widest text-white/40 mb-2">{heading}</p>
    <div className="flex flex-wrap">
      {items.map((t) => <Badge key={t} label={t} />)}
    </div>
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950
      text-white px-4 py-16">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Hero */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm mb-6">
            <Music size={14} /> About Sonic Mixologist
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Where <span className="text-amber-400">Sound</span> Meets{" "}
            <span className="text-amber-400">Flavor</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
            A real-time audio intelligence system that listens to music and
            recommends cocktails based on its sonic DNA.
          </p>
        </motion.div>

        {/* Overview */}
        <Section icon={Mic} title="Project Overview" index={0}>
          <p className="text-white/60 leading-relaxed mb-4">
            Music has measurable, physical characteristics — energy, brightness,
            rhythmic intensity, bass weight, and tonal complexity. Sonic Mixologist
            captures these traits in real time through your microphone and translates
            them into a <span className="text-amber-400 font-medium">flavor profile</span>.
          </p>
          <p className="text-white/60 leading-relaxed">
            That flavor profile is then matched against a curated dataset of 47 classic
            cocktails using cosine similarity — finding the drink whose taste
            characteristics most closely mirror what the music sounds like.
            No manual tagging. No mood wheels. Pure signal.
          </p>
        </Section>

        {/* Tech stack */}
        <Section icon={Layers} title="Technology Stack" index={1}>
          <TechGroup
            heading="Frontend"
            items={["React 18", "Vite", "Tailwind CSS", "Framer Motion"]}
          />
          <TechGroup
            heading="Audio Processing"
            items={[
              "Web Audio API",
              "FFT (Fast Fourier Transform)",
              "RMS Energy",
              "Spectral Centroid",
              "Spectral Flux",
              "Zero Crossing Rate",
              "Bass Ratio",
              "BPM Autocorrelation",
            ]}
          />
          <TechGroup
            heading="Machine Learning"
            items={[
              "YAMNet (TensorFlow.js)",
              "1024-dim Audio Embeddings",
              "Cosine Similarity",
              "Prototype Classification",
            ]}
          />
          <TechGroup
            heading="Recommendation Engine"
            items={[
              "Flavor Vector Mapping",
              "Cosine Similarity Search",
              "47-cocktail Dataset",
            ]}
          />
        </Section>

        {/* Dataset */}
        <Section icon={Database} title="Cocktail Dataset" index={2}>
          <p className="text-white/60 leading-relaxed mb-4">
            The recommendation engine searches across{" "}
            <span className="text-amber-400 font-medium">47 classic cocktails</span>,
            each hand-calibrated with a four-dimensional flavor profile:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Sweetness", desc: "Sugar, syrups, liqueurs" },
              { label: "Bitterness", desc: "Amari, hops, tannins" },
              { label: "Strength", desc: "ABV, spirit intensity" },
              { label: "Freshness", desc: "Citrus, mint, effervescence" },
            ].map(({ label, desc }) => (
              <div key={label}
                className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-amber-400 font-semibold text-sm mb-1">{label}</p>
                <p className="text-white/50 text-xs">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-white/40 text-sm mt-4">
            Includes Negroni, Daiquiri, Old Fashioned, Paper Plane, Penicillin,
            Last Word, Zombie, Singapore Sling, and 34 more.
          </p>
        </Section>

        {/* ML detail */}
        <Section icon={Brain} title="Machine Learning Architecture" index={3}>
          <p className="text-white/60 leading-relaxed mb-4">
            Audio is passed through{" "}
            <span className="text-amber-400 font-medium">YAMNet</span> — Google's
            pretrained audio classification network — which outputs a
            1024-dimensional embedding per 0.96-second frame.
          </p>
          <p className="text-white/60 leading-relaxed mb-4">
            These frames are averaged into a single mean embedding representing
            the recording. That vector is compared against{" "}
            <span className="text-amber-400 font-medium">mood prototype centroids</span>{" "}
            (learned from real training songs) using cosine similarity to
            determine the emotional character of the audio.
          </p>
          <p className="text-white/60 leading-relaxed">
            Simultaneously, raw DSP features (energy, brightness, bass, flux, BPM)
            are mapped to a flavor vector and matched against the cocktail dataset
            in a second cosine similarity pass — the best-scoring drink wins.
          </p>
        </Section>

        {/* Privacy */}
        <Section icon={Shield} title="Privacy" index={4}>
          <p className="text-white/60 leading-relaxed">
            All audio processing happens{" "}
            <span className="text-amber-400 font-medium">entirely in your browser</span>.
            No audio is recorded, stored, or sent to any server. The microphone
            stream is consumed locally by the Web Audio API and discarded after
            analysis. Sonic Mixologist never sees your audio — only your device does.
          </p>
        </Section>

      </div>
    </div>
  );
};

export default About;
