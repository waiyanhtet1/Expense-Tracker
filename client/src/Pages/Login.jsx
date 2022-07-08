import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormGroup,
  Grid,
  IconButton,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useState, useContext } from "react";

import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  // context
  const { setAuthUser } = useContext(AuthContext);

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const submit = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/v2/user/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setAuthUser(res.data.data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setOpen(true);
      setLoading(false);
      setErrorMsg(error.response.data.error);
    }
  };
  return (
    <>
      <Typography sx={{ m: 3 }}>
        <img src={"/logo.png"} alt="" style={{ width: "60px" }} />
        <Typography variant="subtitle1"> Expense Tracker</Typography>
      </Typography>
      <Typography variant="h6" textAlign="center" sx={{ my: 8 }}>
        Login <LoginIcon sx={{ ml: 1 }} />
      </Typography>
      <Grid container spacing={3} columns={12} sx={{ px: 4 }}>
        {/* Error Alert */}
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={() => handleClose()}
          action={action}
        >
          <Alert
            onClose={() => handleClose()}
            severity="error"
            variant="filled"
          >
            {errorMsg}
          </Alert>
        </Snackbar>

        <Grid item xs={12} sm={12} md={12}>
          <FormGroup>
            <TextField
              variant="outlined"
              label="Email"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={open}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormGroup>
            <TextField
              type="password"
              variant="outlined"
              label="Password"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={open}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormGroup sx={{ m: 1, position: "relative" }}>
            {/* <Box> */}
            <Button
              variant="contained"
              color="secondary"
              disabled={loading}
              onClick={() => submit()}
            >
              Login
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </FormGroup>
        </Grid>
      </Grid>
      <Link href="/register" underline="hover">
        <Typography sx={{ textAlign: "center", mt: 3 }} color="primary">
          Don't have an account? Register
        </Typography>
      </Link>
    </>
  );
}

export default Login;
