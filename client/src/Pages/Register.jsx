import React, { useState } from "react";
import Master from "./Layout/Master";
import {
  Button,
  FormGroup,
  Grid,
  TextField,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

function Register() {
  // context
  const { setAuthUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [passerror, setPassError] = useState(false);
  const [userexit, setUserExit] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const register = async () => {
    if (password === cpassword) {
      setPassError(false);
      setLoading(true);
      try {
        const res = await axios.post("/api/v2/user/register", {
          name,
          email,
          password,
        });
        localStorage.setItem("token", res.data.token);
        setAuthUser(res.data.data);
        setLoading(false);
        navigate("/");
      } catch (error) {
        setLoading(false);
        setUserExit(error.response.data.message);
        setErrorMsg(error.response.data.error);
      }
    } else {
      setPassError(true);
    }
  };

  return (
    <>
      <Typography sx={{ m: 3 }}>
        <img src={"/logo.png"} alt="" style={{ width: "60px" }} />
        <Typography variant="subtitle1"> Expense Tracker</Typography>
      </Typography>

      <Typography variant="h6" sx={{ textAlign: "center", my: 8 }}>
        SignUp
        <LockOpenIcon sx={{ ml: 1 }} />
      </Typography>

      <Grid container spacing={3} columns={12} sx={{ p: 3 }}>
        <Grid item xs={12} sm={12} md={12}>
          <FormGroup>
            <TextField
              variant="outlined"
              label="Name"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errorMsg &&
              errorMsg.map((e) =>
                e.path === "name" ? (
                  <Typography variant="subtitle2" color="error">
                    {e.message}
                  </Typography>
                ) : (
                  ""
                )
              )}
          </FormGroup>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <FormGroup>
            <TextField
              variant="outlined"
              label="Email"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorMsg &&
              errorMsg.map((e) =>
                e.path === "email" ? (
                  <Typography variant="subtitle2" color="error">
                    {e.message}
                  </Typography>
                ) : (
                  ""
                )
              )}
            {userexit ? (
              <Typography variant="subtitle2" color="error">
                {userexit}
              </Typography>
            ) : (
              ""
            )}
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormGroup>
            <TextField
              variant="outlined"
              label="Password"
              size="small"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMsg &&
              errorMsg.map((e) =>
                e.path === "password" ? (
                  <Typography variant="subtitle2" color="error">
                    {e.message}
                  </Typography>
                ) : (
                  ""
                )
              )}
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormGroup>
            <TextField
              variant="outlined"
              label="Confim Password"
              size="small"
              type="password"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
            {passerror ? (
              <Typography variant="subtitle2" color="error">
                Password do not match!
              </Typography>
            ) : (
              ""
            )}
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormGroup sx={{ m: 1, position: "relative" }}>
            <Button
              variant="contained"
              color="secondary"
              disabled={loading}
              onClick={() => register()}
            >
              Register
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
      <Link href="/login" underline="hover">
        <Typography sx={{ textAlign: "center" }} color="primary">
          Alreday have an account? login
        </Typography>
      </Link>
    </>
  );
}

export default Register;
