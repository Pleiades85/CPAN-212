import React, { useState, useEffect } from "react";

function PostDetailsPage({ postId, userName }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/posts/${postId}`
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/comments/${postId}`
        );
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchPostDetails();
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newComment,
          author: userName || "Anonymous",
          postId,
        }),
      });
      const data = await response.json();
      setComments((prevComments) => [...prevComments, data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!post) return <div>Loading post...</div>;

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        {post.title}
      </h1>
      <p
        style={{
          fontSize: "1rem",
          lineHeight: "1.6",
          color: "#555",
          marginBottom: "20px",
        }}
      >
        {post.content}
      </p>

      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "15px",
        }}
      >
        Comments
      </h2>
      <ul style={{ paddingLeft: "20px" }}>
        {comments.map((comment) => (
          <li
            key={comment._id}
            style={{
              padding: "10px 0",
              borderBottom: "1px solid #f0f0f0",
              fontSize: "1rem",
              color: "#555",
            }}
          >
            <strong
              style={{
                color: "#007bff",
                fontWeight: "bold",
              }}
            >
              {comment.author}
            </strong>
            : {comment.content}
          </li>
        ))}
      </ul>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            marginBottom: "15px",
            fontSize: "1rem",
            lineHeight: "1.5",
            resize: "vertical",
            minHeight: "100px",
          }}
        ></textarea>
        <button
          onClick={handleAddComment}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "background-color 0.3s ease",
          }}
        >
          Submit Comment
        </button>
      </div>
    </div>
  );
}

export default PostDetailsPage;
