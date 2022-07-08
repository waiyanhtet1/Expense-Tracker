const AppReducer = (state, action) => {
  switch (action.type) {
    case "Get Tran":
      return {
        ...state,
        loading: false,
        transcations: action.payload,
      };
    case "Add Tran":
      return {
        ...state,
        transcations: [...state.transcations, action.payload],
      };
    case "Delete Tran":
      return {
        ...state,
        transcations: state.transcations.filter(
          (t) => t._id !== action.payload
        ),
      };
    case "Error Tran":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default AppReducer;
