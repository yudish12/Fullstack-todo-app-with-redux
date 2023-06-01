import { Request, Response } from "express";
import Task from "../models/taskModel";
import { v4 as uuidv4 } from "uuid";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const taskArr = await Task.find({});
    res.status(200).json({
      status: "Success",
      taskArr,
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      error,
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(404).json({
        status: "Failed",
        message: "Title is important",
      });
    }
    req.body.id = uuidv4();
    const task = await Task.create(req.body);
    return res.status(200).json({
      status: "Success",
      message: "task added successfully",
      task,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Failed",
      error,
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Task.findOneAndDelete({ id: id });

    res.status(200).json({
      status: "Success",
      message: "task deleted successfully",
      id,
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      error,
    });
  }
};

export const editTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Task.findOneAndUpdate({ id: id }, req.body);

    res.status(200).json({
      status: "Success",
      message: "task updated successfully",
      id,
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      error,
    });
  }
};
