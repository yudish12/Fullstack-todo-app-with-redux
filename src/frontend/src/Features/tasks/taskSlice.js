import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  taskArray: [],
  taskCount: 0,
  error: null,
  loading: false,
};

import {
  addTaskThunk,
  getAllTaskThunk,
  deleteTaskThunk,
  editTaskThunk,
} from "./taskThunk";

export const getAllTask = createAsyncThunk("task/getAll", getAllTaskThunk);
export const addTask = createAsyncThunk("task/create", addTaskThunk);
export const deleteTask = createAsyncThunk("task/delete", deleteTaskThunk);
export const editTask = createAsyncThunk("task/edit", editTaskThunk);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    increase: (state) => {
      state.taskCount++;
    },
    decrease: (state) => {
      state.taskCount--;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTask.pending, (state) => {
      state.loading = true;
      return state;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      // console.log(state, action.payload);
      if (action.payload?.response?.status === 404) {
        return {
          ...state,
          loading: false,
          error: "Title is missing",
        };
      }
      return {
        ...state,
        loading: false,
        taskArray: [...state.taskArray, action.payload],
        taskCount: state.taskCount + 1,
      };
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getAllTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllTask.fulfilled, (state, action) => {
      state.loading = false;
      state.taskArray = action.payload;
      state.taskCount = action.payload.length;
    });
    builder.addCase(getAllTask.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(deleteTask.pending, (state) => {
      return state;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.taskArray = state.taskArray.filter(
        (e) => e.id !== action.payload.id
      );
      state.taskCount--;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(editTask.fulfilled, (state, action) => {
      console.log(action.payload);
      state.taskArray.map((e) => {
        console.log(e);
        if (e.id === action.payload.id) {
          console.log(action.payload);
          e.isDone = !e.isDone;
        }
      });
    });

    builder.addCase(editTask.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { decrease, increase, clearError } = taskSlice.actions;

export default taskSlice.reducer;
