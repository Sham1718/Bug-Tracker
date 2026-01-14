import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm  navbar">
      <div className="max-w-full px-8 py-4 flex items-center">

        {/* Left section */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            IssueFlow
          </div>

          {/* Nav links */}
          <button
            onClick={() => navigate("/dashboard")}
            className="text-base text-gray-700 hover:text-blue-600"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/projects")}
            className="text-base text-gray-700 hover:text-blue-600"
          >
            Projects
          </button>

          <button
            onClick={() => navigate("/projects/create")}
            className="text-base bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Project
          </button>
        </div>

        {/* Center search */}
        <div className="flex-1 flex justify-center">
          <input
                type="text"
                placeholder="Search projects..."
                className=" w-[32rem] border rounded-lg px-5 py-3 text-base focus:outline-none focus:ring h-[2.5rem]"
        />

        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          {/* Dark / Light mode button (placeholder) */}
          <button className="text-sm border px-2 py-1 rounded">
            🌙
          </button>

          {/* Dummy Avatar */}
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
            U
          </div>

          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
