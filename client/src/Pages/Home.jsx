import { useEffect } from "react";
import Amount from "../Components/Amount";
import History from "../Components/History";
import NewTranscation from "../Components/NewTranscation";
import Master from "./Layout/Master";
import { useNavigate } from "react-router-dom";
// import useMediaQuery from "@mui/material/useMediaQuery";

function Home() {
  // const matches = useMediaQuery("(max-width:500px)");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {/* <span>{`(max-width:5s00px) matches: ${matches}`}</span>; */}
      <Master>
        <Amount />
        <History />
        <NewTranscation />
      </Master>
    </>
  );
}

export default Home;
