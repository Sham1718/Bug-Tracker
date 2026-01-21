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
    <nav className="fixed top-0 z-50 w-full h-18 bg-zinc-900 border-b border-zinc-700">
      <div className="h-full px-8 flex items-center justify-between">

      
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div
            onClick={() => navigate(token ? "/dashboard" : "/")}
            className="text-xl font-semibold text-zinc-100 cursor-pointer tracking-wide"
          >
            IssueFlow
          </div>

          {/* Auth Nav */}
          {isAuthenticated && (
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-base text-zinc-300 hover:text-zinc-100 transition"
              >
                Home
              </button>

              <button
                onClick={() => navigate("/projects")}
                className="text-base text-zinc-300 hover:text-zinc-100 transition"
              >
                Projects
              </button>

              <button
                onClick={() => navigate("/createProject")}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm transition"
              >
                Create Project
              </button>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/")}
                className="text-zinc-400 hover:text-zinc-100 transition text-sm"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm transition"
              >
                Register
              </button>
            </>
          ) : (
            <>
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-zinc-700 text-zinc-100 flex items-center justify-center text-sm font-medium">
                {avatarLetter}
              </div>

              <button
                onClick={handleLogout}
                className="text-sm text-zinc-400 hover:text-red-400 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
