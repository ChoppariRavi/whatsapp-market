import mongoose from "mongoose";

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

const MessagesModel =
  mongoose.models.Messages || mongoose.model("messages", MessagesSchema);

export default MessagesModel;
