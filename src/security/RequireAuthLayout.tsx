import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import SystemLayout from "src/pages/layout/SystemLayout";
import { selectAuth } from "src/redux/auth/selectors";

export default function RequireAuthLayout() {
  const location = useLocation();

  const { current } = useSelector(selectAuth);


  return current.UserInfo ? (
    current.UserInfo?.enabled ? (
      <SystemLayout />
    ) : (
      <Navigate to={"/auth/unauthorized"} replace />
    )
  ) : (
    <Navigate to={"/auth/login"} state={{ from: location }} replace />
  );
}
