import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

function ModuleDetails() {
  const { moduleId } = useParams();
  const [levels, setLevels] = useState([]);

  const user = useAuth()
  const isAdmin = user?.role === "ADMIN";
  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/levels/${moduleId}`
      );
      setLevels(res.data.levels);
    } catch (error) {
      console.error("Failed to fetch levels", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Levels</h1>

          {isAdmin && (
            <Link
              to={`/admin/modules/${moduleId}/levels`}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Add Level
            </Link>
          )}
        </div>

        <div className="grid gap-4">
          {levels.map((level) => (
            <div
              key={level._id}
              className="p-4 border rounded-lg bg-card"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">
                    Level {level.level_number}: {level.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Difficulty: {level.difficulty}
                  </p>
                </div>
                <span className="text-sm">
                  {level.xp_reward} XP
                </span>
              </div>
            </div>
          ))}

          {levels.length === 0 && (
            <p className="text-muted-foreground">
              No levels added yet.
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ModuleDetails;
