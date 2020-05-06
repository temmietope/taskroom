import {
  GET_ALL_TASKS,
  GET_INDIVIDUAL_TASK,
  ADD_NEW_TASK,
  EDIT_EXISTING_TASK,
  MARK_COMPLETE,
  MARK_INCOMPLETE,
  TRACK_PROGRESS,
  CLEAR_CURRENT_TASK,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      // console.log("i got to the reducer")
      return {
        // ...state,
        // all_tasks: [...state.pending_tasks, ...state.completed_tasks],
        // loading: false,
      };
    case GET_INDIVIDUAL_TASK:
      return {
        ...state,
        current_task: action.payload,
        loading: false,
      };
    case ADD_NEW_TASK:
      return {
        ...state,
        pending_tasks: [action.payload, ...state.pending_tasks],
        loading: false,
      };
    case EDIT_EXISTING_TASK:
      return {
        ...state,
        all_tasks: state.all_tasks.map((task) =>
          task.key === action.payload.key ? action.payload : task
        ),
        loading: false,
      };
    case MARK_COMPLETE:
      return {
        ...state,
        pending_tasks: state.pending_tasks.filter((task) => {
          task.key !== action.payload.key;
        }),
        completed_tasks: [...state.completed_tasks, action.payload],
        loading: false,
      };
    case MARK_INCOMPLETE:
      return {
        ...state,
        completed_tasks: state.completed_tasks.filter((task) => {
          task.key !== action.payload.key;
        }),
        pending_tasks: [action.payload, ...state.pending_tasks],
        loading: false,
      };
    case TRACK_PROGRESS:
      return {
        ...state,
        progress: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT_TASK:
      return {
        ...state,
        current_task: null,
        loading: false,
      };
  }
};
