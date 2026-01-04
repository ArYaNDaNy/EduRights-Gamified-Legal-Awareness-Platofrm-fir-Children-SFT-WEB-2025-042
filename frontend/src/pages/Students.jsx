import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Users, Search, Filter } from "lucide-react";

const students = [
  { id: 1, name: "John Smith", email: "john@example.com", enrolled: 3, progress: 75 },
  { id: 2, name: "Sarah Johnson", email: "sarah@example.com", enrolled: 2, progress: 50 },
  { id: 3, name: "Mike Wilson", email: "mike@example.com", enrolled: 1, progress: 100 },
  { id: 4, name: "Emily Brown", email: "emily@example.com", enrolled: 4, progress: 25 },
  { id: 5, name: "David Lee", email: "david@example.com", enrolled: 2, progress: 60 },
];

export default function Students() {
  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Students</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-card text-foreground hover:bg-muted transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Email</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Courses Enrolled</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Progress</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">{student.email}</td>
                  <td className="py-4 px-6 text-foreground">{student.enrolled}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{student.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
