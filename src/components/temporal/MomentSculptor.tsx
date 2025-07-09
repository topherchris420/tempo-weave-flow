import { useState, useEffect } from 'react';
import { Sparkles, Circle } from 'lucide-react';

interface Moment {
  id: string;
  timestamp: number;
  emotional_weight: number;
  recall_intensity: number;
  phase: 'flow' | 'stress' | 'calm' | 'distracted';
  duration: number;
}

interface MomentSculptorProps {
  currentPhase: { name: 'flow' | 'stress' | 'calm' | 'distracted'; intensity: number };
  timeTexture: { compression: number; emotional_weight: number; recall_intensity: number };
}

export const MomentSculptor = ({ currentPhase, timeTexture }: MomentSculptorProps) => {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [activeParticles, setActiveParticles] = useState<Array<{
    id: string;
    x: number;
    y: number;
    size: number;
    opacity: number;
    hue: number;
    velocity: { x: number; y: number };
  }>>([]);

  useEffect(() => {
    // Create moments based on phase changes and emotional weight
    const createMoment = () => {
      const moment: Moment = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        emotional_weight: timeTexture.emotional_weight,
        recall_intensity: timeTexture.recall_intensity,
        phase: currentPhase.name,
        duration: 0
      };

      setMoments(prev => [...prev.slice(-20), moment]); // Keep last 20 moments
    };

    const momentTimer = setInterval(createMoment, 5000); // Create moment every 5 seconds
    
    return () => clearInterval(momentTimer);
  }, [currentPhase, timeTexture]);

  useEffect(() => {
    // Generate particles based on moments and current state
    const generateParticles = () => {
      const newParticles = moments.slice(-5).map(moment => {
        const baseIntensity = moment.recall_intensity * currentPhase.intensity;
        const size = 4 + baseIntensity * 8;
        const opacity = 0.3 + baseIntensity * 0.7;
        
        let hue = 195; // Default temporal blue
        switch (moment.phase) {
          case 'flow': hue = 45; break;    // Golden
          case 'stress': hue = 0; break;   // Red
          case 'calm': hue = 190; break;   // Blue
          case 'distracted': hue = 280; break; // Purple
        }

        return {
          id: moment.id,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size,
          opacity,
          hue,
          velocity: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
          }
        };
      });

      setActiveParticles(newParticles);
    };

    generateParticles();
    
    const animationFrame = setInterval(() => {
      setActiveParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.velocity.x,
        y: particle.y + particle.velocity.y,
        opacity: Math.max(0.1, particle.opacity - 0.01)
      })).filter(p => p.opacity > 0.1));
    }, 100);

    return () => clearInterval(animationFrame);
  }, [moments, currentPhase]);

  const getMomentWeight = (moment: Moment) => {
    const ageMs = Date.now() - moment.timestamp;
    const ageMinutes = ageMs / (1000 * 60);
    const decay = Math.exp(-ageMinutes / 30); // 30-minute half-life
    
    return moment.emotional_weight * moment.recall_intensity * decay;
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'flow': return 'hsl(45, 85%, 65%)';
      case 'stress': return 'hsl(0, 70%, 55%)';
      case 'calm': return 'hsl(190, 80%, 60%)';
      case 'distracted': return 'hsl(280, 70%, 65%)';
      default: return 'hsl(195, 85%, 65%)';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Memory Particles */}
      {activeParticles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-temporal-breathe"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `hsl(${particle.hue}, 70%, 60%)`,
            opacity: particle.opacity,
            filter: `blur(${particle.size / 4}px)`,
            boxShadow: `0 0 ${particle.size * 2}px hsl(${particle.hue}, 70%, 60%, 0.4)`,
          }}
        />
      ))}
      
      {/* Moment Timeline (bottom overlay) */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <div className="temporal-surface p-4 rounded-2xl backdrop-blur-md">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Memory Constellation</span>
          </div>
          
          <div className="flex space-x-2">
            {moments.slice(-8).map((moment, index) => {
              const weight = getMomentWeight(moment);
              const size = 6 + weight * 8;
              
              return (
                <div
                  key={moment.id}
                  className="relative"
                  style={{
                    animation: weight > 0.7 ? 'experience-enhance 1s ease-out forwards' : 
                              weight < 0.3 ? 'moment-fade 1s ease-out forwards' : 'none'
                  }}
                >
                  <Circle
                    size={size}
                    style={{
                      color: getPhaseColor(moment.phase),
                      opacity: 0.6 + weight * 0.4,
                      filter: `drop-shadow(0 0 ${size}px ${getPhaseColor(moment.phase)})`
                    }}
                    fill="currentColor"
                  />
                </div>
              );
            })}
          </div>
          
          <div className="text-xs text-muted-foreground mt-2 text-center">
            {moments.length} moments sculpted
          </div>
        </div>
      </div>
    </div>
  );
};