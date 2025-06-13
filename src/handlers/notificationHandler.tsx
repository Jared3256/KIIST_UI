import { notification } from "antd";
import React from "react";

type NotificationType = "success" | "info" | "warning" | "error";

export default function notificationHandler({
  message,
  description,
}: {
  message: string;
  description: string;
}) {

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: message,
      description: description,
      placement: "topRight",
      duration: 5,
    });
  };

  return openNotificationWithIcon;
}
