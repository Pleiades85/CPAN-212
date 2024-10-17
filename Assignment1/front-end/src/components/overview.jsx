import React, { useEffect, useState } from "react";

const Overview = () => {
  const [overview, setOverview] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/getOverview")
      .then((response) => response.json())
      .then((data) => setOverview(data))
      .catch((error) => console.error("Error fetching overview:", error));
  }, []);

  return (
    <div className="p-3">
      <div className="text-center mt-4 mb-4">
        <h2>{overview.name}</h2>
      </div>
      <p>{overview.about}</p>
    </div>
  );
};

export default Overview;
