import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      {/* Global Loading */}
      {/* Global Loading */}

      {/* Login modal */}
      {/* Login modal */}

      <Box display={"flex"} minHeight="100vh">
        {/* Header */}
        {/* Header */}

        {/* Main Content */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* Main Content */}
      </Box>

      {/* Footer */}
      {/* Footer */}
    </>
  );
}

export default MainLayout;
