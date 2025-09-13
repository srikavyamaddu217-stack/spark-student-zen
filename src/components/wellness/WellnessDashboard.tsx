import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";
import { TrendingUp, Calendar, Heart, Zap, Brain } from "lucide-react";
import type { MoodEntry } from "@/pages/Index";

interface WellnessDashboardProps {
  moodEntries: MoodEntry[];
}

export const WellnessDashboard = ({ moodEntries }: WellnessDashboardProps) => {
  const recentEntries = moodEntries.slice(0, 7).reverse();
  const averageMood = moodEntries.length > 0 
    ? (moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length)
    : 0;

  const getMoodColor = (mood: number) => {
    if (mood >= 4.5) return "bg-wellness-positive";
    if (mood >= 3.5) return "bg-wellness-calm";
    if (mood >= 2.5) return "bg-wellness-neutral";
    if (mood >= 1.5) return "bg-wellness-concern";
    return "bg-wellness-alert";
  };

  const getMoodLabel = (mood: number) => {
    if (mood >= 4.5) return "Excellent";
    if (mood >= 3.5) return "Good";
    if (mood >= 2.5) return "Neutral";
    if (mood >= 1.5) return "Low";
    return "Very Low";
  };

  const chartData = recentEntries.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    mood: entry.mood,
    energy: entry.energy,
    stress: entry.stress,
  }));

  const todayEntry = moodEntries[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Current Status Cards */}
      <div className="lg:col-span-1 space-y-4">
        <Card className="border-0 bg-gradient-to-br from-card to-secondary/20 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              Overall Wellness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getMoodColor(averageMood)}`} />
                <span className="text-2xl font-bold text-foreground">
                  {averageMood.toFixed(1)}/5.0
                </span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {getMoodLabel(averageMood)} • 7-day average
              </Badge>
            </div>
          </CardContent>
        </Card>

        {todayEntry && (
          <>
            <Card className="border-0 bg-gradient-to-br from-card to-wellness-positive/10 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Today's Energy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{todayEntry.energy}/5</div>
                <Badge variant="outline" className="text-xs mt-1">
                  {getMoodLabel(todayEntry.energy)}
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-card to-wellness-concern/10 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground flex items-center">
                  <Brain className="w-4 h-4 mr-2" />
                  Stress Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{todayEntry.stress}/5</div>
                <Badge variant="outline" className="text-xs mt-1">
                  {todayEntry.stress <= 2 ? 'Low' : todayEntry.stress <= 3 ? 'Moderate' : 'High'}
                </Badge>
              </CardContent>
            </Card>
          </>
        )}

        <Card className="border-0 bg-gradient-to-br from-card to-primary/10 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Check-in Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{moodEntries.length}</div>
            <Badge variant="outline" className="text-xs mt-1">
              Days tracked
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Trend Charts */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <TrendingUp className="w-5 h-5 mr-2 text-primary" />
              7-Day Mood Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--wellness-positive))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--wellness-positive))" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--wellness-calm))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--wellness-calm))" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    className="text-xs text-muted-foreground"
                  />
                  <YAxis 
                    domain={[1, 5]}
                    axisLine={false}
                    tickLine={false}
                    className="text-xs text-muted-foreground"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'hsl(var(--card))', 
                      border: 'none', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="mood"
                    stroke="hsl(var(--wellness-positive))"
                    strokeWidth={2}
                    fill="url(#moodGradient)"
                    name="Mood"
                  />
                  <Area
                    type="monotone"
                    dataKey="energy"
                    stroke="hsl(var(--wellness-calm))"
                    strokeWidth={2}
                    fill="url(#energyGradient)"
                    name="Energy"
                  />
                  <Line
                    type="monotone"
                    dataKey="stress"
                    stroke="hsl(var(--wellness-concern))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Stress"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};