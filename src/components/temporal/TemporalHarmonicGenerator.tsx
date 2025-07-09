import { useState, useEffect, useRef } from 'react';

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

interface TemporalHarmonicGeneratorProps {
  biometricState: BiometricState;
  currentPhase: AttentionPhase;
  environment?: string;
}

interface HarmonicFrequency {
  frequency: number;
  amplitude: number;
  phase: number;
  color: string;
  resonance: number;
}

export const TemporalHarmonicGenerator = ({ 
  biometricState, 
  currentPhase, 
  environment = 'oceanic' 
}: TemporalHarmonicGeneratorProps) => {
  const [harmonics, setHarmonics] = useState<HarmonicFrequency[]>([]);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [visualMode, setVisualMode] = useState<'waves' | 'particles' | 'geometric'>('waves');
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Generate harmonics based on biometric state
  useEffect(() => {
    const generateHarmonics = () => {
      const baseFrequency = 40 + biometricState.heartRate * 60; // 40-100 Hz range
      const breathModulation = biometricState.breathingRhythm;
      const attentionModulation = biometricState.attentionLevel;

      const newHarmonics: HarmonicFrequency[] = [];

      // Primary harmonic (heartbeat)
      newHarmonics.push({
        frequency: baseFrequency,
        amplitude: 0.3 + biometricState.heartRate * 0.2,
        phase: 0,
        color: `hsl(${0 + biometricState.heartRate * 60}, 70%, 60%)`,
        resonance: biometricState.heartRate,
      });

      // Breathing harmonic
      newHarmonics.push({
        frequency: baseFrequency * 0.6,
        amplitude: 0.2 + breathModulation * 0.3,
        phase: Math.PI / 4,
        color: `hsl(${190 + breathModulation * 40}, 70%, 60%)`,
        resonance: breathModulation,
      });

      // Attention harmonic
      newHarmonics.push({
        frequency: baseFrequency * 1.5,
        amplitude: 0.15 + attentionModulation * 0.25,
        phase: Math.PI / 2,
        color: `hsl(${45 + attentionModulation * 30}, 70%, 60%)`,
        resonance: attentionModulation,
      });

      // Movement harmonics
      const movementHarmonics = Math.floor(1 + biometricState.movementIntensity * 3);
      for (let i = 0; i < movementHarmonics; i++) {
        newHarmonics.push({
          frequency: baseFrequency * (2 + i * 0.5),
          amplitude: 0.1 + (biometricState.movementIntensity * 0.2) / (i + 1),
          phase: (Math.PI * i) / 3,
          color: `hsl(${280 + i * 20}, 70%, 60%)`,
          resonance: biometricState.movementIntensity / (i + 1),
        });
      }

      // Phase-specific harmonics
      if (currentPhase.name === 'stress') {
        newHarmonics.push({
          frequency: baseFrequency * 2.5,
          amplitude: currentPhase.intensity * 0.3,
          phase: Math.PI,
          color: 'hsl(0, 80%, 70%)',
          resonance: currentPhase.intensity,
        });
      } else if (currentPhase.name === 'flow') {
        newHarmonics.push({
          frequency: baseFrequency * 0.8,
          amplitude: currentPhase.intensity * 0.4,
          phase: Math.PI / 6,
          color: 'hsl(280, 80%, 70%)',
          resonance: currentPhase.intensity,
        });
      }

      setHarmonics(newHarmonics);
    };

    generateHarmonics();
  }, [biometricState, currentPhase]);

  // Audio generation (visual representation only - actual audio would require user interaction)
  useEffect(() => {
    if (isAudioEnabled && audioContextRef.current) {
      // Clean up existing oscillators
      oscillatorsRef.current.forEach(osc => {
        osc.stop();
        osc.disconnect();
      });
      oscillatorsRef.current = [];

      // Create new oscillators for each harmonic
      harmonics.forEach((harmonic, index) => {
        const oscillator = audioContextRef.current!.createOscillator();
        const gainNode = audioContextRef.current!.createGain();

        oscillator.frequency.setValueAtTime(harmonic.frequency, audioContextRef.current!.currentTime);
        oscillator.type = index === 0 ? 'sine' : 'triangle';
        
        gainNode.gain.setValueAtTime(harmonic.amplitude * 0.1, audioContextRef.current!.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(gainNodeRef.current!);

        oscillator.start();
        oscillatorsRef.current.push(oscillator);
      });
    }
  }, [harmonics, isAudioEnabled]);

  const initializeAudio = async () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      gainNodeRef.current = gainNode;
      setIsAudioEnabled(true);
    } catch (error) {
      console.log('Audio not available');
    }
  };

  const renderWaveform = () => {
    const wavePoints = Array.from({ length: 100 }).map((_, i) => {
      const x = (i / 99) * 100;
      let y = 50;

      harmonics.forEach((harmonic, index) => {
        const phase = (Date.now() / 1000) + harmonic.phase;
        const waveContribution = Math.sin((i / 99) * Math.PI * 4 + phase) * harmonic.amplitude * 20;
        y += waveContribution;
      });

      return { x, y: Math.max(10, Math.min(90, y)) };
    });

    return (
      <svg className="w-full h-32" viewBox="0 0 100 100">
        <path
          d={`M ${wavePoints.map(p => `${p.x} ${p.y}`).join(' L ')}`}
          stroke="hsl(195, 70%, 60%)"
          strokeWidth="0.5"
          fill="none"
          opacity="0.8"
        />
        {harmonics.map((harmonic, index) => (
          <circle
            key={index}
            cx={10 + (index * 15)}
            cy={20 + Math.sin((Date.now() / 1000) + harmonic.phase) * harmonic.amplitude * 10}
            r={2 + harmonic.resonance * 3}
            fill={harmonic.color}
            opacity={harmonic.resonance}
          />
        ))}
      </svg>
    );
  };

  const renderParticles = () => {
    return harmonics.map((harmonic, index) => {
      const time = Date.now() / 1000;
      const x = 50 + Math.cos(time * harmonic.frequency / 10 + harmonic.phase) * 30;
      const y = 50 + Math.sin(time * harmonic.frequency / 10 + harmonic.phase) * 20;

      return (
        <div
          key={index}
          className="absolute rounded-full biometric-pulse"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${4 + harmonic.amplitude * 20}px`,
            height: `${4 + harmonic.amplitude * 20}px`,
            background: harmonic.color,
            opacity: harmonic.resonance,
            boxShadow: `0 0 ${10 + harmonic.amplitude * 20}px ${harmonic.color}`,
            transform: `scale(${1 + Math.sin(time + harmonic.phase) * 0.3})`,
          }}
        />
      );
    });
  };

  const renderGeometric = () => {
    const time = Date.now() / 1000;
    
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {harmonics.map((harmonic, index) => {
          const centerX = 50;
          const centerY = 50;
          const radius = 10 + index * 8;
          const sides = 6 + index;
          const rotation = (time * harmonic.frequency / 20) + harmonic.phase;

          const points = Array.from({ length: sides }).map((_, i) => {
            const angle = (i / sides) * Math.PI * 2 + rotation;
            const x = centerX + Math.cos(angle) * radius * harmonic.amplitude;
            const y = centerY + Math.sin(angle) * radius * harmonic.amplitude;
            return `${x},${y}`;
          }).join(' ');

          return (
            <polygon
              key={index}
              points={points}
              fill="none"
              stroke={harmonic.color}
              strokeWidth="0.5"
              opacity={harmonic.resonance}
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Harmonic Visualization */}
      <div className="absolute inset-0">
        {visualMode === 'waves' && (
          <div className="absolute bottom-0 left-0 right-0 h-32 opacity-60">
            {renderWaveform()}
          </div>
        )}
        
        {visualMode === 'particles' && (
          <div className="absolute inset-0">
            {renderParticles()}
          </div>
        )}
        
        {visualMode === 'geometric' && (
          <div className="absolute inset-0 opacity-40">
            {renderGeometric()}
          </div>
        )}
      </div>

      {/* Harmonic Controls */}
      <div className="fixed bottom-6 left-6 pointer-events-auto">
        <div className="temporal-surface p-4 rounded-xl backdrop-blur-md">
          <div className="text-xs text-muted-foreground mb-2">Temporal Harmonics</div>
          
          <div className="space-y-2 mb-3">
            <div className="text-sm font-medium text-foreground">
              {harmonics.length} Active Frequencies
            </div>
            <div className="text-xs text-primary opacity-60">
              Base: {harmonics[0]?.frequency.toFixed(1)}Hz
            </div>
          </div>

          <div className="flex space-x-2 mb-3">
            {['waves', 'particles', 'geometric'].map((mode) => (
              <button
                key={mode}
                onClick={() => setVisualMode(mode as any)}
                className={`px-2 py-1 text-xs rounded ${
                  visualMode === mode 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-muted/20 text-muted-foreground hover:bg-muted/40'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={initializeAudio}
            disabled={isAudioEnabled}
            className={`w-full px-3 py-2 text-xs rounded transition-colors ${
              isAudioEnabled 
                ? 'bg-primary/20 text-primary cursor-not-allowed' 
                : 'bg-muted/20 text-muted-foreground hover:bg-muted/40'
            }`}
          >
            {isAudioEnabled ? 'Audio Synthesizer Ready' : 'Enable Audio (Click)'}
          </button>
        </div>
      </div>
    </div>
  );
};