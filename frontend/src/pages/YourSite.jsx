import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Globe, ExternalLink, Copy, Settings } from "lucide-react";

export default function YourSite() {
  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground mb-8">Your Site</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Site Preview */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <Globe className="w-16 h-16 text-muted-foreground" />
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-foreground mb-2">My School Website</h3>
              <p className="text-sm text-muted-foreground mb-4">Your public-facing course website</p>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  <ExternalLink className="w-4 h-4" />
                  Visit Site
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                  <Settings className="w-4 h-4" />
                  Customize
                </button>
              </div>
            </div>
          </div>

          {/* Site Settings */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-6">Site Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Site URL</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="text"
                    value="myschool.teachable.com"
                    readOnly
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-muted text-foreground"
                  />
                  <button className="p-2 border border-border rounded-lg hover:bg-muted transition-colors">
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Site Name</label>
                <input 
                  type="text"
                  defaultValue="My School"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tagline</label>
                <input 
                  type="text"
                  defaultValue="Learn something new today"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity mt-4">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
