import React, { useState } from "react";
import "./UserIdentityPage.css";

function UserIdentityPage() {
  const [selectedIdentity, setSelectedIdentity] = useState(null);
  const [username, setUsername] = useState("Sunflower Hash");

  const avatars = [
    "identity1",
    "identity2",
    "identity3",
    "identity4",
    "identity5",
    "identity6",
    "identity7",
    "identity8",
    "identity9",
  ];

  const handleAvatarClick = (index) => {
    setSelectedIdentity(index);
  };

  const handleBack = () => {
    alert("Back button clicked!");
  };

  const handleProceed = () => {
    if (selectedIdentity === null) {
      alert("Please select an identity before proceeding.");
    } else {
      alert(`Proceeding with ${avatars[selectedIdentity]} as ${username}!`);
    }
  };

  return (
    <div className="identity-container">
      <div className="identity-header">GLIDER VMS 1.0</div>
      {/* Card Wrapper */}
      <div className="password-card">
        <div className="identity-content">
          <h2>Select Your Identity</h2>
          <div className="identity-grid">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`identity-avatar ${
                  selectedIdentity === index ? "selected" : ""
                }`}
                onClick={() => handleAvatarClick(index)}
              >
                <span>{avatar}</span>
              </div>
            ))}
          </div>
          <div className="identity-username">
            <label htmlFor="username-input">USER Name:</label>
            <input
              id="username-input"
              type="text"
              className="username-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="identity-footer">
        <button className="identity-back" onClick={handleBack}>
          Back
        </button>
        <button className="identity-proceed" onClick={handleProceed}>
          Proceed
        </button>
      </div>
    </div>
  );
}

export default UserIdentityPage;
