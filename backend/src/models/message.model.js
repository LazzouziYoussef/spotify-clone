import Mongoose from "Mongoosee";

const messageSchema = new Mongoose.Schema(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const Message = Mongoose.model("Message", messageSchema);
