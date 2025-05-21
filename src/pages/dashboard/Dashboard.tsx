import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { selectAuth } from "src/redux/auth/selectors";

export default function Dashboard() {
  const { current } = useSelector(selectAuth);
  const navigate = useNavigate();

  useEffect(() => {
    const role = current.UserInfo.role;

    navigate(`/v1/dashboard/${role}`);
  }, []);
  return <Outlet />;
}
