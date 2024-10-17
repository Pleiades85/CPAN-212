const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(cors());


const education = [
  { College: 'Humber College', Degree: 'Advanced-Diploma', Field: 'Computer Programming and Analysis', Durationn: '3 years' },
];
const skills = [
  { category: 'Programming Languages', skills: 'Java, Python, JavaScript, R' },
  { category: 'Operating Systems', skills: 'Linux' },
  { category: 'Web Development', skills: 'JavaScript, React, Bootstrap'},
  { category: 'Database Management', skills: 'SQL, PL/SQL, MongoDB' },
  { category: 'Data Visualization', skills: 'PowerBI, Tableau' },
  { category: 'Machine Learning', skills: 'Machine learning algorithms, model training, and evaluation using scikit-learn, TensorFlow, Pandas, Matplotlib' },
  { category: 'Agile Methodology', skills: 'Experience working in Agile environments, collaborating with cross-functional teams in sprints and using frameworks like Scrum for efficient project management and iterative development' },
  { category: 'Soft Skills', skills: 'Strong analytical and problem-solving abilities, excellent communication, teamwork, adaptability, and quick learning in fast-paced environments' },
];



const experience = [
  { company: 'Fortinos Supermarket', role: 'Pizza & Bread Clerk', years: '2023-2024' },
];

const overview = {
  name: 'Dhyey Patel',
  about: 'Aspiring data scientist with experience in web development and IT support, currently pursuing a diploma in Computer Programming and Analysis at Humber College.',
};
const projects = [
    {
      name: 'Machine Learning Models',
      description:
        'Developed and fine-tuned machine learning models for tasks including classification and regression. Achieved an average accuracy improvement of 15% through targeted feature engineering strategies during project iterations along with achieving model accuracy exceeding 90% while optimizing performance through precise evaluation metrics including precision and recall.',
    },
    {
      name: 'Data Dashboards',
      description:
        'Designed interactive dashboards to visualize key business metrics, trends, and insights. Used Tableau and PowerBI to create reports that facilitated data-driven decision-making in hypothetical business scenarios.',
    },
  ];
  
  app.get('/getProjects', (req, res) => {
    res.json(projects);
  });
  

app.get('/getEdu', (req, res) => {
  res.json(education);
});
app.get('/getSkills', (req, res) => {
  res.json(skills);
});

app.get('/getExp', (req, res) => {
  res.json(experience);
});

app.get('/getOverview', (req, res) => {
  res.json(overview);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
