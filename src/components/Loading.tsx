import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

export default function Loading({ isLoading, children }:{
  isLoading?: boolean;
  children?: React.ReactNode;
}) {
  const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

  return (
    <Spin indicator={antIcon} spinning={isLoading} className={"w-1 h-1 "}>
      {children}
    </Spin>
  );
}
