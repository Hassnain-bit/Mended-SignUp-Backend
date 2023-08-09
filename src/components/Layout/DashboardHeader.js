import React from "react";
import menuIcon from '../../images/menu-icon.svg'

function DashboardHeader(props) {
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
          <div className="header-logout">Logout</div>
        </div>
      </div>
    </>
  );
}

export default DashboardHeader;
