import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Settings as SettingsIcon, Bell, Lock, CreditCard, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground mb-8">Settings</h1>

        <div className="max-w-3xl space-y-6">
          {/* General Settings */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <SettingsIcon className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">General</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">School Name</label>
                <input 
                  type="text"
                  defaultValue="My School"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Timezone</label>
                <select className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>UTC (GMT+0)</option>
                  <option>EST (GMT-5)</option>
                  <option>PST (GMT-8)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive email updates about your courses</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">New Student Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when a new student enrolls</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Sales Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive alerts for new purchases</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Security</h3>
            </div>
            
            <div className="space-y-4">
              <button className="text-primary hover:underline text-sm">Change Password</button>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
