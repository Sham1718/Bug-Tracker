import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashBoard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar - LEFT */}
      <Sidebar />

      {/* Main Content - RIGHT */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded-md shadow w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/createProject")}
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Create Project
            </button>

            <button
              onClick={() => navigate("/projects")}
              className="border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50"
            >
              My Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
