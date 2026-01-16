import React, { useState } from "react";
import api from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {createProject} from '../api/project'


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
    } catch (err) {
      alert("error while creating project")
      console.log(err);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-md shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Create Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Project Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Project Key
            </label>
            <input
              type="text"
              value={projectKeys}
              onChange={(e) => setProjectKeys(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
