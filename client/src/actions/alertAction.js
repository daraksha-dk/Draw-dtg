import { SET_ALERT, REMOVE_ALERT } from "./constants";
import { v4 as uuidv4 } from "uuid";

export const setAlert =
  (message, alertType, timeout = 4000) =>
  (dispatch) => {
    const id = uuidv4();

    dispatch({
      type: SET_ALERT,
      payload: { id, message, alertType },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
