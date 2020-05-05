import React, { useReducer } from "react";
import TasksContext from "./tasksContext";
import tasksReducer from "./tasksReducer";
import { GET_ALL_TASKS, GET_INDIVIDUAL_TASK } from "../types";

const TasksState = (props) => {
  const initialState = {
    // loading: true,
    tasks: [
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
        title: "Pick kids from school",
        body: "My kids cant be late",
        time: "10: 00 am",
        date: "2020-01-24",
        completed: false,
        key: "3",
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
  };

  const [state, dispatch] = useReducer(tasksReducer, initialState);

  const getAllTasks = () => {
    dispatch({
      type: GET_ALL_TASKS,
      payload: tasks,
    });
  };

  return (
    <TasksContext.Provider
      value={{
        loading: state.loading,
        tasks: state.tasks,
        error: state.error,
        getAllTasks,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};
