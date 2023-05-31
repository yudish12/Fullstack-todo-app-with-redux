import axios from "axios";

const baseUrl = "http://localhost:5000";

export const addTaskThunk = async (task) => {
  try {
    const resp = await axios.post(`${baseUrl}/api/tasks`, task);
    console.log(resp.data);
    return resp.data.task;
  } catch (error) {
    return error;
  }
};

export const getAllTaskThunk = async () => {
  try {
    const resp = await axios.get(`${baseUrl}/api/tasks`);
    return resp.data.taskArr;
  } catch (error) {
    return error;
  }
};

export const deleteTaskThunk = async (id) => {
  try {
    const resp = await axios.delete(`${baseUrl}/api/tasks/${id}`);
    return resp.data;
  } catch (error) {
    return error;
  }
};

export const editTaskThunk = async (obj) => {
  try {
    const resp = await axios.patch(`${baseUrl}/api/tasks/${obj.id}`, {
      isDone: obj.isDone,
    });
    return resp.data;
  } catch (error) {
    return error;
  }
};
