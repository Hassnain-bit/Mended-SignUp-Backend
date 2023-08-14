import React from "react";
import menuIcon from "../../images/menu-icon.svg";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

function DashboardHeader(props) {
  // Get the navigate object
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        // Clear local storage and update state
        localStorage.setItem("isLoggedIn", false);
        props.setisLoggedIn(false); // Assuming you pass setisLoggedIn as a prop
        navigate("/"); // Navigate to the "/" page after logout
      })
      .catch((error) => {
        console.error("Error during sign-out:", error);
        // Handle the error (e.g., display a message to the user)
      });
  };

  return (
    <>
      <div className="dash-header">
        <div className="flex justify-between items-center w-full">
          <div
            className="header-menu"
            onClick={() => props.setControlNavbar(!props.controlNavbar)}
          >
            <img src={menuIcon} alt="menu" />
          </div>
          <div className="header-logout" onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardHeader;
