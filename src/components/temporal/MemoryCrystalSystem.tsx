import { useState, useEffect, useCallback } from 'react';

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

interface MemoryCrystal {
  id: string;
  timestamp: number;
  biometricSnapshot: BiometricState;
  phase: AttentionPhase;
  intensity: number;
  position: { x: number; y: number };
  hue: number;
  resonance: number;
}

interface MemoryCrystalSystemProps {
  biometricState: BiometricState;
  currentPhase: AttentionPhase;
}

export const MemoryCrystalSystem = ({ biometricState, currentPhase }: MemoryCrystalSystemProps) => {
  const [crystals, setCrystals] = useState<MemoryCrystal[]>([]);
  const [activeCrystal, setActiveCrystal] = useState<string | null>(null);
  const [crystalFormationPhase, setCrystalFormationPhase] = useState(0);

  // Create memory crystals based on significant temporal moments
  const createMemoryCrystal = useCallback(() => {
    const significance = (currentPhase.intensity + biometricState.attentionLevel) / 2;
    
    // Only create crystals for significant moments
    if (significance > 0.6 && Math.random() > 0.7) {
      const newCrystal: MemoryCrystal = {
        id: `crystal-${Date.now()}-${Math.random()}`,
        timestamp: Date.now(),
        biometricSnapshot: { ...biometricState },
        phase: { ...currentPhase },
        intensity: significance,
        position: {
          x: 20 + Math.random() * 60,
          y: 20 + Math.random() * 60,
        },
        hue: currentPhase.name === 'stress' ? 0 :
             currentPhase.name === 'calm' ? 190 :
             currentPhase.name === 'flow' ? 280 :
             195 + Math.random() * 40,
        resonance: significance,
      };

      setCrystals(prev => {
        // Keep only the most recent 12 crystals
        const updated = [...prev, newCrystal].slice(-12);
        return updated;
      });
    }
  }, [biometricState, currentPhase]);

  useEffect(() => {
    const formationTimer = setInterval(() => {
      setCrystalFormationPhase(prev => prev + 0.02);
    }, 100);

    const crystalTimer = setInterval(() => {
      createMemoryCrystal();
    }, 5000 + Math.random() * 10000);

    return () => {
      clearInterval(formationTimer);
      clearInterval(crystalTimer);
    };
  }, [createMemoryCrystal]);

  const handleCrystalClick = (crystalId: string) => {
    setActiveCrystal(crystalId === activeCrystal ? null : crystalId);
  };

  const getCrystalAnimation = (crystal: MemoryCrystal, index: number) => {
    const age = (Date.now() - crystal.timestamp) / 1000; // seconds
    const pulsePhase = crystalFormationPhase + index * 0.5;
    
    return {
      transform: `scale(${0.8 + Math.sin(pulsePhase) * 0.2 * crystal.resonance}) rotate(${age * 2}deg)`,
      opacity: Math.max(0.3, 1 - age / 300), // Fade over 5 minutes
      filter: `drop-shadow(0 0 ${10 + crystal.resonance * 20}px hsl(${crystal.hue}, 70%, 60%))`,
    };
  };

  const getActiveCrystalDetails = () => {
    const crystal = crystals.find(c => c.id === activeCrystal);
    if (!crystal) return null;

    const age = Math.floor((Date.now() - crystal.timestamp) / 1000);
    const ageText = age < 60 ? `${age}s ago` : `${Math.floor(age / 60)}m ago`;

    return (
      <div className="temporal-surface p-4 rounded-xl backdrop-blur-md max-w-xs">
        <div className="text-xs text-muted-foreground mb-2">Memory Crystal</div>
        <div className="text-sm font-medium text-foreground mb-2 capitalize">
          {crystal.phase.name} State
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div>Captured: {ageText}</div>
          <div>Intensity: {Math.round(crystal.intensity * 100)}%</div>
          <div>Heart: {Math.round(crystal.biometricSnapshot.heartRate * 100)}%</div>
          <div>Breath: {Math.round(crystal.biometricSnapshot.breathingRhythm * 100)}%</div>
          <div>Attention: {Math.round(crystal.biometricSnapshot.attentionLevel * 100)}%</div>
        </div>
        <div className="mt-3 text-xs text-primary/60">
          Click crystal again to close
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Memory Crystals */}
      {crystals.map((crystal, index) => (
        <div
          key={crystal.id}
          className="absolute pointer-events-auto cursor-pointer"
          style={{
            left: `${crystal.position.x}%`,
            top: `${crystal.position.y}%`,
          }}
          onClick={() => handleCrystalClick(crystal.id)}
        >
          <div
            className="w-4 h-4 bg-gradient-to-br from-white/20 to-transparent border border-white/30 temporal-breathe transition-all duration-300 hover:scale-110"
            style={{
              ...getCrystalAnimation(crystal, index),
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              background: `linear-gradient(135deg, 
                hsl(${crystal.hue}, 70%, 60%) 0%, 
                hsl(${crystal.hue + 30}, 50%, 40%) 100%)`,
              borderColor: `hsl(${crystal.hue}, 60%, 70%)`,
            }}
          />
        </div>
      ))}

      {/* Crystal Formation Indicators */}
      <div className="absolute inset-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${30 + i * 20}%`,
              top: `${60 + Math.sin(crystalFormationPhase + i) * 10}%`,
              background: `hsl(${195 + i * 20}, 60%, 70%)`,
              opacity: 0.3 + Math.sin(crystalFormationPhase * 2 + i) * 0.2,
              transform: `scale(${0.5 + Math.sin(crystalFormationPhase + i * 0.7) * 0.3})`,
              boxShadow: `0 0 10px hsl(${195 + i * 20}, 60%, 70%)`,
            }}
          />
        ))}
      </div>

      {/* Active Crystal Details */}
      {activeCrystal && (
        <div className="fixed top-1/2 right-6 transform -translate-y-1/2 pointer-events-auto">
          {getActiveCrystalDetails()}
        </div>
      )}

      {/* Crystal System Info */}
      <div className="fixed top-20 left-6 pointer-events-none">
        <div className="temporal-surface p-3 rounded-xl backdrop-blur-md">
          <div className="text-xs text-muted-foreground mb-1">Memory Crystals</div>
          <div className="text-sm font-medium text-foreground">
            {crystals.length} Active
          </div>
          <div className="text-xs text-primary opacity-60 mt-1">
            Capturing significant moments
          </div>
        </div>
      </div>
    </div>
  );
};
