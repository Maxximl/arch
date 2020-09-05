import {
  GREENHOUSES_LOADED,
  GREENHOUSE_DELETE,
  GREENHOUSES_EDITED,
} from "../actions/actionTypes";

const initialState = {
  greenhouses: [],
  quizes: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GREENHOUSES_LOADED:
      return {
        ...state,
        greenhouses: action.payload,
      };
    case GREENHOUSE_DELETE:
      return {
        ...state,
        greenhouses: state.greenhouses.filter((gh) => {
          return gh._id !== action.payload;
        }),
      };
    case GREENHOUSES_EDITED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
