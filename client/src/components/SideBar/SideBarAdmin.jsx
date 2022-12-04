import "./SideBarAdmin.scss";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AbcIcon from '@mui/icons-material/Abc';
import CreditCardIcon from "@mui/icons-material/CreditCard";
import BookIcon from '@mui/icons-material/Book';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link,useSearchParams } from "react-router-dom";


const SideBarAdmin = () => {
  // const { dispatch } = useContext(DarkModeContext);
  const params = new URLSearchParams(window.location.pathname);
 

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">T2 Learn</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/admin/courses" style={{ textDecoration: "none" }}>
            <li>
              <BookIcon className="icon" />
              <span>Courses</span>
            </li>
          </Link>
          <Link to="/admin/lessons" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Lessons</span>
            </li>
          </Link>
          <Link to="/admin/words" style={{ textDecoration: "none" }}>
            <li>
              <AbcIcon className="icon" />
              <span>Words</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/profile" style={{textDecoration:"none"}}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBarAdmin;
