import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import type { MoodEntry } from "@/pages/Index";

interface MoodCheckInProps {
  onSubmit: (entry: Omit<MoodEntry, "id">) => void;
  onCancel: () => void;
}

const moodEmojis = [
  { value: 1, emoji: "😢", label: "Very Low", color: "text-wellness-alert" },
  { value: 2, emoji: "😔", label: "Low", color: "text-wellness-concern" },
  { value: 3, emoji: "😐", label: "Neutral", color: "text-wellness-neutral" },
  { value: 4, emoji: "😊", label: "Good", color: "text-wellness-positive" },
  { value: 5, emoji: "😄", label: "Excellent", color: "text-wellness-calm" },
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
    description 
  }: { 
    title: string; 
    value: number | null; 
    onChange: (value: number) => void;
    description: string;
  }) => (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="flex justify-between">
        {moodEmojis.map(({ value: moodValue, emoji, label, color }) => (
          <button
            key={moodValue}
            onClick={() => onChange(moodValue)}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
              value === moodValue 
                ? 'bg-primary/10 ring-2 ring-primary scale-110 shadow-lg' 
                : 'hover:bg-secondary/50'
            }`}
          >
            <span className="text-2xl">{emoji}</span>
            <span className={`text-xs font-medium ${color}`}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const isComplete = mood && energy && stress;

  return (
    <Card className="relative animate-in slide-in-from-bottom-4 duration-300 shadow-xl border-0 bg-gradient-to-br from-card via-card to-secondary/30">
      <Button
        variant="ghost"
        size="sm"
        onClick={onCancel}
        className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-secondary"
      >
        <X className="w-4 h-4" />
      </Button>
      
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-foreground">Daily Wellness Check-in</CardTitle>
        <CardDescription>
          Take a moment to reflect on how you're feeling today
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
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
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Additional Notes (Optional)
          </label>
          <Textarea
            placeholder="Anything specific you'd like to note about your day..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[80px] resize-none"
          />
        </div>
        
        <div className="flex space-x-3 pt-4">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!isComplete}
            className="flex-1 bg-gradient-to-r from-wellness-calm to-wellness-positive hover:from-wellness-calm/90 hover:to-wellness-positive/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Check-in
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};