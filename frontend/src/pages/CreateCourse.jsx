import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Upload } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

export default function CreateCourse() {
  const [activeTab, setActiveTab] = useState("basic");
  const [courseName, setCourseName] = useState("");
  const [courseBio, setCourseBio] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [category, setCategory] = useState("");
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [classes, setClasses] = useState([
    { 
      id: "1", 
      name: "Class 1", 
      units: [
        { id: "1-1", name: "Unit 1" },
        { id: "1-2", name: "Unit 2" },
        { id: "1-3", name: "Unit 3" },
      ] 
    },
    { 
      id: "2", 
      name: "Class 2", 
      units: [
        { id: "2-1", name: "Unit 1" },
        { id: "2-2", name: "Unit 2" },
        { id: "2-3", name: "Unit 3" },
      ] 
    },
  ]);

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "curriculum", label: "Curriculum" },
    { id: "pricing", label: "Pricing" },
    { id: "flatpack", label: "Flat-Pack" },
    { id: "reports", label: "Reports" },
  ];

  const addUnit = (classId) => {
    setClasses(classes.map(cls => {
      if (cls.id === classId) {
        const newUnitNumber = cls.units.length + 1;
        return {
          ...cls,
          units: [...cls.units, { id: `${classId}-${newUnitNumber}`, name: `Unit ${newUnitNumber}` }]
        };
      }
      return cls;
    }));
  };

  const addClass = () => {
    const newClassNumber = classes.length + 1;
    setClasses([
      ...classes,
      {
        id: String(newClassNumber),
        name: `Class ${newClassNumber}`,
        units: [{ id: `${newClassNumber}-1`, name: "Unit 1" }]
      }
    ]);
  };

  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Create a Course</h1>
          <div className="flex items-center gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "text-sm font-medium transition-colors",
                  activeTab === tab.id 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity">
              DEPLOY
            </button>
          </div>
        </div>

        {/* Basic Info Tab */}
        {activeTab === "basic" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground mb-6">
                invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              </p>
              <div className="bg-card rounded-xl p-6 border border-border flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
                  alt="Team collaboration"
                  className="rounded-lg max-h-64 object-contain"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Course Name</label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter course name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Course Bio</label>
                <input
                  type="text"
                  value={courseBio}
                  onChange={(e) => setCourseBio(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter course bio"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Course Description</label>
                <textarea
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Enter course description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter category"
                />
              </div>
            </div>
          </div>
        )}

        {/* Basic Info - Cover Image Section */}
        {activeTab === "basic" && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-foreground mb-4">Course Cover Image</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-muted-foreground mb-6">
                  invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                </p>
              </div>
              
              <div className="flex gap-6">
                <div className="flex-1 bg-card rounded-xl p-8 border border-border flex items-center justify-center min-h-48">
                  <button className="w-16 h-16 rounded-full border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex-1 bg-card rounded-xl p-6 border border-border">
                  <h4 className="font-semibold text-foreground mb-2">99designs</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Have one designed: Connect with 99Designs to have your course cover designed for you
                  </p>
                  <button className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                    Connect
                  </button>
                </div>
              </div>
            </div>

            {/* Options Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div className="bg-card rounded-xl p-6 border border-border flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Comments</h4>
                  <p className="text-sm text-muted-foreground">Allow your students to comment on this course</p>
                </div>
                <Switch checked={commentsEnabled} onCheckedChange={setCommentsEnabled} />
              </div>
              
              <div className="bg-card rounded-xl p-6 border border-border flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Duplicate Course</h4>
                  <p className="text-sm text-muted-foreground">This action will duplicate your course, but note your students</p>
                </div>
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                  Duplicate
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Curriculum Tab */}
        {activeTab === "curriculum" && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Curriculum</h3>
              <p className="text-muted-foreground">
                Create your course by creating a class and then creating units that fall under that unit
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {classes.map((cls) => (
                <div key={cls.id} className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                      {cls.name}
                    </span>
                    <input 
                      type="text" 
                      placeholder="Class title..."
                      className="flex-1 bg-transparent border-b border-border text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {cls.units.map((unit) => (
                      <div key={unit.id} className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                          {unit.name}
                        </span>
                        <input 
                          type="text" 
                          placeholder="Unit title..."
                          className="flex-1 bg-transparent border-b border-border text-foreground text-sm focus:outline-none focus:border-primary"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => addUnit(cls.id)}
                    className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity border-2 border-dashed border-primary/30 rounded-lg px-4 py-2 w-full justify-center"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm font-medium">New Unit</span>
                  </button>
                </div>
              ))}
            </div>

            <button 
              onClick={addClass}
              className="w-full py-4 bg-muted-foreground/80 text-white rounded-xl font-medium hover:bg-muted-foreground transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Class
            </button>
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === "pricing" && (
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold text-foreground mb-6">Pricing Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Course Price</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Currency</label>
                <select className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>USD - US Dollar</option>
                  <option>EUR - Euro</option>
                  <option>GBP - British Pound</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                <div>
                  <h4 className="font-medium text-foreground">Free Course</h4>
                  <p className="text-sm text-muted-foreground">Make this course available for free</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        )}

        {/* Flat-Pack Tab */}
        {activeTab === "flatpack" && (
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold text-foreground mb-6">Flat-Pack Settings</h3>
            <p className="text-muted-foreground mb-6">Configure your course bundle options and packaging.</p>
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-muted-foreground">Flat-pack settings coming soon...</p>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold text-foreground mb-6">Course Reports</h3>
            <p className="text-muted-foreground mb-6">View analytics and reports for your course.</p>
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-muted-foreground">No data available yet. Reports will appear once students start enrolling.</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
