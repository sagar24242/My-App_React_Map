import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for redirection
import "../profilePage/ProfilePage.css"; // Custom styles

function UserDetailsPage() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    userName: "",
    country: "",
    timezone: "",
    dob: "",
    gender: "",
  });

  const [successMessage] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Track if popup should be shown

  const navigate = useNavigate(); // Hook for navigation

  // Field validation logic
  const validateFields = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    const phoneRegex = /^\d{10}$/; // Matches exactly 10 digits

    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {  
      errors.email = "Please enter a valid email.";
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits.";
    }

    if (!formData.userName) {
      errors.userName = "Username is required.";
    }

    if (!formData.country) {
      errors.country = "Please select a country.";
    }

    if (!formData.timezone) {
      errors.timezone = "Please select a timezone.";
    }

    if (!formData.dob) {
      errors.dob = "Date of Birth is required.";
    }

    if (!formData.gender) {
      errors.gender = "Please select your gender.";
    }

    return errors;
  };

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Handle form submission
  const handleSave = () => {
    const errors = validateFields();

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      // setSuccessMessage("");
      return;
    }

    // Save to localStorage (simulate)
    localStorage.setItem("userDetails", JSON.stringify(formData));
    // setSuccessMessage("User details saved successfully!");
    setError("");
    setFieldErrors({});
    setIsPopupVisible(true); // Show the success popup
  };

  // Handle popup close and redirection to /map page
  const handlePopupClose = () => {
    setIsPopupVisible(false); // Close the success popup
    navigate("/map"); // Redirect to /map page
  };

  return (
    <div className="scorllforContainer">
      <div className="user-details-container mt-5">
        {error && <div className="user-details-error">{error}</div>}
        {successMessage && <div className="user-details-success">{successMessage}</div>}
        <form className="user-details-form ">
          <h2 className="user-details-title">User Details</h2>

          {[ 
            { label: "Email:", type: "email", name: "email", placeholder: "Enter your email" },
            { label: "Phone:", type: "text", name: "phone", placeholder: "Enter your phone number" }
          ].map((field) => (
            <div className="user-details-group" key={field.name}>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                required
                style={{
                  border: fieldErrors[field.name] ? "2px solid red" : "1px solid #ccc",
                }}
              />
              {fieldErrors[field.name] && <div className="field-error">{fieldErrors[field.name]}</div>}
            </div>
          ))}

          <div className="user-details-group">
            <label>Username:</label>
            <select
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Username</option>
              {["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"].map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
            {fieldErrors.userName && <div className="field-error">{fieldErrors.userName}</div>}
          </div>

          <div className="user-details-group">
            <label>Country:</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Country</option>
              {["United States", "India", "Canada", "United Kingdom", "Australia"].map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {fieldErrors.country && <div className="field-error">{fieldErrors.country}</div>}
          </div>

          <div className="user-details-group">
            <label>Timezone:</label>
            <select
              name="timezone"
              value={formData.timezone}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Timezone</option>
              {[{ value: "GMT-5", label: "GMT-5 (Eastern Time)" }, { value: "GMT+1", label: "GMT+1 (Central European Time)" }, { value: "GMT+5.5", label: "GMT+5.5 (India Standard Time)" }, { value: "GMT+10", label: "GMT+10 (Australia Eastern Time)" }]
                .map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
            </select>
            {fieldErrors.timezone && <div className="field-error">{fieldErrors.timezone}</div>}
          </div>

          <div className="user-details-group">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
            {fieldErrors.dob && <div className="field-error">{fieldErrors.dob}</div>}
          </div>

          <div className="user-details-group">
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              {["Male", "Female", "Other"].map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            {fieldErrors.gender && <div className="field-error">{fieldErrors.gender}</div>}
          </div>

          <button type="button" className="user-details-save-btn" onClick={handleSave}>
            Save
          </button>
        </form>

        {/* Success Popup */}
        {isPopupVisible && (
          <div className="success-popup">
            <div className="popup-content">
              <h3>Profile Update Success</h3>
              <p>Your profile has been updated successfully!</p>
              <button onClick={handlePopupClose}>Go to Map</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetailsPage;
