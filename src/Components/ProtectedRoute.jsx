import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  return cookies.token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
