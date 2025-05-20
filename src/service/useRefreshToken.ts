import axios from "./axios";

import { jwtDecode } from "jwt-decode";

import { useDispatch } from "react-redux";

import * as actionTypes from "../redux/auth/types";

export default function useRefreshToken() {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      await axios
        .get("/auth/refresh", {
          withCredentials: true,
        })
        .then((response) => {
          const accessToken = response?.data?.accessToken;
          const decodedUser = jwtDecode(response.data?.accessToken);

          dispatch({
            type: actionTypes.REQUEST_SUCCESS,
            payload: { ...decodedUser, token: accessToken },
          });
          return accessToken;
        });
    } catch (err) {
      console.log(err);
    }
  };

  return refresh;
}
