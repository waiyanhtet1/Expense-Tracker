import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
  transcations: [],
  loading: true,
  error: "",
};

export const GlobalContext = createContext(initialState);
export const GlobalContextProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getTranscation = async () => {
    try {
      const res = await axios.get("/api/v2/transcations", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({
        type: "Get Tran",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "Error Tran",
        payload: error.response.data.error,
      });
    }
  };

  const addTranscation = async (transcations) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.post(
        "/api/v2/transcations/",
        transcations,
        config
      );
      dispatch({
        type: "Add Tran",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "Error Tran",
        payload: error.response.data.error,
      });
    }
  };

  const deleteTranscation = async (_id) => {
    try {
      await axios.delete(`/api/v2/transcations/${_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({
        type: "Delete Tran",
        payload: _id,
      });
    } catch (error) {
      dispatch({
        type: "Error Tran",
        payload: error.response.data.error,
      });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        transcations: state.transcations,
        error: state.error,
        loading: state.loading,
        getTranscation,
        addTranscation,
        deleteTranscation,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
