import React, { useState, useEffect } from "react";

function HomePage({ onNavigate }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts");
        const data = await response.json();
        console.log("Fetched posts:", data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);


  return (
    <div style={{ padding: "2rem" }}>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "1.5rem",
        }}
      >
        Posts
      </h1>
      {posts.map((post) => (
        <div
          key={post._id}
          style={{
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1.5rem",
            margin: "1.5rem 0",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "0.8rem",
            }}
          >
            {post.title}
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#555",
              marginBottom: "1.2rem",
              lineHeight: "1.6",
            }}
          >
            {post.content.substring(0, 100)}...
          </p>
          <button
            style={{
              backgroundColor: "#ff4500",
              color: "white",
              padding: "10px 15px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => onNavigate(post._id)}
          >
            Read More
          </button>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
