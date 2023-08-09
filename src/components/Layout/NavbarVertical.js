import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import menuItems from "./routes/menuItems.json";
import logo from '../../images/logo.svg'

const NavbarVertical = () => {
  const [state, setState] = useState({});
  const [activeItem, setActiveItem] = useState("/dashboard"); // Set the initial active item to "/dashboard"

  const handleClick = (item, url) => {
    setState((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const renderMenuItem = (children) => {
    if (!children) {
      return null;
    }

    return children.map((subOption) => {
      if (!subOption.children) {
        const isActive = activeItem === subOption.url; // Check against the "url" property

        return (
          <div className="nav-item" key={subOption.name}>
            <Link
              className={`nav-link ${isActive ? "active" : ""}`}
              to={subOption.url}
              onClick={() => setActiveItem(subOption.url)}
            >
              {/* <i className={`${subOption.icon} nav-icon me-2`}></i> */}
              <span className="">{subOption.name}</span>
            </Link>
          </div>
        );
      }

      const isParentActive = subOption.children.some(
        (child) => activeItem === child.url
      );

      return (
        <div className="nav-item" key={subOption.name}>
          <a
            className={`nav-link ${
              isParentActive ? "active" : ""
            }`}
            onClick={() => handleClick(subOption.name)}
            style={{ cursor: "pointer" }}
          >
            {/* <i className={`${subOption.icon} nav-icon me-2`}></i>
            {subOption.name}
            {state[subOption.name] ? (
              <i className="icofont-simple-up nav-arrow"></i>
            ) : (
              <i className="icofont-simple-down nav-arrow"></i>
            )} */}
          </a>
          <div className={`collapse ${state[subOption.name] ? "show" : ""}`}>
            {renderMenuItem(subOption.children)}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="navbar-vertical">
        <Link to="/dashboard" className="nav-brand">
          <img src={logo} alt="logo" />
        </Link>
        <div className="">
          <nav className="nav-list flex-column d-flex">
            {renderMenuItem(menuItems.data)}
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavbarVertical;
