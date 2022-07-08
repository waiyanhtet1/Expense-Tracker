import { Global } from "@emotion/react";
import {
  Box,
  Button,
  Fab,
  Skeleton,
  SwipeableDrawer,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import NewTranForm from "./NewTranForm";

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#263238",
  color: "#fff",
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: "#fff",
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function NewTranscation() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <Box sx={{ textAlign: "center", pt: 1 }}>
        <Tooltip title="new transcation" placement="top-start" arrow>
          <Fab
            color="secondary"
            aria-label="new"
            sx={{ position: "fixed", right: "20px", bottom: "75px" }}
            onClick={toggleDrawer(true)}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography variant="subtitle1" sx={{ p: 2 }}>
            Add New Transcation
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          {/* content */}
          <NewTranForm />
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
}

export default NewTranscation;
