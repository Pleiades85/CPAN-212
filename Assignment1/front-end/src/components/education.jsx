import React, { useEffect, useState } from 'react';

const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/getEdu')
      .then((response) => response.json())
      .then((data) => setEducation(data))
      .catch((error) => console.error('Error fetching education:', error));
  }, []);

  return (
    <div className="p-3">
      <h3>Education</h3>
      <ul>
        {education.map((edu, index) => (
          <li key={index}>
            {edu.Degree} in {edu.Field}, {edu.College} {edu.Duration}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Education;
