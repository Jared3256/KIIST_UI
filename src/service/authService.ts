import errorHandler from "src/handlers/errorHandler";
import successHandler from "src/handlers/successHandler";
import axios from "./axios";

export const login = async ({ loginData }) => {
  let server_data = null;
  await axios
    .post("/auth/login", loginData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((response) => {
      const { status, data } = response;
      // Call the success handler method
      successHandler(
        { data, status },
        {
          notifyOnSuccess: true,
          notifyOnFailed: true,
        }
      );

      server_data = data;
      if (data.accessToken === undefined) {
        return undefined;
      }
      return data;
    })
    .catch((error) => {
      return errorHandler(error);
    })
    .finally(() => {
      return server_data;
    });

  return server_data;
};


export const logout = async () => {
  let server_response = {};
  await axios
    .post(
       "/auth/logout",
      { data: null },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      const { status, data } = response;
      server_response = data;
      successHandler(
        { data, status },
        {
          notifyOnSuccess: true,
          notifyOnFailed: true,
        }
      );
    })
    .catch((error) => {
      errorHandler(error);
    });

  return { ...server_response, success: true };
};
