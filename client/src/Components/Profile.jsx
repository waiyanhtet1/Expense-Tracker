import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import Master from "../Pages/Layout/Master";

function Profile() {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("token");
    setAuthUser({});
    navigate("/login");
  };

  return (
    <Master>
      <Card sx={{ mt: 10, mx: 2, p: 2 }}>
        <CardContent sx={{ color: "secondary.main" }}>
          <Typography sx={{ float: "right" }}> Your Information</Typography>
          <Typography sx={{ fontSize: 14 }}>Name</Typography>
          <Typography sx={{ fontSize: 20 }}>{authUser.name}</Typography>
          <Typography sx={{ fontSize: 14, mt: 3 }}>Email</Typography>
          <Typography sx={{ fontSize: 20 }}>{authUser.email}</Typography>
          <Button
            sx={{ mt: 3, float: "right" }}
            variant="contained"
            color="secondary"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </Master>
  );
}

export default Profile;
