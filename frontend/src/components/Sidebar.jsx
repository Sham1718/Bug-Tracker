import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  const avatarLetter =
    user?.sub?.[0]?.toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    "U";

  return (
    <aside className="fixed top-18 left-0 w-64 h-[calc(100vh-72px)] bg-zinc-900 border-r border-zinc-700 flex flex-col px-4 py-6">
      
      {/* Navigation */}
      <nav className="flex flex-col gap-1 text-sm">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-left px-3 py-2 rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/projects")}
          className="text-left px-3 py-2 rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition"
        >
          Projects
        </button>

        <button
          onClick={() => navigate("/createProject")}
          className="text-left px-3 py-2 rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition"
        >
          Create Project
        </button>

        {/* Future */}
        <button
          disabled
          className="text-left px-3 py-2 rounded-md text-zinc-500 cursor-not-allowed"
        >
          Kanban (Coming Soon)
        </button>
      </nav>

     
      <div className="flex-grow" />

      {/* User */}
      <div className="flex items-center gap-3 border-t border-zinc-700 pt-4">
        <div className="w-9 h-9 rounded-full bg-zinc-700 text-zinc-100 flex items-center justify-center text-sm font-medium">
          {avatarLetter}
        </div>

        <div className="text-sm leading-tight">
          <div className="text-zinc-100 font-medium">
            {user?.sub || "User"}
          </div>
          <div className="text-zinc-400 text-xs">
            Logged in
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
