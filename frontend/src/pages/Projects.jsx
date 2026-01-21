import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getAllProject } from "../api/project";

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getAllProject().then((res) => setProjects(res.data));
  }, []);

  return (
    <div className="flex bg-zinc-900 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 pt-24 px-10">
        <div className="max-w-5xl">

          {/* Header */}
          <h1 className="text-3xl font-semibold text-zinc-100 mb-1">
            Projects
          </h1>
          <p className="text-zinc-400 mb-8">
            All projects you are part of.
          </p>

          {/* List */}
          {projects.length === 0 ? (
            <div className="text-zinc-500 mt-12">
              No projects found.
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/projects/${p.id}`)}
                  className="cursor-pointer bg-zinc-800 border border-zinc-700 rounded-lg px-5 py-4 hover:bg-zinc-700 transition flex justify-between items-center"
                >
                  <div>
                    <div className="text-zinc-100 font-medium">
                      {p.name}
                    </div>
                    <div className="text-sm text-zinc-400">
                      Key: {p.projectKeys}
                    </div>
                  </div>

                  <div className="text-zinc-500 text-sm">
                    →
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Projects;
