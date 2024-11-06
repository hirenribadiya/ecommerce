import { Link } from "react-router-dom";


import "../componentcss/signup.css"
export const SignUp =  ()=>{
     
  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;
  
    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });
  
      if (!res.ok) {
        throw new Error('Failed to sign up');
      }
  
      console.log("Sign up successful");
    } catch (error) {
      console.error("Error:", error);
    }
  
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
    e.target[3].value = "";
  };
  
    
    
    return (

        <div className="signup-container">
          <div className="signup-box">
            <h2>Sign Up</h2>
            <form onSubmit = {onSubmit}>
              <div className="input-group">
                <input type="text" placeholder="Username" required />
              </div>
              <div className="input-group">
                <input type="email" placeholder="Email" required />
              </div>
              <div className="input-group">
                <input type="password" placeholder="Password" required />
              </div>
              <div className="input-group">
                <input type="password" placeholder="Confirm Password" required />
              </div>
              <button className="signup-btn" type="submit">
                Sign Up
              </button>
              <div className="login-link">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      );
    };