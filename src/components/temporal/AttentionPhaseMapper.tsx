import { useState, useEffect } from 'react';
import { Activity, Brain, Heart, Zap } from 'lucide-react';

export interface AttentionPhase {
  name: 'flow' | 'stress' | 'calm' | 'distracted';
  intensity: number;
  duration: number;
}

interface AttentionPhaseMapperProps {
  onPhaseChange: (phase: AttentionPhase) => void;
}

export const AttentionPhaseMapper = ({ onPhaseChange }: AttentionPhaseMapperProps) => {
  const [currentPhase, setCurrentPhase] = useState<AttentionPhase>({
    name: 'calm',
    intensity: 0.5,
    duration: 0
  });
  
  const [simulatedMetrics, setSimulatedMetrics] = useState({
    heartRateVariability: 50,
    typingRhythm: 0.7,
    scrollVelocity: 0.3,
    dwellTime: 2000
  });

  useEffect(() => {
    // Simulate biometric and behavioral signal detection
    const detectPhase = () => {
      const { heartRateVariability, typingRhythm, scrollVelocity } = simulatedMetrics;
      
      let detectedPhase: AttentionPhase['name'];
      let intensity: number;
      
      // Phase detection logic based on simulated biometric patterns
      if (heartRateVariability > 70 && typingRhythm > 0.8) {
        detectedPhase = 'flow';
        intensity = 0.9;
      } else if (heartRateVariability > 80 && scrollVelocity > 0.7) {
        detectedPhase = 'stress';
        intensity = 0.8;
      } else if (heartRateVariability < 30 && typingRhythm < 0.3) {
        detectedPhase = 'distracted';
        intensity = 0.4;
      } else {
        detectedPhase = 'calm';
        intensity = 0.6;
      }
      
      const newPhase: AttentionPhase = {
        name: detectedPhase,
        intensity,
        duration: Date.now() - (currentPhase.duration || Date.now())
      };
      
      setCurrentPhase(newPhase);
      onPhaseChange(newPhase);
    };

    // Simulate metric fluctuations
    const metricsInterval = setInterval(() => {
      setSimulatedMetrics(prev => ({
        heartRateVariability: Math.max(20, Math.min(100, prev.heartRateVariability + (Math.random() - 0.5) * 10)),
        typingRhythm: Math.max(0, Math.min(1, prev.typingRhythm + (Math.random() - 0.5) * 0.2)),
        scrollVelocity: Math.max(0, Math.min(1, prev.scrollVelocity + (Math.random() - 0.5) * 0.3)),
        dwellTime: Math.max(500, Math.min(5000, prev.dwellTime + (Math.random() - 0.5) * 500))
      }));
    }, 2000);

    const phaseInterval = setInterval(detectPhase, 3000);
    
    return () => {
      clearInterval(metricsInterval);
      clearInterval(phaseInterval);
    };
  }, [currentPhase, onPhaseChange, simulatedMetrics]);

  const getPhaseIcon = () => {
    switch (currentPhase.name) {
      case 'flow': return <Zap className="w-5 h-5" />;
      case 'stress': return <Activity className="w-5 h-5" />;
      case 'calm': return <Heart className="w-5 h-5" />;
      case 'distracted': return <Brain className="w-5 h-5" />;
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase.name) {
      case 'flow': return 'biometric-attention';
      case 'stress': return 'biometric-heart';
      case 'calm': return 'biometric-breath';
      case 'distracted': return 'biometric-movement';
    }
  };

  return (
    <div className="fixed top-6 right-6 pointer-events-none">
      <div className="temporal-surface p-4 rounded-2xl backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div 
            className={`p-2 rounded-full bg-${getPhaseColor()} biometric-pulse`}
            style={{ opacity: currentPhase.intensity }}
          >
            {getPhaseIcon()}
          </div>
          <div className="text-sm">
            <div className="font-medium text-foreground capitalize">
              {currentPhase.name}
            </div>
            <div className="text-muted-foreground">
              {(currentPhase.intensity * 100).toFixed(0)}% coherence
            </div>
          </div>
        </div>
        
        {/* Biometric Indicators */}
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>HRV</span>
            <span>{simulatedMetrics.heartRateVariability.toFixed(0)}</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Rhythm</span>
            <span>{(simulatedMetrics.typingRhythm * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};