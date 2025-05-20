import * as actionTypes from "./types";
import { jwtDecode } from "jwt-decode";
import * as authService from "../../service/authService";

interface LoginData {
  email: string;
  password: string;
}

export const login = ({ loginData }: LoginData) =>
  async (dispatch: any) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
    });

    const data = await authService.login({ loginData });

    if (data) {
      const decodedUser = jwtDecode(data?.accessToken);
      const active_role = decodedUser.UserInfo.active_role;

      window.localStorage.setItem("isLogin", true);
      window.localStorage.removeItem("isLogout");
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        payload: { ...decodedUser, active_role, token: data },
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
      });
    }
  };
