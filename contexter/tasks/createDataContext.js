import React, { useReducer } from "react";
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

export default (reducer, initialValue) => {
  const Context = React.createContext();

  const Provider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialValue);

    const getAllTasks = async () => {
      try {
        const newArray = [...state.pending_tasks, ...state.completed_tasks];
        dispatch({
          type: GET_ALL_TASKS,
          payload: newArray,
        });
      } catch (err) {
        console.log(err);
      }
    };

    const getIndividualTask = (key) => {
      try {
        const item = state.all_tasks.find((task) => task.key === key);
        dispatch({
          type: GET_INDIVIDUAL_TASK,
          payload: item,
        });
        getAllTasks();
      } catch (err) {
        console.log(err);
      }
    };

    const addNewTask = (task) => {
      dispatch({
        type: ADD_NEW_TASK,
        payload: task,
      });
    };

    const editTask = (task) => {
      task.completed
        ? dispatch({
            type: EDIT_EXISTING_COMPLETED_TASK,
            payload: task,
          })
        : dispatch({
            type: EDIT_EXISTING_PENDING_TASK,
            payload: task,
          });
    };

    const toggleComplete = (key) => {
      const idx = state.all_tasks.findIndex((task) => task.key === key);
      const item = state.all_tasks[idx];
      if (item.completed) {
        item.completed = false;
        dispatch({
          type: MARK_INCOMPLETE,
          payload: item,
        });
      } else {
        item.completed = true;
        dispatch({
          type: MARK_COMPLETE,
          payload: item,
        });
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
      <Context.Provider
        value={{
          all_tasks: state.all_tasks,
          pending_tasks: state.pending_tasks,
          completed_tasks: state.completed_tasks,
          current_task: state.current_task,
          progress: state.progress,
          loading: state.loading,
          error: state.error,
          loading: state.loading,
          getAllTasks,
          getIndividualTask,
          addNewTask,
          editTask,
          toggleComplete,
          trackProgress,
          clearTask,
        }}
      >
        {props.children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};
