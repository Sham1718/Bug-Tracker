import React from "react";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64  bg-white border-r shadow-sm p-4 flex flex-col  h-196 my-19">
      
      {/* Logo / App Name */}
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

        {/* Placeholder – wire later */}
        <button
          className="text-left px-3 py-2 rounded text-gray-400 cursor-not-allowed"
        >
          Project Settings
        </button>

        {/* Future Kanban */}
        <button
          className="text-left px-3 py-2 rounded text-gray-400 cursor-not-allowed"
        >
          Kanban (Coming Soon)
        </button>
      </nav>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* User section */}
      <div className="flex items-center gap-3 border-t pt-4 mt-4">
        {/* Dummy Avatar */}
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          U
        </div>

        <div className="text-sm">
          <div className="font-medium">User</div>
          <div className="text-gray-400 text-xs">Logged in</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
