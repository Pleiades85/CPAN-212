import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import PostDetailsPage from "./pages/PostDetailsPage";
import "./styles.css"; 

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentPostId, setCurrentPostId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [registrationDetails, setRegistrationDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = loginDetails;

    if (username.trim() && password.trim()) {
      setIsAuthenticated(true);
      setUserName(username);
      setCurrentPage("home");
      alert(`Welcome, ${username}!`);
    } else {
      alert("Please provide valid username and password.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
    setCurrentPage("home");
  };

  const handleAddPost = async (e) => {
    e.preventDefault();

    if (!newPostTitle.trim() || !newPostContent.trim()) {
      alert("Title and content are required.");
      return;
    }

    const newPost = {
      title: newPostTitle,
      content: newPostContent,
      userName: userName || "Anonymous",
    };

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const savedPost = await response.json();
        setPosts([...posts, savedPost]);
        setNewPostTitle("");
        setNewPostContent("");
        alert("Post added successfully!");
      } else {
        const error = await response.json();
        alert("Failed to add post")
      }
    } catch (err) {
      console.error("Error adding post:", err);
      alert("An error occurred. Please try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = registrationDetails;
  
    if (!username.trim() || !email.trim() || !password.trim()) {
      alert("All fields are required.");
      return;
    }
  
    const newUser = { username, email, password };
  
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setCurrentPage("login");
      } else {
        const error = await response.json();
        alert(error.message); 
      }
    } catch (err) {
      console.error("Error during registration:", err);
      alert("An unexpected error occurred. Please try again later.");
    }
  };
  
  

  return (
    <div className="App">
      {/* Header */}
      <header>
        <h1>Reddit</h1>
        <nav>
          <a href="#" onClick={() => setCurrentPage("home")}>
            Home
          </a>
          {!isAuthenticated ? (
            <>
              <a href="#" onClick={() => setCurrentPage("login")}>
                Login
              </a>
              <a href="#" onClick={() => setCurrentPage("register")}>
                Sign Up
              </a>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </nav>
      </header>

      {currentPage === "home" && (
        <HomePage
          posts={posts}
          onNavigate={(id) => {
            setCurrentPostId(id);
            setCurrentPage("postDetails");
          }}
        />
      )}

      {currentPage === "postDetails" && currentPostId && (
        <PostDetailsPage
          postId={currentPostId}
          userName={userName || "Anonymous"}
          onBack={() => setCurrentPage("home")}
        />
      )}

      {currentPage === "login" && (
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={loginDetails.username}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, username: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginDetails.password}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, password: e.target.value })
              }
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {currentPage === "register" && (
        <div className="form-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              value={registrationDetails.username}
              onChange={(e) =>
                setRegistrationDetails({
                  ...registrationDetails,
                  username: e.target.value,
                })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={registrationDetails.email}
              onChange={(e) =>
                setRegistrationDetails({
                  ...registrationDetails,
                  email: e.target.value,
                })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={registrationDetails.password}
              onChange={(e) =>
                setRegistrationDetails({
                  ...registrationDetails,
                  password: e.target.value,
                })
              }
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      )}
      {isAuthenticated && (
        <div>
          <h3>Add a New Post</h3>
          <form onSubmit={handleAddPost}>
            <input
              type="text"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="Post Title"
              required
            />
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Post Content"
              required
            ></textarea>
            <button type="submit">Add Post</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
