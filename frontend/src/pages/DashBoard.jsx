import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const DashBoard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const username = user?.sub || "there";

  return (
    <div className="flex bg-zinc-900 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 pt-24 px-10">
        <div className="max-w-5xl">

          {/* Welcome */}
          <h1 className="text-4xl font-semibold text-zinc-100 mb-2">
            Welcome back, <span className="text-blue-500">{username}</span>
          </h1>

          <p className="text-zinc-400 mb-10">
            Here’s what you can do today.
          </p>

          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              onClick={() => navigate("/createProject")}
              className="cursor-pointer bg-zinc-800 border border-zinc-700 rounded-xl p-6 hover:bg-zinc-700 transition"
            >
              <h3 className="text-lg font-medium text-zinc-100 mb-1">
                Create a new project
              </h3>
              <p className="text-sm text-zinc-400">
                Start tracking issues and manage your workflow.
              </p>
            </div>

            <div
              onClick={() => navigate("/projects")}
              className="cursor-pointer bg-zinc-800 border border-zinc-700 rounded-xl p-6 hover:bg-zinc-700 transition"
            >
              <h3 className="text-lg font-medium text-zinc-100 mb-1">
                View your projects
              </h3>
              <p className="text-sm text-zinc-400">
                Open existing projects and continue work.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default DashBoard;
