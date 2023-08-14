import { useState } from "react";
import NavbarVertical from "../components/Layout/NavbarVertical";
import DashboardHeader from "../components/Layout/DashboardHeader";
import UsersTable from "../components/Dashboard/UsersTable";

function Dashboard(props) {
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
            <UsersTable/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
