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
    // case GET_ALL_TASKS:
    //   return {
    //     ...state,
    //     tasks: payload,
    //     loading: false,
    //   };
    // case GET_INDIVIDUAL_TASK:
    //   return {
    //     ...state,
    //     task: payload,
    //     loading: false,
    //   };
    case ADD_NEW_TASK:
      return {
        ...state,
        pending_tasks: [task, ...state.pending_tasks],
      };
    case GET_INDIVIDUAL_TASK:
      return {
        ...state,
        currentTask: payload,
      };
    case EDIT_EXISTING_TASK:
      return {
        ...state,
        all_tasks: state.all_tasks.map((task) =>
          task.key === action.payload.key ? action.payload : task
        ),
      };
    case MARK_COMPLETE:
      return {
        ...state,
        pending_tasks: state.pending_tasks.filter((task) => {
          task.key !== payload.key;
        }),
        completed_tasks: [...state.completed_tasks, payload],
      };
    case MARK_INCOMPLETE:
      return {
        ...state,
        completed_tasks: state.completed_tasks.filter((task) => {
          task.key !== payload.key;
        }),
        pending_tasks: [payload, ...state.pending_tasks],
      };
    case TRACK_PROGRESS:
      return {
        ...state,
        progress: payload,
      };
    case CLEAR_CURRENT_TASK:
      return {
        ...state,
        currentTask: null,
      };
  }
};
