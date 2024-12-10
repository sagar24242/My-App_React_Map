import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpVisible, setOtpVisible] = useState(false);
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");

  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOtp(otp);
    setOtpVisible(true);
    setError("");
    alert(`Your OTP is: ${otp}`); // In production, replace with email integration
  };

  const handleVerifyOtp = () => {
    if (otp === String(generatedOtp)) {
      alert("OTP verified successfully!");
      setOtpError("");
      navigate("/profile"); // Navigate to the map after OTP verification
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="gaming-login-container">
      <div className="gaming-map-section"></div>
      <div className="gaming-form-section">
        <div className="gaming-login-card">
          <h3 className="gaming-title">Code-M Portal</h3>
          {error && <div className="gaming-error">{error}</div>}
          <div className="gaming-input-group">
            <input
              type="email"
              className="gaming-input"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpVisible} // Disable email input after OTP is sent
            />
          </div>
          {!otpVisible && (
            <button
              type="button"
              className="gaming-btn"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          )}
          {otpVisible && (
            <>
              <div className="gaming-input-group">
                <input
                  type="text"
                  className="gaming-input"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="gaming-btn"
                onClick={handleVerifyOtp}
              >
                Verify OTP
              </button>
              {otpError && <div className="gaming-error">{otpError}</div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
