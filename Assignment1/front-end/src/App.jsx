import React from "react";
import Overview from "./components/overview";
import Education from "./components/education";
import Experience from "./components/experience";
import Projects from "./components/projects";
import Skills from "./components/skills";

function App() {
  return (
    <div>
      <Overview />
      <Skills/>
      <Education />
      <Experience />
      <Projects />
    </div>
  );
}

export default App;
