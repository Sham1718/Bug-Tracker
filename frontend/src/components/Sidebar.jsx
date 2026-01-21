import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticate } = useAuth();

  // if (!isAuthenticate) return null;

  return (
    <div className="w-64 bg-white border-r shadow-sm p-4 flex flex-col min-h-screen py-20">
      
      {/* Logo */}
      <div
        className="text-2xl font-semibold text-blue-600 mb-10 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        IssueFlow
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2 text-sm">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-left px-3 py-2 rounded hover:bg-gray-100"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/projects")}
          className="text-left px-3 py-2 rounded hover:bg-gray-100"
        >
          Projects
        </button>

        <button
          onClick={() => navigate("/createProject")}
          className="text-left px-3 py-2 rounded hover:bg-gray-100"
        >
          Create Project
        </button>

        {/* Kanban – future */}
        <button
          disabled
          className="text-left px-3 py-2 rounded text-gray-400 cursor-not-allowed"
        >
          Kanban (Coming Soon)
        </button>
      </nav>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* User section */}
      <div className="flex items-center gap-3 border-t pt-4 mt-4">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          {user?.username?.[0]?.toUpperCase() || "U"}
        </div>

        <div className="text-sm">
          <div className="font-medium">{user?.sub || "User"}</div>
          <div className="text-gray-400 text-xs">Logged in</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
