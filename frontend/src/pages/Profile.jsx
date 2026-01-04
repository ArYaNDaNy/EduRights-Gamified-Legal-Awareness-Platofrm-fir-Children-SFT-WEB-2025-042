import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { User, Camera } from "lucide-react";

export default function Profile() {
  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground mb-8">Profile</h1>

        <div className="max-w-2xl">
          {/* Avatar Section */}
          <div className="bg-card rounded-xl border border-border p-6 mb-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg">Profile Photo</h3>
                <p className="text-sm text-muted-foreground">Upload a new profile photo</p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-6">Personal Information</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                  <input 
                    type="text"
                    defaultValue="John"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                  <input 
                    type="text"
                    defaultValue="Doe"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input 
                  type="email"
                  defaultValue="john@example.com"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                <textarea 
                  rows={4}
                  defaultValue="Course creator and educator"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity mt-4">
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
