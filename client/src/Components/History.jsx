import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { numberWithCommas } from "../utilis/format";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Divider,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import { useEffect, useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { useState } from "react";

function History() {
  const { transcations, getTranscation, deleteTranscation } =
    useContext(GlobalContext);

  useEffect(() => {
    getTranscation();
  }, []);

  return (
    <>
      <Timeline sx={{ mb: 5 }}>
        <Typography variant="subtitle1" sx={{ textAlign: "center", mb: 2 }}>
          History
        </Typography>
        {transcations.map((t) => (
          <TimelineItem position={t.amount < 0 ? "right" : "left"} key={t._id}>
            <TimelineSeparator>
              <TimelineDot color={t.amount < 0 ? "error" : "success"}>
                {t.amount < 0 ? <RemoveIcon /> : <AddIcon />}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle1">
                {t.text} <br /> {t.amount < 0 ? "-" : "+"}${" "}
                {numberWithCommas(Math.abs(t.amount).toFixed(2))}
              </Typography>

              <Button
                sx={{ mt: 1, mb: 1 }}
                color="primary"
                variant="contained"
                size="small"
                onClick={() => deleteTranscation(t._id)}
              >
                <DeleteForeverIcon />
              </Button>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </>
  );
}

export default History;
