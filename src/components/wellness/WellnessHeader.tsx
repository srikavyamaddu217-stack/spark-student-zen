import { Button } from "@/components/ui/button";
import { Heart, Plus, Sparkles } from "lucide-react";

interface WellnessHeaderProps {
  onCheckInClick: () => void;
  hasCheckedInToday: boolean;
}

export const WellnessHeader = ({ onCheckInClick, hasCheckedInToday }: WellnessHeaderProps) => {
  return (
    <header className="relative border-b backdrop-blur-xl z-50" 
            style={{ 
              background: 'linear-gradient(135deg, hsl(var(--card) / 0.8) 0%, hsl(var(--card) / 0.6) 100%)',
              borderColor: 'hsl(var(--border) / 0.5)'
            }}>
      {/* Animated border gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-primary via-neon-accent to-neon-secondary opacity-20 animate-shimmer" />
      
      <div className="relative container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute inset-0 rounded-full animate-pulse-glow" 
                   style={{ background: 'var(--gradient-primary)' }} />
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full animate-float"
                   style={{ background: 'var(--gradient-primary)' }}>
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold font-grotesk bg-gradient-to-r from-neon-primary via-neon-accent to-neon-secondary bg-clip-text text-transparent">
                Wellness Monitor
              </h1>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-neon-secondary animate-pulse" />
                <p className="text-sm text-muted-foreground font-jakarta">
                  Track your mental health journey
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={onCheckInClick}
            className={`relative overflow-hidden group transition-all duration-500 font-grotesk font-semibold ${
              hasCheckedInToday 
                ? 'bg-wellness-good hover:bg-wellness-good/90' 
                : ''
            } shadow-2xl`}
            style={{
              background: hasCheckedInToday 
                ? undefined 
                : 'var(--gradient-primary)',
              boxShadow: hasCheckedInToday 
                ? '0 0 30px hsl(var(--wellness-good) / 0.5)' 
                : 'var(--shadow-neon-primary)'
            }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
            
            <Plus className="w-4 h-4 mr-2 relative z-10" />
            <span className="relative z-10">
              {hasCheckedInToday ? 'Update Check-in' : 'Daily Check-in'}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};