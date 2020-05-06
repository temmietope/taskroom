import React, { useEffect, useReducer } from "react";
import TasksContext from "./tasksContext";
import tasksReducer from "./tasksReducer";
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

const TasksState = (props) => {
  useEffect(() => {
    // getAllTasks();
  });
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
    // all_tasks: [],
    // all_tasks: [...pending_tasks, ...completed_tasks],
    progress: 0,
    current_task: null,
  };

  const [state, dispatch] = useReducer(tasksReducer, initialState);

  const getAllTasks = () => {
    // console.log("hello");
    // const newArray = [...state.pending_tasks, ...state.completed_tasks];
    // console.log(newArray);
    // // dispatch({
    // //   type: GET_ALL_TASKS,
    // //   payload: newArray,
    // // });
    // // dispatch({
    // //   type: GET_ALL_TASKS,
    // // });
    // // // const newArray = [...state.pending_tasks, ...state.completed_tasks]
    // // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    // // console.log("i present to you all tasks");
    // // console.log(state.all_tasks);
  };

  const getIndividualTask = (key) => {
    const item = all_tasks.find((task) => task.key === key);
    dispatch({
      type: GET_INDIVIDUAL_TASK,
      payload: item,
    });
  };

  const addNewTask = (task) => {
    dispatch({
      type: ADD_NEW_TASK,
      payload: task,
    });
  };

  const editTask = (task) => {
    dispatch({
      type: EDIT_EXISTING_TASK,
      payload: task,
    });
  };

  const toggleComplete = (key) => {
    const idx = all_tasks.findIndex((task) => task.key === key);
    const item = all_tasks[idx];
    item.completed = !item.completed;

    if (item.completed) {
      dispatch({
        type: MARK_INCOMPLETE,
        payload: item,
      });
      trackProgress();
    } else {
      dispatch({
        type: MARK_COMPLETE,
        payload: item,
      });
      trackProgress();
    }
  };

  const trackProgress = () => {
    const perc = Math.ceil(
      (state.completed_tasks.length / state.all_tasks.length) * 100
    );
    dispatch({
      type: TRACK_PROGRESS,
      payload: perc,
    });
  };

  const clearTask = () => {
    dispatch({
      type: CLEAR_CURRENT_TASK,
    });
  };

  return (
    <TasksContext.Provider
      value={{
        all_tasks: state.all_tasks,
        pending_tasks: state.pending_tasks,
        completed_tasks: state.completed_tasks,
        current_task: state.current_task,
        progress: state.progress,
        loading: state.loading,
        error: state.error,
        getAllTasks,
        getIndividualTask,
        addNewTask,
        editTask,
        toggleComplete,
        trackProgress,
        getIndividualTask,
        clearTask,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksState;
