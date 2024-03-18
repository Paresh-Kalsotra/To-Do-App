const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    completeStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const todoModel = model("todo", todoSchema);

module.exports = todoModel;
