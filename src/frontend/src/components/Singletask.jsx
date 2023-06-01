/* eslint-disable react/prop-types */
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteTask, editTask } from "../Features/tasks/taskSlice";
import { useState } from "react";
const Singletask = (props) => {
  const [IsChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();

  const deleteTaskHandler = (id) => {
    dispatch(deleteTask(id));
  };
  return (
    <div className="singleTask">
      <div className="round">
        <input
          type="checkbox"
          id={props.id}
          checked={IsChecked}
          onChange={() => {
            console.log(IsChecked);
            setIsChecked(!IsChecked);
            dispatch(editTask({ id: props.id, isDone: !IsChecked }));
          }}
        />
        <label htmlFor={props.id}></label>
      </div>
      <p className={IsChecked ? "line-through" : ""}>{props.title}</p>
      <span onClick={() => deleteTaskHandler(props.id)} className="delete-icon">
        <FaTrashAlt />
      </span>
    </div>
  );
};

export default Singletask;
