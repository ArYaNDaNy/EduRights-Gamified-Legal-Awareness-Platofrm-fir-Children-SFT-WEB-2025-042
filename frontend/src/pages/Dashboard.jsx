import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StudentsChart } from "@/components/dashboard/StudentsChart";
import { TimeDataChart } from "@/components/dashboard/TimeDataChart";
import { CourseCard } from "@/components/dashboard/CourseCard";

const courses = [
  {
    id: "1",
    title: "Course Title",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    sales: 0,
    enrolled: 0,
  },
  {
    id: "2",
    title: "Course Title",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop",
    sales: 0,
    enrolled: 0,
  },
  {
    id: "3",
    title: "Course Title",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=300&fit=crop",
    sales: 0,
    enrolled: 0,
  },
  {
    id: "4",
    title: "Course Title",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop",
    sales: 0,
    enrolled: 0,
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>
        

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <StudentsChart />
          <div className="flex gap-6">
            <div className="flex-1">
              <TimeDataChart />
            </div>
         
          </div>
        </div>

        {/* Courses Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Your Courses</h2>
          <Link 
            to="/create-course"
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
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
