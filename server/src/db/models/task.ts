import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
      min: 2,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = model("Task", taskSchema);
