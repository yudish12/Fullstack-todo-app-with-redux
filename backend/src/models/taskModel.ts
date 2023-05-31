import mongoose from "mongoose";

export interface TaskDocument extends mongoose.Document {
  id: string;
  title: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model<TaskDocument>("Task", taskSchema);
export default Task;
