import { useState, useEffect, useCallback } from 'react';
import { ChronoSensoryLoop } from './temporal/ChronoSensoryLoop';
import { AttentionPhaseMapper, AttentionPhase } from './temporal/AttentionPhaseMapper';
import { TimeTextureDial } from './temporal/TimeTextureDial';
import { MomentSculptor } from './temporal/MomentSculptor';
import { TemporalPoetryEngine } from './temporal/TemporalPoetryEngine';
import { EnvironmentalSynthesis } from './temporal/EnvironmentalSynthesis';
import { MemoryCrystalSystem } from './temporal/MemoryCrystalSystem';
import { QuantumBreathInterface } from './temporal/QuantumBreathInterface';
import { TemporalHarmonicGenerator } from './temporal/TemporalHarmonicGenerator';
import temporalHero from '@/assets/temporal-hero.jpg';

interface BiometricState {
  heartRate: number;
  breathingRhythm: number;
  movementIntensity: number;
  attentionLevel: number;
}

interface TimeTexture {
  compression: number;
  emotional_weight: number;
  recall_intensity: number;
}

export const Interval = () => {
  const [biometricState, setBiometricState] = useState<BiometricState>({
    heartRate: 0.6,
    breathingRhythm: 0.5,
    movementIntensity: 0.4,
    attentionLevel: 0.7
  });

  const [currentPhase, setCurrentPhase] = useState<AttentionPhase>({
    name: 'calm',
    intensity: 0.5,
    duration: 0
  });

  const [timeTexture, setTimeTexture] = useState<TimeTexture>({
    compression: 0,
    emotional_weight: 0.5,
    recall_intensity: 0.5
  });

  const [temporalIntensity, setTemporalIntensity] = useState(0.5);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentEnvironment, setCurrentEnvironment] = useState('oceanic');
  const [breathSyncLevel, setBreathSyncLevel] = useState(0);

  // Initialize the temporal environment
  useEffect(() => {
    const initTimer = setTimeout(() => {
      setIsInitialized(true);
    }, 1000);

    return () => clearTimeout(initTimer);
  }, []);

  // Simulate biometric data evolution
  useEffect(() => {
    const biometricInterval = setInterval(() => {
      setBiometricState(prev => ({
        heartRate: Math.max(0.1, Math.min(1, prev.heartRate + (Math.random() - 0.5) * 0.1)),
        breathingRhythm: Math.max(0.1, Math.min(1, prev.breathingRhythm + (Math.random() - 0.5) * 0.08)),
        movementIntensity: Math.max(0, Math.min(1, prev.movementIntensity + (Math.random() - 0.5) * 0.12)),
        attentionLevel: Math.max(0.1, Math.min(1, prev.attentionLevel + (Math.random() - 0.5) * 0.06))
      }));
    }, 3000);

    return () => clearInterval(biometricInterval);
  }, []);

  const handleTemporalShift = useCallback((intensity: number) => {
    setTemporalIntensity(intensity);
  }, []);

  const handlePhaseChange = useCallback((phase: AttentionPhase) => {
    setCurrentPhase(phase);
    
    // Adjust biometric response based on detected phase
    setBiometricState(prev => ({
      ...prev,
      attentionLevel: phase.intensity,
      heartRate: phase.name === 'stress' ? Math.min(1, prev.heartRate + 0.2) : 
                 phase.name === 'calm' ? Math.max(0.1, prev.heartRate - 0.1) : prev.heartRate
    }));
  }, []);

  const handleTextureChange = useCallback((texture: TimeTexture) => {
    setTimeTexture(texture);
  }, []);

  const handleEnvironmentChange = useCallback((env: string) => {
    setCurrentEnvironment(env);
  }, []);

  const handleBreathSync = useCallback((syncLevel: number) => {
    setBreathSyncLevel(syncLevel);
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 temporal-breathe">
            <div className="w-full h-full rounded-full bg-temporal-gradient opacity-80" />
          </div>
          <p className="text-lg text-foreground/80">Attuning to your temporal field...</p>
          <p className="text-sm text-muted-foreground mt-2">Initializing biometric awareness</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Temporal Hero Background */}
      <div 
        className="absolute inset-0 opacity-20 temporal-breathe"
        style={{
          backgroundImage: `url(${temporalHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Environmental Synthesis Layer */}
      <EnvironmentalSynthesis 
        biometricState={biometricState}
        onEnvironmentChange={handleEnvironmentChange}
      />
      
      {/* Quantum Breath Interface */}
      <QuantumBreathInterface 
        biometricState={biometricState}
        onBreathSync={handleBreathSync}
      />
      
      {/* Core Temporal Environment */}
      <ChronoSensoryLoop 
        biometricState={biometricState}
        onTemporalShift={handleTemporalShift}
      />
      
      {/* Temporal Harmonic Generator */}
      <TemporalHarmonicGenerator 
        biometricState={biometricState}
        currentPhase={currentPhase}
        environment={currentEnvironment}
      />
      
      {/* Attention Phase Detection */}
      <AttentionPhaseMapper onPhaseChange={handlePhaseChange} />
      
      {/* Manual Time Texture Control */}
      <TimeTextureDial onTextureChange={handleTextureChange} />
      
      {/* Memory & Moment Visualization */}
      <MomentSculptor 
        currentPhase={currentPhase}
        timeTexture={timeTexture}
      />
      
      {/* Memory Crystal System */}
      <MemoryCrystalSystem 
        biometricState={biometricState}
        currentPhase={currentPhase}
      />
      
      {/* Temporal Poetry Engine */}
      <TemporalPoetryEngine 
        biometricState={biometricState}
        currentPhase={currentPhase}
      />
      
      {/* Central Awareness Indicator */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div 
          className="w-32 h-32 rounded-full temporal-surface temporal-breathe"
          style={{
            opacity: 0.3 + temporalIntensity * 0.4,
            transform: `scale(${0.8 + temporalIntensity * 0.4})`,
          }}
        >
          <div className="w-full h-full rounded-full bg-temporal-gradient opacity-60" />
        </div>
      </div>
      
      {/* Enhanced Status Display */}
      <div className="fixed top-6 left-6 pointer-events-none">
        <div className="temporal-surface p-4 rounded-xl backdrop-blur-md">
          <div className="text-xs text-muted-foreground mb-2">Interval - Advanced</div>
          <div className="space-y-1">
            <div className="text-sm font-medium text-foreground">
              Coherence: {(temporalIntensity * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-primary capitalize">
              {currentPhase.name} State
            </div>
            <div className="text-xs text-accent-foreground">
              Breath Sync: {(breathSyncLevel * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-muted-foreground capitalize">
              {currentEnvironment} Realm
            </div>
          </div>
        </div>
      </div>
      
      {/* Advanced Instructions */}
      <div className="fixed bottom-48 right-6 pointer-events-none">
        <div className="temporal-surface p-4 rounded-xl backdrop-blur-md max-w-xs">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Experience novel temporal perception through environmental synthesis, 
            memory crystals, quantum breath synchronization, and harmonic generation. 
            Click crystals to revisit captured moments. Poetry emerges from your temporal state.
          </p>
        </div>
      </div>
    </div>
  );
};