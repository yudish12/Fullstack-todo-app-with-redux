import binImg from "../assets/garbage-bin-png-8.png";
import { useSelector } from "react-redux";
import Singletask from "./Singletask";
import { useDispatch } from "react-redux";
import { getAllTask, clearError } from "../Features/tasks/taskSlice";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
const Tasks = () => {
  const allTaskState = useSelector((store) => store.tasks);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTask());
  }, [dispatch]);

  useEffect(() => {
    toast(allTaskState.error);
    dispatch(clearError());
  }, [allTaskState.error, dispatch]);

  if (allTaskState.loading || allTaskState.length === 0) {
    return <p>Loading....</p>;
  }

  /* eslint-disable */

  /* eslint-enable */

  return (
    <div className="tasks">
      <div>
        <ToastContainer />
      </div>
      <div className="taskHeader">
        <div className="totalTask">
          <span id="total">Total Tasks </span>
          <span id="count">{allTaskState.taskCount}</span>
        </div>
        <div className="tasksDone">
          <span id="done">Tasks Done </span>
          <span id="count">
            {allTaskState.taskArray.filter((e) => e.isDone === true).length}
          </span>
        </div>
      </div>
      <div className="tasksContainer">
        {!allTaskState.taskCount ? (
          <>
            <div className="img">
              <img alt="bin" width={150} src={binImg} />
            </div>
            <p
              style={{ color: "#808080", textAlign: "center", padding: "1rem" }}
            >
              Currently your todo list is empty please add a task to keep track
              of your day to day tasks
            </p>
          </>
        ) : (
          <>
            {allTaskState.taskArray.map((e) => {
              if (e) {
                return <Singletask key={e.id} {...e} />;
              }
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Tasks;
