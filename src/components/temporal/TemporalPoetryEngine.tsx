import { useState, useEffect } from 'react';

interface BiometricState {
  heartRate: number;
  breathingRhythm: number;
  movementIntensity: number;
  attentionLevel: number;
}

interface AttentionPhase {
  name: string;
  intensity: number;
  duration: number;
}

interface TemporalPoetryEngineProps {
  biometricState: BiometricState;
  currentPhase: AttentionPhase;
}

const POETRY_FRAGMENTS = {
  deep: [
    "breathing into the void",
    "where seconds become centuries",
    "consciousness dissolving",
    "eternal present moment",
    "time's gentle current",
    "suspended in amber awareness"
  ],
  calm: [
    "soft waves of now",
    "breathing space between thoughts",
    "peaceful temporal drift",
    "harmony in stillness",
    "present moment flowering",
    "quiet temporal depths"
  ],
  stress: [
    "time accelerating wildly",
    "compressed moments racing",
    "urgency in the air",
    "heartbeat marking time",
    "intensity building waves",
    "electric temporal friction"
  ],
  flow: [
    "seamless temporal dance",
    "awareness expanding outward",
    "effortless time streams",
    "consciousness in motion",
    "rhythmic temporal waves",
    "synchronized with existence"
  ],
  neutral: [
    "gentle temporal breathing",
    "ordinary moments deepening",
    "time's natural rhythm",
    "awareness gently flowing",
    "present moment unfolding",
    "temporal equilibrium"
  ]
};

export const TemporalPoetryEngine = ({ biometricState, currentPhase }: TemporalPoetryEngineProps) => {
  const [currentPoetry, setCurrentPoetry] = useState('');
  const [opacity, setOpacity] = useState(0);
  const [poetryIndex, setPoetryIndex] = useState(0);

  useEffect(() => {
    const generatePoetry = () => {
      const phaseFragments = POETRY_FRAGMENTS[currentPhase.name as keyof typeof POETRY_FRAGMENTS] || POETRY_FRAGMENTS.neutral;
      const randomFragment = phaseFragments[Math.floor(Math.random() * phaseFragments.length)];
      
      // Add biometric modulation to the text
      const intensity = Math.round(currentPhase.intensity * 100);
      const breathRhythm = Math.round(biometricState.breathingRhythm * 100);
      
      setCurrentPoetry(randomFragment);
      setOpacity(1);
      
      // Fade out after display time based on attention level
      setTimeout(() => {
        setOpacity(0);
      }, 3000 + biometricState.attentionLevel * 2000);
    };

    // Generate new poetry based on phase changes or biometric shifts
    const interval = setInterval(generatePoetry, 8000 + Math.random() * 4000);
    
    // Initial poetry
    generatePoetry();
    
    return () => clearInterval(interval);
  }, [currentPhase, biometricState]);

  const getPoetryStyle = () => {
    const hue = currentPhase.name === 'stress' ? 0 : 
                currentPhase.name === 'calm' ? 190 : 
                currentPhase.name === 'flow' ? 280 : 195;
    
    return {
      color: `hsl(${hue}, 70%, ${70 + biometricState.attentionLevel * 20}%)`,
      fontSize: `${0.8 + currentPhase.intensity * 0.4}rem`,
      letterSpacing: `${biometricState.breathingRhythm * 2}px`,
      transform: `scale(${0.95 + biometricState.attentionLevel * 0.1})`,
      opacity: opacity * (0.6 + biometricState.attentionLevel * 0.4),
    };
  };

  return (
    <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
      <div 
        className="text-center font-light tracking-wide temporal-breathe transition-all duration-1000"
        style={getPoetryStyle()}
      >
        <div className="max-w-xs leading-relaxed">
          {currentPoetry}
        </div>
        
        {/* Subtle biometric indicators */}
        <div className="flex justify-center space-x-2 mt-3 opacity-30">
          <div 
            className="w-1 h-1 rounded-full bg-current biometric-pulse"
            style={{ animationDelay: '0s' }}
          />
          <div 
            className="w-1 h-1 rounded-full bg-current biometric-pulse"
            style={{ animationDelay: '0.5s' }}
          />
          <div 
            className="w-1 h-1 rounded-full bg-current biometric-pulse"
            style={{ animationDelay: '1s' }}
          />
        </div>
      </div>
    </div>
  );
};