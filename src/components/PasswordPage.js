import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PasswordPage.css";

function PasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState(""); // Error for password mismatch
  const navigate = useNavigate();

  // Handle password validation
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    } else {
      setPasswordError(""); // Clear the error if passwords match
    }

    // Simulate successful form submission (redirect to another page, etc.)
    alert("Password updated successfully!");
    navigate("/login"); // Redirect to login or another page
  };

  return (
    <div className="password-container">
    <div className="password-card">
      <h3 className="password-title">Confirm Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="password-input-group">
          <input
            type="password"
            className="password-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="password-input-group">
          <input
            type="password"
            className="password-input"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="password-btn">
          Confirm Password
        </button>
      </form>
    </div>
  </div>
  
  );
}

export default PasswordPage;
