import createDataContext from "./createDataContext";
import {
  GET_ALL_TASKS,
  GET_INDIVIDUAL_TASK,
  ADD_NEW_TASK,
  EDIT_EXISTING_TASK,
  MARK_COMPLETE,
  MARK_INCOMPLETE,
  TRACK_PROGRESS,
  CLEAR_CURRENT_TASK,
} from "./types";

const tasksReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      console.log("getAllTasks");
      return {
        ...state,
        all_tasks: action.payload,
        loading: false,
      };
    case GET_INDIVIDUAL_TASK:
      console.log("no longer");

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
      console.log("mark item complete");
      // console.log(state)
      return {
        ...state,
        pending_tasks: state.pending_tasks.filter((task) => {
          return task.key !== action.payload.key;
        }),
        completed_tasks: [...state.completed_tasks, action.payload],
        loading: false,
      };
    case MARK_INCOMPLETE:
      console.log("mark item incomplete");
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
      time: "10: 00 am",
      date: "2020-02-17",
      completed: false,
      key: "1",
    },
    {
      title: "Groceries Shopping",
      body: "Go to the market and shop for important things",
      time: "10: 00 am",
      date: "2020-03-09",
      completed: false,
      key: "2",
    },
    {
      title: "Fight",
      body: "Ninja movement, nigga!",
      time: "10: 00 am",
      date: "2020-04-30",
      completed: false,
      key: "4",
    },
    {
      title: "Make dinner",
      body: "Rice and beans with plantain",
      time: "10: 00 am",
      date: "2020-02-14",
      completed: false,
      key: "5",
    },
  ],
  completed_tasks: [
    {
      title: "Pick kids",
      body: "My kids cant be late",
      time: "10: 00 am",
      date: "2020-01-24",
      completed: true,
      key: "3",
    },
  ],
  all_tasks: [],
  progress: 0,
  current_task: null,
  loading: true,
};

// const actions = {
//   getAllTasks: async () => {
//     const newArray = [...initialState.pending_tasks, ...initialState.completed_tasks];
//     console.log("hello");
//     dispatch({
//       type: GET_ALL_TASKS,
//       payload: newArray,
//     });
//   },
//   getIndividualTask: () => {},
//   addNewTask: (task) => {},
//   editTask: (task) => {},
//   toggleComplete: (key) => {},
//   trackProgress: () => {},
//   clearTask: () => {},
// };

export const { Provider, Context } = createDataContext(
  tasksReducer,
  // actions,
  initialState
);
