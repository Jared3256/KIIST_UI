import { Box } from "@mui/joy";
import React from "react";
import { Outlet } from "react-router";
import GlobalHeader from "src/modules/GlobalHeader";
import Sidebar from "src/modules/GlobalSideBar";

export default function SystemLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <GlobalHeader />
      <Sidebar />
      <Outlet />
    </Box>
  );
}
