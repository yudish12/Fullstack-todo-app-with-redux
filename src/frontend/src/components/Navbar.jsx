import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillRocketFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addTask } from "../Features/tasks/taskSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const [inputTask, setInputTask] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputTask("");
    dispatch(addTask({ title: inputTask, isDone: false }));
  };

  return (
    <nav className="nav">
      <div className="container">
        <div className="title">
          <BsFillRocketFill style={{ color: "#4EA8DE" }} />
          <span id="to">To</span>
          <span id="do">Do</span>
        </div>
        <form className="form">
          <input
            className="taskInput"
            placeholder="Add title for the task"
            type="text"
            onChange={(e) => setInputTask(e.target.value)}
            value={inputTask}
          />
          <button type="submit" className="btn" onClick={handleSubmit}>
            ADD
            <AiOutlinePlusCircle style={{ color: "#f2f2f2" }} />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
