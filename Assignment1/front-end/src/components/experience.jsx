import React, { useEffect, useState } from 'react';

const Experience = () => {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/getExp')
      .then((response) => response.json())
      .then((data) => setExperience(data))
      .catch((error) => console.error('Error fetching experience:', error));
  }, []);

  return (
    <div className="p-3">
      <h3>Experience</h3>
      <ul>
        {experience.map((exp, index) => (
          <li key={index}>
            {exp.role} at {exp.company} ({exp.years})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Experience;
