import { Link } from "react-router-dom";

export function CourseCard({ id, title, image, sales, enrolled }) {
  return (
    <Link to={`/course/${id}`} className="group">
      <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border transition-shadow hover:shadow-md">
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-foreground mb-2">{title}</h4>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Sales: ${sales.toFixed(2)}</span>
            <span>Enrolled: {enrolled}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
