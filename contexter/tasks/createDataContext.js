import React, { useReducer, useEffect } from "react";
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

export default (reducer, initialValue) => {
  const Context = React.createContext();

  const Provider = (props) => {
    useEffect(() => {
      getAllTasks();
      // getIndividualTask()
      trackProgress();
      // console.log(state.all_tasks);
      console.log("useeffect of createdatacontext");
    }, [state]);

    const [state, dispatch] = useReducer(reducer, initialValue);

    // const boundActions = {};

    // for (let key in actions) {
    //   boundActions[key] = actions[key](dispatch);
    // }

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
        console.log(
          "get INDIVIDUAL TASK>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
        );
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
      // dispatch({
      //   type: ADD_NEW_TASK,
      //   payload: task,
      // });
      // getAllTasks();
    };

    const editTask = (task) => {
      // dispatch({
      //   type: EDIT_EXISTING_TASK,
      //   payload: task,
      // });
      // getAllTasks();
    };

    const toggleComplete = (key) => {
      console.log(key);
      const idx = state.all_tasks.findIndex((task) => task.key === key);
      const item = state.all_tasks[idx];
      if (item.completed) {
        item.completed = false;
        console.log(state.current_task)
        dispatch({
          type: MARK_INCOMPLETE,
          payload: item,
        });
        trackProgress();
      } else {
        item.completed = true;
        console.log(state.current_task)

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
      // getAllTasks();
    };

    const clearTask = () => {
      // dispatch({
      //   type: CLEAR_CURRENT_TASK,
      // });
      // getAllTasks();
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
