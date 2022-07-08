import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [authUser, setAuthUser] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) getMe();
  }, []);

  const getMe = async () => {
    const res = await axios.get("/api/v2/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAuthUser(res.data.data);
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, getMe }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
