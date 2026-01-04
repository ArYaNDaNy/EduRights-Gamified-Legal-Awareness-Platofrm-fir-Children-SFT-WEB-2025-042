import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Mail, Send, Inbox, Archive, Plus } from "lucide-react";

const emailTemplates = [
  { id: 1, name: "Welcome Email", subject: "Welcome to My School!", status: "active" },
  { id: 2, name: "Course Completion", subject: "Congratulations on completing your course!", status: "active" },
  { id: 3, name: "Enrollment Confirmation", subject: "You're enrolled!", status: "draft" },
];

export default function Emails() {
  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Emails</h1>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            New Template
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-xl border border-border p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Send className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sent</p>
              <p className="text-2xl font-bold text-foreground">1,234</p>
            </div>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-chart-green/10 flex items-center justify-center">
              <Inbox className="w-6 h-6 text-chart-green" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Delivered</p>
              <p className="text-2xl font-bold text-foreground">1,198</p>
            </div>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <Archive className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Open Rate</p>
              <p className="text-2xl font-bold text-foreground">68%</p>
            </div>
          </div>
        </div>

        {/* Email Templates */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Email Templates</h3>
          </div>
          
          <div className="divide-y divide-border">
            {emailTemplates.map((template) => (
              <div key={template.id} className="p-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{template.name}</p>
                    <p className="text-sm text-muted-foreground">{template.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    template.status === 'active' 
                      ? 'bg-chart-green/10 text-chart-green' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {template.status}
                  </span>
                  <button className="text-sm text-primary hover:underline">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
