import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  BookOpen, 
  Coffee, 
  Moon, 
  Flower2, 
  Headphones,
  MapPin,
  Clock,
  Sparkles,
  Zap,
  Shield,
  Phone
} from "lucide-react";
import type { MoodEntry } from "@/pages/Index";

interface WellnessRecommendationsProps {
  recentMood?: MoodEntry;
  moodTrend: MoodEntry[];
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'mindfulness' | 'activity' | 'rest' | 'social' | 'academic';
  priority: 'high' | 'medium' | 'low';
  duration: string;
  icon: any;
  color: string;
}

export const WellnessRecommendations = ({ recentMood, moodTrend }: WellnessRecommendationsProps) => {
  const averageStress = moodTrend.length > 0 
    ? moodTrend.reduce((sum, entry) => sum + entry.stress, 0) / moodTrend.length 
    : 0;
  const averageMood = moodTrend.length > 0 
    ? moodTrend.reduce((sum, entry) => sum + entry.mood, 0) / moodTrend.length 
    : 0;
  const averageEnergy = moodTrend.length > 0 
    ? moodTrend.reduce((sum, entry) => sum + entry.energy, 0) / moodTrend.length 
    : 0;

  const generateRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];

    // High stress recommendations
    if (averageStress >= 3.5 || (recentMood && recentMood.stress >= 4)) {
      recommendations.push({
        id: '1',
        title: 'Guided Breathing Exercise',
        description: 'Try the 4-7-8 breathing technique to reduce stress and anxiety.',
        category: 'mindfulness',
        priority: 'high',
        duration: '5-10 min',
        icon: Flower2,
        color: 'wellness-amazing'
      });
    }

    // Low mood recommendations
    if (averageMood <= 2.5 || (recentMood && recentMood.mood <= 2)) {
      recommendations.push({
        id: '2',
        title: 'Connect with Campus Counseling',
        description: 'Reach out to student support services for professional guidance.',
        category: 'social',
        priority: 'high',
        duration: '30-50 min',
        icon: MapPin,
        color: 'wellness-good'
      });
    }

    // Low energy recommendations
    if (averageEnergy <= 2.5 || (recentMood && recentMood.energy <= 2)) {
      recommendations.push({
        id: '3',
        title: 'Power Nap Break',
        description: 'A 20-minute nap can help restore energy levels.',
        category: 'rest',
        priority: 'medium',
        duration: '20 min',
        icon: Moon,
        color: 'wellness-okay'
      });
      
      recommendations.push({
        id: '4',
        title: 'Light Physical Activity',
        description: 'Take a walk around campus or do some gentle stretching.',
        category: 'activity',
        priority: 'medium',
        duration: '15-30 min',
        icon: Coffee,
        color: 'wellness-low'
      });
    }

    // General wellness recommendations
    recommendations.push(
      {
        id: '5',
        title: 'Mindfulness Meditation',
        description: 'Practice present-moment awareness to improve mental clarity.',
        category: 'mindfulness',
        priority: 'medium',
        duration: '10-15 min',
        icon: Headphones,
        color: 'neon-primary'
      },
      {
        id: '6',
        title: 'Study Break Reminder',
        description: 'Take regular breaks to maintain focus and prevent burnout.',
        category: 'academic',
        priority: 'low',
        duration: '5 min',
        icon: BookOpen,
        color: 'neon-secondary'
      }
    );

    return recommendations.slice(0, 4); // Show top 4 recommendations
  };

  const recommendations = generateRecommendations();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mindfulness': return 'hsl(var(--wellness-amazing))';
      case 'activity': return 'hsl(var(--wellness-good))';
      case 'rest': return 'hsl(var(--wellness-okay))';
      case 'social': return 'hsl(var(--wellness-low))';
      case 'academic': return 'hsl(var(--neon-secondary))';
      default: return 'hsl(var(--neon-primary))';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'hsl(var(--wellness-rough))';
      case 'medium': return 'hsl(var(--wellness-okay))';
      case 'low': return 'hsl(var(--wellness-good))';
      default: return 'hsl(var(--neon-primary))';
    }
  };

  return (
    <Card className="relative border-0 shadow-2xl overflow-hidden"
          style={{ 
            background: 'var(--gradient-card)',
            boxShadow: 'var(--shadow-glass)'
          }}>
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-primary/20 via-neon-accent/20 to-neon-secondary/20 opacity-50 animate-shimmer" />
      
      <CardHeader className="relative">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Lightbulb className="w-7 h-7 text-neon-accent animate-float" />
            <div className="absolute inset-0 w-7 h-7 text-neon-accent animate-pulse opacity-50" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold font-grotesk bg-gradient-to-r from-neon-primary via-neon-accent to-neon-secondary bg-clip-text text-transparent">
              Personalized Wellness Recommendations
            </CardTitle>
            <CardDescription className="font-jakarta text-base text-muted-foreground">
              Based on your recent mood patterns and wellness data ✨
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {recommendations.map((rec) => {
            const IconComponent = rec.icon;
            return (
              <div
                key={rec.id}
                className="group relative p-5 rounded-2xl border transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                style={{ 
                  background: 'var(--gradient-card)',
                  borderColor: 'hsl(var(--border) / 0.3)',
                  boxShadow: 'var(--shadow-glass)'
                }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-500"
                     style={{ 
                       background: `radial-gradient(circle at center, hsl(var(--${rec.color})) 0%, transparent 70%)`
                     }} />
                
                <div className="relative flex items-start space-x-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center animate-float group-hover:animate-pulse-glow"
                         style={{ 
                           background: `linear-gradient(135deg, hsl(var(--${rec.color})) 0%, hsl(var(--${rec.color})) 100%)`,
                           boxShadow: `0 4px 20px hsl(var(--${rec.color}) / 0.3)`
                         }}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-grow space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold font-grotesk text-lg text-foreground group-hover:text-neon-primary transition-colors">
                        {rec.title}
                      </h4>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs font-jakarta">{rec.duration}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground font-jakarta leading-relaxed">
                      {rec.description}
                    </p>
                    
                    <div className="flex items-center space-x-2">
                      <Badge className="font-jakarta text-xs font-medium"
                             style={{ 
                               backgroundColor: `${getCategoryColor(rec.category)} / 0.2`,
                               color: getCategoryColor(rec.category),
                               border: `1px solid ${getCategoryColor(rec.category)} / 0.3`
                             }}>
                        {rec.category}
                      </Badge>
                      <Badge className="font-jakarta text-xs font-medium text-white"
                             style={{ 
                               backgroundColor: getPriorityColor(rec.priority)
                             }}>
                        <Zap className="w-3 h-3 mr-1" />
                        {rec.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Crisis support section */}
        <div className="relative p-6 rounded-2xl border overflow-hidden" 
             style={{ 
               background: 'var(--gradient-card)',
               borderColor: 'hsl(var(--wellness-rough) / 0.3)'
             }}>
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-wellness-rough/10 to-wellness-low/10 animate-pulse opacity-50" />
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl animate-pulse-glow"
                   style={{ 
                     background: 'linear-gradient(135deg, hsl(var(--wellness-rough)) 0%, hsl(var(--wellness-low)) 100%)',
                     boxShadow: 'var(--shadow-neon-accent)'
                   }}>
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold font-grotesk text-lg text-foreground flex items-center">
                  Need immediate support?
                  <Sparkles className="w-4 h-4 ml-2 text-neon-accent animate-pulse" />
                </h4>
                <p className="text-sm text-muted-foreground font-jakarta">
                  Crisis resources are available 24/7 for urgent mental health needs
                </p>
              </div>
            </div>
            
            <Button className="relative overflow-hidden group font-grotesk font-semibold transition-all duration-500"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--wellness-rough)) 0%, hsl(var(--wellness-low)) 100%)',
                      boxShadow: 'var(--shadow-neon-accent)'
                    }}>
              {/* Shimmer effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
              <Phone className="w-4 h-4 mr-2 relative z-10" />
              <span className="relative z-10">Get Help</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};