import createDataContext from "./createDataContext";
import {
  GET_ALL_TASKS,
  GET_INDIVIDUAL_TASK,
  ADD_NEW_TASK,
  EDIT_EXISTING_COMPLETED_TASK,
  EDIT_EXISTING_PENDING_TASK,
  MARK_COMPLETE,
  MARK_INCOMPLETE,
  TRACK_PROGRESS,
  CLEAR_CURRENT_TASK,
} from "./types";

const tasksReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return {
        ...state,
        all_tasks: action.payload,
        loading: false,
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
    case EDIT_EXISTING_COMPLETED_TASK:
      return {
        ...state,
        completed_tasks: state.completed_tasks.map((task) =>
          task.key === action.payload.key ? action.payload : task
        ),
        current_task: action.payload,
        loading: false,
      };
    case EDIT_EXISTING_PENDING_TASK:
      return {
        ...state,
        pending_tasks: state.pending_tasks.map((task) =>
          task.key === action.payload.key ? action.payload : task
        ),
        current_task: action.payload,
        loading: false,
      };
    case MARK_COMPLETE:
      return {
        ...state,
        pending_tasks: state.pending_tasks.filter((task) => {
          return task.key !== action.payload.key;
        }),
        completed_tasks: [...state.completed_tasks, action.payload],
        loading: false,
      };
    case MARK_INCOMPLETE:
      return {
        ...state,
        completed_tasks: state.completed_tasks.filter((task) => {
          return task.key !== action.payload.key;
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
    default:
      return state;
  }
};

const initialState = {
  pending_tasks: [
    {
      title: "Cloth Delivery",
      body: "I have to deliver Bunmi's clothes to her on time",
      date: "2020-03-09T10:12:00.000Z",
      completed: false,
      key: "1",
    },
    {
      title: "Groceries Shopping",
      body: "Go to the market and shop for important things",
      date: "2020-01-20T09:12:00.000Z",
      completed: false,
      key: "2",
    },
    {
      title: "Fight",
      body: "Ninja movement, nigga!",
      date: "2020-10-19T04:10:00.000Z",
      completed: false,
      key: "4",
    },
    {
      title: "Make dinner",
      body: "Rice and beans with plantain",
      date: "2020-09-18T11:19:00.000Z",
      completed: false,
      key: "5",
    },
  ],
  completed_tasks: [
    {
      title: "Pick kids",
      body: "My kids cant be late",
      date: "2020-03-09T10:12:00.000Z",
      completed: true,
      key: "3",
    },
  ],
  all_tasks: [],
  progress: 0,
  current_task: null,
  loading: true,
};

export const { Provider, Context } = createDataContext(
  tasksReducer,
  initialState
);
