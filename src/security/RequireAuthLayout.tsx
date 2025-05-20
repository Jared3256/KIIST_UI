import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import { selectAuth } from "src/redux/auth/selectors";

export default function RequireAuthLayout() {
  const location = useLocation();

  const { current } = useSelector(selectAuth);

  console.log(current)
  return current.UserInfo ? (
    current.UserInfo?.enabled ? (
      <Outlet />
    ) : (
      <Navigate to={"/auth/unauthorised"} replace />
    )
  ) : (
    <Navigate to={"/auth/login"} state={{ from: location }} replace />
  );
}
