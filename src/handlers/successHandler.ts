/** @format */

import { notification } from "antd";
import codeMessage from "./codeMessage";
import handlePlay from "./playNotificationSound";
import playNotificationSound from "./playNotificationSound";

const successHandler = (
  response,
  options = { notifyOnSuccess: true, notifyOnFailed: true }
) => {
  const { data } = response;
  const time = 2;
  const maxCount = 1;
  if (data) {
    const message = response.data && data.message;
    const successText = message || codeMessage[response.status];

    if (options.notifyOnSuccess) {
      // Change the notification for only 2 seconds
      notification.config({
        duration: time,
        maxCount: maxCount,
      });
      playNotificationSound("success");
      notification.success({
        message: `Request success`,
        description: successText,
      });
    }
  } else {
    const message = response.data && data.message;
    const errorText = message || codeMessage[response.status];
    const { status } = response;
    if (options.notifyOnFailed) {
      // Change the notification for only 2 seconds
      notification.config({
        duration: time,
        maxCount: maxCount,
      });
      playNotificationSound("error");
      notification.error({
        message: `Request error ${status}`,
        description: errorText,
      });
    }
  }
};

export default successHandler;
