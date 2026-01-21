import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { createProject } from "../api/project";

const CreateProject = () => {
  const [name, setName] = useState("");
  const [projectKeys, setProjectKeys] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject({
        name,
        projectKeys,
        description,
      });
      navigate("/projects");
    } catch {
      alert("Error while creating project");
    }
  };

  return (
    <div className="flex bg-zinc-900 min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 pt-20 px-12">
        <div className="max-w-3xl">
          {/* Header */}
          <h1 className="text-3xl font-semibold text-zinc-100 mb-1">
            Create Project
          </h1>
          <p className="text-zinc-400 mb-6">
            Create a new workspace to organize issues and collaborate.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-zinc-800 border border-zinc-700 rounded-xl p-8 space-y-6"
          >
            <div>
              <label className="block text-sm text-zinc-300 mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-300 mb-1">
                Project Key
              </label>
              <input
                type="text"
                value={projectKeys}
                onChange={(e) => setProjectKeys(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-300 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-md text-sm font-medium transition"
              >
                Create Project
              </button>

              <button
                type="button"
                onClick={() => navigate("/projects")}
                className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 px-6 py-2.5 rounded-md text-sm transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateProject;
