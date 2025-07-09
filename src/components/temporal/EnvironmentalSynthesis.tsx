import { useState, useEffect } from 'react';

interface BiometricState {
  heartRate: number;
  breathingRhythm: number;
  movementIntensity: number;
  attentionLevel: number;
}

interface EnvironmentalSynthesisProps {
  biometricState: BiometricState;
  onEnvironmentChange?: (env: string) => void;
}

const ENVIRONMENTS = {
  cosmic: {
    name: 'Cosmic Void',
    baseHue: 250,
    particles: 12,
    flowSpeed: 0.3,
    resonanceDepth: 0.8,
    description: 'Vast temporal expanses'
  },
  oceanic: {
    name: 'Temporal Depths',
    baseHue: 195,
    particles: 8,
    flowSpeed: 0.5,
    resonanceDepth: 0.6,
    description: 'Deep current awareness'
  },
  forest: {
    name: 'Living Moments',
    baseHue: 120,
    particles: 15,
    flowSpeed: 0.7,
    resonanceDepth: 0.4,
    description: 'Organic time rhythms'
  },
  crystal: {
    name: 'Crystalline Time',
    baseHue: 300,
    particles: 20,
    flowSpeed: 0.2,
    resonanceDepth: 0.9,
    description: 'Geometric temporal patterns'
  },
  ember: {
    name: 'Warm Temporality',
    baseHue: 25,
    particles: 10,
    flowSpeed: 0.6,
    resonanceDepth: 0.5,
    description: 'Gentle temporal warmth'
  }
};

export const EnvironmentalSynthesis = ({ biometricState, onEnvironmentChange }: EnvironmentalSynthesisProps) => {
  const [currentEnvironment, setCurrentEnvironment] = useState('oceanic');
  const [environmentalPhase, setEnvironmentalPhase] = useState(0);
  const [showEnvironmentSelector, setShowEnvironmentSelector] = useState(false);

  useEffect(() => {
    // Auto-adapt environment based on biometric harmony
    const harmony = (biometricState.heartRate + biometricState.breathingRhythm + biometricState.attentionLevel) / 3;
    
    // Environmental phase evolution
    const phaseTimer = setInterval(() => {
      setEnvironmentalPhase(prev => prev + 0.005);
    }, 50);

    return () => clearInterval(phaseTimer);
  }, [biometricState]);

  const env = ENVIRONMENTS[currentEnvironment as keyof typeof ENVIRONMENTS];

  const getEnvironmentalHue = () => {
    const phaseModulation = Math.sin(environmentalPhase) * 20;
    return env.baseHue + phaseModulation;
  };

  const getParticlePositions = () => {
    return Array.from({ length: env.particles }).map((_, i) => ({
      x: (Math.sin(environmentalPhase + i * 0.5) * 40) + 50,
      y: (Math.cos(environmentalPhase * 0.7 + i * 0.3) * 30) + 50,
      opacity: (Math.sin(environmentalPhase * 2 + i) + 1) * 0.3,
      scale: 0.5 + (Math.sin(environmentalPhase + i * 0.8) + 1) * 0.25,
    }));
  };

  const handleEnvironmentChange = (envKey: string) => {
    setCurrentEnvironment(envKey);
    onEnvironmentChange?.(envKey);
    setShowEnvironmentSelector(false);
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Environmental Background */}
      <div 
        className="absolute inset-0 temporal-breathe"
        style={{
          background: `radial-gradient(ellipse at center, 
            hsla(${getEnvironmentalHue()}, 60%, 10%, ${env.resonanceDepth * 0.3}) 0%, 
            hsla(${getEnvironmentalHue() + 30}, 40%, 5%, ${env.resonanceDepth * 0.6}) 50%, 
            hsla(var(--background)) 100%)`,
          filter: `brightness(${0.8 + biometricState.attentionLevel * 0.3})`,
        }}
      />

      {/* Environmental Particles */}
      <div className="absolute inset-0">
        {getParticlePositions().map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full temporal-breathe"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              background: `hsl(${getEnvironmentalHue()}, 70%, 60%)`,
              opacity: particle.opacity * biometricState.attentionLevel,
              transform: `scale(${particle.scale})`,
              boxShadow: `0 0 20px hsl(${getEnvironmentalHue()}, 70%, 60%)`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Environmental Flows */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              width: '2px',
              height: '100vh',
              background: `linear-gradient(to bottom, 
                transparent, 
                hsl(${getEnvironmentalHue()}, 50%, 50%), 
                transparent)`,
              left: `${10 + i * 20}%`,
              transform: `translateX(${Math.sin(environmentalPhase + i) * 50}px)`,
              animation: `temporal-flow ${15 / env.flowSpeed}s linear infinite`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Environment Selector */}
      <div className="fixed bottom-20 right-6 pointer-events-auto">
        <button
          onClick={() => setShowEnvironmentSelector(!showEnvironmentSelector)}
          className="temporal-surface p-3 rounded-xl backdrop-blur-md hover:scale-105 transition-transform"
        >
          <div className="text-xs text-muted-foreground mb-1">Environment</div>
          <div className="text-sm font-medium text-foreground">
            {env.name}
          </div>
          <div className="text-xs text-primary opacity-60 mt-1">
            {env.description}
          </div>
        </button>

        {showEnvironmentSelector && (
          <div className="absolute bottom-full right-0 mb-2 temporal-surface p-4 rounded-xl backdrop-blur-md">
            <div className="space-y-2 min-w-48">
              {Object.entries(ENVIRONMENTS).map(([key, environment]) => (
                <button
                  key={key}
                  onClick={() => handleEnvironmentChange(key)}
                  className={`block w-full text-left p-2 rounded-lg transition-colors ${
                    key === currentEnvironment 
                      ? 'bg-primary/20 text-primary' 
                      : 'hover:bg-muted/50 text-muted-foreground'
                  }`}
                >
                  <div className="text-sm font-medium">{environment.name}</div>
                  <div className="text-xs opacity-60">{environment.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};