import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";
import { TrendingUp, Calendar, Heart, Zap, Brain, Activity, Sparkles } from "lucide-react";
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
    if (mood >= 4.5) return "wellness-amazing";
    if (mood >= 3.5) return "wellness-good";
    if (mood >= 2.5) return "wellness-okay";
    if (mood >= 1.5) return "wellness-low";
    return "wellness-rough";
  };

  const getMoodLabel = (mood: number) => {
    if (mood >= 4.5) return "Amazing";
    if (mood >= 3.5) return "Good";
    if (mood >= 2.5) return "Okay";
    if (mood >= 1.5) return "Low";
    return "Rough";
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
        <Card className="relative border-0 shadow-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-500"
              style={{ 
                background: 'var(--gradient-card)',
                boxShadow: 'var(--shadow-glass)'
              }}>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-primary/10 to-neon-accent/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          <CardHeader className="relative pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center font-jakarta">
              <Heart className="w-4 h-4 mr-2 text-neon-primary animate-pulse" />
              Overall Wellness
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full animate-pulse-glow`} 
                     style={{ backgroundColor: `hsl(var(--${getMoodColor(averageMood)}))` }} />
                <span className="text-3xl font-bold font-grotesk bg-gradient-to-r from-neon-primary to-neon-accent bg-clip-text text-transparent">
                  {averageMood.toFixed(1)}/5.0
                </span>
              </div>
              <Badge className="font-jakarta font-medium"
                     style={{ 
                       backgroundColor: `hsl(var(--${getMoodColor(averageMood)}) / 0.2)`,
                       color: `hsl(var(--${getMoodColor(averageMood)}))`,
                       border: `1px solid hsl(var(--${getMoodColor(averageMood)}) / 0.3)`
                     }}>
                <Sparkles className="w-3 h-3 mr-1" />
                {getMoodLabel(averageMood)} • 7-day average
              </Badge>
            </div>
          </CardContent>
        </Card>

        {todayEntry && (
          <>
            <Card className="relative border-0 shadow-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-500"
                  style={{ 
                    background: 'var(--gradient-card)',
                    boxShadow: 'var(--shadow-glass)'
                  }}>
              <div className="absolute inset-0 bg-gradient-to-br from-wellness-good/10 to-wellness-amazing/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <CardHeader className="relative pb-2">
                <CardTitle className="text-sm text-muted-foreground flex items-center font-jakarta">
                  <Zap className="w-4 h-4 mr-2 text-wellness-amazing animate-pulse" />
                  Today's Energy
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold font-grotesk text-foreground">{todayEntry.energy}/5</div>
                <Badge className="mt-2 font-jakarta"
                       style={{ 
                         backgroundColor: `hsl(var(--${getMoodColor(todayEntry.energy)}) / 0.2)`,
                         color: `hsl(var(--${getMoodColor(todayEntry.energy)}))`,
                         border: `1px solid hsl(var(--${getMoodColor(todayEntry.energy)}) / 0.3)`
                       }}>
                  {getMoodLabel(todayEntry.energy)}
                </Badge>
              </CardContent>
            </Card>

            <Card className="relative border-0 shadow-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-500"
                  style={{ 
                    background: 'var(--gradient-card)',
                    boxShadow: 'var(--shadow-glass)'
                  }}>
              <div className="absolute inset-0 bg-gradient-to-br from-wellness-low/10 to-wellness-rough/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <CardHeader className="relative pb-2">
                <CardTitle className="text-sm text-muted-foreground flex items-center font-jakarta">
                  <Brain className="w-4 h-4 mr-2 text-wellness-low animate-pulse" />
                  Stress Level
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold font-grotesk text-foreground">{todayEntry.stress}/5</div>
                <Badge className="mt-2 font-jakarta"
                       style={{ 
                         backgroundColor: todayEntry.stress <= 2 ? 'hsl(var(--wellness-good) / 0.2)' : 'hsl(var(--wellness-rough) / 0.2)',
                         color: todayEntry.stress <= 2 ? 'hsl(var(--wellness-good))' : 'hsl(var(--wellness-rough))',
                         border: `1px solid ${todayEntry.stress <= 2 ? 'hsl(var(--wellness-good) / 0.3)' : 'hsl(var(--wellness-rough) / 0.3)'}`
                       }}>
                  {todayEntry.stress <= 2 ? 'Low' : todayEntry.stress <= 3 ? 'Moderate' : 'High'}
                </Badge>
              </CardContent>
            </Card>
          </>
        )}

        <Card className="relative border-0 shadow-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-500"
              style={{ 
                background: 'var(--gradient-card)',
                boxShadow: 'var(--shadow-glass)'
              }}>
          <div className="absolute inset-0 bg-gradient-to-br from-neon-secondary/10 to-neon-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          <CardHeader className="relative pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center font-jakarta">
              <Calendar className="w-4 h-4 mr-2 text-neon-secondary animate-pulse" />
              Check-in Streak
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold font-grotesk bg-gradient-to-r from-neon-secondary to-neon-primary bg-clip-text text-transparent">
              {moodEntries.length}
            </div>
            <Badge variant="outline" className="mt-2 font-jakarta border-neon-secondary/30 text-neon-secondary">
              <Activity className="w-3 h-3 mr-1" />
              Days tracked
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Trend Charts */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="relative border-0 shadow-2xl overflow-hidden"
              style={{ 
                background: 'var(--gradient-card)',
                boxShadow: 'var(--shadow-glass)'
              }}>
          {/* Animated border */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon-primary/20 via-neon-accent/20 to-neon-secondary/20 opacity-50 animate-shimmer" />
          
          <CardHeader className="relative">
            <CardTitle className="flex items-center text-foreground font-grotesk">
              <TrendingUp className="w-6 h-6 mr-3 text-neon-primary animate-float" />
              <span className="bg-gradient-to-r from-neon-primary via-neon-accent to-neon-secondary bg-clip-text text-transparent">
                7-Day Mood Trends
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="h-80 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--wellness-amazing))" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(var(--wellness-amazing))" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--wellness-good))" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(var(--wellness-good))" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--wellness-rough))" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(var(--wellness-rough))" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    className="text-sm text-muted-foreground font-jakarta"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    domain={[1, 5]}
                    axisLine={false}
                    tickLine={false}
                    className="text-sm text-muted-foreground font-jakarta"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'hsl(var(--card))', 
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow-glass)',
                      color: 'hsl(var(--foreground))'
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="mood"
                    stroke="hsl(var(--wellness-amazing))"
                    strokeWidth={3}
                    fill="url(#moodGradient)"
                    name="Mood"
                    dot={{ fill: 'hsl(var(--wellness-amazing))', strokeWidth: 2, r: 5 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="energy"
                    stroke="hsl(var(--wellness-good))"
                    strokeWidth={3}
                    fill="url(#energyGradient)"
                    name="Energy"
                    dot={{ fill: 'hsl(var(--wellness-good))', strokeWidth: 2, r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="stress"
                    stroke="hsl(var(--wellness-rough))"
                    strokeWidth={3}
                    strokeDasharray="8 4"
                    dot={{ fill: 'hsl(var(--wellness-rough))', strokeWidth: 2, r: 5 }}
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