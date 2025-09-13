import { Button } from "@/components/ui/button";
import { Heart, Plus } from "lucide-react";

interface WellnessHeaderProps {
  onCheckInClick: () => void;
  hasCheckedInToday: boolean;
}

export const WellnessHeader = ({ onCheckInClick, hasCheckedInToday }: WellnessHeaderProps) => {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-wellness-calm to-wellness-positive rounded-full">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Student Wellness Monitor</h1>
              <p className="text-sm text-muted-foreground">Track your mental health journey</p>
            </div>
          </div>
          
          <Button 
            onClick={onCheckInClick}
            className={`${
              hasCheckedInToday 
                ? 'bg-wellness-positive hover:bg-wellness-positive/90' 
                : 'bg-gradient-to-r from-wellness-calm to-wellness-positive hover:from-wellness-calm/90 hover:to-wellness-positive/90'
            } shadow-lg transition-all duration-300`}
          >
            <Plus className="w-4 h-4 mr-2" />
            {hasCheckedInToday ? 'Update Check-in' : 'Daily Check-in'}
          </Button>
        </div>
      </div>
    </header>
  );
};