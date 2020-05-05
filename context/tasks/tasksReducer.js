import { GET_ALL_TASKS, GET_INDIVIDUAL_TASK } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return {
        ...state,
        tasks: payload,
        loading: false,
      };
    case GET_INDIVIDUAL_TASK:
      return {
        ...state,
        loading: false,
      };
  }
};
