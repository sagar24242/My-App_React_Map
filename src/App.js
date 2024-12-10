import "./App.css";
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import LoginPage from "./components/Loginpage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import PasswordPage from "./components/PasswordPage";
import UserIdentityPage from "./components/UserIdentityPage";
import ProfilePage from "./components/profilePage/ProfilePage";


function App() {
  return (
    <Router>
      <Navbar title="Code-M" about="About Us" />
      <Routes>
        {/* Route for Login Page */}
        <Route path="/" element={<LoginPage />} />
        {/* Route for Map Page */}
        <Route path="/map" element={<Map />} />
        {/* Redirect to login if route doesn't match */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/password" element={<PasswordPage />} /> {/* Add this route */}
        <Route path="/identity" element={<UserIdentityPage />} />
        <Route path="/profile" element={<ProfilePage />} />




      </Routes>
    </Router>
  );
}

export default App;
