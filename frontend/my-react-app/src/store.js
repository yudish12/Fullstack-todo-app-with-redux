import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./Features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
