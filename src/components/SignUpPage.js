import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";

function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otpError, setOtpError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setLatitude(23.0115008);
          setLongitude(72.5112673);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLatitude(23.0115008);
      setLongitude(72.5112673);
    }
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();

    if (
      !fullName ||
      !username ||
      !email ||
      !phone ||
      !dob ||
      !password ||
      !confirmPassword ||
      !latitude ||
      !longitude
    ) {
      setError("All fields are required, including location.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Use static OTP
    setShowOtpPopup(true);
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;

    const otpCopy = [...otp];
    otpCopy[index] = value;
    setOtp(otpCopy);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp === "1234") { // Static OTP
      alert("OTP Verified Successfully!");
      setShowOtpPopup(false);
      navigate("/password"); // Redirect to PasswordPage
    } else {
      setOtpError("Incorrect OTP. Please try again.");
    }
  };

  const handleCloseOtpPopup = () => {
    setShowOtpPopup(false);
  };

  return (
    <div className="gaming-signup-container">
      <div className="gaming-signup-card">
        <h3 className="gaming-title">Sign Up</h3>
        {error && <div className="gaming-error">{error}</div>}
        <form onSubmit={handleSignUp}>
          <div className="gaming-input-group">
            <input
              type="text"
              className="gaming-input"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="gaming-input-group">
            <input
              type="text"
              className="gaming-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="gaming-input-group">
            <input
              type="email"
              className="gaming-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="gaming-input-group">
            <input
              type="text"
              className="gaming-input"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="gaming-input-group">
            <input
              type="date"
              className="gaming-input"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="gaming-input-group">
            <input
              type="password"
              className="gaming-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="gaming-input-group">
            <input
              type="password"
              className="gaming-input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="gaming-btn">
            Sign Up
          </button>
        </form>
      </div>

      {/* OTP Popup */}
      {showOtpPopup && (
        <div className="otp-popup">
          <div className="otp-popup-content">
            <button onClick={handleCloseOtpPopup} className="close-btn">
              &times;
            </button>
            <h4>Enter OTP</h4>
            <form onSubmit={handleOtpSubmit}>
              <div className="otp-input-container">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    className="otp-input"
                  />
                ))}
              </div>
              {otpError && <div className="otp-error">{otpError}</div>}
              <button type="submit" className="gaming-btn">
                Verify OTP
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUpPage;
