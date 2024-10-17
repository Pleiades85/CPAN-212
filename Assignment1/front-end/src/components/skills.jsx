import React, { useEffect, useState } from 'react';

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/getSkills')
      .then((response) => response.json())
      .then((data) => setSkills(data))
      .catch((error) => console.error('Error fetching skills:', error));
  }, []);

  return (
    <div className="p-3">
      <h3>Summary of Skills</h3>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>
            <strong>{skill.category}:</strong> {skill.skills}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
