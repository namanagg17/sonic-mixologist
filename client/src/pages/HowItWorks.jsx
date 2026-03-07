import { Music, Cpu, Activity, Brain, Wine } from "lucide-react";

const HowItWorks = () => {

  const steps = [
    {
      icon: Music,
      title: "Audio Capture",
      description:
        "The application records a short audio sample using the device microphone. This sample captures the music currently playing in the environment."
    },
    {
      icon: Cpu,
      title: "Signal Processing",
      description:
        "The audio signal is processed using the Web Audio API. The waveform is divided into frames and analyzed using Fast Fourier Transform (FFT) to examine frequency information."
    },
    {
      icon: Activity,
      title: "Feature Extraction",
      description:
        "From the audio signal we extract several acoustic features such as energy, brightness, bass ratio, roughness, and dynamic range."
    },
    {
      icon: Brain,
      title: "Mood Classification",
      description:
        "A classification engine analyzes the extracted features to determine the mood of the music such as energetic, aggressive, chill, or dark."
    },
    {
      icon: Wine,
      title: "Cocktail Recommendation",
      description:
        "The detected mood is matched with cocktails from a curated drink dataset where each drink is mapped to specific musical moods."
    }
  ];

  return (
    <div className="min-h-screen py-16 px-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-cocktail text-center mb-12 text-cocktail-gradient">
          How Sonic Mixologist Works
        </h1>

        {/* Visual Pipeline */}

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">

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

        </div>

        {/* Steps Section */}

        <div className="grid md:grid-cols-2 gap-8">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (
              <div key={index} className="glass-card p-8 rounded-xl">

                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-8 h-8 text-cocktail-gold" />
                  <h2 className="text-2xl font-semibold text-white">
                    {step.title}
                  </h2>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>

              </div>
            );

          })}

        </div>

      </div>

    </div>
  );
};

export default HowItWorks;