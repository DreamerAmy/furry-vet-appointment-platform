import React from "react";
import { Link, useLocation, } from "react-router-dom";
import '../layout.css'
function Layout({ children }) {
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-4-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-copy-2-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    }
  ];
  const menuToBeRendered = userMenu;
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1>喵喵</h1>
          </div>

          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (<div
              className={`d-flex menu-item ${
                isActive && "active-menu-item"
              }`}
            >
                <i className ={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
              );
            })}
          </div>
        </div>

        <div className="content">
          <div className="header">
            不知道写啥的标题
          </div>

          <div className="body">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Layout