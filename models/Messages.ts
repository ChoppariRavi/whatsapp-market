import mongoose from "mongoose";

mongoose.models = {};

const MessagesSchema = new mongoose.Schema({
  object: String,
  entry: [
    {
      id: String,
      changes: [
        {
          value: Object,
          field: String,
        },
      ],
    },
  ],
});

const MessagesModel = mongoose.model("messages", MessagesSchema);

export default MessagesModel;
