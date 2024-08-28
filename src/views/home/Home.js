import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import Sidebar from "./Sidebar";

const Home = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          pl: "120px",
          pt: "73px",
        }}
      >
        <Button
          onClick={handleOpenDrawer}
          variant="contained"
          sx={{ backgroundColor: "#E4875D", textTransform: "capitalize" }}
        >
          Add Speaker
        </Button>
      </Box>
      <Sidebar open={openDrawer} onCloseDrawer={handleCloseDrawer} />
    </div>
  );
};

export default Home;
