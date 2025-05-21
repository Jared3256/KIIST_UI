import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { selectAuth } from "src/redux/auth/selectors";
import useRefreshToken from "src/service/useRefreshToken";
import RequireAuthLayout from "./RequireAuthLayout";
import PageLoader from "src/components/PageLoader";

export default function PersistAccess() {
  const { current } = useSelector(selectAuth);
  const refresh = useRefreshToken();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthenticationStatus = async () => {
    // await refresh();
    if (current.UserInfo === null) {
      setIsLoading(false);
      <Navigate to={"/auth/login"} state={{ from: location }} replace />;
    }
  };

  useEffect(() => {
    checkAuthenticationStatus();
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !current.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  },[]);
  return (
    <>
      {current?.UserInfo ? (
        <RequireAuthLayout />
      ) : isLoading ? (
        <PageLoader />
      ) : (
        <RequireAuthLayout />
      )}
    </>
  );
}
