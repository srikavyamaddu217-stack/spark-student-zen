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
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted">
      <WellnessHeader 
        onCheckInClick={() => setShowCheckIn(true)}
        hasCheckedInToday={!!todayEntry}
      />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {showCheckIn && (
          <MoodCheckIn 
            onSubmit={handleMoodSubmit}
            onCancel={() => setShowCheckIn(false)}
          />
        )}
        
        <WellnessDashboard moodEntries={moodEntries} />
        
        <WellnessRecommendations 
          recentMood={moodEntries[0]}
          moodTrend={moodEntries.slice(0, 7)}
        />
      </main>
    </div>
  );
};

export default Index;