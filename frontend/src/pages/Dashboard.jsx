import { Link } from "react-router-dom";
import { Plus, Users, DollarSign, TrendingUp, BarChart3 } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StudentsChart } from "@/components/dashboard/StudentsChart";
import { TimeDataChart } from "@/components/dashboard/TimeDataChart";
import { CourseCard } from "@/components/dashboard/CourseCard";

const courses = [
  {
    id: "1",
    title: "Introduction to Constitutional Law",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    sales: 24,
    enrolled: 156,
  },
  {
    id: "2",
    title: "Fundamental Rights Masterclass",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop",
    sales: 18,
    enrolled: 89,
  },
  {
    id: "3",
    title: "Legal Procedures & Practice",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=300&fit=crop",
    sales: 32,
    enrolled: 204,
  },
  {
    id: "4",
    title: "Advanced Human Rights",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop",
    sales: 15,
    enrolled: 67,
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name || 'Teacher'}!
          </h1>
          <p className="text-muted-foreground">
            Manage your courses and monitor student progress
          </p>
        </div>

        {/* Business Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Students */}
          <div className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 border border-blue-500/20 rounded-2xl p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                +12%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-1">1,247</h3>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </div>

          {/* Revenue */}
          <div className="bg-gradient-to-br from-green-500/5 to-emerald-600/5 border border-green-500/20 rounded-2xl p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-500/20 border border-green-500/30">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                +8.4%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-1">$28,470</h3>
            <p className="text-sm text-muted-foreground">Monthly Revenue</p>
          </div>

          {/* Active Courses */}
          <div className="bg-gradient-to-br from-purple-500/5 to-purple-600/5 border border-purple-500/20 rounded-2xl p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/30">
                <BarChart3 className="w-6 h-6 text-purple-500" />
              </div>
              <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                +2
              </span>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-1">24</h3>
            <p className="text-sm text-muted-foreground">Active Courses</p>
          </div>

          {/* Completion Rate */}
          <div className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 border border-orange-500/20 rounded-2xl p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-orange-500/20 border border-orange-500/30">
                <TrendingUp className="w-6 h-6 text-orange-500" />
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                +3.2%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-1">87%</h3>
            <p className="text-sm text-muted-foreground">Avg Completion</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-card rounded-2xl border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Student Growth</h3>
            <StudentsChart />
          </div>
          
          <div className="bg-card rounded-2xl border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Engagement Trends</h3>
            <div className="flex gap-6 h-full">
              <div className="flex-1">
                <TimeDataChart />
              </div>
              <div className="hidden xl:flex items-end">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=300&fit=crop"
                  alt="Analytics"
                  className="h-64 object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-muted rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">94%</div>
            <p className="text-sm text-muted-foreground">Satisfaction</p>
          </div>
          <div className="bg-muted rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">2.3k</div>
            <p className="text-sm text-muted-foreground">Lessons Completed</p>
          </div>
          <div className="bg-muted rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">156</div>
            <p className="text-sm text-muted-foreground">New Students</p>
          </div>
          <div className="bg-muted rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">98%</div>
            <p className="text-sm text-muted-foreground">Course Completion</p>
          </div>
        </div>

        {/* Courses Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Your Courses</h2>
          <Link 
            to="/create-course"
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            NEW COURSE
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
