import { useState } from "react";
import NavbarVertical from "../components/Layout/NavbarVertical";
import DashboardHeader from "../components/Layout/DashboardHeader";
import UsersTable from "../components/Dashboard/UsersTable";
import BecomeMenderTable from "../components/Dashboard/BecomeMenderTable";
import BecomeMenderTableNew from "./BecomeMenderNew";

function BecomeMender(props) {
  const [controlNavbar, setControlNavbar] = useState(false);
  return (
    <>
      <div className={controlNavbar ? "dashboard active" : "dashboard"}>
        <NavbarVertical controlNavbar={controlNavbar} />

        <div className="dash-page-content">
          <DashboardHeader
            controlNavbar={controlNavbar}
            setControlNavbar={setControlNavbar}
            setisLoggedIn={props.setisLoggedIn}
          />

          <div className="py-12 px-6">
            <BecomeMenderTableNew/>
          </div>
        </div>
      </div>
    </>
  );
}

export default BecomeMender;
