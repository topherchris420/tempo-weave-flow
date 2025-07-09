import { useState, useCallback } from 'react';
import { RotateCcw, RotateCw, Clock } from 'lucide-react';

interface TimeTexture {
  compression: number; // -1 to 1 (compress to expand)
  emotional_weight: number; // 0 to 1
  recall_intensity: number; // 0 to 1
}

interface TimeTextureDialProps {
  onTextureChange: (texture: TimeTexture) => void;
}

export const TimeTextureDial = ({ onTextureChange }: TimeTextureDialProps) => {
  const [texture, setTexture] = useState<TimeTexture>({
    compression: 0,
    emotional_weight: 0.5,
    recall_intensity: 0.5
  });
  
  const [isActive, setIsActive] = useState(false);
  const [dialPosition, setDialPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleDialInteraction = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = event.clientX - rect.left - centerX;
    const y = event.clientY - rect.top - centerY;
    
    setDialPosition({ x, y });
    
    // Convert position to temporal texture values
    const distance = Math.sqrt(x * x + y * y) / (rect.width / 2);
    const angle = Math.atan2(y, x);
    
    const newTexture: TimeTexture = {
      compression: Math.cos(angle) * Math.min(distance, 1),
      emotional_weight: Math.sin(angle) * Math.min(distance, 1) * 0.5 + 0.5,
      recall_intensity: Math.min(distance, 1)
    };
    
    setTexture(newTexture);
    onTextureChange(newTexture);
  }, [isActive, onTextureChange]);

  const resetTexture = () => {
    const resetTexture = {
      compression: 0,
      emotional_weight: 0.5,
      recall_intensity: 0.5
    };
    setTexture(resetTexture);
    setDialPosition({ x: 0, y: 0 });
    onTextureChange(resetTexture);
  };

  const getCompressionLabel = () => {
    if (texture.compression > 0.3) return 'Expanding';
    if (texture.compression < -0.3) return 'Compressing';
    return 'Natural Flow';
  };

  const getIntensityGlow = () => {
    return texture.recall_intensity * 0.8 + 0.2;
  };

  return (
    <div className="fixed bottom-6 left-6 pointer-events-auto">
      <div className="temporal-surface p-6 rounded-3xl backdrop-blur-md">
        <div className="text-center mb-4">
          <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
          <h3 className="text-sm font-medium text-foreground">Time Texture</h3>
          <p className="text-xs text-muted-foreground">{getCompressionLabel()}</p>
        </div>
        
        {/* Temporal Dial */}
        <div className="relative">
          <div 
            className={`w-32 h-32 rounded-full border-2 border-temporal-flow cursor-pointer transition-all duration-300 ${
              isActive ? 'bg-temporal-calm/20' : 'bg-temporal-deep/40'
            }`}
            style={{
              boxShadow: `0 0 ${30 * getIntensityGlow()}px hsl(var(--temporal-resonance) / ${getIntensityGlow()})`,
            }}
            onMouseDown={() => {
              setIsActive(true);
              setIsDragging(true);
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseMove={handleDialInteraction}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => {
              if (!isDragging) setIsActive(false);
            }}
          >
            {/* Dial Indicator */}
            <div 
              className="absolute w-4 h-4 bg-primary rounded-full transform -translate-x-2 -translate-y-2 biometric-pulse"
              style={{
                left: `50%`,
                top: `50%`,
                transform: `translate(${dialPosition.x}px, ${dialPosition.y}px) translate(-50%, -50%)`,
              }}
            />
            
            {/* Center Point */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-foreground/40 rounded-full transform -translate-x-1 -translate-y-1" />
            
            {/* Quadrant Labels */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
              Expand
            </div>
            <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 text-xs text-muted-foreground rotate-90">
              Enhance
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
              Compress
            </div>
            <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 text-xs text-muted-foreground -rotate-90">
              Soften
            </div>
          </div>
        </div>
        
        {/* Texture Values */}
        <div className="mt-4 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Compression:</span>
            <span className="text-primary">{texture.compression.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Weight:</span>
            <span className="text-biometric-attention">{texture.emotional_weight.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Recall:</span>
            <span className="text-biometric-breath">{texture.recall_intensity.toFixed(2)}</span>
          </div>
        </div>
        
        {/* Reset Button */}
        <button
          onClick={resetTexture}
          className="mt-4 w-full py-2 px-4 bg-temporal-flow/20 hover:bg-temporal-flow/30 rounded-lg text-xs text-foreground transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Flow</span>
        </button>
      </div>
    </div>
  );
};