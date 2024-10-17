import React, { useEffect, useState } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/getProjects')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  return (
    <div className="p-3">
      <h3>Projects</h3>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <strong>{project.name}:</strong> {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
