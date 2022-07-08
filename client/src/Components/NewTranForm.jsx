import {
  Alert,
  Button,
  FormControl,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalState";

function NewTranForm() {
  const { addTranscation, error } = useContext(GlobalContext);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const submit = (e) => {
    addTranscation({ text, amount });

    // empty error array
    error.length = 0;
    if (error.length === 0) {
      setText("");
      setAmount("");
    }
  };
  return (
    <>
      <Grid container align="center" sx={{ mt: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <FormControl>
            <FormGroup>
              <TextField
                color="secondary"
                variant="standard"
                label="Text"
                focused
                InputProps={{ inputProps: { style: { color: "#fff" } } }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Typography sx={{ fontSize: "15px" }} color="error.main">
                {error &&
                  error.map((e) => (e.path === "text" ? e.message : ""))}
              </Typography>
            </FormGroup>
            <FormGroup sx={{ mt: 3 }}>
              <TextField
                type="number"
                color="secondary"
                variant="standard"
                label="Amount"
                focused
                InputProps={{ inputProps: { style: { color: "#fff" } } }}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Typography sx={{ fontSize: "15px" }} color="error.main">
                {error &&
                  error.map((e) => (e.path === "amount" ? e.message : ""))}
              </Typography>
            </FormGroup>
            <Typography variant="caption">
              negative(-) = expense, positive(+) = income
            </Typography>

            <FormGroup sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => submit(e)}
              >
                Add
              </Button>
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}

export default NewTranForm;
