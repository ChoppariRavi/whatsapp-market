import mongoose from "mongoose";

Object.keys(mongoose.models).forEach((modelName) => {
  delete mongoose.models[modelName];
});

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
