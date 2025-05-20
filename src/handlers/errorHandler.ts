import { notification } from "antd";
import codeMessage from "./codeMessage";
import notificationHandler from "./notificationHandler";
// import playNotificationSound from "./playNotification";

const errorHandler = (error) => {
  if (!navigator.onLine) {
    notification.config({
      duration: 15,
      maxCount: 1,
    });
    // Code to execute when there is internet connection
    // playNotificationSound();
    notification.error({
      message: "No internet connection",
      description:
        "Cannot connect to the Internet, Check your internet network",
    });
    return {
      success: false,
      result: null,
      message: "Cannot connect to the server, Check your internet network",
    };
  }

  const { response } = error;

  console.log("Response ", response);

  if (!response) {
    notification.config({
      duration: 20,
      maxCount: 1,
    });
    // Code to execute when there is no internet connection
    // playNotificationSound();

    notification.error({
      message: "Problem connecting to server",
      description: "Cannot connect to the server, Try again later",
    });
    return {
      success: false,
      result: null,
      message:
        "Cannot connect to the server, Contact your Account administrator",
    };
  }

  if (response && response.data && response.data.jwtExpired) {
    const result = window.localStorage.getItem("auth");
    const jsonFile = window.localStorage.getItem("isLogout");
    const { isLogout } = (jsonFile && JSON.parse(jsonFile)) || false;
    window.localStorage.removeItem("auth");
    window.localStorage.removeItem("isLogout");
    if (result || isLogout) {
      window.location.href = "/logout";
    }
  }

  if (response && response.status) {
    const errorText = response.data.message || codeMessage[response.status];
    console.log("Response ", response, errorText);

    const { status } = response;
    notification.config({
      duration: 20,
      maxCount: 2,
    });
    // playNotificationSound();
    notification.error({
      message: `Request error ${status}`,
      description: errorText,
    });

    return { response: response.data.message, success: false };
  } else {
    notification.config({
      duration: 15,
      maxCount: 1,
    });

    if (navigator.onLine) {
      // Code to execute when there is internet connection
      //   playNotificationSound();
      notification.error({
        message: "Problem connecting to server",
        description: "Cannot connect to the server, Try again later",
      });
      return {
        success: false,
        result: null,
        message:
          "Cannot connect to the server, Contact your Account administrator",
      };
    } else {
      // Code to execute when there is no internet connection
      //   playNotificationSound();
      notification.error({
        message: "No internet connection",
        description:
          "Cannot connect to the Internet, Check your internet network",
      });
      return {
        success: false,
        result: null,
        message: "Cannot connect to the server, Check your internet network",
      };
    }
  }
};

export default errorHandler;
