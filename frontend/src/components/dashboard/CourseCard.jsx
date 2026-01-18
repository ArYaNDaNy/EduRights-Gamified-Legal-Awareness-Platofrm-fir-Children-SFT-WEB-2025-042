import { useNavigate } from "react-router-dom";

export function CourseCard({ id, title, image }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/modules/${id}`)}
      className="cursor-pointer bg-card rounded-xl overflow-hidden border hover:shadow-lg transition"
    >
      <img src={image} alt={title} className="h-40 w-full object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
    </div>
  );
}
