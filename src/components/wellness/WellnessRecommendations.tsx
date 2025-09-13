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
  Clock
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
        icon: Flower2
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
        icon: MapPin
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
        icon: Moon
      });
      
      recommendations.push({
        id: '4',
        title: 'Light Physical Activity',
        description: 'Take a walk around campus or do some gentle stretching.',
        category: 'activity',
        priority: 'medium',
        duration: '15-30 min',
        icon: Coffee
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
        icon: Headphones
      },
      {
        id: '6',
        title: 'Study Break Reminder',
        description: 'Take regular breaks to maintain focus and prevent burnout.',
        category: 'academic',
        priority: 'low',
        duration: '5 min',
        icon: BookOpen
      }
    );

    return recommendations.slice(0, 4); // Show top 4 recommendations
  };

  const recommendations = generateRecommendations();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mindfulness': return 'bg-wellness-calm/10 text-wellness-calm border-wellness-calm/20';
      case 'activity': return 'bg-wellness-positive/10 text-wellness-positive border-wellness-positive/20';
      case 'rest': return 'bg-wellness-neutral/10 text-wellness-neutral border-wellness-neutral/20';
      case 'social': return 'bg-accent/10 text-accent border-accent/20';
      case 'academic': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-wellness-alert text-white';
      case 'medium': return 'bg-wellness-concern text-white';
      case 'low': return 'bg-wellness-positive text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-card via-card to-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <Lightbulb className="w-5 h-5 mr-2 text-accent" />
          Personalized Wellness Recommendations
        </CardTitle>
        <CardDescription>
          Based on your recent mood patterns and wellness data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => {
            const IconComponent = rec.icon;
            return (
              <div
                key={rec.id}
                className="group p-4 rounded-lg border bg-gradient-to-br from-card to-secondary/10 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-grow space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {rec.title}
                      </h4>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{rec.duration}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {rec.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getCategoryColor(rec.category)}>
                        {rec.category}
                      </Badge>
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-secondary/50 to-primary/5 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Need immediate support?</h4>
              <p className="text-sm text-muted-foreground">
                Crisis resources are available 24/7 for urgent mental health needs
              </p>
            </div>
            <Button variant="outline" className="shrink-0">
              Get Help
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};