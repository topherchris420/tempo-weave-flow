import { useState, useEffect } from 'react';

interface BiometricState {
  heartRate: number;
  breathingRhythm: number;
  movementIntensity: number;
  attentionLevel: number;
}

interface QuantumBreathInterfaceProps {
  biometricState: BiometricState;
  onBreathSync?: (syncLevel: number) => void;
}

export const QuantumBreathInterface = ({ biometricState, onBreathSync }: QuantumBreathInterfaceProps) => {
  const [breathPhase, setBreathPhase] = useState(0);
  const [breathSyncLevel, setBreathSyncLevel] = useState(0);
  const [quantumResonance, setQuantumResonance] = useState(0);
  const [breathingGuideActive, setBreathingGuideActive] = useState(false);

  useEffect(() => {
    const breathTimer = setInterval(() => {
      setBreathPhase(prev => {
        const newPhase = prev + 0.01 * biometricState.breathingRhythm;
        
        // Calculate quantum resonance based on breathing rhythm harmony
        const targetRhythm = Math.sin(newPhase * Math.PI * 2) * 0.5 + 0.5;
        const rhythmDiff = Math.abs(biometricState.breathingRhythm - targetRhythm);
        const newSyncLevel = Math.max(0, 1 - rhythmDiff);
        
        setBreathSyncLevel(newSyncLevel);
        setQuantumResonance(prevResonance => prevResonance * 0.95 + newSyncLevel * 0.05);
        
        onBreathSync?.(newSyncLevel);
        
        return newPhase;
      });
    }, 50);

    return () => clearInterval(breathTimer);
  }, [biometricState.breathingRhythm, onBreathSync]);

  const getBreathScale = () => {
    const baseScale = 1;
    const breathExpansion = Math.sin(breathPhase * Math.PI * 2) * 0.1;
    const quantumModulation = quantumResonance * 0.05;
    return baseScale + breathExpansion + quantumModulation;
  };

  const getQuantumField = () => {
    return Array.from({ length: 16 }).map((_, i) => {
      const angle = (i / 16) * Math.PI * 2;
      const radius = 100 + Math.sin(breathPhase + i * 0.3) * 20;
      const x = 50 + Math.cos(angle) * (radius / 300);
      const y = 50 + Math.sin(angle) * (radius / 300);
      
      return {
        x,
        y,
        opacity: 0.2 + Math.sin(breathPhase * 2 + i * 0.5) * 0.1,
        scale: 0.5 + Math.sin(breathPhase + i * 0.8) * 0.3,
        hue: 195 + Math.sin(breathPhase + i) * 30,
      };
    });
  };

  const getBreathGuideRing = () => {
    const inhalePhase = Math.sin(breathPhase * Math.PI * 2) > 0;
    const intensity = Math.abs(Math.sin(breathPhase * Math.PI * 2));
    
    return {
      scale: 1 + intensity * 0.3,
      opacity: 0.3 + intensity * 0.4,
      strokeWidth: 2 + intensity * 2,
      color: inhalePhase ? 'hsl(195, 70%, 60%)' : 'hsl(280, 70%, 60%)',
    };
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Quantum Breath Field */}
      <div 
        className="absolute inset-0 temporal-breathe"
        style={{
          transform: `scale(${getBreathScale()})`,
          filter: `brightness(${0.8 + quantumResonance * 0.4}) blur(${(1 - quantumResonance) * 2}px)`,
        }}
      >
        {/* Quantum Field Particles */}
        {getQuantumField().map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              background: `hsl(${particle.hue}, 60%, 70%)`,
              opacity: particle.opacity * quantumResonance,
              transform: `scale(${particle.scale})`,
              boxShadow: `0 0 10px hsl(${particle.hue}, 60%, 70%)`,
            }}
          />
        ))}
      </div>

      {/* Central Breath Guide */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div 
          className="relative w-32 h-32"
          style={{
            transform: `scale(${getBreathGuideRing().scale})`,
            opacity: breathingGuideActive ? 1 : 0.3,
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={getBreathGuideRing().color}
              strokeWidth={getBreathGuideRing().strokeWidth}
              opacity={getBreathGuideRing().opacity}
              strokeDasharray="5,3"
            />
            <circle
              cx="50"
              cy="50"
              r="25"
              fill="none"
              stroke={getBreathGuideRing().color}
              strokeWidth="1"
              opacity={getBreathGuideRing().opacity * 0.5}
            />
          </svg>
          
          {/* Breath Phase Indicator */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
            style={{
              background: getBreathGuideRing().color,
              opacity: getBreathGuideRing().opacity,
              transform: `translate(-50%, -50%) scale(${0.5 + Math.abs(Math.sin(breathPhase * Math.PI * 2)) * 0.5})`,
            }}
          />
        </div>
      </div>

      {/* Quantum Resonance Display */}
      <div className="fixed top-32 left-6 pointer-events-none">
        <div className="temporal-surface p-3 rounded-xl backdrop-blur-md">
          <div className="text-xs text-muted-foreground mb-1">Quantum Breath</div>
          <div className="text-sm font-medium text-foreground">
            Resonance: {Math.round(quantumResonance * 100)}%
          </div>
          <div className="text-xs text-primary opacity-60 mt-1">
            Sync: {Math.round(breathSyncLevel * 100)}%
          </div>
        </div>
      </div>

      {/* Breath Guide Toggle */}
      <div className="fixed bottom-32 right-6 pointer-events-auto">
        <button
          onClick={() => setBreathingGuideActive(!breathingGuideActive)}
          className={`temporal-surface p-3 rounded-xl backdrop-blur-md transition-all ${
            breathingGuideActive ? 'scale-105 ring-1 ring-primary/30' : 'hover:scale-105'
          }`}
        >
          <div className="text-xs text-muted-foreground mb-1">Breath Guide</div>
          <div className="text-sm font-medium text-foreground">
            {breathingGuideActive ? 'Active' : 'Inactive'}
          </div>
        </button>
      </div>

      {/* Synchronization Waves */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="absolute border border-white/10 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              width: `${(i + 1) * 60}px`,
              height: `${(i + 1) * 60}px`,
              transform: `translate(-50%, -50%) scale(${getBreathScale() + i * 0.1})`,
              opacity: quantumResonance * (0.3 - i * 0.05),
              animation: `temporal-breathe ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
              borderColor: `hsl(195, 70%, ${60 + i * 5}%)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};