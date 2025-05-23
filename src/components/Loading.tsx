import { LoadingOutlined } from "@ant-design/icons";
import { Box } from "@mui/joy";
import { Spin } from "antd";
import React from "react";

export default function Loading({ isLoading, children }) {
  const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

  return (
    <Spin indicator={antIcon} spinning={isLoading}>
      {children}
    </Spin>
  );
}
