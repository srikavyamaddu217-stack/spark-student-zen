import { useState, useEffect } from "react";
import { WellnessHeader } from "@/components/wellness/WellnessHeader";
import { MoodCheckIn } from "@/components/wellness/MoodCheckIn";
import { WellnessDashboard } from "@/components/wellness/WellnessDashboard";
import { WellnessRecommendations } from "@/components/wellness/WellnessRecommendations";

export interface MoodEntry {
  id: string;
  date: string;
  mood: number; // 1-5 scale
  energy: number; // 1-5 scale
  stress: number; // 1-5 scale
  notes?: string;
}

const Index = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [showCheckIn, setShowCheckIn] = useState(false);

  // Load mock data for demonstration
  useEffect(() => {
    const mockEntries: MoodEntry[] = [
      { id: "1", date: "2024-01-15", mood: 4, energy: 3, stress: 2 },
      { id: "2", date: "2024-01-14", mood: 3, energy: 4, stress: 3 },
      { id: "3", date: "2024-01-13", mood: 5, energy: 5, stress: 1 },
      { id: "4", date: "2024-01-12", mood: 2, energy: 2, stress: 4 },
      { id: "5", date: "2024-01-11", mood: 4, energy: 3, stress: 2 },
      { id: "6", date: "2024-01-10", mood: 3, energy: 3, stress: 3 },
      { id: "7", date: "2024-01-09", mood: 4, energy: 4, stress: 2 },
    ];
    setMoodEntries(mockEntries);
  }, []);

  const handleMoodSubmit = (entry: Omit<MoodEntry, "id">) => {
    const newEntry: MoodEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setMoodEntries(prev => [newEntry, ...prev]);
    setShowCheckIn(false);
  };

  const todayEntry = moodEntries.find(entry => 
    entry.date === new Date().toISOString().split('T')[0]
  );

  return (
    <div className="min-h-screen font-jakarta" style={{ background: 'var(--gradient-background)' }}>
      {/* Floating orbs for visual flair */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20 animate-float" 
             style={{ background: 'var(--gradient-glow)' }} />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full opacity-15 animate-float" 
             style={{ background: 'var(--gradient-glow)', animationDelay: '-1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 rounded-full opacity-10 animate-float" 
             style={{ background: 'var(--gradient-glow)', animationDelay: '-2s' }} />
      </div>

      <WellnessHeader 
        onCheckInClick={() => setShowCheckIn(true)}
        hasCheckedInToday={!!todayEntry}
      />
      
      <main className="relative container mx-auto px-4 py-8 space-y-8">
        {showCheckIn && (
          <div className="animate-slide-up">
            <MoodCheckIn 
              onSubmit={handleMoodSubmit}
              onCancel={() => setShowCheckIn(false)}
            />
          </div>
        )}
        
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <WellnessDashboard moodEntries={moodEntries} />
        </div>
        
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <WellnessRecommendations 
            recentMood={moodEntries[0]}
            moodTrend={moodEntries.slice(0, 7)}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;