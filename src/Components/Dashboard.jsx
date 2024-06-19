import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useCookies } from "react-cookie";

const Dashboard = () => {
  const [user, setUser] = useState({});

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: response } = await axios.get(
          `${import.meta.env.VITE_APP_API_PATH}/getuser`,
          { headers: { Authorization: "Bearer " + cookies.token } }
        );
        setUser(response.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    removeCookie(["token"]);
    navigate("/");
  };
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                TASK MANAGER
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              {/* MANAGE DEVLOPER */}
              {user.role === "admin" && (
                <li className="w-100">
                  <Link
                    to="/dashboard/devlopers"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-people ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">
                      Manage Devloper
                    </span>
                  </Link>
                </li>
              )}
              {/* MANAGE Task */}
              <li className="w-100">
                <Link
                  to="/dashboard/tasks"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-journals ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Manage Task</span>
                </Link>
              </li>

              {/* // Status Bar */}
              <li className="w-100">
                <Link
                  to="/dashboard/status_bar"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-bar-chart-line ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Status Bar</span>
                </Link>
              </li>

              {/* //PROFILE  */}
              <li className="w-100">
                <Link
                  to="/dashboard/category"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>

              {/* // lOGOUT */}
              <li className="w-100" onClick={handleLogout}>
                <Link to="/" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h1 className="text-primary">TASK Management System</h1>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
