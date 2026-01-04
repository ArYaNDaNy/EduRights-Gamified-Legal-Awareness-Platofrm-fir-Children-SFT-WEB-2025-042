import { useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const courseData = {
  id: "1",
  title: "Class 01",
  image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=400&fit=crop",
  totalUnits: 3,
  currentUnit: 1,
  units: [
    { id: 1, title: "Introduction to Gamification", active: true },
    { id: 2, title: "Examples of Gamification", active: false },
    { id: 3, title: "Theory, Motivation & Trends", active: false },
  ],
  currentUnitData: {
    title: "Class 01",
    videoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
    description: "Dr Zac Fitz-Walter (PhD in Gamification Design) gives us a greater understanding of what Gamification is and where it originated from. Watch now to discover for yourself!",
  }
};

export default function CourseView() {
  const { id } = useParams();
  const [currentUnit, setCurrentUnit] = useState(1);

  const handlePrevUnit = () => {
    if (currentUnit > 1) setCurrentUnit(currentUnit - 1);
  };

  const handleNextUnit = () => {
    if (currentUnit < courseData.units.length) setCurrentUnit(currentUnit + 1);
  };

  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Course Info */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border">
              <img 
                src={courseData.image}
                alt={courseData.title}
                className="w-full aspect-square object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">{courseData.title}</h2>
                <p className="text-muted-foreground mb-6">{currentUnit} out of {courseData.totalUnits} units</p>
                
                <div className="border-t border-dashed border-border pt-6">
                  <ul className="space-y-3">
                    {courseData.units.map((unit, index) => (
                      <li 
                        key={unit.id}
                        className={cn(
                          "cursor-pointer transition-colors",
                          currentUnit === unit.id 
                            ? "text-primary font-medium" 
                            : "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={() => setCurrentUnit(unit.id)}
                      >
                        {index + 1}. {unit.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-foreground text-center mb-6">{courseData.currentUnitData.title}</h2>
                
                {/* Video Player */}
                <div className="relative aspect-video bg-foreground/90 rounded-xl overflow-hidden mb-6">
                  <img 
                    src={courseData.currentUnitData.videoUrl}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1" />
                    </button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-8">{courseData.currentUnitData.description}</p>

                <div className="border-t border-dashed border-border pt-6 flex items-center justify-between">
                  <button 
                    onClick={handlePrevUnit}
                    disabled={currentUnit === 1}
                    className={cn(
                      "px-6 py-3 rounded-lg font-medium transition-colors",
                      currentUnit === 1
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    )}
                  >
                    Previous Unit
                  </button>
                  
                  <button 
                    onClick={handleNextUnit}
                    disabled={currentUnit === courseData.units.length}
                    className={cn(
                      "px-6 py-3 rounded-lg font-medium transition-colors",
                      currentUnit === courseData.units.length
                        ? "bg-primary/50 text-primary-foreground cursor-not-allowed"
                        : "bg-amber-500 text-white hover:bg-amber-600"
                    )}
                  >
                    Next Unit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
