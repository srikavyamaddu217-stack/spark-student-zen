import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { X, Sparkles } from "lucide-react";
import type { MoodEntry } from "@/pages/Index";

interface MoodCheckInProps {
  onSubmit: (entry: Omit<MoodEntry, "id">) => void;
  onCancel: () => void;
}

const moodEmojis = [
  { value: 1, emoji: "😢", label: "Rough", color: "wellness-rough", glow: "shadow-neon-accent" },
  { value: 2, emoji: "😔", label: "Low", color: "wellness-low", glow: "shadow-neon-accent" },
  { value: 3, emoji: "😐", label: "Okay", color: "wellness-okay", glow: "shadow-neon-secondary" },
  { value: 4, emoji: "😊", label: "Good", color: "wellness-good", glow: "shadow-neon-primary" },
  { value: 5, emoji: "✨", label: "Amazing", color: "wellness-amazing", glow: "shadow-neon-primary" },
];

export const MoodCheckIn = ({ onSubmit, onCancel }: MoodCheckInProps) => {
  const [mood, setMood] = useState<number | null>(null);
  const [energy, setEnergy] = useState<number | null>(null);
  const [stress, setStress] = useState<number | null>(null);
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (mood && energy && stress) {
      onSubmit({
        date: new Date().toISOString().split('T')[0],
        mood,
        energy,
        stress,
        notes: notes.trim() || undefined,
      });
    }
  };

  const MoodSelector = ({ 
    title, 
    value, 
    onChange, 
    description,
    icon: Icon
  }: { 
    title: string; 
    value: number | null; 
    onChange: (value: number) => void;
    description: string;
    icon?: any;
  }) => (
    <div className="space-y-4 p-4 rounded-2xl border" 
         style={{ 
           background: 'var(--gradient-card)',
           borderColor: 'hsl(var(--border) / 0.3)'
         }}>
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="w-5 h-5 text-neon-primary" />}
        <div>
          <h3 className="text-lg font-semibold font-grotesk text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground font-jakarta">{description}</p>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {moodEmojis.map(({ value: moodValue, emoji, label, color, glow }) => (
          <button
            key={moodValue}
            onClick={() => onChange(moodValue)}
            className={`group relative flex flex-col items-center space-y-2 p-3 rounded-xl transition-all duration-300 ${
              value === moodValue 
                ? 'scale-110 animate-bounce-in' 
                : 'hover:scale-105'
            }`}
            style={{
              background: value === moodValue 
                ? `hsl(var(--${color}) / 0.2)` 
                : 'hsl(var(--card) / 0.5)',
              border: value === moodValue 
                ? `2px solid hsl(var(--${color}))` 
                : '1px solid hsl(var(--border) / 0.3)',
              boxShadow: value === moodValue 
                ? `0 0 30px hsl(var(--${color}) / 0.4)` 
                : undefined
            }}
          >
            <span className="text-3xl transition-all duration-200 group-hover:scale-110">
              {emoji}
            </span>
            <span className={`text-xs font-medium font-jakarta transition-colors ${
              value === moodValue 
                ? `text-${color}` 
                : 'text-muted-foreground'
            }`}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  const isComplete = mood && energy && stress;

  return (
    <Card className="relative animate-bounce-in border-0 shadow-2xl overflow-hidden"
          style={{ 
            background: 'var(--gradient-card)',
            boxShadow: 'var(--shadow-glass)'
          }}>
      {/* Animated border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-neon-primary via-neon-accent to-neon-secondary opacity-30 animate-pulse" />
      <div className="absolute inset-0.5 rounded-3xl"
           style={{ background: 'var(--gradient-card)' }} />
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onCancel}
        className="absolute right-4 top-4 h-8 w-8 p-0 z-10 text-muted-foreground hover:text-foreground hover:bg-muted/20"
      >
        <X className="w-4 h-4" />
      </Button>
      
      <CardHeader className="relative pb-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-neon-primary animate-pulse" />
          <CardTitle className="text-2xl font-bold font-grotesk bg-gradient-to-r from-neon-primary to-neon-accent bg-clip-text text-transparent">
            Daily Wellness Check-in
          </CardTitle>
        </div>
        <CardDescription className="font-jakarta text-base">
          Take a moment to reflect on how you're feeling today ✨
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative space-y-6">
        <MoodSelector
          title="Overall Mood"
          description="How are you feeling emotionally right now?"
          value={mood}
          onChange={setMood}
        />
        
        <MoodSelector
          title="Energy Level"
          description="How energetic do you feel today?"
          value={energy}
          onChange={setEnergy}
        />
        
        <MoodSelector
          title="Stress Level"
          description="How stressed or overwhelmed do you feel?"
          value={stress}
          onChange={setStress}
        />
        
        <div className="space-y-3 p-4 rounded-2xl border" 
             style={{ 
               background: 'var(--gradient-card)',
               borderColor: 'hsl(var(--border) / 0.3)'
             }}>
          <label className="text-lg font-semibold font-grotesk text-foreground">
            Additional Notes 
            <span className="text-sm text-muted-foreground font-jakarta font-normal ml-2">(Optional)</span>
          </label>
          <Textarea
            placeholder="Anything specific you'd like to note about your day... 💭"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px] resize-none bg-muted/20 border-border/30 font-jakarta"
          />
        </div>
        
        <div className="flex space-x-4 pt-4">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="flex-1 font-grotesk font-semibold border-border/30 hover:bg-muted/20"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!isComplete}
            className="flex-1 font-grotesk font-semibold relative overflow-hidden group transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: isComplete ? 'var(--gradient-primary)' : undefined,
              boxShadow: isComplete ? 'var(--shadow-neon-primary)' : undefined
            }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
            <span className="relative z-10">Save Check-in ✨</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};