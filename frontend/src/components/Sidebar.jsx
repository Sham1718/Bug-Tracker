import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 min-h-screen bg-white border-r shadow-sm p-4 flex flex-col">
      
      {/* Logo / App Name */}
      <div
        className="text-2xl font-semibold text-blue-600 mb-8 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        IssueFlow
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-3 text-sm">
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
      </nav>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300 text-sm"
      >
        ← Back
      </button>
    </div>
  );
};

export default Sidebar;
