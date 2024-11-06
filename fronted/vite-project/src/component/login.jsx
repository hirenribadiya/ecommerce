import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { Link } from "react-router-dom";
import "../componentcss/login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store token or handle successful login
        console.log("Login successful:", data);
        // Store JWT token in localStorage:
        localStorage.setItem("token", data.token);
        // Redirect to homepage
        navigate("/home");  // Use navigate to redirect
      } else {
        // Handle errors (e.g., incorrect credentials)
        console.log("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
          <div className="forgot-password">
            <a href="/">Forgot Password?</a>
          </div>
          <div className="signup-link">
            Don't have an account? <Link to="/signup"> Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
