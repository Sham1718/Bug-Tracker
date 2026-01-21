import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const avatarLetter =
    user?.sub?.[0]?.toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    "U";

  return (
    <nav className="fixed w-full h-19 bg-white border-b shadow-sm z-50">
      <div className="px-8 h-full flex items-center justify-between">

        {/* Logo */}
        <div
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate(token ? "/dashboard" : "/")}
        >
          IssueFlow
        </div>

        {/* Guest */}
        {!isAuthenticated && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="text-gray-700 hover:text-blue-600"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        )}

        {/* Authenticated */}
        {isAuthenticated && (
          <>
            {/* Center Nav */}
            <div className="flex items-center gap-8">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-gray-700 hover:text-blue-600"
              >
                Home
              </button>

              <button
                onClick={() => navigate("/projects")}
                className="text-gray-700 hover:text-blue-600"
              >
                Projects
              </button>

              <button
                onClick={() => navigate("/createProject")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Create Project
              </button>
            </div>

            {/* Search */}
            <div className="flex-1 flex justify-center">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-[32rem] border rounded-lg px-4 py-2 focus:outline-none focus:ring"
              />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="border px-2 py-1 rounded">🌙</button>

              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                {avatarLetter}
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
