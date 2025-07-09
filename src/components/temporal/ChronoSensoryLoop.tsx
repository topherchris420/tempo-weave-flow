import { useState, useEffect } from 'react';

interface BiometricState {
  heartRate: number;
  breathingRhythm: number;
  movementIntensity: number;
  attentionLevel: number;
}

interface ChronoSensoryLoopProps {
  biometricState: BiometricState;
  onTemporalShift: (intensity: number) => void;
}

export const ChronoSensoryLoop = ({ biometricState, onTemporalShift }: ChronoSensoryLoopProps) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [ambientIntensity, setAmbientIntensity] = useState(0.5);

  useEffect(() => {
    // Calculate ambient intensity based on biometric harmony
    const harmony = (biometricState.heartRate + biometricState.breathingRhythm + 
                    biometricState.attentionLevel) / 3;
    
    setAmbientIntensity(harmony);
    onTemporalShift(harmony);
    
    // Continuous phase evolution
    const phaseTimer = setInterval(() => {
      setCurrentPhase(prev => (prev + 0.01) % (Math.PI * 2));
    }, 100);
    
    return () => clearInterval(phaseTimer);
  }, [biometricState, onTemporalShift]);

  const getTemporalHue = () => {
    const baseHue = 195; // Temporal blue
    const variation = Math.sin(currentPhase) * 30; // ±30 degree variation
    return baseHue + variation;
  };

  const getBreathingScale = () => {
    return 1 + (Math.sin(currentPhase * biometricState.breathingRhythm) * 0.05);
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Ambient Background Layer */}
      <div 
        className="absolute inset-0 bg-ambient-gradient opacity-90 temporal-breathe"
        style={{
          filter: `hue-rotate(${getTemporalHue() - 195}deg) brightness(${0.8 + ambientIntensity * 0.4})`,
          transform: `scale(${getBreathingScale()})`,
        }}
      />
      
      {/* Biometric Resonance Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 biometric-indicator biometric-pulse"
            style={{
              left: `${20 + (i % 4) * 20}%`,
              top: `${30 + Math.floor(i / 4) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              opacity: ambientIntensity * 0.6,
              background: `hsl(${getTemporalHue()}, 70%, ${60 + ambientIntensity * 20}%)`,
            }}
          />
        ))}
      </div>
      
      {/* Temporal Flow Streams */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-32 temporal-flow"
            style={{
              background: `linear-gradient(to bottom, transparent, hsl(${getTemporalHue()}, 50%, 50%), transparent)`,
              top: `${20 + i * 30}%`,
              animationDelay: `${i * 2}s`,
              opacity: ambientIntensity * 0.3,
              animationDuration: `${8 + biometricState.movementIntensity * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};